import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()

const requiredTargets = [
  { file: 'app/mini-sessions/page.tsx', checks: ['generateServiceSchema', 'application/ld+json'] },
  { file: 'app/brand-refresh-sessions/page.tsx', checks: ['generateServiceSchema', 'application/ld+json'] },
  { file: 'app/senior-portraits/page.tsx', checks: ['generateServiceSchema', 'application/ld+json'] },
  { file: 'app/holiday-party/page.tsx', checks: ['generateServiceSchema', 'application/ld+json'] },
  { file: 'app/graduation/page.tsx', checks: ['generateServiceSchema', 'application/ld+json'] },
  { file: 'app/session-prep/page.tsx', checks: ['generateBreadcrumbSchema', 'generateFAQSchema', 'application/ld+json'] },
  { file: 'app/session-prep/[guide]/download/page.tsx', checks: ['generateBreadcrumbSchema', 'application/ld+json'] },
]

const issues = []

for (const target of requiredTargets) {
  const absolutePath = path.join(rootDir, target.file)
  if (!fs.existsSync(absolutePath)) {
    issues.push(`${target.file} is missing`)
    continue
  }

  const source = fs.readFileSync(absolutePath, 'utf8')
  for (const check of target.checks) {
    if (!source.includes(check)) {
      issues.push(`${target.file} is missing structured-data marker: ${check}`)
    }
  }
}

if (issues.length) {
  console.error(`Structured data target audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Structured data target audit passed across ${requiredTargets.length} target groups.`)
