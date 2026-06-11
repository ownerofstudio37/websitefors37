import { NextResponse } from 'next/server'
import type { MetadataRoute } from 'next'
import { getSitemapRoutes } from '@/lib/sitemap-data'

export const revalidate = 1800

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatLastModified(value: MetadataRoute.Sitemap[number]['lastModified']) {
  if (!value) return new Date().toISOString()
  if (value instanceof Date) return value.toISOString()
  return new Date(value).toISOString()
}

export async function GET() {
  const routes = await getSitemapRoutes()

  const urls = routes
    .map((route) => {
      const changeFrequency = route.changeFrequency
        ? `\n    <changefreq>${route.changeFrequency}</changefreq>`
        : ''
      const priority = typeof route.priority === 'number'
        ? `\n    <priority>${route.priority.toFixed(1)}</priority>`
        : ''

      return `  <url>
    <loc>${escapeXml(route.url)}</loc>
    <lastmod>${formatLastModified(route.lastModified)}</lastmod>${changeFrequency}${priority}
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600',
    },
  })
}
