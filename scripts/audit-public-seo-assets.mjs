import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const appDir = path.join(rootDir, 'app')
const componentDir = path.join(rootDir, 'components')

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.next')) continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(fullPath, files)
    if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) files.push(fullPath)
  }
  return files
}

function rel(file) {
  return path.relative(rootDir, file)
}

function extractProperty(block, key) {
  const match = block.match(new RegExp(`${key}:\\s*(['"\`])([\\s\\S]*?)\\1`))
  return match?.[2]?.replace(/\s+/g, ' ').trim() || null
}

function reportDuplicates(items, label) {
  const grouped = new Map()
  for (const item of items) {
    if (!item.value) continue
    const normalized = item.value.toLowerCase()
    grouped.set(normalized, [...(grouped.get(normalized) || []), item.file])
  }

  return Array.from(grouped.entries())
    .filter(([, files]) => files.length > 1)
    .map(([value, files]) => `${label} duplicate "${value}" in ${files.join(', ')}`)
}

const pageFiles = walk(appDir).filter((file) => file.endsWith('page.tsx'))
const metadata = []

for (const file of pageFiles) {
  const source = fs.readFileSync(file, 'utf8')
  const match = source.match(/generateSEOMetadata\(\{([\s\S]*?)\n\}\)/)
  if (!match) continue
  metadata.push({
    file: rel(file),
    title: extractProperty(match[1], 'title'),
    description: extractProperty(match[1], 'description'),
  })
}

const issues = [
  ...reportDuplicates(metadata.map((item) => ({ file: item.file, value: item.title })), 'Title'),
  ...reportDuplicates(metadata.map((item) => ({ file: item.file, value: item.description })), 'Description'),
]

const publicFiles = [...walk(componentDir), ...pageFiles]
const genericAltPattern = /alt=\{?`?["']?(?:Studio37 proof|Studio37 image|Gallery image|Portfolio image|Photo|Image)(?:\s|\$\{|["'`}]|$)/i

for (const file of publicFiles) {
  const source = fs.readFileSync(file, 'utf8')
  if (!source.includes('res.cloudinary.com')) continue
  if (genericAltPattern.test(source)) {
    issues.push(`Generic Cloudinary image alt text in ${rel(file)}`)
  }
}

if (issues.length) {
  console.error(`Public SEO asset audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Public SEO asset audit passed across ${metadata.length} metadata blocks and ${publicFiles.length} source files.`)
