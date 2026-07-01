import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const checks = [
  {
    file: 'app/admin/analytics/page.tsx',
    markers: ['Top Lead Sources', 'data.leads.bySource'],
  },
  {
    file: 'components/PricingCalculator.tsx',
    markers: ['recordLeadTimelineEvent', 'pricing_calculator_update', 'studio37_pricing_context'],
  },
  {
    file: 'components/PackageRecommender.tsx',
    markers: ['recordLeadTimelineEvent', 'package_recommender_selection', 'conversionCopy.packageRecommenderIntro'],
  },
  {
    file: 'components/QuoteAbandonmentCapture.tsx',
    markers: ['booking_package_abandoned', 'quote_capture_submitted', 'conversionCopy.quoteCaptureHeadline'],
  },
  {
    file: 'components/PrepGuideDownloadForm.tsx',
    markers: ['leadMagnetSegments', 'prep_guide_requested', 'follow_up_template'],
  },
  {
    file: 'scripts/audit-seasonal-conversion.mjs',
    markers: ['/mini-sessions', '/brand-refresh-sessions', '/senior-portraits', '/holiday-party', '/graduation'],
  },
]

const issues = []

for (const check of checks) {
  const source = fs.readFileSync(path.join(root, check.file), 'utf8')
  for (const marker of check.markers) {
    if (!source.includes(marker)) issues.push(`${check.file} missing ${marker}`)
  }
}

if (issues.length) {
  console.error(`Conversion lead-capture audit failed with ${issues.length} issue(s):`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Conversion lead-capture audit passed across ${checks.length} surfaces.`)
