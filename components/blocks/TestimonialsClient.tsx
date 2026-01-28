'use client'

import React from 'react'

type Testimonial = {
  quote: string
  author?: string
  subtext?: string
  avatar?: string
  source?: string
  sourceLink?: string
  rating?: number
}

export default function TestimonialsClient({ testimonials = [] as Testimonial[] }) {
  const [idx, setIdx] = React.useState(0)
  const count = testimonials.length

  React.useEffect(() => {
    if (count < 2) return
    const id = setInterval(() => setIdx((i) => (i + 1) % count), 5000)
    return () => clearInterval(id)
  }, [count])

  if (!count) return null

  const t = testimonials[idx]
  return (
    <div className="max-w-3xl mx-auto text-center">
      {t.avatar && (
        <img src={t.avatar} alt={t.author || 'Client'} className="mx-auto h-16 w-16 rounded-full object-cover mb-4" />
      )}      
      {/* Star Rating */}
      {t.rating && (
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < t.rating! ? 'text-yellow-400' : 'text-gray-300'}>★</span>
          ))}
        </div>
      )}
            <blockquote className="text-xl italic text-gray-800">“{t.quote}”</blockquote>
      {(t.author || t.subtext || t.source) && (
        <div className="mt-3 text-gray-600">
          {t.author && <div className="font-medium">{t.author}</div>}
          {t.subtext && <div className="text-sm opacity-80">{t.subtext}</div>}
          {t.source && t.sourceLink && (
            <a 
              href={t.sourceLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full hover:bg-blue-200 transition-colors"
            >
              From {t.source}
            </a>
          )}
        </div>
      )}
      {count > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-2 w-2 rounded-full transition-colors ${i === idx ? 'bg-primary-600' : 'bg-gray-300 hover:bg-gray-400'}`} aria-label={`Show testimonial ${i+1}`} />
          ))}
        </div>
      )}
    </div>
  )
}
