import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { type Locale } from './translations'

// Extended frontmatter interface to support both old and new formats
export interface PostFrontmatter {
  title: string
  slug: string
  locale: Locale
  date: string
  featuredImage: string
  excerpt: string
  tags: string[]
  author: string
  // Additional fields for new format
  [key: string]: any // Allow additional fields from MDX frontmatter
}

export interface TableOfContentsItem {
  id: string
  text: string
  level: number
}

export interface Post {
  frontmatter: PostFrontmatter
  content: string
  htmlContent: string
  tableOfContents: TableOfContentsItem[]
}

// Helper function to normalize frontmatter from different formats
function normalizeFrontmatter(
  data: any,
  fileName: string,
  locale: Locale
): PostFrontmatter {
  // Extract slug from filename if not present
  const slug = data.slug || fileName.replace(/\.(md|mdx)$/, '')

  // Build image path - if folder exists, construct path as /images/travel/{folder}/{imagine-big}
  let featuredImage = '/images/posts/default.jpg'

  // Helper function to extract path from assets/images/travel/{folder}/{image}
  const extractPathFromAssets = (imagePath: string): string | null => {
    if (!imagePath || typeof imagePath !== 'string') return null

    // Normalize path - remove leading slash for consistent matching
    const normalizedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath

    // Match pattern: assets/images/travel/{folder}/{image}
    const assetsMatch = normalizedPath.match(/^assets\/images\/travel\/([^\/]+)\/(.+)$/)
    if (assetsMatch && assetsMatch.length >= 3) {
      const folder = assetsMatch[1]
      const imageName = assetsMatch[2]
      return `/images/travel/${folder}/${imageName}`
    }

    return null
  }

  if (data.folder) {
    // If folder exists, construct path using folder and image filename
    const imageFileName = data.imagine || data['imagine-big'] || data['imagine-mobile'] || data.image || data.meta_image
    if (imageFileName) {
      // Check if it's an assets path that needs conversion
      const convertedPath = extractPathFromAssets(imageFileName)
      if (convertedPath) {
        featuredImage = convertedPath
      } else {
        // Remove leading slash if present, we'll add our own path
        const cleanImageName = imageFileName.startsWith('/') ? imageFileName.substring(1) : imageFileName
        featuredImage = `/images/travel/${data.folder}/${cleanImageName}`
      }
    }
  } else {
    // Fallback to original logic if no folder
    const rawImagePath = data.featuredImage || data.image || data.meta_image || data.imagine || data['imagine-big'] || '/images/posts/default.jpg'

    // Always check if it's an assets path that needs conversion first
    if (rawImagePath && (rawImagePath.includes('assets/images/travel/') || rawImagePath.includes('/assets/images/travel/'))) {
      const convertedPath = extractPathFromAssets(rawImagePath)
      if (convertedPath) {
        featuredImage = convertedPath
      } else {
        featuredImage = rawImagePath
      }
    } else {
      featuredImage = rawImagePath
    }
  }

  // Map different field names to standard format
  const normalized: PostFrontmatter = {
    // Preserve all original fields first
    ...data,
    // Then override with normalized values to ensure they are correct
    title: data.title || '',
    slug,
    locale: data.locale || locale,
    // Ensure date is a string
    date: data.date instanceof Date
      ? data.date.toISOString().split('T')[0]
      : (typeof data.date === 'string' ? data.date : (
        data['date-modified'] instanceof Date
          ? data['date-modified'].toISOString().split('T')[0]
          : (typeof data['date-modified'] === 'string' ? data['date-modified'] : new Date().toISOString().split('T')[0])
      )),
    featuredImage, // This must come after ...data to ensure the normalized path is used
    excerpt: data.excerpt || data.descriere || data.description || '',
    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
    author: data.author || '',
  }

  // Ensure all Date objects in frontmatter are converted to strings
  Object.keys(normalized).forEach(key => {
    if (normalized[key] instanceof Date) {
      normalized[key] = normalized[key].toISOString().split('T')[0]
    }
  })

  return normalized
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Helper to recursively find all MDX/MD files
function getMdxFilesRecursively(dir: string): string[] {
  let results: string[] = []

  if (!fs.existsSync(dir)) {
    return []
  }

  const list = fs.readdirSync(dir)
  list.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getMdxFilesRecursively(filePath))
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(filePath)
    }
  })
  return results
}

export function getAllPosts(locale: Locale): Post[] {
  const localeDirectory = path.join(postsDirectory, locale)

  if (!fs.existsSync(localeDirectory)) {
    return []
  }

  const allFilePaths = getMdxFilesRecursively(localeDirectory)

  const allPostsData = allFilePaths
    .map(fullPath => {
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const fileName = path.basename(fullPath)

      // Normalize frontmatter to handle different formats
      const normalizedFrontmatter = normalizeFrontmatter(data, fileName, locale)

      return {
        frontmatter: normalizedFrontmatter,
        content,
        htmlContent: '', // Will be processed when needed
        tableOfContents: [], // Will be processed when needed
      }
    })
    .sort((a, b) => {
      if (a.frontmatter.date < b.frontmatter.date) {
        return 1
      } else {
        return -1
      }
    })

  return allPostsData
}

export async function getPostBySlug(slug: string, locale: Locale): Promise<Post | null> {
  const localeDirectory = path.join(postsDirectory, locale)

  // Find file with matching slug (filename without extension) recursively
  const allFilePaths = getMdxFilesRecursively(localeDirectory)
  const fullPath = allFilePaths.find(filePath => {
    const name = path.basename(filePath, path.extname(filePath))
    return name === slug
  })

  if (!fullPath) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Normalize frontmatter to handle different formats
  const fileName = path.basename(fullPath)
  const normalizedFrontmatter = normalizeFrontmatter(data, fileName, locale)

  // Process Liquid syntax in content before converting to HTML
  let processedContent = content

  // Function to get value from frontmatter (supports nested paths like page.field)
  const getFrontmatterValue = (path: string): string => {
    // Remove 'page.' prefix if present
    const cleanPath = path.replace(/^page\./, '')

    // Handle nested properties (e.g., page.something.nested)
    const parts = cleanPath.split('.')
    let value: any = normalizedFrontmatter

    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part]
      } else {
        return '' // Return empty string if path doesn't exist
      }
    }

    // Convert value to string, handling arrays and objects
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    if (value && typeof value === 'object') {
      return JSON.stringify(value)
    }
    return value ? String(value) : ''
  }

  // Replace {{ page.field }} or {{page.field}} with frontmatter values
  processedContent = processedContent.replace(
    /\{\{\s*page\.([^}]+)\s*\}\}/gi,
    (match, fieldPath) => {
      const value = getFrontmatterValue(fieldPath.trim())
      return value || match // Return original if no value found
    }
  )

  // Replace {{ field }} (without page. prefix) - try direct frontmatter access
  processedContent = processedContent.replace(
    /\{\{\s*([^}]+)\s*\}\}/gi,
    (match, fieldPath) => {
      // Skip if it looks like it was already processed or contains special chars
      if (fieldPath.includes('page.') || fieldPath.includes('|') || fieldPath.includes('|')) {
        return match
      }
      const value = getFrontmatterValue(fieldPath.trim())
      return value || match
    }
  )

  // Helper function to generate HTML for includes at BUILD TIME
  const generateIncludeHtml = (includeName: string, frontmatter: any, locale: Locale): string => {
    switch (includeName) {
      case 'contacte-atractie.html': {
        const hasAnyContact = frontmatter.website || frontmatter.phone || frontmatter.email || frontmatter.adresa || (frontmatter.latitudine && frontmatter.longitudine)
        if (!hasAnyContact) return ''

        const contactBoxes: string[] = []

        // Website box
        if (frontmatter.website) {
          contactBoxes.push(`
            <div class="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] aspect-square bg-primary/10 dark:bg-primary/5 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-medium text-muted-foreground mb-1">Website</div>
                  <a href="${frontmatter.website}" target="_blank" rel="noopener noreferrer" class="text-sm text-primary hover:underline break-all">
                    ${frontmatter.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                </div>
              </div>
            </div>
          `)
        }

        // Phone box
        if (frontmatter.phone) {
          contactBoxes.push(`
            <div class="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] aspect-square bg-primary/10 dark:bg-primary/5 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-medium text-muted-foreground mb-1">Telefon</div>
                  <a href="tel:${frontmatter.phone}" class="text-sm text-foreground hover:text-primary transition-colors">
                    ${frontmatter.phone}
                  </a>
                </div>
              </div>
            </div>
          `)
        }

        // Email box
        if (frontmatter.email) {
          contactBoxes.push(`
            <div class="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] aspect-square bg-primary/10 dark:bg-primary/5 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-medium text-muted-foreground mb-1">Email</div>
                  <a href="mailto:${frontmatter.email}" class="text-sm text-foreground hover:text-primary transition-colors break-all">
                    ${frontmatter.email}
                  </a>
                </div>
              </div>
            </div>
          `)
        }

        // Address/Map box - always add map link if coordinates exist
        if (frontmatter.adresa) {
          const hasCoordinates = frontmatter.latitudine && frontmatter.longitudine
          const mapsUrl = hasCoordinates
            ? `https://www.google.com/maps?q=${frontmatter.latitudine},${frontmatter.longitudine}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(frontmatter.adresa)}`

          contactBoxes.push(`
            <div class="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] aspect-square bg-primary/10 dark:bg-primary/5 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-medium text-muted-foreground mb-1">Adresă</div>
                  <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-foreground hover:text-primary transition-colors block">
                    ${frontmatter.adresa}
                  </a>
                  <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Deschide în Google Maps
                  </a>
                </div>
              </div>
            </div>
          `)
        }

        if (contactBoxes.length === 0) return ''

        // Add col-span classes directly to boxes for proper grid layout
        const isOddNumber = contactBoxes.length % 2 === 1 && contactBoxes.length > 1
        const processedBoxes = contactBoxes.map((box, index) => {
          const isLastBox = index === contactBoxes.length - 1
          const shouldSpanFull = isOddNumber && isLastBox

          // Add col-span-2 class to last box if odd number - replace the opening div tag
          if (shouldSpanFull) {
            // Replace the first <div class=" with <div class="sm:col-span-2 
            return box.replace(/<div class="/, '<div class="sm:col-span-2 ')
          }
          return box
        })

        const gridClass = contactBoxes.length === 1
          ? 'grid grid-cols-1 gap-4'
          : 'grid grid-cols-1 sm:grid-cols-2 gap-4'

        return `
          <div class="my-3 mb-3 sm:my-4">
            <div class="${gridClass}">
              ${processedBoxes.join('')}
            </div>
          </div>
        `
      }

      case 'bilete.html': {
        // Temporarily hidden
        return ''
        // if (!frontmatter.website) return ''
        // return `
        //   <div class="my-6 sm:my-8 p-4 sm:p-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
        //     <h3 class="text-lg font-bold mb-3 text-gray-900 dark:text-white">
        //       ${locale === 'ro' ? 'Bilete și Rezervări' : 'Tickets and Reservations'}
        //     </h3>
        //     <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
        //       ${locale === 'ro' 
        //         ? 'Pentru a rezerva bilete sau pentru informații actualizate despre prețuri și disponibilitate, vă recomandăm să consultați site-ul oficial sau să contactați direct atracția.'
        //         : 'To book tickets or for updated information about prices and availability, we recommend checking the official website or contacting the attraction directly.'}
        //     </p>
        //     <a href="${frontmatter.website}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium">
        //       ${locale === 'ro' ? 'Site Oficial' : 'Official Website'}
        //       <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        //       </svg>
        //     </a>
        //   </div>
        // `
      }

      case 'cta-cazare.html': {
        return `
          <div class="my-6 sm:my-8 p-4 sm:p-6 bg-primary/10 border border-primary/20 rounded-lg">
            <h3 class="text-lg font-bold mb-2 text-foreground">
              ${locale === 'ro' ? 'Căutați cazare?' : 'Looking for accommodation?'}
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              ${locale === 'ro'
            ? 'Descoperiți cele mai bune oferte de cazare în zonă.'
            : 'Discover the best accommodation deals in the area.'}
            </p>
            <a href="#" class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium">
              ${locale === 'ro' ? 'Vezi Oferte' : 'View Offers'}
            </a>
          </div>
        `
      }

      case 'locuri-de-vizitat.html': {
        // Only process for aggregated articles with cat: "blog-oras"
        if (frontmatter.cat !== 'blog-oras' || !frontmatter['id-oras'] || !frontmatter['no-atractii']) {
          return ''
        }

        const idOras = String(frontmatter['id-oras'])
        const noAtractii = parseInt(String(frontmatter['no-atractii']), 10) || 0

        if (noAtractii === 0) return ''

        // Get all posts and filter for travel-attraction with matching id-oras
        const allPosts = getAllPosts(locale)
        const attractions = allPosts
          .filter(post => {
            const postFrontmatter = post.frontmatter
            return (
              postFrontmatter.layout === 'travel-attraction' &&
              String(postFrontmatter['id-oras']) === idOras
            )
          })
          .sort((a, b) => {
            const posA = parseInt(String(a.frontmatter.position || 9999), 10)
            const posB = parseInt(String(b.frontmatter.position || 9999), 10)
            return posA - posB
          })
          .slice(0, noAtractii)

        if (attractions.length === 0) return ''

        // Generate HTML for each attraction
        const attractionItems = attractions.map(attraction => {
          const attFrontmatter = attraction.frontmatter
          const slug = attFrontmatter.slug
          const title = attFrontmatter.atractie || ''

          // Access text-intro directly from frontmatter
          // The ...data spread in normalizeFrontmatter preserves all original fields
          const rawTextIntro = attFrontmatter['text-intro'] ||
            attFrontmatter.descriere ||
            attFrontmatter.description ||
            attFrontmatter.excerpt ||
            ''

          const image = attFrontmatter.featuredImage || '/images/posts/default.jpg'

          // Process text-intro: clean and truncate to 1000 characters
          let cleanIntro = ''
          if (rawTextIntro) {
            // Convert to string and clean
            cleanIntro = String(rawTextIntro)
              // Replace <hr> tags with paragraph break (</p><p>)
              .replace(/<hr\s*\/?>/gi, '</p><p class="text-foreground text-[15px] sm:text-[17px] leading-relaxed mb-4 sm:mb-6">')
              // Normalize whitespace (but preserve paragraph breaks)
              .replace(/\s+/g, ' ')
              .trim()

            if (cleanIntro.length > 0) {
              // Wrap in paragraph tags if not already wrapped
              if (!cleanIntro.startsWith('<p')) {
                cleanIntro = `<p class="text-foreground text-[15px] sm:text-[17px] leading-relaxed mb-4 sm:mb-6">${cleanIntro}`
              }
              if (!cleanIntro.endsWith('</p>')) {
                cleanIntro = `${cleanIntro}</p>`
              }

              // Limit to 1000 chars if too long
              if (cleanIntro.length > 1000) {
                // Try to cut at a sentence boundary if possible
                const truncated = cleanIntro.substring(0, 1000)
                const lastPeriod = truncated.lastIndexOf('.')
                if (lastPeriod > 800) {
                  // If we find a period in the last 200 chars, cut there
                  cleanIntro = truncated.substring(0, lastPeriod + 1) + '</p>'
                } else {
                  // Otherwise just cut at 1000 chars
                  cleanIntro = truncated.trim() + '...</p>'
                }
              }
            }
          }

          return `
            <h2 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mt-6 sm:mt-10 pb-2 text-foreground">
              ${parseInt(String(attFrontmatter.position || 999), 10)}. ${title}
            </h2>
            
            <img src="${image}" alt="${title}" class="rounded-xl shadow-lg my-6 sm:my-8 w-full h-auto max-w-full" loading="lazy" />
            
            ${cleanIntro && cleanIntro.length > 0 ? cleanIntro : ''}
            
            <p class="mb-8 pb-8 border-b border-border">
              <a href="/${locale}/${slug}" class="text-primary font-medium no-underline hover:underline break-words inline-flex items-center gap-2">
                ${locale === 'ro' ? 'Citește articolul complet' : 'Read full article'}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </p>
          `
        }).join('')

        return `
              ${attractionItems}
        `
      }

      case 'a-anchor-backlink.html': {
        // Get current article's id-oras
        const currentIdOras = frontmatter['id-oras'] || frontmatter.idOras

        if (!currentIdOras) {
          return ''
        }

        // Find the article with subcat: "lv" and same id-oras in the same locale
        const allPosts = getAllPosts(locale)
        const lvArticle = allPosts.find(post =>
          post.frontmatter.subcat === 'lv' &&
          (post.frontmatter['id-oras'] || post.frontmatter.idOras) === currentIdOras
        )

        if (!lvArticle || !lvArticle.frontmatter.anchors || !Array.isArray(lvArticle.frontmatter.anchors) || lvArticle.frontmatter.anchors.length === 0) {
          return ''
        }

        // Get anchors array from the lv article
        const anchors = lvArticle.frontmatter.anchors
        const lvSlug = lvArticle.frontmatter.slug

        // Determine which anchor to use for current article based on slug hash
        // This ensures consistent anchor selection per article
        // Use a more complex hash combining slug, title, and date for better distribution
        let anchorIndex = 0
        if (frontmatter.slug) {
          // Create a more unique hash by combining multiple fields
          const hashString = `${frontmatter.slug}-${frontmatter.title || ''}-${frontmatter.date || ''}`
          let hash = 0
          for (let i = 0; i < hashString.length; i++) {
            const char = hashString.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash // Convert to 32bit integer
            // Add rotation for better distribution
            hash = (hash << 1) | (hash >>> 31)
          }
          anchorIndex = Math.abs(hash) % anchors.length
        }

        const selectedAnchor = anchors[anchorIndex]

        // Generate CTA with modern, distinct design - different from contact boxes
        return `
          <div class="my-6 sm:my-8 relative not-prose">
            <div class="flex items-center gap-3 p-4 sm:p-5 bg-card border-l-4 border-primary rounded-r-lg shadow-sm hover:shadow-md transition-all duration-300 group">
              <div class="flex-shrink-0 w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] aspect-square bg-primary/10 dark:bg-primary/5 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-primary dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0 flex items-center gap-2">
                <span class="text-sm font-medium text-muted-foreground">${locale === 'ro' ? 'Vezi și:' : 'See also:'}</span>
                <a href="/${locale}/${lvSlug}#${encodeURIComponent(selectedAnchor.toLowerCase().replace(/\s+/g, '-'))}" class="text-base font-bold text-foreground hover:text-primary transition-colors">
                  ${selectedAnchor}
                </a>
              </div>
              <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        `
      }

      case 'galerie-atractie.html': {
        // Check if folder exists in frontmatter
        const folder = frontmatter.folder
        if (!folder) {
          return ''
        }

        // Check for gallery folder in public/images/travel/{folder}/galerie/
        const galleryPath = path.join(process.cwd(), 'public', 'images', 'travel', folder, 'galerie')

        if (!fs.existsSync(galleryPath)) {
          return ''
        }

        // Read all image files from gallery folder
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']
        const files = fs.readdirSync(galleryPath)
        const images = files
          .filter(file => {
            const ext = path.extname(file).toLowerCase()
            return imageExtensions.includes(ext)
          })
          .map(file => ({
            name: file,
            path: `/images/travel/${folder}/galerie/${file}`,
            alt: `${frontmatter.title || 'Image'} - ${file.replace(/\.[^/.]+$/, '')}`,
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        if (images.length === 0) {
          return ''
        }

        // Generate complete HTML gallery with proper grid and data attributes for client-side initialization
        const imagesJson = JSON.stringify(images).replace(/"/g, '&quot;')
        const title = locale === 'ro' ? 'Galerie Foto' : 'Photo Gallery'

        let galleryHtml = '<div class="my-8 sm:my-12 gallery-container" data-gallery-init data-images=\'' + imagesJson + '\' data-total="' + images.length + '">'
        galleryHtml += '<h2 class="text-2xl sm:text-3xl font-bold mb-6 text-foreground">' + title + '</h2>'
        galleryHtml += '<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">'

        const visibleCount = Math.min(6, images.length)

        for (let i = 0; i < visibleCount; i++) {
          if (i === visibleCount - 1 && images.length > visibleCount) {
            const remaining = images.length - visibleCount
            const seeMoreText = locale === 'ro' ? 'Vezi' : 'See'
            galleryHtml += '<div class="group relative overflow-hidden rounded-lg bg-muted cursor-pointer gallery-see-more-btn" data-visible-count="' + visibleCount + '" style="aspect-ratio: 1 / 1; min-height: 0;">'
            galleryHtml += '<img src="' + images[i].path + '" alt="' + images[i].alt + '" class="absolute inset-0 w-full h-full blur-sm transition-transform duration-500" loading="lazy" style="object-fit: cover; width: 100%; height: 100%; margin-top: 0;" />'
            galleryHtml += '<div class="absolute inset-0 bg-black/50 flex items-center justify-center">'
            galleryHtml += '<div class="text-center text-white">'
            galleryHtml += '<div class="font-bold text-base sm:text-lg">' + seeMoreText + '</div>'
            galleryHtml += '<div class="text-sm sm:text-base opacity-90">+' + remaining + '</div>'
            galleryHtml += '</div></div></div>'
          } else {
            galleryHtml += '<div class="group relative overflow-hidden rounded-lg bg-muted cursor-pointer gallery-image" data-index="' + i + '" style="aspect-ratio: 1 / 1; min-height: 0;">'
            galleryHtml += '<img src="' + images[i].path + '" alt="' + images[i].alt + '" class="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110" loading="lazy" style="object-fit: cover; width: 100%; height: 100%; margin-top: 0;" />'
            galleryHtml += '<div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>'
            galleryHtml += '</div>'
          }
        }

        galleryHtml += '</div>' // close grid

        if (images.length > visibleCount) {
          galleryHtml += '<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 gallery-more" style="display: none;">'
          for (let i = visibleCount; i < images.length; i++) {
            galleryHtml += '<div class="group relative overflow-hidden rounded-lg bg-muted cursor-pointer gallery-image" data-index="' + i + '" style="aspect-ratio: 1 / 1; min-height: 0;">'
            galleryHtml += '<img src="' + images[i].path + '" alt="' + images[i].alt + '" class="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110" loading="lazy" style="object-fit: cover; width: 100%; height: 100%; margin-top: 0;" />'
            galleryHtml += '<div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>'
            galleryHtml += '</div>'
          }
          galleryHtml += '</div>'
        }

        galleryHtml += '</div>' // close container

        return galleryHtml
      }

      // Other includes return empty for now
      case 'sidebar-atractie.html':
      default:
        return ''
    }
  }

  // Replace includes with HTML comment placeholders that WILL survive markdown processing
  const includePlaceholders = new Map<string, string>()
  let placeholderIndex = 0

  processedContent = processedContent.replace(
    /\{%\s*include\s+([^%]+)\s*%\}/gi,
    (match, includeFile) => {
      const includeName = includeFile.trim()
      const placeholder = `<!--INCLUDE_PLACEHOLDER_${placeholderIndex}-->`
      includePlaceholders.set(placeholder, includeName)
      placeholderIndex++
      return placeholder
    }
  )

  // Remove other Liquid tags (for, if, etc.) - simple removal for now
  processedContent = processedContent.replace(
    /\{%\s*(?!include)[^%]+\s*%\}/gi,
    '' // Remove other Liquid tags (but not includes)
  )

  // Convert markdown/MDX to HTML
  // Use remark-rehype with rehype-raw to allow HTML in markdown/MDX
  const htmlProcessed = await remark()
    .use(remarkGfm) // Enable GitHub Flavored Markdown (tables, strikethrough, etc.)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedContent)
  let htmlContent = htmlProcessed.toString()

  // Process any remaining Liquid syntax in HTML (e.g., in attributes)
  htmlContent = htmlContent.replace(
    /\{\{\s*page\.([^}]+)\s*\}\}/gi,
    (match, fieldPath) => {
      const value = getFrontmatterValue(fieldPath.trim())
      return value || match
    }
  )

  // Now replace comment placeholders with actual HTML (after markdown conversion)
  includePlaceholders.forEach((includeName, placeholder) => {
    const includeHtml = generateIncludeHtml(includeName, normalizedFrontmatter, locale)
    // HTML comments are preserved by remark/rehype, replace them with actual HTML
    htmlContent = htmlContent.split(placeholder).join(includeHtml)
  })

  // Process image paths in HTML content - convert /assets/images/travel/ to /images/travel/
  // Handle both src="..." and src='...' formats
  htmlContent = htmlContent.replace(
    /src=["']\/assets\/images\/travel\/([^"']+)["']/g,
    (match, path) => {
      const quote = match.includes('"') ? '"' : "'"
      return `src=${quote}/images/travel/${path}${quote}`
    }
  )
  // Also handle paths without leading slash
  htmlContent = htmlContent.replace(
    /src=["']assets\/images\/travel\/([^"']+)["']/g,
    (match, path) => {
      const quote = match.includes('"') ? '"' : "'"
      return `src=${quote}/images/travel/${path}${quote}`
    }
  )

  // Optimize all images in content with lazy loading and proper attributes
  htmlContent = htmlContent.replace(
    /<img([^>]*)>/gi,
    (match, attributes) => {
      // Check if loading attribute already exists
      const hasLoading = /loading\s*=/.test(attributes)
      const hasDecoding = /decoding\s*=/.test(attributes)

      // Add optimization attributes if they don't exist
      let optimizedAttributes = attributes
      if (!hasLoading) {
        optimizedAttributes += ' loading="lazy"'
      }
      if (!hasDecoding) {
        optimizedAttributes += ' decoding="async"'
      }

      return `<img${optimizedAttributes}>`
    }
  )

  // Extract H2 headings and add IDs to them
  const tableOfContents: TableOfContentsItem[] = []
  let headingCounter = 0

  // Function to generate a slug from text
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
  }

  // Process H2 headings: extract them and add IDs
  // Use multiline flag and non-greedy match to handle H2s across multiple lines
  htmlContent = htmlContent.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (match, attributes, content) => {
      headingCounter++
      // Extract text content from HTML (remove HTML tags)
      const textContent = content.replace(/<[^>]+>/g, '').trim()
      if (!textContent) return match // Skip empty headings

      const slug = generateSlug(textContent)
      const id = `heading-${headingCounter}-${slug}`

      // Add to table of contents
      tableOfContents.push({
        id,
        text: textContent,
        level: 2,
      })

      // Check if ID already exists in attributes
      const hasId = /id\s*=\s*["']/.test(attributes)
      if (hasId) {
        // Replace existing ID
        return `<h2${attributes.replace(/id\s*=\s*["'][^"']*["']/i, `id="${id}"`)}>${content}</h2>`
      } else {
        // Add ID attribute
        return `<h2${attributes} id="${id}">${content}</h2>`
      }
    }
  )

  return {
    frontmatter: normalizedFrontmatter,
    content,
    htmlContent,
    tableOfContents,
  }
}

export function getAllPostSlugs(locale: Locale): string[] {
  const localeDirectory = path.join(postsDirectory, locale)

  if (!fs.existsSync(localeDirectory)) {
    return []
  }

  const allFilePaths = getMdxFilesRecursively(localeDirectory)
  return allFilePaths
    .map(filePath => {
      const fileName = path.basename(filePath)
      return fileName.replace(/\.(md|mdx)$/, '')
    })
}

export function getRelatedPostsByCity(city: string, currentSlug: string, locale: Locale, limit: number = 7): Post[] {
  if (!city) return []

  const allPosts = getAllPosts(locale)

  // Filter posts by city and exclude current post
  const relatedPosts = allPosts
    .filter(post => {
      const postCity = post.frontmatter.oras || post.frontmatter.city
      return postCity &&
        postCity.toLowerCase() === city.toLowerCase() &&
        post.frontmatter.slug !== currentSlug
    })
    .slice(0, limit)

  return relatedPosts
}

// Normalize location (same as in extract-locations.ts)
function normalizeLocation(value: string): string {
  if (!value || typeof value !== 'string') return ''
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toUpperCase()
}

export function getPostsByLocation(location: string, locale: Locale): Post[] {
  const normalizedLocation = normalizeLocation(location)
  const allPosts = getAllPosts(locale)

  return allPosts.filter(post => {
    const normalizedTara = normalizeLocation(post.frontmatter.tara || post.frontmatter.country || '')
    // For Romanian use 'oras', for English use 'city'
    const locationField = locale === 'ro'
      ? (post.frontmatter.oras || '')
      : (post.frontmatter.city || post.frontmatter.oras || '')
    const normalizedLocationField = normalizeLocation(locationField)

    return normalizedTara === normalizedLocation || normalizedLocationField === normalizedLocation
  })
}

