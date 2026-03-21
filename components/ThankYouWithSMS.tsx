"use client"

import React, { useState } from 'react'
import { CheckCircle, Mail } from 'lucide-react'

export default function ThankYouWithSMS() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service_interest: 'newsletter_subscription',
          source: 'thank-you-newsletter',
          message: 'Subscribed to newsletter from thank-you page',
        }),
      })
      if (!res.ok) throw new Error('Subscribe failed')
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="surface-panel max-w-3xl mx-auto overflow-hidden">
      <div className="bg-stone-950 px-8 py-10 text-center text-white">
        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <div className="eyebrow mb-4 bg-white/10 text-amber-200 border-white/10">Inquiry received</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Thank you!</h2>
        <p className="text-lg text-stone-200 mb-2">
          We've received your inquiry and will get back to you within 24 hours.
        </p>
        <p className="text-stone-400">
          Check your email for a confirmation message.
        </p>
      </div>

      <div className="p-8 md:p-10 bg-white">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-7">
          <div className="flex items-start gap-3 mb-5">
            <Mail className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold text-amber-900 mb-1">
                Stay in the Loop
              </h3>
              <p className="text-amber-800 text-sm leading-6">
                Join our newsletter for mini session announcements, seasonal promotions, and exclusive photography tips. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {done ? (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-800 font-medium">You're subscribed! Welcome to the Studio37 community.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="text"
                placeholder="Your first name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                disabled={submitting}
                className="w-full px-4 py-3.5 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white disabled:opacity-50 text-sm"
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={submitting}
                className="w-full px-4 py-3.5 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white disabled:opacity-50 text-sm"
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 rounded-xl transition disabled:opacity-50"
              >
                <Mail className="w-4 h-4" />
                {submitting ? 'Subscribing…' : 'Subscribe to Newsletter'}
              </button>
              <p className="text-xs text-amber-700 text-center">
                No spam, ever. Unsubscribe with one click.
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="text-center px-8 pb-8 md:pb-10">
        <a
          href="/"
          className="text-primary-700 hover:text-primary-800 font-medium underline underline-offset-4"
        >
          Return to Home
        </a>
      </div>
    </div>
  )
}
