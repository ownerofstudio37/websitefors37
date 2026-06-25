import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const checks = [
  {
    file: 'components/PublicStickyCTA.tsx',
    required: ['fixed inset-x-0 bottom-0', 'z-30', 'md:hidden'],
  },
  {
    file: 'components/QuoteAbandonmentCapture.tsx',
    required: ['fixed bottom-24', 'right-20', 'md:bottom-6'],
  },
  {
    file: 'components/EnhancedChatBot.tsx',
    required: ['fixed bottom-24 right-5', 'md:bottom-6 md:right-6', 'z-50'],
  },
  {
    file: 'components/Navigation.tsx',
    required: ['fixed w-full z-50'],
  },
]

const issues = []

for (const check of checks) {
  const source = fs.readFileSync(path.join(rootDir, check.file), 'utf8')
  for (const required of check.required) {
    if (!source.includes(required)) {
      issues.push(`${check.file} is missing fixed UI guardrail: ${required}`)
    }
  }
}

if (issues.length) {
  console.error(`Fixed UI overlap audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Fixed UI overlap audit passed across ${checks.length} public fixed UI surfaces.`)
