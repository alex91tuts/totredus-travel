import Link from 'next/link'
import { getTranslations, type Locale } from '@/lib/translations'
import { getAllPosts } from '@/lib/posts'

export default async function Destinations({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)
  const posts = getAllPosts(locale).slice(0, 6) // Show first 6 posts

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t.destinations.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.destinations.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const city = post.frontmatter.oras || post.frontmatter.city
            return (
              <Link
                key={post.frontmatter.slug}
                href={`/${locale}/${post.frontmatter.slug}`}
                className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.frontmatter.featuredImage || '/images/posts/default.jpg'}
                    alt={post.frontmatter.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Dark gradient from bottom to top */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* City tag in top right corner */}
                  {city && (
                    <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-foreground shadow-lg">
                      {city}
                    </div>
                  )}
                  
                  {/* Title with white link at the bottom */}
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
                          {new Date(post.frontmatter.date).toLocaleDateString(locale === 'ro' ? 'ro-RO' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
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
    </section>
  )
}

