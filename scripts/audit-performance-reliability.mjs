#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const checks = [
  {
    label: 'Production smoke includes critical public conversion routes',
    file: 'scripts/verify-production-smoke.mjs',
    needles: [
      '/services',
      '/book-a-session',
      '/book-consultation',
      '/request-portfolio',
      '/tools/pricing',
      '/tools/package-recommender',
      '/sitemap.xml',
      '/sitemap_index.xml',
    ],
  },
  {
    label: 'Playwright smoke covers booking, portfolio, CRM, chatbot, and sitemap/admin surfaces',
    file: 'tests/smoke/public-and-admin.spec.ts',
    needles: [
      'booking and contact conversion paths stay clear',
      'portfolio request form keeps private-gallery lead path clear',
      'crm bulk workspace exposes saved views and safety controls',
      'Wedding packages start at \\$1,200',
      'admin-seo',
      'book-consultation',
    ],
  },
  {
    label: 'LazyMount layout-shift budget is guarded',
    file: 'scripts/audit-public-performance-budget.mjs',
    needles: ['maxLazyMountSectionsPerRoute', 'LazyMount sections', 'LazyMount sections without minHeight'],
  },
  {
    label: 'Homepage LazyMount sections reserve explicit heights',
    file: 'app/page.tsx',
    needles: ['<LazyMount minHeight={560}>', '<LazyMount minHeight={720}>', '<LazyMount minHeight={520}>', '<LazyMount minHeight={400}>'],
  },
  {
    label: 'AI generation has timeout, retry, fallback model, and fallback draft handling',
    file: 'lib/ai-client.ts',
    needles: ['getRequestTimeoutMs', 'MODEL_FALLBACKS', 'BLOG_MODEL_FALLBACKS', 'fallbackModels', 'timed out after', 'buildFallbackBlogPost'],
  },
  {
    label: 'Admin analytics exposes chatbot/lead conversion source review',
    file: 'app/admin/analytics/page.tsx',
    needles: ['Chatbot leads', 'detected intent', 'conversion sources'],
  },
  {
    label: 'Admin SEO page exposes sitemap health handoff',
    file: 'app/admin/seo/page.tsx',
    needles: ['sitemap.xml', 'sitemap_index.xml', 'Search Console', 'content-type'],
  },
  {
    label: 'Technical audit suite includes performance and reliability guardrails',
    file: 'package.json',
    needles: ['audit:performance-budget', 'audit:performance-reliability', 'verify:production-smoke'],
  },
]

const issues = []

for (const check of checks) {
  const source = read(check.file)
  const missing = check.needles.filter((needle) => !source.includes(needle))
  if (missing.length) {
    issues.push(`${check.label} (${check.file}) missing: ${missing.join(', ')}`)
  }
}

if (issues.length) {
  console.error('Performance/reliability audit failed:')
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Performance/reliability audit passed across ${checks.length} guardrail groups.`)
