import React from 'react'
import Link from 'next/link'
import { LayoutTemplate, Sparkles, Workflow } from 'lucide-react'
import AdminProtected from '@/components/AdminProtected'
import BlockLayoutClient from '@/components/editor/BlockLayoutClient'
import { collectPublicPageRoutes } from '@/lib/admin-public-routes'

export const dynamic = 'force-dynamic'

export default function LayoutEditorPage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const rawPath = typeof searchParams?.path === 'string' ? searchParams?.path : '/'
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`
  const availablePaths = collectPublicPageRoutes()
  return (
    <AdminProtected>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
                <LayoutTemplate className="h-4 w-4" />
                CMS Page Editor
              </div>
              <h1 className="text-3xl font-bold text-slate-950">Clean editor for existing public pages</h1>
              <p className="mt-2 max-w-3xl text-slate-600">
                Pick a public route, add or reorder Visual Builder blocks, preview the draft, then publish without losing the coded page fallback.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <Link href={`/admin/page-builder?path=${encodeURIComponent(path)}`} className="rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-900 shadow-sm hover:border-amber-300">
                <Workflow className="mb-2 h-4 w-4 text-amber-700" />
                Visual builder
              </Link>
              <Link href="/admin/ai-site-builder" className="rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-900 shadow-sm hover:border-amber-300">
                <Sparkles className="mb-2 h-4 w-4 text-purple-700" />
                AI builder
              </Link>
              <Link href="/admin/operations" className="rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-900 shadow-sm hover:border-amber-300">
                {availablePaths.length}
                <span className="mt-2 block text-xs font-normal text-slate-500">editable routes</span>
              </Link>
            </div>
          </div>
          <BlockLayoutClient path={path} availablePaths={availablePaths} />
        </div>
      </div>
    </AdminProtected>
  )
}
