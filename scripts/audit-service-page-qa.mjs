#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const routes = [
  'app/services/page.tsx',
  'app/services/wedding-photography/page.tsx',
  'app/services/portrait-photography/page.tsx',
  'app/services/engagement-session/page.tsx',
  'app/services/event-photography/page.tsx',
  'app/services/commercial-photography/page.tsx',
  'app/services/branding-marketing/page.tsx',
  'app/services/concierge-services/page.tsx',
  'app/family-photography/page.tsx',
  'app/senior-portraits/page.tsx',
  'app/professional-headshots/page.tsx',
  'app/maternity-sessions/page.tsx',
  'app/graduation/page.tsx',
  'app/corporate-events/page.tsx',
  'app/birthday-party/page.tsx',
  'app/anniversary-party/page.tsx',
  'app/holiday-party/page.tsx',
  'app/fundraiser/page.tsx',
  'app/product-photography/page.tsx',
  'app/mini-sessions/page.tsx',
  'app/brand-refresh-sessions/page.tsx',
]

const checks = [
  ['hero clarity', /<h1|SubServiceHero|Hero/i],
  ['real image with fit/alt handling', /<Image|image:|heroImage|imageAlt/i, /alt=|imageAlt|object-cover|imagePosition/i],
  ['pricing/package expectation', /pricing|package|starting at|starts at|from \$|\$\d/i],
  ['proof or process signal', /proof|review|testimonial|gallery|portfolio|two photographers|Duo|process|approach|location|delivery/i],
  ['booking or quote CTA', /book-consultation|book-a-session|get-quote|Book Consultation|Get Instant Quote|Plan/i],
  ['secondary conversion path', /request-portfolio|tools\/pricing|package-recommender|contact|session-prep|services\/engagement-session|PortraitSubServiceSupport|SubServicePackageGrid|Explore full/i],
  ['responsive/premium layout system', /section-shell|surface-panel|interactive-card|SubServiceHero|SubServicePackageGrid|md:|lg:|container mx-auto/i],
]

const failures = []

for (const route of routes) {
  const absolutePath = path.join(root, route)
  if (!fs.existsSync(absolutePath)) {
    failures.push(`${route}: file missing`)
    continue
  }

  const source = fs.readFileSync(absolutePath, 'utf8')
  for (const [label, ...patterns] of checks) {
    if (!patterns.every((pattern) => pattern.test(source))) {
      failures.push(`${route}: missing ${label}`)
    }
  }
}

if (failures.length) {
  console.error(`Service page QA audit failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Service page QA audit passed across ${routes.length} service and sub-service pages.`)
