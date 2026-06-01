import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'New Caney TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in New Caney, TX? Studio37 provides wedding, family portrait, event, and commercial photography in East Montgomery County.',
  keywords: [
    'photographer New Caney TX',
    'wedding photographer New Caney Texas',
    'portrait photographer New Caney TX',
    'family photographer New Caney TX',
    'event photography New Caney TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/new-caney',
  pageType: 'service',
})

export const revalidate = 86400

export default function NewCaneyPage() {
  return (
    <LocalPhotographerCityPage
      city="New Caney"
      stateAbbr="TX"
      county="Montgomery County"
      slug="new-caney"
      nearbyCities={['The Woodlands, TX', 'Spring, TX', 'Conroe, TX', 'Pinehurst, TX', 'Porter, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&h=600&fit=crop"
    />
  )
}
