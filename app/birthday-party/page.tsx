import React from 'react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'
import { SubServiceHero, SubServicePackageGrid, SubServiceProofGrid, SubServiceStoryBlock } from '@/components/SubServicePageSections'

export const metadata = generateSEOMetadata({
  title: 'Birthday Party Photography Houston & Montgomery County | Studio37',
  description:
    'Birthday party photography for milestone celebrations, family portraits, party details, candids, and private gallery delivery in Houston and Montgomery County.',
  canonicalUrl: 'https://www.studio37.cc/birthday-party',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Party Essentials',
    price: '$600',
    duration: '2 hours',
    features: ['2 hours coverage', '50+ edited images', 'Candid and posed moments', '72-hour highlights preview', 'Private digital gallery'],
  },
  {
    name: 'Extended Celebration',
    price: '$1,000',
    duration: '4 hours',
    features: ['4 hours coverage', '125+ edited images', 'Cake and guest moments', '24-hour sneak peek', 'Private digital gallery'],
    popular: true,
  },
  {
    name: 'Premium Party Package',
    price: '$1,800',
    duration: 'Up to 8 hours',
    features: ['Up to 8 hours coverage', '250+ edited images', 'Full celebration story', 'Custom mobile gallery', 'Private digital gallery'],
  },
]

export default function BirthdayPartyPage() {
  const serviceSchema = generateServiceSchema(
    'Birthday Party Photography',
    'Birthday party photography in the Houston and Montgomery County area for milestone celebrations, candid moments, family portraits, details, and private gallery delivery.'
  )

  return (
    <main className="w-full pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SubServiceHero
        eyebrow="Private Event Coverage"
        title="Birthday Party Photography"
        copy="Milestone birthday coverage that catches the guest of honor, family reactions, party details, candids, and the moments everyone talks about later."
        priceNote="Coverage starts at $600"
        image="https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791655/Alice_Birthday_Party_-_74_zxkulm.jpg"
        imageAlt="Studio37 birthday party photography for a milestone celebration"
        primaryHref="/book-consultation?service=birthday-party"
      />
      <SubServicePackageGrid
        title="Birthday party coverage packages"
        copy="Choose simple party coverage, a fuller celebration story, or extended coverage for milestone events with more guests and details."
        packages={packages}
      />
      <SubServiceProofGrid
        cards={[
          { title: 'Milestone framing', copy: 'First birthdays, sweet 16s, 21st birthdays, 50th celebrations, and 100th birthday gatherings.' },
          { title: 'Coverage rhythm', copy: 'Candids, guest reactions, cake moments, details, group photos, and portraits with the guest of honor.' },
          { title: 'Gallery delivery', copy: 'A private edited gallery built for easy sharing with family and friends after the celebration.' },
        ]}
      />

      <PortraitSubServiceSupport
        service="birthday party photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Milestone birthday galleries with candid guest moments, details, portraits, and cake coverage.',
          'Examples from indoor venues, homes, restaurants, and mixed-light celebrations.',
          'Final gallery variety for sharing with family and preserving the full celebration.',
        ]}
        planning={['Timeline and cake moments', 'Family group list', 'Venue light plan']}
        objection="If you are worried about missing key people or moments, we map the party flow before coverage starts so candids, group photos, details, and milestone moments all get attention."
      />

      <SubServiceStoryBlock
        title="A birthday gallery should feel like the whole celebration"
        paragraphs={[
          'Studio37 photographs birthday parties across Houston and Montgomery County with a calm event rhythm: details before guests arrive, portraits while everyone is fresh, then candid coverage as the room gets comfortable.',
          'The goal is a gallery that feels personal and useful: family favorites, guest moments, cake coverage, decor, and the little interactions that are easy to miss while hosting.',
        ]}
        bullets={[
          'Children and milestone birthdays',
          'Cake, decor, and guest reactions',
          'Family group portraits',
          'Private gallery sharing after the party',
        ]}
      />
    </main>
  )
}
