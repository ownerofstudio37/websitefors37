'use client'

import { useEffect } from 'react'
import { setupScrollDepthTracking, setupVideoElementTracking, setupGalleryTracking } from '@/lib/analytics'

/**
 * Client component to initialize analytics tracking on page load.
 * Sets up scroll depth tracking, video element tracking, and gallery tracking.
 * Placed in layout to ensure tracking is active across all pages.
 */
export default function AnalyticsSetup() {
  useEffect(() => {
    let cancelled = false
    let idleId: number | null = null
    let timeoutId: number | null = null
    let initialized = false

    let cleanupScroll: (() => void) | void
    let cleanupVideo: (() => void) | void
    let cleanupGallery: (() => void) | void

    const initTracking = () => {
      if (cancelled || initialized) return
      initialized = true
      // Setup scroll depth tracking (25%, 50%, 75%, 100%)
      cleanupScroll = setupScrollDepthTracking()

      // Setup lazy tracking for video elements with data-track-video attribute
      cleanupVideo = setupVideoElementTracking()

      // Setup gallery click tracking using event delegation
      // Looks for elements with data-gallery-click attribute
      cleanupGallery = setupGalleryTracking('[data-gallery-click]')
    }

    const kickOff = () => {
      // @ts-ignore requestIdleCallback is not in all TS lib targets
      if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
        // @ts-ignore
        idleId = window.requestIdleCallback(initTracking, { timeout: 3000 })
      } else {
        // Small delay to avoid competing with LCP-critical work
        timeoutId = window.setTimeout(initTracking, 1200)
      }
    }

    const onFirstInteraction = () => {
      kickOff()
      window.removeEventListener('pointerdown', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
      window.removeEventListener('scroll', onFirstInteraction)
    }

    // Initialize on first interaction or idle, whichever comes first
    window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true })
    window.addEventListener('keydown', onFirstInteraction, { once: true })
    window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true })
    kickOff()

    return () => {
      cancelled = true
      if (idleId !== null) {
        // @ts-ignore
        if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId)
      }
      if (timeoutId !== null) window.clearTimeout(timeoutId)
      window.removeEventListener('pointerdown', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
      window.removeEventListener('scroll', onFirstInteraction)
      if (typeof cleanupScroll === 'function') cleanupScroll()
      if (typeof cleanupVideo === 'function') cleanupVideo()
      if (typeof cleanupGallery === 'function') cleanupGallery()
    }
  }, [])

  return null // This component doesn't render anything
}
