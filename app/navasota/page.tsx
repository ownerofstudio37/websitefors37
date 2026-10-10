import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { cityMetaDescriptions, cityOgImage } from '@/lib/city-guides'

export const metadata = generateSEOMetadata({
  title: 'Photographer in Navasota, TX | Studio37',
  description: cityMetaDescriptions['navasota'],
  ogImage: cityOgImage('navasota'),
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
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
