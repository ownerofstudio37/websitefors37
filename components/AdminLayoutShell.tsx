'use client'

import { useState, useEffect } from 'react'
import AdminMobileNav from '@/components/AdminMobileNav'
import AdminDesktopSidebar from '@/components/AdminDesktopSidebar'
import { ChevronRight } from 'lucide-react'
import NotificationCenter from '@/components/NotificationCenter'
import Link from 'next/link'

export default function AdminLayoutShell({
  children
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Auto-collapse on smaller desktop screens if needed, or persist preference
  useEffect(() => {
    const savedState = localStorage.getItem('adminSidebarOpen')
    if (savedState !== null) {
      setIsSidebarOpen(savedState === 'true')
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isSidebarOpen
    setIsSidebarOpen(newState)
    localStorage.setItem('adminSidebarOpen', String(newState))
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Navigation (only visible on mobile) */}
      <AdminMobileNav />
      
      {/* Desktop Sidebar */}
      <AdminDesktopSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      {/* Top Bar (visible on desktop) */}
      <div className={`hidden lg:flex fixed top-0 right-0 left-0 h-16 bg-white border-b border-gray-200 z-30 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="flex items-center justify-between w-full px-6">
          {/* Left side: Toggle button (only when sidebar is closed) */}
          <div className="flex items-center">
            {!isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors mr-4"
                aria-label="Open Sidebar"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          </div>

          {/* Right side: Notifications & Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin/chatbot-training"
              className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition duration-200 flex items-center gap-2"
            >
              <span>🧠</span> AI Training
            </Link>
            <Link
              href="/admin/ai-site-builder"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition duration-200 flex items-center gap-2"
            >
              <span>⚙️</span> AI Site Builder
            </Link>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <NotificationCenter />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main 
        className={`min-h-screen pt-16 lg:pt-16 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
        }`}
      >
        {/* Cloudinary Media Library is only needed in admin */}
        <script src="https://media-library.cloudinary.com/global/all.js" defer />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
