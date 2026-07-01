import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const appDir = path.join(rootDir, 'app')
const sitemapDataPath = path.join(rootDir, 'lib/sitemap-data.ts')

const conflictGroups = [
  ['app/the-woodlands/page.tsx', 'app/locations/[slug]/page.tsx', 'app/local-photographer-the-woodlands-tx/page.tsx'],
  ['app/houston/page.tsx', 'app/locations/[slug]/page.tsx', 'app/local-photographer-houston-tx/page.tsx'],
  ['app/magnolia/page.tsx', 'app/locations/[slug]/page.tsx', 'app/local-photographer-magnolia-tx/page.tsx'],
  ['app/tomball/page.tsx', 'app/locations/[slug]/page.tsx', 'app/local-photographer-tomball-tx/page.tsx'],
]

const redirectedShortRoutes = [
  'pinehurst',
  'the-woodlands',
  'spring',
  'tomball',
  'conroe',
  'magnolia',
  'montgomery',
  'willis',
  'huntsville',
  'new-caney',
  'new-waverly',
  'hockley',
  'bryan',
  'college-station',
  'houston',
]

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8')
}

function canonicalFromSource(source) {
  const match = source.match(/canonicalUrl:\s*['"`]([^'"`]+)['"`]/)
  return match?.[1] || null
}

const issues = []
const sitemapSource = read('lib/sitemap-data.ts')

for (const shortRoute of redirectedShortRoutes) {
  if (!sitemapSource.includes(`'${shortRoute}'`)) {
    issues.push(`REDIRECTED_LOCATION_SLUGS is missing ${shortRoute}`)
  }
  if (sitemapSource.includes(`\`${'${sitemapBaseUrl}'}/${shortRoute}\``)) {
    issues.push(`sitemap-data appears to include redirected short route /${shortRoute}`)
  }
}

for (const group of conflictGroups) {
  const canonicals = new Map()
  for (const relativePath of group) {
    const absolutePath = path.join(rootDir, relativePath)
    if (!fs.existsSync(absolutePath)) {
      if (relativePath.includes('[slug]')) continue
      issues.push(`${relativePath} is missing`)
      continue
    }
    const canonical = canonicalFromSource(read(relativePath))
    if (canonical) canonicals.set(relativePath, canonical)
  }

  const seen = new Map()
  for (const [file, canonical] of canonicals.entries()) {
    seen.set(canonical, [...(seen.get(canonical) || []), file])
  }
  for (const [canonical, files] of seen.entries()) {
    if (files.length > 1) {
      issues.push(`canonical conflict ${canonical} in ${files.join(', ')}`)
    }
  }
}

if (!fs.existsSync(appDir)) {
  issues.push('app directory is missing')
}

if (issues.length) {
  console.error(`Canonical conflict audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Canonical conflict audit passed across ${conflictGroups.length} route groups.`)
