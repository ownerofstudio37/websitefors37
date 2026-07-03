'use client'

import React from 'react'
import Link from 'next/link'
import {
  AlarmClock,
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  SearchCheck,
  TrendingUp,
  Users,
  Image,
  FileText,
  Bell,
  FolderKanban,
} from 'lucide-react'
import { useDashboardData } from '@/hooks/useDashboardData'
import PageList from '@/components/admin/PageList'
import {
  ADMIN_DASHBOARD_GROUP_ORDER,
  ADMIN_TOOL_GROUP_META,
  getDashboardTools,
} from '@/lib/admin-tools'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

const statCards = [
  {
    key: 'totalLeads',
    label: 'Total Leads',
    icon: Users,
    accent: 'bg-amber-100 text-amber-700',
    href: '/admin/leads',
    hint: 'View all leads →',
  },
  {
    key: 'totalRevenue',
    label: 'Tracked Revenue',
    icon: TrendingUp,
    accent: 'bg-green-100 text-green-700',
    href: '/admin/lead-cost-analytics',
    hint: 'Revenue analytics →',
  },
  {
    key: 'totalBookings',
    label: 'Total Bookings',
    icon: CalendarDays,
    accent: 'bg-purple-100 text-purple-700',
    href: '/admin/bookings',
    hint: 'View bookings →',
  },
] as const

const operationCards = [
  {
    key: 'newLeadsToday',
    label: 'New leads today',
    href: '/admin/leads',
    icon: Users,
    tone: 'bg-blue-50 text-blue-700 border-blue-100',
    action: 'Review leads',
  },
  {
    key: 'staleLeads',
    label: 'Stale follow-ups',
    href: '/admin/leads',
    icon: AlarmClock,
    tone: 'bg-amber-50 text-amber-700 border-amber-100',
    action: 'Prioritize outreach',
  },
  {
    key: 'followUpsDue',
    label: 'Automations due',
    href: '/admin/operations',
    icon: CalendarCheck,
    tone: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    action: 'Open operations',
  },
  {
    key: 'upcomingAppointments',
    label: 'Next 7 days',
    href: '/admin/bookings',
    icon: CheckCircle2,
    tone: 'bg-violet-50 text-violet-700 border-violet-100',
    action: 'Check bookings',
  },
] as const

export default function AdminPage() {
  const { stats, loading, error } = useDashboardData()
  const dashboardTools = getDashboardTools()
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredTools = searchQuery.trim()
    ? dashboardTools.filter(
        (t) =>
          t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : dashboardTools

  const commandAlerts = [
    {
      label: 'Hot lead queue',
      value: stats?.todayOps.staleLeads || 0,
      href: '/admin/leads',
      detail: 'New/contacted leads older than 48 hours',
      tone: 'border-amber-200 bg-amber-50 text-amber-800',
    },
    {
      label: 'Shoots this week',
      value: stats?.todayOps.upcomingAppointments || 0,
      href: '/admin/bookings',
      detail: 'Pending, scheduled, or confirmed appointments',
      tone: 'border-violet-200 bg-violet-50 text-violet-800',
    },
    {
      label: 'Follow-ups due',
      value: stats?.todayOps.followUpsDue || 0,
      href: '/admin/leads',
      detail: 'Lead follow-up tasks waiting',
      tone: 'border-blue-200 bg-blue-50 text-blue-800',
    },
    {
      label: 'Portfolio drafts',
      value: stats?.todayOps.portfolioDrafts || 0,
      href: '/admin/leads',
      detail: 'Tailored portfolio workflows started from leads',
      tone: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800',
    },
    {
      label: 'Quote starts',
      value: stats?.todayOps.quotesStarted || 0,
      href: '/admin/leads',
      detail: 'Quote emails started from lead workspace',
      tone: 'border-orange-200 bg-orange-50 text-orange-800',
    },
    {
      label: 'Lead projects',
      value: stats?.todayOps.leadProjects || 0,
      href: '/admin/projects',
      detail: 'Projects started from lead records',
      tone: 'border-indigo-200 bg-indigo-50 text-indigo-800',
    },
    {
      label: 'Gallery delivery',
      value: stats?.todayOps.galleryDeliveryTasks || 0,
      href: '/admin/galleries',
      detail: 'Galleries needing images or delivery review',
      tone: 'border-rose-200 bg-rose-50 text-rose-800',
    },
    {
      label: 'SEO/site health',
      value: 'Check',
      href: '/admin/seo',
      detail: 'Review sitemap, metadata, and Search Console status',
      tone: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Studio37 Admin</h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            Organized control center for CRM, content, marketing, site management, and system tools.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/admin/content-enhanced" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            Open Content Hub
          </Link>
          <Link href="/admin/leads" className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">
            Open Leads
          </Link>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          Error loading dashboard data: {error}
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          const value =
            card.key === 'totalRevenue'
              ? formatCurrency(stats?.totalRevenue || 0)
              : stats?.[card.key] || 0

          return (            <Link key={card.key} href={card.href} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-amber-300 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.label}</p>
                  <div className="mt-2 text-3xl font-bold text-gray-900">
                    {loading ? <div className="h-9 w-24 rounded bg-gray-100 animate-pulse" /> : value}
                  </div>
                  <p className="mt-1 text-xs text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity">{card.hint}</p>
                </div>
                <div className={`rounded-xl p-3 ${card.accent}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Link>
          )
        })}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Today&apos;s operations</h2>
            <p className="mt-1 text-sm text-gray-600">
              The work queue for leads, follow-ups, bookings, and SEO health.
            </p>
          </div>
          <Link
            href="/admin/seo"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-amber-300 hover:bg-amber-50"
          >
            <SearchCheck className="h-4 w-4" />
            SEO health
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {operationCards.map((card) => {
            const Icon = card.icon
            const value = stats?.todayOps?.[card.key] || 0

            return (
              <Link
                key={card.key}
                href={card.href}
                className="group rounded-lg border border-gray-200 bg-gray-50/60 p-4 transition-all hover:border-amber-300 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.label}</p>
                    <div className="mt-2 text-3xl font-bold text-gray-900">
                      {loading ? <div className="h-9 w-14 rounded bg-gray-100 animate-pulse" /> : value}
                    </div>
                  </div>
                  <div className={`rounded-lg border p-2 ${card.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-700">
                  {card.action}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Command center</h2>
            <p className="mt-1 text-sm text-gray-600">What needs attention before you go hunting through tools.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/galleries" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              <Image className="h-4 w-4" />
              Gallery delivery
            </Link>
            <Link href="/admin/ai-site-builder" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              <FileText className="h-4 w-4" />
              AI page draft
            </Link>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {commandAlerts.map((alert) => (
            <Link key={alert.label} href={alert.href} className={`rounded-xl border p-4 transition hover:shadow-sm ${alert.tone}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{alert.label}</p>
                  <p className="mt-1 text-xs opacity-80">{alert.detail}</p>
                </div>
                <span className="rounded-full bg-white/70 px-2 py-1 text-xs font-bold">{loading ? '...' : alert.value}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Bell className="h-5 w-5 text-amber-600" />
            Action alerts
          </h2>
          <div className="mt-4 space-y-3 text-sm">
            <Link href="/admin/leads" className="block rounded-lg border border-gray-200 p-3 hover:border-amber-300 hover:bg-amber-50">
              {stats?.todayOps.staleLeads || 0} hot or stale lead follow-up{(stats?.todayOps.staleLeads || 0) === 1 ? '' : 's'} waiting
            </Link>
            <Link href="/admin/galleries" className="block rounded-lg border border-gray-200 p-3 hover:border-indigo-300 hover:bg-indigo-50">
              {stats?.todayOps.galleryDeliveryTasks || 0} gallery delivery task{(stats?.todayOps.galleryDeliveryTasks || 0) === 1 ? '' : 's'} need images or review
            </Link>
            <Link href="/admin/leads" className="block rounded-lg border border-gray-200 p-3 hover:border-fuchsia-300 hover:bg-fuchsia-50">
              {stats?.todayOps.portfolioDrafts || 0} portfolio draft{(stats?.todayOps.portfolioDrafts || 0) === 1 ? '' : 's'} and {stats?.todayOps.quotesStarted || 0} quote start{(stats?.todayOps.quotesStarted || 0) === 1 ? '' : 's'} to review
            </Link>
            <Link href="/admin/projects" className="block rounded-lg border border-gray-200 p-3 hover:border-indigo-300 hover:bg-indigo-50">
              {stats?.todayOps.leadProjects || 0} project handoff{(stats?.todayOps.leadProjects || 0) === 1 ? '' : 's'} started from leads
            </Link>
            <Link href="/admin/seo" className="block rounded-lg border border-gray-200 p-3 hover:border-emerald-300 hover:bg-emerald-50">
              Review sitemap and SEO health before next publish
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <FolderKanban className="h-5 w-5 text-indigo-600" />
            Booking pipeline
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {[
              ['Inquiry', '/admin/leads'],
              ['Quote', '/admin/leads'],
              ['Booking', '/admin/bookings'],
              ['Project', '/admin/projects'],
              ['Gallery', '/admin/galleries'],
              ['Follow-up', '/admin/operations'],
            ].map(([label, href]) => (
              <Link key={label} href={href} className="rounded-lg border border-gray-200 px-3 py-2 text-center font-medium text-gray-700 hover:border-indigo-300 hover:bg-indigo-50">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Mobile quick actions</h2>
          <p className="mt-1 text-sm text-gray-600">Fast paths for phone admin work.</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <Link href="/admin/leads" className="rounded-lg border border-gray-200 px-3 py-2 text-center hover:bg-gray-50">Respond</Link>
            <Link href="tel:+18327139944" className="rounded-lg border border-gray-200 px-3 py-2 text-center hover:bg-gray-50">Call</Link>
            <Link href="/admin/bookings" className="rounded-lg border border-gray-200 px-3 py-2 text-center hover:bg-gray-50">Booking</Link>
            <Link href="/admin/galleries" className="rounded-lg border border-gray-200 px-3 py-2 text-center hover:bg-gray-50">Gallery link</Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Quick access</h2>
                <p className="text-sm text-gray-600 mt-1">Use the grouped sections below to find the right admin tool faster.</p>
              </div>
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools…"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>
          <div className="grid gap-6">
            {searchQuery.trim() && filteredTools.length === 0 && (
              <p className="text-sm text-gray-500 py-4 text-center">No tools match &ldquo;{searchQuery}&rdquo;</p>
            )}
            {ADMIN_DASHBOARD_GROUP_ORDER.map((groupId) => {
              const tools = filteredTools.filter((tool) => tool.group === groupId)
              if (tools.length === 0) return null

              return (
                <section key={groupId} className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{ADMIN_TOOL_GROUP_META[groupId].label}</h3>
                    <p className="text-sm text-gray-600">{ADMIN_TOOL_GROUP_META[groupId].description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {tools.map((tool) => {
                      const Icon = tool.icon
                      return (
                        <Link
                          key={tool.id}
                          href={tool.href}
                          className={`group rounded-xl border p-4 transition-all hover:shadow-md hover:border-primary-300 ${
                            tool.preferred ? 'border-primary-300 bg-primary-50/40' : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="rounded-lg bg-gray-100 p-2 text-gray-700 group-hover:bg-white">
                              <Icon className="h-5 w-5" />
                            </div>
                            {tool.badge && (
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                              {tool.label}
                              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                            </h4>
                            <p className="mt-1 text-sm text-gray-600 leading-6">{tool.description}</p>
                            <p className="mt-3 text-xs font-medium text-gray-400">{tool.badge || 'Active'} tool</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Lead pipeline</h2>
            <p className="text-sm text-gray-600 mt-1">Quick view of lead status distribution.</p>
            <div className="mt-4 space-y-3">
              {[
                ['new', 'New'],
                ['contacted', 'Contacted'],
                ['qualified', 'Qualified'],
                ['converted', 'Converted'],
                ['closed-won', 'Closed Won'],
                ['closed-lost', 'Closed Lost'],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-semibold text-gray-900">
                    {loading ? '—' : stats?.leadsByStatus[key as keyof typeof stats.leadsByStatus] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Recommended defaults</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li>Use <strong>Content Hub</strong> for page editing and SEO updates.</li>
              <li>Use <strong>Bookings</strong> for record management and <strong>Calendar View</strong> for schedule planning.</li>
              <li>Use <strong>Marketing Campaigns</strong> for sends and <strong>Email Templates</strong> for reusable content.</li>
              <li>Use <strong>Navigation</strong>, <strong>SEO Analyzer</strong>, and <strong>Settings</strong> for global site control.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6">
        <PageList />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Recent leads</h2>
          <div className="mt-4 space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2 animate-pulse">
                  <div className="h-4 w-1/2 rounded bg-gray-100" />
                  <div className="h-3 w-1/3 rounded bg-gray-100" />
                </div>
              ))
            ) : stats?.recentLeads?.length ? (
              stats.recentLeads.map((lead) => (
                <div key={lead.id} className="flex flex-col gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.service_interest || 'Service not set'} • {lead.email}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium rounded-full px-2.5 py-1 bg-gray-100 text-gray-700 capitalize">
                      {lead.status}
                    </span>
                    <a href={`mailto:${lead.email}`} className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50">Email</a>
                    <Link href="/admin/projects/new" className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50">Project</Link>
                    <Link href="/request-portfolio" className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50">Portfolio</Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent leads.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Recent bookings</h2>
          <div className="mt-4 space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2 animate-pulse">
                  <div className="h-4 w-1/2 rounded bg-gray-100" />
                  <div className="h-3 w-1/3 rounded bg-gray-100" />
                </div>
              ))
            ) : stats?.recentBookings?.length ? (
              stats.recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium text-gray-900">{booking.client_name}</p>
                    <p className="text-sm text-gray-600">{booking.session_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(booking.total_amount)}</p>
                    <p className="text-xs text-gray-500 capitalize">{booking.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent bookings.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
