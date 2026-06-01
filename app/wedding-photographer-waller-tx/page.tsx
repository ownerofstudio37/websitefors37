import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Wedding Photographer Waller TX - Studio37 Photography',
  description:
    'Wedding photographer in Waller, TX. Studio37 covers ranch, barn, and outdoor ceremonies in Waller County with dual-shooter coverage and artistic editing.',
  keywords: [
    'wedding photographer Waller TX',
    'wedding photography Waller Texas',
    'barn wedding photographer Waller TX',
    'ranch wedding photographer Waller County',
    'wedding photographer near Waller TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/wedding-photographer-waller-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function WeddingPhotographerWallerPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Wedding Photography"
      city="Waller"
      stateAbbr="TX"
      county="Waller County"
      pageUrl="https://www.studio37.cc/wedding-photographer-waller-tx"
      serviceUrl="https://www.studio37.cc/services/wedding-photography"
      startingPrice="$1,200"
      intro="Waller, TX is an emerging wedding market in Northwest Houston with wide-open landscapes, fairground venues, and rural terrain that pairs beautifully with Texas golden-hour light. Studio37 brings full wedding day coverage to Waller County with our Signature Duo Coverage — two photographers at a single rate — so no moment from your ceremony or reception goes undocumented."
      highlights={[
        { title: 'Ranch & Barn Venue Expertise', description: 'We know how to work with barn lighting, open field settings, and dramatic Texas sky backdrops for reception and ceremony coverage.' },
        { title: 'Waller County Fairgrounds', description: 'The fairgrounds offer spacious, flexible event venue coverage with large indoor and outdoor photography opportunities.' },
        { title: 'Signature Duo Coverage', description: 'Two photographers on your wedding day at one package rate — ceremony from both sides, candid guests, and preparation coverage.' },
        { title: 'Engagement Session Option', description: 'Pre-wedding sessions at your Waller venue or a scenic nearby location help you get comfortable on camera before the big day.' },
      ]}
      faqs={[
        { question: 'Do you photograph barn and ranch weddings in Waller, TX?', answer: 'Yes. We specialize in outdoor and venue-based ranch and barn weddings with natural and artificial lighting expertise.' },
        { question: 'How far in advance should I book for a Waller County wedding?', answer: 'Fall and spring weekends fill 6-9 months ahead. We recommend booking as soon as your venue is confirmed.' },
        { question: 'What is included in your wedding photography packages?', answer: 'All packages include full-day coverage, two photographers, online gallery, and print release. Albums and engagement add-ons are available.' },
        { question: 'Do you cover nearby areas?', answer: 'Yes. We cover Hockley, Tomball, Magnolia, Cypress, Pinehurst, and broader Northwest Houston.' },
      ]}
      nearbyCities={['Hockley', 'Tomball', 'Magnolia', 'Cypress', 'Pinehurst']}
    />
  )
}
