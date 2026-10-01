import { sitemapBaseUrl } from '@/lib/sitemap-data'

type ValidationResult = {
  content: string
  brokenLinks: string[]
  correctedLinks: Array<{ from: string; to: string }>
}

const SITE_HOSTS = new Set(['studio37.cc', 'www.studio37.cc'])
const SITEMAP_INDEX_URL = `${sitemapBaseUrl}/sitemap.xml`

function extractLocs(xml: string) {
  return Array.from(xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)).map((match) => match[1].trim())
}

function normalizePathForMatch(href: string) {
  try {
    const url = href.startsWith('http')
      ? new URL(href)
      : new URL(href, sitemapBaseUrl)
    let path = decodeURI(url.pathname || '/')
    path = path.replace(/\/+$/, '') || '/'
    return path.toLowerCase()
  } catch {
    return ''
  }
}

function normalizeInternalHref(href: string) {
  const trimmed = href.trim()
  if (!trimmed || trimmed.startsWith('#') || /^(mailto|tel|sms):/i.test(trimmed)) return null

  try {
    const url = trimmed.startsWith('http')
      ? new URL(trimmed)
      : new URL(trimmed, sitemapBaseUrl)
    if (!SITE_HOSTS.has(url.hostname.toLowerCase())) return null
    return {
      original: trimmed,
      path: url.pathname.replace(/\/+$/, '') || '/',
      suffix: `${url.search || ''}${url.hash || ''}`,
      normalizedPath: normalizePathForMatch(url.href),
    }
  } catch {
    return null
  }
}

async function fetchXml(url: string) {
  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      accept: 'application/xml,text/xml,*/*',
    },
  })
  if (!response.ok) {
    throw new Error(`Could not fetch sitemap URL ${url}: ${response.status}`)
  }
  return response.text()
}

async function linkReturns404(url: string) {
  const response = await fetch(url, {
    method: 'HEAD',
    cache: 'no-store',
  })

  if (response.status === 405 || response.status === 501) {
    const fallbackResponse = await fetch(url, { cache: 'no-store' })
    return fallbackResponse.status === 404
  }

  return response.status === 404
}

async function getLiveSitemapUrls() {
  const indexXml = await fetchXml(SITEMAP_INDEX_URL)
  const indexLocs = extractLocs(indexXml)
  const childSitemaps = indexLocs.filter((loc) => /sitemap/i.test(loc) && loc !== SITEMAP_INDEX_URL)
  const pageLocs = indexLocs.filter((loc) => !/sitemap/i.test(loc))
  const childXml = await Promise.all(childSitemaps.map((loc) => fetchXml(loc)))
  const childLocs = childXml.flatMap((xml) => extractLocs(xml))
  return [...pageLocs, ...childLocs]
}

function extractInternalLinks(content: string) {
  const links = new Set<string>()
  const markdownLinkPattern = /(?<!!)\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g
  const htmlHrefPattern = /\bhref=["']([^"']+)["']/gi

  for (const match of content.matchAll(markdownLinkPattern)) {
    const href = match[1]?.trim()
    if (href) links.add(href)
  }
  for (const match of content.matchAll(htmlHrefPattern)) {
    const href = match[1]?.trim()
    if (href) links.add(href)
  }

  return Array.from(links)
    .map((href) => normalizeInternalHref(href))
    .filter((link): link is NonNullable<ReturnType<typeof normalizeInternalHref>> => Boolean(link))
}

function replaceLink(content: string, from: string, to: string) {
  return content.split(from).join(to)
}

export async function validateBlogInternalLinks(content: string): Promise<ValidationResult> {
  const sitemapUrls = await getLiveSitemapUrls()
  const livePathByNormalized = new Map<string, string>()

  for (const loc of sitemapUrls) {
    const normalized = normalizePathForMatch(loc)
    if (!normalized) continue
    const url = new URL(loc)
    livePathByNormalized.set(normalized, url.pathname.replace(/\/+$/, '') || '/')
  }

  const brokenLinks: string[] = []
  const correctedLinks: Array<{ from: string; to: string }> = []
  const checkedUrls = new Map<string, boolean>()
  let correctedContent = content

  for (const link of extractInternalLinks(content)) {
    const livePath = livePathByNormalized.get(link.normalizedPath)
    if (!livePath) {
      brokenLinks.push(link.original)
      continue
    }

    const correctedHref = `${livePath}${link.suffix}`
    const resolvedUrl = `${sitemapBaseUrl}${correctedHref}`
    let is404 = checkedUrls.get(resolvedUrl)
    if (typeof is404 === 'undefined') {
      is404 = await linkReturns404(resolvedUrl)
      checkedUrls.set(resolvedUrl, is404)
    }
    if (is404) {
      brokenLinks.push(link.original)
      continue
    }

    if (link.original !== correctedHref) {
      correctedContent = replaceLink(correctedContent, link.original, correctedHref)
      correctedLinks.push({ from: link.original, to: correctedHref })
    }
  }

  return {
    content: correctedContent,
    brokenLinks: Array.from(new Set(brokenLinks)),
    correctedLinks,
  }
}
