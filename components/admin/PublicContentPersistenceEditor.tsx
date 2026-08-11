'use client'

import { useEffect, useMemo, useState } from 'react'
import { Database, Save, ShieldCheck } from 'lucide-react'

type OverrideDraft = {
  key: string
  content_type: 'image_slots' | 'recent_work' | 'reviews' | 'testimonials' | 'cta_rules' | 'turnaround'
  label: string
  value: unknown
  notes: string
  status: 'draft' | 'published' | 'archived'
}

type EditorDraft = OverrideDraft & {
  raw: string
  error: string
}

type ApiOverride = Omit<OverrideDraft, 'label'> & {
  updated_at?: string
}

type Props = {
  initialDrafts: OverrideDraft[]
}

function stringify(value: unknown) {
  return JSON.stringify(value, null, 2)
}

export default function PublicContentPersistenceEditor({ initialDrafts }: Props) {
  const [drafts, setDrafts] = useState<EditorDraft[]>(initialDrafts.map((draft) => ({ ...draft, raw: stringify(draft.value), error: '' })))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [missingTable, setMissingTable] = useState(false)

  const draftLabels = useMemo(() => new Map(initialDrafts.map((draft) => [draft.key, draft.label])), [initialDrafts])

  useEffect(() => {
    let active = true

    async function loadOverrides() {
      try {
        const res = await fetch('/api/admin/public-content')
        const json = await res.json()
        if (!active) return

        if (json.missingTable) {
          setMissingTable(true)
          setMessage('Run the public_content_overrides migration to enable saved overrides.')
          return
        }

        if (json.success && Array.isArray(json.overrides)) {
          const byKey = new Map<string, ApiOverride>(json.overrides.map((item: ApiOverride) => [item.key, item]))
          setDrafts((current) =>
            current.map((draft) => {
              const saved = byKey.get(draft.key)
              if (!saved) return draft
              return {
                ...draft,
                content_type: saved.content_type,
                raw: stringify(saved.value),
                notes: saved.notes || '',
                status: saved.status,
                error: '',
              }
            }),
          )
        }
      } catch {
        if (active) setMessage('Could not load saved overrides. Static content is still the fallback.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadOverrides()
    return () => {
      active = false
    }
  }, [])

  function updateDraft(key: string, updates: Partial<EditorDraft>) {
    setDrafts((current) => current.map((draft) => (draft.key === key ? { ...draft, ...updates } : draft)))
  }

  async function saveAll() {
    setSaving(true)
    setMessage('')

    const parsed = drafts.map((draft) => {
      try {
        return { ...draft, value: JSON.parse(draft.raw), error: '' }
      } catch {
        return { ...draft, value: null, error: 'Invalid JSON' }
      }
    })

    if (parsed.some((draft) => draft.error)) {
      setDrafts(parsed)
      setSaving(false)
      setMessage('Fix invalid JSON before saving.')
      return
    }

    try {
      const res = await fetch('/api/admin/public-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          overrides: parsed.map(({ key, content_type, value, notes, status }) => ({ key, content_type, value, notes, status })),
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error || 'Save failed')
      setDrafts(parsed)
      setMissingTable(false)
      setMessage('Saved public content overrides.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save overrides.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-800">Database Persistence</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950">Saved public-content overrides</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-700">
            Publish overrides for proof cards, image selections, review rotations, delivery copy, and CTA rules. Static content remains the fallback if an override is missing.
          </p>
        </div>
        <button
          type="button"
          onClick={saveAll}
          disabled={saving || loading || missingTable}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {saving ? 'Saving...' : 'Save overrides'}
        </button>
      </div>

      {message && (
        <p className={`mt-4 rounded-lg px-3 py-2 text-sm ${missingTable ? 'bg-amber-100 text-amber-900' : 'bg-white text-gray-700'}`}>
          {message}
        </p>
      )}

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {drafts.map((draft) => (
          <article key={draft.key} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-950">{draftLabels.get(draft.key) || draft.label}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">{draft.key} · {draft.content_type}</p>
              </div>
              <select
                value={draft.status}
                onChange={(event) => updateDraft(draft.key, { status: event.target.value as OverrideDraft['status'] })}
                className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-700"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <textarea
              value={draft.raw}
              onChange={(event) => updateDraft(draft.key, { raw: event.target.value, error: '' })}
              className="mt-3 h-56 w-full rounded-lg border border-gray-200 bg-gray-950 p-3 font-mono text-xs leading-5 text-gray-100 focus:border-blue-500 focus:outline-none"
              spellCheck={false}
            />
            {draft.error && <p className="mt-2 text-sm font-semibold text-red-700">{draft.error}</p>}
            <input
              value={draft.notes}
              onChange={(event) => updateDraft(draft.key, { notes: event.target.value })}
              placeholder="Admin note"
              className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-white p-3 text-sm text-gray-700">
        <ShieldCheck className="mt-0.5 h-4 w-4 text-green-700" aria-hidden="true" />
        <p>Published overrides are readable by the public site. Draft and archived rows stay admin-only through RLS.</p>
      </div>
      <div className="mt-3 flex items-start gap-2 text-xs text-gray-600">
        <Database className="mt-0.5 h-4 w-4" aria-hidden="true" />
        <p>Migration: <code>supabase/migrations/20260811_public_content_overrides.sql</code></p>
      </div>
    </section>
  )
}
