'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import { getTranslations, type Locale } from '@/lib/translations'

export default function Header({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative bg-background border-b border-border shadow-sm w-full">
      <nav className="mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-7xl w-full">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
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
            <Link href={`/${locale}`} className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.home}
            </Link>
            <Link href={`/${locale}/destinations`} className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.destinations}
            </Link>
            <Link href={`/${locale}/about`} className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.about}
            </Link>
            <Link href={`/${locale}/contact`} className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.contact}
            </Link>
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border space-y-2">
            <Link 
              href={`/${locale}`} 
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
            <Link 
              href={`/${locale}/destinations`} 
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.destinations}
            </Link>
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
        )}
      </nav>
    </header>
  )
}

