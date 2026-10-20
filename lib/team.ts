import { credentials } from '@/lib/credentials'

// The owners as structured-data people, from the About page bios. Shared by the site-wide business entity
// (as founders) and the About page, so both describe them the same way. Only facts shown on the site.
const site = 'https://www.studio37.cc'
const organization = { '@id': `${site}/#organization` }

export const teamPeople = [
  {
    '@type': 'Person',
    '@id': `${site}/about#christian`,
    name: 'Christian Combest',
    givenName: 'Christian',
    jobTitle: 'CEO, Marketing Lead, Producer and Photographer',
    worksFor: organization,
    url: `${site}/about`,
    knowsAbout: ['Wedding photography', 'Commercial photography', 'Search engine optimization', 'Google Ads', 'Marketing strategy'],
    hasCredential: credentials.map((credential) => ({
      '@type': 'EducationalOccupationalCredential',
      name: credential.name,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: credential.issuer },
      url: credential.verifyUrl,
    })),
  },
  {
    '@type': 'Person',
    '@id': `${site}/about#caitie`,
    name: 'Caitie',
    givenName: 'Caitie',
    jobTitle: 'Co-Owner, Photographer and Editor',
    worksFor: organization,
    url: `${site}/about`,
    knowsAbout: ['Portrait photography', 'Family photography', 'Photo editing', 'Creative direction'],
  },
]

// Short references for the business entity's founder list.
export const founderRefs = teamPeople.map((person) => ({ '@type': 'Person', '@id': person['@id'], name: person.name }))
