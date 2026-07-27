import fs from 'node:fs'

const checks = [
  {
    file: 'app/page.tsx',
    patterns: [
      'HomepageNarrativeFlow',
      'PublicTrustStrip',
      'ChooseYourPathSection',
      'CuratedRecentWork',
      'RealReviewProofStrip',
      'WhatHappensNextSection',
      'PackageRecommenderCTA',
      'LeadCaptureForm',
    ],
  },
  {
    file: 'lib/public-content.ts',
    patterns: [
      'curatedImageSlots',
      'engagementHero',
      'proposalProof',
      'familyProof',
      'commercialProof',
      'studio37Reviews',
      'localTrustReviews',
      'testimonialsByService',
      'Ainslee C.',
      'Lisa D.',
      'Ivana M.',
      'Felipa Q.',
      'photoLocationIdeas',
    ],
  },
  {
    file: 'components/LocalPhotographerCityPage.tsx',
    patterns: [
      'localTrustReviews',
      'Real Studio37 Planning Proof',
      'Local Planning Tips',
      'parking, walking distance, restroom access',
      'serviceIntentCards',
    ],
  },
  {
    file: 'components/LocationPageTemplate.tsx',
    patterns: [
      'localTrustReviews',
      'Local Client Proof',
      'BestPhotoLocationsSection',
      'parking, walking distance, shade, restroom access',
    ],
  },
  {
    file: 'components/ServicesConversionTail.tsx',
    patterns: ['ServiceExpectationCards', 'PublicConversionStack', 'branding-marketing', 'mobileExpanded'],
  },
  {
    file: 'components/ServiceIntentPanel.tsx',
    patterns: ['serviceTone', 'Decision Board', 'Planning focus', 'wedding', 'portrait', 'event', 'commercial', 'branding'],
  },
  {
    file: 'components/ConsultationBookingForm.tsx',
    patterns: ['bookingContextByKey', 'Context we will carry into the call', 'serviceParam', 'sourceParam', 'Service context'],
  },
  {
    file: 'components/PortfolioRequestForm.tsx',
    patterns: ['projectProofProfiles', 'Proof match:', 'Private proof concierge', 'proof_focus'],
  },
  {
    file: 'app/request-portfolio/page.tsx',
    patterns: ['Concierge matching', 'A useful proof set, not a random gallery dump', 'PortfolioRequestForm'],
  },
  {
    file: 'tests/smoke/public-and-admin.spec.ts',
    patterns: [
      'mobile conversion path remains visible across public pages',
      'request-portfolio',
      'book-consultation',
      'mobile fixed conversion UI does not overlap incoherently',
    ],
  },
]

const servicePages = [
  'app/services/portrait-photography/page.tsx',
  'app/services/wedding-photography/page.tsx',
  'app/services/event-photography/page.tsx',
  'app/services/commercial-photography/page.tsx',
  'app/services/engagement-session/page.tsx',
  'app/services/concierge-services/page.tsx',
]

const subServicePages = [
  'app/family-photography/page.tsx',
  'app/senior-portraits/page.tsx',
  'app/professional-headshots/page.tsx',
  'app/maternity-sessions/page.tsx',
  'app/graduation/page.tsx',
  'app/corporate-events/page.tsx',
  'app/birthday-party/page.tsx',
  'app/fundraiser/page.tsx',
  'app/anniversary-party/page.tsx',
  'app/holiday-party/page.tsx',
  'app/product-photography/page.tsx',
  'app/architectural-photography/page.tsx',
  'app/brand-refresh-sessions/page.tsx',
]

for (const file of servicePages) {
  checks.push({
    file,
    patterns: ['FAQSection', 'ServiceTestimonialsSection', 'book-consultation'],
  })
}

for (const file of subServicePages) {
  checks.push({
    file,
    patterns: ['book-consultation', 'proof', 'planning'],
  })
}

const failures = []

for (const check of checks) {
  const source = fs.existsSync(check.file) ? fs.readFileSync(check.file, 'utf8') : ''
  if (!source) {
    failures.push(`${check.file} missing`)
    continue
  }
  for (const pattern of check.patterns) {
    if (!source.includes(pattern)) failures.push(`${check.file} missing "${pattern}"`)
  }
}

const homepage = fs.readFileSync('app/page.tsx', 'utf8')
const ordered = [
  '<Hero',
  '<PublicTrustStrip',
  '<HomepageNarrativeFlow',
  '<ChooseYourPathSection',
  '<CuratedRecentWork',
  '<RealReviewProofStrip',
  '<WhatHappensNextSection',
  '<PackageRecommenderCTA',
]

let lastIndex = -1
for (const marker of ordered) {
  const index = homepage.indexOf(marker)
  if (index === -1) {
    failures.push(`homepage missing order marker "${marker}"`)
  } else if (index < lastIndex) {
    failures.push(`homepage marker "${marker}" appears out of order`)
  }
  lastIndex = index
}

if (failures.length) {
  console.error('Public conversion flow audit failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Public conversion flow audit passed across ${checks.length} structural checks.`)
