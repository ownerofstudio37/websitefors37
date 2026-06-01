import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Hockley TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Hockley, TX? Studio37 provides wedding, portrait, event, and commercial photography in Northwest Harris County.',
  keywords: [
    'photographer Hockley TX',
    'wedding photographer Hockley Texas',
    'portrait photographer Hockley TX',
    'event photography Hockley TX',
    'commercial photographer Hockley TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/hockley',
  pageType: 'service',
})

export const revalidate = 86400

export default function HockleyPage() {
  return (
    <LocalPhotographerCityPage
      city="Hockley"
      stateAbbr="TX"
      county="Harris County"
      slug="hockley"
      nearbyCities={['Tomball, TX', 'Magnolia, TX', 'Pinehurst, TX', 'Spring, TX', 'Waller, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&h=600&fit=crop"
    />
  )
}
