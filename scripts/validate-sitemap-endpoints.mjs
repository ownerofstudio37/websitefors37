const baseUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3000'

const requiredUrls = [
  'https://www.studio37.cc',
  'https://www.studio37.cc/services',
  'https://www.studio37.cc/book-a-session',
  'https://www.studio37.cc/contact',
  'https://www.studio37.cc/tools/pricing',
  'https://www.studio37.cc/locations/katy-tx',
]

const excludedPatterns = [
  /\/admin(?:\/|$)/,
  /\/login$/,
  /\/setup-admin$/,
  /\/gallery$/,
  /\/gallery\/[^/]+/,
  /\/portfolio$/,
]

const redirectedPaths = [
  '/gallery',
  '/portfolio',
  '/pinehurst',
  '/the-woodlands',
  '/spring',
  '/tomball',
  '/conroe',
  '/magnolia',
  '/montgomery',
  '/willis',
  '/huntsville',
  '/new-caney',
  '/hockley',
  '/bryan',
  '/college-station',
  '/houston',
]

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

async function fetchText(pathname) {
  const response = await fetch(new URL(pathname, baseUrl))
  assert(response.ok, `${pathname} returned ${response.status}`)
  const contentType = response.headers.get('content-type') || ''
  if (pathname.endsWith('.xml')) {
    assert(contentType.includes('xml'), `${pathname} returned unexpected content type: ${contentType}`)
  }
  return response.text()
}

function extractLocs(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) =>
    match[1]
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
  )
}

function assertXmlDocument(xml, rootTag, label) {
  assert(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), `${label} is missing XML declaration`)
  assert(xml.includes(`<${rootTag}`), `${label} is missing <${rootTag}>`)
  assert(xml.includes(`</${rootTag}>`), `${label} is missing </${rootTag}>`)
  assert(!/[^\s]$/.test(xml) || xml.endsWith('\n'), `${label} should end with a newline`)
}

function assertAbsoluteUrls(urls, label) {
  urls.forEach((url) => {
    try {
      const parsed = new URL(url)
      assert(parsed.protocol === 'https:', `${label} contains non-HTTPS URL: ${url}`)
    } catch {
      throw new Error(`${label} contains invalid URL: ${url}`)
    }
  })
}

const sitemapXml = await fetchText('/sitemap.xml')
const sitemapIndexXml = await fetchText('/sitemap_index.xml')
const robotsText = await fetchText('/robots.txt')

assertXmlDocument(sitemapXml, 'urlset', 'sitemap.xml')
assertXmlDocument(sitemapIndexXml, 'sitemapindex', 'sitemap_index.xml')

const sitemapUrls = extractLocs(sitemapXml)
const sitemapIndexUrls = extractLocs(sitemapIndexXml)

assert(sitemapUrls.length >= 50, `sitemap.xml has too few URLs: ${sitemapUrls.length}`)
assertAbsoluteUrls(sitemapUrls, 'sitemap.xml')
assertAbsoluteUrls(sitemapIndexUrls, 'sitemap_index.xml')
assert(
  sitemapIndexUrls.includes('https://www.studio37.cc/sitemap.xml'),
  'sitemap_index.xml does not reference sitemap.xml'
)

const missingRequiredUrls = requiredUrls.filter((url) => !sitemapUrls.includes(url))
assert(
  missingRequiredUrls.length === 0,
  `sitemap.xml is missing required URLs: ${missingRequiredUrls.join(', ')}`
)

const excludedUrls = sitemapUrls.filter((url) =>
  excludedPatterns.some((pattern) => pattern.test(url))
)
assert(excludedUrls.length === 0, `sitemap.xml contains excluded URLs: ${excludedUrls.join(', ')}`)

const redirectedUrls = redirectedPaths
  .map((path) => `https://www.studio37.cc${path}`)
  .filter((url) => sitemapUrls.includes(url))
assert(
  redirectedUrls.length === 0,
  `sitemap.xml contains redirected source URLs: ${redirectedUrls.join(', ')}`
)

assert(
  robotsText.includes('Sitemap: https://www.studio37.cc/sitemap.xml'),
  'robots.txt does not reference sitemap.xml'
)
assert(
  robotsText.includes('Sitemap: https://www.studio37.cc/sitemap_index.xml'),
  'robots.txt does not reference sitemap_index.xml'
)

console.log(`Sitemap endpoint validation passed with ${sitemapUrls.length} URLs.`)
