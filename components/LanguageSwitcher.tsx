'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/lib/translations'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLocale = (pathSegments[0] as Locale) || 'ro'
  
  // Get path without locale
  const pathWithoutLocale = pathSegments.length > 1 
    ? '/' + pathSegments.slice(1).join('/')
    : '/'

  const switchLanguage = (newLocale: Locale) => {
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <div className="flex items-center space-x-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentLocale === locale
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

