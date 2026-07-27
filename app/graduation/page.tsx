import React from 'react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PrepGuideLeadMagnet from '@/components/PrepGuideLeadMagnet'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'
import { SubServiceHero, SubServicePackageGrid, SubServiceProofGrid, SubServiceStoryBlock } from '@/components/SubServicePageSections'

export const metadata = generateSEOMetadata({
  title: 'Graduation Photography Houston & Montgomery County | Studio37',
  description:
    'Graduation photography for cap and gown portraits, campus sessions, ceremony coverage, family photos, and graduation celebrations in Houston and Montgomery County.',
  canonicalUrl: 'https://www.studio37.cc/graduation',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Cap & Gown Session',
    price: '$350',
    duration: 'Location session',
    features: ['Professional cap & gown shots', '1 location', 'Digital files', 'Professional edits', 'Proofs gallery'],
  },
  {
    name: 'Ceremony + Celebration',
    price: '$1,000',
    duration: '4 hours',
    features: ['Ceremony or party coverage', 'Family photo list', 'Multiple locations nearby', '24-hour sneak peek', 'Private digital gallery'],
    popular: true,
  },
  {
    name: 'Full Graduation Story',
    price: '$1,800',
    duration: 'Up to 8 hours',
    features: ['Pre-ceremony portraits', 'Ceremony coverage where permitted', 'Party documentation', '250+ edited images', 'Private digital gallery'],
  },
]

export default function GraduationPage() {
  const serviceSchema = generateServiceSchema(
    'Graduation Photography',
    'Professional graduation photography for senior portraits, cap and gown sessions, ceremonies, and celebrations in the Houston area.'
  )

  return (
    <main className="w-full pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SubServiceHero
        eyebrow="Cap, Ceremony, Celebration"
        title="Graduation Photography"
        copy="Professional graduation coverage for cap-and-gown portraits, family photos, ceremony moments where permitted, and celebration stories."
        priceNote="Cap and gown sessions start at $350"
        image="https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791656/Hotard_Family_Day_2_-_764_1_b9enxd.jpg"
        imageAlt="Studio37 graduation photography with cap and gown portraits"
        primaryHref="/book-consultation?service=graduation"
      />
      <SubServicePackageGrid
        title="Graduation photography packages"
        copy="Keep the simple cap-and-gown session, or add event-style coverage for ceremony, family, and celebration moments."
        packages={packages}
      />
      <SubServiceProofGrid
        cards={[
          { title: 'Portrait session', copy: 'Cap-and-gown, family combinations, campus or local backdrops, and announcement-ready images.' },
          { title: 'Ceremony coverage', copy: 'Where permitted, we plan around arrival, family timing, diploma moments, and post-ceremony portraits.' },
          { title: 'Celebration story', copy: 'Party candids, decor, friend groups, family reactions, and the details that complete the milestone.' },
        ]}
      />

      <PortraitSubServiceSupport
        service="graduation photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Cap-and-gown, family, campus, ceremony, and celebration examples.',
          'Senior and graduation galleries with both parent favorites and student personality.',
          'Location examples for high school, college, and milestone graduation sessions.',
        ]}
        planning={['Campus or venue plan', 'Family photo list', 'Announcement usage']}
        objection="Graduation days move quickly. We plan the location, family combinations, ceremony limits, and celebration timing so the final gallery covers more than one rushed portrait."
      />

      <SubServiceStoryBlock
        title="Graduation can be a portrait session or a full milestone story"
        paragraphs={[
          'Studio37 keeps the cap-and-gown session simple for students who need polished portraits, while offering event-style coverage for families who want ceremony, party, and guest moments documented too.',
          'We help plan location, campus or venue timing, family combinations, and announcement usage so the session does not feel rushed or generic.',
        ]}
        bullets={[
          'Cap-and-gown portraits stay available as the simple option',
          'Ceremony and celebration packages follow event coverage logic',
          'Family, friend, and campus/location guidance',
          'Private gallery delivery after the milestone',
        ]}
      />
      <PrepGuideLeadMagnet />
    </main>
  )
}
