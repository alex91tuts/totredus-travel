import Link from 'next/link'
import { type Locale } from '@/lib/translations'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  locale: Locale
}

export default function Breadcrumb({ items, locale }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 w-full">
      <ol className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-hidden">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`flex items-center gap-1.5 sm:gap-2 ${
              index === items.length - 1 ? 'flex-shrink min-w-0' : 'flex-shrink-0'
            }`}
          >
            {index > 0 && (
              <svg 
                className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium truncate block min-w-0">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

