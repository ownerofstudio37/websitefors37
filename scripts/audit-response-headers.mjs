import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const issues = []

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8')
}

const nextConfig = read('next.config.js')
if (!nextConfig.includes('Content-Security-Policy')) {
  issues.push('next.config.js is missing the global Content-Security-Policy header')
}
if (!nextConfig.includes('.*\\\\.xml$|robots\\\\.txt$')) {
  issues.push('next.config.js global page headers should exclude XML sitemap and robots.txt endpoints')
}

for (const route of ['app/sitemap.xml/route.ts', 'app/sitemap_index.xml/route.ts']) {
  const source = read(route)
  if (!source.includes("dynamic = 'force-dynamic'")) {
    issues.push(`${route} should force dynamic rendering`)
  }
  if (source.includes("'X-Robots-Tag': 'noindex'")) {
    issues.push(`${route} should not send X-Robots-Tag: noindex; sitemap XML should remain crawler-discoverable`)
  }
}

const sitemapXmlHelper = read('lib/sitemap-xml.ts')
if (sitemapXmlHelper.includes('xml-stylesheet')) {
  issues.push('lib/sitemap-xml.ts should not emit xml-stylesheet processing instructions for crawler sitemap XML')
}

const robotsRoute = read('app/robots.txt/route.ts')
if (!robotsRoute.includes("dynamic = 'force-dynamic'") || !robotsRoute.includes('no-store')) {
  issues.push('app/robots.txt/route.ts should force dynamic rendering and no-store cache')
}

async function fetchHeaderChecks() {
  const baseUrl = process.env.SITE_URL
  if (!baseUrl) return

  const checks = [
    ['/', 'text/html', 'content-security-policy'],
    ['/robots.txt', 'text/plain', 'cache-control'],
    ['/sitemap.xml', 'xml', 'cache-control'],
    ['/sitemap_index.xml', 'xml', 'cache-control'],
  ]

  for (const [pathname, contentTypeNeedle, requiredHeader] of checks) {
    const response = await fetch(new URL(pathname, baseUrl))
    if (!response.ok) {
      issues.push(`${pathname} returned ${response.status}`)
      continue
    }
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes(contentTypeNeedle)) {
      issues.push(`${pathname} returned unexpected content-type: ${contentType}`)
    }
    if (!response.headers.has(requiredHeader)) {
      issues.push(`${pathname} is missing ${requiredHeader}`)
    }
    if (pathname.endsWith('.xml') && /noindex/i.test(response.headers.get('x-robots-tag') || '')) {
      issues.push(`${pathname} sends X-Robots-Tag noindex`)
    }
    if (pathname.endsWith('.xml')) {
      const csp = response.headers.get('content-security-policy')
      const corp = response.headers.get('cross-origin-resource-policy')
      if (csp) issues.push(`${pathname} should not send Content-Security-Policy; got ${csp}`)
      if (corp) issues.push(`${pathname} should not send Cross-Origin-Resource-Policy; got ${corp}`)
      const text = await response.text()
      if (text.includes('xml-stylesheet')) {
        issues.push(`${pathname} should not include an xml-stylesheet processing instruction`)
      }
    }
  }
}

await fetchHeaderChecks()

if (issues.length) {
  console.error(`Response header audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log('Response header audit passed.')
