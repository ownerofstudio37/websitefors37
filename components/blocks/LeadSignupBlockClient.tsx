"use client"

import React, { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import EditableChrome from '../editor/EditableChrome'

export interface LeadSignupBlockClientProps {
  heading?: string
  subheading?: string
  animation?: string
  buttonVariant?: 'primary' | 'outline'
  // Legacy props retained so existing builder configs don't break
  variantStrategy?: string
  headingShort?: string
  headingLong?: string
  subheadingShort?: string
  subheadingLong?: string
  showIframe?: string | boolean
  buttonText?: string
}

export default function LeadSignupBlockClient({
  heading = 'Join the Studio37 Newsletter',
  subheading = 'Mini session announcements, seasonal promotions, and exclusive photography tips—straight to your inbox.',
  animation = 'fade-in',
  buttonVariant = 'primary',
}: LeadSignupBlockClientProps) {
  const animClass = animation === 'fade-in'
    ? 'animate-fadeIn'
    : animation === 'slide-up'
      ? 'animate-slideUp'
      : animation === 'zoom'
        ? 'animate-zoom'
        : ''

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
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
          source: 'newsletter-block',
          message: 'Subscribed to newsletter via page block',
        }),
      })
      if (!res.ok) throw new Error('Subscribe failed')
      setDone(true)
      if ((window as any).gtag) {
        (window as any).gtag('event', 'newsletter_subscribe', { source: 'block' })
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const btnClass = buttonVariant === 'outline'
    ? 'border border-amber-600 text-amber-700 hover:bg-amber-50'
    : 'bg-amber-600 text-white hover:bg-amber-700'

  return (
    <section className={`py-12 md:py-16 px-6 md:px-8 bg-white ${animClass} rounded-lg border border-amber-200`}>
      <EditableChrome label="Newsletter Signup" block="LeadSignupBlock" anchorId="newsletter-signup" />
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
          <Mail className="w-6 h-6 text-amber-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-amber-800 mb-3">{heading}</h2>
        <p className="text-amber-700 mb-8 leading-relaxed">{subheading}</p>

        {done ? (
          <div className="flex items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-green-800 font-medium">You're subscribed! Welcome to the community.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="First name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={submitting}
              className="flex-1 px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white disabled:opacity-50 text-sm"
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={submitting}
              className="flex-1 px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white disabled:opacity-50 text-sm"
            />
            <button
              type="submit"
              disabled={submitting}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition shadow-sm disabled:opacity-50 ${btnClass}`}
            >
              <Mail className="w-4 h-4" />
              {submitting ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}
        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        {!done && <p className="mt-3 text-xs text-amber-600">No spam, ever. Unsubscribe with one click.</p>}
      </div>
    </section>
  )
}
