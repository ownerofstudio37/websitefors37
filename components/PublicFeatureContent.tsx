import Link from 'next/link'
import { Camera, Clock, MapPin, MessageSquare, Sparkles } from 'lucide-react'
import {
  ServiceKey,
  photoLocationIdeas,
  testimonialsByService,
  turnaroundByService,
  venueStyleExamples,
} from '@/lib/public-content'

export function BestPhotoLocationsSection({ slug, city }: { slug: string; city: string }) {
  const ideas = photoLocationIdeas[slug]
  if (!ideas) return null

  return (
    <section className="section-shell bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow mb-3">Location Planning</p>
          <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Best photo location ideas in {city}</h2>
          <p className="mt-3 text-stone-600">
            These are planning categories, not venue partnerships. We confirm access, parking, light, and timing before the session.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {ideas.map((idea) => (
            <article key={idea.name} className="rounded-lg border border-stone-200 bg-stone-50 p-5">
              <MapPin className="h-5 w-5 text-amber-800" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold text-stone-950">{idea.name}</h3>
              <p className="mt-1 text-sm font-medium text-amber-800">Best for {idea.bestFor}</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">{idea.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function VenueStyleExamplesSection({ type }: { type: 'wedding' | 'event' }) {
  const examples = venueStyleExamples[type]
  const title = type === 'wedding' ? 'Wedding venue styles we plan for' : 'Event space styles we plan for'

  return (
    <section className="section-shell bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow mb-3">Venue Planning</p>
          <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">{title}</h2>
          <p className="mt-3 text-stone-600">
            These examples describe the kinds of environments we photograph. They are planning references, not partner claims.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {examples.map((example) => (
            <article key={example.style} className="rounded-lg border border-stone-200 bg-stone-50 p-5">
              <Camera className="h-5 w-5 text-amber-800" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold text-stone-950">{example.style}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{example.examples}</p>
              <p className="mt-4 rounded-lg bg-white p-3 text-sm leading-6 text-stone-700">{example.planningNote}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TurnaroundExpectationsSection({ service }: { service: ServiceKey }) {
  const data = turnaroundByService[service]

  return (
    <section className="section-shell bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow mb-3">Delivery Expectations</p>
          <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Clear turnaround from preview to final gallery</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ['Sneak peeks', data.sneakPeek],
            ['Highlights', data.highlights],
            ['Final gallery', data.finalGallery],
            ['Rush options', data.rush],
          ].map(([label, copy]) => (
            <article key={label} className="rounded-lg border border-stone-200 bg-white p-5">
              <Clock className="h-5 w-5 text-amber-800" aria-hidden="true" />
              <h3 className="mt-3 font-semibold text-stone-950">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServiceTestimonialsSection({ service }: { service: ServiceKey }) {
  const testimonials = testimonialsByService[service]

  return (
    <section className="section-shell bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow mb-3">Client Proof</p>
          <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">What clients notice about this experience</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure key={`${testimonial.name}-${testimonial.context}`} className="rounded-lg border border-stone-200 bg-stone-50 p-6">
              <MessageSquare className="h-5 w-5 text-amber-800" aria-hidden="true" />
              <blockquote className="mt-4 text-lg leading-8 text-stone-800">&quot;{testimonial.quote}&quot;</blockquote>
              <figcaption className="mt-5 text-sm text-stone-600">
                <span className="font-semibold text-stone-950">{testimonial.name}</span> · {testimonial.context} · {testimonial.source}
              </figcaption>
            </figure>
          ))}
        </div>
        <Link href="/request-portfolio" className="btn-secondary mt-8 inline-flex items-center">
          Request finished galleries <Sparkles className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
