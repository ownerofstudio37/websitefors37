import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Houston TX Photography Service Area - Studio37',
  description:
    'Houston photography service area guide for Studio37 portraits, events, commercial branding, and wedding coverage across Greater Houston.',
  keywords: [
    'photographer Houston TX',
    'wedding photographer Houston Texas',
    'portrait photographer Houston TX',
    'event photography Houston TX',
    'commercial photographer Houston TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/houston',
  pageType: 'service',
})

export const revalidate = 86400

export default function HoustonPage() {
  return (
    <LocalPhotographerCityPage
      city="Houston"
      stateAbbr="TX"
      county="Harris County"
      slug="houston"
      nearbyCities={['The Woodlands, TX', 'Spring, TX', 'Conroe, TX', 'Tomball, TX', 'Pinehurst, TX', 'Katy, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
