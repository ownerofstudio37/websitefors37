'use client'

type LeadTimelinePayload = Record<string, string | number | boolean | null | undefined>

const STORAGE_KEY = 'studio37_lead_timeline_events'

function readEvents() {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function recordLeadTimelineEvent(type: string, payload: LeadTimelinePayload = {}) {
  if (typeof window === 'undefined') return

  const events = readEvents()
  events.unshift({
    type,
    payload,
    page_url: window.location.href,
    created_at: new Date().toISOString(),
  })

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(0, 25)))
}

export function getClientLeadTimelineEvents() {
  return readEvents()
}
