'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Mail, MessageSquare, X } from 'lucide-react'
import { getLeadContext, withLeadContext } from '@/lib/client-lead-context'
import { trackSaveQuoteDismiss, trackSaveQuoteOpen, trackSaveQuoteSubmit } from '@/lib/analytics'

const captureRules = [
  { path: '/book-a-session', delayMs: 60000, scrollPercent: 25 },
  { path: '/get-quote', delayMs: 45000, scrollPercent: 20 },
  { path: '/tools/pricing', delayMs: 40000, scrollPercent: 20 },
  { path: '/tools/package-recommender', delayMs: 35000, scrollPercent: 15 },
] as const

export default function QuoteAbandonmentCapture() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const activeRule = useMemo(() => captureRules.find((rule) => pathname?.startsWith(rule.path)), [pathname])
  const isEligible = Boolean(activeRule)

  useEffect(() => {
    if (!activeRule || dismissed || submitted) return
    if (window.localStorage.getItem('studio37_quote_capture_done') === 'true') return

    const pageViewsKey = 'studio37_quote_capture_page_views'
    const pageViews = Number(window.sessionStorage.getItem(pageViewsKey) || '0') + 1
    window.sessionStorage.setItem(pageViewsKey, String(pageViews))

    const firstPageVisit = pageViews <= 1
    const delayMs = activeRule.delayMs + (firstPageVisit ? 25000 : 0)
    const scrollTarget = activeRule.scrollPercent + (firstPageVisit ? 10 : 0)
    let timerReady = false
    let scrollReady = false

    const maybeOpen = () => {
      if (!timerReady || !scrollReady) return
      setVisible(true)
      trackSaveQuoteOpen({
        path: pathname || '',
        delay_ms: delayMs,
        scroll_target: scrollTarget,
        first_page_visit: firstPageVisit,
      })
    }

    const timer = window.setTimeout(() => {
      timerReady = true
      maybeOpen()
    }, delayMs)

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100)
      if (scrollPercent >= scrollTarget) {
        scrollReady = true
        maybeOpen()
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeRule, dismissed, pathname, submitted])

  if (!isEligible || dismissed || submitted || !visible) return null

  function dismissCapture() {
    trackSaveQuoteDismiss({ path: pathname || '' })
    setDismissed(true)
  }

  async function submitCapture(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.email.trim()) return

    setSubmitting(true)
    try {
      const context = getLeadContext({
        capture_path: pathname || '',
        capture_reason: 'quote-booking-abandonment',
      })
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withLeadContext({
          name: form.name.trim() || 'Saved quote visitor',
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          service_interest: 'Saved quote or booking follow-up',
          message: [
            'Visitor saved their place before finishing a quote or booking flow.',
            `Page: ${pathname}.`,
            context.selected_package ? `Selected package: ${JSON.stringify(context.selected_package)}.` : '',
            context.calculator_context ? `Calculator context: ${JSON.stringify(context.calculator_context)}.` : '',
            context.referrer ? `Referrer: ${context.referrer}.` : '',
            `Follow up by email${form.phone.trim() ? ' and SMS' : ''}.`,
          ].filter(Boolean).join(' '),
          source: 'quote-booking-abandonment-capture',
        }, {
          capture_path: pathname || '',
          capture_reason: 'quote-booking-abandonment',
        })),
      })

      if (!response.ok) throw new Error('Capture failed')
      window.localStorage.setItem('studio37_quote_capture_done', 'true')
      trackSaveQuoteSubmit({
        path: pathname || '',
        has_phone: Boolean(form.phone.trim()),
      })
      setSubmitted(true)
    } catch {
      setDismissed(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed bottom-24 left-3 right-20 z-40 max-w-sm rounded-lg border border-stone-200 bg-white p-4 shadow-2xl sm:left-4 sm:right-auto md:bottom-6">
      <button
        type="button"
        onClick={dismissCapture}
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
