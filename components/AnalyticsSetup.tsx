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
    // Setup scroll depth tracking (25%, 50%, 75%, 100%)
    setupScrollDepthTracking()

    // Setup lazy tracking for video elements with data-track-video attribute
    setupVideoElementTracking()

    // Setup gallery click tracking using event delegation
    // Looks for elements with data-gallery-click attribute
    setupGalleryTracking('[data-gallery-click]')

    // Cleanup function to remove listeners on unmount
    return () => {
      // Listeners use passive mode, no cleanup needed for scroll
      // IntersectionObserver is disconnected by its own cleanup
      // Event listeners use capture phase, but listeners are page-scoped
    }
  }, [])

  return null // This component doesn't render anything
}
