import { Users } from 'lucide-react'

export default function BookingTrustProof() {
  const items = [
    '5.0 stars from verified Google and Thumbtack reviews',
    'PPA member and insured',
    'Two-photographer coverage on every session',
    'Clear delivery timelines and gallery handoff',
  ]

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber-950">
        <Users className="h-4 w-4" aria-hidden="true" />
        Booking with confidence
      </p>
      <div className="grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-lg bg-white px-3 py-2">{item}</div>
        ))}
      </div>
    </div>
  )
}
