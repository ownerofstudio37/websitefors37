'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const LazyQuoteAbandonmentCapture = dynamic(() => import('@/components/QuoteAbandonmentCapture'), {
  ssr: false,
  loading: () => null,
})

const eligiblePrefixes = [
  '/book-a-session',
  '/get-quote',
  '/tools/pricing',
  '/tools/package-recommender',
  '/services/concierge-services',
  '/services/engagement-session',
]

export default function QuoteCaptureMount() {
  const pathname = usePathname()
  const [ready, setReady] = React.useState(false)
  const isEligible = eligiblePrefixes.some((prefix) => pathname?.startsWith(prefix))

  React.useEffect(() => {
    if (!isEligible) return

    let timeout: ReturnType<typeof setTimeout> | undefined
    if ('requestIdleCallback' in window) {
      ;(window as Window & { requestIdleCallback: (callback: () => void, options?: { timeout: number }) => void }).requestIdleCallback(
        () => setReady(true),
        { timeout: 2500 }
      )
    } else {
      timeout = setTimeout(() => setReady(true), 1800)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isEligible])

  if (!isEligible || !ready) return null
  return <LazyQuoteAbandonmentCapture />
}
