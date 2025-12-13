'use client'

import { useState, useEffect } from 'react'
import AdminMobileNav from '@/components/AdminMobileNav'
import AdminDesktopSidebar from '@/components/AdminDesktopSidebar'
import { ChevronRight } from 'lucide-react'

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
      
      {/* Collapsed State Tab (only visible when sidebar is closed on desktop) */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex fixed left-0 top-20 z-30 bg-white border border-gray-200 border-l-0 rounded-r-lg p-2 shadow-md hover:bg-gray-50 transition-all"
          aria-label="Open Sidebar"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Main Content Area */}
      <main 
        className={`min-h-screen pt-16 lg:pt-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
        }`}
      >
        {/* Cloudinary Media Library is only needed in admin */}
        <script src="https://media-library.cloudinary.com/global/all.js" defer />
        {children}
      </main>
    </div>
  )
}
