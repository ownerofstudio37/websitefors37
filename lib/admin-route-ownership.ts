export type AdminRouteStatus =
  | 'primary'
  | 'active'
  | 'strategic'
  | 'utility'
  | 'legacy'
  | 'experimental'
  | 'backup'
  | 'internal'

export interface AdminRouteOwnership {
  route: string
  file: string
  status: AdminRouteStatus
  owner: 'overview' | 'crm' | 'content' | 'marketing' | 'site' | 'system'
  note: string
}

export const adminRouteOwnership: AdminRouteOwnership[] = [
  { route: '/admin', file: 'app/admin/page.tsx', status: 'primary', owner: 'overview', note: 'Single trusted admin control center.' },
  { route: '/admin/dashboard', file: 'app/admin/dashboard/page.tsx', status: 'legacy', owner: 'overview', note: 'Redirect to /admin; keep URL compatibility only.' },
  { route: '/admin/dashboard-enhanced', file: 'app/admin/dashboard-enhanced.tsx', status: 'legacy', owner: 'overview', note: 'Old dashboard component, not primary.' },
  { route: '/admin/redirect-page', file: 'app/admin/redirect-page.tsx', status: 'legacy', owner: 'overview', note: 'Redirect helper only.' },
  { route: '/admin/page.new', file: 'app/admin/page.new.tsx', status: 'backup', owner: 'overview', note: 'Archived alternate dashboard implementation.' },
  { route: '/admin/operations', file: 'app/admin/operations/page.tsx', status: 'active', owner: 'system', note: 'Route ownership, launch QA, and ops review surface.' },
  { route: '/admin/leads', file: 'app/admin/leads/page.tsx', status: 'primary', owner: 'crm', note: 'Lead CRM and follow-up hub.' },
  { route: '/admin/leads/[id]', file: 'app/admin/leads/[id]/page.tsx', status: 'primary', owner: 'crm', note: 'Direct lead link redirect into the lead workspace.' },
  { route: '/admin/bookings', file: 'app/admin/bookings/page.tsx', status: 'primary', owner: 'crm', note: 'Booking records and schedule management.' },
  { route: '/admin/calendar', file: 'app/admin/calendar/page.tsx', status: 'active', owner: 'crm', note: 'Visual scheduling companion to bookings.' },
  { route: '/admin/appointment-reminders', file: 'app/admin/appointment-reminders/page.tsx', status: 'active', owner: 'crm', note: 'Automated reminder workflow control.' },
  { route: '/admin/projects', file: 'app/admin/projects/page.tsx', status: 'active', owner: 'crm', note: 'Client project pipeline.' },
  { route: '/admin/projects/new', file: 'app/admin/projects/new/page.tsx', status: 'active', owner: 'crm', note: 'Project creation workflow.' },
  { route: '/admin/projects/[id]', file: 'app/admin/projects/[id]/page.tsx', status: 'active', owner: 'crm', note: 'Project detail workflow.' },
  { route: '/admin/client-portals', file: 'app/admin/client-portals/page.tsx', status: 'active', owner: 'crm', note: 'Client portal access management.' },
  { route: '/admin/client-portals/[id]', file: 'app/admin/client-portals/[id]/page.tsx', status: 'active', owner: 'crm', note: 'Client portal detail view.' },
  { route: '/admin/client-portals/[id]/projects', file: 'app/admin/client-portals/[id]/projects/page.tsx', status: 'active', owner: 'crm', note: 'Client portal project list.' },
  { route: '/admin/content-enhanced', file: 'app/admin/content-enhanced/page.tsx', status: 'primary', owner: 'content', note: 'Preferred content editing hub.' },
  { route: '/admin/blog', file: 'app/admin/blog/page.tsx', status: 'primary', owner: 'content', note: 'Blog creation and publishing.' },
  { route: '/admin/galleries', file: 'app/admin/galleries/page.tsx', status: 'primary', owner: 'content', note: 'Client delivery galleries for gallery.studio37.cc.' },
  { route: '/admin/galleries/[id]', file: 'app/admin/galleries/[id]/page.tsx', status: 'primary', owner: 'content', note: 'Client gallery image delivery manager.' },
  { route: '/admin/ai-site-builder', file: 'app/admin/ai-site-builder/page.tsx', status: 'strategic', owner: 'content', note: 'Keep and improve as the premium AI Page Builder.' },
  { route: '/admin/page-builder', file: 'app/admin/page-builder/page.tsx', status: 'strategic', owner: 'content', note: 'Visual builder component engine for AI-generated page quality.' },
  { route: '/admin/live-editor', file: 'app/admin/live-editor/page.tsx', status: 'legacy', owner: 'content', note: 'Historical page edits only; avoid as primary builder.' },
  { route: '/admin/content', file: 'app/admin/content/page.tsx', status: 'legacy', owner: 'content', note: 'Older content manager kept for compatibility.' },
  { route: '/admin/gallery', file: 'app/admin/gallery/page.tsx', status: 'legacy', owner: 'content', note: 'Old public image manager; client galleries are primary.' },
  { route: '/admin/gallery-clean', file: 'app/admin/gallery/page-clean.tsx', status: 'backup', owner: 'content', note: 'Alternate gallery implementation.' },
  { route: '/admin/page-builder-v2', file: 'app/admin/page-builder-v2/page.tsx', status: 'experimental', owner: 'content', note: 'Do not promote until it surpasses primary builder.' },
  { route: '/admin/block-editor', file: 'app/admin/block-editor/page.tsx', status: 'experimental', owner: 'content', note: 'Block editor test surface.' },
  { route: '/admin/editor-test', file: 'app/admin/editor-test/page.tsx', status: 'internal', owner: 'content', note: 'Editor verification page only.' },
  { route: '/admin/editor', file: 'app/admin/editor/page.tsx', status: 'utility', owner: 'content', note: 'Deep-link editor form shell.' },
  { route: '/admin/editor/form-client', file: 'app/admin/editor/EditorFormClient.tsx', status: 'utility', owner: 'content', note: 'Shared editor form client.' },
  { route: '/admin/editor/layout', file: 'app/admin/editor/layout/page.tsx', status: 'utility', owner: 'content', note: 'Layout editor utility.' },
  { route: '/admin/visual-editor/[slug]', file: 'app/admin/visual-editor/[slug]/page.tsx', status: 'utility', owner: 'content', note: 'Direct visual editor for a known slug.' },
  { route: '/admin/visual-editor/[slug]/client', file: 'app/admin/visual-editor/[slug]/VisualEditorClient.tsx', status: 'utility', owner: 'content', note: 'Shared visual editor client.' },
  { route: '/admin/content-studio', file: 'app/admin/content-studio/page.tsx', status: 'active', owner: 'marketing', note: 'PDF/social guide and visual content studio.' },
  { route: '/admin/lesson-summary', file: 'app/admin/lesson-summary/page.tsx', status: 'active', owner: 'content', note: 'Lesson summary builder.' },
  { route: '/admin/marketing', file: 'app/admin/marketing/page.tsx', status: 'primary', owner: 'marketing', note: 'Campaign and CRM automation.' },
  { route: '/admin/marketing/templates', file: 'app/admin/marketing/templates/page.tsx', status: 'primary', owner: 'marketing', note: 'Reusable campaign templates.' },
  { route: '/admin/marketing/preview', file: 'app/admin/marketing/preview/page.tsx', status: 'utility', owner: 'marketing', note: 'Template preview utility.' },
  { route: '/admin/email-templates', file: 'app/admin/email-templates/page.tsx', status: 'active', owner: 'marketing', note: 'Transactional/autoresponder templates.' },
  { route: '/admin/email-templates/editor/[id]', file: 'app/admin/email-templates/editor/[id]/page.tsx', status: 'active', owner: 'marketing', note: 'Email template editor.' },
  { route: '/admin/email-templates/editor/new', file: 'app/admin/email-templates/editor/new/page.tsx', status: 'active', owner: 'marketing', note: 'New email template editor.' },
  { route: '/admin/email-templates/preview/[id]', file: 'app/admin/email-templates/preview/[id]/page.tsx', status: 'utility', owner: 'marketing', note: 'Email template preview.' },
  { route: '/admin/email-sender', file: 'app/admin/email-sender/page.tsx', status: 'utility', owner: 'marketing', note: 'One-off email send utility.' },
  { route: '/admin/inbox', file: 'app/admin/inbox/page.tsx', status: 'primary', owner: 'marketing', note: 'SMS inbox and active conversations.' },
  { route: '/admin/chatbot-training', file: 'app/admin/chatbot-training/page.tsx', status: 'active', owner: 'marketing', note: 'Chatbot knowledge and website import control.' },
  { route: '/admin/ai-assistant', file: 'app/admin/ai-assistant/page.tsx', status: 'active', owner: 'marketing', note: 'Admin AI assistant for drafts and outreach.' },
  { route: '/admin/analytics', file: 'app/admin/analytics/page.tsx', status: 'active', owner: 'site', note: 'Business analytics dashboard.' },
  { route: '/admin/performance', file: 'app/admin/performance/page.tsx', status: 'active', owner: 'site', note: 'PageSpeed and web vitals checks.' },
  { route: '/admin/seo', file: 'app/admin/seo/page.tsx', status: 'primary', owner: 'site', note: 'SEO, sitemap, and metadata control.' },
  { route: '/admin/audit', file: 'app/admin/audit/page.tsx', status: 'active', owner: 'site', note: 'Content and UX audit surface.' },
  { route: '/admin/navigation', file: 'app/admin/navigation/page.tsx', status: 'primary', owner: 'site', note: 'Public navigation control.' },
  { route: '/admin/theme-customizer', file: 'app/admin/theme-customizer/page.tsx', status: 'active', owner: 'site', note: 'Brand styling controls.' },
  { route: '/admin/settings', file: 'app/admin/settings/page.tsx', status: 'primary', owner: 'system', note: 'Business, SEO, AI, and site settings.' },
  { route: '/admin/site-editor', file: 'app/admin/site-editor/page.tsx', status: 'utility', owner: 'system', note: 'Advanced global config editor.' },
  { route: '/admin/database-migrations', file: 'app/admin/database-migrations/page.tsx', status: 'internal', owner: 'system', note: 'Dangerous schema utility; keep out of primary nav.' },
  { route: '/admin/lead-cost-analytics', file: 'app/admin/lead-cost-analytics/page.tsx', status: 'active', owner: 'crm', note: 'Cost and revenue reporting.' },
  { route: '/admin/lead-scoring', file: 'app/admin/lead-scoring/page.tsx', status: 'active', owner: 'crm', note: 'Lead score recalculation and review.' },
  { route: '/admin/proof-library', file: 'app/admin/proof-library/page.tsx', status: 'active', owner: 'crm', note: 'Private proof-set matching workspace for portfolio requests.' },
  { route: '/admin/page-backup', file: 'app/admin/page-backup.tsx', status: 'backup', owner: 'system', note: 'Archived admin implementation; not primary.' },
  { route: '/admin/edit-homepage', file: 'app/admin/edit-homepage/page.tsx', status: 'legacy', owner: 'content', note: 'Redirects to older live editor.' },
]

export const adminRouteOwnershipByFile = new Map(
  adminRouteOwnership.map((item) => [item.file, item])
)

export function getAdminRoutesByStatus(status: AdminRouteStatus) {
  return adminRouteOwnership.filter((item) => item.status === status)
}
