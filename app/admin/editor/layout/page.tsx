import React from 'react'
import fs from 'node:fs'
import path from 'node:path'
import AdminProtected from '@/components/AdminProtected'
import BlockLayoutClient from '@/components/editor/BlockLayoutClient'

export const dynamic = 'force-dynamic'

function collectPublicPageRoutes(dir = path.join(process.cwd(), 'app'), prefix = ''): string[] {
  const routes: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name === 'api' || entry.name === 'admin') continue
    const absolute = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name.startsWith('(')) {
        routes.push(...collectPublicPageRoutes(absolute, prefix))
      } else if (!entry.name.includes('[')) {
        routes.push(...collectPublicPageRoutes(absolute, `${prefix}/${entry.name}`))
      }
    } else if (entry.name === 'page.tsx') {
      routes.push(prefix || '/')
    }
  }
  return Array.from(new Set(routes)).sort((a, b) => a.localeCompare(b))
}

export default function LayoutEditorPage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const path = typeof searchParams?.path === 'string' ? searchParams?.path : '/'
  const availablePaths = collectPublicPageRoutes()
  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Page Layout Editor</h1>
            <p className="text-gray-600">Manage the order of blocks, add new ones, or remove blocks for <code className="px-1 bg-gray-100 rounded">{path}</code>.</p>
          </div>
          <BlockLayoutClient path={path} availablePaths={availablePaths} />
        </div>
      </div>
    </AdminProtected>
  )
}
