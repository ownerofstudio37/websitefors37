"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const LazyChatBot = dynamic(() => import('@/components/EnhancedChatBot'), {
  ssr: false,
  loading: () => null,
})

export default function ChatBotMount() {
  const [ready, setReady] = React.useState(false)
  const pathname = usePathname()
  const hiddenPrefixes = ['/book-a-session', '/book-consultation', '/get-quote', '/tools/pricing', '/tools/package-recommender']
  const hidden = hiddenPrefixes.some((prefix) => pathname?.startsWith(prefix))

  React.useEffect(() => {
    if (hidden) return
    let timeout: any
    const onFirstInteract = () => {
      setReady(true)
      window.removeEventListener('scroll', onFirstInteract)
      window.removeEventListener('pointerdown', onFirstInteract)
      window.removeEventListener('keydown', onFirstInteract)
    }
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      (window as any).requestIdleCallback(() => setReady(true), { timeout: 3000 })
    } else {
      timeout = setTimeout(() => setReady(true), 2500)
    }
    window.addEventListener('scroll', onFirstInteract, { passive: true, once: true })
    window.addEventListener('pointerdown', onFirstInteract, { once: true })
    window.addEventListener('keydown', onFirstInteract, { once: true })
    return () => {
      if (timeout) clearTimeout(timeout)
      window.removeEventListener('scroll', onFirstInteract)
      window.removeEventListener('pointerdown', onFirstInteract)
      window.removeEventListener('keydown', onFirstInteract)
    }
  }, [hidden])

  return !hidden && ready ? <LazyChatBot /> : null
}
