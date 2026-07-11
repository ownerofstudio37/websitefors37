import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const issues = []

function walkFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkFiles(filePath, out)
    } else if (/(page|VisualEditorClient|EditorFormClient).*\.tsx$|dashboard-enhanced\.tsx$|page-backup\.tsx$|page\.new\.tsx$/.test(entry.name)) {
      out.push(filePath)
    }
  }
  return out
}

const noBrowserDialogs = [
  'app/admin/calendar/page.tsx',
  'app/admin/inbox/page.tsx',
  'app/admin/theme-customizer/page.tsx',
  'app/admin/editor/EditorFormClient.tsx',
  'app/admin/blog/page.tsx',
  'components/admin/ClientProjectsList.tsx',
  'app/admin/appointment-reminders/page.tsx',
  'app/admin/galleries/page.tsx',
  'app/admin/galleries/[id]/page.tsx',
  'app/admin/marketing/templates/page.tsx',
  'app/admin/chatbot-training/page.tsx',
  'components/admin/AIBlockSuggestions.tsx',
  'components/admin/TemplateSelector.tsx',
  'app/admin/lead-scoring/page.tsx',
]

for (const file of noBrowserDialogs) {
  const source = fs.readFileSync(path.join(root, file), 'utf8')
  if (/\b(alert|confirm|prompt)\s*\(/.test(source)) {
    issues.push(`${file} still uses a browser dialog`)
  }
}

const routeInventorySource = fs.readFileSync(path.join(root, 'lib/admin-route-ownership.ts'), 'utf8')
const adminRouteFiles = walkFiles(path.join(root, 'app/admin')).map((file) => path.relative(root, file))
for (const file of adminRouteFiles) {
  if (!routeInventorySource.includes(`file: '${file}'`)) {
    issues.push(`${file} is missing from admin route ownership inventory`)
  }
}

const noDebugLogs = [
  'app/admin/leads/page.tsx',
  'app/admin/page-builder/page.tsx',
  'app/admin/live-editor/page.tsx',
  'app/admin/gallery/page-clean.tsx',
  'app/admin/page-backup.tsx',
]

for (const file of noDebugLogs) {
  const source = fs.readFileSync(path.join(root, file), 'utf8')
  if (/console\.log\s*\(/.test(source)) {
    issues.push(`${file} still has console.log debug output`)
  }
}

const markerChecks = [
  { file: 'app/admin/editor/EditorFormClient.tsx', markers: ['StructuredListEditor', 'FAQ Items', 'Pricing Plans'] },
  { file: 'app/admin/site-editor/page.tsx', markers: ['Intro title preview', 'Intro text preview'] },
  { file: 'app/admin/blog/page.tsx', markers: ['AdminConfirmDialog', 'rawPreview', 'AdminToast'] },
  { file: 'app/admin/operations/page.tsx', markers: ['Recent Work Manager', 'Lead Magnet Report', 'Admin Route Inventory', 'Sitemap Alerting', 'Public Launch Checklist', 'Saved Quote Template', 'Lead Timeline Events'] },
  { file: 'lib/admin-route-ownership.ts', markers: ['premium AI Page Builder', 'Visual builder component engine', 'Single trusted admin control center'] },
  { file: 'lib/admin-tools.ts', markers: ['AI Page Builder', 'Strategic visual component engine', 'Gallery Delivery', 'Legacy Image Manager'] },
  { file: 'app/admin/dashboard/page.tsx', markers: ["redirect('/admin')"] },
  { file: 'app/admin/redirect-page.tsx', markers: ["redirect('/admin')"] },
  { file: 'app/api/leads/route.ts', markers: ['saved-quote-follow-up', 'source_metadata'] },
  { file: 'components/QuoteAbandonmentCapture.tsx', markers: ['quote_capture_submitted', 'booking_package_abandoned'] },
  { file: 'components/PackageRecommender.tsx', markers: ['recordLeadTimelineEvent("package_recommender_selection"'] },
  { file: 'components/PrepGuideLeadMagnet.tsx', markers: ["recordLeadTimelineEvent('prep_guide_requested'"] },
  { file: 'app/admin/appointment-reminders/page.tsx', markers: ['CRON_SECRET', 'cronSecret'] },
  { file: 'app/admin/galleries/page.tsx', markers: ['AdminToast', 'AdminConfirmDialog', 'https://gallery.studio37.cc'] },
  { file: 'app/admin/galleries/[id]/page.tsx', markers: ['AdminToast', 'AdminConfirmDialog', 'gallery.studio37.cc'] },
  { file: 'app/admin/marketing/templates/page.tsx', markers: ['AdminToast', 'AdminConfirmDialog', 'Make sure no active workflow still depends on it'] },
  { file: 'app/admin/chatbot-training/page.tsx', markers: ['AdminConfirmDialog', 'Custom Q&A entries remain separate'] },
  { file: 'app/admin/database-migrations/page.tsx', markers: ['Run migration', 'backup'] },
  { file: 'app/admin/page-builder/page.tsx', markers: ['Loading visual editor', 'Cache cleared'] },
  { file: 'app/admin/live-editor/page.tsx', markers: ['replace your current unsaved changes', 'Import'] },
  { file: 'app/admin/client-portals/page.tsx', markers: ['Client Portal', 'portal'] },
  { file: 'app/admin/lead-scoring/page.tsx', markers: ['Lead Scoring', 'recalculate'] },
  { file: 'app/admin/operations/page.tsx', markers: ['routeCounts', 'adminRouteOwnership'] },
  { file: 'components/ChatBotMount.tsx', markers: ['EnhancedChatBot'] },
  { file: 'app/api/chat/respond/route.ts', markers: ['view featured work', 'request complete galleries', 'imageAnalysisContext', 'fallback', 'getPackageFactsPrompt'] },
  { file: 'lib/studio37-package-facts.ts', markers: ['$350', '$1,200', 'Micro / Elopement'] },
  { file: 'components/EnhancedChatBot.tsx', markers: ['uploadError', 'quoteFormError', 'Call Studio37', 'https://gallery.studio37.cc'] },
  { file: 'lib/ai-page-builder-quality.ts', markers: ['AI_PAGE_TEMPLATES', 'STUDIO37_IMAGE_POOL', 'applyAIPageQuality', 'Request Complete Galleries'] },
  { file: 'app/api/site/generate/route.ts', markers: ['getTemplateGuidance', 'applyAIPageQuality', 'HOMEPAGE-QUALITY DESIGN RULES'] },
  { file: 'app/admin/ai-site-builder/page.tsx', markers: ['AI_PAGE_TEMPLATES', 'Page Type', 'Quality guardrails'] },
  { file: 'lib/ai-page-builder-quality.ts', markers: ['evaluateAIPageQuality', 'AIPageQualityCheck', 'Mobile Flow'] },
  { file: 'app/admin/ai-site-builder/page.tsx', markers: ['Publish Readiness', 'qualityStyles', 'hasFailingQualityChecks'] },
  { file: 'app/admin/page.tsx', markers: ['Command center', 'Action alerts', 'Booking pipeline', 'Mobile quick actions', 'Portfolio drafts', 'Gallery delivery'] },
  { file: 'components/AdminCommandPalette.tsx', markers: ['badgeTone', 'Strategic', 'Legacy'] },
  { file: 'app/admin/galleries/page.tsx', markers: ['Delivery checklist', 'Delivery readiness', 'Email ready'] },
  { file: 'app/admin/leads/page.tsx', markers: ['getLeadPriorityCues', 'getPackageFit', 'getSuggestedNextAction', 'Complete gallery request', 'Send Galleries', 'Create Project', 'showPortfolioModal', 'saveFollowUpDate', 'overdueFollowUps'] },
  { file: 'app/admin/projects/new/page.tsx', markers: ['useSearchParams', 'normalizeProjectType', 'Lead message:', 'submitError'] },
  { file: 'app/admin/leads/[id]/page.tsx', markers: ['redirect(`/admin/leads?lead='] },
  { file: 'app/admin/projects/[id]/page.tsx', markers: ['ShootProof delivery handoff', 'Open ShootProof Studio', 'galleryHref'] },
  { file: 'app/api/projects/[id]/route.ts', markers: ['baseProject', 'richProject', 'falling back to base project'] },
  { file: 'app/api/projects/route.ts', markers: ['fallbackQuery', 'falling back to base project list'] },
  { file: 'app/api/admin/galleries/[id]/route.ts', markers: ['client_galleries'] },
  { file: 'app/api/admin/galleries/[id]/images/route.ts', markers: ['client_galleries'] },
  { file: 'app/api/admin/galleries/[id]/images/remote/route.ts', markers: ['client_galleries'] },
  { file: 'app/admin/galleries/page.tsx', markers: ['Project → ShootProof delivery workflow', 'Open ShootProof Studio', 'Track ShootProof Delivery', 'searchParams.get'] },
  { file: 'hooks/useDashboardData.ts', markers: ['portfolioDrafts', 'quotesStarted', 'leadProjects', 'galleryDeliveryTasks'] },
]

for (const check of markerChecks) {
  const source = fs.readFileSync(path.join(root, check.file), 'utf8')
  for (const marker of check.markers) {
    if (!source.includes(marker)) issues.push(`${check.file} missing ${marker}`)
  }
}

if (issues.length) {
  console.error(`Admin operations audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Admin operations audit passed across ${noBrowserDialogs.length + noDebugLogs.length + markerChecks.length + adminRouteFiles.length} checks.`)
