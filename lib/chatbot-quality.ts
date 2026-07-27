export type ChatbotIntent = 'booking' | 'pricing' | 'portfolio' | 'human' | 'services' | 'general'

export type ChatbotRoute = {
  intent: ChatbotIntent
  nextStep?: 'book_consultation' | 'compare_pricing' | 'request_complete_galleries' | 'view_featured_work' | 'ask_human'
  response?: string
  service?: string
  pageUrl?: string
  serviceDetail?: string
}

const servicePages = {
  wedding: 'https://www.studio37.cc/services/wedding-photography',
  portrait: 'https://www.studio37.cc/services/portrait-photography',
  event: 'https://www.studio37.cc/services/event-photography',
  commercial: 'https://www.studio37.cc/services/commercial-photography',
  engagement: 'https://www.studio37.cc/services/engagement-session',
}

const links = {
  consult: 'https://www.studio37.cc/book-consultation',
  pricing: 'https://www.studio37.cc/tools/pricing',
  recommender: 'https://www.studio37.cc/tools/package-recommender',
  portfolio: 'https://www.studio37.cc/request-portfolio',
  featured: 'https://gallery.studio37.cc',
  services: 'https://www.studio37.cc/services',
  contact: 'https://www.studio37.cc/contact',
}

export const chatbotFallbacks = {
  booking: `I am having trouble answering live right now, but you can still [book a consultation](${links.consult}) and our team will help confirm fit, timing, and next steps.`,
  pricing: `I am having trouble answering live right now, but you can use the [pricing tool](${links.pricing}) or [package recommender](${links.recommender}) to get a useful starting point.`,
  portfolio: `I am having trouble answering live right now. You can view our curated featured work at [gallery.studio37.cc](${links.featured}) or [request complete galleries](${links.portfolio}) for private examples.`,
  human: `I am having trouble answering live right now. You can [contact Studio37](${links.contact}) or call (832) 713-9944 and a real person can help.`,
  general: `I am having trouble answering live right now. You can [book a consultation](${links.consult}), [browse services](${links.services}), [check pricing](${links.pricing}), or call Studio37 at (832) 713-9944.`,
}

export function routeChatbotIntent(message: string): ChatbotRoute {
  const text = message.toLowerCase()

  if (/\b(full|complete|finished|sample|private).{0,30}galler|\bgaller(y|ies)\b|portfolio|examples|see.*work|view.*work/.test(text)) {
    if (/\b(featured|best|public|link|shootproof)\b/.test(text)) {
      return {
        intent: 'portfolio',
        nextStep: 'view_featured_work',
        response: `You can view the curated Studio37 featured gallery here: [view featured work](${links.featured}). Complete galleries are shared privately by project type, so for a full wedding, portrait, event, or commercial example, use [request complete galleries](${links.portfolio}).`,
      }
    }
    return {
      intent: 'portfolio',
      nextStep: 'request_complete_galleries',
      response: `Complete galleries are shared privately so we can send examples that match your project. Start here: [request complete galleries](${links.portfolio}). Our public gallery is a curated best-of preview at [gallery.studio37.cc](${links.featured}).`,
    }
  }

  if (/\$?\s*1,?200|micro|elopement/.test(text) && /wedding|package|include|come with|hours?/.test(text)) {
    return {
      intent: 'pricing',
      nextStep: 'compare_pricing',
      service: 'wedding',
      pageUrl: 'https://www.studio37.cc/services/wedding-photography',
      serviceDetail: 'services/wedding-photography',
      response: `The $1,200 wedding package is the Micro / Elopement package: 3 hours of intimate coverage, guest count under 30, both Studio37 photographers on site, 150+ edited photos, a 48-hour sneak peek, and a private digital gallery with print release. You can compare it here: [wedding photography packages](https://www.studio37.cc/services/wedding-photography).`,
    }
  }

  if (/\b(wedding|weddings|bride|groom|elopement)\b/.test(text) && /\b(price|pricing|cost|rate|quote|package|packages|how much|coverage)\b/.test(text)) {
    return {
      intent: 'pricing',
      nextStep: 'compare_pricing',
      service: 'wedding',
      pageUrl: servicePages.wedding,
      serviceDetail: 'services/wedding-photography',
      response: `Wedding packages start at $1,200 for Micro / Elopement coverage: 3 hours, guest count under 30, both Studio37 photographers on site, 150+ edited photos, a 48-hour sneak peek, and a private digital gallery with print release. Other wedding collections include Essential Coverage at $2,200 for 6 hours, Complete Collection at $3,200 for 8 hours, and Premium Collection at $4,500 for 10+ hours. Compare them here: [wedding photography packages](https://www.studio37.cc/services/wedding-photography).`,
    }
  }

  if (/\b(engagement|proposal|propose|save[-\s]?the[-\s]?date|couple|couples)\b/.test(text) && /\b(price|pricing|cost|rate|quote|package|packages|how much|session|coverage)\b/.test(text)) {
    return {
      intent: 'pricing',
      nextStep: 'compare_pricing',
      service: 'engagement',
      pageUrl: servicePages.engagement,
      serviceDetail: 'services/engagement-session',
      response: `Engagement sessions start at $450 for Signature Engagement coverage. Premium Engagement is $650 with a 75-minute session and 72-hour sneak peek, and Editorial Engagement is $900 with 90+ minutes, creative direction, and a 48 hr sneak peek. Proposal/concierge planning is custom because timing, privacy, decor, location scouting, and photo/video scope can change the plan. Compare options here: [engagement session packages](${servicePages.engagement}).`,
    }
  }

  if (/\b(commercial|business|brand|branding|usage|license|licensing|rights)\b/.test(text) && /\b(usage|license|licensing|rights|commercial|price|pricing|cost|rate|quote|package|packages|how much)\b/.test(text)) {
    return {
      intent: 'pricing',
      nextStep: 'compare_pricing',
      service: 'commercial',
      pageUrl: servicePages.commercial,
      serviceDetail: 'services/commercial-photography',
      response: `Commercial photography starts at $500 for Business Express, then moves to Brand Starter at $850, Content Library at $1,500, and Full Brand Story at $2,800. Usage/licensing is shaped around where the images will be used: website, social, ads, print, internal materials, or a broader content library. Start with the [commercial photography page](${servicePages.commercial}) or [book a consultation](${links.consult}) for a custom usage quote.`,
    }
  }

  if (/\b(event|events|corporate event|party|birthday|fundraiser|graduation)\b/.test(text) && /\b(price|pricing|cost|rate|quote|package|packages|how much|coverage)\b/.test(text)) {
    return {
      intent: 'pricing',
      nextStep: 'compare_pricing',
      service: 'event',
      pageUrl: servicePages.event,
      serviceDetail: 'services/event-photography',
      response: `Event coverage starts at $600 for 2 hours and 50+ edited photos. Standard Coverage is $1,000 for 4 hours with 125+ edited photos and a 72-hour sneak peek, and Premium Coverage is $1,800 for 6 hours with 250+ edited photos. Fit depends on timeline, guest count, key moments, venue logistics, and commercial usage needs. Compare options on the [event photography page](${servicePages.event}).`,
    }
  }

  if (/\b(portrait|portraits|family|senior|headshot|maternity)\b/.test(text) && /\b(price|pricing|cost|rate|quote|package|packages|how much|session)\b/.test(text)) {
    return {
      intent: 'pricing',
      nextStep: 'compare_pricing',
      service: 'portrait',
      pageUrl: servicePages.portrait,
      serviceDetail: 'services/portrait-photography',
      response: `Portrait sessions start at $350 for a 30-minute mini session with 15+ edited photos. Standard portrait sessions are $500 for 60 minutes and 30+ edited photos, and extended sessions are $750 for 90 minutes and 50+ edited photos. Fit depends on session type, location, outfit count, family size, and delivery needs. Review options on the [portrait photography page](${servicePages.portrait}).`,
    }
  }

  if (/\b(price|pricing|cost|rate|quote|package|packages|how much|starting)\b/.test(text)) {
    return {
      intent: 'pricing',
      nextStep: 'compare_pricing',
      response: `Here are the main starting points: portraits from $350, commercial from $500, events from $600, and weddings from $1,200. For a better fit, use the [pricing tool](${links.pricing}) or [package recommender](${links.recommender}).`,
    }
  }

  if (/\b(book|schedule|reserve|consult|availability|available|calendar)\b/.test(text)) {
    return {
      intent: 'booking',
      nextStep: 'book_consultation',
      response: `The best next step is a quick consultation so we can confirm the service, date, location, and package direction. You can [book a consultation](${links.consult}) here.`,
    }
  }

  if (/\b(human|person|someone|call me|talk to|representative|team)\b/.test(text)) {
    return {
      intent: 'human',
      nextStep: 'ask_human',
      response: `Absolutely. You can [contact Studio37](${links.contact}) or call (832) 713-9944 and we can help directly.`,
    }
  }

  return { intent: 'general' }
}

export const chatbotFactCases = [
  {
    message: 'What comes with the $1200 wedding package?',
    mustInclude: ['3 hours', '150+', '48-hour', 'both Studio37 photographers'],
    mustNotInclude: ['2 hours'],
  },
  {
    message: 'Wedding packages',
    mustInclude: ['$1,200', '$2,200', '$3,200', '$4,500'],
    mustNotInclude: ['portraits from $350'],
  },
  {
    message: 'Can I see a full gallery?',
    mustInclude: ['request complete galleries', 'privately'],
    mustNotInclude: ['only gallery.studio37.cc'],
  },
  {
    message: 'How much are portraits?',
    mustInclude: ['$350', '$500', '$750'],
    mustNotInclude: ['$250'],
  },
  {
    message: 'How much is event coverage?',
    mustInclude: ['$600', '$1,000', '$1,800'],
    mustNotInclude: ['$350'],
  },
  {
    message: 'Do commercial sessions include usage?',
    mustInclude: ['$500', '$850', '$1,500', '$2,800'],
    mustNotInclude: ['personal use only'],
  },
  {
    message: 'Engagement packages',
    mustInclude: ['$450', '$650', '$900'],
    mustNotInclude: ['wedding packages start'],
  },
]
