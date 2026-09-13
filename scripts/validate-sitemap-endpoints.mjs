const baseUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3000'

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

const excludedPatterns = [
  /\/admin(?:\/|$)/,
  /\/login$/,
  /\/setup-admin$/,
  /\/brand-photography$/,
  /\/gallery$/,
  /\/gallery\/[^/]+/,
  /\/portfolio$/,
]

const redirectedPaths = [
  '/gallery',
  '/portfolio',
  '/brand-photography',
  '/pinehurst',
  '/the-woodlands',
  '/spring',
  '/cypress',
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

assertXmlDocument(sitemapXml, 'sitemapindex', 'sitemap.xml')
assertXmlDocument(sitemapIndexXml, 'sitemapindex', 'sitemap_index.xml')

const childSitemapUrls = extractLocs(sitemapXml)
const sitemapIndexUrls = extractLocs(sitemapIndexXml)

assert(childSitemapUrls.length >= 4, `sitemap.xml has too few child sitemaps: ${childSitemapUrls.length}`)
assertAbsoluteUrls(childSitemapUrls, 'sitemap.xml')
assert(
  sitemapIndexUrls.join('|') === childSitemapUrls.join('|'),
  'sitemap_index.xml should mirror the primary sitemap.xml index'
)

const childSitemapXml = await Promise.all(
  childSitemapUrls.map((url) => fetchText(new URL(url).pathname))
)
childSitemapXml.forEach((xml, index) => {
  assertXmlDocument(xml, 'urlset', childSitemapUrls[index])
})

const sitemapUrls = childSitemapXml.flatMap(extractLocs)

assert(sitemapUrls.length >= 50, `sitemap.xml has too few URLs: ${sitemapUrls.length}`)
assertAbsoluteUrls(sitemapUrls, 'sitemap.xml')

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

if (process.env.CHECK_SITEMAP_URLS === 'true') {
  const failures = []
  const concurrency = Number(process.env.SITEMAP_CHECK_CONCURRENCY || 12)
  let cursor = 0

  async function checkUrl(url) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
        },
      })
      const robotsTag = response.headers.get('x-robots-tag') || ''
      if (response.status !== 200 || /noindex/i.test(robotsTag)) {
        failures.push(`${url} returned ${response.status}${robotsTag ? ` with x-robots-tag: ${robotsTag}` : ''}`)
      }
    } catch (error) {
      failures.push(`${url} failed: ${error?.name || error?.message || 'unknown error'}`)
    } finally {
      clearTimeout(timeout)
    }
  }

  async function worker() {
    while (cursor < sitemapUrls.length) {
      const url = sitemapUrls[cursor++]
      await checkUrl(url)
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker))
  assert(failures.length === 0, `sitemap.xml contains unhealthy URLs:\n${failures.join('\n')}`)
}

console.log(`Sitemap endpoint validation passed with ${sitemapUrls.length} URLs.`)
