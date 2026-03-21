'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, CalendarDays } from 'lucide-react'
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
    accent: 'bg-blue-100 text-blue-700',
  },
  {
    key: 'totalRevenue',
    label: 'Tracked Revenue',
    icon: TrendingUp,
    accent: 'bg-green-100 text-green-700',
  },
  {
    key: 'totalBookings',
    label: 'Total Bookings',
    icon: CalendarDays,
    accent: 'bg-purple-100 text-purple-700',
  },
] as const

export default function AdminPage() {
  const { stats, loading, error } = useDashboardData()
  const dashboardTools = getDashboardTools()

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
            Open Content CMS
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

          return (
            <div key={card.key} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.label}</p>
                  <div className="mt-2 text-3xl font-bold text-gray-900">
                    {loading ? <div className="h-9 w-24 rounded bg-gray-100 animate-pulse" /> : value}
                  </div>
                </div>
                <div className={`rounded-xl p-3 ${card.accent}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Quick access</h2>
              <p className="text-sm text-gray-600 mt-1">Use the grouped sections below to find the right admin tool faster.</p>
            </div>
          </div>
          <div className="grid gap-6">
            {ADMIN_DASHBOARD_GROUP_ORDER.map((groupId) => {
              const tools = dashboardTools.filter((tool) => tool.group === groupId)
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
              <li>Use <strong>Enhanced Content CMS</strong> for page editing.</li>
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
                <div key={lead.id} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.service_interest}</p>
                  </div>
                  <span className="text-xs font-medium rounded-full px-2.5 py-1 bg-gray-100 text-gray-700 capitalize">
                    {lead.status}
                  </span>
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
