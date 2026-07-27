import React from 'react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PrepGuideLeadMagnet from '@/components/PrepGuideLeadMagnet'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'
import { SubServiceHero, SubServicePackageGrid, SubServiceProofGrid, SubServiceStoryBlock } from '@/components/SubServicePageSections'

export const metadata = generateSEOMetadata({
  title: 'Holiday Party Photography Houston & Montgomery County | Studio37',
  description:
    'Holiday party photography for corporate holiday parties, private celebrations, decor, group photos, candids, and fast recap delivery in Houston and Montgomery County.',
  canonicalUrl: 'https://www.studio37.cc/holiday-party',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Classic Coverage',
    price: '$600',
    duration: '2 hours',
    features: ['2 hours coverage', '50+ edited images', 'Festive candids', '72-hour highlights preview', 'Private digital gallery'],
  },
  {
    name: 'Complete Holiday Coverage',
    price: '$1,000',
    duration: '4 hours',
    features: ['4 hours coverage', '125+ edited images', 'Group photos and details', '24-hour sneak peek', 'Private digital gallery'],
    popular: true,
  },
  {
    name: 'Premium Party Package',
    price: '$1,800',
    duration: 'Up to 8 hours',
    features: ['Up to 8 hours coverage', '250+ edited images', 'Full party story', 'Custom mobile gallery', 'Private digital gallery'],
  },
]

export default function HolidayPartyPage() {
  const serviceSchema = generateServiceSchema(
    'Holiday Party Photography',
    'Professional holiday party photography for corporate holiday parties, family celebrations, and festive events in the Houston area.'
  )

  return (
    <main className="w-full pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SubServiceHero
        eyebrow="Seasonal Event Coverage"
        title="Holiday Party Photography"
        copy="Festive coverage for corporate holiday parties, private celebrations, team gatherings, family events, decor, group photos, and recap-ready candids."
        priceNote="Coverage starts at $600"
        image="https://res.cloudinary.com/dmjxho2rl/image/upload/v1779268256/Untitled-20_dphwwv.jpg"
        imageAlt="Studio37 holiday party photography with festive event coverage"
        primaryHref="/book-consultation?service=holiday-party"
      />
      <SubServicePackageGrid
        title="Holiday party coverage packages"
        copy="Holiday dates move quickly. Choose the coverage depth that matches your guest count, venue, group photo needs, and recap goals."
        packages={packages}
      />
      <SubServiceProofGrid
        cards={[
          { title: 'Business parties', copy: 'Team photos, branded decor, leadership moments, sponsor details, and recap-ready images.' },
          { title: 'Private celebrations', copy: 'Family groups, festive details, candid joy, gift exchanges, traditions, and guest coverage.' },
          { title: 'Book early', copy: 'Holiday dates compress quickly, so we plan lighting, group-photo timing, and delivery expectations upfront.' },
        ]}
      />

      <PortraitSubServiceSupport
        service="holiday party photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Corporate and private holiday party examples with decor, team photos, candids, and group coverage.',
          'Low-light reception and festive venue examples with clean color and flash work.',
          'Fast sharing sets for newsletters, social posts, internal recaps, and family keepsakes.',
        ]}
        planning={['Lighting and decor review', 'Group photo timing', 'Recap delivery plan']}
        objection="Holiday parties often have tough lighting and tight schedules. We plan group photos, decor coverage, and candid windows so the gallery feels festive without interrupting the event."
      />

      <SubServiceStoryBlock
        title="Holiday coverage for company recaps and personal keepsakes"
        paragraphs={[
          'Studio37 photographs holiday parties across Houston and Montgomery County with attention to the two big use cases: recap-worthy business coverage and warm private celebration memories.',
          'We plan around low-light venues, group photo timing, decor, leadership or host moments, and the candid windows that make a holiday gallery feel full instead of staged.',
        ]}
        bullets={[
          'Corporate holiday parties and team events',
          'Private family and friend celebrations',
          'Decor, group photos, and candid moments',
          'Fast sharing sets when timing matters',
        ]}
      />
      <PrepGuideLeadMagnet />
    </main>
  )
}
