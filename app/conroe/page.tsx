import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Conroe TX - Studio37 Photography',
  description:
    'Professional photographer in Conroe, Texas for weddings, portraits, engagement sessions, events, and commercial photography. Serving Montgomery County.',
  keywords: [
    'photographer Conroe TX',
    'wedding photographer Conroe Texas',
    'portrait photographer Conroe TX',
    'event photography Conroe TX',
    'commercial photographer Conroe',
  ],
  canonicalUrl: 'https://www.studio37.cc/conroe',
  pageType: 'service',
})

export const revalidate = 86400

export default function ConroePage() {
  return (
    <LocalPhotographerCityPage
      city="Conroe"
      stateAbbr="TX"
      county="Montgomery County"
      slug="conroe"
      nearbyCities={['Pinehurst, TX', 'The Woodlands, TX', 'Spring, TX', 'Tomball, TX', 'Magnolia, TX', 'Montgomery, TX']}
      heroImage="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=600&fit=crop"
    />
  )
}
