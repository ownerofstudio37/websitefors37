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
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
