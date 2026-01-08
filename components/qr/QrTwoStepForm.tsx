'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, ArrowRight } from 'lucide-react'

interface Props {
  campaign?: string
}

export default function QrTwoStepForm({ campaign = 'shirt' }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [leadId, setLeadId] = useState<string | null>(null)
  const [optIn, setOptIn] = useState(true)

  const submitStep1 = async () => {
    if (!form.name || !form.email) {
      toast.error('Please enter your name and email')
      return
    }

    setIsSubmitting(true)

    try {
      const body = {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        service_interest: `${campaign}-campaign`,
        message: `Shirt campaign lead - QR - incentive: up to $50 off consultation`,
        source: campaign
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error || 'Failed to submit')
        setIsSubmitting(false)
        return
      }

      setLeadId(json.leadId || null)
      setStep(2)
      toast.success('Thanks! Contact captured.')
    } catch (err) {
      console.error('Submit error', err)
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBookNow = () => {
    if (!leadId) return
    // Hand off to booking, include lead id to prefill/link
    window.location.href = `/book-consultation?lead_id=${leadId}`
  }

  const handleSaveForLater = () => {
    setStep(3)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Claim your offer</h2>
          <p className="text-gray-600 mb-4">Enter a few details and we’ll save your contact — takes 10 seconds.</p>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="flex items-start gap-2">
              <input id="optin" type="checkbox" checked={optIn} onChange={() => setOptIn(!optIn)} className="mt-1" />
              <label htmlFor="optin" className="text-sm text-gray-600">Yes, I agree to receive updates and offers by email. <a className="underline" href="/privacy">Privacy policy</a></label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={submitStep1}
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
            >
              {isSubmitting ? 'Submitting...' : 'Claim offer'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thanks—what would you like to do next?</h3>
          <p className="text-gray-600 mb-6">Book a consultation now to get up to $50 off your session, or save our contact and we’ll be in touch.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleBookNow} className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold">Book consultation</button>

            <button onClick={handleSaveForLater} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold">Save my contact</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thanks — we’ll be in touch!</h3>
          <p className="text-gray-600 mb-4">We saved your contact and will reach out about this offer. If you decide to book later, you can always <a href="/book-consultation" className="underline">book a consultation</a>.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold">Back to Home</button>
            <button onClick={() => window.location.href = '/book-consultation'} className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold">Book consultation</button>
          </div>
        </div>
      )}
    </div>
  )
}