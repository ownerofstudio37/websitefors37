import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Porter TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Porter, TX? Studio37 provides wedding, family portrait, event, and commercial photography in East Montgomery County.',
  keywords: [
    'photographer Porter TX',
    'wedding photographer Porter Texas',
    'portrait photographer Porter TX',
    'family photographer Porter TX',
    'event photography Porter TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/porter',
  pageType: 'service',
})

export const revalidate = 86400

export default function PorterPage() {
  return (
    <LocalPhotographerCityPage
      city="Porter"
      stateAbbr="TX"
      county="Montgomery County"
      slug="porter"
      nearbyCities={['New Caney, TX', 'Humble, TX', 'Spring, TX', 'Conroe, TX', 'Kingwood, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&h=600&fit=crop"
    />
  )
}
