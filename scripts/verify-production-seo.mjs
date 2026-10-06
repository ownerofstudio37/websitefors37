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
  'https://www.studio37.cc/local-photographer-katy-tx',
  'https://www.studio37.cc/humble',
  'https://www.studio37.cc/atascocita',
  'https://www.studio37.cc/kingwood',
  'https://www.studio37.cc/cleveland',
  'https://www.studio37.cc/navasota',
  'https://www.studio37.cc/plantersville',
  'https://www.studio37.cc/porter',
  'https://www.studio37.cc/splendora',
  'https://www.studio37.cc/waller',
]

const redirectedPaths = [
  '/gallery',
  '/portfolio',
  '/seo',
  '/digital-marketing',
  '/senior',
  '/corporate-headshots',
  '/pinehurst',
  '/katy',
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
  '/locations/pinehurst-tx',
  '/locations/katy-tx',
  '/locations/the-woodlands-tx',
  '/locations/spring-tx',
  '/locations/cypress-tx',
  '/locations/tomball-tx',
  '/locations/conroe-tx',
  '/locations/magnolia-tx',
  '/locations/montgomery-tx',
  '/locations/willis-tx',
  '/locations/huntsville-tx',
  '/locations/new-caney-tx',
  '/locations/new-waverly-tx',
  '/locations/hockley-tx',
  '/locations/bryan-tx',
  '/locations/college-station-tx',
  '/locations/houston-tx',
  '/locations/humble-tx',
  '/locations/atascocita-tx',
  '/locations/kingwood-tx',
  '/locations/cleveland-tx',
  '/locations/navasota-tx',
  '/locations/plantersville-tx',
  '/locations/porter-tx',
  '/locations/splendora-tx',
  '/locations/waller-tx',
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

const childSitemapUrls = extractLocs(sitemap.text)
const sitemapIndexUrls = extractLocs(sitemapIndex.text)
const childSitemaps = await Promise.all(
  childSitemapUrls.map((url) => fetchText(new URL(url).pathname))
)
const sitemapUrls = childSitemaps.flatMap((child) => extractLocs(child.text))

if (childSitemapUrls.length < 4) {
  fail(`Live sitemap index has too few child sitemaps: ${childSitemapUrls.length}`)
}

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

if (sitemapIndexUrls.join('|') !== childSitemapUrls.join('|')) {
  fail('Live sitemap_index.xml does not mirror sitemap.xml')
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

  if (headers.get('content-security-policy')) {
    fail(`${label} should not send Content-Security-Policy`)
  }

  if (headers.get('cross-origin-resource-policy')) {
    fail(`${label} should not send Cross-Origin-Resource-Policy`)
  }

  if (age !== null && allowedAge !== null && age > allowedAge * 2) {
    fail(`${label} appears stale: age=${age}, cache-control=${cacheControl}, cache-status=${cacheStatus}`)
  }
}

for (const [label, text] of [
  ['sitemap.xml', sitemap.text],
  ['sitemap_index.xml', sitemapIndex.text],
]) {
  for (const stylesheet of text.match(/<\?xml-stylesheet[^?]*\?>/g) || []) {
    if (!stylesheet.includes('href="/sitemap.xsl"')) {
      fail(`${label} may only reference the same-origin /sitemap.xsl stylesheet; got ${stylesheet}`)
    }
  }
}

console.log(`Production SEO verification passed with ${sitemapUrls.length} live sitemap URLs.`)
