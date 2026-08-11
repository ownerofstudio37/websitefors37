import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const checks = [
  {
    file: 'app/admin/proof-library/page.tsx',
    patterns: [
      'Admin Content Controls',
      'Image Selection Board',
      'Public Proof Cards',
      'Review Rotation',
      'CTA Variant Rules',
      'PublicContentPersistenceEditor',
      'curatedImageSlots',
      'recentWorkItems',
      'testimonialsByService',
      'turnaroundByService',
      'https://gallery.studio37.cc',
      '/request-portfolio',
      '/tools/pricing',
      '/book-consultation',
    ],
  },
  {
    file: 'app/api/admin/public-content/route.ts',
    patterns: ['requireAdminRole', 'public_content_overrides', 'upsert'],
  },
  {
    file: 'components/admin/PublicContentPersistenceEditor.tsx',
    patterns: ['Save overrides', '/api/admin/public-content', 'Published overrides'],
  },
  {
    file: 'supabase/migrations/20260811_public_content_overrides.sql',
    patterns: ['CREATE TABLE IF NOT EXISTS public_content_overrides', 'Public can read published public content overrides'],
  },
  {
    file: 'components/CuratedRecentWork.tsx',
    patterns: ['getPublishedPublicContentOverride', 'recentWorkItems'],
  },
  {
    file: 'lib/public-content.ts',
    patterns: [
      'studio37Reviews',
      'curatedImageSlots',
      'recentWorkItems',
      'testimonialsByService',
      'turnaroundByService',
    ],
  },
  {
    file: 'lib/admin-tools.ts',
    patterns: ['/admin/proof-library', 'Proof Library'],
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
  console.error('Admin content polish audit failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Admin content polish audit passed.')
