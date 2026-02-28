/**
 * Google Analytics 4 Event Tracking Utility
 * Simplified event tracking for Studio37 website
 */

type EventName = 
  | 'form_submit'
  | 'gallery_view'
  | 'video_watch'
  | 'booking_click'
  | 'lead_captured'
  | 'contact_opened'
  | 'newsletter_signup'
  | 'social_share'
  | 'page_scroll'
  | 'video_play'
  | 'image_gallery_open'

interface EventParams {
  [key: string]: string | number | boolean | undefined
}

/**
 * Track custom event in Google Analytics 4
 * Automatically includes session ID and timestamp
 */
export function trackEvent(eventName: EventName, params?: EventParams) {
  try {
    // Access global gtag function (set up by GoogleAnalyticsScript)
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, {
        ...params,
        timestamp: new Date().toISOString(),
        page_location: window.location.href,
        page_title: document.title,
      })
    } else {
      console.debug(`[GA4] Event tracked: ${eventName}`, params)
    }
  } catch (error) {
    console.error('Error tracking GA4 event:', error)
  }
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, fields?: string[]) {
  trackEvent('form_submit', {
    form_name: formName,
    field_count: fields?.length || 0,
    fields: fields?.join(',')
  })
}

/**
 * Track gallery view
 */
export function trackGalleryView(galleryName?: string, imageCount?: number) {
  trackEvent('gallery_view', {
    gallery_name: galleryName || 'unknown',
    image_count: imageCount
  })
}

/**
 * Track video play
 */
export function trackVideoPlay(videoTitle: string, platform?: string) {
  trackEvent('video_play', {
    video_title: videoTitle,
    platform: platform || 'youtube'
  })
}

/**
 * Track video watch milestone (25%, 50%, 75%, 100%)
 */
export function trackVideoMilestone(videoTitle: string, percentage: number) {
  trackEvent('video_watch', {
    video_title: videoTitle,
    watch_percentage: percentage
  })
}

/**
 * Track booking button click
 */
export function trackBookingClick(bookingType?: string) {
  trackEvent('booking_click', {
    booking_type: bookingType || 'consultation'
  })
}

/**
 * Track lead capture (form submission with email)
 */
export function trackLeadCapture(source: string, serviceInterest?: string) {
  trackEvent('lead_captured', {
    lead_source: source,
    service_interest: serviceInterest || 'general',
    timestamp: new Date().toISOString()
  })
}

/**
 * Track contact page opens
 */
export function trackContactOpened() {
  trackEvent('contact_opened', {
    contact_method: 'web_form'
  })
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup() {
  trackEvent('newsletter_signup', {
    signup_source: 'website'
  })
}

/**
 * Track social share
 */
export function trackSocialShare(platform: string, contentType?: string) {
  trackEvent('social_share', {
    social_platform: platform,
    content_type: contentType || 'unknown'
  })
}

/**
 * Track page scroll depth
 */
export function trackScrollDepth(depth: 'top' | '25%' | '50%' | '75%' | 'bottom') {
  trackEvent('page_scroll', {
    scroll_depth: depth
  })
}

/**
 * Track image gallery lightbox open
 */
export function trackImageGalleryOpen(galleryName?: string) {
  trackEvent('image_gallery_open', {
    gallery_name: galleryName || 'default'
  })
}

/**
 * Setup scroll depth tracking on page load
 * Tracks when user scrolls to 25%, 50%, 75%, and bottom of page
 */
export function setupScrollDepthTracking() {
  if (typeof window === 'undefined') return

  let tracked = { '25%': false, '50%': false, '75%': false, bottom: false }

  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

    if (scrollPercentage >= 25 && !tracked['25%']) {
      trackScrollDepth('25%')
      tracked['25%'] = true
    }
    if (scrollPercentage >= 50 && !tracked['50%']) {
      trackScrollDepth('50%')
      tracked['50%'] = true
    }
    if (scrollPercentage >= 75 && !tracked['75%']) {
      trackScrollDepth('75%')
      tracked['75%'] = true
    }
    if (scrollPercentage >= 95 && !tracked.bottom) {
      trackScrollDepth('bottom')
      tracked.bottom = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

/**
 * Setup video view tracking with intersection observer
 * Tracks when videos become visible in viewport
 */
export function setupVideoElementTracking() {
  if (typeof window === 'undefined') return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.tagName === 'IFRAME') {
        const iframe = entry.target as HTMLIFrameElement
        const videoTitle = iframe.title || 'embedded_video'
        trackVideoPlay(videoTitle, 'youtube')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  // Observe all iframes (YouTube embeds)
  document.querySelectorAll('iframe[src*="youtube"]').forEach(iframe => {
    observer.observe(iframe)
  })

  return () => {
    observer.disconnect()
  }
}

/**
 * Setup image gallery tracking
 * Tracks when lightbox/gallery is opened
 */
export function setupGalleryTracking(gallerySelector: string = '[data-gallery]') {
  if (typeof window === 'undefined') return

  const galleries = document.querySelectorAll(gallerySelector)
  
  galleries.forEach(gallery => {
    gallery.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' || target.closest('[data-gallery-item]')) {
        const galleryName = gallery.getAttribute('data-gallery-name') || 'gallery'
        trackImageGalleryOpen(galleryName)
      }
    })
  })
}
