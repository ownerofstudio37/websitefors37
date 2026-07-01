'use client'

import { useState } from 'react'
import { trackConciergeCtaClick, trackLeadCapture } from '@/lib/analytics'
import { withLeadContext } from '@/lib/client-lead-context'

const budgetOptions = ['$750-$1,500', '$1,500-$3,000', '$3,000+', 'Not sure yet']

export default function ConciergeInquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    proposalDate: '',
    locationIdeas: '',
    budgetRange: '',
    privacyNeeds: '',
    decorNeeds: '',
    coveragePreference: 'Photo only',
  })

  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    trackConciergeCtaClick({ cta: 'concierge_inquiry_submit', budget_range: form.budgetRange, coverage: form.coveragePreference })

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withLeadContext({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          service_interest: 'Concierge proposal and engagement inquiry',
          budget_range: form.budgetRange,
          event_date: form.proposalDate,
          source: 'concierge-inquiry-flow',
          message: [
            `Proposal date: ${form.proposalDate || 'not provided'}.`,
            `Location ideas: ${form.locationIdeas || 'not provided'}.`,
            `Privacy needs: ${form.privacyNeeds || 'not provided'}.`,
            `Decor needs: ${form.decorNeeds || 'not provided'}.`,
            `Coverage preference: ${form.coveragePreference}.`,
          ].join(' '),
        }, {
          capture_path: '/services/concierge-services',
          capture_reason: 'concierge-inquiry-flow',
        })),
      })

      if (response.ok) {
        trackLeadCapture('concierge-inquiry-flow', 'concierge')
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="surface-panel p-7 text-center">
        <h2 className="text-2xl font-bold text-stone-950">Concierge inquiry received</h2>
        <p className="mt-3 text-stone-600">We will review the date, location, privacy, decor, and coverage notes before reaching out.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="surface-panel space-y-5 p-7 md:p-9">
      <div>
        <p className="eyebrow mb-2">Concierge Inquiry</p>
        <h2 className="text-3xl font-bold text-stone-950">Tell us the proposal plan</h2>
        <p className="mt-2 text-sm text-stone-600">Custom concierge planning starts with a consultation. Most custom scopes begin after we confirm timing, access, privacy, decor, and photo/video needs.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input required value={form.name} onChange={(event) => update('name', event.target.value)} className="rounded-xl border border-stone-300 px-4 py-3" placeholder="Name" />
        <input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} className="rounded-xl border border-stone-300 px-4 py-3" placeholder="Email" />
        <input value={form.phone} onChange={(event) => update('phone', event.target.value)} className="rounded-xl border border-stone-300 px-4 py-3" placeholder="Phone" />
        <input type="date" value={form.proposalDate} onChange={(event) => update('proposalDate', event.target.value)} className="rounded-xl border border-stone-300 px-4 py-3" />
      </div>
      <textarea value={form.locationIdeas} onChange={(event) => update('locationIdeas', event.target.value)} className="min-h-24 w-full rounded-xl border border-stone-300 px-4 py-3" placeholder="Location ideas or target area" />
      <div className="grid gap-4 md:grid-cols-2">
        <select value={form.budgetRange} onChange={(event) => update('budgetRange', event.target.value)} className="rounded-xl border border-stone-300 px-4 py-3">
          <option value="">Budget range</option>
          {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <select value={form.coveragePreference} onChange={(event) => update('coveragePreference', event.target.value)} className="rounded-xl border border-stone-300 px-4 py-3">
          <option>Photo only</option>
          <option>Photo + highlight video</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <textarea value={form.privacyNeeds} onChange={(event) => update('privacyNeeds', event.target.value)} className="min-h-20 w-full rounded-xl border border-stone-300 px-4 py-3" placeholder="Privacy, surprise, access, or walking-distance needs" />
      <textarea value={form.decorNeeds} onChange={(event) => update('decorNeeds', event.target.value)} className="min-h-20 w-full rounded-xl border border-stone-300 px-4 py-3" placeholder="Decor, flowers, setup, or vendor coordination needs" />
      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
        {status === 'submitting' ? 'Sending...' : 'Send Concierge Inquiry'}
      </button>
      {status === 'error' && (
        <p className="text-sm font-semibold text-red-700">Something interrupted the inquiry. Please try again or use the contact page.</p>
      )}
    </form>
  )
}
