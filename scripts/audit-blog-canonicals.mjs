const SITE_URL = process.env.SITE_URL || 'https://www.studio37.cc'
const LIMIT = Number(process.env.BLOG_CANONICAL_AUDIT_LIMIT || '0')

function normalizeUrl(value) {
  return String(value || '').replace(/\/$/, '')
}

function extractTag(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || ''
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    signal: AbortSignal.timeout(20000),
  })
  return { response, text: await response.text() }
}

async function main() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`
  const { response, text: sitemap } = await fetchText(sitemapUrl)

  if (!response.ok) {
    throw new Error(`Sitemap failed: ${response.status} ${sitemap.slice(0, 120)}`)
  }

  const urls = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g))
    .map((match) => match[1])
    .filter((url) => url.includes('/blog/'))
    .filter((url) => !url.includes('/blog/category/'))

  const targets = LIMIT > 0 ? urls.slice(0, LIMIT) : urls
  const failures = []

  for (const url of targets) {
    try {
      const { response: pageResponse, text: html } = await fetchText(url)
      const canonical = extractTag(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
      const robots = extractTag(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)
      const title = extractTag(html, /<title>(.*?)<\/title>/is)
      const description = extractTag(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)

      if (pageResponse.status !== 200) failures.push(`${url} returned ${pageResponse.status}`)
      if (normalizeUrl(canonical) !== normalizeUrl(url)) failures.push(`${url} canonical mismatch: ${canonical || 'missing'}`)
      if (/noindex/i.test(robots)) failures.push(`${url} has noindex robots: ${robots}`)
      if (!title) failures.push(`${url} missing title`)
      if (!description) failures.push(`${url} missing meta description`)
      if (/747live\.bet/i.test(html)) failures.push(`${url} contains suspicious 747live.bet reference`)
    } catch (error) {
      failures.push(`${url} failed fetch/check: ${error.message}`)
    }
  }

  console.log(`Checked ${targets.length} blog URLs from ${sitemapUrl}`)

  if (failures.length) {
    console.error(`\nBlog canonical audit failed (${failures.length}):`)
    failures.forEach((failure) => console.error(`- ${failure}`))
    process.exit(1)
  }

  console.log('Blog canonical audit passed.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
