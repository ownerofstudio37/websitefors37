'use client'

import React, { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Sparkles, Download, Send, Save, Plus, Trash2, ChevronUp, ChevronDown,
  ArrowLeft, Loader2, CheckCircle, X, FileText, Eye, Edit3, AlertCircle,
  Copy, Printer, Users, Mail,
} from 'lucide-react'

// ─── Types ──────────────────────────────────────────────────────────────────

type ContentFormat = 'pdf-guide' | 'instagram-square' | 'instagram-story' | 'facebook-post' | 'linkedin-post'
type ContentTheme = 'studio37-warm' | 'clean-white' | 'dark-minimal' | 'sage-cream'
type BlockType =
  | 'cover' | 'section-header' | 'body-text' | 'bullets'
  | 'feature-cards' | 'stats-row' | 'quote-callout' | 'tip-box'
  | 'cta' | 'divider' | 'spacer'

interface ContentBlock { id: string; type: BlockType; data: Record<string, any> }

// ─── Constants ───────────────────────────────────────────────────────────────

const FORMATS: Record<ContentFormat, { label: string; emoji: string; desc: string; isPDF: boolean }> = {
  'pdf-guide':        { label: 'PDF Guide',          emoji: '📄', desc: 'Multi-page downloadable guide', isPDF: true },
  'instagram-square': { label: 'Instagram Post',     emoji: '📸', desc: '1:1 square post (1080×1080)',   isPDF: false },
  'instagram-story':  { label: 'Instagram Story',    emoji: '📱', desc: '9:16 story (1080×1920)',         isPDF: false },
  'facebook-post':    { label: 'Facebook Post',      emoji: '👍', desc: 'Landscape post (1200×628)',      isPDF: false },
  'linkedin-post':    { label: 'LinkedIn Post',      emoji: '💼', desc: 'Professional post (1200×627)',   isPDF: false },
}

type ThemeConfig = { label: string; bg: string; surface: string; border: string; text: string; muted: string; accent: string; accentBg: string; accentFg: string }
const THEMES: Record<ContentTheme, ThemeConfig> = {
  'studio37-warm': { label: '🌿 Studio37 Warm',  bg: '#fffbf5', surface: '#fff',     border: '#e7e5e4', text: '#1c1917', muted: '#78716c', accent: '#b45309', accentBg: '#fef3c7', accentFg: '#92400e' },
  'clean-white':   { label: '⬜ Clean White',     bg: '#ffffff', surface: '#f9fafb', border: '#e5e7eb', text: '#111827', muted: '#6b7280', accent: '#2563eb', accentBg: '#eff6ff', accentFg: '#1d4ed8' },
  'dark-minimal':  { label: '🌑 Dark Minimal',    bg: '#0f172a', surface: '#1e293b', border: '#334155', text: '#f1f5f9', muted: '#94a3b8', accent: '#f59e0b', accentBg: '#1e293b', accentFg: '#d97706' },
  'sage-cream':    { label: '🌱 Sage & Cream',    bg: '#f8f7f0', surface: '#ffffff', border: '#d4dfd5', text: '#2d3b2d', muted: '#8b9e88', accent: '#6b8f71', accentBg: '#e8f0e9', accentFg: '#4a7055' },
}

const BLOCK_CATALOG: { type: BlockType; label: string; icon: string; desc: string }[] = [
  { type: 'cover',          label: 'Cover / Title',    icon: '🎯', desc: 'Opening title block' },
  { type: 'section-header', label: 'Section Header',   icon: '📌', desc: 'Numbered section title' },
  { type: 'body-text',      label: 'Body Text',        icon: '📝', desc: 'Paragraph content' },
  { type: 'bullets',        label: 'Bullet List',      icon: '✅', desc: 'Key points checklist' },
  { type: 'feature-cards',  label: 'Feature Cards',    icon: '🃏', desc: 'Icon + title + description grid' },
  { type: 'stats-row',      label: 'Stats / Numbers',  icon: '📊', desc: '2–3 big number highlights' },
  { type: 'quote-callout',  label: 'Quote / Callout',  icon: '💬', desc: 'Pull quote or testimonial' },
  { type: 'tip-box',        label: 'Tip Box',          icon: '💡', desc: 'Pro tip or key insight' },
  { type: 'cta',            label: 'Call to Action',   icon: '🚀', desc: 'Conversion action block' },
  { type: 'divider',        label: 'Divider',          icon: '➖', desc: 'Horizontal rule' },
  { type: 'spacer',         label: 'Spacer',           icon: '⬜', desc: 'Blank vertical space' },
]

const DEFAULT_DATA: Record<BlockType, Record<string, any>> = {
  cover:          { title: 'Your Guide Title', subtitle: 'A comprehensive guide to help you succeed', category: 'FREE GUIDE', author: 'Studio37', year: String(new Date().getFullYear()) },
  'section-header': { number: '01', title: 'Section Title', description: 'What you\'ll learn in this section.' },
  'body-text':    { content: 'Write your content here. Provide value-packed insights that readers can act on immediately.' },
  bullets:        { heading: 'Key Takeaways', items: ['First important point to remember', 'Second key insight for success', 'Third actionable step to implement'] },
  'feature-cards':{ heading: 'What\'s Included', cards: [{ icon: '✦', title: 'Feature One', description: 'Brief description.' }, { icon: '◆', title: 'Feature Two', description: 'Brief description.' }] },
  'stats-row':    { stats: [{ value: '10K+', label: 'Clients Served' }, { value: '98%', label: 'Satisfaction' }, { value: '5★', label: 'Rating' }] },
  'quote-callout':{ quote: 'An inspiring quote or key insight that deserves special attention.', author: 'Source' },
  'tip-box':      { label: 'PRO TIP', content: 'An important tip your readers should pay special attention to.' },
  cta:            { heading: 'Ready to Take Action?', subtext: 'Join thousands who have transformed their results.', buttonText: 'Book a Free Consultation', buttonUrl: 'https://studio37.cc/book-consultation' },
  divider:        {},
  spacer:         { height: 40 },
}

// ─── Block Renderer ──────────────────────────────────────────────────────────

function BlockRenderer({ block, theme: t, isPDF }: { block: ContentBlock; theme: ThemeConfig; isPDF: boolean }) {
  const { type, data } = block
  const base: React.CSSProperties = { fontFamily: '"Inter", -apple-system, sans-serif', color: t.text }

  switch (type) {
    case 'cover':
      return (
        <div style={{ ...base, background: isPDF ? `linear-gradient(135deg, ${t.accent}18 0%, ${t.bg} 60%)` : `linear-gradient(160deg, ${t.accent} 0%, ${t.accentFg} 100%)`, padding: isPDF ? '56px 48px 48px' : '40px 32px', minHeight: isPDF ? 200 : undefined, color: isPDF ? t.text : '#fff', textAlign: isPDF ? 'left' : 'center', position: 'relative' }}>
          {data.category && <div style={{ display: 'inline-block', background: isPDF ? t.accentBg : 'rgba(255,255,255,0.2)', color: isPDF ? t.accentFg : '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', padding: '4px 12px', borderRadius: 20, marginBottom: 20, textTransform: 'uppercase' }}>{data.category}</div>}
          <div style={{ fontSize: isPDF ? 36 : 28, fontWeight: 800, lineHeight: 1.15, marginBottom: 12, fontFamily: 'Georgia, serif' }}>{data.title || 'Untitled'}</div>
          {data.subtitle && <div style={{ fontSize: isPDF ? 16 : 14, opacity: 0.8, marginBottom: 24, lineHeight: 1.5 }}>{data.subtitle}</div>}
          {isPDF && <div style={{ fontSize: 11, opacity: 0.5, marginTop: 32, borderTop: `1px solid ${t.border}`, paddingTop: 12 }}>{data.author} · {data.year}</div>}
        </div>
      )

    case 'section-header':
      return (
        <div style={{ ...base, padding: '32px 48px 16px', borderBottom: `2px solid ${t.accent}40`, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ minWidth: 40, height: 40, borderRadius: 8, background: t.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{data.number || '01'}</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>{data.title}</div>
            {data.description && <div style={{ fontSize: 13, color: t.muted, lineHeight: 1.5 }}>{data.description}</div>}
          </div>
        </div>
      )

    case 'body-text':
      return (
        <div style={{ ...base, padding: '20px 48px', fontSize: 14, lineHeight: 1.8, color: t.text }}>
          {(data.content || '').split('\n\n').map((p: string, i: number) => (
            <p key={i} style={{ marginBottom: 12 }}>{p}</p>
          ))}
        </div>
      )

    case 'bullets':
      return (
        <div style={{ ...base, padding: '20px 48px' }}>
          {data.heading && <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: t.accent }}>{data.heading}</div>}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(data.items || []).map((item: string, i: number) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, lineHeight: 1.5 }}>
                <span style={{ color: t.accent, fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'feature-cards':
      return (
        <div style={{ ...base, padding: '24px 48px' }}>
          {data.heading && <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>{data.heading}</div>}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(data.cards?.length || 2, 3)}, 1fr)`, gap: 12 }}>
            {(data.cards || []).map((card: any, i: number) => (
              <div key={i} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{card.title}</div>
                <div style={{ fontSize: 11, color: t.muted, lineHeight: 1.4 }}>{card.description}</div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'stats-row':
      return (
        <div style={{ ...base, background: t.accentBg, padding: '28px 48px', display: 'flex', justifyContent: 'center', gap: 0 }}>
          {(data.stats || []).map((stat: any, i: number, arr: any[]) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < arr.length - 1 ? `1px solid ${t.border}` : undefined, padding: '0 16px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: t.accent, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: t.muted, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      )

    case 'quote-callout':
      return (
        <div style={{ ...base, padding: '24px 48px' }}>
          <div style={{ background: t.accentBg, borderLeft: `4px solid ${t.accent}`, borderRadius: '0 10px 10px 0', padding: '20px 24px' }}>
            <div style={{ fontSize: 28, color: t.accent, lineHeight: 1, marginBottom: 8 }}>"</div>
            <div style={{ fontSize: 15, fontStyle: 'italic', lineHeight: 1.6, color: t.text }}>{data.quote}</div>
            {data.author && <div style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color: t.muted }}>— {data.author}</div>}
          </div>
        </div>
      )

    case 'tip-box':
      return (
        <div style={{ ...base, padding: '16px 48px' }}>
          <div style={{ background: t.accentBg, border: `1px solid ${t.accent}40`, borderRadius: 10, padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18 }}>💡</span>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: t.accentFg, marginBottom: 4, textTransform: 'uppercase' }}>{data.label || 'PRO TIP'}</div>
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>{data.content}</div>
            </div>
          </div>
        </div>
      )

    case 'cta':
      return (
        <div style={{ ...base, background: `linear-gradient(135deg, ${t.accent} 0%, ${t.accentFg} 100%)`, padding: '36px 48px', textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, fontFamily: 'Georgia, serif' }}>{data.heading}</div>
          {data.subtext && <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 20 }}>{data.subtext}</div>}
          <div style={{ display: 'inline-block', background: '#fff', color: t.accent, fontWeight: 700, fontSize: 13, padding: '10px 28px', borderRadius: 8 }}>{data.buttonText || 'Get Started'}</div>
        </div>
      )

    case 'divider':
      return <div style={{ margin: '0 48px', borderTop: `1px solid ${t.border}` }} />

    case 'spacer':
      return <div style={{ height: data.height || 32 }} />

    default:
      return null
  }
}

// ─── Block Editor Panel ──────────────────────────────────────────────────────

function BlockEditor({ block, onChange }: { block: ContentBlock; onChange: (data: Record<string, any>) => void }) {
  const { type, data } = block
  const input = (label: string, key: string, multiline = false) => (
    <div key={key} className="mb-3">
      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">{label}</label>
      {multiline
        ? <textarea className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm resize-y min-h-[80px]" value={data[key] || ''} onChange={e => onChange({ ...data, [key]: e.target.value })} />
        : <input className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm" value={data[key] || ''} onChange={e => onChange({ ...data, [key]: e.target.value })} />}
    </div>
  )

  switch (type) {
    case 'cover':
      return <>{input('Title', 'title')}{input('Subtitle', 'subtitle')}{input('Category Label', 'category')}{input('Author', 'author')}{input('Year', 'year')}</>

    case 'section-header':
      return <>{input('Number', 'number')}{input('Section Title', 'title')}{input('Description', 'description', true)}</>

    case 'body-text':
      return <>{input('Content (use \\n\\n for new paragraph)', 'content', true)}</>

    case 'bullets': {
      const items: string[] = data.items || []
      return (
        <>
          {input('Heading (optional)', 'heading')}
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Items</label>
          {items.map((item, i) => (
            <div key={i} className="flex gap-1 mb-1">
              <input className="flex-1 border border-stone-200 rounded px-2 py-1.5 text-sm" value={item} onChange={e => { const n = [...items]; n[i] = e.target.value; onChange({ ...data, items: n }) }} />
              <button onClick={() => onChange({ ...data, items: items.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 px-1"><X className="h-3 w-3" /></button>
            </div>
          ))}
          <button onClick={() => onChange({ ...data, items: [...items, 'New item'] })} className="mt-1 text-xs text-amber-700 font-semibold hover:underline">+ Add Item</button>
        </>
      )
    }

    case 'feature-cards': {
      const cards: any[] = data.cards || []
      return (
        <>
          {input('Section Heading', 'heading')}
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Cards</label>
          {cards.map((card, i) => (
            <div key={i} className="border border-stone-200 rounded-lg p-3 mb-2">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-semibold text-stone-500">Card {i + 1}</span>
                <button onClick={() => onChange({ ...data, cards: cards.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
              </div>
              <input placeholder="Icon (emoji)" className="w-full border border-stone-200 rounded px-2 py-1 text-sm mb-1" value={card.icon || ''} onChange={e => { const n = [...cards]; n[i] = { ...card, icon: e.target.value }; onChange({ ...data, cards: n }) }} />
              <input placeholder="Title" className="w-full border border-stone-200 rounded px-2 py-1 text-sm mb-1" value={card.title || ''} onChange={e => { const n = [...cards]; n[i] = { ...card, title: e.target.value }; onChange({ ...data, cards: n }) }} />
              <input placeholder="Description" className="w-full border border-stone-200 rounded px-2 py-1 text-sm" value={card.description || ''} onChange={e => { const n = [...cards]; n[i] = { ...card, description: e.target.value }; onChange({ ...data, cards: n }) }} />
            </div>
          ))}
          <button onClick={() => onChange({ ...data, cards: [...cards, { icon: '✦', title: 'New Card', description: 'Description.' }] })} className="text-xs text-amber-700 font-semibold hover:underline">+ Add Card</button>
        </>
      )
    }

    case 'stats-row': {
      const stats: any[] = data.stats || []
      return (
        <>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Stats (2–3)</label>
          {stats.map((stat, i) => (
            <div key={i} className="flex gap-2 mb-1 items-center">
              <input placeholder="Value" className="w-24 border border-stone-200 rounded px-2 py-1.5 text-sm font-bold" value={stat.value || ''} onChange={e => { const n = [...stats]; n[i] = { ...stat, value: e.target.value }; onChange({ ...data, stats: n }) }} />
              <input placeholder="Label" className="flex-1 border border-stone-200 rounded px-2 py-1.5 text-sm" value={stat.label || ''} onChange={e => { const n = [...stats]; n[i] = { ...stat, label: e.target.value }; onChange({ ...data, stats: n }) }} />
              <button onClick={() => onChange({ ...data, stats: stats.filter((_, j) => j !== i) })} className="text-red-400"><X className="h-3 w-3" /></button>
            </div>
          ))}
          {stats.length < 3 && <button onClick={() => onChange({ ...data, stats: [...stats, { value: '0', label: 'Metric' }] })} className="text-xs text-amber-700 font-semibold hover:underline">+ Add Stat</button>}
        </>
      )
    }

    case 'quote-callout':
      return <>{input('Quote Text', 'quote', true)}{input('Attribution / Author', 'author')}</>

    case 'tip-box':
      return <>{input('Label (e.g. PRO TIP)', 'label')}{input('Content', 'content', true)}</>

    case 'cta':
      return <>{input('Heading', 'heading')}{input('Supporting Text', 'subtext')}{input('Button Text', 'buttonText')}{input('Button URL', 'buttonUrl')}</>

    case 'spacer':
      return (
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Height (px)</label>
          <input type="number" className="w-full border border-stone-200 rounded px-3 py-2 text-sm" value={data.height || 40} onChange={e => onChange({ ...data, height: Number(e.target.value) })} />
        </div>
      )

    default:
      return <p className="text-xs text-stone-400 italic">No editable fields for this block.</p>
  }
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ContentStudioPage() {
  const [format, setFormat] = useState<ContentFormat>('pdf-guide')
  const [theme, setTheme] = useState<ContentTheme>('studio37-warm')
  const [title, setTitle] = useState('Untitled Document')
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showBlockPicker, setShowBlockPicker] = useState(false)

  // AI panel
  const [aiTopic, setAiTopic] = useState('')
  const [aiAudience, setAiAudience] = useState('')
  const [aiTone, setAiTone] = useState('professional, helpful')
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  // Save / export
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [sendEmail, setSendEmail] = useState('')
  const [sendNote, setSendNote] = useState('')
  const [sending, setSending] = useState(false)
  const [sendDone, setSendDone] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)
  const themeConfig = THEMES[theme]
  const isPDF = FORMATS[format].isPDF
  const selectedBlock = blocks.find(b => b.id === selectedId) ?? null

  const makeId = () => `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

  // ── Block ops ──────────────────────────────────────────────────────────────

  const addBlock = useCallback((type: BlockType) => {
    const block: ContentBlock = { id: makeId(), type, data: { ...DEFAULT_DATA[type] } }
    setBlocks(prev => [...prev, block])
    setSelectedId(block.id)
    setShowBlockPicker(false)
  }, [])

  const updateBlock = useCallback((id: string, data: Record<string, any>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, data } : b))
  }, [])

  const removeBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id))
    setSelectedId(prev => prev === id ? null : prev)
  }, [])

  const moveBlock = useCallback((id: string, dir: -1 | 1) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id)
      if (idx < 0) return prev
      const next = [...prev]
      const swap = idx + dir
      if (swap < 0 || swap >= next.length) return prev
      ;[next[idx], next[swap]] = [next[swap], next[idx]]
      return next
    })
  }, [])

  const duplicateBlock = useCallback((id: string) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id)
      if (idx < 0) return prev
      const copy = { ...prev[idx], id: makeId(), data: { ...prev[idx].data } }
      const next = [...prev]
      next.splice(idx + 1, 0, copy)
      return next
    })
  }, [])

  // ── AI Generate ────────────────────────────────────────────────────────────

  const handleGenerate = async () => {
    if (!aiTopic.trim()) return
    setGenerating(true)
    setGenError(null)
    try {
      const res = await fetch('/api/content-studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, audience: aiAudience, tone: aiTone, format }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Generation failed')
      if (Array.isArray(json.blocks) && json.blocks.length) {
        setBlocks(json.blocks)
        setSelectedId(null)
        if (!title || title === 'Untitled Document') setTitle(aiTopic)
      }
    } catch (e: any) {
      setGenError(e.message)
    } finally {
      setGenerating(false)
    }
  }

  // ── Export PDF ─────────────────────────────────────────────────────────────

  const handleExportPDF = () => {
    if (!canvasRef.current) return
    setExporting(true)
    const win = window.open('', '_blank')
    if (!win) { setExporting(false); return }
    win.document.write(`<!DOCTYPE html><html><head>
      <meta charset="utf-8" />
      <title>${title}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${themeConfig.bg}; font-family: "Inter", -apple-system, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        @media print { @page { size: A4; margin: 0; } body { margin: 0; } }
        .page-wrap { max-width: 794px; margin: 0 auto; }
      </style>
    </head><body><div class="page-wrap">${canvasRef.current.innerHTML}</div>
    <script>window.onload = () => { window.print(); }<\/script>
    </body></html>`)
    win.document.close()
    setExporting(false)
  }

  // ── Export PNG (html2canvas dynamic import) ────────────────────────────────

  const handleExportPNG = async () => {
    if (!canvasRef.current) return
    setExporting(true)
    try {
      const html2canvas = (await import('html2canvas' as any)).default
      const canvas = await html2canvas(canvasRef.current, { scale: 2, useCORS: true, backgroundColor: themeConfig.bg })
      const link = document.createElement('a')
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      // html2canvas not installed — open print window as fallback
      handleExportPDF()
    } finally {
      setExporting(false)
    }
  }

  // ── Send via Email ─────────────────────────────────────────────────────────

  const handleSend = async () => {
    if (!sendEmail.trim()) return
    setSending(true)
    try {
      const htmlContent = canvasRef.current?.innerHTML || ''
      await fetch('/api/marketing/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: sendEmail,
          subject: `${title} — from Studio37`,
          html: `<div style="max-width:640px;margin:0 auto;font-family:sans-serif">${sendNote ? `<p style="margin-bottom:20px">${sendNote}</p>` : ''}${htmlContent}</div>`,
        }),
      })
      setSendDone(true)
      setTimeout(() => { setSendDone(false); setShowSendModal(false); setSendEmail(''); setSendNote('') }, 2500)
    } catch {
      // silently close
    } finally {
      setSending(false)
    }
  }

  // ── Save ───────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    setSaving(true)
    try {
      const { supabase } = await import('@/lib/supabase')
      await supabase.from('content_studio_documents' as any).upsert({
        title,
        format,
        theme,
        blocks: JSON.stringify(blocks),
        updated_at: new Date().toISOString(),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      // Fallback to localStorage
      try {
        const key = `content-studio-${Date.now()}`
        localStorage.setItem(key, JSON.stringify({ title, format, theme, blocks }))
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      } catch {}
    } finally {
      setSaving(false)
    }
  }

  // ── Canvas dimensions ──────────────────────────────────────────────────────

  const getCanvasStyle = (): React.CSSProperties => {
    const aspectMap: Record<ContentFormat, string> = {
      'pdf-guide': 'auto',
      'instagram-square': '1 / 1',
      'instagram-story': '9 / 16',
      'facebook-post': '1200 / 628',
      'linkedin-post': '1200 / 627',
    }
    return {
      width: '100%',
      maxWidth: 520,
      aspectRatio: aspectMap[format] !== 'auto' ? aspectMap[format] : undefined,
      background: themeConfig.bg,
      overflow: 'hidden',
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="h-screen flex flex-col bg-stone-50 overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-stone-200 flex-shrink-0">
        <Link href="/admin" className="text-stone-400 hover:text-stone-700 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="w-px h-5 bg-stone-200" />
        <input
          className="text-sm font-semibold text-stone-800 bg-transparent border-none outline-none flex-1 min-w-0 max-w-xs"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Document title..."
        />
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 text-stone-600">
            {saved ? <><CheckCircle className="h-3.5 w-3.5 text-green-500" />Saved!</> : saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Saving…</> : <><Save className="h-3.5 w-3.5" />Save</>}
          </button>
          <button onClick={isPDF ? handleExportPDF : handleExportPNG} disabled={exporting || blocks.length === 0} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 text-stone-600">
            {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : isPDF ? <Printer className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
            {isPDF ? 'Export PDF' : 'Export PNG'}
          </button>
          <button onClick={() => setShowSendModal(true)} disabled={blocks.length === 0} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-700 text-white rounded-lg hover:bg-amber-800 disabled:opacity-50">
            <Send className="h-3.5 w-3.5" />Send
          </button>
        </div>
      </div>

      {/* Main 3-column layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── Left Panel ── */}
        <div className="w-64 flex-shrink-0 bg-white border-r border-stone-200 flex flex-col overflow-y-auto">
          {/* Format */}
          <div className="p-4 border-b border-stone-100">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Format</p>
            <div className="space-y-1">
              {(Object.entries(FORMATS) as [ContentFormat, typeof FORMATS[ContentFormat]][]).map(([key, f]) => (
                <button key={key} onClick={() => setFormat(key)} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${format === key ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'text-stone-600 hover:bg-stone-50'}`}>
                  <span>{f.emoji}</span><span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="p-4 border-b border-stone-100">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Theme</p>
            <div className="space-y-1">
              {(Object.entries(THEMES) as [ContentTheme, ThemeConfig][]).map(([key, t]) => (
                <button key={key} onClick={() => setTheme(key)} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${theme === key ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'text-stone-600 hover:bg-stone-50'}`}>
                  <span className="w-4 h-4 rounded-full border border-stone-300 flex-shrink-0" style={{ background: t.accent }} />
                  <span>{t.label.replace(/^[^ ]+ /, '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Generate */}
          <div className="p-4 border-b border-stone-100">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 flex items-center gap-1"><Sparkles className="h-3 w-3" />AI Generate</p>
            <textarea
              className="w-full border border-stone-200 rounded-lg px-2.5 py-2 text-xs resize-none mb-2"
              rows={3}
              placeholder="Topic or brief (e.g. 'SEO basics for small businesses')"
              value={aiTopic}
              onChange={e => setAiTopic(e.target.value)}
            />
            <input className="w-full border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs mb-2" placeholder="Audience (e.g. 'restaurant owners')" value={aiAudience} onChange={e => setAiAudience(e.target.value)} />
            <input className="w-full border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs mb-2" placeholder="Tone (e.g. 'professional, friendly')" value={aiTone} onChange={e => setAiTone(e.target.value)} />
            {genError && <p className="text-xs text-red-500 mb-2 flex items-start gap-1"><AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />{genError}</p>}
            <button onClick={handleGenerate} disabled={generating || !aiTopic.trim()} className="w-full py-2 rounded-lg text-xs font-semibold bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-50 flex items-center justify-center gap-1.5">
              {generating ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Generating…</> : <><Sparkles className="h-3.5 w-3.5" />Generate Content</>}
            </button>
            {blocks.length > 0 && <p className="text-[10px] text-stone-400 mt-1.5 text-center">⚠ This will replace all current blocks</p>}
          </div>

          {/* Add Block */}
          <div className="p-4 flex-1">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Blocks</p>
            {BLOCK_CATALOG.map(b => (
              <button key={b.type} onClick={() => addBlock(b.type)} title={b.desc} className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 flex items-center gap-2 transition-colors">
                <span>{b.icon}</span><span>{b.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Center Canvas ── */}
        <div className="flex-1 overflow-auto flex flex-col items-center py-8 px-4 bg-stone-100">
          {blocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <FileText className="h-10 w-10 text-stone-300 mb-3" />
              <p className="text-stone-500 font-medium mb-1">No blocks yet</p>
              <p className="text-stone-400 text-sm mb-4">Use AI Generate or add blocks from the left panel</p>
              <button onClick={handleGenerate} disabled={!aiTopic.trim()} className="px-4 py-2 rounded-lg text-sm font-semibold bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-50 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />Generate with AI
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div style={{ width: '100%', maxWidth: 560 }}>
                <div
                  ref={canvasRef}
                  style={getCanvasStyle()}
                  className="shadow-xl rounded-lg overflow-hidden"
                >
                  {blocks.map(block => (
                    <div
                      key={block.id}
                      onClick={() => setSelectedId(block.id)}
                      className={`relative group cursor-pointer ring-inset transition-all ${selectedId === block.id ? 'ring-2 ring-amber-500' : 'hover:ring-1 hover:ring-amber-300'}`}
                    >
                      <BlockRenderer block={block} theme={themeConfig} isPDF={isPDF} />
                      {/* Block toolbar on hover */}
                      <div className="absolute top-1 right-1 hidden group-hover:flex bg-white/90 backdrop-blur rounded-md shadow border border-stone-200 items-center gap-0.5 px-1 py-0.5 z-10">
                        <button onClick={e => { e.stopPropagation(); moveBlock(block.id, -1) }} className="p-0.5 text-stone-500 hover:text-stone-800" title="Move up"><ChevronUp className="h-3 w-3" /></button>
                        <button onClick={e => { e.stopPropagation(); moveBlock(block.id, 1) }} className="p-0.5 text-stone-500 hover:text-stone-800" title="Move down"><ChevronDown className="h-3 w-3" /></button>
                        <button onClick={e => { e.stopPropagation(); duplicateBlock(block.id) }} className="p-0.5 text-stone-500 hover:text-stone-800" title="Duplicate"><Copy className="h-3 w-3" /></button>
                        <button onClick={e => { e.stopPropagation(); removeBlock(block.id) }} className="p-0.5 text-red-400 hover:text-red-600" title="Delete"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-stone-400 mt-3">{blocks.length} block{blocks.length !== 1 ? 's' : ''} · Click any block to edit</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Right Editor Panel ── */}
        <div className="w-72 flex-shrink-0 bg-white border-l border-stone-200 flex flex-col overflow-y-auto">
          {selectedBlock ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{BLOCK_CATALOG.find(b => b.type === selectedBlock.type)?.icon}</span>
                  <span className="text-sm font-semibold text-stone-800">{BLOCK_CATALOG.find(b => b.type === selectedBlock.type)?.label}</span>
                </div>
                <button onClick={() => setSelectedId(null)} className="text-stone-400 hover:text-stone-600"><X className="h-4 w-4" /></button>
              </div>
              <BlockEditor
                block={selectedBlock}
                onChange={data => updateBlock(selectedBlock.id, data)}
              />
              <div className="mt-6 pt-4 border-t border-stone-100 flex gap-2">
                <button onClick={() => duplicateBlock(selectedBlock.id)} className="flex-1 text-xs font-semibold border border-stone-200 rounded-lg py-2 hover:bg-stone-50 flex items-center justify-center gap-1 text-stone-600">
                  <Copy className="h-3.5 w-3.5" />Duplicate
                </button>
                <button onClick={() => removeBlock(selectedBlock.id)} className="flex-1 text-xs font-semibold border border-red-200 rounded-lg py-2 hover:bg-red-50 flex items-center justify-center gap-1 text-red-500">
                  <Trash2 className="h-3.5 w-3.5" />Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
              <Edit3 className="h-8 w-8 text-stone-200 mb-3" />
              <p className="text-sm text-stone-400 font-medium">Select a block</p>
              <p className="text-xs text-stone-300 mt-1">Click any block in the canvas to edit its content</p>
            </div>
          )}
        </div>
      </div>

      {/* Send Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-stone-900 flex items-center gap-2"><Mail className="h-4 w-4 text-amber-700" />Send Document</h3>
              <button onClick={() => setShowSendModal(false)}><X className="h-4 w-4 text-stone-400" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Recipient Email</label>
                <input className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm" type="email" placeholder="client@example.com" value={sendEmail} onChange={e => setSendEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Personal Note (optional)</label>
                <textarea className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm resize-none" rows={3} placeholder="Hi! I thought this guide would be helpful for you…" value={sendNote} onChange={e => setSendNote(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowSendModal(false)} className="flex-1 py-2 rounded-lg text-sm border border-stone-200 text-stone-600 hover:bg-stone-50">Cancel</button>
              <button onClick={handleSend} disabled={sending || !sendEmail.trim()} className="flex-1 py-2 rounded-lg text-sm font-semibold bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-50 flex items-center justify-center gap-2">
                {sendDone ? <><CheckCircle className="h-4 w-4" />Sent!</> : sending ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : <><Send className="h-4 w-4" />Send</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
