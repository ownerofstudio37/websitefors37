'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft, LogOut } from 'lucide-react'
import {
  ADMIN_SIDEBAR_GROUP_ORDER,
  ADMIN_TOOL_GROUP_META,
  getSidebarTools,
} from '@/lib/admin-tools'

interface AdminDesktopSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function AdminDesktopSidebar({ isOpen, onToggle }: AdminDesktopSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const sidebarTools = getSidebarTools()

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
        {ADMIN_SIDEBAR_GROUP_ORDER.map((groupId) => {
          const tools = sidebarTools.filter((tool) => tool.group === groupId)
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
