"use client"

import { useEffect, useState } from 'react'
import Script from 'next/script'

// Lightweight wrapper to load SimpleAnalytics with graceful onError handling
export default function SimpleAnalyticsScript() {
  const [canLoad, setCanLoad] = useState(false)

  useEffect(() => {
    if (typeof navigator === 'undefined') return
    const dnt = (navigator as any).doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack
    setCanLoad(!(dnt === '1' || dnt === 'yes'))
  }, [])

  // Only load in production
  if (process.env.NODE_ENV !== 'production' || !canLoad) return null

  return (
    <>
      <Script
        id="simple-analytics"
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        strategy="lazyOnload"
        onError={() => {
          // Silently fail - analytics should never break the app
          // Script may be blocked by adblockers or network issues
        }}
      />
      <Script
        id="simple-analytics-auto"
        src="https://scripts.simpleanalyticscdn.com/auto-events.js"
        strategy="lazyOnload"
        onError={() => {
          // Silently fail - analytics should never break the app
        }}
      />
    </>
  )
}
