import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getTranslations, type Locale, locales } from '@/lib/translations'
import { getAllPosts, type Post } from '@/lib/posts'

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

// Group posts by country and city
interface GroupedData {
  country: string
  normalizedCountry: string
  cities: {
    city: string
    normalizedCity: string
    posts: Post[]
  }[]
}

function groupPostsByLocation(posts: Post[], locale: Locale): GroupedData[] {
  const countryMap = new Map<string, Map<string, Post[]>>()

  posts.forEach((post) => {
    const tara = post.frontmatter.tara || post.frontmatter.country
    const city = locale === 'en'
      ? (post.frontmatter.city || post.frontmatter.oras)
      : (post.frontmatter.oras || post.frontmatter.city)

    if (!tara || !city) return

    const normalizedTara = normalizeLocation(tara)
    const normalizedCity = normalizeLocation(city)

    if (!countryMap.has(normalizedTara)) {
      countryMap.set(normalizedTara, new Map())
    }

    const cityMap = countryMap.get(normalizedTara)!
    if (!cityMap.has(normalizedCity)) {
      cityMap.set(normalizedCity, [])
    }

    cityMap.get(normalizedCity)!.push(post)
  })

  // Convert to array format
  const result: GroupedData[] = []

  countryMap.forEach((cityMap, normalizedTara) => {
    // Get country name from first post
    const firstPost = Array.from(cityMap.values())[0]?.[0]
    const countryName = firstPost?.frontmatter.tara || firstPost?.frontmatter.country || normalizedTara

    const cities: GroupedData['cities'] = []
    cityMap.forEach((cityPosts, normalizedCity) => {
      const firstCityPost = cityPosts[0]
      const cityName = locale === 'en'
        ? (firstCityPost.frontmatter.city || firstCityPost.frontmatter.oras)
        : (firstCityPost.frontmatter.oras || firstCityPost.frontmatter.city)

      cities.push({
        city: cityName || normalizedCity,
        normalizedCity,
        posts: cityPosts
      })
    })

    result.push({
      country: countryName,
      normalizedCountry: normalizedTara,
      cities
    })
  })

  return result
}

export function generateStaticParams() {
  return locales.filter((locale) => locale !== 'ro').map((locale) => ({ locale }))
}

export default async function DestinationsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)
  const posts = getAllPosts(locale)
  const groupedData = groupPostsByLocation(posts, locale)

  return (
    <main className="min-h-screen bg-background w-full">
      <Header locale={locale} />
      <section className="py-5 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-foreground">{t.destinations.pageTitle}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.destinations.pageSubtitle}
          </p>
        </div>
      </section>
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 space-y-16">
          {groupedData.map((countryData) => (
            <div key={countryData.normalizedCountry} className="space-y-8">
              {/* Country title with link */}
              <div className="flex items-center gap-4">
                <Link
                  href={`/${locale}/${locationToSlug(countryData.country)}`}
                  className="text-4xl font-bold text-foreground hover:text-primary transition-colors flex items-center gap-3 group"
                >
                  {countryData.country}
                  <svg
                    className="w-6 h-6 text-primary opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Cities horizontal scroll */}
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6 min-w-max">
                  {countryData.cities.map((cityData) => (
                    <div key={cityData.normalizedCity} className="flex-shrink-0 w-80">
                      <Link
                        href={`/${locale}/${locationToSlug(cityData.city)}`}
                        className="block group"
                      >
                        <div className="relative h-64 overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                          {/* Use first post's image as city card image */}
                          {cityData.posts[0] && (
                            <>
                              <img
                                src={cityData.posts[0].frontmatter.featuredImage || '/images/posts/default.jpg'}
                                alt={cityData.city}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                                  {cityData.city}
                                </h3>
                                <p className="text-sm text-white/80">
                                  {cityData.posts.length} {cityData.posts.length === 1
                                    ? (locale === 'ro' ? 'articol' : 'article')
                                    : (locale === 'ro' ? 'articole' : 'articles')
                                  }
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  )
}

