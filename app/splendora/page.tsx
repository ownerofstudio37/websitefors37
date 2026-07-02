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
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
