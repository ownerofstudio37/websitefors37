'use client'

import { useEffect, useMemo, useState } from 'react'
import { CalendarCheck, Clock } from 'lucide-react'

type AvailabilityResponse = {
  dates?: Array<{ slots: number; photoSessions?: number; urgency?: 'low' | 'medium' | 'high' }>
  stats?: { weekendsLeft?: number }
}

export default function AvailabilityConfidence({ className = '' }: { className?: string }) {
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null)

  useEffect(() => {
    let active = true
    fetch('/api/availability', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (active) setAvailability(data)
      })
      .catch(() => {
        if (active) setAvailability(null)
      })

    return () => {
      active = false
    }
  }, [])

  const message = useMemo(() => {
    const dates = availability?.dates || []
    const photoWindows = dates.reduce((total, day) => total + Math.max(0, day.photoSessions || 0), 0)
    const weekendsLeft = availability?.stats?.weekendsLeft

    if (photoWindows > 0) {
      return {
        title: 'Booking confidence',
        body: `${photoWindows} photo session windows are showing this month${typeof weekendsLeft === 'number' ? `, including ${weekendsLeft} weekend options` : ''}. Exact time is confirmed during booking.`,
      }
    }

    return {
      title: 'Availability note',
      body: 'Most sessions are easiest to place 2-4 weeks out. Reach out with your date and we will confirm the best fit.',
    }
  }, [availability])

  return (
    <div className={`mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-left ${className}`}>
      <CalendarCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-800" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold text-stone-950">{message.title}</p>
        <p className="mt-1 text-sm leading-6 text-stone-700">{message.body}</p>
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-amber-800">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          Response window: usually within 24 hours.
        </p>
      </div>
    </div>
  )
}
