'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft, LogOut, Search } from 'lucide-react'
import {
  ADMIN_SIDEBAR_GROUP_ORDER,
  ADMIN_TOOL_GROUP_META,
  getSidebarTools,
  getSidebarToolsByGroup,
} from '@/lib/admin-tools'

interface AdminDesktopSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function AdminDesktopSidebar({ isOpen, onToggle }: AdminDesktopSidebarProps) {
  const [query, setQuery] = useState('')
  const [recentToolHrefs, setRecentToolHrefs] = useState<string[]>([])
  const pathname = usePathname()
  const router = useRouter()
  const sidebarTools = getSidebarTools()
  const normalizedQuery = query.trim().toLowerCase()

  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_recent_tools')
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        setRecentToolHrefs(parsed.filter((item) => typeof item === 'string').slice(0, 6))
      }
    } catch {
      // ignore localStorage parse failures
    }
  }, [])

  const recentTools = useMemo(() => {
    const map = new Map(sidebarTools.map((tool) => [tool.href, tool]))
    return recentToolHrefs
      .map((href) => map.get(href))
      .filter(Boolean)
  }, [recentToolHrefs, sidebarTools])

  const trackRecentTool = (href: string) => {
    const next = [href, ...recentToolHrefs.filter((item) => item !== href)].slice(0, 6)
    setRecentToolHrefs(next)
    try {
      localStorage.setItem('admin_recent_tools', JSON.stringify(next))
    } catch {
      // ignore storage errors
    }
  }

  const filteredTools = useMemo(() => {
    if (!normalizedQuery) return sidebarTools

    return sidebarTools.filter((tool) => {
      const fields = [tool.label, tool.description, tool.badge, ...(tool.keywords || [])]
      return fields
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(normalizedQuery))
    })
  }, [normalizedQuery, sidebarTools])

  const toolsByGroup = useMemo(
    () => getSidebarToolsByGroup(filteredTools),
    [filteredTools]
  )

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      router.push('/login')
    }
  }

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <aside 
      className={`hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <Link href="/admin" className="text-xl font-bold text-gray-900 truncate">
          Studio37 Admin
        </Link>
        <div className="flex items-center gap-1">
          <button 
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Collapse Sidebar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        <div className="px-1">
          <label className="relative block">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-300 focus:bg-white focus:outline-none"
            />
          </label>
        </div>

        {!normalizedQuery && recentTools.length > 0 && (
          <div>
            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Quick Actions
            </p>
            <div className="space-y-1">
              {recentTools.slice(0, 4).map((tool) => {
                const active = isActive(tool!.href, tool!.exact)
                const Icon = tool!.icon
                return (
                  <Link
                    key={`recent-${tool!.href}`}
                    href={tool!.href}
                    onClick={() => trackRecentTool(tool!.href)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary-600' : 'text-gray-400'}`} />
                    <span className="truncate">{tool!.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {filteredTools.length === 0 && (
          <div className="px-3 py-6 text-sm text-gray-500">
            No admin tools match “{query}”.
          </div>
        )}

        {ADMIN_SIDEBAR_GROUP_ORDER.map((groupId) => {
          const tools = toolsByGroup[groupId]
          if (tools.length === 0) return null

          return (
            <div key={groupId}>
              <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                {ADMIN_TOOL_GROUP_META[groupId].label}
              </p>
              <div className="space-y-1">
                {tools.map((tool) => {
                  const active = isActive(tool.href, tool.exact)
                  const Icon = tool.icon

                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => trackRecentTool(tool.href)}
                      className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary-600' : 'text-gray-400'}`} />
                        <span className="truncate">{tool.label}</span>
                      </span>
                      {tool.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex-shrink-0">
                          {tool.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
