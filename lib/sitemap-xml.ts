import { NextResponse } from 'next/server'
import type { MetadataRoute } from 'next'
import { getSitemapRoutes, sitemapBaseUrl } from '@/lib/sitemap-data'

export type SitemapSectionKey =
  | 'pages'
  | 'services'
  | 'local'
  | 'service-areas'
  | 'session-prep'
  | 'blog'

export const sitemapCacheControl = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'

const childSitemaps: Array<{ key: SitemapSectionKey; loc: string }> = [
  { key: 'pages', loc: `${sitemapBaseUrl}/page-sitemap.xml` },
  { key: 'services', loc: `${sitemapBaseUrl}/service-sitemap.xml` },
  { key: 'local', loc: `${sitemapBaseUrl}/local-sitemap.xml` },
  { key: 'service-areas', loc: `${sitemapBaseUrl}/service-area-sitemap.xml` },
  { key: 'session-prep', loc: `${sitemapBaseUrl}/session-prep-sitemap.xml` },
  { key: 'blog', loc: `${sitemapBaseUrl}/blog-sitemap.xml` },
]

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

function sitemapHeaders(contentType = 'application/xml; charset=utf-8') {
  return {
    'Content-Type': contentType,
    'Cache-Control': sitemapCacheControl,
  }
}

function sectionForRoute(route: MetadataRoute.Sitemap[number]): SitemapSectionKey {
  const pathname = new URL(route.url).pathname

  if (pathname === '/blog' || pathname.startsWith('/blog/')) return 'blog'
  if (pathname === '/session-prep' || pathname.startsWith('/session-prep/')) return 'session-prep'
  if (pathname.startsWith('/local-photographer-') || pathname.startsWith('/locations')) return 'local'
  if (
    /^\/(?:wedding|portrait|family|headshot|engagement)-photographer-[a-z0-9-]+-tx$/.test(pathname)
  ) {
    return 'service-areas'
  }
  if (
    pathname === '/services' ||
    pathname.startsWith('/services/') ||
    [
      '/family-photography',
      '/professional-headshots',
      '/senior-portraits',
      '/mini-sessions',
      '/brand-refresh-sessions',
      '/product-photography',
      '/architectural-photography',
      '/maternity-sessions',
      '/corporate-events',
      '/birthday-party',
      '/graduation',
      '/fundraiser',
      '/anniversary-party',
      '/holiday-party',
    ].includes(pathname)
  ) {
    return 'services'
  }

  return 'pages'
}

export async function getSitemapSections() {
  const routes = await getSitemapRoutes()

  return childSitemaps.map((section) => {
    const sectionRoutes = routes.filter((route) => sectionForRoute(route) === section.key)
    const lastModified = sectionRoutes.reduce<Date | null>((latest, route) => {
      const routeDate = new Date(formatLastModified(route.lastModified))
      return !latest || routeDate > latest ? routeDate : latest
    }, null)

    return {
      ...section,
      routes: sectionRoutes,
      lastModified: (lastModified ?? new Date()).toISOString(),
    }
  })
}

export async function getSitemapIndexResponse() {
  const sections = await getSitemapSections()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sections
  .map(
    (section) => `  <sitemap>
    <loc>${escapeXml(section.loc)}</loc>
    <lastmod>${section.lastModified}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>
`

  return new NextResponse(xml, { headers: sitemapHeaders() })
}

export async function getSitemapSectionResponse(sectionKey: SitemapSectionKey) {
  const section = (await getSitemapSections()).find((candidate) => candidate.key === sectionKey)
  if (!section) {
    return new NextResponse('Not found', { status: 404 })
  }

  const urls = section.routes
    .map((route) => {
      const changeFrequency = route.changeFrequency
        ? `\n    <changefreq>${route.changeFrequency}</changefreq>`
        : ''
      const priority =
        typeof route.priority === 'number' ? `\n    <priority>${route.priority.toFixed(1)}</priority>` : ''

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

  return new NextResponse(xml, { headers: sitemapHeaders() })
}
