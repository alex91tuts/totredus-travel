import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import TableOfContents from '@/components/TableOfContents'
import GalleryInitializer from '@/components/GalleryInitializer'
// PostContent no longer needed - HTML is generated at build time
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, type Locale, locales } from '@/lib/translations'
import { getPostBySlug, getAllPostSlugs, getRelatedPostsByCity, getPostsByLocation } from '@/lib/posts'
import { cities, countries, cityMap } from '@/lib/generated/locations'
import FilteredPostsGrid from '@/components/FilteredPostsGrid'
import { getCategoryName } from '@/lib/categoryMap'
import AuthorBox from '@/components/AuthorBox'

// Normalize function (same as in extract-locations.ts)
function normalizeLocation(value: string): string {
  if (!value || typeof value !== 'string') return ''

  const normalized = value
    .replace(/-/g, ' ') // Replace hyphens with spaces for matching
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toUpperCase()

  // Ignore specific values (must match scripts/extract-locations.ts)
  const IGNORED_VALUES = ['MAI MULTE', 'ALTELE', 'DE VIZITAT']
  if (IGNORED_VALUES.includes(normalized)) return ''

  return normalized
}

// Convert ALL CAPS to Title Case
function toTitleCase(str: string): string {
  if (!str) return ''
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Helper to safely parse dates including DD.MM.YYYY format
function parseDate(dateInput: string | Date | undefined | null): Date {
  if (!dateInput) return new Date()

  // If it's already a Date object
  if (dateInput instanceof Date) {
    return isNaN(dateInput.getTime()) ? new Date() : dateInput
  }

  const dateStr = String(dateInput).trim()

  // Try parsing DD.MM.YYYY format
  const roDateMatch = dateStr.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/)
  if (roDateMatch) {
    const day = parseInt(roDateMatch[1], 10)
    const month = parseInt(roDateMatch[2], 10) - 1 // Month is 0-indexed
    const year = parseInt(roDateMatch[3], 10)

    const date = new Date(year, month, day)
    if (!isNaN(date.getTime())) {
      return date
    }
  }

  // Try standard parsing
  const date = new Date(dateStr)
  if (!isNaN(date.getTime())) {
    return date
  }

  // Fallback to current date if parsing fails
  return new Date()
}

export async function generateStaticParams() {
  const params: Array<{ locale: Locale; slug: string }> = []

  locales.filter(locale => locale !== 'ro').forEach((locale) => {
    // Add all post slugs
    const slugs = getAllPostSlugs(locale)
    slugs.forEach((slug) => {
      params.push({ locale, slug })
    })

    // Add all location slugs (lowercase and hyphenated)
    for (const country of countries) {
      params.push({ locale, slug: country.toLowerCase().replace(/\s+/g, '-') })
    }
    for (const city of cities) {
      params.push({ locale, slug: city.toLowerCase().replace(/\s+/g, '-') })
    }
  })

  return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params

  // Check if slug is a location
  const normalizedSlug = normalizeLocation(slug)
  const isCountry = (countries as readonly string[]).includes(normalizedSlug)
  const isCity = (cities as readonly string[]).includes(normalizedSlug)

  if (isCountry || isCity) {
    const posts = getPostsByLocation(normalizedSlug, locale)
    let locationName = normalizedSlug
    const locationEntry = Object.values(cityMap).find(
      entry => normalizeLocation(entry.tara) === normalizedSlug ||
        normalizeLocation(entry.oras) === normalizedSlug
    )
    if (locationEntry) {
      if (normalizeLocation(locationEntry.tara) === normalizedSlug) {
        locationName = locationEntry.tara
      } else {
        locationName = locationEntry.oras
      }
    }
    if (posts.length > 0) {
      const firstPost = posts[0]
      if (isCity) {
        const postCity = locale === 'en'
          ? (firstPost.frontmatter.city || firstPost.frontmatter.oras)
          : (firstPost.frontmatter.oras || firstPost.frontmatter.city)
        if (postCity) locationName = postCity
      } else if (isCountry) {
        const postCountry = firstPost.frontmatter.tara || firstPost.frontmatter.country
        if (postCountry) locationName = postCountry
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://toplocuri.ro')
    return {
      title: `${locationName} | Travel Blog`,
      description: `${posts.length} ${posts.length === 1 ? 'article' : 'articles'} about ${locationName}`,
      openGraph: {
        title: `${locationName} | Travel Blog`,
        description: `${posts.length} ${posts.length === 1 ? 'article' : 'articles'} about ${locationName}`,
        url: `${siteUrl}/${locale}/${slug}`,
      },
    }
  }

  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://locuirivizitat.workers.dev')

  const url = locale === 'ro' ? `${siteUrl}/${slug}` : `${siteUrl}/${locale}/${slug}`
  const imageUrl = post.frontmatter.featuredImage?.startsWith('http')
    ? post.frontmatter.featuredImage
    : `${siteUrl}${post.frontmatter.featuredImage || '/images/posts/default.jpg'}`

  const description = post.frontmatter.excerpt || post.frontmatter.description || post.frontmatter.descriere || ''
  const title = post.frontmatter.title
  const author = post.frontmatter.author || 'Travel Blog'
  const publishedTime = parseDate(post.frontmatter.date).toISOString()
  const modifiedTime = post.frontmatter['date-modified']
    ? parseDate(post.frontmatter['date-modified']).toISOString()
    : publishedTime

  return {
    title: `${title} | Travel Blog`,
    description,
    keywords: post.frontmatter.tags?.join(', ') || post.frontmatter.keyword || '',
    authors: [{ name: author }],
    openGraph: {
      title,
      description,
      url,
      siteName: 'Travel Blog',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [author],
      tags: post.frontmatter.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: `@${author.replace(/\s+/g, '').toLowerCase()}`,
    },
    alternates: {
      canonical: url,
      languages: {
        'ro': `${siteUrl}/${slug}`,
        'en': `${siteUrl}/en/${slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params

  // Check if slug is a location (normalize and check)
  const normalizedSlug = normalizeLocation(slug)
  const isCountry = (countries as readonly string[]).includes(normalizedSlug)
  const isCity = (cities as readonly string[]).includes(normalizedSlug)

  // If it's a location, render location page
  if (isCountry || isCity) {
    const t = getTranslations(locale)
    let posts = getPostsByLocation(normalizedSlug, locale)

    // Sort posts: those with anchors first
    posts = [...posts].sort((a, b) => {
      const aHasAnchors = a.frontmatter.anchors && Array.isArray(a.frontmatter.anchors) && a.frontmatter.anchors.length > 0
      const bHasAnchors = b.frontmatter.anchors && Array.isArray(b.frontmatter.anchors) && b.frontmatter.anchors.length > 0

      if (aHasAnchors && !bHasAnchors) return -1
      if (!aHasAnchors && bHasAnchors) return 1
      return 0
    })

    // Get location name
    let locationName = normalizedSlug
    const locationEntry = Object.values(cityMap).find(
      entry => normalizeLocation(entry.tara) === normalizedSlug ||
        normalizeLocation(entry.oras) === normalizedSlug
    )
    if (locationEntry) {
      if (normalizeLocation(locationEntry.tara) === normalizedSlug) {
        locationName = locationEntry.tara
      } else {
        locationName = locationEntry.oras
      }
    }

    // Get display name from posts if available
    if (posts.length > 0) {
      const firstPost = posts[0]
      if (isCity) {
        const postCity = locale === 'en'
          ? (firstPost.frontmatter.city || firstPost.frontmatter.oras)
          : (firstPost.frontmatter.oras || firstPost.frontmatter.city)
        if (postCity) {
          locationName = postCity
        }
      } else if (isCountry) {
        const postCountry = firstPost.frontmatter.tara || firstPost.frontmatter.country
        if (postCountry) {
          locationName = postCountry
        }
      }
    }

    return (
      <main className="min-h-screen bg-background w-full">
        <Header locale={locale} />
        <section className="py-8 md:py-12 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <nav className="text-sm text-muted-foreground mb-4">
                <Link href={`/${locale}`} className="hover:text-foreground">
                  {t.nav.home}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">{toTitleCase(locationName)}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {locationName}
              </h1>
            </div>

            {posts.length > 0 ? (
              <FilteredPostsGrid posts={posts} locale={locale} isCountry={isCountry} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {locale === 'ro'
                    ? 'Nu s-au găsit articole pentru această locație.'
                    : 'No articles found for this location.'
                  }
                </p>
              </div>
            )}
          </div>
        </section>
        {/* <Footer locale={locale} /> */}
        <Footer locale={locale} />
      </main>
    )
  }

  // Otherwise, try to get post
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  // Get related posts from the same city
  const city = post.frontmatter.oras || post.frontmatter.city
  const relatedPosts = city ? getRelatedPostsByCity(city, slug, locale) : []

  // Get translations for breadcrumb
  const t = getTranslations(locale)

  // Generate JSON-LD structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://locuirivizitat.workers.dev')

  const url = `${siteUrl}/${locale}/${slug}`
  const imageUrl = post.frontmatter.featuredImage?.startsWith('http')
    ? post.frontmatter.featuredImage
    : `${siteUrl}${post.frontmatter.featuredImage || '/images/posts/default.jpg'}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt || post.frontmatter.description || post.frontmatter.descriere || '',
    image: imageUrl,
    datePublished: parseDate(post.frontmatter.date).toISOString(),
    dateModified: post.frontmatter['date-modified']
      ? parseDate(post.frontmatter['date-modified']).toISOString()
      : parseDate(post.frontmatter.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.frontmatter.author || 'Travel Blog',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Travel Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: post.frontmatter.cat || 'Travel',
    keywords: post.frontmatter.tags?.join(', ') || post.frontmatter.keyword || '',
    inLanguage: locale === 'ro' ? 'ro-RO' : 'en-US',
    ...(post.frontmatter.oras || post.frontmatter.city ? {
      contentLocation: {
        '@type': 'Place',
        name: post.frontmatter.oras || post.frontmatter.city,
        ...(post.frontmatter.latitudine && post.frontmatter.longitudine ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: post.frontmatter.latitudine,
            longitude: post.frontmatter.longitudine,
          },
        } : {}),
      },
    } : {}),
  }

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ro' ? 'Acasă' : 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'ro' ? 'Destinații' : 'Destinations',
        item: `${siteUrl}/${locale}/destinations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.frontmatter.title,
        item: url,
      },
    ],
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-background w-full">
        <Header locale={locale} />
        <article className="pb-8 sm:pb-16 w-full">
          {/* Table of Contents - Mobile (Fixed) */}
          <TableOfContents items={post.tableOfContents} locale={locale} variant="mobile" />

          <div className="mx-auto px-3 sm:px-4 pt-2 sm:pt-2 pb-6 sm:py-8 md:py-4 w-full">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8 max-w-[1350px] mx-auto w-full">
              {/* Table of Contents - Desktop */}
              <TableOfContents items={post.tableOfContents} locale={locale} variant="desktop" />

              {/* Main Content */}
              <div className="w-full lg:w-[740px] lg:flex-shrink-0">
                {/* Breadcrumb */}
                <Breadcrumb
                  locale={locale}
                  items={[
                    { label: t.breadcrumb.home, href: `/${locale}` },
                    ...(normalizeLocation(post.frontmatter.tara || post.frontmatter.country) ? [{
                      label: toTitleCase(post.frontmatter.tara || post.frontmatter.country),
                      href: `/${locale}/${normalizeLocation(post.frontmatter.tara || post.frontmatter.country).toLowerCase().replace(/\s+/g, '-')}`
                    }] : []),
                    ...(normalizeLocation(post.frontmatter.oras || post.frontmatter.city) ? [{
                      label: toTitleCase(post.frontmatter.oras || post.frontmatter.city),
                      href: `/${locale}/${normalizeLocation(post.frontmatter.oras || post.frontmatter.city).toLowerCase().replace(/\s+/g, '-')}`
                    }] : []),
                    { label: post.frontmatter.title },
                  ]}
                />

                {/* Title */}
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 leading-tight text-foreground">
                  {post.frontmatter.title}
                </h1>

                {/* Categories for attractions */}
                {post.frontmatter.cat === 'atractie' && (
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {[
                      post.frontmatter['categorie-generata-1'],
                      post.frontmatter['categorie-generata-2'],
                      post.frontmatter['categorie-generata-3'],
                    ]
                      .filter(Boolean)
                      .map((code) => (
                        <span
                          key={code}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {getCategoryName(code as string, locale)}
                        </span>
                      ))}
                  </div>
                )}

                {/* Featured Image */}
                <div className="relative aspect-video overflow-hidden rounded-lg mb-4 sm:mb-6 md:mb-8 shadow-sm mt-2 sm:mt-4">
                  <Image
                    src={post.frontmatter.featuredImage || '/images/posts/default.jpg'}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 740px"
                  />
                </div>

                {/* Meta Info */}
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 py-5 my-6 sm:my-8 border-y border-border/60 dark:border-white/10 bg-muted/5 px-2">
                  <div className="flex items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <time dateTime={post.frontmatter.date} className="font-medium">
                        {new Date(post.frontmatter.date).toLocaleDateString(locale === 'ro' ? 'ro-RO' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    {post.frontmatter.author && (
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-border"></div>
                        <User className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{post.frontmatter.author}</span>
                      </div>
                    )}
                  </div>

                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
                      <Tag className="w-3.5 h-3.5 text-muted-foreground/70 mr-1" />
                      {post.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/80 text-secondary-foreground hover:bg-primary/15 hover:text-primary transition-colors cursor-default border border-transparent hover:border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-full w-full mt-4 sm:mt-0
                  [&_h1]:text-xl sm:text-2xl [&_h1]:font-bold [&_h1]:mb-4 sm:mb-6 [&_h1]:mt-8 sm:mt-12 [&_h1]:text-foreground
                  [&_h2]:text-xl sm:text-2xl [&_h2]:font-bold [&_h2]:mb-3 sm:mb-4 [&_h2]:mt-6 sm:mt-10 [&_h2]:pb-2 [&_h2]:border-b-0 [&_h2]:text-foreground
                  [&_h3]:text-lg sm:text-xl [&_h3]:font-bold [&_h3]:mb-2 sm:mb-3 [&_h3]:mt-6 sm:mt-8 [&_h3]:text-foreground
                  [&_h4]:text-base sm:text-lg [&_h4]:font-semibold [&_h4]:mb-2 [&_h4]:mt-4 sm:mt-6 [&_h4]:text-foreground
                  [&_p]:text-muted-foreground [&_p]:text-[15px] sm:[&_p]:text-[17px] [&_p]:leading-relaxed [&_p]:mb-4 sm:mb-6 [&_p]:text-justify
                  [&_a]:text-primary [&_a]:font-medium [&_a]:no-underline hover:[&_a]:underline [&_a]:break-words
                  [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:my-6 sm:my-8 [&_img]:w-full [&_img]:h-auto [&_img]:max-w-full
                  [&_strong]:text-foreground [&_strong]:font-semibold
                  [&_ul]:my-4 sm:my-6 [&_ul]:list-disc [&_ul]:pl-5 sm:pl-6
                  [&_ol]:my-4 sm:my-6 [&_ol]:list-decimal [&_ol]:pl-5 sm:pl-6
                  [&_li]:my-2 [&_li]:leading-relaxed [&_li]:text-muted-foreground [&_li]:text-[15px] sm:[&_li]:text-[17px]
                  [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-muted
                  [&_blockquote]:pl-4 sm:pl-6 [&_blockquote]:pr-3 sm:pr-4 [&_blockquote]:py-3 sm:py-4 [&_blockquote]:italic [&_blockquote]:my-4 sm:my-6 [&_blockquote]:text-foreground
                  [&_hr]:border-border [&_hr]:my-6 sm:my-10 [&_hr]:opacity-40 dark:[&_hr]:opacity-60
                  [&_code]:text-primary [&_code]:bg-muted
                  [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs sm:text-sm [&_code]:break-all
                  [&_table]:w-full [&_table]:my-6 sm:my-8 [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-lg [&_table]:shadow-md
                  [&_thead]:bg-primary/10 dark:[&_thead]:bg-primary/20
                  [&_th]:px-4 sm:px-6 [&_th]:py-3 sm:py-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground [&_th]:border-b-2 [&_th]:border-primary/30 [&_th]:text-[15px] sm:[&_th]:text-[17px]
                  [&_td]:px-4 sm:px-6 [&_td]:py-3 sm:py-4 [&_td]:text-muted-foreground [&_td]:border-b [&_td]:border-border/50 [&_td]:text-[15px] sm:[&_td]:text-[17px]
                  [&_tbody_tr]:transition-colors hover:[&_tbody_tr]:bg-muted/50
                  [&_tbody_tr:last-child_td]:border-b-0
                  [&_.durata]:inline-flex [&_.durata]:items-center [&_.durata]:gap-2 [&_.durata]:px-3 [&_.durata]:py-1.5 [&_.durata]:bg-primary/10 [&_.durata]:text-primary [&_.durata]:rounded-lg [&_.durata]:border [&_.durata]:border-primary/20 [&_.durata]:font-semibold [&_.durata]:text-sm [&_.durata]:my-2"
                  dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                ></div>

                {/* Gallery Initializer - handles lightbox functionality */}
                <GalleryInitializer />

                {/* Author Box */}
                {post.frontmatter.author && (
                  <AuthorBox author={post.frontmatter.author} locale={locale} />
                )}
              </div>

              {/* Sidebar */}
              {relatedPosts.length > 0 && (
                <aside className="w-full lg:w-[320px] lg:flex-shrink-0 lg:sticky lg:top-8 lg:self-start">
                  <div className="bg-card rounded-lg p-2 sm:p-2 border border-border lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
                    <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {locale === 'ro' ? `${city}` : `${city}`}
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.frontmatter.slug}
                          href={`/${locale}/${relatedPost.frontmatter.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3 items-start">
                            <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={relatedPost.frontmatter.featuredImage || '/images/posts/default.jpg'}
                                alt={relatedPost.frontmatter.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="96px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                {relatedPost.frontmatter.title}
                              </h4>
                              {relatedPost.frontmatter.date && (
                                <time className="text-xs text-muted-foreground mt-1 block">
                                  {new Date(relatedPost.frontmatter.date).toLocaleDateString(locale === 'ro' ? 'ro-RO' : 'en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </time>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </article>
        <Footer locale={locale} />
      </main>
    </>
  )
}
