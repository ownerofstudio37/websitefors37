#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const routes = [
  'app/page.tsx',
  'app/services/page.tsx',
  'app/services/wedding-photography/page.tsx',
  'app/services/portrait-photography/page.tsx',
  'app/services/event-photography/page.tsx',
  'app/services/commercial-photography/page.tsx',
  'app/services/branding-marketing/page.tsx',
  'app/blog/page.tsx',
  'app/book-consultation/page.tsx',
  'app/request-portfolio/page.tsx',
  'components/LocalPhotographerCityPage.tsx',
]

const checks = [
  ['primary CTA', /btn-primary|Book|Get a Quote|Plan/i],
  ['secondary path', /btn-secondary|pricing|package-recommender|request-portfolio/i],
  ['proof/review language', /proof|review|gallery|portfolio|Duo|two photographers/i],
  ['premium surface/card system', /surface-|rounded-|shadow|border/i],
  ['mobile responsive classes', /sm:|md:|lg:/],
]

let failures = 0
for (const route of routes) {
  const abs = path.join(process.cwd(), route)
  const source = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : ''
  const missing = checks.filter(([, pattern]) => !pattern.test(source)).map(([label]) => label)
  if (missing.length) {
    failures += 1
    console.log(`WARN ${route}: missing ${missing.join(', ')}`)
  } else {
    console.log(`OK   ${route}`)
  }
}

if (failures) {
  console.log(`\nDesign consistency audit completed with ${failures} warnings.`)
  process.exitCode = 1
} else {
  console.log('\nDesign consistency audit passed.')
}
