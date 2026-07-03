'use client'

import { useEffect, useState } from 'react'
import { trackEvent, trackFormSubmit, trackLeadCapture } from '@/lib/analytics'
import { withLeadContext } from '@/lib/client-lead-context'

const projectTypes = ['Wedding', 'Portrait', 'Engagement / Proposal', 'Event', 'Commercial / Brand', 'Not sure yet']
const comparisonOptions = [
  'Full-gallery consistency',
  'Lighting and editing style',
  'Venue or location match',
  'Posing and direction',
  'Commercial usage/deliverables',
]

export default function PortfolioRequestForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Portrait',
    location: '',
    timeline: '',
    compareGoal: 'Full-gallery consistency',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    trackEvent('portfolio_request_view', { source: 'request-portfolio' })
  }, [])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    trackFormSubmit('portfolio_request', ['name', 'email', 'phone', 'projectType', 'location', 'timeline', 'compareGoal', 'notes'])
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withLeadContext({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          service_interest: `Complete gallery request - ${form.projectType}`,
          message: [
            `Complete gallery request: send private full-gallery examples or a tailored portfolio for ${form.projectType}.`,
            `Location/city: ${form.location || 'Not provided'}.`,
            `Date/timeline: ${form.timeline || 'Not provided'}.`,
            `Wants to compare: ${form.compareGoal}.`,
            `Notes: ${form.notes || 'None provided.'}`,
            'Send status: not sent.',
          ].join('\n'),
          source: 'portfolio-request',
        }, {
          project_type: form.projectType,
          requested_asset: 'private complete gallery or tailored portfolio',
          location: form.location,
          timeline: form.timeline,
          compare_goal: form.compareGoal,
          send_status: 'not_sent',
        })),
      })
      if (!response.ok) throw new Error('Portfolio request failed')
      trackLeadCapture('portfolio-request', form.projectType)
      trackEvent('portfolio_request_submit', { project_type: form.projectType, compare_goal: form.compareGoal })
      setSent(true)
    } catch {
      setError('Something went wrong sending your request. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-950">
        <h2 className="text-2xl font-bold">Request received.</h2>
        <p className="mt-2 leading-7">We will send private complete galleries or a tailored portfolio that matches your project type, location, and what you want to compare.</p>
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
        <input value={form.location} onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))} className="rounded-md border border-stone-300 px-3 py-3" placeholder="Location or city" />
        <input value={form.timeline} onChange={(event) => setForm((prev) => ({ ...prev, timeline: event.target.value }))} className="rounded-md border border-stone-300 px-3 py-3" placeholder="Date or timeline" />
        <select value={form.compareGoal} onChange={(event) => setForm((prev) => ({ ...prev, compareGoal: event.target.value }))} className="rounded-md border border-stone-300 px-3 py-3 md:col-span-2">
          {comparisonOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
      <textarea value={form.notes} onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))} className="mt-3 min-h-28 w-full rounded-md border border-stone-300 px-3 py-3" placeholder="Tell us what kind of gallery would help: venue type, session style, project goals, or examples you want to see." />
      {error && <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={submitting} className="btn-primary mt-4 w-full justify-center md:w-auto">
        {submitting ? 'Sending...' : 'Request Tailored Portfolio'}
      </button>
    </form>
  )
}
