import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Pinehurst TX - Studio37 Photography',
  description:
    'Professional photographer in Pinehurst, Texas for weddings, portraits, engagement sessions, events, and commercial photography with transparent pricing.',
  keywords: [
    'photographer Pinehurst TX',
    'wedding photographer Pinehurst TX',
    'portrait photographer Pinehurst TX',
    'event photography Pinehurst TX',
    'commercial photographer Pinehurst TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/pinehurst',
  pageType: 'service',
})

export const revalidate = 86400

export default function PinehurstPage() {
  return (
    <LocalPhotographerCityPage
      city="Pinehurst"
      stateAbbr="TX"
      county="Montgomery County"
      slug="pinehurst"
      nearbyCities={['The Woodlands, TX', 'Spring, TX', 'Tomball, TX', 'Magnolia, TX', 'Conroe, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1554048612-b6a482b224b0?w=1200&h=600&fit=crop"
    />
  )
}
