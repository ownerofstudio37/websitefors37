'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, LogOut, Search } from 'lucide-react'
import NotificationCenter from './NotificationCenter'
import {
  ADMIN_SIDEBAR_GROUP_ORDER,
  ADMIN_TOOL_GROUP_META,
  getSidebarTools,
  getSidebarToolsByGroup,
} from '@/lib/admin-tools'

export default function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const sidebarTools = getSidebarTools()
  const normalizedQuery = query.trim().toLowerCase()

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
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="text-xl font-bold text-gray-900">
            Studio37 Admin
          </Link>
          <div className="flex items-center gap-2">
            <NotificationCenter />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl z-50 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-5">
              <div className="px-1">
                <label className="relative block">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search admin tools..."
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-300 focus:bg-white focus:outline-none"
                  />
                </label>
              </div>

              {filteredTools.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No tools match “{query}”.
                </div>
              )}

              {ADMIN_SIDEBAR_GROUP_ORDER.map((groupId) => {
                const tools = toolsByGroup[groupId]
                if (tools.length === 0) return null

                return (
                  <div key={groupId}>
                    <p className="px-4 mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                      {ADMIN_TOOL_GROUP_META[groupId].label}
                    </p>
                    <ul className="space-y-2">
                      {tools.map((tool) => {
                        const Icon = tool.icon
                        const active = isActive(tool.href, tool.exact)

                        return (
                          <li key={tool.href}>
                            <Link
                              href={tool.href}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition ${
                                active
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <span className="flex items-center gap-3 min-w-0">
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <span className="truncate">{tool.label}</span>
                              </span>
                              {tool.badge && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex-shrink-0">
                                  {tool.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}

              {/* Divider */}
              <div className="my-4 border-t border-gray-200" />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-700 hover:bg-red-50 transition font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
