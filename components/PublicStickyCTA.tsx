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

  if (hiddenPrefixes.some((prefix) => pathname?.startsWith(prefix))) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl md:hidden">
      <nav className="grid grid-cols-3" aria-label="Quick actions">
        <Link href="/book-consultation" className="flex min-h-[64px] flex-col items-center justify-center gap-1 px-2 text-center text-xs font-semibold text-stone-900">
          <Calendar className="h-5 w-5 text-amber-700" aria-hidden="true" />
          Book consult
        </Link>
        <Link href="/tools/pricing" className="flex min-h-[64px] flex-col items-center justify-center gap-1 border-x border-stone-200 px-2 text-center text-xs font-semibold text-stone-900">
          <Calculator className="h-5 w-5 text-amber-700" aria-hidden="true" />
          Price
        </Link>
        <Link href="/request-portfolio" className="flex min-h-[64px] flex-col items-center justify-center gap-1 px-2 text-center text-xs font-semibold text-stone-900">
          <ImageIcon className="h-5 w-5 text-amber-700" aria-hidden="true" />
          Galleries
        </Link>
      </nav>
    </div>
  )
}
