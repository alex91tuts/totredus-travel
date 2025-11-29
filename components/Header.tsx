import Link from 'next/link'
import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import MobileMenuWrapper from './MobileMenuWrapper'
import DestinationsDropdown from './DestinationsDropdown'
import { getTranslations, type Locale } from '@/lib/translations'
import { getAllPosts } from '@/lib/posts'

// Normalize location function (same as in extract-locations.ts)
function normalizeLocation(value: string): string {
  if (!value || typeof value !== 'string') return ''
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toUpperCase()
}

// Convert normalized location to lowercase slug
function locationToSlug(value: string): string {
  return normalizeLocation(value).toLowerCase().replace(/\s+/g, '-')
}

// Convert ALL CAPS to Title Case
function toTitleCase(str: string): string {
  if (!str) return ''
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Get unique countries from posts
function getCountriesFromPosts(locale: Locale): { name: string; slug: string }[] {
  const allPosts = getAllPosts(locale)
  const countryMap = new Map<string, string>()

  allPosts.forEach(post => {
    const country = post.frontmatter.tara || post.frontmatter.country
    if (!country) return

    const normalizedCountry = normalizeLocation(country)
    if (!countryMap.has(normalizedCountry)) {
      // Prefer the original country name from posts for better localization
      // Convert to title case if it's all caps
      const countryName = country === country.toUpperCase() && country === country.toLowerCase() ? country :
        country === country.toUpperCase() ? toTitleCase(country) : country
      countryMap.set(normalizedCountry, countryName)
    }
  })

  // Convert to array and sort alphabetically
  return Array.from(countryMap.entries())
    .map(([normalized, name]) => ({
      name: toTitleCase(name),
      slug: locationToSlug(name)
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export default function Header({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)
  const countries = getCountriesFromPosts(locale)

  // Helper to generate localized path
  const getPath = (path: string) => {
    if (locale === 'ro') {
      return path
    }
    return `/${locale}${path}`
  }

  return (
    <header className="relative bg-background border-b border-border shadow-sm w-full">
      <nav className="relative mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-7xl w-full">
        <div className="flex items-center justify-between">
          <Link href={getPath('/')} className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.webp"
              alt="TravelBlog"
              width={160}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href={getPath('/')} className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.home}
            </Link>
            <DestinationsDropdown
              locale={locale}
              countries={countries}
              destinationsLabel={t.nav.destinations}
              allDestinationsLabel={locale === 'ro' ? 'Toate destinațiile' : 'All destinations'}
            />
            <Link href={getPath('/about')} className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.about}
            </Link>
            <Link href={getPath('/contact')} className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.contact}
            </Link>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>

            {/* Mobile menu button and navigation */}
            <MobileMenuWrapper locale={locale} countries={countries} t={t} />
          </div>
        </div>
      </nav>
    </header>
  )
}
