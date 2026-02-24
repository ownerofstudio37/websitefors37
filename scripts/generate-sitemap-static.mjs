import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const baseUrl = "https://www.studio37.cc"

const EXCLUDED_PAGE_SLUGS = new Set([
  'algolia-verification',
  'bing-site-auth',
  'google-site-verification',
  'yandex-verification',
])

const EXCLUDED_PAGE_PATTERNS = [
  /verification/i,
  /^a[0-9a-f]{30,}$/i,
]

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

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function getBlogPriority(publishedAt, updatedAt) {
  const compareDate = publishedAt || updatedAt
  const ageInDays = Math.floor((Date.now() - new Date(compareDate).getTime()) / (1000 * 60 * 60 * 24))
  if (ageInDays <= 30) return 0.8
  if (ageInDays <= 90) return 0.7
  return 0.5
}

function getBlogFrequency(publishedAt, updatedAt) {
  const compareDate = publishedAt || updatedAt
  const ageInDays = Math.floor((Date.now() - new Date(compareDate).getTime()) / (1000 * 60 * 60 * 24))
  if (ageInDays <= 7) return 'daily'
  if (ageInDays <= 30) return 'weekly'
  return 'monthly'
}

async function generate() {
  const supabase = createClient(supabaseUrl, supabaseKey)
  const currentDate = new Date().toISOString()
  const lines = []

  lines.push('<?xml version="1.0" encoding="UTF-8"?>')
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">')

  for (const item of staticUrls) {
    lines.push('  <url>')
    lines.push(`    <loc>${escapeXml(item.url)}</loc>`)
    lines.push(`    <lastmod>${currentDate}</lastmod>`)
    lines.push(`    <changefreq>${item.frequency}</changefreq>`)
    lines.push(`    <priority>${item.priority}</priority>`)
    lines.push('  </url>')
  }

  const { data: pages } = await supabase
    .from('content_pages')
    .select('slug, updated_at')
    .eq('published', true)

  if (pages && pages.length > 0) {
    const filteredPages = pages.filter(page => {
      if (EXCLUDED_PAGE_SLUGS.has(page.slug)) return false
      return !EXCLUDED_PAGE_PATTERNS.some((pattern) => pattern.test(page.slug))
    })

    for (const page of filteredPages) {
      lines.push('  <url>')
      lines.push(`    <loc>${escapeXml(`${baseUrl}/${page.slug}`)}</loc>`)
      lines.push(`    <lastmod>${new Date(page.updated_at).toISOString()}</lastmod>`)
      lines.push('    <changefreq>weekly</changefreq>')
      lines.push('    <priority>0.7</priority>')
      lines.push('  </url>')
    }
  }

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at, published_at, featured_image, excerpt, title')
    .eq('published', true)
    .order('published_at', { ascending: false, nullsLast: true })

  if (posts && posts.length > 0) {
    for (const post of posts) {
      const priority = getBlogPriority(post.published_at, post.updated_at)
      const frequency = getBlogFrequency(post.published_at, post.updated_at)

      lines.push('  <url>')
      lines.push(`    <loc>${escapeXml(`${baseUrl}/blog/${post.slug}`)}</loc>`)
      lines.push(`    <lastmod>${post.updated_at}</lastmod>`)
      lines.push(`    <changefreq>${frequency}</changefreq>`)
      lines.push(`    <priority>${priority}</priority>`)

      if (post.featured_image) {
        lines.push('    <image:image>')
        lines.push(`      <image:loc>${escapeXml(post.featured_image)}</image:loc>`)
        lines.push(`      <image:title>${escapeXml(post.title)}</image:title>`)
        if (post.excerpt) {
          lines.push(`      <image:caption>${escapeXml(post.excerpt)}</image:caption>`)
        }
        lines.push('    </image:image>')
      }

      lines.push('  </url>')
    }
  }

  lines.push('</urlset>')
  const xml = `${lines.join('\n')}\n`

  const publicDir = path.join(process.cwd(), 'public')
  const apiDir = path.join(publicDir, 'api')
  fs.mkdirSync(apiDir, { recursive: true })

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml)
  fs.writeFileSync(path.join(apiDir, 'sitemap.xml'), xml)

  console.log('Static sitemap generated at public/sitemap.xml and public/api/sitemap.xml')
}

generate().catch((error) => {
  console.error('Failed to generate sitemap:', error)
  process.exit(1)
})
