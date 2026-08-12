import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const checks = [
  {
    file: 'components/LocalPhotographerCityPage.tsx',
    patterns: [
      'Photographer Near Me',
      'photographer near me in',
      'source=local-seo',
      'commercialSeoLinks',
      '/tools/package-recommender',
      '/tools/pricing',
      '/request-portfolio',
    ],
  },
  {
    file: 'app/local-photographer-houston-tx/page.tsx',
    patterns: ['Houston Commercial Photographer Near Me', 'houston commercial photography', 'commercial photographer near me'],
  },
  {
    file: 'app/katy/page.tsx',
    patterns: ['Katy TX Photographer Near Me', 'photographer near me Katy TX'],
  },
  {
    file: 'app/tomball/page.tsx',
    patterns: ['Tomball Photographer Near Me', 'photographer near me Tomball TX'],
  },
  {
    file: 'app/local-photographer-pinehurst-tx/page.tsx',
    patterns: ['Pinehurst TX Photographer Near Me'],
  },
  {
    file: 'app/services/commercial-photography/page.tsx',
    patterns: ['Commercial Photographer Houston', 'commercial photographer near me', 'Product Photography', 'Architectural Photography', 'Brand Refresh Sessions'],
  },
  {
    file: 'app/product-photography/page.tsx',
    patterns: ['Product Photography Houston', 'ecommerce, web, ads, and social'],
  },
  {
    file: 'app/architectural-photography/page.tsx',
    patterns: ['Architecture & Real Estate Photography Houston', 'listing, web, venue, and marketing'],
  },
  {
    file: 'app/brand-refresh-sessions/page.tsx',
    patterns: ['Brand Refresh Photography Houston', 'web, social, profile, and campaign'],
  },
  {
    file: 'app/blog/[slug]/page.tsx',
    patterns: ['$1,200 for 3-hour micro/elopement coverage', 'Private full-gallery proof by request', 'Two photographers on site'],
  },
  {
    file: 'app/admin/analytics/page.tsx',
    patterns: ['Organic local pages', 'Portfolio requests', 'Chatbot leads', 'Quote starts'],
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
  console.error('Search Console growth audit failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Search Console growth audit passed.')
