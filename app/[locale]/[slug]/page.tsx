import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import TableOfContents from '@/components/TableOfContents'
import GalleryInitializer from '@/components/GalleryInitializer'
// PostContent no longer needed - HTML is generated at build time
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations, type Locale, locales } from '@/lib/translations'
import { getPostBySlug, getAllPostSlugs, getRelatedPostsByCity } from '@/lib/posts'

export async function generateStaticParams() {
  const params: Array<{ locale: Locale; slug: string }> = []
  
  locales.forEach((locale) => {
    const slugs = getAllPostSlugs(locale)
    slugs.forEach((slug) => {
      params.push({ locale, slug })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelblog.ro'
  const url = `${siteUrl}/${locale}/${slug}`
  const imageUrl = post.frontmatter.featuredImage?.startsWith('http') 
    ? post.frontmatter.featuredImage 
    : `${siteUrl}${post.frontmatter.featuredImage || '/images/posts/default.jpg'}`
  
  const description = post.frontmatter.excerpt || post.frontmatter.description || post.frontmatter.descriere || ''
  const title = post.frontmatter.title
  const author = post.frontmatter.author || 'Travel Blog'
  const publishedTime = new Date(post.frontmatter.date).toISOString()
  const modifiedTime = post.frontmatter['date-modified'] 
    ? new Date(post.frontmatter['date-modified']).toISOString()
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
        'ro': `${siteUrl}/ro/${slug}`,
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
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  // Get related posts from the same city
  const city = post.frontmatter.oras || post.frontmatter.city
  const relatedPosts = city ? getRelatedPostsByCity(city, slug, locale, 8) : []
  
  // Get translations for breadcrumb
  const t = getTranslations(locale)

  // Generate JSON-LD structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelblog.ro'
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
    datePublished: new Date(post.frontmatter.date).toISOString(),
    dateModified: post.frontmatter['date-modified'] 
      ? new Date(post.frontmatter['date-modified']).toISOString()
      : new Date(post.frontmatter.date).toISOString(),
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
                  { label: t.breadcrumb.blog, href: `/${locale}/destinations` },
                  { label: post.frontmatter.title },
                ]}
              />
              
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
              
              {/* Title */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 leading-tight text-foreground">
                {post.frontmatter.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-center justify-center md:justify-start gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm border-t border-b border-gray-200 dark:border-gray-800 py-3 sm:py-4 mb-2 sm:mb-2">
                <div className="flex items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={post.frontmatter.date}>
                      {new Date(post.frontmatter.date).toLocaleDateString(locale === 'ro' ? 'ro-RO' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  {post.frontmatter.author && (
                    <>
                      <span className="text-gray-300 dark:text-gray-700">•</span>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{post.frontmatter.author}</span>
                      </div>
                    </>
                  )}
                </div>
                
                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start sm:ml-auto w-full sm:w-auto mt-1 sm:mt-0">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-md text-xs font-medium border border-primary-200 dark:border-primary-800"
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
                  [&_p]:text-muted-foreground [&_p]:text-[15px] sm:text-[17px] [&_p]:leading-relaxed [&_p]:mb-4 sm:mb-6 [&_p]:text-justify
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
                  [&_.durata]:inline-flex [&_.durata]:items-center [&_.durata]:gap-2 [&_.durata]:px-3 [&_.durata]:py-1.5 [&_.durata]:bg-primary/10 [&_.durata]:text-primary [&_.durata]:rounded-lg [&_.durata]:border [&_.durata]:border-primary/20 [&_.durata]:font-semibold [&_.durata]:text-sm [&_.durata]:my-2"
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              ></div>
              
              {/* Gallery Initializer - handles lightbox functionality */}
              <GalleryInitializer />
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

