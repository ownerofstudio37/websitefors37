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
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
