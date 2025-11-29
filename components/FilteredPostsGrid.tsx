'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeftRight } from 'lucide-react'
import type { Post } from '@/lib/posts'
import type { Locale } from '@/lib/translations'
import { getCategoryName } from '@/lib/categoryMap'

interface FilteredPostsGridProps {
  posts: Post[]
  locale: Locale
  isCountry?: boolean
}

// Normalize function (same as in other files)
function normalizeLocation(value: string): string {
  if (!value || typeof value !== 'string') return ''
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toUpperCase()
}

export default function FilteredPostsGrid({ posts, locale, isCountry = false }: FilteredPostsGridProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts)
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set())

  // Get available categories from posts
  const availableCategories = Array.from(
    new Set(
      posts.flatMap(post => [
        post.frontmatter['categorie-generata-1'],
        post.frontmatter['categorie-generata-2'],
        post.frontmatter['categorie-generata-3'],
      ].filter(Boolean))
    )
  ).sort()

  // Get available cities from posts (for country pages only)
  const availableCities = isCountry ? Array.from(
    new Set(
      posts.map(post => {
        if (locale === 'ro') {
          return post.frontmatter.oras || post.frontmatter.city || ''
        } else {
          return post.frontmatter.city || post.frontmatter.oras || ''
        }
      }).filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b)) : []

  // Filter posts when categories or cities change
  useEffect(() => {
    let filtered = posts

    // Filter by cities first (if country page and cities selected)
    if (isCountry && selectedCities.size > 0) {
      filtered = filtered.filter(post => {
        const city = locale === 'ro'
          ? (post.frontmatter.oras || post.frontmatter.city || '')
          : (post.frontmatter.city || post.frontmatter.oras || '')
        return city && selectedCities.has(city)
      })
    }

    // Then filter by categories (if categories selected)
    if (selectedCategories.size > 0) {
      filtered = filtered.filter(post => {
        const postCategories = [
          post.frontmatter['categorie-generata-1'],
          post.frontmatter['categorie-generata-2'],
          post.frontmatter['categorie-generata-3'],
        ].filter(Boolean)
        return postCategories.some(cat => selectedCategories.has(cat))
      })
    }

    setFilteredPosts(filtered)
  }, [posts, selectedCategories, selectedCities, locale, isCountry])

  const toggleCategory = (category: string) => {
    const newSelected = new Set(selectedCategories)
    if (newSelected.has(category)) {
      newSelected.delete(category)
    } else {
      newSelected.add(category)
    }
    setSelectedCategories(newSelected)
  }

  const toggleCity = (city: string) => {
    const newSelected = new Set(selectedCities)
    if (newSelected.has(city)) {
      newSelected.delete(city)
    } else {
      newSelected.add(city)
    }
    setSelectedCities(newSelected)
  }

  const clearFilters = () => {
    setSelectedCategories(new Set())
    setSelectedCities(new Set())
  }

  // If no categories available, just show posts without filters
  if (availableCategories.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const city = locale === 'en'
            ? (post.frontmatter.city || post.frontmatter.oras)
            : (post.frontmatter.oras || post.frontmatter.city)

          const hasAnchors = post.frontmatter.anchors && Array.isArray(post.frontmatter.anchors) && post.frontmatter.anchors.length > 0

          return (
            <Link
              key={post.frontmatter.slug}
              href={`/${locale}/${post.frontmatter.slug}`}
              className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${hasAnchors
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl'
                  : ''
                }`}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={post.frontmatter.featuredImage || '/images/posts/default.jpg'}
                  alt={post.frontmatter.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {city && (
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-foreground shadow-lg">
                    {city}
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white line-clamp-3 mb-2 group-hover:text-primary-300 transition-colors">
                    {post.frontmatter.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-white/80">
                    {post.frontmatter.author && (
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {post.frontmatter.author}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <time dateTime={post.frontmatter.date}>
                        {(() => {
                          const date = new Date(post.frontmatter.date)
                          return isNaN(date.getTime())
                            ? post.frontmatter.date
                            : date.toLocaleDateString(
                              locale === 'ro' ? 'ro-RO' : 'en-US',
                              { year: 'numeric', month: 'short', day: 'numeric' }
                            )
                        })()}
                      </time>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  const hasActiveFilters = selectedCategories.size > 0 || selectedCities.size > 0

  return (
    <>
      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-foreground whitespace-nowrap">
            {locale === 'ro' ? 'Filtrează' : 'Filter'}
          </span>
          <div className="flex items-center gap-3 flex-1 justify-end">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-primary hover:text-primary/80 underline transition-colors whitespace-nowrap"
              >
                {locale === 'ro' ? 'Șterge filtrele' : 'Clear filters'}
              </button>
            )}
            {/* Swipe indicator for mobile */}
            <div className="md:hidden flex items-center">
              <ArrowLeftRight className="w-5 h-5 text-primary animate-[slide_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* City filters (only for country pages) */}
        {isCountry && availableCities.length > 0 && (
          <div className="mb-4">
            <div className="mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                {locale === 'ro' ? 'Orașe' : 'Cities'}
              </span>
            </div>

            {/* Mobile: Horizontal scroll for cities */}
            <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                {availableCities.map((city) => {
                  const isSelected = selectedCities.has(city)
                  return (
                    <button
                      key={city}
                      onClick={() => toggleCity(city)}
                      className={`inline-flex items-center flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border-2 ${isSelected
                          ? 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 border-primary font-semibold'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 border-transparent hover:border-muted-foreground/20'
                        }`}
                    >
                      {city}
                      {isSelected && (
                        <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Desktop: Wrap for cities */}
            <div className="hidden md:flex flex-wrap gap-2">
              {availableCities.map((city) => {
                const isSelected = selectedCities.has(city)
                return (
                  <button
                    key={city}
                    onClick={() => toggleCity(city)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all border-2 ${isSelected
                        ? 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 border-primary font-semibold'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 border-transparent hover:border-muted-foreground/20'
                      }`}
                  >
                    {city}
                    {isSelected && (
                      <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Category filters label */}
        {availableCategories.length > 0 && (
          <div className="mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              {locale === 'ro' ? 'Categorii' : 'Categories'}
            </span>
          </div>
        )}

        {/* Mobile: Two rows with horizontal scroll */}
        <div className="block md:hidden space-y-2">
          {/* First row */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {availableCategories.slice(0, Math.ceil(availableCategories.length / 2)).map((code) => {
                const isSelected = selectedCategories.has(code)
                return (
                  <button
                    key={code}
                    onClick={() => toggleCategory(code)}
                    className={`inline-flex items-center flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${isSelected
                        ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                  >
                    {getCategoryName(code, locale)}
                    {isSelected && (
                      <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Second row */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {availableCategories.slice(Math.ceil(availableCategories.length / 2)).map((code) => {
                const isSelected = selectedCategories.has(code)
                return (
                  <button
                    key={code}
                    onClick={() => toggleCategory(code)}
                    className={`inline-flex items-center flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${isSelected
                        ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                  >
                    {getCategoryName(code, locale)}
                    {isSelected && (
                      <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Desktop: Single row with wrap */}
        <div className="hidden md:flex flex-wrap gap-2">
          {availableCategories.map((code) => {
            const isSelected = selectedCategories.has(code)
            return (
              <button
                key={code}
                onClick={() => toggleCategory(code)}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${isSelected
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
              >
                {getCategoryName(code, locale)}
                {isSelected && (
                  <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>

        {hasActiveFilters && (
          <p className="mt-3 text-sm text-muted-foreground">
            {filteredPosts.length} {filteredPosts.length === 1
              ? (locale === 'ro' ? 'articol găsit' : 'article found')
              : (locale === 'ro' ? 'articole găsite' : 'articles found')
            }
          </p>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const city = locale === 'en'
              ? (post.frontmatter.city || post.frontmatter.oras)
              : (post.frontmatter.oras || post.frontmatter.city)

            const hasAnchors = post.frontmatter.anchors && Array.isArray(post.frontmatter.anchors) && post.frontmatter.anchors.length > 0

            return (
              <Link
                key={post.frontmatter.slug}
                href={`/${locale}/${post.frontmatter.slug}`}
                className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${hasAnchors
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl'
                    : ''
                  }`}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={post.frontmatter.featuredImage || '/images/posts/default.jpg'}
                    alt={post.frontmatter.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {city && (
                    <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-foreground shadow-lg">
                      {city}
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white line-clamp-3 mb-2 group-hover:text-primary-300 transition-colors">
                      {post.frontmatter.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-white/80">
                      {post.frontmatter.author && (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {post.frontmatter.author}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time dateTime={post.frontmatter.date}>
                          {(() => {
                            const date = new Date(post.frontmatter.date)
                            return isNaN(date.getTime())
                              ? post.frontmatter.date
                              : date.toLocaleDateString(
                                locale === 'ro' ? 'ro-RO' : 'en-US',
                                { year: 'numeric', month: 'short', day: 'numeric' }
                              )
                          })()}
                        </time>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            {locale === 'ro'
              ? 'Nu s-au găsit articole pentru categoriile selectate.'
              : 'No articles found for selected categories.'
            }
          </p>
        </div>
      )}
    </>
  )
}
