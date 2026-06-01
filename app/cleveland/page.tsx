import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Cleveland TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Cleveland, TX? Studio37 provides wedding, family portrait, event, and commercial photography in Liberty County.',
  keywords: [
    'photographer Cleveland TX',
    'wedding photographer Cleveland Texas',
    'portrait photographer Cleveland TX',
    'family photographer Cleveland TX',
    'event photography Cleveland TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/cleveland',
  pageType: 'service',
})

export const revalidate = 86400

export default function ClevelandPage() {
  return (
    <LocalPhotographerCityPage
      city="Cleveland"
      stateAbbr="TX"
      county="Liberty County"
      slug="cleveland"
      nearbyCities={['Splendora, TX', 'New Caney, TX', 'Conroe, TX', 'Humble, TX', 'Kingwood, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop"
    />
  )
}
