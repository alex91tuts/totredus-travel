'use client'

import { useState, useEffect } from 'react'
import { type TableOfContentsItem } from '@/lib/posts'
import { type Locale } from '@/lib/translations'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
  locale: Locale
  variant?: 'desktop' | 'mobile'
}

export default function TableOfContents({ items, locale, variant = 'desktop' }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (variant !== 'mobile') return

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      setShowButton(scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [variant])

  if (items.length === 0) {
    return null
  }

  const handleClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 20 // Reduced offset since header is now relative
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    // Close mobile menu after clicking
    setIsOpen(false)
  }

  if (variant === 'mobile') {
    return (
      <>
        {/* Fixed button at top-left */}
        {showButton && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden fixed top-0 left-0 z-50 m-2 px-3 py-2 text-xs font-medium text-foreground bg-card border border-border rounded-lg hover:bg-muted transition-all shadow-md flex items-center gap-2"
            aria-expanded={isOpen}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>CUPRINS</span>
          </button>
        )}

        {/* Dropdown overlay */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)}>
            <div 
              className="absolute top-14 left-2 right-2 bg-card border border-border rounded-lg shadow-xl max-h-[70vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-foreground">
                    {locale === 'ro' ? 'CUPRINS' : 'TABLE OF CONTENTS'}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="space-y-2">
                  {items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleClick(item.id, e)}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border last:border-b-0"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <aside className="hidden lg:block w-[200px] flex-shrink-0 sticky top-8 self-start">
      <div className="bg-card rounded-lg p-4 border border-border">
        <h3 className="text-sm font-bold mb-3 text-foreground">
          {locale === 'ro' ? 'CUPRINS' : 'TABLE OF CONTENTS'}
        </h3>
        <nav className="space-y-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(item.id, e)}
              className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1 leading-relaxed"
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}

