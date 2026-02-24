import { createClient } from '@supabase/supabase-js'
import { MetadataRoute } from 'next'
import { businessInfo } from '@/lib/seo-config'

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

// Helper to determine priority based on post age
function getBlogPostPriority(publishedAt: string | null, updatedAt: string): number {
  if (!publishedAt && !updatedAt) return PRIORITIES.blogPostsOld
  
  const compareDate = publishedAt || updatedAt
  const ageInDays = Math.floor((Date.now() - new Date(compareDate).getTime()) / (1000 * 60 * 60 * 24))
  
  if (ageInDays <= 30) return PRIORITIES.blogPostsRecent
  if (ageInDays <= 90) return PRIORITIES.blogPostsModerate
  return PRIORITIES.blogPostsOld
}

// Helper to determine change frequency based on post age
function getBlogPostChangeFrequency(publishedAt: string | null, updatedAt: string): 'daily' | 'weekly' | 'monthly' | 'yearly' {
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
  
  console.log('[Sitemap] Starting sitemap generation...')
  
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
      url: `${baseUrl}/services/family-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/services/senior-portraits`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/services/professional-headshots`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.servicePages,
    },
    {
      url: `${baseUrl}/services/maternity-sessions`,
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
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: PRIORITIES.mainPages,
    },
    // Local SEO landing pages
    {
      url: `${baseUrl}/local-photographer-pinehurst-tx`,
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
  ]
  
  console.log(`[Sitemap] Added ${routes.length} static routes`)
  
  // Add all published content pages (excluding verification pages)
  try {
    const { data: pages, error } = await supabase
      .from('content_pages')
      .select('slug, updated_at')
      .eq('published', true)
    
    if (error) {
      console.error('[Sitemap] Error fetching content pages:', error)
    } else if (pages) {
      console.log(`[Sitemap] Fetched ${pages.length} content pages from database`)
      
      const filteredPages = pages.filter(page => {
        const isExcluded = EXCLUDED_PAGE_SLUGS.has(page.slug)
        const matchesPattern = EXCLUDED_PAGE_PATTERNS.some((pattern) => pattern.test(page.slug))
        
        if (isExcluded || matchesPattern) {
          console.log(`[Sitemap] Excluding page: ${page.slug}`)
          return false
        }
        return true
      })
      
      console.log(`[Sitemap] Including ${filteredPages.length} content pages after filtering`)

      const contentRoutes = filteredPages.map(page => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page.updated_at),
        changeFrequency: 'weekly' as const,
        priority: PRIORITIES.contentPages,
      }))
      
      routes.push(...contentRoutes)
    }
  } catch (error) {
    console.error('[Sitemap] Exception fetching content pages:', error)
  }
  
  // Add all published blog posts with enhanced metadata for better indexing
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at, featured_image, excerpt, title, category')
      .eq('published', true)
      .order('published_at', { ascending: false, nullsLast: true })
    
    if (error) {
      console.error('[Sitemap] Error fetching blog posts:', error)
    } else if (posts && posts.length > 0) {
      console.log(`[Sitemap] Fetched ${posts.length} blog posts from database`)
      
      const blogRoutes = posts.map((post: any) => {
        const priority = getBlogPostPriority(post.published_at, post.updated_at)
        const changeFrequency = getBlogPostChangeFrequency(post.published_at, post.updated_at)
        
        const route: any = {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at),
          changeFrequency,
          priority,
        }
        
        // Add image information if featured_image exists
        // This helps Google Image Search discover and index blog images
        if (post.featured_image) {
          route.images = [
            {
              url: post.featured_image,
              title: post.title,
              caption: post.excerpt || `Featured image for ${post.title}`,
            }
          ]
        }
        
        return route
      })
      
      routes.push(...blogRoutes)
      
      // Add blog category archive pages (if you have categorized posts)
      // This helps search engines discover blog taxonomy and related content
      const categories = new Set(posts
        .filter((p: any) => p.category)
        .map((p: any) => p.category))
      
      if (categories.size > 0) {
        const categoryRoutes = Array.from(categories).map(category => ({
          url: `${baseUrl}/blog?category=${encodeURIComponent(String(category))}`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }))
        
        routes.push(...categoryRoutes)
      }
      
      console.log(`[Sitemap] Added ${blogRoutes.length} blog posts and ${categories.size} blog categories`)
    } else {
      console.log('[Sitemap] No blog posts found or posts array is empty')
    }
  } catch (error) {
    console.error('[Sitemap] Exception fetching blog posts:', error)
  }
  
  console.log(`[Sitemap] Total routes in sitemap: ${routes.length}`)
  return routes
}
