import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const servicesDir = path.join(rootDir, 'app', 'services')
const sitemapSource = fs.readFileSync(path.join(rootDir, 'lib', 'sitemap-data.ts'), 'utf8')

const issues = []

for (const entry of fs.readdirSync(servicesDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const pagePath = path.join(servicesDir, entry.name, 'page.tsx')
  if (!fs.existsSync(pagePath)) continue

  const route = `/services/${entry.name}`
  const source = fs.readFileSync(pagePath, 'utf8')
  const relative = path.relative(rootDir, pagePath)

  if (!source.includes('generateSEOMetadata({')) {
    issues.push(`${relative} is missing generateSEOMetadata`)
  }

  if (!source.includes('generateServiceSchema(')) {
    issues.push(`${relative} is missing Service schema`)
  }

  if (!source.includes(`canonicalUrl: 'https://www.studio37.cc${route}'`) && !source.includes(`canonicalUrl: "https://www.studio37.cc${route}"`)) {
    issues.push(`${relative} canonicalUrl does not match ${route}`)
  }

  if (!sitemapSource.includes(`/services/${entry.name}`)) {
    issues.push(`${relative} is missing from sitemap data`)
  }
}

if (issues.length) {
  console.error(`Service page schema audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log('Service page schema audit passed.')
