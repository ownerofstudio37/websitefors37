import { NextResponse } from 'next/server'
import generateSitemap from '@/app/sitemap'

export const revalidate = 1800

export async function GET() {
  try {
    const entries = await generateSitemap()
    
    const lines: string[] = []
    lines.push('<?xml version="1.0" encoding="UTF-8"?>')
    lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">')

    for (const item of entries) {
      lines.push('  <url>')
      lines.push(`    <loc>${escapeXml(item.url)}</loc>`)
      if (item.lastModified) {
        lines.push(`    <lastmod>${new Date(item.lastModified).toISOString()}</lastmod>`)
      }
      if (item.changeFrequency) {
        lines.push(`    <changefreq>${item.changeFrequency}</changefreq>`)
      }
      if (typeof item.priority === 'number') {
        lines.push(`    <priority>${item.priority}</priority>`)
      }

      const images = (item as any).images as Array<{ url: string; title?: string; caption?: string }> | undefined
      if (images && images.length > 0) {
        for (const image of images) {
          lines.push('    <image:image>')
          lines.push(`      <image:loc>${escapeXml(image.url)}</image:loc>`)
          if (image.title) lines.push(`      <image:title>${escapeXml(image.title)}</image:title>`)
          if (image.caption) lines.push(`      <image:caption>${escapeXml(image.caption)}</image:caption>`)
          lines.push('    </image:image>')
        }
      }

      lines.push('  </url>')
    }
    
    lines.push('</urlset>')
    const xml = `${lines.join('\n')}\n`
    
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

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
