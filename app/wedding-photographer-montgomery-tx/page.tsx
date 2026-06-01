import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Wedding Photographer Montgomery TX - Studio37 Photography',
  description:
    'Wedding photographer in Montgomery, TX. Studio37 specializes in Lake Conroe and historic downtown ceremonies with dual-shooter coverage and artistic editing.',
  keywords: [
    'wedding photographer Montgomery TX',
    'wedding photography Montgomery Texas',
    'Lake Conroe wedding photographer',
    'Montgomery TX wedding venues',
    'wedding photographer near Montgomery TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/wedding-photographer-montgomery-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function WeddingPhotographerMontgomeryPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Wedding Photography"
      city="Montgomery"
      stateAbbr="TX"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/wedding-photographer-montgomery-tx"
      serviceUrl="https://www.studio37.cc/services/wedding-photography"
      startingPrice="$1,200"
      intro="Montgomery, TX sits at the heart of Montgomery County's premier wedding corridor — with Lake Conroe venues, Fernland Historical Park, and the charming historic downtown square drawing couples from across the region. Studio37's Signature Duo Coverage puts two photographers on your wedding day at a single rate, ensuring every ceremony, reception, and reception moment is covered from multiple perspectives."
      highlights={[
        { title: 'Lake Conroe Venue Coverage', description: 'We know the best lighting windows and vantage points at the area\'s top lakeside venues for ceremony and reception coverage.' },
        { title: 'Historic Downtown Settings', description: 'Montgomery\'s downtown square and Fernland Historical Park offer timeless backdrops for portraits and detail shots.' },
        { title: 'Signature Duo Coverage', description: 'Two photographers on every wedding — ceremony from both sides, candid guests, and exclusive getting-ready coverage included.' },
        { title: 'Engagement Session Add-On', description: 'Pre-wedding engagement sessions at your venue or a local favorite help build comfort on camera before your big day.' },
      ]}
      faqs={[
        { question: 'How far in advance should I book a wedding photographer in Montgomery, TX?', answer: 'Lake Conroe and Montgomery area venues fill quickly — most couples book 9-12 months in advance, especially for fall and spring weekends.' },
        { question: 'Do you cover weddings at Lake Conroe venues?', answer: 'Yes. We regularly photograph weddings at lakeside venues around Lake Conroe and the wider Montgomery County corridor.' },
        { question: 'What is included in your wedding photography packages?', answer: 'All packages include full-day coverage, two photographers, online gallery delivery, and a print release. Add-ons like albums and engagement sessions are available.' },
        { question: 'Do you also serve nearby areas?', answer: 'Yes. We cover Conroe, Magnolia, Pinehurst, The Woodlands, and the broader Montgomery County region.' },
      ]}
      nearbyCities={['Conroe', 'Magnolia', 'Pinehurst', 'The Woodlands', 'Willis']}
    />
  )
}
