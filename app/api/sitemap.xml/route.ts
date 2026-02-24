import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const baseUrl = 'https://www.studio37.cc'

export const revalidate = 1800

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

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const currentDate = new Date().toISOString()
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
    
    // Static URLs
    const staticUrls = [
      { url: baseUrl, priority: 1.0, frequency: 'weekly' },
      { url: `${baseUrl}/services`, priority: 0.9, frequency: 'monthly' },
      { url: `${baseUrl}/services/wedding-photography`, priority: 0.8, frequency: 'monthly' },
      { url: `${baseUrl}/services/portrait-photography`, priority: 0.8, frequency: 'monthly' },
      { url: `${baseUrl}/services/commercial-photography`, priority: 0.8, frequency: 'monthly' },
      { url: `${baseUrl}/services/event-photography`, priority: 0.8, frequency: 'monthly' },
      { url: `${baseUrl}/services/family-photography`, priority: 0.8, frequency: 'monthly' },
      { url: `${baseUrl}/services/senior-portraits`, priority: 0.8, frequency: 'monthly' },
      { url: `${baseUrl}/services/professional-headshots`, priority: 0.8, frequency: 'monthly' },
      { url: `${baseUrl}/services/maternity-sessions`, priority: 0.8, frequency: 'monthly' },
      { url: `${baseUrl}/book-a-session`, priority: 0.9, frequency: 'weekly' },
      { url: `${baseUrl}/contact`, priority: 0.9, frequency: 'monthly' },
      { url: `${baseUrl}/gallery`, priority: 0.8, frequency: 'weekly' },
      { url: `${baseUrl}/about`, priority: 0.8, frequency: 'monthly' },
      { url: `${baseUrl}/blog`, priority: 0.8, frequency: 'daily' },
      { url: `${baseUrl}/local-photographer-pinehurst-tx`, priority: 0.8, frequency: 'monthly' },
    ]
    
    for (const item of staticUrls) {
      xml += `  <url>\n`
      xml += `    <loc>${escapeXml(item.url)}</loc>\n`
      xml += `    <lastmod>${currentDate}</lastmod>\n`
      xml += `    <changefreq>${item.frequency}</changefreq>\n`
      xml += `    <priority>${item.priority}</priority>\n`
      xml += `  </url>\n`
    }

    // Content pages (exclude verification/utility slugs)
    try {
      const { data: pages } = await supabase
        .from('content_pages')
        .select('slug, updated_at')
        .eq('published', true)

      if (pages && pages.length > 0) {
        const filteredPages = pages.filter(page => {
          if (EXCLUDED_PAGE_SLUGS.has(page.slug)) {
            return false
          }
          return !EXCLUDED_PAGE_PATTERNS.some((pattern) => pattern.test(page.slug))
        })

        for (const page of filteredPages) {
          xml += `  <url>\n`
          xml += `    <loc>${escapeXml(`${baseUrl}/${page.slug}`)}</loc>\n`
          xml += `    <lastmod>${new Date(page.updated_at).toISOString()}</lastmod>\n`
          xml += `    <changefreq>weekly</changefreq>\n`
          xml += `    <priority>0.7</priority>\n`
          xml += `  </url>\n`
        }
      }
    } catch (error) {
      console.error('Error fetching content pages:', error)
    }
    
    // Blog posts
    try {
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at, featured_image, excerpt, title, category')
        .eq('published', true)
        .order('published_at', { ascending: false, nullsLast: true })
      
      if (posts && posts.length > 0) {
        for (const post of posts) {
          const priority = getBlogPriority(post.published_at, post.updated_at)
          const frequency = getBlogFrequency(post.published_at, post.updated_at)
          
          xml += `  <url>\n`
          xml += `    <loc>${escapeXml(`${baseUrl}/blog/${post.slug}`)}</loc>\n`
          xml += `    <lastmod>${post.updated_at}</lastmod>\n`
          xml += `    <changefreq>${frequency}</changefreq>\n`
          xml += `    <priority>${priority}</priority>\n`
          
          if (post.featured_image) {
            xml += `    <image:image>\n`
            xml += `      <image:loc>${escapeXml(post.featured_image)}</image:loc>\n`
            xml += `      <image:title>${escapeXml(post.title)}</image:title>\n`
            if (post.excerpt) {
              xml += `      <image:caption>${escapeXml(post.excerpt)}</image:caption>\n`
            }
            xml += `    </image:image>\n`
          }
          
          xml += `  </url>\n`
        }
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    }
    
    xml += '</urlset>\n'
    
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new NextResponse('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      status: 500,
      headers: { 'Content-Type': 'application/xml' },
    })
  }
}

function getBlogPriority(publishedAt: string | null, updatedAt: string): number {
  const compareDate = publishedAt || updatedAt
  const ageInDays = Math.floor((Date.now() - new Date(compareDate).getTime()) / (1000 * 60 * 60 * 24))
  
  if (ageInDays <= 30) return 0.8
  if (ageInDays <= 90) return 0.7
  return 0.5
}

function getBlogFrequency(publishedAt: string | null, updatedAt: string): string {
  const compareDate = publishedAt || updatedAt
  const ageInDays = Math.floor((Date.now() - new Date(compareDate).getTime()) / (1000 * 60 * 60 * 24))
  
  if (ageInDays <= 7) return 'daily'
  if (ageInDays <= 30) return 'weekly'
  return 'monthly'
}

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
