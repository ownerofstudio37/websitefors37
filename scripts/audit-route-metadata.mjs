import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const appDir = path.join(rootDir, 'app')

const explicitClassifications = new Map([
  ['app/gallery/page.tsx', 'external permanent redirect to gallery.studio37.cc'],
  ['app/portfolio/page.tsx', 'external permanent redirect to gallery.studio37.cc'],
  ['app/login/page.tsx', 'private login route; excluded by robots and sitemap'],
  ['app/setup-admin/page.tsx', 'private setup route; excluded by robots and sitemap'],
  ['app/gallery/[accessCode]/page.tsx', 'private client gallery route; excluded by robots and sitemap'],
])

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    if (entry.isDirectory()) walk(fullPath, files)
    if (entry.isFile() && entry.name === 'page.tsx') files.push(fullPath)
  }
  return files
}

function rel(file) {
  return path.relative(rootDir, file)
}

const issues = []
const pageFiles = walk(appDir).filter((file) => !rel(file).startsWith('app/admin/'))

for (const file of pageFiles) {
  const relative = rel(file)
  const source = fs.readFileSync(file, 'utf8')
  const hasMetadata = /\bexport\s+(?:async\s+function\s+generateMetadata|const\s+metadata\b)|generateSEOMetadata\(/.test(source)
  const hasRedirect = /\bpermanentRedirect\(|\bredirect\(/.test(source)
  const isClassified = explicitClassifications.has(relative)

  if (!hasMetadata && !hasRedirect && !isClassified) {
    issues.push(`${relative} has no metadata, redirect, or explicit indexability classification`)
  }
}

if (issues.length) {
  console.error(`Route metadata audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Route metadata audit passed across ${pageFiles.length} public page files.`)
