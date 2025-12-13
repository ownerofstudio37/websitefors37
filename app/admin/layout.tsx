import React from 'react'
import { Metadata } from 'next'
import AdminProtected from '@/components/AdminProtected'
import AdminLayoutShell from '@/components/AdminLayoutShell'

export const metadata: Metadata = {
  title: 'Admin Panel | Studio37 Photography',
  description: 'Secure admin dashboard for Studio37 Photography business management',
}

// Admin routes are dynamic (session/cookies, dashboard data), disable prerender
export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProtected>
      <AdminLayoutShell>
        {children}
      </AdminLayoutShell>
    </AdminProtected>
  )
}
