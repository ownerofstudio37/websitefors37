'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { CalendarCheck, PackageSearch, X } from 'lucide-react'

const DISMISS_KEY = 'studio37_help_popup_dismissed_at'
const DISMISS_DAYS = 14

const excludedPrefixes = [
  '/admin',
  '/book-consultation',
  '/book-a-session',
  '/contact',
  '/request-portfolio',
  '/tools/pricing',
  '/tools/package-recommender',
  '/get-quote',
  '/login',
  '/setup-admin',
]

function dismissedRecently() {
  if (typeof window === 'undefined') return true
  const dismissedAt = window.localStorage.getItem(DISMISS_KEY)
  if (!dismissedAt) return false
  const timestamp = Number(dismissedAt)
  if (!Number.isFinite(timestamp)) return false
  return Date.now() - timestamp < DISMISS_DAYS * 24 * 60 * 60 * 1000
}

export default function ConsultationHelpPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [eligible, setEligible] = useState(false)

  const shouldSuppress = useMemo(
    () => excludedPrefixes.some((prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`)),
    [pathname],
  )

  useEffect(() => {
    setOpen(false)
    setEligible(false)

    if (shouldSuppress || dismissedRecently()) return

    let cancelled = false
    const timer = window.setTimeout(() => {
      if (!cancelled) setEligible(true)
    }, 35000)

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      if (window.scrollY / scrollable > 0.5) {
        setEligible(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onScroll, { passive: true })
    window.addEventListener('touchmove', onScroll, { passive: true })
    onScroll()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onScroll)
      window.removeEventListener('touchmove', onScroll)
    }
  }, [shouldSuppress, pathname])

  useEffect(() => {
    if (!eligible || shouldSuppress || dismissedRecently()) return
    const timer = window.setTimeout(() => setOpen(true), 250)
    return () => window.clearTimeout(timer)
  }, [eligible, shouldSuppress])

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
    setOpen(false)
  }

  if (!open) return null

  return (
    <aside
      className="fixed inset-x-3 bottom-[calc(8.75rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-md rounded-lg border border-amber-200 bg-white p-4 shadow-2xl shadow-stone-950/20 md:inset-x-auto md:bottom-6 md:left-6 md:mx-0 md:w-[23rem]"
      aria-label="Studio37 consultation help"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 top-3 rounded-full p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
        aria-label="Close consultation help popup"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="pr-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">Planning Help</p>
        <h2 className="mt-2 text-2xl font-bold leading-tight text-stone-950">Need a little help choosing?</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Tell us what you&apos;re planning, and we&apos;ll help sort out the right coverage, timing, and next step.
        </p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-1">
        <Link
          href="/book-consultation?source=help-popup"
          onClick={dismiss}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Book a Free Consultation
        </Link>
        <Link
          href="/tools/package-recommender?source=help-popup"
          onClick={dismiss}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
        >
          <PackageSearch className="h-4 w-4" aria-hidden="true" />
          Compare Packages
        </Link>
      </div>

      <p className="mt-3 text-xs leading-5 text-stone-500">
        5.0 rated across Google and Thumbtack. No pressure, just planning help.
      </p>
    </aside>
  )
}
