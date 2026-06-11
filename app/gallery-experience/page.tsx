import Link from 'next/link'
import { ArrowRight, Download, Heart, Image, Lock, ShoppingBag, Share2 } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'

const galleryUrl = 'https://gallery.studio37.cc'

export const metadata = generateSEOMetadata({
  title: 'Gallery Experience | Studio37',
  description: 'Learn how Studio37 client galleries work through ShootProof, including downloads, favorites, sharing, print options, and private access.',
  canonicalUrl: 'https://www.studio37.cc/gallery-experience',
})

export default function GalleryExperiencePage() {
  const features = [
    { icon: Lock, title: 'Private access', copy: 'Client galleries open on ShootProof with secure access and delivery controls.' },
    { icon: Download, title: 'Easy downloads', copy: 'Download final edited images according to your package and gallery permissions.' },
    { icon: Heart, title: 'Favorites', copy: 'Mark favorites for selections, albums, print decisions, or follow-up requests.' },
    { icon: Share2, title: 'Sharing', copy: 'Share gallery links with family, teams, vendors, or collaborators.' },
    { icon: ShoppingBag, title: 'Print options', copy: 'Use built-in print ordering options when available for your gallery.' },
    { icon: Image, title: 'Full-gallery view', copy: 'Browse the polished final gallery standard before and after your session.' },
  ]

  return (
    <main className="min-h-screen bg-white pt-20">
      <section className="bg-stone-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow-hero mb-3">ShootProof Gallery Handoff</p>
          <h1 className="text-4xl font-bold md:text-5xl">Your final gallery opens on ShootProof</h1>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            Studio37 uses gallery.studio37.cc for client gallery delivery, downloads, favorites, sharing, and print options.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={galleryUrl} className="btn-primary inline-flex items-center justify-center">
              Open Gallery Site <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/book-a-session" className="btn-secondary inline-flex items-center justify-center">
              Book a Session
            </Link>
          </div>
        </div>
      </section>
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-lg border border-stone-200 bg-white p-5">
                <Icon className="mb-4 h-6 w-6 text-amber-800" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-stone-950">{title}</h2>
                <p className="mt-2 leading-7 text-stone-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
