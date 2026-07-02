'use client'

import { useState } from 'react'
import { withLeadContext } from '@/lib/client-lead-context'

const projectTypes = ['Wedding', 'Portrait', 'Engagement / Proposal', 'Event', 'Commercial / Brand', 'Not sure yet']

export default function PortfolioRequestForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: 'Portrait', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withLeadContext({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          service_interest: `${form.projectType} portfolio request`,
          message: `Portfolio request: send a complete gallery or tailored portfolio for ${form.projectType}. Notes: ${form.notes || 'None provided.'}`,
          source: 'portfolio-request',
        }, {
          project_type: form.projectType,
          requested_asset: 'complete gallery or tailored portfolio',
        })),
      })
      if (!response.ok) throw new Error('Portfolio request failed')
      setSent(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-950">
        <h2 className="text-2xl font-bold">Request received.</h2>
        <p className="mt-2 leading-7">We will send a complete gallery or tailored portfolio that matches your project type.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2">
        <input required value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="rounded-md border border-stone-300 px-3 py-3" placeholder="Name" />
        <input required type="email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="rounded-md border border-stone-300 px-3 py-3" placeholder="Email" />
        <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} className="rounded-md border border-stone-300 px-3 py-3" placeholder="Phone optional" />
        <select value={form.projectType} onChange={(event) => setForm((prev) => ({ ...prev, projectType: event.target.value }))} className="rounded-md border border-stone-300 px-3 py-3">
          {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      <textarea value={form.notes} onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))} className="mt-3 min-h-28 w-full rounded-md border border-stone-300 px-3 py-3" placeholder="Tell us what kind of gallery would help: venue type, session style, project goals, or examples you want to see." />
      <button type="submit" disabled={submitting} className="btn-primary mt-4 w-full justify-center md:w-auto">
        {submitting ? 'Sending...' : 'Request Tailored Portfolio'}
      </button>
    </form>
  )
}
