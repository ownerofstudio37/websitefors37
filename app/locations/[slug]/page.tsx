import { notFound } from 'next/navigation'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { getLocationBySlug, locationPages, locationSlugs } from '@/lib/location-pages'
import { getPageConfigs, getPageLayout, selectProps } from '@/lib/pageConfigs'
import LocationPageTemplate from '@/components/LocationPageTemplate'

export const revalidate = 86400

export function generateStaticParams() {
  return locationSlugs.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const location = getLocationBySlug(params.slug)
  if (!location) {
    return generateSEOMetadata({
      title: 'Location Not Found',
      description: 'The requested location page could not be found.',
      canonicalUrl: 'https://www.studio37.cc/locations',
    })
  }

  return generateSEOMetadata({
    title: `${location.city} TX Photographer Services`,
    description: `Studio37 provides wedding, portrait, event, and commercial photography in ${location.city}, Texas (${location.county}). Two-photographer coverage, local expertise, and fast delivery.`,
    keywords: [
      `${location.city} photographer`,
      `${location.city} wedding photographer`,
      `${location.city} portrait photographer`,
      `${location.city} event photography`,
      `${location.city} commercial photography`,
    ],
    canonicalUrl: `https://www.studio37.cc/${location.slug.replace(/-tx$/, '')}`,
    pageType: 'service',
  })
}

export default async function LocationPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: Record<string, string | string[]>
}) {
  const location = getLocationBySlug(params.slug)
  if (!location) notFound()

  const currentPath = `/locations/${params.slug}`
  const useDraft = searchParams?.edit === '1'

  // Builder-first: if a visual layout exists for this path, render it.
  const [configs, layout] = await Promise.all([
    getPageConfigs(currentPath),
    getPageLayout(currentPath, useDraft),
  ])

  if (layout && Array.isArray(layout.blocks) && layout.blocks.length > 0) {
    const { MDXBuilderComponents } = await import('@/components/BuilderRuntime')
    const EditableChrome = (await import('@/components/editor/EditableChrome')).default

    return (
      <div className="min-h-screen">
        {layout.blocks.map((blk, i) => {
          const Comp: any = (MDXBuilderComponents as any)[blk.type]
          if (!Comp) return null
          const override = blk.id ? configs.get(blk.id) : undefined

          return (
            <div key={blk.id || i} className="relative">
              <EditableChrome
                label={String(blk.type)
                  .replace(/Block$/, '')
                  .replace(/([a-z])([A-Z])/g, '$1 $2')}
                block={blk.type}
                anchorId={blk.id}
              />
              <Comp
                {...(blk.props || {})}
                _overrides={selectProps(override as any, useDraft)}
              />
            </div>
          )
        })}
      </div>
    )
  }

  const related = locationPages.filter((l) => l.slug !== location.slug).slice(0, 6)

  return <LocationPageTemplate location={location} related={related} />
}
