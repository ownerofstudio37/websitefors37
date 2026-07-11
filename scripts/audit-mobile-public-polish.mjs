import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const checks = [
  {
    file: 'components/Navigation.tsx',
    patterns: [
      'v1762887052/IMG_2115_mtuowt_tayodz.png',
      'useState<string | null>(() => initialLogoUrl || DEFAULT_BRAND_LOGO)',
      "scrolled ? 'h-11' : 'h-14'",
    ],
  },
  {
    file: 'components/CuratedRecentWork.tsx',
    patterns: ['Request Complete Galleries', 'Request similar galleries', 'TrackedPortfolioRequestLink'],
  },
  {
    file: 'components/ConsultationBookingForm.tsx',
    patterns: ['function parseDateOnly', 'function formatSelectedDate', 'formatSelectedDate(selectedDate)', 'Central Time'],
  },
  {
    file: 'components/Services.tsx',
    patterns: ['aria-label={`View ${service.title}`}', 'href={`/services/${service.slug}`}'],
  },
  {
    file: 'components/QuoteCaptureMount.tsx',
    patterns: ['dynamic(() => import', 'requestIdleCallback', 'eligiblePrefixes'],
  },
  {
    file: 'app/layout.tsx',
    patterns: ['QuoteCaptureMount', '<QuoteCaptureMount />'],
  },
  {
    file: 'components/LocalPhotographerCityPage.tsx',
    patterns: ['Local Confidence', 'bg-stone-950', 'surface-panel p-5 text-center'],
  },
  {
    file: 'app/blog/page.tsx',
    patterns: ['Studio37 Journal', 'section-shell bg-stone-50', 'rounded-lg border border-stone-200 bg-white'],
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
