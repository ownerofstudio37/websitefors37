import React from 'react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'
import { SubServiceHero, SubServicePackageGrid, SubServiceProofGrid, SubServiceStoryBlock } from '@/components/SubServicePageSections'

export const metadata = generateSEOMetadata({
  title: 'Corporate Event Photography Houston & Montgomery County | Studio37',
  description:
    'Corporate event photography for conferences, galas, award ceremonies, business gatherings, PR recaps, and internal communications in Houston and Montgomery County.',
  canonicalUrl: 'https://www.studio37.cc/corporate-events',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Business Event Essentials',
    price: '$700',
    duration: '2 hours',
    features: ['2 hours coverage', 'Commercial usage license', '50+ edited images', '72-hour highlights preview', 'Private digital gallery'],
  },
  {
    name: 'Business Event Standard',
    price: '$1,100',
    duration: '4 hours',
    features: ['4 hours coverage', 'Commercial usage license', '125+ edited images', '24-hour sneak peek', 'Sponsor and speaker coverage'],
    popular: true,
  },
  {
    name: 'Business Event Premium',
    price: '$2,000',
    duration: 'Up to 8 hours',
    features: ['Up to 8 hours coverage', 'Commercial usage license', '250+ edited images', 'PR and recap delivery', 'Custom deliverables'],
  },
]

export default function CorporateEventsPage() {
  const serviceSchema = generateServiceSchema(
    'Corporate Event Photography',
    'Corporate event photography in the Houston and Montgomery County area for conferences, galas, award ceremonies, business gatherings, PR recaps, and internal communications.'
  )

  return (
    <main className="w-full pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SubServiceHero
        eyebrow="Business Events"
        title="Corporate Event Photography"
        copy="Polished coverage for conferences, galas, award ceremonies, launch events, team gatherings, and sponsor-facing recaps."
        priceNote="Event baseline plus commercial usage licensing"
        image="https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791655/VB_School_Chris_Faves_-_196_sphhad.jpg"
        imageAlt="Studio37 corporate event photography coverage for a business gathering"
        primaryHref="/book-consultation?service=corporate-events"
      />
      <SubServicePackageGrid
        title="Corporate event coverage packages"
        copy="Corporate coverage follows event pricing with added commercial usage, sponsor value, and recap deliverables."
        packages={packages}
      />
      <SubServiceProofGrid
        cards={[
          { title: 'PR and recap', copy: 'Fast highlight sets for press, social, sponsor recaps, and internal communications.' },
          { title: 'Business use cases', copy: 'Speaker coverage, networking, awards, branded details, team moments, and sponsor value.' },
          { title: 'Private samples', copy: 'Request corporate examples matched to your venue, lighting, guest count, and delivery needs.' },
        ]}
      />

      <PortraitSubServiceSupport
        service="corporate event photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Conference, gala, sponsor, speaker, award, and networking examples.',
          'Fast-turnaround highlight sets for PR, social, recaps, and internal communications.',
          'Low-light ballroom and mixed-light venue examples with clean delivery consistency.',
        ]}
        planning={['Run-of-show review', 'VIP and sponsor list', 'Delivery usage plan']}
        objection="If your event needs images for marketing, donor relations, or internal communications, the planning call clarifies must-have moments, access, usage, and delivery timing before event day."
      />

      <SubServiceStoryBlock
        title="Coverage built for the way businesses use event images"
        paragraphs={[
          'Studio37 covers corporate events across Houston and Montgomery County with the end use in mind: recap emails, sponsor decks, social proof, internal communications, PR, and future event promotion.',
          'We coordinate around the run of show, VIPs, sponsor recognition, speaker moments, branded details, and attendee candids so the final gallery is useful after the event ends.',
        ]}
        bullets={[
          'Conference and seminar coverage',
          'Award ceremonies and galas',
          'Sponsor, speaker, and VIP moments',
          'Team events, launches, and retreats',
        ]}
      />
    </main>
  )
}
