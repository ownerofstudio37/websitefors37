import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const publicSourceDirs = ['app', 'components', 'lib']
const ignoredFiles = new Set([
  'app/globals.css',
  'components/Navigation.tsx',
])

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    if (entry.isDirectory()) walk(fullPath, files)
    if (entry.isFile() && /\.(tsx|ts|css)$/.test(entry.name)) files.push(fullPath)
  }
  return files
}

function rel(file) {
  return path.relative(rootDir, file)
}

function extractCloudinaryUrls(source) {
  return Array.from(source.matchAll(/https:\/\/res\.cloudinary\.com\/[^'"`\s)]+/g)).map((match) => match[0])
}

function transformSegment(url) {
  const match = url.match(/\/upload\/([^/]+)\//)
  return match?.[1] || ''
}

function explicitWidth(transform) {
  const match = transform.match(/(?:^|,)w_(\d+)(?:,|$)/)
  return match ? Number(match[1]) : null
}

const issues = []
const files = publicSourceDirs.flatMap((dir) => walk(path.join(rootDir, dir)))

for (const file of files) {
  const relative = rel(file)
  const source = fs.readFileSync(file, 'utf8')

  if (!ignoredFiles.has(relative) && /auto:low|q_auto:low/.test(source)) {
    issues.push(`${relative} uses low Cloudinary quality on a public image`)
  }

  for (const url of extractCloudinaryUrls(source)) {
    const transform = transformSegment(url)
    if (!transform) continue
    if (/q_auto:(?:low|eco)/.test(transform) && !ignoredFiles.has(relative)) {
      issues.push(`${relative} uses low/eco Cloudinary quality: ${url}`)
    }
    const width = explicitWidth(transform)
    if (width !== null && width < 900 && !ignoredFiles.has(relative) && !relative.endsWith('.css')) {
      issues.push(`${relative} has an undersized public Cloudinary transform w_${width}: ${url}`)
    }
  }
}

const optimizedImage = fs.readFileSync(path.join(rootDir, 'components/OptimizedImage.tsx'), 'utf8')
if (!/quality\s*=\s*(8[5-9]|9[0-9])/.test(optimizedImage)) {
  issues.push('components/OptimizedImage.tsx should default to at least quality=85 for public photography cards')
}

if (issues.length) {
  console.error(`Cloudinary image quality audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Cloudinary image quality audit passed across ${files.length} source files.`)
