import { NextResponse } from 'next/server'
import { sitemapBaseUrl } from '@/lib/sitemap-data'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export async function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /setup-admin',
    'Disallow: /login',
    'Disallow: /gallery/',
    '',
    `Sitemap: ${sitemapBaseUrl}/sitemap.xml`,
    `Sitemap: ${sitemapBaseUrl}/sitemap_index.xml`,
    '',
  ].join('\n')

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
    },
  })
}
