import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const checks = [
  {
    file: 'middleware.ts',
    patterns: ['x-studio37-pathname', 'x-studio37-search', 'NextResponse.next({'],
  },
  {
    file: 'app/layout.tsx',
    patterns: ['CmsRouteComposer', 'x-studio37-pathname', 'x-studio37-search'],
  },
  {
    file: 'components/CmsRouteComposer.tsx',
    patterns: ['getRenderablePageLayout', 'layout.mode ===', 'prepend', 'append', 'MDXBuilderComponents'],
  },
  {
    file: 'app/admin/page-builder/page.tsx',
    patterns: ['Existing public page', 'routeOptions', '/api/admin/public-routes', 'visualComponentsToRouteBlocks', '/api/editor/draft', '/api/editor/save', 'renderMode'],
  },
  {
    file: 'lib/pageConfigs.ts',
    patterns: ['getRenderablePageLayout', 'is_published', "mode?: 'replace' | 'prepend' | 'append'"],
  },
  {
    file: 'components/editor/BlockLayoutClient.tsx',
    patterns: ['Visual CMS Editor', 'Quick starters', 'Draft preview', 'is_published: !draftOnly'],
  },
  {
    file: 'app/admin/editor/layout/page.tsx',
    patterns: ['CMS Page Editor', 'collectPublicPageRoutes', 'availablePaths'],
  },
  {
    file: 'app/api/admin/public-routes/route.ts',
    patterns: ['collectPublicPageRoutes', 'isAuthenticated', 'routes'],
  },
  {
    file: 'lib/admin-public-routes.ts',
    patterns: ['collectPublicPageRoutes', "entry.name === 'page.tsx'", "entry.name === 'admin'"],
  },
  {
    file: 'lib/admin-tools.ts',
    patterns: ['Visual Page Builder', 'Content Editor', 'Primary WYSIWYG builder'],
  },
  {
    file: 'lib/admin-route-ownership.ts',
    patterns: ['Canonical WYSIWYG builder', 'Canonical content-only editor', 'replace/prepend/append'],
  },
  {
    file: 'supabase/migrations/20260830_page_configs_route_bridge.sql',
    patterns: ['idx_page_configs_path_block_unique', 'draft_props', 'is_published'],
  },
  {
    file: 'lib/supabase.ts',
    patterns: ['persistSession: false', 'autoRefreshToken: false'],
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
  console.error('CMS route bridge audit failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('CMS route bridge audit passed.')
