import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Montgomery TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Montgomery, TX? Studio37 provides wedding, portrait, engagement, event, and commercial photography near Lake Conroe with transparent pricing.',
  keywords: [
    'photographer Montgomery TX',
    'wedding photographer Montgomery Texas',
    'portrait photographer Montgomery TX',
    'event photography Montgomery TX',
    'Lake Conroe wedding photographer',
    'commercial photographer Montgomery TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/montgomery',
  pageType: 'service',
})

export const revalidate = 86400

export default function MontgomeryPage() {
  return (
    <LocalPhotographerCityPage
      city="Montgomery"
      stateAbbr="TX"
      county="Montgomery County"
      slug="montgomery"
      nearbyCities={['Pinehurst, TX', 'Conroe, TX', 'Magnolia, TX', 'The Woodlands, TX', 'Spring, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop"
    />
  )
}
