import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Wedding Photographer Navasota TX - Studio37 Photography',
  description:
    'Wedding photographer in Navasota, TX. Studio37 covers ceremonies in the Railroad District, heritage venues, and Brazos Valley gateway corridor.',
  keywords: [
    'wedding photographer Navasota TX',
    'wedding photography Navasota Texas',
    'Navasota TX wedding venues photographer',
    'Brazos Valley wedding photographer',
    'wedding photographer near Navasota TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/wedding-photographer-navasota-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function WeddingPhotographerNavasotaPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Wedding Photography"
      city="Navasota"
      stateAbbr="TX"
      county="Grimes County"
      pageUrl="https://www.studio37.cc/wedding-photographer-navasota-tx"
      serviceUrl="https://www.studio37.cc/services/wedding-photography"
      startingPrice="$1,200"
      intro="Navasota, TX sits at the gateway between Montgomery County and the Brazos Valley — a charming community with historic Railroad District architecture, Washington Avenue heritage facades, and proximity to some of the most scenic ranch venues in Grimes County. Studio37 brings full wedding day coverage to Navasota with editorial-quality photography and our Signature Duo Coverage for complete ceremony and reception documentation."
      highlights={[
        { title: 'Railroad District Architecture', description: 'The historic Railroad District\'s brick facades and heritage storefronts create cinematic backdrops for couple portraits and bridal details.' },
        { title: 'Washington Avenue Heritage', description: 'Classic Texas architecture along Washington Avenue provides timeless, editorial-quality settings for formal wedding portraits.' },
        { title: 'Signature Duo Coverage', description: 'Two photographers on your wedding day — ceremony covered from both sides, candid guest moments, and complete reception coverage.' },
        { title: 'Ranch Venue Access', description: 'We work regularly at rural ranch venues throughout Grimes County, from intimate ceremony sites to large estate receptions.' },
      ]}
      faqs={[
        { question: 'What are the best wedding venue backdrops in Navasota, TX?', answer: 'The Railroad District and Washington Avenue offer our favorite architecture for formal portraits; nearby ranch venues provide dramatic outdoor ceremony settings.' },
        { question: 'How far in advance should I book?', answer: 'We recommend booking 6-9 months ahead for spring and fall weekends — Navasota\'s flexible scheduling means some off-peak dates are available closer to the date.' },
        { question: 'Do you cover outdoor ranch ceremonies in Grimes County?', answer: 'Yes. We regularly photograph ranch and outdoor ceremonies throughout Grimes County with natural and off-camera lighting.' },
        { question: 'Do you serve nearby areas?', answer: 'Yes. We cover Plantersville, Bryan, College Station, Magnolia, and the broader Grimes-to-Brazos corridor.' },
      ]}
      nearbyCities={['Plantersville', 'Bryan', 'College Station', 'Magnolia', 'Montgomery']}
    />
  )
}
