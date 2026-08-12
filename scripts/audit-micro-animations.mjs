import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const checks = [
  {
    file: 'app/globals.css',
    patterns: [
      '.motion-section',
      '@keyframes sectionReveal',
      '@supports (animation-timeline: view())',
      '@media (prefers-reduced-motion: reduce)',
      '.sticky-cta-enter',
      '@keyframes stickyCtaEnter',
      '.interactive-card:hover',
      '.interactive-card:focus-within',
    ],
  },
  {
    file: 'components/PublicStickyCTA.tsx',
    patterns: [
      'sticky-cta-enter',
      'data-mobile-nav-hide',
      'min-h-[64px]',
      'active:scale-[0.98]',
      'group-active:scale-95',
      'https://gallery.studio37.cc',
    ],
  },
  {
    file: 'components/Navigation.tsx',
    patterns: [
      'body.dataset.mobileNavOpen',
      'mobile-menu-enter',
      'z-[120]',
      'z-[130]',
      'min-h-12',
      'focus:ring-2 focus:ring-amber-600',
    ],
  },
  {
    file: 'components/CuratedRecentWork.tsx',
    patterns: ['motion-section', 'interactive-card', 'interactive-image', 'TrackedPortfolioRequestLink'],
  },
  {
    file: 'components/PublicFeatureContent.tsx',
    patterns: ['motion-section', 'interactive-card', 'BestPhotoLocationsSection', 'ServiceTestimonialsSection'],
  },
  {
    file: 'components/PublicConversionSections.tsx',
    patterns: ['motion-section', 'interactive-card', 'PackageComparisonSection', 'PackageRecommenderCTA'],
  },
  {
    file: 'components/PackageRecommender.tsx',
    patterns: ['active:scale-[0.98]', 'focus:ring-2 focus:ring-amber-600', 'recordLeadTimelineEvent'],
  },
  {
    file: 'components/EnhancedChatBot.tsx',
    patterns: ['data-mobile-nav-hide', 'bottom-[calc(5.75rem+env(safe-area-inset-bottom))]', 'z-50'],
  },
]

const failures = []

for (const check of checks) {
  const source = fs.readFileSync(path.join(root, check.file), 'utf8')
  for (const pattern of check.patterns) {
    if (!source.includes(pattern)) failures.push(`${check.file} is missing ${pattern}`)
  }
}

if (failures.length) {
  console.error(`Micro-animation audit failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Micro-animation audit passed across ${checks.length} surfaces.`)
