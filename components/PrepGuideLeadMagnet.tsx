'use client'

import { useMemo, useState } from 'react'
import { Download, Mail } from 'lucide-react'
import { trackPrepGuideDownload } from '@/lib/analytics'
import { withLeadContext } from '@/lib/client-lead-context'
import { recordLeadTimelineEvent } from '@/lib/client-lead-timeline'
import { leadMagnetSegments } from '@/lib/conversion-copy'

type GuideKey = keyof typeof leadMagnetSegments

const guides: Array<{ value: GuideKey; label: string }> = [
  { value: 'portrait', label: 'Portrait Prep Checklist' },
  { value: 'wedding', label: 'Wedding Day Photo Prep' },
  { value: 'event', label: 'Event Coverage Planner' },
  { value: 'commercial', label: 'Commercial Shoot Prep Guide' },
]

const checklistCopy: Record<string, string[]> = {
  portrait: ['Choose 2-3 outfit options.', 'Plan grooming and touch-ups before arrival.', 'Bring simple props only if they support the story.', 'Arrive 10-15 minutes early.'],
  wedding: ['Finalize family formal list.', 'Share timeline and vendor contacts.', 'Gather rings, invitations, shoes, and detail items.', 'Build buffer time before ceremony and sunset portraits.'],
  event: ['Confirm run-of-show and key people.', 'List sponsor, VIP, and signage priorities.', 'Share lighting or venue access notes.', 'Plan delivery needs for press or social posts.'],
  commercial: ['Define usage channels and image priorities.', 'Prepare shot list by product, team, space, and lifestyle.', 'Clean and stage work areas.', 'Gather brand guidelines and campaign references.'],
}

export default function PrepGuideLeadMagnet() {
  const [guide, setGuide] = useState<GuideKey>('portrait')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [ready, setReady] = useState(false)

  const selectedGuide = guides.find((item) => item.value === guide) || guides[0]
  const downloadText = useMemo(() => {
    const lines = checklistCopy[guide] || checklistCopy.portrait
    return [
      `Studio37 ${selectedGuide.label}`,
      '',
      ...lines.map((line, index) => `${index + 1}. ${line}`),
      '',
      'Next step: book at https://www.studio37.cc/book-a-session, view featured work at https://gallery.studio37.cc, or request complete galleries at https://www.studio37.cc/request-portfolio',
    ].join('\n')
  }, [guide, selectedGuide.label])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    try {
      const segment = leadMagnetSegments[guide]
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withLeadContext({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          service_interest: `${selectedGuide.label} lead magnet`,
          message: `Requested downloadable prep guide: ${selectedGuide.label}. ${segment.task}`,
          source: 'prep-guide-lead-magnet',
        }, {
          guide: selectedGuide.value,
          guide_label: selectedGuide.label,
          follow_up_template: segment.template,
          admin_follow_up_task: segment.task,
        })),
      })
      if (!response.ok) throw new Error('Lead magnet failed')
      recordLeadTimelineEvent('prep_guide_requested', {
        guide,
        guide_label: selectedGuide.label,
        follow_up_template: segment.template,
      })
      trackPrepGuideDownload(selectedGuide.value, 'submit')
      setReady(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="border-y border-stone-200 bg-stone-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow-hero mb-3">Downloadable Prep Guides</p>
          <h2 className="text-3xl font-bold md:text-4xl">Get a session checklist sent to your inbox</h2>
          <p className="mt-4 text-stone-300">
            Choose the guide that matches your shoot. We will save your request as a lead so email follow-up can continue automatically.
          </p>
        </div>
        <form onSubmit={submit} className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
          <div className="grid gap-3 md:grid-cols-2">
            <select value={guide} onChange={(event) => setGuide(event.target.value as GuideKey)} className="rounded-md border border-white/20 bg-white px-3 py-3 text-stone-950">
              {guides.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required className="rounded-md border border-white/20 px-3 py-3 text-stone-950" placeholder="Name" />
            <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} required type="email" className="rounded-md border border-white/20 px-3 py-3 text-stone-950" placeholder="Email" />
            <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} type="tel" className="rounded-md border border-white/20 px-3 py-3 text-stone-950" placeholder="Phone optional" />
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button type="submit" disabled={submitting} className="btn-primary inline-flex items-center justify-center">
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              {submitting ? 'Sending...' : 'Send My Guide'}
            </button>
            {ready && (
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(downloadText)}`}
                download={`${guide}-studio37-prep-guide.txt`}
                onClick={() => trackPrepGuideDownload(guide)}
                className="btn-secondary inline-flex items-center justify-center"
              >
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Download Now
              </a>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
