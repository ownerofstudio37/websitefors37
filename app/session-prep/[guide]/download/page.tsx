import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import PrepGuideDownloadForm from '@/components/PrepGuideDownloadForm'
import { prepGuideDownloads, PrepGuideKey } from '@/lib/public-content'
import { generateSEOMetadata } from '@/lib/seo-helpers'

const guideKeys = Object.keys(prepGuideDownloads) as PrepGuideKey[]

function isGuide(value: string): value is PrepGuideKey {
  return guideKeys.includes(value as PrepGuideKey)
}

export function generateStaticParams() {
  return guideKeys.map((guide) => ({ guide }))
}

export function generateMetadata({ params }: { params: { guide: string } }) {
  if (!isGuide(params.guide)) {
    return generateSEOMetadata({
      title: 'Prep Guide Not Found | Studio37',
      description: 'The requested Studio37 prep guide could not be found.',
      canonicalUrl: 'https://www.studio37.cc/session-prep',
    })
  }

  const guide = prepGuideDownloads[params.guide]
  return generateSEOMetadata({
    title: `${guide.title} Download | Studio37`,
    description: guide.summary,
    canonicalUrl: `https://www.studio37.cc/session-prep/${params.guide}/download`,
    pageType: 'service',
  })
}

export default function PrepGuideDownloadPage({ params }: { params: { guide: string } }) {
  if (!isGuide(params.guide)) notFound()
  const guide = prepGuideDownloads[params.guide]

  return (
    <main className="min-h-screen bg-stone-50 pt-20">
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link href="/session-prep" className="inline-flex items-center text-sm font-semibold text-amber-800 hover:text-amber-900">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to session prep
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow mb-3">Downloadable Prep Guide</p>
              <h1 className="text-4xl font-bold text-stone-950 md:text-5xl">{guide.title}</h1>
              <p className="mt-4 text-lg leading-8 text-stone-600">{guide.summary}</p>
              <ul className="mt-6 space-y-3">
                {guide.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-stone-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-700" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <PrepGuideDownloadForm guide={params.guide} />
          </div>
        </div>
      </section>
    </main>
  )
}
