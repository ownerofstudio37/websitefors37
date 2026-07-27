import React from 'react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'
import { SubServiceHero, SubServicePackageGrid, SubServiceStoryBlock } from '@/components/SubServicePageSections'

export const metadata = generateSEOMetadata({
  title: 'Charity Fundraiser Event Photography - Studio37',
  description:
    'Professional fundraiser photography capturing event moments, donor interactions, and auction highlights. Perfect for charity galas and fundraising events in Houston.',
  canonicalUrl: 'https://www.studio37.cc/fundraiser',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Fundraiser Essentials',
    price: '$600',
    duration: '2 hours',
    features: ['2 hours coverage', '50+ edited images', 'Donor and guest candids', '72-hour highlights preview', 'Private digital gallery'],
  },
  {
    name: 'Standard Fundraiser',
    price: '$1,000',
    duration: '4 hours',
    features: ['4 hours coverage', '125+ edited images', 'Program and sponsor coverage', '24-hour sneak peek', 'Private digital gallery'],
    popular: true,
  },
  {
    name: 'Fundraiser Premium',
    price: '$1,800',
    duration: 'Up to 8 hours',
    features: ['Up to 8 hours coverage', '250+ edited images', 'Auction and donor moments', 'Mission recap coverage', 'Private digital gallery'],
  },
]

export default function FundraiserPage() {
  const serviceSchema = generateServiceSchema(
    'Fundraiser Event Photography',
    'Fundraiser event photography for charity galas, donor events, auctions, sponsor moments, mission recaps, and private gallery delivery in the Houston area.'
  )

  return (
    <main className="w-full pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SubServiceHero
        eyebrow="Mission-Driven Event Coverage"
        title="Fundraiser Photography"
        copy="Photography for charity galas, donor events, auctions, volunteer moments, sponsor recognition, and recap content that supports the next campaign."
        priceNote="Coverage starts at $600"
        image="https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033151/IMG_4590_1_kweavw.jpg"
        imageAlt="Professional fundraiser event photography"
        primaryHref="/book-consultation?service=fundraiser"
      />
      <SubServicePackageGrid
        title="Fundraiser event packages"
        copy="Plan coverage around donor recognition, program moments, sponsor deliverables, and the story your organization needs after the event."
        packages={packages}
      />

      <PortraitSubServiceSupport
        service="fundraiser photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Donor, sponsor, auction, speaker, volunteer, and mission-moment coverage examples.',
          'Images designed for recap emails, social proof, annual reports, and future sponsorship decks.',
          'Gala and nonprofit event galleries with fast highlight delivery options.',
        ]}
        planning={['Sponsor priority list', 'Program timeline', 'Impact story goals']}
        objection="Fundraisers need more than pretty photos. The consultation helps us identify sponsor recognition, donor moments, mission storytelling, and post-event usage before the room fills up."
      />

      <SubServiceStoryBlock
        title="Fundraiser coverage should help after the event is over"
        paragraphs={[
          'Studio37 approaches fundraiser photography as both event documentation and future marketing support. The gallery should help with thank-you emails, donor proof, sponsor recaps, annual reports, and the next ask.',
          'We identify the people, program moments, signage, auction items, volunteer interactions, and mission story details that matter before guests arrive.',
        ]}
        bullets={[
          'Donor, sponsor, and VIP recognition',
          'Auction, program, and mission moments',
          'Volunteer and community candids',
          'Recap-ready gallery delivery',
        ]}
      />
    </main>
  )
}
