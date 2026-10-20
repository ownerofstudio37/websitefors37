import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const sourceDirs = ['app', 'components']
const galleryHost = 'https://gallery.studio37.cc'
const ignoredRoutePrefixes = ['/api', '/_next']
const ignoredFiles = [
  /^app\/admin\//,
  /^components\/admin\//,
  /^components\/EmailBuilder\.tsx$/,
  /^components\/NotificationCenter\.tsx$/,
  /^components\/VisualEditor/,
  /^components\/builder\//,
]

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    if (entry.isDirectory()) walk(fullPath, files)
    if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) files.push(fullPath)
  }
  return files
}

function rel(file) {
  return path.relative(rootDir, file)
}

function routeFromPage(file) {
  const relative = rel(file)
  if (!relative.startsWith('app/') || !relative.endsWith('/page.tsx')) return null
  const route = relative
    .replace(/^app/, '')
    .replace(/\/page\.tsx$/, '')
    .replace(/\/\(.*?\)/g, '')
  return route || '/'
}

function compileRoutePattern(route) {
  const escaped = route
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\\\[\.{3}[^/]+\\\]/g, '.+')
    .replace(/\\\[[^/]+\\\]/g, '[^/]+')
  return new RegExp(`^${escaped}/?$`)
}

function normalizeInternalHref(href) {
  if (href.startsWith('//')) return null
  if (!href.startsWith('/')) return null
  if (ignoredRoutePrefixes.some((prefix) => href.startsWith(prefix))) return null
  const withoutHash = href.split('#')[0]
  const withoutQuery = withoutHash.split('?')[0]
  return withoutQuery || '/'
}

function extractHrefs(source) {
  const hrefs = []
  for (const match of source.matchAll(/\bhref=\{?["'`]([^"'`{}]+)["'`]\}?/g)) hrefs.push(match[1])
  for (const match of source.matchAll(/\b(?:href|link|buttonLink|secondaryButtonLink|ctaLink):\s*["'`]([^"'`{}]+)["'`]/g)) {
    hrefs.push(match[1])
  }
  return hrefs
}

const pageFiles = walk(path.join(rootDir, 'app')).filter((file) => file.endsWith('/page.tsx'))
const routePatterns = pageFiles
  .map(routeFromPage)
  .filter(Boolean)
  .map(compileRoutePattern)

const issues = []
const files = sourceDirs
  .flatMap((dir) => walk(path.join(rootDir, dir)))
  .filter((file) => !ignoredFiles.some((pattern) => pattern.test(rel(file))))

let sawGalleryHost = false

for (const file of files) {
  const relative = rel(file)
  const source = fs.readFileSync(file, 'utf8')
  if (source.includes(galleryHost)) sawGalleryHost = true

  for (const href of extractHrefs(source)) {
    if (href === '/gallery' || href === '/portfolio') {
      issues.push(`${relative} links to ${href}; public gallery/portfolio links should use ${galleryHost}`)
    }

    const internalHref = normalizeInternalHref(href)
    if (!internalHref) continue
    if (!routePatterns.some((pattern) => pattern.test(internalHref))) {
      issues.push(`${relative} links to missing public route: ${href}`)
    }
  }
}

if (!sawGalleryHost) {
  issues.push(`No public source references ${galleryHost}`)
}

if (issues.length) {
  console.error(`Public link audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Public link audit passed across ${files.length} source files.`)
