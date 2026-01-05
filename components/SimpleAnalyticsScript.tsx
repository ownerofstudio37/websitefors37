"use client"

import Script from 'next/script'

// Lightweight wrapper to load SimpleAnalytics with graceful onError handling
export default function SimpleAnalyticsScript() {
  // Only load in production
  if (process.env.NODE_ENV !== 'production') return null

  return (
    <>
      <Script
        id="simple-analytics"
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        strategy="lazyOnload"
        onError={(e) => {
          // Don't let analytics failures break the app
          // eslint-disable-next-line no-console
          console.warn('SimpleAnalytics script failed to load:', e)
        }}
      />
      <Script
        id="simple-analytics-auto"
        src="https://scripts.simpleanalyticscdn.com/auto-events.js"
        strategy="lazyOnload"
        onError={(e) => {
          // eslint-disable-next-line no-console
          console.warn('SimpleAnalytics auto-events failed to load:', e)
        }}
      />
    </>
  )
}
