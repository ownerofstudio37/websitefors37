'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const LazyConsultationHelpPopup = dynamic(() => import('@/components/ConsultationHelpPopup'), {
  ssr: false,
  loading: () => null,
})

const hiddenPrefixes = [
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

export default function ConsultationHelpPopupMount() {
  const pathname = usePathname()
  const [ready, setReady] = React.useState(false)
  const hidden = hiddenPrefixes.some((prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`))

  React.useEffect(() => {
    setReady(false)
    if (hidden) return

    let timeout: ReturnType<typeof setTimeout> | undefined

    const markReady = () => {
      setReady(true)
      window.removeEventListener('scroll', markReady)
      window.removeEventListener('pointerdown', markReady)
      window.removeEventListener('keydown', markReady)
    }

    if ('requestIdleCallback' in window) {
      ;(window as Window & { requestIdleCallback: (callback: () => void, options?: { timeout: number }) => void }).requestIdleCallback(
        markReady,
        { timeout: 2500 },
      )
    } else {
      timeout = setTimeout(markReady, 1800)
    }

    window.addEventListener('scroll', markReady, { passive: true, once: true })
    window.addEventListener('pointerdown', markReady, { once: true })
    window.addEventListener('keydown', markReady, { once: true })

    return () => {
      if (timeout) clearTimeout(timeout)
      window.removeEventListener('scroll', markReady)
      window.removeEventListener('pointerdown', markReady)
      window.removeEventListener('keydown', markReady)
    }
  }, [hidden, pathname])

  return !hidden && ready ? <LazyConsultationHelpPopup /> : null
}
