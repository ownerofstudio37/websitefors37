import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'College Station TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in College Station, TX? Studio37 provides Aggie wedding, portrait, graduation, event, and commercial photography near Texas A&M.',
  keywords: [
    'photographer College Station TX',
    'wedding photographer College Station Texas',
    'Aggie wedding photographer',
    'portrait photographer College Station TX',
    'graduation photographer College Station TX',
    'event photography College Station TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/college-station',
  pageType: 'service',
})

export const revalidate = 86400

export default function CollegeStationPage() {
  return (
    <LocalPhotographerCityPage
      city="College Station"
      stateAbbr="TX"
      county="Brazos County"
      slug="college-station"
      nearbyCities={['Bryan, TX', 'Navasota, TX', 'Huntsville, TX', 'Montgomery, TX', 'Conroe, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
