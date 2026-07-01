import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const issues = []

const noBrowserDialogs = [
  'app/admin/calendar/page.tsx',
  'app/admin/inbox/page.tsx',
  'app/admin/theme-customizer/page.tsx',
  'app/admin/editor/EditorFormClient.tsx',
  'app/admin/blog/page.tsx',
  'components/admin/ClientProjectsList.tsx',
  'app/admin/appointment-reminders/page.tsx',
]

for (const file of noBrowserDialogs) {
  const source = fs.readFileSync(path.join(root, file), 'utf8')
  if (/\b(alert|confirm|prompt)\s*\(/.test(source)) {
    issues.push(`${file} still uses a browser dialog`)
  }
}

const markerChecks = [
  { file: 'app/admin/editor/EditorFormClient.tsx', markers: ['StructuredListEditor', 'FAQ Items', 'Pricing Plans'] },
  { file: 'app/admin/site-editor/page.tsx', markers: ['Intro title preview', 'Intro text preview'] },
  { file: 'app/admin/blog/page.tsx', markers: ['AdminConfirmDialog', 'rawPreview', 'AdminToast'] },
  { file: 'app/admin/operations/page.tsx', markers: ['Recent Work Manager', 'Lead Magnet Report', 'Admin Route Inventory'] },
  { file: 'app/admin/appointment-reminders/page.tsx', markers: ['CRON_SECRET', 'cronSecret'] },
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

console.log(`Admin operations audit passed across ${noBrowserDialogs.length + markerChecks.length} checks.`)
