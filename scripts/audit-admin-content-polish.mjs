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
    file: 'app/admin/seo/page.tsx',
    patterns: [
      'sitemap.xml',
      'sitemap_index.xml',
      'content-type',
      'Search Console',
      'metadata',
      'schema',
      'noindex',
    ],
  },
  {
    file: 'app/admin/blog/page.tsx',
    patterns: [
      'featured_image',
      'featured_image_position',
      'scheduled_at',
      'published_at',
      'SEO description',
      'AI Blog Writer',
      'Short and Medium are safest',
    ],
  },
  {
    file: 'tests/smoke/public-and-admin.spec.ts',
    patterns: [
      'page.screenshot',
      "{ name: 'services', path: '/services' }",
      "{ name: 'blog', path: '/blog' }",
      "{ name: 'booking', path: '/book-a-session' }",
      "{ name: 'book-consultation', path: '/book-consultation' }",
      "{ name: 'request-portfolio', path: '/request-portfolio' }",
      "{ name: 'service-area-pinehurst', path: '/local-photographer-pinehurst-tx' }",
      'mobile conversion path remains visible across public pages',
    ],
  },
  {
    file: 'scripts/audit-seo-content-coverage.mjs',
    patterns: [
      'high-value pages',
      'pricing',
      'package',
      'schema',
      'internal',
    ],
  },
  {
    file: 'scripts/audit-service-page-qa.mjs',
    patterns: [
      'hero',
      'proof',
      'pricing',
      'CTA',
      'service and sub-service pages',
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
