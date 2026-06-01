import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Navasota TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Navasota, TX? Studio37 provides wedding, portrait, event, and commercial photography in the Brazos Valley gateway corridor.',
  keywords: [
    'photographer Navasota TX',
    'wedding photographer Navasota Texas',
    'portrait photographer Navasota TX',
    'event photography Navasota TX',
    'commercial photographer Navasota TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/navasota',
  pageType: 'service',
})

export const revalidate = 86400

export default function NavasotaPage() {
  return (
    <LocalPhotographerCityPage
      city="Navasota"
      stateAbbr="TX"
      county="Grimes County"
      slug="navasota"
      nearbyCities={['Plantersville, TX', 'Bryan, TX', 'College Station, TX', 'Magnolia, TX', 'Montgomery, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1518982380512-5a3b5e9b5c3a?w=1200&h=600&fit=crop"
    />
  )
}
