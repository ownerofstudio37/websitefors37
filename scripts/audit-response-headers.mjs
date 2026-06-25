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
if (!nextConfig.includes('source: "/sitemap.xml"') || !nextConfig.includes('source: "/sitemap_index.xml"')) {
  issues.push('next.config.js is missing explicit sitemap XML header rules')
}

for (const route of ['app/sitemap.xml/route.ts', 'app/sitemap_index.xml/route.ts']) {
  const source = read(route)
  if (!source.includes("dynamic = 'force-dynamic'")) {
    issues.push(`${route} should force dynamic rendering`)
  }
  if (!source.includes('no-store') || !source.includes('s-maxage=0')) {
    issues.push(`${route} should send no-store cache headers`)
  }
  if (!source.includes("'X-Robots-Tag': 'noindex'")) {
    issues.push(`${route} should send X-Robots-Tag: noindex`)
  }
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
    ['/sitemap.xml', 'xml', 'x-robots-tag'],
    ['/sitemap_index.xml', 'xml', 'x-robots-tag'],
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
  }
}

await fetchHeaderChecks()

if (issues.length) {
  console.error(`Response header audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log('Response header audit passed.')
