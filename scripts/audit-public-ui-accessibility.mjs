import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const checks = [
  {
    file: 'app/layout.tsx',
    required: ['href="#main"', 'Skip to content', 'id="main"'],
  },
  {
    file: 'app/globals.css',
    required: ['prefers-reduced-motion'],
  },
  {
    file: 'components/PortraitHighlightGallery.tsx',
    required: ['aria-label={`Open Studio37', 'focus:ring-2'],
  },
  {
    file: 'components/CuratedRecentWork.tsx',
    required: ['aria-label="Open the full Studio37 gallery', 'quality={88}'],
  },
  {
    file: 'components/QuoteAbandonmentCapture.tsx',
    required: ['We could not save this yet', 'text-red-700'],
  },
]

const forbiddenVisibleCopy = [
  { file: 'components/ServiceAreaMarketModules.tsx', text: 'high-intent' },
  { file: 'components/ServiceAreaMarketModules.tsx', text: 'serviceModules' },
  { file: 'components/CuratedRecentWork.tsx', text: 'site-managed' },
]

const issues = []

for (const check of checks) {
  const source = fs.readFileSync(path.join(rootDir, check.file), 'utf8')
  for (const required of check.required) {
    if (!source.includes(required)) {
      issues.push(`${check.file} is missing UI accessibility marker: ${required}`)
    }
  }
}

for (const check of forbiddenVisibleCopy) {
  const source = fs.readFileSync(path.join(rootDir, check.file), 'utf8')
  if (source.toLowerCase().includes(check.text.toLowerCase())) {
    issues.push(`${check.file} still contains internal/client-unfriendly copy: ${check.text}`)
  }
}

if (issues.length) {
  console.error(`Public UI accessibility audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Public UI accessibility audit passed across ${checks.length} checks.`)
