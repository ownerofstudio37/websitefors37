import { NextResponse } from 'next/server'
import { sitemapBaseUrl } from '@/lib/sitemap-data'

export const revalidate = 1800

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
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600',
    },
  })
}
