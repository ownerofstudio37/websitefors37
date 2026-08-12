#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const checks = [
  {
    label: 'CRM defaults hide archived leads and expose Lost / Archived view',
    file: 'app/admin/leads/page.tsx',
    needles: [
      "ARCHIVED_LEAD_STATUS = 'closed-lost'",
      "query.neq('status', ARCHIVED_LEAD_STATUS).neq('status', 'lost')",
      '<option value="closed-lost">Lost / Archived</option>',
      "isArchivedLeadStatus",
    ],
  },
  {
    label: 'CRM cleanup tools support test presets, duplicate review, safe delete, archive, export, and ownership',
    file: 'app/admin/leads/page.tsx',
    needles: [
      "label: 'Test Leads'",
      "label: 'Likely Duplicates'",
      "isObviousTestLead",
      "Delete stopped: every selected lead must clearly be a test/demo/cleanup record",
      "archiveSelectedLeads",
      "exportToCSV",
      "assignBulkOwner",
      "Select older duplicate records",
    ],
  },
  {
    label: 'Lead bulk actions write audit/timeline entries',
    file: 'app/admin/leads/page.tsx',
    needles: [
      'logBulkAction',
      'bulk_status_update',
      'bulk_tag_add',
      'bulk_owner_assign',
      'bulk_email_draft',
      'bulk_archive',
      'duplicate_review_tag',
      'communication_logs',
    ],
  },
  {
    label: 'Admin cockpit exposes health cards for AI, email, schema, sitemap, and scheduled blog checks',
    file: 'app/admin/page.tsx',
    needles: [
      'System health',
      'AI availability',
      'Email send status',
      'Supabase schema',
      'Sitemap status',
      'Scheduled blog posts',
    ],
  },
  {
    label: 'Admin operations handoff includes workflow QA and schema/migration surfaces',
    file: 'app/admin/operations/page.tsx',
    needles: [
      '/admin/leads',
      '/admin/projects',
      '/admin/galleries',
      '/admin/seo',
      '/admin/blog',
      'migration',
    ],
  },
  {
    label: 'Technical audit suite includes admin CRM operations guardrail',
    file: 'package.json',
    needles: ['audit:admin-crm-operations'],
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
  console.error('Admin/CRM operations audit failed:')
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log(`Admin/CRM operations audit passed across ${checks.length} guardrail groups.`)
