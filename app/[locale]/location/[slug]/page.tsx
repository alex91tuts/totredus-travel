import { permanentRedirect } from 'next/navigation'
import { type Locale } from '@/lib/translations'

import { locales } from '@/lib/translations'
import { cities, countries } from '@/lib/generated/locations'

// Normalize function (same as in sitemap.ts)
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

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    // Add all countries
    for (const country of countries) {
      params.push({
        locale,
        slug: locationToSlug(country),
      })
    }

    // Add all cities
    for (const city of cities) {
      params.push({
        locale,
        slug: locationToSlug(city),
      })
    }
  }

  return params
}

export default async function LocationPage({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params

  // Redirect permanently (301) to the page without /location/ to avoid duplicate content
  permanentRedirect(`/${locale}/${slug}`)
}

