import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const pages = [
  { route: '/mini-sessions', file: 'app/mini-sessions/page.tsx' },
  { route: '/brand-refresh-sessions', file: 'app/brand-refresh-sessions/page.tsx' },
  { route: '/senior-portraits', file: 'app/senior-portraits/page.tsx' },
  { route: '/holiday-party', file: 'app/holiday-party/page.tsx' },
  { route: '/graduation', file: 'app/graduation/page.tsx' },
]

const required = ['/book-a-session', 'PrepGuideLeadMagnet']
const issues = []

for (const page of pages) {
  const source = fs.readFileSync(path.join(root, page.file), 'utf8')
  for (const marker of required) {
    if (!source.includes(marker)) issues.push(`${page.route} missing conversion marker: ${marker}`)
  }
}

if (issues.length) {
  console.error(`Seasonal conversion audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Seasonal conversion audit passed across ${pages.length} seasonal pages.`)
