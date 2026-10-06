"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const LazyChatBot = dynamic(() => import('@/components/EnhancedChatBot'), {
  ssr: false,
  loading: () => null,
})

export const OPEN_CHAT_EVENT = 'studio37:open-chat'

export default function ChatBotMount() {
  const [ready, setReady] = React.useState(false)
  const [openSignal, setOpenSignal] = React.useState(0)
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

  // The mobile quick-action bar dispatches this; load the widget if needed and open it.
  React.useEffect(() => {
    if (hidden) return
    const onOpenRequest = () => {
      setReady(true)
      setOpenSignal((count) => count + 1)
    }
    window.addEventListener(OPEN_CHAT_EVENT, onOpenRequest)
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpenRequest)
  }, [hidden])

  return !hidden && ready ? <LazyChatBot openSignal={openSignal} /> : null
}
