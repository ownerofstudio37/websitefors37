const baseUrl = process.env.SITE_URL || 'https://www.studio37.cc'

const checks = [
  ['/', 'text/html', ['content-security-policy']],
  ['/robots.txt', 'text/plain', ['cache-control']],
  ['/sitemap.xml', 'xml', ['cache-control']],
  ['/sitemap_index.xml', 'xml', ['cache-control']],
  ['/services', 'text/html', ['content-security-policy']],
  ['/tools/pricing', 'text/html', ['content-security-policy']],
  ['/tools/package-recommender', 'text/html', ['content-security-policy']],
  ['/book-a-session', 'text/html', ['content-security-policy']],
  ['/book-consultation', 'text/html', ['content-security-policy']],
  ['/request-portfolio', 'text/html', ['content-security-policy']],
]

const issues = []

for (const [pathname, contentTypeNeedle, requiredHeaders] of checks) {
  const response = await fetch(new URL(pathname, baseUrl), { redirect: 'manual' })
  if (response.status >= 500) {
    issues.push(`${pathname} returned ${response.status}`)
    continue
  }
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes(contentTypeNeedle)) {
    issues.push(`${pathname} returned unexpected content-type: ${contentType}`)
  }
  for (const header of requiredHeaders) {
    if (!response.headers.has(header)) issues.push(`${pathname} is missing ${header}`)
  }
  if (pathname.endsWith('.xml') && /noindex/i.test(response.headers.get('x-robots-tag') || '')) {
    issues.push(`${pathname} returns x-robots-tag noindex`)
  }
  if (pathname.endsWith('.xml')) {
    const csp = response.headers.get('content-security-policy')
    const corp = response.headers.get('cross-origin-resource-policy')
    if (csp) issues.push(`${pathname} should not send Content-Security-Policy`)
    if (corp) issues.push(`${pathname} should not send Cross-Origin-Resource-Policy`)
    const body = await response.text()
    for (const stylesheet of body.match(/<\?xml-stylesheet[^?]*\?>/g) || []) {
      if (!stylesheet.includes('href="/sitemap.xsl"')) {
        issues.push(`${pathname} may only reference the same-origin /sitemap.xsl stylesheet; got ${stylesheet}`)
      }
    }
  }
}

if (issues.length) {
  console.error(`Production smoke failed for ${baseUrl}:`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Production smoke passed for ${baseUrl}.`)
