'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const SERVICES = [
  { id: 'family', label: 'Family Photos', emoji: '👨‍👩‍👧‍👦' },
  { id: 'portrait', label: 'Portrait Session', emoji: '🎨' },
  { id: 'wedding', label: 'Wedding', emoji: '💍' },
  { id: 'engagement', label: 'Engagement', emoji: '💑' },
  { id: 'event', label: 'Event Coverage', emoji: '🎉' },
  { id: 'commercial', label: 'Commercial / Brand', emoji: '📸' },
  { id: 'senior', label: 'Senior Photos', emoji: '🎓' },
  { id: 'other', label: 'Something Else', emoji: '✨' },
]

const QUESTIONS: Record<string, { label: string; key: string; type: string; options?: string[] }[]> = {
  wedding: [
    { label: 'Wedding date (or approximate timeframe)?', key: 'wedding_date', type: 'text' },
    { label: 'Expected guest count?', key: 'guest_count', type: 'select', options: ['Under 50', '50–100', '100–200', '200+', 'Not sure yet'] },
    { label: "What's your photography budget range?", key: 'budget', type: 'select', options: ['$1,000–$1,500', '$1,500–$2,500', '$2,500–$4,000', '$4,000+', 'Still figuring it out'] },
  ],
  engagement: [
    { label: 'When are you hoping to shoot?', key: 'timeline', type: 'select', options: ['Within 2 weeks', '1 month', '2–3 months', 'Flexible'] },
    { label: 'Any location ideas?', key: 'specific_need', type: 'text' },
  ],
  family: [
    { label: 'When are you hoping to shoot?', key: 'timeline', type: 'select', options: ['ASAP', 'Within a month', '2–3 months', 'Flexible / holiday season'] },
    { label: 'How many people in the session?', key: 'guest_count', type: 'select', options: ['2–3', '4–6', '7–10', '10+'] },
  ],
  portrait: [
    { label: "What's the purpose of the portraits?", key: 'specific_need', type: 'select', options: ['Personal / social media', 'Headshots / LinkedIn', 'Modeling / acting', 'Other'] },
    { label: 'Preferred timeline?', key: 'timeline', type: 'select', options: ['Within 2 weeks', '1 month', 'Flexible'] },
  ],
  senior: [
    { label: 'Graduation year?', key: 'specific_need', type: 'text' },
    { label: 'Preferred timeline?', key: 'timeline', type: 'select', options: ['Spring', 'Summer', 'Fall', 'Flexible'] },
  ],
  event: [
    { label: 'Type of event?', key: 'event_details', type: 'text' },
    { label: 'Event date or timeframe?', key: 'timeline', type: 'text' },
    { label: 'Expected attendance?', key: 'guest_count', type: 'select', options: ['Under 50', '50–150', '150–300', '300+'] },
  ],
  commercial: [
    { label: 'What do you need photographed?', key: 'specific_need', type: 'text' },
    { label: 'Preferred timeline?', key: 'timeline', type: 'select', options: ['ASAP', 'Within 2 weeks', '1 month', 'Flexible'] },
  ],
  other: [
    { label: 'Tell us a little about what you have in mind.', key: 'message', type: 'textarea' },
  ],
}

export default function MetaLeadFunnelClient() {
  const searchParams = useSearchParams()
  const preselect = searchParams.get('service')

  const [step, setStep] = useState(preselect ? 2 : 1)
  const [service, setService] = useState(preselect || '')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [contact, setContact] = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (preselect) setService(preselect)
  }, [preselect])

  function handleServiceSelect(id: string) {
    setService(id)
    setStep(2)
  }

  function handleAnswerChange(key: string, value: string) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const questions = QUESTIONS[service] || QUESTIONS['other']
    const qualifyingText = questions
      .map(q => `${q.label}: ${answers[q.key] || '(not answered)'}`)
      .join('\n')

    const payload = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      service_interest: service,
      message: qualifyingText,
      source: 'meta-ad-funnel',
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-white mb-3">You're on the list!</h1>
          <p className="text-gray-400 mb-6">We'll be in touch within 24 hours to talk through your session and get you a personalized quote.</p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>✅ 500+ happy clients</span>
            <span>⭐ 4.9 stars</span>
            <span>📷 48hr delivery</span>
          </div>
        </div>
      </div>
    )
  }

  const questions = QUESTIONS[service] || []

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-widest text-[#C9A84C] mb-2">Studio37 Memphis</p>
          <h1 className="text-3xl font-bold text-white">Let's plan your session</h1>
          <p className="text-gray-400 mt-2 text-sm">Takes 60 seconds · No commitment</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(n => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= n ? 'bg-[#C9A84C]' : 'bg-white/10'}`}
            />
          ))}
        </div>

        {/* Step 1: Service */}
        {step === 1 && (
          <div>
            <p className="text-white font-medium mb-4">What type of photography are you looking for?</p>
            <div className="grid grid-cols-2 gap-3">
              {SERVICES.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleServiceSelect(s.id)}
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all text-left"
                >
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="text-white text-sm font-medium">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Qualifying questions */}
        {step === 2 && (
          <form onSubmit={e => { e.preventDefault(); setStep(3) }}>
            <p className="text-white font-medium mb-4">
              Tell us a bit about your {SERVICES.find(s => s.id === service)?.label?.toLowerCase() || 'session'}:
            </p>
            <div className="space-y-4">
              {questions.map(q => (
                <div key={q.key}>
                  <label className="block text-sm text-gray-300 mb-1">{q.label}</label>
                  {q.type === 'select' ? (
                    <select
                      value={answers[q.key] || ''}
                      onChange={e => handleAnswerChange(q.key, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#C9A84C] outline-none"
                    >
                      <option value="">Select one…</option>
                      {q.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : q.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={answers[q.key] || ''}
                      onChange={e => handleAnswerChange(q.key, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#C9A84C] outline-none resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={answers[q.key] || ''}
                      onChange={e => handleAnswerChange(q.key, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#C9A84C] outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setStep(1)} className="px-4 py-2.5 rounded-lg border border-white/10 text-gray-400 text-sm hover:border-white/30 transition-all">
                ← Back
              </button>
              <button type="submit" className="flex-1 bg-[#C9A84C] hover:bg-[#b8943f] text-black font-semibold py-2.5 rounded-lg text-sm transition-all">
                Next →
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Contact info */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <p className="text-white font-medium mb-4">Almost done! How should we reach you?</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Your name *</label>
                <input
                  required
                  type="text"
                  value={contact.name}
                  onChange={e => setContact(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#C9A84C] outline-none"
                  placeholder="First & last name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email address *</label>
                <input
                  required
                  type="email"
                  value={contact.email}
                  onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#C9A84C] outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Phone number <span className="text-gray-500">(optional)</span></label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={e => setContact(p => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#C9A84C] outline-none"
                  placeholder="(901) 555-0000"
                />
              </div>
            </div>
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setStep(2)} className="px-4 py-2.5 rounded-lg border border-white/10 text-gray-400 text-sm hover:border-white/30 transition-all">
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#C9A84C] hover:bg-[#b8943f] disabled:opacity-60 text-black font-semibold py-2.5 rounded-lg text-sm transition-all"
              >
                {loading ? 'Sending…' : 'Get My Quote →'}
              </button>
            </div>
            <p className="text-xs text-gray-600 text-center mt-4">No spam. We'll only use this to follow up about your session.</p>
          </form>
        )}
      </div>
    </div>
  )
}
