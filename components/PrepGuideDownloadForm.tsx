'use client'

import { useMemo, useState } from 'react'
import { Download, Mail } from 'lucide-react'
import { prepGuideDownloads, PrepGuideKey } from '@/lib/public-content'
import { withLeadContext } from '@/lib/client-lead-context'
import { recordLeadTimelineEvent } from '@/lib/client-lead-timeline'
import { leadMagnetSegments } from '@/lib/conversion-copy'
import { trackPrepGuideDownload } from '@/lib/analytics'

export default function PrepGuideDownloadForm({ guide }: { guide: PrepGuideKey }) {
  const guideData = prepGuideDownloads[guide]
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [ready, setReady] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const downloadText = useMemo(() => {
    return [
      `Studio37 ${guideData.title}`,
      '',
      guideData.summary,
      '',
      ...guideData.bullets.map((line, index) => `${index + 1}. ${line}`),
      '',
      'Next step: https://www.studio37.cc/book-a-session',
      'Featured work: https://gallery.studio37.cc',
      'Request complete galleries: https://www.studio37.cc/request-portfolio',
    ].join('\n')
  }, [guideData])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const segment = leadMagnetSegments[guide]
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withLeadContext({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          service_interest: guideData.serviceInterest,
          message: `Requested service-specific prep guide: ${guideData.title}. ${segment.task}`,
          source: 'prep-guide-download-page',
        }, {
          guide,
          guide_label: guideData.title,
          follow_up_template: segment.template,
          admin_follow_up_task: segment.task,
        })),
      })

      if (!response.ok) throw new Error('Guide request failed')
      recordLeadTimelineEvent('prep_guide_requested', {
        guide,
        guide_label: guideData.title,
        follow_up_template: segment.template,
      })
      trackPrepGuideDownload(guide, 'submit')
      setReady(true)
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          required
          className="rounded-md border border-stone-300 px-3 py-3"
          placeholder="Name"
          autoComplete="name"
        />
        <input
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          required
          type="email"
          className="rounded-md border border-stone-300 px-3 py-3"
          placeholder="Email"
          autoComplete="email"
        />
        <input
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          type="tel"
          className="rounded-md border border-stone-300 px-3 py-3 sm:col-span-2"
          placeholder="Phone optional"
          autoComplete="tel"
        />
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={submitting} className="btn-primary inline-flex items-center justify-center">
          <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
          {submitting ? 'Sending...' : 'Send My Guide'}
        </button>
        {ready && (
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(downloadText)}`}
            download={guideData.filename}
            onClick={() => trackPrepGuideDownload(guide)}
            className="btn-secondary inline-flex items-center justify-center"
          >
            <Download className="mr-2 h-4 w-4" aria-hidden="true" />
            Download Now
          </a>
        )}
      </div>
    </form>
  )
}
