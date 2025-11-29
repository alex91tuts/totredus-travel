import { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/lib/translations'
import { getAllPostSlugs, getAllPosts } from '@/lib/posts'
import { type Locale } from '@/lib/translations'
import { countries } from '@/lib/generated/locations'

export const dynamic = 'force-static'

// Normalize function (same as in other files)
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
  return normalizeLocation(value).toLowerCase()
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Use environment variable or fallback for development
  // Use environment variable or fallback
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://locuirivizitat.workers.dev'


  const currentDate = new Date()

  // Helper function to normalize date to fixed time (00:00:00 UTC)
  const normalizeDate = (date: Date | string | null | undefined): Date => {
    // Helper to get a fixed current date (00:00:00 UTC)
    const getFixedDate = () => {
      const fixed = new Date()
      fixed.setUTCHours(0, 0, 0, 0)
      return fixed
    }

    if (!date) {
      return getFixedDate()
    }

    const dateObj = typeof date === 'string' ? new Date(date) : date

    // Check if date is invalid
    if (isNaN(dateObj.getTime())) {
      console.warn(`[Sitemap] Invalid date encountered: ${date}. Falling back to current date.`)
      return getFixedDate()
    }

    // Set time to 00:00:00 UTC to ensure consistency
    dateObj.setUTCHours(0, 0, 0, 0)
    return dateObj
  }

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Helper function to add URL entry
  const addUrl = (
    url: string,
    lastModified?: Date | string | null,
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly',
    priority: number = 0.5
  ) => {
    sitemapEntries.push({
      url: `${siteUrl}${url}`,
      lastModified: normalizeDate(lastModified),
      changeFrequency,
      priority,
    })
  }

  // Generate entries for each locale
  for (const locale of locales) {
    // Get all posts for this locale to check if content exists
    const posts = getAllPosts(locale as Locale)
    const postSlugs = getAllPostSlugs(locale)

    // For English locale: only add pages if there is content
    // For Romanian: always add (default locale)
    const hasContent = posts.length > 0 || postSlugs.length > 0

    // Skip English locale entirely if there's no content
    if (locale === 'en' && !hasContent) {
      continue
    }

    // Home page - highest priority
    addUrl(`/${locale}`, currentDate, 'daily', locale === defaultLocale ? 1.0 : 0.9)

    // Static pages
    addUrl(`/${locale}/about`, currentDate, 'monthly', 0.7)
    addUrl(`/${locale}/contact`, currentDate, 'monthly', 0.7)
    addUrl(`/${locale}/destinations`, currentDate, 'daily', 0.8)

    // Blog post pages - use date from frontmatter
    for (const slug of postSlugs) {
      // Find the post to get its date
      const post = posts.find(p => p.frontmatter.slug === slug)
      let lastModified = currentDate

      if (post) {
        // Use date-modified if available, otherwise use date
        const dateStr = post.frontmatter['date-modified'] || post.frontmatter.date
        if (dateStr) {
          lastModified = new Date(dateStr)
        }
      }

      addUrl(`/${locale}/${slug}`, lastModified, 'weekly', 0.7)
    }

    // Location pages (countries) - only add if there are posts for this country in this locale
    for (const country of countries) {
      const postsForCountry = posts.filter(post => {
        const normalizedTara = normalizeLocation(post.frontmatter.tara || post.frontmatter.country || '')
        return normalizedTara === normalizeLocation(country)
      })

      // Only add country page if there are posts for this country in this locale
      if (postsForCountry.length > 0 || locale !== 'en') {
        const countrySlug = locationToSlug(country)

        // Use the most recent post date for this country
        let lastModified = currentDate
        if (postsForCountry.length > 0) {
          const dates = postsForCountry
            .map(post => {
              const dateStr = post.frontmatter['date-modified'] || post.frontmatter.date
              if (!dateStr) return null
              const date = new Date(dateStr)
              return isNaN(date.getTime()) ? null : date
            })
            .filter((date): date is Date => date !== null)

          if (dates.length > 0) {
            // Get the most recent date
            lastModified = dates.reduce((latest, date) =>
              date > latest ? date : latest
            )
          }
        }

        addUrl(`/${locale}/${countrySlug}`, lastModified, 'weekly', 0.6)
      }
    }

    // Get cities from posts for this locale only
    // For Romanian: use 'oras' field
    // For English: use 'city' field (fallback to 'oras' if no 'city')
    const citySet = new Set<string>()

    for (const post of posts) {
      let city = ''
      if (locale === 'ro') {
        // Romanian: prefer 'oras'
        city = post.frontmatter.oras || post.frontmatter.city || ''
      } else {
        // English: prefer 'city', fallback to 'oras'
        city = post.frontmatter.city || post.frontmatter.oras || ''
      }

      if (city) {
        citySet.add(normalizeLocation(city))
      }
    }

    // Add city pages only for cities that exist in posts for this locale
    for (const normalizedCity of Array.from(citySet)) {
      const citySlug = locationToSlug(normalizedCity)

      // Get all posts for this city to find the most recent date
      const postsForCity = posts.filter(post => {
        let city = ''
        if (locale === 'ro') {
          city = post.frontmatter.oras || post.frontmatter.city || ''
        } else {
          city = post.frontmatter.city || post.frontmatter.oras || ''
        }
        return normalizeLocation(city) === normalizedCity
      })

      // Use the most recent post date for this city
      let lastModified = currentDate
      if (postsForCity.length > 0) {
        const dates = postsForCity
          .map(post => {
            const dateStr = post.frontmatter['date-modified'] || post.frontmatter.date
            if (!dateStr) return null
            const date = new Date(dateStr)
            return isNaN(date.getTime()) ? null : date
          })
          .filter((date): date is Date => date !== null)

        if (dates.length > 0) {
          // Get the most recent date
          lastModified = dates.reduce((latest, date) =>
            date > latest ? date : latest
          )
        }
      }

      addUrl(`/${locale}/${citySlug}`, lastModified, 'weekly', 0.6)
    }
  }

  return sitemapEntries
}
