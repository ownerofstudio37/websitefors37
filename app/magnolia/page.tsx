import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Magnolia TX Photography Service Area - Studio37',
  description:
    'Magnolia photography service area guide for Studio37 rustic weddings, outdoor portraits, events, and local business branding sessions.',
  keywords: [
    'photographer Magnolia TX',
    'wedding photographer Magnolia Texas',
    'portrait photographer Magnolia TX',
    'event photography Magnolia TX',
    'commercial photographer Magnolia TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/magnolia',
  pageType: 'service',
})

export const revalidate = 86400

export default function MagnoliaPage() {
  return (
    <LocalPhotographerCityPage
      city="Magnolia"
      stateAbbr="TX"
      county="Montgomery County"
      slug="magnolia"
      nearbyCities={['Pinehurst, TX', 'The Woodlands, TX', 'Tomball, TX', 'Conroe, TX', 'Spring, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
