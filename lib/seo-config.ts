// Local Business SEO Configuration
export const businessInfo = {
  name: 'Studio37',
  legalName: 'Studio37 Photography',
  description: 'Professional photography services in Pinehurst, Texas. Specializing in wedding, portrait, event, and commercial photography.',
  address: {
    streetAddress: '1701 Goodson Loop Unit 80',
    addressLocality: 'Pinehurst',
    addressRegion: 'TX',
    postalCode: '77362',
    addressCountry: 'US',
    fullAddress: '1701 Goodson Loop Unit 80, Pinehurst, TX 77362'
  },
  contact: {
    phone: '832-713-9944',
    email: 'sales@studio37.cc',
    website: 'https://www.studio37.cc'
  },
  geo: {
    latitude: 30.1647,  // Approximate coordinates for Pinehurst, TX
    longitude: -95.4677
  },
  serviceAreas: [
    'Pinehurst',
    'Magnolia',
    'Spring',
    'Tomball',
    'The Woodlands',
    'Shenandoah',
    'Oak Ridge North',
    'Conroe',
    'Montgomery',
    'Willis',
    'New Waverly',
    'Huntsville',
    'New Caney',
    'Porter',
    'Splendora',
    'Cleveland',
    'Hockley',
    'Waller',
    'Plantersville',
    'Navasota',
    'Bryan',
    'College Station',
    'Cypress',
    'Kingwood',
    'Humble',
    'Atascocita',
    'Houston'
  ],
  services: [
    'Wedding Photography',
    'Portrait Photography',
    'Event Photography',
    'Commercial Photography',
    'Family Portraits',
    'Corporate Headshots',
    'Engagement Photography',
    'Bridal Photography'
  ],
  socialMedia: {
    facebook: 'https://facebook.com/studio37photography',
    instagram: 'https://instagram.com/studio37photography',
    twitter: 'https://twitter.com/studio37photo'
  },
  businessHours: {
    monday: '8:00-21:00',
    tuesday: '8:00-21:00',
    wednesday: '8:00-21:00',
    thursday: '8:00-21:00',
    friday: '8:00-21:00',
    saturday: '8:00-21:00',
    sunday: '8:00-21:00'
  }
}

export type GeoServiceArea = {
  name: string
  slug: string
  county: string
  postalCodes: string[]
  landmarks: string[]
}

export const geoServiceAreas: GeoServiceArea[] = [
  {
    name: 'Cypress',
    slug: 'local-photographer-cypress-tx',
    county: 'Harris County',
    postalCodes: ['77429', '77433'],
    landmarks: ['Towne Lake', 'Bridgeland', 'Cypress Creek'],
  },
  {
    name: 'Spring',
    slug: 'local-photographer-spring-tx',
    county: 'Harris County and Montgomery County',
    postalCodes: ['77373', '77379', '77380', '77381', '77382', '77386', '77388', '77389'],
    landmarks: ['Mercer Botanic Gardens', 'Old Town Spring', 'Spring Creek Greenway'],
  },
  {
    name: 'Tomball',
    slug: 'local-photographer-tomball-tx',
    county: 'Harris County',
    postalCodes: ['77375', '77377'],
    landmarks: ['Kleb Woods Nature Preserve', 'Old Town Tomball', 'Spring Creek Park'],
  },
  {
    name: 'Magnolia',
    slug: 'local-photographer-magnolia-tx',
    county: 'Montgomery County',
    postalCodes: ['77354', '77355'],
    landmarks: ['Unity Park', 'Magnolia Stroll', 'The Woodlands edge'],
  },
  {
    name: 'The Woodlands',
    slug: 'local-photographer-the-woodlands-tx',
    county: 'Montgomery County',
    postalCodes: ['77380', '77381', '77382', '77384', '77385'],
    landmarks: ['The Waterway', 'Market Street', 'Northshore Park'],
  },
]

export function formatServiceAreaForSchema(area: GeoServiceArea) {
  return {
    '@type': 'City',
    name: `${area.name}, TX`,
    url: `${businessInfo.contact.website}/${area.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.name,
      addressRegion: 'TX',
      addressCountry: 'US',
      postalCode: area.postalCodes.join(', '),
    },
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: `${area.county}, Texas`,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Primary ZIP codes served',
        value: area.postalCodes.join(', '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Local photography landmarks',
        value: area.landmarks.join(', '),
      },
    ],
  }
}

export function formatServiceAreasForSchema() {
  return geoServiceAreas.map(formatServiceAreaForSchema)
}

// Generate structured data for local business
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': businessInfo.contact.website,
    name: businessInfo.legalName,
    alternateName: businessInfo.name,
    description: businessInfo.description,
    url: businessInfo.contact.website,
    telephone: businessInfo.contact.phone,
    email: businessInfo.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude
    },
    areaServed: formatServiceAreasForSchema(),
    serviceType: businessInfo.services,
    openingHoursSpecification: Object.entries(businessInfo.businessHours).map(([day, hours]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${day.charAt(0).toUpperCase() + day.slice(1)}`,
      opens: hours === 'Closed' ? null : hours.split('-')[0],
      closes: hours === 'Closed' ? null : hours.split('-')[1]
    })).filter(hours => hours.opens),
    sameAs: Object.values(businessInfo.socialMedia),
    priceRange: '$$',
    paymentAccepted: 'Cash, Credit Card, Check, PayPal',
    currenciesAccepted: 'USD'
  }
}

// Generate service-specific structured data
export function generateServiceSchema(serviceName: string, serviceDescription: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: businessInfo.legalName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessInfo.address.streetAddress,
        addressLocality: businessInfo.address.addressLocality,
        addressRegion: businessInfo.address.addressRegion,
        postalCode: businessInfo.address.postalCode,
        addressCountry: businessInfo.address.addressCountry
      },
      telephone: businessInfo.contact.phone,
      url: businessInfo.contact.website
    },
    areaServed: formatServiceAreasForSchema()
  }
}
