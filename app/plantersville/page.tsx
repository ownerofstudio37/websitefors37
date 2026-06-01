import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Plantersville TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Plantersville, TX? Studio37 specializes in ranch and barn weddings, outdoor portraits, and event photography in Grimes County.',
  keywords: [
    'photographer Plantersville TX',
    'wedding photographer Plantersville Texas',
    'ranch wedding photographer Plantersville',
    'barn wedding photographer Texas',
    'portrait photographer Plantersville TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/plantersville',
  pageType: 'service',
})

export const revalidate = 86400

export default function PlantersvillePage() {
  return (
    <LocalPhotographerCityPage
      city="Plantersville"
      stateAbbr="TX"
      county="Grimes County"
      slug="plantersville"
      nearbyCities={['Magnolia, TX', 'Navasota, TX', 'Conroe, TX', 'Pinehurst, TX', 'Montgomery, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=600&fit=crop"
    />
  )
}
