'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  FileText, 
  Image, 
  Calendar, 
  MessageSquare,
  Settings,
  Mail,
  LogOut,
  BarChart3,
  Target,
  Briefcase,
  Palette,
  FolderKanban,
  ChevronLeft
} from 'lucide-react'

interface AdminDesktopSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function AdminDesktopSidebar({ isOpen, onToggle }: AdminDesktopSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      router.push('/login')
    }
  }

  const navItems = [
    { href: '/admin', icon: Home, label: 'Dashboard', exact: true },
    { href: '/admin/pages', icon: FileText, label: 'Pages' },
    { href: '/admin/blog', icon: FileText, label: 'Blog Posts' },
    { href: '/admin/gallery', icon: Image, label: 'Gallery' },
    { href: '/admin/appointments', icon: Calendar, label: 'Appointments' },
    { href: '/admin/calendar', icon: Calendar, label: 'Calendar View' },
    { href: '/admin/leads', icon: MessageSquare, label: 'Leads & Messages' },
    { href: '/admin/lead-scoring', icon: Target, label: 'Lead Scoring' },
    { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { href: '/admin/client-portals', icon: Briefcase, label: 'Client Portals' },
    { href: '/admin/email-templates', icon: Mail, label: 'Email Templates' },
    { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/admin/theme-customizer', icon: Palette, label: 'Theme Customizer' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

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
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-primary-600' : 'text-gray-400'}`} />
              {item.label}
            </Link>
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
