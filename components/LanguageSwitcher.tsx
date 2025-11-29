'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/lib/translations'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const pathSegments = pathname.split('/').filter(Boolean)
  // Check if first segment is a locale
  const firstSegment = pathSegments[0]
  const isFirstSegmentLocale = locales.includes(firstSegment as Locale)

  const currentLocale = isFirstSegmentLocale ? (firstSegment as Locale) : 'ro'

  // Get path without locale
  const pathWithoutLocale = isFirstSegmentLocale
    ? '/' + pathSegments.slice(1).join('/')
    : '/' + pathSegments.join('/')

  const switchLanguage = (newLocale: Locale) => {
    // If switching to default locale (ro), remove locale prefix
    if (newLocale === 'ro') {
      // Ensure we don't end up with double slashes if pathWithoutLocale is just '/'
      const newPath = pathWithoutLocale === '/' ? '/' : pathWithoutLocale
      router.push(newPath)
    } else {
      // If switching to other locale, add locale prefix
      // Remove leading slash from pathWithoutLocale to avoid double slash
      const cleanPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale.substring(1) : pathWithoutLocale
      const newPath = `/${newLocale}/${cleanPath}`
      router.push(newPath.replace(/\/$/, '')) // Remove trailing slash if any
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentLocale === locale
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-muted'
            }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
