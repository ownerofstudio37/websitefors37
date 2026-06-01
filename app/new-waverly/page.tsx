import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'New Waverly TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in New Waverly, TX? Studio37 provides wedding, portrait, event, and commercial photography along the I-45 corridor.',
  keywords: [
    'photographer New Waverly TX',
    'wedding photographer New Waverly Texas',
    'portrait photographer New Waverly TX',
    'event photography New Waverly TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/new-waverly',
  pageType: 'service',
})

export const revalidate = 86400

export default function NewWaverlyPage() {
  return (
    <LocalPhotographerCityPage
      city="New Waverly"
      stateAbbr="TX"
      county="Walker County"
      slug="new-waverly"
      nearbyCities={['Huntsville, TX', 'Willis, TX', 'Conroe, TX', 'Pinehurst, TX', 'Montgomery, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=600&fit=crop"
    />
  )
}
