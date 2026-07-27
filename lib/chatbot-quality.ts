export type ChatbotIntent = 'booking' | 'pricing' | 'portfolio' | 'human' | 'services' | 'general'

export type ChatbotRoute = {
  intent: ChatbotIntent
  nextStep?: 'book_consultation' | 'compare_pricing' | 'request_complete_galleries' | 'view_featured_work' | 'ask_human'
  response?: string
  service?: string
  pageUrl?: string
  serviceDetail?: string
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

  if (/\b(commercial|business|brand|branding|usage|license|licensing|rights)\b/.test(text) && /\b(usage|license|licensing|rights|commercial|price|pricing|cost|rate|quote|package|packages|how much)\b/.test(text)) {
    return {
      intent: 'pricing',
      nextStep: 'compare_pricing',
      service: 'commercial',
      pageUrl: 'https://www.studio37.cc/services/commercial-photography',
      serviceDetail: 'services/commercial-photography',
      response: `Commercial photography starts at $500, with usage/licensing shaped around where the images will be used: website, social, ads, print, internal materials, or a broader content library. For the cleanest fit, start with the [commercial photography page](https://www.studio37.cc/services/commercial-photography) or [book a consultation](${links.consult}) for a custom usage quote.`,
    }
  }

  if (/\b(event|events|corporate event|party|birthday|fundraiser|graduation)\b/.test(text) && /\b(price|pricing|cost|rate|quote|package|packages|how much|coverage)\b/.test(text)) {
    return {
      intent: 'pricing',
      nextStep: 'compare_pricing',
      service: 'event',
      pageUrl: 'https://www.studio37.cc/services/event-photography',
      serviceDetail: 'services/event-photography',
      response: `Event coverage starts at $600, with package fit based on coverage time, guest count, key moments, venue logistics, and whether you need commercial usage. You can compare options on the [event photography page](https://www.studio37.cc/services/event-photography).`,
    }
  }

  if (/\b(portrait|portraits|family|senior|headshot|maternity)\b/.test(text) && /\b(price|pricing|cost|rate|quote|package|packages|how much|session)\b/.test(text)) {
    return {
      intent: 'pricing',
      nextStep: 'compare_pricing',
      service: 'portrait',
      pageUrl: 'https://www.studio37.cc/services/portrait-photography',
      serviceDetail: 'services/portrait-photography',
      response: `Portrait sessions start at $350, with package fit based on session type, location, outfit count, family size, and delivery needs. You can review options on the [portrait photography page](https://www.studio37.cc/services/portrait-photography).`,
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
    message: 'Can I see a full gallery?',
    mustInclude: ['request complete galleries', 'privately'],
    mustNotInclude: ['only gallery.studio37.cc'],
  },
  {
    message: 'How much are portraits?',
    mustInclude: ['$350'],
    mustNotInclude: ['$250'],
  },
  {
    message: 'How much is event coverage?',
    mustInclude: ['$600'],
    mustNotInclude: ['$350'],
  },
  {
    message: 'Do commercial sessions include usage?',
    mustInclude: ['$500'],
    mustNotInclude: ['personal use only'],
  },
]
