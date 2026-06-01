import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Splendora TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Splendora, TX? Studio37 provides wedding, portrait, event, and commercial photography along the US-59 corridor.',
  keywords: [
    'photographer Splendora TX',
    'wedding photographer Splendora Texas',
    'portrait photographer Splendora TX',
    'event photography Splendora TX',
    'commercial photographer Splendora TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/splendora',
  pageType: 'service',
})

export const revalidate = 86400

export default function SplendoraPage() {
  return (
    <LocalPhotographerCityPage
      city="Splendora"
      stateAbbr="TX"
      county="Montgomery County"
      slug="splendora"
      nearbyCities={['New Caney, TX', 'Cleveland, TX', 'Porter, TX', 'Conroe, TX', 'Humble, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&h=600&fit=crop"
    />
  )
}
