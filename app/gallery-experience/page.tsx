import Link from 'next/link'
import { ArrowRight, Download, Heart, Image, Lock, ShoppingBag, Share2 } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'

const galleryUrl = 'https://gallery.studio37.cc'

export const metadata = generateSEOMetadata({
  title: 'Gallery Experience | Studio37',
  description: 'Learn how Studio37 shares featured public work and private complete galleries through tailored portfolio requests and ShootProof delivery.',
  canonicalUrl: 'https://www.studio37.cc/gallery-experience',
})

export default function GalleryExperiencePage() {
  const features = [
    { icon: Lock, title: 'Private access', copy: 'Complete client galleries are shared privately when they match your project type and planning needs.' },
    { icon: Download, title: 'Easy downloads', copy: 'Download final edited images according to your package and gallery permissions.' },
    { icon: Heart, title: 'Favorites', copy: 'Mark favorites for selections, albums, print decisions, or follow-up requests.' },
    { icon: Share2, title: 'Sharing', copy: 'Private examples can be sent for weddings, portraits, events, commercial work, or specific local planning questions.' },
    { icon: ShoppingBag, title: 'Print options', copy: 'Use built-in print ordering options when available for your gallery.' },
    { icon: Image, title: 'Featured public work', copy: 'The public gallery is a small best-of preview. Complete galleries are shared through the portfolio request flow.' },
  ]

  return (
    <main className="min-h-screen bg-white pt-20">
      <section className="bg-stone-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow-hero mb-3">Featured Work + Private Galleries</p>
          <h1 className="text-4xl font-bold md:text-5xl">A curated public preview, with complete galleries by request</h1>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            Studio37 keeps gallery.studio37.cc as a cream-of-the-crop public showcase. If you want to review a complete gallery or a tailored portfolio for your project type, request one and we&apos;ll send the right private examples.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={galleryUrl} className="btn-primary inline-flex items-center justify-center">
              View Featured Work <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/request-portfolio" className="btn-secondary inline-flex items-center justify-center">
              Request Complete Galleries
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
