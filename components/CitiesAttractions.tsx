import Link from 'next/link'
import Image from 'next/image'
import { type Locale, getTranslations } from '@/lib/translations'
import { getAllPosts, type Post } from '@/lib/posts'

// Normalize location function (same as in extract-locations.ts)
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
  return normalizeLocation(value).toLowerCase().replace(/\s+/g, '-')
}

// Group posts by city
interface CityData {
  city: string
  normalizedCity: string
  posts: Post[]
}

function groupPostsByCity(posts: Post[], locale: Locale): CityData[] {
  const cityMap = new Map<string, Post[]>()

  posts.forEach((post) => {
    const city = locale === 'en'
      ? (post.frontmatter.city || post.frontmatter.oras)
      : (post.frontmatter.oras || post.frontmatter.city)

    if (!city) return

    const normalizedCity = normalizeLocation(city)

    if (!cityMap.has(normalizedCity)) {
      cityMap.set(normalizedCity, [])
    }

    cityMap.get(normalizedCity)!.push(post)
  })

  // Convert to array format
  const result: CityData[] = []

  cityMap.forEach((cityPosts, normalizedCity) => {
    const firstCityPost = cityPosts[0]
    const cityName = locale === 'en'
      ? (firstCityPost.frontmatter.city || firstCityPost.frontmatter.oras)
      : (firstCityPost.frontmatter.oras || firstCityPost.frontmatter.city)

    result.push({
      city: cityName || normalizedCity,
      normalizedCity,
      posts: cityPosts
    })
  })

  return result
}

// Get lv article for a city (cat: "blog-oras", subcat: "lv")
function getLvArticleForCity(cityPosts: Post[], locale: Locale): Post | null {
  return cityPosts.find(post =>
    post.frontmatter.cat === 'blog-oras' &&
    post.frontmatter.subcat === 'lv'
  ) || null
}

// Sort attractions: lv. first (attractions with same id-oras as lv article), then by position
function sortAttractions(attractions: Post[], lvArticle: Post | null): Post[] {
  if (!lvArticle || !lvArticle.frontmatter['id-oras']) {
    // If no lv article, just sort by position
    return [...attractions].sort((a, b) => {
      const posA = parseInt(String(a.frontmatter.position || 9999), 10)
      const posB = parseInt(String(b.frontmatter.position || 9999), 10)
      return posA - posB
    })
  }

  const lvIdOras = String(lvArticle.frontmatter['id-oras'])

  return [...attractions].sort((a, b) => {
    // Check if attraction has same id-oras as lv article
    const aIdOras = String(a.frontmatter['id-oras'] || '')
    const bIdOras = String(b.frontmatter['id-oras'] || '')

    const aIsLv = aIdOras === lvIdOras
    const bIsLv = bIdOras === lvIdOras

    // If one is lv and the other isn't, lv comes first
    if (aIsLv && !bIsLv) return -1
    if (!aIsLv && bIsLv) return 1

    // If both are lv or both aren't, sort by position
    const posA = parseInt(String(a.frontmatter.position || 9999), 10)
    const posB = parseInt(String(b.frontmatter.position || 9999), 10)
    return posA - posB
  })
}

export default async function CitiesAttractions({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)
  const allPosts = getAllPosts(locale)

  // Filter only attraction posts (cat: "atractie" or layout: "travel-attraction")
  const attractionPosts = allPosts.filter(post =>
    post.frontmatter.cat === 'atractie' ||
    post.frontmatter.layout === 'travel-attraction'
  )

  // Group by city
  const citiesData = groupPostsByCity(attractionPosts, locale)

  // Sort cities alphabetically
  citiesData.sort((a, b) => a.city.localeCompare(b.city))

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 space-y-12 md:space-y-16">
        {citiesData.map((cityData) => {
          // Get all posts for this city (including lv article)
          const allCityPosts = allPosts.filter(post => {
            const city = locale === 'en'
              ? (post.frontmatter.city || post.frontmatter.oras)
              : (post.frontmatter.oras || post.frontmatter.city)
            return city && normalizeLocation(city) === cityData.normalizedCity
          })

          // Find lv article for this city
          const lvArticle = getLvArticleForCity(allCityPosts, locale)

          // Sort attractions for this city (lv first, then by position)
          const sortedAttractions = sortAttractions(cityData.posts, lvArticle)
          // Get first 3 attractions
          const displayedAttractions = sortedAttractions.slice(0, 3)

          if (displayedAttractions.length === 0) return null

          return (
            <div key={cityData.normalizedCity} className="space-y-6">
              {/* City title with arrow and link */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/${locale}/${locationToSlug(cityData.city)}`}
                  className="text-3xl md:text-4xl font-bold text-foreground hover:text-primary transition-colors flex items-center gap-3 group uppercase"
                >
                  {cityData.city}
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-primary opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Attractions - horizontal scroll on mobile, grid on desktop */}
              <div className="overflow-x-auto pb-4 md:overflow-x-visible md:pb-0">
                <div className="flex gap-4 md:grid md:grid-cols-3 md:gap-8 min-w-max md:min-w-0">
                  {displayedAttractions.map((post) => {
                    // For display, use city for English, oras for Romanian
                    const city = locale === 'en'
                      ? (post.frontmatter.city || post.frontmatter.oras)
                      : (post.frontmatter.oras || post.frontmatter.city)

                    return (
                      <Link
                        key={post.frontmatter.slug}
                        href={`/${locale}/${post.frontmatter.slug}`}
                        className="flex-shrink-0 w-64 md:w-auto group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                      >
                        <div className="relative h-80 overflow-hidden">
                          <Image
                            src={post.frontmatter.featuredImage || '/images/posts/default.jpg'}
                            alt={post.frontmatter.title}
                            width={400}
                            height={320}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 256px, (max-width: 1200px) 33vw, 400px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                          {city && (
                            <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-foreground shadow-lg uppercase">
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
                                  {new Date(post.frontmatter.date).toLocaleDateString(
                                    locale === 'ro' ? 'ro-RO' : 'en-US',
                                    { year: 'numeric', month: 'short', day: 'numeric' }
                                  )}
                                </time>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* See more link */}
              <div className="flex justify-start">
                <Link
                  href={`/${locale}/${locationToSlug(cityData.city)}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
                >
                  {locale === 'ro' ? 'Vezi mai mult' : 'See more'}
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

