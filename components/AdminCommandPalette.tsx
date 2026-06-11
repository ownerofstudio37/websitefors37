'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowRight, ExternalLink, Search, X } from 'lucide-react'
import {
  ADMIN_SIDEBAR_GROUP_ORDER,
  ADMIN_TOOL_GROUP_META,
  getSidebarTools,
  getSidebarToolsByGroup,
  type AdminTool,
} from '@/lib/admin-tools'

const RECENT_TOOLS_KEY = 'admin_recent_tools'

const externalCommands = [
  {
    id: 'gallery-subdomain',
    label: 'Gallery Subdomain',
    description: 'Open the public client gallery site.',
    href: 'https://gallery.studio37.cc',
    keywords: ['gallery', 'portfolio', 'client gallery', 'subdomain'],
  },
]

interface AdminCommandPaletteProps {
  buttonClassName?: string
  buttonLabel?: string
  enableKeyboard?: boolean
}

export default function AdminCommandPalette({
  buttonClassName,
  buttonLabel = 'Search admin',
  enableKeyboard = true,
}: AdminCommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [recentToolHrefs, setRecentToolHrefs] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const tools = getSidebarTools()
  const normalizedQuery = query.trim().toLowerCase()

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_TOOLS_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        setRecentToolHrefs(parsed.filter((item) => typeof item === 'string').slice(0, 6))
      }
    } catch {
      // ignore storage failures
    }
  }, [])

  useEffect(() => {
    if (!enableKeyboard) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
      }

      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableKeyboard])

  useEffect(() => {
    if (!open) return
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open) return
    setOpen(false)
    setQuery('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const recentTools = useMemo(() => {
    const map = new Map(tools.map((tool) => [tool.href, tool]))
    return recentToolHrefs
      .map((href) => map.get(href))
      .filter(Boolean) as AdminTool[]
  }, [recentToolHrefs, tools])

  const filteredTools = useMemo(() => {
    if (!normalizedQuery) return tools

    return tools.filter((tool) => {
      const fields = [
        tool.label,
        tool.description,
        tool.badge,
        ADMIN_TOOL_GROUP_META[tool.group].label,
        ...(tool.keywords || []),
      ]

      return fields
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(normalizedQuery))
    })
  }, [normalizedQuery, tools])

  const filteredExternalCommands = useMemo(() => {
    if (!normalizedQuery) return externalCommands

    return externalCommands.filter((command) => {
      const fields = [command.label, command.description, ...(command.keywords || [])]
      return fields.some((field) => field.toLowerCase().includes(normalizedQuery))
    })
  }, [normalizedQuery])

  const toolsByGroup = useMemo(
    () => getSidebarToolsByGroup(filteredTools),
    [filteredTools]
  )

  const trackRecentTool = (href: string) => {
    const next = [href, ...recentToolHrefs.filter((item) => item !== href)].slice(0, 6)
    setRecentToolHrefs(next)
    try {
      localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(next))
    } catch {
      // ignore storage failures
    }
  }

  const runToolCommand = (tool: AdminTool) => {
    trackRecentTool(tool.href)
    setOpen(false)
    setQuery('')
    router.push(tool.href)
  }

  const runExternalCommand = (href: string) => {
    setOpen(false)
    setQuery('')
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  const hasResults = filteredTools.length > 0 || filteredExternalCommands.length > 0

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClassName || 'inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'}
        aria-label="Open admin search"
      >
        <Search className="h-4 w-4" />
        <span>{buttonLabel}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            aria-label="Close admin search"
            className="absolute inset-0 h-full w-full cursor-default bg-slate-950/45"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-1/2 top-20 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search leads, pages, galleries, SEO, settings..."
                className="min-w-0 flex-1 border-0 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close admin search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-3">
              {!normalizedQuery && recentTools.length > 0 && (
                <section className="mb-4">
                  <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Recent
                  </p>
                  <div className="grid gap-1">
                    {recentTools.slice(0, 4).map((tool) => {
                      const Icon = tool.icon
                      return (
                        <button
                          key={`palette-recent-${tool.href}`}
                          type="button"
                          onClick={() => runToolCommand(tool)}
                          className="group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-amber-50 hover:text-gray-900"
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <Icon className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-amber-700" />
                            <span className="truncate font-medium">{tool.label}</span>
                          </span>
                          <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-300 group-hover:text-amber-700" />
                        </button>
                      )
                    })}
                  </div>
                </section>
              )}

              {filteredExternalCommands.length > 0 && (
                <section className="mb-4">
                  <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    External
                  </p>
                  <div className="grid gap-1">
                    {filteredExternalCommands.map((command) => (
                      <button
                        key={command.id}
                        type="button"
                        onClick={() => runExternalCommand(command.href)}
                        className="group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <ExternalLink className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-700" />
                          <span className="min-w-0">
                            <span className="block truncate font-medium">{command.label}</span>
                            <span className="block truncate text-xs text-gray-500">{command.description}</span>
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-300 group-hover:text-gray-700" />
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {ADMIN_SIDEBAR_GROUP_ORDER.map((groupId) => {
                const groupTools = toolsByGroup[groupId]
                if (groupTools.length === 0) return null

                return (
                  <section key={groupId} className="mb-4 last:mb-0">
                    <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                      {ADMIN_TOOL_GROUP_META[groupId].label}
                    </p>
                    <div className="grid gap-1">
                      {groupTools.map((tool) => {
                        const Icon = tool.icon

                        return (
                          <button
                            key={tool.href}
                            type="button"
                            onClick={() => runToolCommand(tool)}
                            className="group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <Icon className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-700" />
                              <span className="min-w-0">
                                <span className="block truncate font-medium">{tool.label}</span>
                                <span className="block truncate text-xs text-gray-500">{tool.description}</span>
                              </span>
                            </span>
                            <span className="flex flex-shrink-0 items-center gap-2">
                              {tool.badge && (
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                                  {tool.badge}
                                </span>
                              )}
                              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-700" />
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </section>
                )
              })}

              {!hasResults && (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm font-medium text-gray-700">No admin tools found.</p>
                  <p className="mt-1 text-sm text-gray-500">Try searching for leads, SEO, gallery, content, or settings.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
