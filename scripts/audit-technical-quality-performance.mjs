import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const checks = [
  {
    file: 'app/page.tsx',
    patterns: ['import LazyMount', '<LazyMount minHeight={400}>'],
  },
  {
    file: 'app/layout.tsx',
    patterns: ['ChatBotMount', 'QuoteCaptureMount'],
  },
  {
    file: 'components/ChatBotMount.tsx',
    patterns: ['dynamic(() => import', 'requestIdleCallback', 'onFirstInteract'],
  },
  {
    file: 'components/QuoteCaptureMount.tsx',
    patterns: ['dynamic(() => import', 'eligiblePrefixes', 'requestIdleCallback'],
  },
  {
    file: 'tests/smoke/public-and-admin.spec.ts',
    patterns: [
      "{ name: 'homepage', path: '/' }",
      "{ name: 'services', path: '/services' }",
      "{ name: 'locations', path: '/locations' }",
      "{ name: 'pricing', path: '/tools/pricing' }",
      "{ name: 'package-recommender', path: '/tools/package-recommender' }",
      "{ name: 'session-prep', path: '/session-prep' }",
      "{ name: 'booking', path: '/book-a-session' }",
      'mobile fixed conversion UI does not overlap incoherently',
      'mobile prelaunch UX surfaces render without overlap',
      'page.screenshot',
    ],
  },
  {
    file: 'scripts/audit-public-links.mjs',
    patterns: ['https://gallery.studio37.cc', 'links to missing public route'],
  },
  {
    file: 'scripts/audit-fixed-ui-overlap.mjs',
    patterns: ['PublicStickyCTA.tsx', 'QuoteAbandonmentCapture.tsx', 'EnhancedChatBot.tsx'],
  },
  {
    file: 'scripts/audit-response-headers.mjs',
    patterns: ['Content-Security-Policy', 'sitemap.xml', 'robots.txt', 'content-security-policy'],
  },
  {
    file: 'scripts/verify-production-smoke.mjs',
    patterns: ['https://www.studio37.cc', '/sitemap.xml', '/tools/pricing'],
  },
  {
    file: 'package.json',
    patterns: ['audit:technical-quality-performance', 'verify:production-smoke', 'audit:technical'],
  },
]

const failures = []

for (const check of checks) {
  const sourcePath = path.join(root, check.file)
  const source = fs.existsSync(sourcePath) ? fs.readFileSync(sourcePath, 'utf8') : ''
  for (const pattern of check.patterns) {
    if (!source.includes(pattern)) failures.push(`${check.file} is missing ${pattern}`)
  }
}

if (failures.length) {
  console.error('Technical quality/performance audit failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Technical quality/performance audit passed.')
