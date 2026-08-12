#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const budgets = {
  maxPriorityImagesPerRoute: 2,
  maxHeroImageWidthHint: 2400,
  maxLazyMountSectionsPerRoute: 8,
  maxRouteSourceKb: 140,
}

const routes = [
  'app/page.tsx',
  'app/services/page.tsx',
  'app/services/wedding-photography/page.tsx',
  'app/services/portrait-photography/page.tsx',
  'app/services/event-photography/page.tsx',
  'app/services/commercial-photography/page.tsx',
  'app/blog/page.tsx',
  'app/book-consultation/page.tsx',
  'app/request-portfolio/page.tsx',
]

let warnings = 0
for (const route of routes) {
  const abs = path.join(process.cwd(), route)
  if (!fs.existsSync(abs)) continue
  const source = fs.readFileSync(abs, 'utf8')
  const imageTags = source.match(/<Image[\s\S]*?>/g) || []
  const priorityImages = imageTags.filter((tag) => /\bpriority\b/.test(tag)).length
  const lazyMountTags = source.match(/<LazyMount\b[\s\S]*?>/g) || []
  const lazyMounts = lazyMountTags.length
  const lazyMountsWithoutReserve = lazyMountTags.filter((tag) => !/\bminHeight=/.test(tag)).length
  const sourceKb = Buffer.byteLength(source, 'utf8') / 1024
  const wideHints = [...source.matchAll(/w_(\d{4,})/g)].map((match) => Number(match[1])).filter((w) => w > budgets.maxHeroImageWidthHint)
  const routeWarnings = []

  if (priorityImages > budgets.maxPriorityImagesPerRoute) routeWarnings.push(`${priorityImages} priority image hints`)
  if (lazyMounts > budgets.maxLazyMountSectionsPerRoute) routeWarnings.push(`${lazyMounts} LazyMount sections`)
  if (lazyMountsWithoutReserve) routeWarnings.push(`${lazyMountsWithoutReserve} LazyMount sections without minHeight`)
  if (sourceKb > budgets.maxRouteSourceKb) routeWarnings.push(`${sourceKb.toFixed(0)}kb route source`)
  if (wideHints.length) routeWarnings.push(`Cloudinary width hints over ${budgets.maxHeroImageWidthHint}px: ${wideHints.join(', ')}`)

  if (routeWarnings.length) {
    warnings += 1
    console.log(`WARN ${route}: ${routeWarnings.join('; ')}`)
  } else {
    console.log(`OK   ${route}`)
  }
}

if (warnings) {
  console.log(`\nPerformance budget audit completed with ${warnings} warnings.`)
} else {
  console.log('\nPerformance budget audit passed.')
}
