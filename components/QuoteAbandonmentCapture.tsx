'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Mail, MessageSquare, X } from 'lucide-react'

const eligiblePaths = ['/book-a-session', '/get-quote', '/tools/pricing', '/tools/package-recommender']

export default function QuoteAbandonmentCapture() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const isEligible = useMemo(() => eligiblePaths.some((path) => pathname?.startsWith(path)), [pathname])

  useEffect(() => {
    if (!isEligible || dismissed || submitted) return
    if (window.localStorage.getItem('studio37_quote_capture_done') === 'true') return

    const timer = window.setTimeout(() => setVisible(true), 25000)
    return () => window.clearTimeout(timer)
  }, [isEligible, dismissed, submitted])

  if (!isEligible || dismissed || submitted || !visible) return null

  async function submitCapture(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.email.trim()) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim() || 'Saved quote visitor',
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          service_interest: 'Saved quote or booking follow-up',
          message: `Visitor saved their place before finishing a quote or booking flow. Page: ${pathname}. Follow up by email${form.phone.trim() ? ' and SMS' : ''}.`,
          source: 'quote-booking-abandonment-capture',
        }),
      })

      if (!response.ok) throw new Error('Capture failed')
      window.localStorage.setItem('studio37_quote_capture_done', 'true')
      setSubmitted(true)
    } catch {
      setDismissed(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed bottom-20 left-4 z-50 max-w-sm rounded-lg border border-stone-200 bg-white p-4 shadow-2xl md:bottom-6">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 rounded-full p-1 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
        aria-label="Dismiss save quote form"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="pr-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-stone-950">
          <Mail className="h-4 w-4 text-amber-700" aria-hidden="true" />
          Save your quote before you go
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Drop your email and we will follow up with your package context. Add a phone number if SMS is easier.
        </p>
      </div>
      <form onSubmit={submitCapture} className="mt-4 space-y-2">
        <input
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
          placeholder="Name"
          autoComplete="name"
        />
        <input
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
          placeholder="Email"
          type="email"
          autoComplete="email"
          required
        />
        <input
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
          placeholder="Phone for SMS follow-up"
          type="tel"
          autoComplete="tel"
        />
        <button type="submit" disabled={submitting} className="btn-primary inline-flex w-full items-center justify-center">
          <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
          {submitting ? 'Saving...' : 'Save My Quote'}
        </button>
      </form>
    </div>
  )
}
