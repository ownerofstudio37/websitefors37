"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowDown, ArrowUp, Copy, ExternalLink, FileJson, LayoutTemplate, Plus, Save, Trash2 } from 'lucide-react'

type LayoutBlock = { id: string; type: string; props?: Record<string, any> }
type RenderMode = 'replace' | 'prepend' | 'append'
type Notice = { type: 'success' | 'error'; text: string } | null

const BUILDER_BLOCK_TYPES = [
  'LogoBlock',
  'HeroBlock',
  'TextBlock',
  'ImageBlock',
  'ButtonBlock',
  'ColumnsBlock',
  'SpacerBlock',
  'SeoFooterBlock',
  'BadgesBlock',
  'SlideshowHeroBlock',
  'TestimonialsBlock',
  'GalleryHighlightsBlock',
  'WidgetEmbedBlock',
  'ServicesGridBlock',
  'StatsBlock',
  'CTABannerBlock',
  'IconFeaturesBlock',
  'ContactFormBlock',
  'NewsletterBlock',
  'FAQBlock',
  'PricingTableBlock',
  'PricingCalculatorBlock',
]

const STARTER_BLOCKS: Array<{ label: string; type: string; id: string; props: Record<string, any> }> = [
  {
    label: 'Hero starter',
    type: 'HeroBlock',
    id: 'hero',
    props: {
      eyebrow: 'Studio37',
      title: 'Premium photography with clear planning',
      subtitle: 'Add page-specific proof, pricing context, and a clean next step.',
      buttonText: 'Book a Consultation',
      buttonLink: '/book-consultation',
    },
  },
  {
    label: 'Proof starter',
    type: 'GalleryHighlightsBlock',
    id: 'proof',
    props: {
      heading: 'Recent Studio37 proof',
      subheading: 'Show real examples that match the service, location, or client decision.',
    },
  },
  {
    label: 'CTA starter',
    type: 'CTABannerBlock',
    id: 'book-next-step',
    props: {
      title: 'Ready to plan the right coverage?',
      subtitle: 'Send the details and we will recommend the cleanest next step.',
      buttonText: 'Book a Consultation',
      buttonLink: '/book-consultation',
    },
  },
]

const MODE_HELP: Record<RenderMode, string> = {
  replace: 'Use the CMS layout as the full page. Best for redesigned pages.',
  prepend: 'Show CMS blocks above the coded page. Best for announcements or hero tests.',
  append: 'Show CMS blocks below the coded page. Best for proof, FAQs, or extra CTAs.',
}

function blockLabel(type: string) {
  return type.replace(/Block$/, '').replace(/([a-z])([A-Z])/g, '$1 $2')
}

function uniqueId(base: string, blocks: LayoutBlock[]) {
  const clean = base
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'section'
  let next = clean
  let count = 2
  while (blocks.some((block) => block.id === next)) {
    next = `${clean}-${count}`
    count += 1
  }
  return next
}

function normalizePublicPath(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return '/'
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

function previewHref(path: string, draft: boolean) {
  if (!draft) return path
  return path === '/' ? '/?edit=1' : `${path}?edit=1`
}

export default function BlockLayoutClient({ path, availablePaths = [] }: { path: string; availablePaths?: string[] }) {
  const router = useRouter()
  const params = useSearchParams()
  const useDraft = params.get('edit') === '1'

  const [loading, setLoading] = React.useState(true)
  const [blocks, setBlocks] = React.useState<LayoutBlock[]>([])
  const [mode, setMode] = React.useState<RenderMode>('replace')
  const [saving, setSaving] = React.useState(false)
  const [notice, setNotice] = React.useState<Notice>(null)
  const [newBlockType, setNewBlockType] = React.useState('TextBlock')
  const [newBlockId, setNewBlockId] = React.useState('')
  const [customPath, setCustomPath] = React.useState(path)
  const [draggedId, setDraggedId] = React.useState<string | null>(null)
  const [editingBlockId, setEditingBlockId] = React.useState<string | null>(null)
  const [propsText, setPropsText] = React.useState('{}')
  const [deleteId, setDeleteId] = React.useState<string | null>(null)

  React.useEffect(() => {
    setCustomPath(path)
  }, [path])

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        setNotice(null)
        const res = await fetch(`/api/editor/layout?path=${encodeURIComponent(path)}${useDraft ? '&draft=1' : ''}`, { cache: 'no-store' })
        if (res.ok) {
          const json = await res.json()
          setBlocks(Array.isArray(json?.blocks) ? json.blocks : [])
          setMode(['replace', 'prepend', 'append'].includes(json?.mode) ? json.mode : 'replace')
        } else if (res.status === 404) {
          setBlocks([])
          setMode('replace')
        } else {
          setNotice({ type: 'error', text: 'Failed to load this layout.' })
        }
      } catch {
        setNotice({ type: 'error', text: 'Failed to load this layout.' })
      } finally {
        setLoading(false)
      }
    })()
  }, [path, useDraft])

  function addBlock(type = newBlockType, starter?: { id: string; props: Record<string, any> }) {
    const id = uniqueId(newBlockId || starter?.id || blockLabel(type), blocks)
    setBlocks((prev) => [...prev, { id, type, props: starter?.props || {} }])
    setNewBlockId('')
    setNotice({ type: 'success', text: `${blockLabel(type)} added as ${id}.` })
  }

  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((block) => block.id !== id))
    setDeleteId(null)
    setNotice({ type: 'success', text: 'Block removed from this draft layout.' })
  }

  function move(id: string, dir: -1 | 1) {
    setBlocks((prev) => {
      const idx = prev.findIndex((block) => block.id === id)
      if (idx < 0) return prev
      const nextIdx = idx + dir
      if (nextIdx < 0 || nextIdx >= prev.length) return prev
      const copy = prev.slice()
      const [item] = copy.splice(idx, 1)
      copy.splice(nextIdx, 0, item)
      return copy
    })
  }

  function cloneBlock(id: string) {
    const block = blocks.find((item) => item.id === id)
    if (!block) return
    const nextId = uniqueId(`${id}-copy`, blocks)
    setBlocks((prev) => [...prev, { ...block, id: nextId, props: { ...(block.props || {}) } }])
    setNotice({ type: 'success', text: `Cloned ${id} as ${nextId}.` })
  }

  function handleDrop(e: React.DragEvent, targetId: string) {
    e.preventDefault()
    if (!draggedId || draggedId === targetId) return
    setBlocks((prev) => {
      const fromIdx = prev.findIndex((block) => block.id === draggedId)
      const toIdx = prev.findIndex((block) => block.id === targetId)
      if (fromIdx < 0 || toIdx < 0) return prev
      const copy = prev.slice()
      const [item] = copy.splice(fromIdx, 1)
      copy.splice(toIdx, 0, item)
      return copy
    })
    setDraggedId(null)
  }

  function startEditingProps(block: LayoutBlock) {
    setEditingBlockId(block.id)
    setPropsText(JSON.stringify(block.props || {}, null, 2))
  }

  function saveProps(id: string) {
    try {
      const props = JSON.parse(propsText)
      setBlocks((prev) => prev.map((block) => (block.id === id ? { ...block, props } : block)))
      setEditingBlockId(null)
      setNotice({ type: 'success', text: `Props saved for ${id}.` })
    } catch {
      setNotice({ type: 'error', text: 'Invalid JSON. Fix the props before saving.' })
    }
  }

  function changeType(id: string, type: string) {
    setBlocks((prev) => prev.map((block) => (block.id === id ? { ...block, type } : block)))
  }

  async function save(draftOnly = true) {
    setSaving(true)
    setNotice(null)
    try {
      const res = await fetch(draftOnly ? '/api/editor/draft' : '/api/editor/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path,
          block: 'layout',
          id: '__layout__',
          props: { blocks, mode },
          is_published: !draftOnly,
        }),
      })
      if (!res.ok) throw new Error(draftOnly ? 'Save draft failed' : 'Publish failed')
      setNotice({ type: 'success', text: draftOnly ? 'Draft saved.' : 'Published to the selected route.' })
      router.refresh()
    } catch (e: any) {
      setNotice({ type: 'error', text: e?.message || 'Failed to save.' })
    } finally {
      setSaving(false)
    }
  }

  const sortedPaths = [path, ...availablePaths.filter((item) => item !== path)]

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-950 px-5 py-5 text-white">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
              <LayoutTemplate className="h-4 w-4" />
              Visual CMS Editor
            </div>
            <h2 className="mt-2 text-2xl font-bold">Edit {path}</h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-300">
              Build clean route-level layouts from CMS blocks while keeping the coded page as the fallback.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={previewHref(path, false)} target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/10">
              Live page <ExternalLink className="h-4 w-4" />
            </Link>
            <Link href={previewHref(path, true)} target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/10">
              Draft preview <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-slate-200 bg-slate-50 p-5 lg:border-b-0 lg:border-r">
          <div className="space-y-5">
            <div>
              <label htmlFor="cms-route-picker" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Public route
              </label>
              <select
                id="cms-route-picker"
                value={path}
                onChange={(event) => router.push(`/admin/editor/layout?path=${encodeURIComponent(event.target.value)}`)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                {sortedPaths.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <div className="mt-2 flex gap-2">
                <input
                  value={customPath}
                  onChange={(event) => setCustomPath(event.target.value)}
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="/services/portrait-photography"
                />
                <button
                  type="button"
                  onClick={() => router.push(`/admin/editor/layout?path=${encodeURIComponent(normalizePublicPath(customPath))}`)}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                >
                  Go
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="cms-render-mode" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Render mode
              </label>
              <select
                id="cms-render-mode"
                value={mode}
                onChange={(event) => setMode(event.target.value as RenderMode)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value="replace">Replace page with CMS layout</option>
                <option value="prepend">Add CMS blocks before code page</option>
                <option value="append">Add CMS blocks after code page</option>
              </select>
              <p className="mt-2 text-xs leading-5 text-slate-500">{MODE_HELP[mode]}</p>
            </div>

            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Quick starters</div>
              <div className="grid gap-2">
                {STARTER_BLOCKS.map((starter) => (
                  <button
                    key={starter.id}
                    type="button"
                    onClick={() => addBlock(starter.type, starter)}
                    className="inline-flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold hover:border-amber-300 hover:bg-amber-50"
                  >
                    {starter.label}
                    <Plus className="h-4 w-4 text-amber-700" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Add custom block</div>
              <div className="grid gap-2">
                <select value={newBlockType} onChange={(event) => setNewBlockType(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                  {BUILDER_BLOCK_TYPES.map((type) => <option key={type} value={type}>{blockLabel(type)}</option>)}
                </select>
                <input
                  value={newBlockId}
                  onChange={(event) => setNewBlockId(event.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="Optional anchor id"
                />
                <button type="button" onClick={() => addBlock()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-800">
                  <Plus className="h-4 w-4" />
                  Add block
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="p-5">
          <div className="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">{blocks.length} block{blocks.length === 1 ? '' : 's'} in layout</div>
              <p className="text-xs text-slate-500">Drag rows to reorder. Publish only when the draft preview looks right.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => save(true)} disabled={saving} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50">
                <Save className="h-4 w-4" />
                Save draft
              </button>
              <button onClick={() => save(false)} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
                Publish
              </button>
            </div>
          </div>

          {notice && (
            <div className={`mb-4 rounded-lg border px-3 py-2 text-sm ${notice.type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
              {notice.text}
            </div>
          )}

          {loading ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">Loading layout...</div>
          ) : blocks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <FileJson className="mx-auto h-8 w-8 text-slate-400" />
              <h3 className="mt-3 text-lg font-semibold text-slate-900">No CMS layout yet</h3>
              <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                Add a starter block, save a draft, preview it, then publish when it is ready.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {blocks.map((block, idx) => (
                <li
                  key={block.id}
                  className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${draggedId === block.id ? 'opacity-50' : ''}`}
                  draggable
                  onDragStart={(event) => {
                    setDraggedId(block.id)
                    event.dataTransfer.effectAllowed = 'move'
                  }}
                  onDragOver={(event) => {
                    event.preventDefault()
                    event.dataTransfer.dropEffect = 'move'
                  }}
                  onDrop={(event) => handleDrop(event, block.id)}
                  onDragEnd={() => setDraggedId(null)}
                >
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">{idx + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-900">{block.id}</div>
                        <div className="text-xs text-slate-500">{blockLabel(block.type)}</div>
                      </div>
                      <select value={block.type} onChange={(event) => changeType(block.id, event.target.value)} className="hidden rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm md:block">
                        {BUILDER_BLOCK_TYPES.map((type) => <option key={type} value={type}>{blockLabel(type)}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => startEditingProps(block)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold hover:bg-slate-50">Edit props</button>
                      <button onClick={() => cloneBlock(block.id)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold hover:bg-slate-50" aria-label={`Clone ${block.id}`}><Copy className="h-4 w-4" /></button>
                      <button onClick={() => move(block.id, -1)} disabled={idx === 0} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40" aria-label={`Move ${block.id} up`}><ArrowUp className="h-4 w-4" /></button>
                      <button onClick={() => move(block.id, 1)} disabled={idx === blocks.length - 1} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40" aria-label={`Move ${block.id} down`}><ArrowDown className="h-4 w-4" /></button>
                      {deleteId === block.id ? (
                        <button onClick={() => removeBlock(block.id)} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white">Confirm remove</button>
                      ) : (
                        <button onClick={() => setDeleteId(block.id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50" aria-label={`Remove ${block.id}`}><Trash2 className="h-4 w-4" /></button>
                      )}
                    </div>
                  </div>

                  {editingBlockId === block.id && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <textarea
                        value={propsText}
                        onChange={(event) => setPropsText(event.target.value)}
                        className="h-56 w-full rounded-lg border border-slate-300 bg-white p-3 font-mono text-xs leading-5"
                        spellCheck={false}
                      />
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => saveProps(block.id)} className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white">Save props</button>
                        <button onClick={() => setEditingBlockId(null)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">Cancel</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  )
}
