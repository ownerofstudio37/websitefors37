import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Huntsville TX - Studio37 Photography',
  description:
    'Professional photographer in Huntsville, Texas for weddings, portraits, engagement, event, and commercial photography with transparent pricing.',
  keywords: [
    'photographer Huntsville TX',
    'wedding photographer Huntsville Texas',
    'portrait photographer Huntsville TX',
    'event photographer Huntsville TX',
    'commercial photographer Huntsville TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-huntsville-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerHuntsvillePage() {
  return (
    <LocalPhotographerCityPage
      city="Huntsville"
      stateAbbr="TX"
      county="Walker County"
      slug="local-photographer-huntsville-tx"
      nearbyCities={['Willis, TX', 'Conroe, TX', 'Montgomery, TX', 'Pinehurst, TX', 'The Woodlands, TX', 'College Station, TX']}
      heroImage="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=1200&h=600&fit=crop"
    />
  )
}
