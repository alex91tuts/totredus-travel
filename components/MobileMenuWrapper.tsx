'use client'

import { useState } from 'react'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import { MobileMenuButton, MobileMenuContainer } from './MobileMenuToggle'
import { type Locale } from '@/lib/translations'

interface MobileMenuWrapperProps {
  locale: Locale
  countries: { name: string; slug: string }[]
  t: {
    nav: {
      home: string
      destinations: string
      about: string
      contact: string
    }
  }
}

export default function MobileMenuWrapper({ locale, countries, t }: MobileMenuWrapperProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <MobileMenuButton isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
      <MobileMenuContainer isOpen={isMenuOpen}>
        <div className="pt-4 space-y-2">
          <Link 
            href={`/${locale}`} 
            className="block py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.nav.home}
          </Link>
          <div className="py-2">
            <div className="text-foreground font-medium mb-1">{t.nav.destinations}</div>
            <Link 
              href={`/${locale}/destinations`} 
              className="block py-2 pl-4 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {locale === 'ro' ? 'Toate destinațiile' : 'All destinations'}
            </Link>
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/${locale}/${country.slug}`}
                className="block py-2 pl-4 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {country.name}
              </Link>
            ))}
          </div>
          <Link 
            href={`/${locale}/about`} 
            className="block py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.nav.about}
          </Link>
          <Link 
            href={`/${locale}/contact`} 
            className="block py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.nav.contact}
          </Link>
          
          {/* Mobile controls */}
          <div className="sm:hidden flex items-center gap-2 pt-4 border-t border-border">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </MobileMenuContainer>
    </>
  )
}

