const baseUrl = process.env.SITE_URL || 'https://www.studio37.cc'

const requiredUrls = [
  'https://www.studio37.cc',
  'https://www.studio37.cc/services',
  'https://www.studio37.cc/book-a-session',
  'https://www.studio37.cc/contact',
  'https://www.studio37.cc/tools/pricing',
  'https://www.studio37.cc/tools/package-recommender',
  'https://www.studio37.cc/gallery-experience',
  'https://www.studio37.cc/session-prep',
  'https://www.studio37.cc/locations',
  'https://www.studio37.cc/locations/katy-tx',
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
  '/new-waverly',
  '/hockley',
  '/bryan',
  '/college-station',
  '/houston',
]

function fail(message) {
  throw new Error(message)
}

function extractLocs(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) =>
    match[1].replace(/&amp;/g, '&')
  )
}

async function fetchText(pathname) {
  const response = await fetch(new URL(pathname, baseUrl))
  if (!response.ok) fail(`${pathname} returned ${response.status}`)
  return {
    text: await response.text(),
    headers: response.headers,
  }
}

function headerNumber(headers, name) {
  const value = headers.get(name)
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function maxAge(cacheControl) {
  const match = cacheControl.match(/(?:s-|max-)age=(\d+)/i)
  return match ? Number(match[1]) : null
}

const sitemap = await fetchText('/sitemap.xml')
const sitemapIndex = await fetchText('/sitemap_index.xml')
const robots = await fetchText('/robots.txt')

const sitemapUrls = extractLocs(sitemap.text)
const sitemapIndexUrls = extractLocs(sitemapIndex.text)

const missingRequired = requiredUrls.filter((url) => !sitemapUrls.includes(url))
if (missingRequired.length) {
  fail(`Live sitemap is missing required URLs: ${missingRequired.join(', ')}`)
}

const redirectedInSitemap = redirectedPaths
  .map((path) => `https://www.studio37.cc${path}`)
  .filter((url) => sitemapUrls.includes(url))
if (redirectedInSitemap.length) {
  fail(`Live sitemap contains redirected source URLs: ${redirectedInSitemap.join(', ')}`)
}

if (!sitemapIndexUrls.includes('https://www.studio37.cc/sitemap.xml')) {
  fail('Live sitemap_index.xml does not reference sitemap.xml')
}

if (!robots.text.includes('Sitemap: https://www.studio37.cc/sitemap.xml')) {
  fail('Live robots.txt does not reference sitemap.xml')
}

for (const [label, headers] of [
  ['sitemap.xml', sitemap.headers],
  ['sitemap_index.xml', sitemapIndex.headers],
]) {
  const cacheControl = headers.get('cache-control') || ''
  const robotsTag = headers.get('x-robots-tag') || ''
  const age = headerNumber(headers, 'age')
  const allowedAge = maxAge(cacheControl)
  const cacheStatus = headers.get('cache-status') || ''

  if (/noindex/i.test(robotsTag)) {
    fail(`${label} returns x-robots-tag noindex`)
  }

  if (age !== null && allowedAge !== null && age > allowedAge * 2) {
    fail(`${label} appears stale: age=${age}, cache-control=${cacheControl}, cache-status=${cacheStatus}`)
  }
}

console.log(`Production SEO verification passed with ${sitemapUrls.length} live sitemap URLs.`)
