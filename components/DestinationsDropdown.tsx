'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { type Locale } from '@/lib/translations'

interface DestinationsDropdownProps {
  locale: Locale
  countries: { name: string; slug: string }[]
  destinationsLabel: string
  allDestinationsLabel: string
}

export default function DestinationsDropdown({ 
  locale, 
  countries, 
  destinationsLabel,
  allDestinationsLabel
}: DestinationsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
      >
        {destinationsLabel}
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50 py-2">
          <Link
            href={`/${locale}/destinations`}
            className="block px-4 py-2 text-foreground hover:bg-muted transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {allDestinationsLabel}
          </Link>
          <div className="border-t border-border my-1"></div>
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/${locale}/${country.slug}`}
              className="block px-4 py-2 text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {country.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

