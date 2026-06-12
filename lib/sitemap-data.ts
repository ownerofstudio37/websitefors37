import { createClient } from '@supabase/supabase-js'
import type { MetadataRoute } from 'next'
import { locationPages } from '@/lib/location-pages'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
export const sitemapBaseUrl = 'https://www.studio37.cc'

const hasRealSupabaseConfig =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder.supabase.co') &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')

// Priority levels for different content types
const PRIORITIES = {
  homepage: 1.0,
  mainPages: 0.9,
  servicePages: 0.8,
  contentPages: 0.7,
  blogPostsRecent: 0.8,  // Recent blog posts get higher priority for indexing
  blogPostsModerate: 0.7, // Moderate age blog posts
  blogPostsOld: 0.5,     // Older blog posts
} as const

// Exclude verification/utility slugs from sitemap
const EXCLUDED_PAGE_SLUGS = new Set([
  'algolia-verification',
  'bing-site-auth',
  'gallery',
  'google-site-verification',
  'portfolio',
  'yandex-verification',
])

const EXCLUDED_PAGE_PATTERNS: RegExp[] = [
  /^gallery\//i,
  /verification/i,
  /^a[0-9a-f]{30,}$/i,
]

const REDIRECTED_LOCATION_SLUGS = new Set([
  'pinehurst',
  'the-woodlands',
  'spring',
  'tomball',
  'conroe',
  'magnolia',
  'montgomery',
  'willis',
  'huntsville',
  'new-caney',
  'new-waverly',
  'hockley',
  'bryan',
  'college-station',
  'houston',
])

// Helper to determine priority based on post age
function getBlogPostPriority(publishedAt: string | null, updatedAt: string | null): number {
  const compareDate = publishedAt ?? updatedAt
  if (!compareDate) return PRIORITIES.blogPostsOld

  const ageInDays = Math.floor((Date.now() - new Date(compareDate).getTime()) / (1000 * 60 * 60 * 24))
  
  if (ageInDays <= 30) return PRIORITIES.blogPostsRecent
  if (ageInDays <= 90) return PRIORITIES.blogPostsModerate
  return PRIORITIES.blogPostsOld
}

// Helper to determine change frequency based on post age
function getBlogPostChangeFrequency(publishedAt: string | null, updatedAt: string | null): 'daily' | 'weekly' | 'monthly' | 'yearly' {
  const compareDate = publishedAt ?? updatedAt
  if (!compareDate) return 'yearly'

  const ageInDays = Math.floor((Date.now() - new Date(compareDate).getTime()) / (1000 * 60 * 60 * 24))
  
  if (ageInDays <= 7) return 'daily'
  if (ageInDays <= 30) return 'weekly'
  return 'monthly'
}

export async function getSitemapRoutes(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()
  
  // Static routes - Main pages optimized for local SEO and user journey
  const routes: MetadataRoute.Sitemap = [
    // Homepage - Highest priority
    {
      url: sitemapBaseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: PRIORITIES.homepage,
    },
    // Main service pages - High priority for conversions
    {
      url: `${sitemapBaseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.mainPages,
    },
    // Individual service pages - High priority for local SEO
    {
      url: `${sitemapBaseUrl}/services/wedding-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/services/portrait-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/services/event-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/services/commercial-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/services/engagement-session`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/services/branding-marketing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.mainPages,
    },
    {
      url: `${sitemapBaseUrl}/book-a-session`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: PRIORITIES.mainPages,
    },
    {
      url: `${sitemapBaseUrl}/book-consultation`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: PRIORITIES.mainPages,
    },
    {
      url: `${sitemapBaseUrl}/get-quote`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: PRIORITIES.mainPages,
    },
    {
      url: `${sitemapBaseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.mainPages,
    },
    // Session prep guides
    {
      url: `${sitemapBaseUrl}/session-prep`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/session-prep/portrait`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/session-prep/engagement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/session-prep/wedding`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/session-prep/event`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/session-prep/commercial`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/session-prep/portrait/download`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/session-prep/wedding/download`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/session-prep/event/download`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/session-prep/commercial/download`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    // Local SEO landing page
    {
      url: `${sitemapBaseUrl}/local-photographer-pinehurst-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-the-woodlands-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-spring-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-tomball-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-conroe-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-magnolia-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-montgomery-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-willis-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-huntsville-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-new-caney-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-hockley-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-bryan-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-college-station-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-houston-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/local-photographer-new-waverly-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    // Service + city landing pages
    {
      url: `${sitemapBaseUrl}/wedding-photographer-katy-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/portrait-photographer-katy-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/wedding-photographer-the-woodlands-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/portrait-photographer-conroe-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/family-photographer-magnolia-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/headshot-photographer-houston-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/wedding-photographer-tomball-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/family-photographer-spring-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/wedding-photographer-montgomery-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/portrait-photographer-willis-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/portrait-photographer-huntsville-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/family-photographer-new-caney-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/portrait-photographer-hockley-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/family-photographer-porter-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/portrait-photographer-splendora-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/family-photographer-cleveland-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/wedding-photographer-waller-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/wedding-photographer-plantersville-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/wedding-photographer-navasota-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/wedding-photographer-bryan-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/wedding-photographer-college-station-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/portrait-photographer-cypress-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/portrait-photographer-new-waverly-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/family-photographer-kingwood-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/portrait-photographer-humble-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/family-photographer-atascocita-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },

    // Portfolio and content pages
    {
      url: `${sitemapBaseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/family-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/professional-headshots`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/senior-portraits`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/mini-sessions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/brand-refresh-sessions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/maternity-sessions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${sitemapBaseUrl}/tools/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${sitemapBaseUrl}/tools/package-recommender`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${sitemapBaseUrl}/gallery-experience`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    // Hardcoded event service pages
    {
      url: `${sitemapBaseUrl}/corporate-events`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${sitemapBaseUrl}/birthday-party`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${sitemapBaseUrl}/graduation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${sitemapBaseUrl}/fundraiser`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${sitemapBaseUrl}/anniversary-party`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${sitemapBaseUrl}/holiday-party`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
  ]

  for (const location of locationPages) {
    const shortSlug = location.slug.replace(/-tx$/, '')

    routes.push({
      url: `${sitemapBaseUrl}/locations/${location.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    })

    if (REDIRECTED_LOCATION_SLUGS.has(shortSlug)) continue

    routes.push({
      url: `${sitemapBaseUrl}/${shortSlug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    })
  }
  
  // Add all published content pages and blog posts when Supabase is configured.
  // In preview/local environments without real env vars, keep the sitemap fast and
  // always return a valid static sitemap instead of failing the fetch.
  if (hasRealSupabaseConfig) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    try {
      const { data: pages } = await supabase
        .from('content_pages')
        .select('slug, updated_at')
        .eq('published', true)

      if (pages) {
        const filteredPages = pages.filter(page => {
          if (EXCLUDED_PAGE_SLUGS.has(page.slug)) {
            return false
          }
          if (REDIRECTED_LOCATION_SLUGS.has(page.slug)) {
            return false
          }
          return !EXCLUDED_PAGE_PATTERNS.some((pattern) => pattern.test(page.slug))
        })

        const contentRoutes = filteredPages.map(page => ({
          url: `${sitemapBaseUrl}/${page.slug}`,
          lastModified: new Date(page.updated_at),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))

        routes.push(...contentRoutes)
      }
    } catch (error) {
      console.error('Error fetching content pages for sitemap:', error)
    }

    try {
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (posts && posts.length > 0) {
        const blogRoutes = posts.map((post: any) => {
          const lastModSource = post.updated_at || post.published_at || currentDate.toISOString()
          const priority = getBlogPostPriority(post.published_at, post.updated_at)
          const changeFrequency = getBlogPostChangeFrequency(post.published_at, post.updated_at)

          return {
            url: `${sitemapBaseUrl}/blog/${post.slug}`,
            lastModified: new Date(lastModSource),
            changeFrequency,
            priority,
          }
        })

        routes.push(...blogRoutes)

        console.log(`Sitemap: Added ${blogRoutes.length} blog posts`)
      }
    } catch (error) {
      console.error('Error fetching blog posts for sitemap:', error)
    }
  }

  const seenUrls = new Set<string>()
  const dedupedRoutes = routes.filter((route) => {
    if (seenUrls.has(route.url)) return false
    seenUrls.add(route.url)
    return true
  })

  return dedupedRoutes
}
