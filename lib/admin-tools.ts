import {
  BarChart3,
  Bell,
  Briefcase,
  Calendar,
  FileText,
  FolderKanban,
  Globe,
  Home,
  Image,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Mail,
  MessageSquare,
  Palette,
  Search,
  Settings,
  Sparkles,
  Target,
  Wand2,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export type AdminToolGroupId =
  | 'overview'
  | 'crm'
  | 'content'
  | 'marketing'
  | 'site'
  | 'system'

export interface AdminTool {
  id: string
  label: string
  description: string
  href: string
  icon: LucideIcon
  group: AdminToolGroupId
  keywords?: string[]
  badge?: string
  featured?: boolean
  exact?: boolean
  preferred?: boolean
  showInSidebar?: boolean
  showOnDashboard?: boolean
}

export const ADMIN_TOOL_GROUP_META: Record<
  AdminToolGroupId,
  { label: string; description: string }
> = {
  overview: {
    label: 'Overview',
    description: 'Dashboard and operational summary tools.',
  },
  crm: {
    label: 'CRM & Operations',
    description: 'Leads, bookings, reminders, and client delivery workflows.',
  },
  content: {
    label: 'Content & Publishing',
    description: 'Pages, blog, gallery, editing, and visual publishing tools.',
  },
  marketing: {
    label: 'Marketing & Automation',
    description: 'Campaigns, inboxes, templates, AI, and training tools.',
  },
  site: {
    label: 'Site Experience',
    description: 'Navigation, SEO, analytics, theming, and performance tools.',
  },
  system: {
    label: 'System & Settings',
    description: 'Core configuration and schema-level admin utilities.',
  },
}

export const ADMIN_TOOLS: AdminTool[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Main admin overview and quick access.',
    href: '/admin',
    icon: LayoutDashboard,
    group: 'overview',
    exact: true,
    featured: true,
    showInSidebar: true,
    showOnDashboard: false,
  },
  {
    id: 'leads',
    label: 'Leads & Messages',
    description: 'Manage incoming leads, notes, reminders, and outreach.',
    href: '/admin/leads',
    icon: MessageSquare,
    group: 'crm',
    featured: true,
    preferred: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'lead-scoring',
    label: 'Lead Scoring',
    description: 'AI-assisted lead prioritization and quality scoring.',
    href: '/admin/lead-scoring',
    icon: Target,
    group: 'crm',
    keywords: ['ai', 'score', 'qualification', 'priority', 'ranking'],
    badge: 'AI',
    featured: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'lead-cost-analytics',
    label: 'Cost & Revenue',
    description: 'Track lead acquisition cost and revenue performance.',
    href: '/admin/lead-cost-analytics',
    icon: BarChart3,
    group: 'crm',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'bookings',
    label: 'Bookings',
    description: 'Manage session bookings and appointment records.',
    href: '/admin/bookings',
    icon: Calendar,
    group: 'crm',
    preferred: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'calendar',
    label: 'Calendar View',
    description: 'Visual calendar for appointments and scheduling.',
    href: '/admin/calendar',
    icon: Calendar,
    group: 'crm',
    badge: 'View',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'appointment-reminders',
    label: 'Appointment Reminders',
    description: 'Configure automated reminder workflows.',
    href: '/admin/appointment-reminders',
    icon: Bell,
    group: 'crm',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    description: 'Track work from booking through delivery.',
    href: '/admin/projects',
    icon: FolderKanban,
    group: 'crm',
    featured: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'client-portals',
    label: 'Client Portals',
    description: 'Manage secure client access and portal content.',
    href: '/admin/client-portals',
    icon: Briefcase,
    group: 'crm',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'content-enhanced',
    label: 'Enhanced Content CMS',
    description: 'Recommended content editor with SEO, scheduling, revisions, and templates.',
    href: '/admin/content-enhanced',
    icon: Sparkles,
    group: 'content',
    badge: 'Recommended',
    featured: true,
    preferred: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'content',
    label: 'Content',
    description: 'Standard page content management.',
    href: '/admin/content',
    icon: FileText,
    group: 'content',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'blog',
    label: 'Blog Posts',
    description: 'Write, publish, and manage blog content.',
    href: '/admin/blog',
    icon: FileText,
    group: 'content',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'lesson-summary-builder',
    label: 'Lesson Summary Builder',
    description: 'Paste lesson notes and generate branded summaries, homework, and quiz/test exports.',
    href: '/admin/lesson-summary',
    icon: GraduationCap,
    group: 'content',
    badge: 'AI',
    keywords: ['lesson', 'summary', 'homework', 'quiz', 'test', 'pdf', 'education'],
    preferred: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'gallery',
    label: 'Gallery',
    description: 'Manage image content and gallery organization.',
    href: '/admin/gallery',
    icon: Image,
    group: 'content',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'page-builder',
    label: 'Page Builder',
    description: 'Build new custom pages using builder workflows.',
    href: '/admin/page-builder',
    icon: Workflow,
    group: 'content',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'live-editor',
    label: 'Live Page Editor',
    description: 'Edit published pages directly.',
    href: '/admin/live-editor',
    icon: Globe,
    group: 'content',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'visual-editor',
    label: 'Visual Editor',
    description: 'Open the visual editor workspace for page layouts and content.',
    href: '/admin/visual-editor',
    icon: Workflow,
    group: 'content',
    badge: 'Builder',
    showInSidebar: true,
    showOnDashboard: false,
  },
  {
    id: 'marketing',
    label: 'Marketing Campaigns',
    description: 'Create and send email and SMS campaigns.',
    href: '/admin/marketing',
    icon: Mail,
    group: 'marketing',
    featured: true,
    preferred: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'email-templates',
    label: 'Email Templates',
    description: 'Manage reusable templates and autoresponders.',
    href: '/admin/email-templates',
    icon: Mail,
    group: 'marketing',
    keywords: ['email', 'template', 'autoresponder', 'follow-up', 'confirmation'],
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'email-sender',
    label: 'Email Sender',
    description: 'Send one-off test, marketing, or transactional emails.',
    href: '/admin/email-sender',
    icon: Mail,
    group: 'marketing',
    keywords: ['email', 'send', 'resend', 'test', 'campaign'],
    badge: 'Utility',
    showInSidebar: true,
    showOnDashboard: false,
  },
  {
    id: 'inbox',
    label: 'SMS Inbox',
    description: 'Reply to messages and manage active conversations.',
    href: '/admin/inbox',
    icon: MessageSquare,
    group: 'marketing',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'chatbot-training',
    label: 'AI Training',
    description: 'Train chatbot answers from website and custom data.',
    href: '/admin/chatbot-training',
    icon: Sparkles,
    group: 'marketing',
    keywords: ['ai', 'chatbot', 'training', 'knowledge', 'assistant'],
    badge: 'AI',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'ai-site-builder',
    label: 'AI Site Builder',
    description: 'Generate site structure and content with AI assistance.',
    href: '/admin/ai-site-builder',
    icon: Wand2,
    group: 'marketing',
    keywords: ['ai', 'builder', 'generate', 'layout', 'content'],
    badge: 'AI',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'content-studio',
    label: 'Content Studio',
    description: 'Design stylized PDF guides and visual marketing posts with AI. Send to leads or export for social.',
    href: '/admin/content-studio',
    icon: Layers,
    group: 'marketing',
    keywords: ['pdf', 'guide', 'social', 'instagram', 'post', 'marketing', 'design', 'export', 'ai'],
    badge: 'New',
    featured: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'ai-admin-assistant',
    label: 'AI Admin Assistant',
    description: 'Copilot for admin workflows: blog drafts, outreach, and page blueprints.',
    href: '/admin/ai-assistant',
    icon: Sparkles,
    group: 'marketing',
    keywords: ['ai', 'assistant', 'admin', 'blog', 'outreach', 'page'],
    badge: 'AI',
    featured: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'navigation',
    label: 'Navigation',
    description: 'Edit menus and dropdown structure.',
    href: '/admin/navigation',
    icon: Workflow,
    group: 'site',
    preferred: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'seo',
    label: 'SEO Analyzer',
    description: 'Audit metadata, robots, sitemap, and search readiness.',
    href: '/admin/seo',
    icon: Search,
    group: 'site',
    keywords: ['seo', 'metadata', 'sitemap', 'robots', 'search'],
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'View charts, trends, and site performance data.',
    href: '/admin/analytics',
    icon: BarChart3,
    group: 'site',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'performance',
    label: 'Performance',
    description: 'Review web vitals and runtime performance metrics.',
    href: '/admin/performance',
    icon: BarChart3,
    group: 'site',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'theme-customizer',
    label: 'Theme Customizer',
    description: 'Adjust colors, styling, and brand presentation.',
    href: '/admin/theme-customizer',
    icon: Palette,
    group: 'site',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'audit',
    label: 'Site Audit',
    description: 'Review content, performance, and UX issues.',
    href: '/admin/audit',
    icon: Search,
    group: 'site',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Manage business, SEO, AI, and site settings.',
    href: '/admin/settings',
    icon: Settings,
    group: 'system',
    featured: true,
    preferred: true,
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'site-editor',
    label: 'Site Editor',
    description: 'Global site-level editor for shared configuration.',
    href: '/admin/site-editor',
    icon: Home,
    group: 'system',
    showInSidebar: true,
    showOnDashboard: true,
  },
  {
    id: 'database-migrations',
    label: 'Database Migrations',
    description: 'Run schema updates and admin-managed migrations.',
    href: '/admin/database-migrations',
    icon: Settings,
    group: 'system',
    showInSidebar: true,
    showOnDashboard: true,
  },
]

export const ADMIN_SIDEBAR_GROUP_ORDER: AdminToolGroupId[] = [
  'overview',
  'crm',
  'content',
  'marketing',
  'site',
  'system',
]

export const ADMIN_DASHBOARD_GROUP_ORDER: AdminToolGroupId[] = [
  'crm',
  'content',
  'marketing',
  'site',
  'system',
]

export function getAdminToolsForGroup(group: AdminToolGroupId) {
  return ADMIN_TOOLS.filter((tool) => tool.group === group)
}

export function getSidebarTools() {
  return ADMIN_TOOLS.filter((tool) => tool.showInSidebar)
}

export function getDashboardTools() {
  return ADMIN_TOOLS.filter((tool) => tool.showOnDashboard)
}

export function getSidebarToolsByGroup(tools: AdminTool[] = getSidebarTools()) {
  return ADMIN_SIDEBAR_GROUP_ORDER.reduce<Record<AdminToolGroupId, AdminTool[]>>(
    (acc, groupId) => {
      acc[groupId] = tools.filter((tool) => tool.group === groupId)
      return acc
    },
    {
      overview: [],
      crm: [],
      content: [],
      marketing: [],
      site: [],
      system: [],
    }
  )
}
