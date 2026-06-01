import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Wedding Photographer Plantersville TX - Studio37 Photography',
  description:
    'Wedding photographer in Plantersville, TX. Studio37 specializes in rustic ranch, barn, and outdoor wedding venues along the FM 1774 corridor in Grimes County.',
  keywords: [
    'wedding photographer Plantersville TX',
    'wedding photography Plantersville Texas',
    'ranch wedding photographer Plantersville',
    'barn wedding photographer Grimes County',
    'rustic wedding photographer Texas',
  ],
  canonicalUrl: 'https://www.studio37.cc/wedding-photographer-plantersville-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function WeddingPhotographerPlantersvillePage() {
  return (
    <ServiceCityLandingPage
      serviceName="Wedding Photography"
      city="Plantersville"
      stateAbbr="TX"
      county="Grimes County"
      pageUrl="https://www.studio37.cc/wedding-photographer-plantersville-tx"
      serviceUrl="https://www.studio37.cc/services/wedding-photography"
      startingPrice="$1,200"
      intro="Plantersville, TX is one of Texas's premier rustic wedding destinations — with ranch venues, barn properties, and wide pasture settings along the FM 1774 corridor drawing couples from Houston, College Station, and beyond. Studio37 is experienced in the unique lighting challenges and creative opportunities that come with outdoor and barn venue weddings, delivering cinematic coverage that honors the atmosphere you worked hard to create."
      highlights={[
        { title: 'Ranch & Barn Venue Expertise', description: 'We understand mixed indoor/outdoor barn lighting and use both natural and supplemental light to ensure sharp, beautiful images in any setting.' },
        { title: 'Golden-Hour Ceremony Coverage', description: 'Plantersville\'s open sky and flat horizon make for some of the most dramatic golden-hour ceremony backdrops in Southeast Texas.' },
        { title: 'Signature Duo Coverage', description: 'Two photographers at one rate — covering ceremony processional and guests simultaneously for complete, gallery-ready coverage.' },
        { title: 'Navasota River Landscape Portraits', description: 'We leverage the river bottomland and natural Texas landscape for wide-format portrait sets between ceremony and reception.' },
      ]}
      faqs={[
        { question: 'Do you photograph weddings at FM 1774 ranch venues in Plantersville?', answer: 'Yes. We regularly work at rustic and ranch venue properties along FM 1774 and the surrounding Grimes County corridor.' },
        { question: 'How far ahead should I book for a Plantersville wedding?', answer: 'Ranch wedding weekends in spring (April–June) and fall (October–November) fill 9-12 months out. Book early to secure your date.' },
        { question: 'Do you handle barn and outdoor lighting challenges?', answer: 'Yes. We use a combination of natural light strategy and off-camera flash to handle the mixed lighting conditions common in barn venues.' },
        { question: 'Do you serve nearby areas?', answer: 'Yes. We cover Magnolia, Navasota, Montgomery, Conroe, and the broader Magnolia-to-College Station corridor.' },
      ]}
      nearbyCities={['Magnolia', 'Navasota', 'Montgomery', 'Conroe', 'Bryan']}
    />
  )
}
