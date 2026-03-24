import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Pinehurst TX - Studio37 Photography Montgomery County',
  description: 'Professional photographer in Pinehurst, Texas serving Montgomery County. Wedding, portrait, engagement, event, and commercial photography with transparent pricing and local expertise.',
  keywords: [
    'photographer Pinehurst TX',
    'photography Pinehurst Texas',
    'wedding photographer Montgomery County',
    'family photographer The Woodlands',
    'professional photographer near me',
    'Pinehurst photography studio',
    'Montgomery County photographer',
    'Texas photography services',
    'local photographer Pinehurst',
    'portrait photographer Texas'
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-pinehurst-tx',
  pageType: 'service'
})

export default function LocalPhotographerPage() {
  return (
    <LocalPhotographerCityPage
      city="Pinehurst"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-pinehurst-tx"
      nearbyCities={['The Woodlands, TX', 'Spring, TX', 'Tomball, TX', 'Magnolia, TX', 'Conroe, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1554048612-b6a482b224b0?w=1200&h=600&fit=crop"
    />
  )
}