import { Star } from 'lucide-react'
import type { studio37Reviews } from '@/lib/public-content'

type Review = (typeof studio37Reviews)[number]

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6">
      <div className="mb-3 flex gap-1 text-amber-500" role="img" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="flex-1 leading-7 text-stone-700">&ldquo;{review.quote}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-stone-900">
        {review.name} <span className="font-normal text-stone-500">· {review.detail}</span>
      </figcaption>
    </figure>
  )
}
