import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const checks = [
  {
    file: 'app/product-photography/page.tsx',
    patterns: [
      'PS373287_d7fl9k.jpg',
      'ecommerce, websites, catalogs, ads, social posts, and launch campaigns',
      'Product images planned around the channel',
      'Recurring content',
    ],
  },
  {
    file: 'app/services/page.tsx',
    patterns: [
      'Brand Refresh Sessions (commercial photos)',
      'Branding + Marketing (web, SEO, PPC)',
      'Custom websites, SEO, PPC, social systems, and growth strategy',
    ],
  },
  {
    file: 'components/Services.tsx',
    patterns: [
      'Brand refresh photos',
      'Custom website builds',
      'For photo-only refreshes, start with Commercial Photography',
    ],
  },
  {
    file: 'components/LocalPhotographerCityPage.tsx',
    patterns: [
      'parkingNote',
      'proofNote',
      'serviceFit',
      'CITY_SERVICE_GUIDES',
      'Real Studio37 Planning Proof',
    ],
  },
  {
    file: 'app/blog/page.tsx',
    patterns: [
      'Guides for real shoots, not generic photo tips',
      'Turn the guide into a real session plan',
      '/request-portfolio?source=blog',
    ],
  },
  {
    file: 'lib/seo-helpers.ts',
    patterns: [
      'DEFAULT_OG_IMAGE',
      'Untitled-160_convert.io_c7oit0.jpg',
      'metadataBase',
    ],
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
  console.error('SEO content positioning audit failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('SEO content positioning audit passed.')
