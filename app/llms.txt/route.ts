import { NextResponse } from 'next/server'
import { businessInfo } from '@/lib/seo-config'
import { studio37ServiceFacts } from '@/lib/studio37-package-facts'
import { thumbtackRating } from '@/lib/public-content'
import { serviceGuides } from '@/lib/service-guides'

export const revalidate = 86400

// Plain-text business summary for AI answer engines (llms.txt convention), built from the same facts the site and chatbot use.
export async function GET() {
  const site = businessInfo.contact.website
  const services = studio37ServiceFacts.map((service) => {
    const packages = Object.values(service.packages)
      .map((pkg) => `  - ${pkg.name}: ${pkg.price}, ${pkg.duration}, ${pkg.photos}`)
      .join('\n')
    return `### ${service.name}\n${service.description}\n${packages}\nDetails: ${site}/services/${service.slug}`
  })
  const specialties = Object.values(serviceGuides).map(
    (guide) => `- [${guide.h1}](${site}/${guide.slug}): ${guide.packages.map((pkg) => `${pkg.name} ${pkg.price}`).join(', ')}`
  )

  const body = `# ${businessInfo.legalName}

> ${businessInfo.name} is a two-photographer wedding, portrait, event, and commercial photography studio based in Pinehurst, Texas, serving Montgomery County and Greater Houston. It also offers branding and marketing services (websites, SEO, PPC, and social media) for businesses.

## Contact
- Address: ${businessInfo.address.fullAddress}
- Phone: ${businessInfo.contact.phone}
- Email: ${businessInfo.contact.email}
- Website: ${site}

## Services and starting prices
${services.join('\n\n')}

### Specialty portrait sessions
${specialties.join('\n')}
- [Mini sessions](${site}/mini-sessions): seasonal 30-minute sessions from $350
- [Holiday mini sessions](${site}/holiday-mini-sessions): 30-minute holiday card sessions from $350

## Reviews
Rated ${thumbtackRating.rating} on Thumbtack from ${thumbtackRating.count} reviews, and 5.0 on Google.
- [Client reviews](${site}/reviews)
- [Google Business Profile](${businessInfo.reviewProfiles.google})
- [Thumbtack profile](${businessInfo.reviewProfiles.thumbtack})

## Portfolio
- [Featured work and recent galleries](https://gallery.studio37.cc)
- [Request a complete private gallery](${site}/request-portfolio)

## Service areas
${businessInfo.serviceAreas.join(', ')}, Texas.

## Key pages
- [Services overview](${site}/services)
- [Prices and packages](${site}/pricing)
- [Compare services](${site}/compare)
- [Frequently asked questions](${site}/faq)
- [Package recommender](${site}/tools/package-recommender)
- [Pricing calculator](${site}/tools/pricing)
- [Book a free consultation](${site}/book-consultation)
- [Service areas](${site}/locations)
- [Branding and marketing services](${site}/services/branding-marketing)
- [Planning guides (blog)](${site}/blog)
- [About Studio37](${site}/about)
- [Contact](${site}/contact)

## Sitemap
${site}/sitemap.xml
`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400',
    },
  })
}
