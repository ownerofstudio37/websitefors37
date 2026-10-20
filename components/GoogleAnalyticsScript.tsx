"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

/**
 * Google Analytics 4.
 *
 * The gtag queue must receive the `arguments` object exactly like Google's snippet: GA ignores plain
 * arrays, which is why the previous `(...args) => dataLayer.push(args)` version sent nothing. window.gtag
 * is defined right away so events fired before the script loads (lib/analytics.ts) are queued, not lost.
 *
 * Page views: config sends the first one; GA4's enhanced measurement ("page changes based on browser
 * history events", on by default) counts client-side navigations, so nothing else sends page_view.
 * The library itself loads after the page (lazyOnload) to keep it off the critical path.
 */
export default function GoogleAnalyticsScript() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-5NTFJK2GH8"
  const [canLoad, setCanLoad] = useState(false)

  useEffect(() => {
    const dnt = (navigator as any).doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack
    if (dnt === "1" || dnt === "yes") return
    const w = window as any
    w.dataLayer = w.dataLayer || []
    if (typeof w.gtag !== "function") {
      w.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer.push(arguments)
      }
      w.gtag("js", new Date())
      w.gtag("config", GA_ID)
    }
    setCanLoad(true)
  }, [GA_ID])

  if (!canLoad) return null
  return <Script id="ga4-src" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
}
