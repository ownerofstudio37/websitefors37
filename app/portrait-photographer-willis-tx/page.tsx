import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Portrait Photographer Willis TX - Studio37 Photography',
  description:
    'Portrait photographer in Willis, TX. Studio37 delivers natural, polished portraits at Lake Conroe North, Cedar Creek, and local park settings.',
  keywords: [
    'portrait photographer Willis TX',
    'portrait photography Willis Texas',
    'headshot photographer Willis TX',
    'family portrait photographer Willis TX',
    'portrait photographer near Willis TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/portrait-photographer-willis-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function PortraitPhotographerWillisPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Portrait Photography"
      city="Willis"
      stateAbbr="TX"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/portrait-photographer-willis-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Willis, TX is a growing community along the I-45 North corridor with some of the best natural light settings in Montgomery County — from Lake Conroe North's shoreline to Cedar Creek's shaded greenbelts. Studio37 brings professional portrait sessions to Willis residents with relaxed direction, quick turnaround, and gallery quality that stands out."
      highlights={[
        { title: 'Lake Conroe North Locations', description: 'Waterfront settings offer dynamic backgrounds for portraits with open sky, reflective water, and soft horizon light.' },
        { title: 'Cedar Creek Greenbelts', description: 'Wooded and shaded walking corridors provide natural, organic backdrops perfect for lifestyle and family portrait work.' },
        { title: 'Individual & Family Sessions', description: 'From solo headshots and couple portraits to extended family groups — we tailor every session to your style and comfort level.' },
        { title: 'Next-Day Preview Delivery', description: 'Sneak-peek images delivered the next business day so you\'re not waiting weeks to see your results.' },
      ]}
      faqs={[
        { question: 'Where are the best outdoor portrait locations in Willis, TX?', answer: 'Lake Conroe North shoreline and Cedar Creek greenbelt areas are our top recommendations for natural light and scenic variety.' },
        { question: 'Do you offer headshot sessions in Willis?', answer: 'Yes. We offer individual headshot sessions perfect for LinkedIn, company websites, and personal branding.' },
        { question: 'What should I wear for my portrait session?', answer: 'We recommend neutral tones and solid colors that complement natural outdoor backgrounds. Avoid busy patterns and bright logos.' },
        { question: 'Do you serve nearby cities?', answer: 'Yes. We cover Conroe, Montgomery, Pinehurst, The Woodlands, and surrounding Montgomery County communities.' },
      ]}
      nearbyCities={['Conroe', 'Montgomery', 'Pinehurst', 'The Woodlands', 'Huntsville']}
    />
  )
}
