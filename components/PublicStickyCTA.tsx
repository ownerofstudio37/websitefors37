'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, Calculator, Image as ImageIcon } from 'lucide-react'

const hiddenPrefixes = [
  '/admin',
  '/login',
  '/setup-admin',
  '/book-a-session',
  '/book-consultation',
  '/get-quote',
  '/tools/pricing',
  '/tools/package-recommender',
]

export default function PublicStickyCTA() {
  const pathname = usePathname()
  const actionClass = 'flex min-h-[64px] flex-col items-center justify-center gap-1 px-2 text-center text-xs font-semibold text-stone-900 transition-colors active:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-inset'

  if (hiddenPrefixes.some((prefix) => pathname?.startsWith(prefix))) {
    return null
  }

  return (
    <div data-mobile-nav-hide className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-200 md:hidden">
      <nav className="grid grid-cols-3" aria-label="Quick actions">
        <Link href="/book-consultation" aria-label="Book a Studio37 consultation" className={actionClass}>
          <Calendar className="h-5 w-5 text-amber-700" aria-hidden="true" />
          Book consult
        </Link>
        <Link href="/tools/pricing" aria-label="Open the Studio37 pricing tool" className={`${actionClass} border-x border-stone-200`}>
          <Calculator className="h-5 w-5 text-amber-700" aria-hidden="true" />
          Price
        </Link>
        <Link href="https://gallery.studio37.cc" aria-label="Open the featured Studio37 gallery" className={actionClass}>
          <ImageIcon className="h-5 w-5 text-amber-700" aria-hidden="true" />
          Galleries
        </Link>
      </nav>
    </div>
  )
}
