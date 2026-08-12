#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const exists = (file) => fs.existsSync(path.join(root, file))

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) files.push(full)
  }
  return files
}

function extractMeta(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*(['"\`])([\\s\\S]*?)\\1`))
  return match?.[2]?.replace(/\s+/g, ' ').trim() || ''
}

const mainServicePages = [
  'app/services/wedding-photography/page.tsx',
  'app/services/portrait-photography/page.tsx',
  'app/services/engagement-session/page.tsx',
  'app/services/event-photography/page.tsx',
  'app/services/commercial-photography/page.tsx',
  'app/services/branding-marketing/page.tsx',
  'app/services/concierge-services/page.tsx',
]

const subServicePages = [
  'app/family-photography/page.tsx',
  'app/senior-portraits/page.tsx',
  'app/professional-headshots/page.tsx',
  'app/maternity-sessions/page.tsx',
  'app/graduation/page.tsx',
  'app/corporate-events/page.tsx',
  'app/birthday-party/page.tsx',
  'app/anniversary-party/page.tsx',
  'app/holiday-party/page.tsx',
  'app/fundraiser/page.tsx',
  'app/product-photography/page.tsx',
  'app/mini-sessions/page.tsx',
  'app/brand-refresh-sessions/page.tsx',
]

const highValuePages = ['app/page.tsx', 'app/services/page.tsx', ...mainServicePages, ...subServicePages]
const issues = []

const adminSeo = read('app/admin/seo/page.tsx')
for (const marker of [
  'Live deployed sitemap validation',
  'sitemapContentType',
  'sitemapIndexContentType',
  'sitemapUrlCount',
  'REQUIRED_SITEMAP_URLS',
  'search.google.com/search-console/sitemaps',
]) {
  if (!adminSeo.includes(marker)) issues.push(`app/admin/seo/page.tsx missing live sitemap marker: ${marker}`)
}

const metadataRecords = []
for (const file of highValuePages) {
  if (!exists(file)) {
    issues.push(`${file} missing`)
    continue
  }
  const source = read(file)
  const metaBlock = source.match(/generateSEOMetadata\(\{([\s\S]*?)\n\}\)/)?.[1] || source
  const title = extractMeta(metaBlock, 'title')
  const description = extractMeta(metaBlock, 'description')

  if (!title && !source.includes('metadata =')) issues.push(`${file} is missing metadata title`)
  if (!description && !source.includes('metadata =')) issues.push(`${file} is missing metadata description`)
  if (title && title.length < 24) issues.push(`${file} title is too short for SEO intent`)
  if (description && description.length < 80) issues.push(`${file} meta description is too thin`)
  metadataRecords.push({ file, title: title.toLowerCase(), description: description.toLowerCase() })
}

for (const key of ['title', 'description']) {
  const grouped = new Map()
  for (const item of metadataRecords) {
    if (!item[key]) continue
    grouped.set(item[key], [...(grouped.get(item[key]) || []), item.file])
  }
  for (const [value, files] of grouped) {
    if (files.length > 1) issues.push(`Repeated ${key} "${value}" across ${files.join(', ')}`)
  }
}

for (const file of mainServicePages) {
  const source = read(file)
  if (!source.includes('generateServiceSchema(')) issues.push(`${file} missing Service schema`)
  if (!source.includes('generateFAQSchema(')) issues.push(`${file} missing FAQ schema`)
  if (!source.includes('generateBreadcrumbSchema(')) issues.push(`${file} missing Breadcrumb schema`)
  if (!source.includes('application/ld+json')) issues.push(`${file} missing JSON-LD output`)
}

for (const file of subServicePages) {
  const source = read(file)
  if (!source.includes('generateServiceSchema(')) issues.push(`${file} missing Service schema`)
  if (!/FAQSection|generateFAQSchema|SubServiceStoryBlock|PortraitSubServiceSupport/.test(source)) {
    issues.push(`${file} missing FAQ/process/support content`)
  }
}

const localTemplate = read('components/LocalPhotographerCityPage.tsx')
for (const marker of ['generateEnhancedLocalBusinessSchema', 'generateBreadcrumbSchema', 'generateFAQSchema', 'application/ld+json']) {
  if (!localTemplate.includes(marker)) issues.push(`LocalPhotographerCityPage.tsx missing local schema marker: ${marker}`)
}

const blogArticle = read('app/blog/[slug]/page.tsx')
for (const marker of ['generateArticleSchema', 'generateBreadcrumbSchema', 'application/ld+json']) {
  if (!blogArticle.includes(marker)) issues.push(`app/blog/[slug]/page.tsx missing blog schema marker: ${marker}`)
}

const publicSources = [
  ...highValuePages,
  'app/blog/page.tsx',
  'app/blog/[slug]/page.tsx',
  'components/LocalPhotographerCityPage.tsx',
  'components/LocationPageTemplate.tsx',
  'components/ServiceCityLandingPage.tsx',
  'components/PublicConversionSections.tsx',
  'components/CuratedRecentWork.tsx',
  'components/ServicesConversionTail.tsx',
  'components/ServiceIntentPanel.tsx',
].filter((file, index, list) => exists(file) && list.indexOf(file) === index)
for (const file of publicSources) {
  const source = read(file)
  const imageUses = source.match(/<Image(?:\s|>)[\s\S]*?(?:\/>|<\/Image>)/g) || []
  for (const image of imageUses) {
    if (!/alt=\{?/.test(image)) issues.push(`${file} has an Image without alt text`)
    if (/alt=(["'])(?:image|photo|gallery image|portfolio image|studio37 image)\1/i.test(image)) {
      issues.push(`${file} has generic Image alt text`)
    }
  }

  const cloudinaryUrls = source.match(/https:\/\/res\.cloudinary\.com\/[^\s'"`)]+/g) || []
  for (const url of cloudinaryUrls) {
    if (url.includes('undefined') || url.includes(' ')) issues.push(`${file} has malformed Cloudinary URL: ${url}`)
  }
}

for (const file of mainServicePages) {
  const source = read(file)
  const renderedSource = `${source}\n${read('components/ServiceIntentPanel.tsx')}\n${read('components/ServicesConversionTail.tsx')}\n${read('components/PublicConversionSections.tsx')}`
  for (const marker of ['/book-consultation', '/tools/pricing', '/request-portfolio']) {
    if (!renderedSource.includes(marker)) issues.push(`${file} missing internal conversion link ${marker}`)
  }
}

const serviceHub = read('app/services/page.tsx')
for (const marker of ['/family-photography', '/corporate-events', '/product-photography', '/services/branding-marketing']) {
  if (!serviceHub.includes(marker)) issues.push(`app/services/page.tsx missing sub-service link ${marker}`)
}

const localInternalLinks = ['/tools/package-recommender', '/tools/pricing', '/book-consultation', '/request-portfolio']
for (const marker of localInternalLinks) {
  if (!localTemplate.includes(marker)) issues.push(`LocalPhotographerCityPage.tsx missing local internal link ${marker}`)
}

if (issues.length) {
  console.error(`SEO content coverage audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`SEO content coverage audit passed across ${highValuePages.length} high-value pages and ${publicSources.length} source files.`)
