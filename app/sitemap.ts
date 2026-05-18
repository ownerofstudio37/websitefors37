import { createClient } from '@supabase/supabase-js'
import { MetadataRoute } from 'next'
import { locationPages } from '@/lib/location-pages'

// Cache sitemap generation for 30 minutes (more frequent for blog updates)
export const revalidate = 1800

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const baseUrl = 'https://www.studio37.cc'

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
  'google-site-verification',
  'yandex-verification',
])

const EXCLUDED_PAGE_PATTERNS: RegExp[] = [
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
  'hockley',
  'bryan',
  'college-station',
  'houston',
])

// Helper to determine priority based on post age
function getBlogPostPriority(publishedAt: string | null, updatedAt: string | null): number {
  if (!publishedAt && !updatedAt) return PRIORITIES.blogPostsOld
  
  const compareDate = publishedAt || updatedAt
  const ageInDays = Math.floor((Date.now() - new Date(compareDate).getTime()) / (1000 * 60 * 60 * 24))
  
  if (ageInDays <= 30) return PRIORITIES.blogPostsRecent
  if (ageInDays <= 90) return PRIORITIES.blogPostsModerate
  return PRIORITIES.blogPostsOld
}

// Helper to determine change frequency based on post age
function getBlogPostChangeFrequency(publishedAt: string | null, updatedAt: string | null): 'daily' | 'weekly' | 'monthly' | 'yearly' {
  if (!publishedAt && !updatedAt) return 'yearly'
  
  const compareDate = publishedAt || updatedAt
  const ageInDays = Math.floor((Date.now() - new Date(compareDate).getTime()) / (1000 * 60 * 60 * 24))
  
  if (ageInDays <= 7) return 'daily'
  if (ageInDays <= 30) return 'weekly'
  return 'monthly'
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(supabaseUrl, supabaseKey)
  const currentDate = new Date()
  
  // Static routes - Main pages optimized for local SEO and user journey
  const routes: MetadataRoute.Sitemap = [
    // Homepage - Highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: PRIORITIES.homepage,
    },
    // Main service pages - High priority for conversions
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.mainPages,
    },
    // Individual service pages - High priority for local SEO
    {
      url: `${baseUrl}/services/wedding-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/services/portrait-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/services/event-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/services/commercial-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/services/engagement-session`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/services/branding-marketing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/book-a-session`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: PRIORITIES.mainPages,
    },
    {
      url: `${baseUrl}/book-consultation`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: PRIORITIES.mainPages,
    },
    {
      url: `${baseUrl}/get-quote`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: PRIORITIES.mainPages,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.mainPages,
    },
    // Session prep guides
    {
      url: `${baseUrl}/session-prep`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/session-prep/portrait`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/session-prep/engagement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/session-prep/wedding`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/session-prep/event`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/session-prep/commercial`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    // Local SEO landing page
    {
      url: `${baseUrl}/local-photographer-pinehurst-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-the-woodlands-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-spring-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-tomball-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-conroe-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-magnolia-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-montgomery-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-willis-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-huntsville-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-new-caney-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-hockley-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-bryan-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-college-station-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/local-photographer-houston-tx`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },

    // Portfolio and content pages
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    // Hardcoded event service pages
    {
      url: `${baseUrl}/corporate-events`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${baseUrl}/birthday-party`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${baseUrl}/graduation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${baseUrl}/fundraiser`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${baseUrl}/anniversary-party`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
    {
      url: `${baseUrl}/holiday-party`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    },
  ]

  for (const location of locationPages) {
    const shortSlug = location.slug.replace(/-tx$/, '')
    if (REDIRECTED_LOCATION_SLUGS.has(shortSlug)) continue

    routes.push({
      url: `${baseUrl}/${shortSlug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.contentPages,
    })
  }
  
  // Add all published content pages
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
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
      
      routes.push(...contentRoutes)
    }
  } catch (error) {
    console.error('Error fetching content pages for sitemap:', error)
  }
  
  // Add all published blog posts with enhanced metadata for better indexing
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
        
        const route: any = {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(lastModSource),
          changeFrequency,
          priority,
        }
        
        return route
      })
      
      routes.push(...blogRoutes)

      console.log(`Sitemap: Added ${blogRoutes.length} blog posts`)
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  const seenUrls = new Set<string>()
  const dedupedRoutes = routes.filter((route) => {
    if (seenUrls.has(route.url)) return false
    seenUrls.add(route.url)
    return true
  })

  return dedupedRoutes
}
