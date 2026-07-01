import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const checks = [
  {
    file: 'components/Navigation.tsx',
    patterns: [
      'v1762887052/IMG_2115_mtuowt_tayodz.png',
      'useState<string | null>(() => initialLogoUrl || DEFAULT_BRAND_LOGO)',
    ],
  },
  {
    file: 'components/CuratedRecentWork.tsx',
    patterns: ['const itemGalleryUrl', 'View full gallery'],
  },
  {
    file: 'components/Services.tsx',
    patterns: ['aria-label={`View ${service.title}`}', 'href={`/services/${service.slug}`}'],
  },
  {
    file: 'tests/smoke/public-and-admin.spec.ts',
    patterns: [
      '/services/portrait-photography',
      '/local-photographer-pinehurst-tx',
      '/blog',
    ],
  },
  {
    file: 'app/local-photographer-pinehurst-tx/page.tsx',
    patterns: ['res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg'],
  },
  {
    file: 'playwright.config.ts',
    patterns: ['mobile-chromium', 'width: 390', 'tablet-chromium'],
  },
]

const failures = []

for (const check of checks) {
  const absolutePath = path.join(root, check.file)
  const source = fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, 'utf8') : ''

  for (const pattern of check.patterns) {
    if (!source.includes(pattern)) {
      failures.push(`${check.file} is missing ${pattern}`)
    }
  }
}

if (failures.length) {
  console.error('Mobile/public polish audit failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Mobile/public polish audit passed.')
