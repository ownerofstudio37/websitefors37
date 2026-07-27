import React from 'react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'
import { SubServiceHero, SubServicePackageGrid, SubServiceProofGrid, SubServiceStoryBlock } from '@/components/SubServicePageSections'

export const metadata = generateSEOMetadata({
  title: 'Anniversary Party Photography Houston & Montgomery County | Studio37',
  description:
    'Anniversary party photography for milestone anniversaries, vow renewals, couple portraits, event moments, and private gallery delivery in Houston and Montgomery County.',
  canonicalUrl: 'https://www.studio37.cc/anniversary-party',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Celebration Coverage',
    price: '$600',
    duration: '2 hours',
    features: ['2 hours coverage', '50+ edited images', 'Couple portraits', '72-hour highlights preview', 'Private digital gallery'],
  },
  {
    name: 'Anniversary Showcase',
    price: '$1,000',
    duration: '4 hours',
    features: ['4 hours coverage', '125+ edited images', 'Toasts and guest moments', '24-hour sneak peek', 'Private digital gallery'],
    popular: true,
  },
  {
    name: 'Premium Celebration',
    price: '$1,800',
    duration: 'Up to 8 hours',
    features: ['Up to 8 hours coverage', '250+ edited images', 'Renewal ceremony support', 'Full celebration story', 'Private digital gallery'],
  },
]

export default function AnniversaryPartyPage() {
  const serviceSchema = generateServiceSchema(
    'Anniversary Party Photography',
    'Anniversary party photography in the Houston and Montgomery County area for milestone anniversaries, vow renewals, couple portraits, event coverage, and private gallery delivery.'
  )

  return (
    <main className="w-full pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SubServiceHero
        eyebrow="Milestone Event Coverage"
        title="Anniversary Party Photography"
        copy="Coverage for vow renewals, milestone anniversaries, couple portraits, family moments, toasts, dancing, and the story of the people celebrating with you."
        priceNote="Coverage starts at $600"
        image="https://res.cloudinary.com/dmjxho2rl/image/upload/v1779268256/Untitled-17_uyydac.jpg"
        imageAlt="Studio37 anniversary party photography for a milestone celebration"
        primaryHref="/book-consultation?service=anniversary-party"
      />
      <SubServicePackageGrid
        title="Anniversary coverage packages"
        copy="Choose a shorter couple-and-party story or extended coverage for vow renewals, speeches, dinner, dancing, and multi-generational family moments."
        packages={packages}
      />
      <SubServiceProofGrid
        cards={[
          { title: 'Couple portraits', copy: 'A short portrait window for the couple before guests pull them into the celebration.' },
          { title: 'Event story', copy: 'Toasts, dancing, family moments, decor, guest candids, and the rhythm of the full gathering.' },
          { title: 'Milestone examples', copy: 'Vow renewals, 25th and 50th anniversaries, family dinners, and multi-generational celebrations.' },
        ]}
      />

      <PortraitSubServiceSupport
        service="anniversary party photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Couple portraits, family combinations, decor, toasts, dancing, and guest candids.',
          'Milestone anniversary examples with multi-generational coverage and relaxed direction.',
          'Private galleries that show the full celebration, not only a few highlight images.',
        ]}
        planning={['Couple portrait time', 'Family group list', 'Toast and dance moments']}
        objection="Anniversary parties are emotional and family-heavy. We plan the people, timing, and must-have moments so the gallery honors the couple and the guests who came to celebrate them."
      />

      <SubServiceStoryBlock
        title="A celebration page should honor both the couple and the room"
        paragraphs={[
          'Studio37 anniversary coverage balances two needs: quiet couple portraits that feel worthy of the milestone and event coverage that remembers the people who showed up to celebrate.',
          'Before the event, we confirm portrait timing, family combinations, vow renewal moments if applicable, and the toast or dance moments that should not be missed.',
        ]}
        bullets={[
          'Couple portraits before the room gets busy',
          'Vow renewal and ceremony support',
          'Family and guest candids',
          'Private gallery delivery for sharing',
        ]}
      />
    </main>
  )
}
