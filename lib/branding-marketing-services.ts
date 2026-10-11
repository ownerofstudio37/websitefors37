export type BrandingMarketingService = {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
  description: string
  parentCardDescription: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroBullets: string[]
  outcomeStats: Array<{
    value: string
    label: string
    note: string
  }>
  improvementAreas: string[]
  industryFits: string[]
  relatedServices: string[]
  bestFor: string[]
  deliverables: string[]
  process: Array<{
    title: string
    copy: string
  }>
  faq: Array<{
    question: string
    answer: string
  }>
}

export const brandingMarketingServices: BrandingMarketingService[] = [
  {
    slug: 'custom-website-development',
    title: 'Custom Website Development in Pinehurst, TX',
    shortTitle: 'Custom Website Development',
    eyebrow: 'Website Systems',
    description:
      'Custom websites, service pages, landing pages, lead flows, and private tools built around how your business actually sells.',
    parentCardDescription:
      'Custom websites, service pages, landing pages, and conversion paths built around your offer, content, SEO, and client journey.',
    metaTitle: 'Custom Website Development in Pinehurst, TX | Studio37',
    metaDescription:
      'Custom website development in Pinehurst, TX for service businesses that need conversion pages, SEO structure, lead flows, and room to grow.',
    keywords: ['custom website development Pinehurst TX', 'service business websites', 'conversion website design', 'local SEO website build'],
    heroBullets: ['Service page architecture', 'Lead capture and follow-up paths', 'SEO-ready content structure', 'Custom admin tools when needed'],
    outcomeStats: [
      { value: '1', label: 'conversion path', note: 'Primary visitor action planned before page design starts.' },
      { value: 'Core Web Vitals', label: 'performance target', note: 'Fast, mobile-friendly pages are part of the build standard.' },
      { value: 'Schema + metadata', label: 'SEO basics', note: 'Search structure is built into priority pages before launch.' },
      { value: '0 dead ends', label: 'navigation goal', note: 'Every key page should give visitors a clear next step.' },
    ],
    improvementAreas: ['Offer clarity', 'Mobile lead flow', 'Service page structure', 'Local SEO foundation', 'Form and consultation paths'],
    industryFits: ['Home services', 'Professional services', 'Local medical and wellness', 'Real estate and construction', 'Specialty retail and ecommerce'],
    relatedServices: ['seo-services', 'ppc-management', 'brand-content-production'],
    bestFor: ['Service businesses with more than one offer', 'Local companies investing in search visibility', 'Brands outgrowing template websites'],
    deliverables: ['Website architecture map', 'Priority page buildout', 'Conversion forms and CTAs', 'Metadata, schema, and analytics basics'],
    process: [
      { title: 'Map the offer', copy: 'Clarify services, audiences, proof, locations, and the action each visitor should take.' },
      { title: 'Build the structure', copy: 'Create pages, sections, forms, navigation, and conversion paths around real business goals.' },
      { title: 'Launch and improve', copy: 'QA mobile, SEO, performance, analytics, and lead handoff before expanding the system.' },
    ],
    faq: [
      {
        question: 'Do you build full websites or only landing pages?',
        answer:
          'We can build full custom websites, focused campaign pages, local SEO page systems, and private tools depending on the scope.',
      },
      {
        question: 'Can you work with an existing website?',
        answer:
          'Yes. We can audit what exists, rebuild priority pages, or plan a phased migration when a full rebuild is not the right first move.',
      },
    ],
  },
  {
    slug: 'seo-services',
    title: 'SEO Services in Pinehurst, TX',
    shortTitle: 'SEO Strategy + Execution',
    eyebrow: 'Search Visibility',
    description:
      'Technical, on-page, local, and content SEO for businesses that need qualified search traffic instead of surface-level keyword edits.',
    parentCardDescription:
      'Technical, on-page, local, and content SEO designed to improve rankings, qualified traffic, and long-term growth.',
    metaTitle: 'SEO Services in Pinehurst, TX | Studio37',
    metaDescription:
      'SEO services in Pinehurst, TX covering technical SEO, local search, service pages, content planning, internal links, and ongoing optimization.',
    keywords: ['SEO services Pinehurst TX', 'local SEO Montgomery County', 'technical SEO consultant', 'service page SEO'],
    heroBullets: ['Technical SEO cleanup', 'Local search structure', 'Service and location page planning', 'Content topics tied to buyer intent'],
    outcomeStats: [
      { value: '76', label: 'peak page-one keywords', note: 'Reached in the Above Beyond Pools SEO case study.' },
      { value: '3', label: '#1 rankings', note: 'Money-term rankings documented in the same case study.' },
      { value: '58%', label: 'impression growth', note: 'Measured over a three-month window.' },
      { value: '64', label: 'indexed pages', note: 'Expanded from about 45 indexed pages.' },
    ],
    improvementAreas: ['Technical crawlability', 'Service-intent content', 'Local search coverage', 'Click-through rate', 'Internal linking'],
    industryFits: ['Home services', 'Local contractors', 'Professional services', 'Location-based brands', 'Service businesses with multiple offers'],
    relatedServices: ['custom-website-development', 'brand-content-production', 'ppc-management'],
    bestFor: ['Businesses with weak organic visibility', 'Sites with unclear page structure', 'Teams that need SEO handled with content and conversion together'],
    deliverables: ['SEO audit and priority map', 'Metadata and on-page improvements', 'Internal linking plan', 'Content and local page roadmap'],
    process: [
      { title: 'Audit', copy: 'Review crawlability, metadata, indexation, page intent, internal links, technical blockers, and local signals.' },
      { title: 'Prioritize', copy: 'Separate quick fixes from structural work so the highest-impact pages get attention first.' },
      { title: 'Execute', copy: 'Improve pages, add missing search assets, monitor performance, and expand around proven topics.' },
    ],
    faq: [
      {
        question: 'Is SEO a one-time project or ongoing?',
        answer:
          'Some fixes are one-time, but competitive SEO usually needs ongoing content, technical maintenance, measurement, and iteration.',
      },
      {
        question: 'Do you handle local SEO?',
        answer:
          'Yes. Local SEO can include city/service page structure, Google Business Profile support, internal links, schema, and content planning.',
      },
    ],
  },
  {
    slug: 'ppc-management',
    title: 'PPC Campaign Management in Pinehurst, TX',
    shortTitle: 'PPC Campaign Management',
    eyebrow: 'Paid Growth',
    description:
      'Google and social ad planning, launch, testing, and optimization for businesses that need paid traffic connected to a real conversion path.',
    parentCardDescription:
      'Google and social ad campaign planning, testing, and optimization to generate efficient leads and sales.',
    metaTitle: 'PPC & Google Ads Management in Pinehurst, TX | Studio37',
    metaDescription:
      'PPC campaign management in Pinehurst, TX for Google Ads and paid social with offer strategy, landing pages, testing, and reporting.',
    keywords: ['PPC management Pinehurst TX', 'Google Ads management Montgomery County', 'paid social ads Texas', 'lead generation campaigns'],
    heroBullets: ['Offer and audience planning', 'Landing page alignment', 'Campaign setup and testing', 'Performance reporting'],
    outcomeStats: [
      { value: 'CPL', label: 'cost per lead', note: 'Tracked so spend can move toward better-qualified inquiries.' },
      { value: 'CVR', label: 'conversion rate', note: 'Landing pages and forms are evaluated against actual action.' },
      { value: 'CTR', label: 'ad relevance', note: 'Click-through rate helps reveal stronger messages and audiences.' },
      { value: 'ROAS', label: 'sales signal', note: 'Used when ecommerce or revenue tracking is available.' },
    ],
    improvementAreas: ['Offer-message fit', 'Landing page clarity', 'Conversion tracking', 'Lead quality', 'Budget allocation'],
    industryFits: ['Appointment-based services', 'High-value local offers', 'Campaign launches', 'Seasonal promotions', 'Lead-generation businesses'],
    relatedServices: ['custom-website-development', 'seo-services', 'brand-content-production'],
    bestFor: ['Businesses ready to test lead generation', 'Teams with a clear offer and sales follow-up', 'Campaigns that need creative and landing pages aligned'],
    deliverables: ['Campaign structure', 'Ad copy and creative direction', 'Conversion tracking recommendations', 'Performance review and optimization plan'],
    process: [
      { title: 'Plan', copy: 'Clarify offer, audience, budget, funnel, and success criteria before spending ad dollars.' },
      { title: 'Launch', copy: 'Build campaigns, connect landing pages, set tracking expectations, and start with controlled testing.' },
      { title: 'Optimize', copy: 'Review performance, improve weak points, and shift spend toward stronger messages and audiences.' },
    ],
    faq: [
      {
        question: 'Do you require a minimum ad budget?',
        answer:
          'Budget depends on the market, goal, and campaign type. We will recommend a practical starting range during consultation.',
      },
      {
        question: 'Can you build the landing page too?',
        answer:
          'Yes. PPC works best when the ad, page, proof, form, and follow-up path are planned together.',
      },
    ],
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management in Pinehurst, TX',
    shortTitle: 'Social Media Management',
    eyebrow: 'Social Presence',
    description:
      'Social planning, publishing, creative direction, captions, community support, and reporting for brands that need consistency without generic posting.',
    parentCardDescription:
      'Full management across planning, posting, community engagement, and performance reporting to scale brand presence.',
    metaTitle: 'Social Media Management in Pinehurst, TX | Studio37',
    metaDescription:
      'Social media management in Pinehurst, TX with content calendars, captions, platform-ready creative, posting support, and performance reporting.',
    keywords: ['social media management Pinehurst TX', 'content calendar service', 'social media marketing Montgomery County', 'brand social media support'],
    heroBullets: ['Content calendar planning', 'Caption and post development', 'Platform-ready creative', 'Reporting and refinement'],
    outcomeStats: [
      { value: '30 days', label: 'planning rhythm', note: 'Monthly content planning keeps publishing from becoming reactive.' },
      { value: '3-5', label: 'content pillars', note: 'Focused themes make the brand easier to follow and remember.' },
      { value: 'Saves + shares', label: 'quality signals', note: 'Engagement quality matters more than empty posting volume.' },
      { value: 'Profile visits', label: 'interest signal', note: 'Tracked as a bridge between content and inquiry.' },
    ],
    improvementAreas: ['Posting consistency', 'Brand voice', 'Content pillars', 'Campaign support', 'Engagement quality'],
    industryFits: ['Founder-led brands', 'Local service businesses', 'Personal brands', 'Hospitality and events', 'Visual product brands'],
    relatedServices: ['brand-content-production', 'video-content-creation', 'ppc-management'],
    bestFor: ['Brands that need a consistent voice', 'Businesses with content but no publishing system', 'Teams that want social tied to campaigns and offers'],
    deliverables: ['Monthly content plan', 'Post copy and creative direction', 'Publishing workflow', 'Performance notes and next-step recommendations'],
    process: [
      { title: 'Align', copy: 'Set voice, content pillars, offers, audience, and the role each channel should play.' },
      { title: 'Produce', copy: 'Create platform-ready posts, captions, and campaign content with a repeatable schedule.' },
      { title: 'Refine', copy: 'Review what earns attention, saves, clicks, and inquiries so the plan gets sharper over time.' },
    ],
    faq: [
      {
        question: 'Do you create the content or only schedule posts?',
        answer:
          'We can plan, write, produce, schedule, and review content depending on the retainer scope.',
      },
      {
        question: 'Which platforms do you support?',
        answer:
          'Platform recommendations depend on your audience and offer. Common fits include Instagram, Facebook, LinkedIn, and short-form video channels.',
      },
    ],
  },
  {
    slug: 'brand-content-production',
    title: 'Brand Content Production in Pinehurst, TX',
    shortTitle: 'Brand Content Production',
    eyebrow: 'Content System',
    description:
      'Campaign visuals, product content, team assets, website imagery, and short-form creative planned around how the content will be used.',
    parentCardDescription:
      'Strategic campaign visuals for websites, ads, social media, and sales materials built around your brand voice and buyer journey.',
    metaTitle: 'Brand Content Production in Pinehurst, TX | Studio37',
    metaDescription:
      'Brand content production in Pinehurst, TX for campaign visuals, website assets, social content, product content, and sales materials.',
    keywords: ['brand content production Pinehurst TX', 'business content creation Texas', 'campaign content studio', 'website content production'],
    heroBullets: ['Campaign asset planning', 'Website and ad creative', 'Team and product content', 'Usage-aware delivery'],
    outcomeStats: [
      { value: '1 library', label: 'multi-channel asset set', note: 'Plan content for website, ads, email, social, and sales follow-up together.' },
      { value: 'Shot list', label: 'production control', note: 'Priority assets are mapped before the production day.' },
      { value: 'Usage-ready', label: 'delivery standard', note: 'Assets are grouped around how the business will actually use them.' },
      { value: 'Consistent', label: 'brand system', note: 'Creative direction keeps pages, ads, and social from feeling disconnected.' },
    ],
    improvementAreas: ['Campaign asset planning', 'Website visuals', 'Ad creative', 'Product and team content', 'Sales enablement assets'],
    industryFits: ['Product brands', 'Service businesses', 'Personal brands', 'Real estate and builders', 'Restaurants and hospitality'],
    relatedServices: ['custom-website-development', 'social-media-management', 'video-content-creation'],
    bestFor: ['Brands refreshing their website', 'Businesses launching a campaign', 'Teams that need content for web, ads, social, and sales'],
    deliverables: ['Creative brief', 'Shot and asset list', 'Production schedule', 'Web, social, and campaign-ready deliverables'],
    process: [
      { title: 'Define usage', copy: 'Start with where the content needs to work: website, ads, email, sales, social, or launch materials.' },
      { title: 'Plan production', copy: 'Build the asset list, locations, people, props, product needs, and timing around the campaign.' },
      { title: 'Package assets', copy: 'Deliver content in practical groups so the website, ads, and social plan stay coordinated.' },
    ],
    faq: [
      {
        question: 'Is this different from a normal photo session?',
        answer:
          'Yes. Brand content production starts with usage, campaign goals, and asset needs rather than only session coverage.',
      },
      {
        question: 'Can this pair with a website build?',
        answer:
          'Yes. That is often the strongest fit because the content and page structure can be planned together.',
      },
    ],
  },
  {
    slug: 'video-content-creation',
    title: 'Video Content Creation in Pinehurst, TX',
    shortTitle: 'Video Content Creation',
    eyebrow: 'Motion Content',
    description:
      'Brand videos, product clips, social reels, campaign assets, and ad creative planned around message, platform, and conversion path.',
    parentCardDescription:
      'Brand films, product videos, short-form social content, and ad creatives designed to increase engagement and conversions.',
    metaTitle: 'Video Content Creation in Pinehurst, TX | Studio37',
    metaDescription:
      'Video content creation in Pinehurst, TX for brand videos, product clips, social reels, campaign assets, and ad creative.',
    keywords: ['video content creation Pinehurst TX', 'brand video Texas', 'social media video production', 'ad creative video'],
    heroBullets: ['Message and hook planning', 'Short-form video assets', 'Brand and product clips', 'Campaign-ready delivery'],
    outcomeStats: [
      { value: 'Hook', label: 'first-three-second focus', note: 'Short-form video starts with the reason someone should keep watching.' },
      { value: 'Multi-use', label: 'channel planning', note: 'Clips can support website, paid ads, social, and sales follow-up.' },
      { value: 'Variants', label: 'testing fuel', note: 'Multiple cuts help campaigns test message, length, and format.' },
      { value: 'CTA', label: 'conversion cue', note: 'Each video should point toward a useful next action.' },
    ],
    improvementAreas: ['Message clarity', 'Short-form hooks', 'Ad creative variety', 'Website trust signals', 'Campaign consistency'],
    industryFits: ['Service businesses', 'Product launches', 'Founder-led brands', 'Event venues', 'Local experts and educators'],
    relatedServices: ['social-media-management', 'ppc-management', 'brand-content-production'],
    bestFor: ['Brands needing stronger social creative', 'Product or service launches', 'Businesses that need video aligned with web and ads'],
    deliverables: ['Video content brief', 'Shot and message plan', 'Platform-specific edits', 'Campaign usage recommendations'],
    process: [
      { title: 'Script the intent', copy: 'Clarify the message, hook, audience, and action before production starts.' },
      { title: 'Capture efficiently', copy: 'Plan scenes and clips around the final platforms so the shoot creates useful variations.' },
      { title: 'Deliver for channels', copy: 'Package edits for social, ads, websites, email, or sales follow-up based on the campaign need.' },
    ],
    faq: [
      {
        question: 'Do you make short-form social videos?',
        answer:
          'Yes. Short-form content can be planned as part of a content day, campaign, or ongoing social support retainer.',
      },
      {
        question: 'Can video be part of a larger marketing plan?',
        answer:
          'Yes. Video is strongest when it supports a page, offer, campaign, or social content calendar.',
      },
    ],
  },
  {
    slug: 'aeo-services',
    title: 'Answer Engine Optimization Services in Pinehurst, TX',
    shortTitle: 'Answer Engine Optimization',
    eyebrow: 'AI Search Visibility',
    description:
      'Answer Engine Optimization helps your business become easier for AI answer engines to understand, cite, and recommend through structured content, schema, and entity optimization.',
    parentCardDescription:
      'Get your brand cited by AI answer engines. Structured content, schema, and entity optimization so ChatGPT, Perplexity, and Google AI Overviews recommend your business.',
    metaTitle: 'AEO & AI Search Optimization in Pinehurst, TX | Studio37',
    metaDescription:
      'Answer Engine Optimization services in Pinehurst, TX for brands that want to be cited by ChatGPT, Perplexity, Google AI Overviews, and other AI answer engines.',
    keywords: ['AEO services Pinehurst TX', 'answer engine optimization', 'AI search visibility', 'Google AI Overviews optimization', 'ChatGPT brand citations'],
    heroBullets: ['Structured answer content', 'Schema and entity optimization', 'AI citation readiness', 'Topic authority mapping'],
    outcomeStats: [
      { value: 'Entity', label: 'brand clarity', note: 'Help AI systems understand who you are, what you offer, and where you serve.' },
      { value: 'Schema', label: 'machine-readable signals', note: 'Use structured data to reinforce services, FAQs, reviews, locations, and organization details.' },
      { value: 'Answers', label: 'content format', note: 'Build clear, quotable pages that answer buyer questions directly.' },
      { value: 'AI search', label: 'visibility channel', note: 'Plan for discovery beyond traditional blue-link search results.' },
    ],
    improvementAreas: ['Entity clarity', 'Schema coverage', 'FAQ depth', 'Topical authority', 'Citation-worthy content'],
    industryFits: ['Local service businesses', 'Professional services', 'Healthcare and wellness', 'Home services', 'B2B and technical brands'],
    relatedServices: ['seo-services', 'custom-website-development', 'brand-content-production'],
    bestFor: ['Brands already investing in SEO', 'Businesses with expert answers buyers need', 'Teams that want visibility in AI-generated recommendations'],
    deliverables: ['AEO visibility audit', 'Entity and schema recommendations', 'Answer-focused content plan', 'AI search citation roadmap'],
    process: [
      { title: 'Map the entity', copy: 'Clarify brand, services, locations, proof, people, and relationships so answer engines have cleaner context.' },
      { title: 'Structure the answers', copy: 'Turn priority questions into clear pages, FAQs, definitions, comparisons, and service explanations AI tools can cite.' },
      { title: 'Reinforce signals', copy: 'Improve schema, internal links, content consistency, and authority signals around the topics where you should be recommended.' },
    ],
    faq: [
      {
        question: 'How is AEO different from SEO?',
        answer:
          'SEO focuses on search rankings and organic traffic. AEO builds on that foundation by making your brand, services, answers, and proof easier for AI answer engines to understand and cite.',
      },
      {
        question: 'Can you guarantee ChatGPT or Google AI Overviews will recommend us?',
        answer:
          'No one can guarantee a specific AI citation. The goal is to improve the signals, structure, and content quality that make your business a stronger candidate for AI-generated answers.',
      },
    ],
  },
]

export function getBrandingMarketingService(slug: string) {
  return brandingMarketingServices.find((service) => service.slug === slug)
}

// Per-service depth for the sub-pages. Proof is only first-hand: the Above Beyond Pools engagement, the
// studio37.cc platform we built and run ourselves, and published client reviews. Services without a
// documented result yet have no proof block rather than an invented one.
export type BrandingProof = {
  eyebrow: string
  heading: string
  body: string
  points: string[]
  href?: string
  hrefLabel?: string
  image?: { id: string; alt: string }
  reviewName?: string
  // Shown above the review when it comes from a different client than the project above it.
  reviewLabel?: string
}

export type BrandingDetail = {
  intro: string
  signs: string[]
  included: Array<{ title: string; body: string }>
  proof?: BrandingProof
  moreFaq: Array<{ question: string; answer: string }>
  demoHref?: string
}

const STUDIO37_PLATFORM_POINTS = [
  'A custom admin with leads, lead scoring, bookings, a calendar, email templates, and client portals',
  'Public pricing and package-recommendation tools for visitors',
  '26 city guides generated from one data file, each with its own spots, reviews, and FAQs',
  'Service, LocalBusiness, Breadcrumb, and FAQ structured data on every service page',
]

export const brandingDetails: Record<string, BrandingDetail> = {
  'custom-website-development': {
    intro:
      'A service business website has one job: turn the right visitor into a booked call. We plan the pages around the offers you sell, the questions buyers ask before they reach out, and the follow-up that happens after the form. The build is custom code rather than a page-builder theme, so the site can grow into booking tools, client portals, or an admin your team actually uses.',
    signs: [
      'Your site looks fine but the phone and inbox stay quiet.',
      'Every service lives on one page, so none of them can rank on its own.',
      'Leads arrive by email with no record of where they came from.',
      'Small changes need a developer, so the site falls out of date.',
    ],
    included: [
      { title: 'Site and page map', body: 'Which pages exist, what each one has to rank for, and the single action every page should lead to.' },
      { title: 'Priority page build', body: 'Home, service, and location pages written and built first, with proof and calls to action placed where buyers decide.' },
      { title: 'Lead capture and routing', body: 'Consultation forms, quote tools, and lead records so every inquiry is tracked from first visit to booked job.' },
      { title: 'Search foundation', body: 'Titles, descriptions, structured data, sitemap, and fast mobile pages in place before launch, not added later.' },
    ],
    proof: {
      eyebrow: 'Built and run in-house',
      heading: 'studio37.cc is our own custom build',
      body: 'The site you are on is custom code we designed, built, and maintain, including the private tools behind it. It is the same approach we take for client builds.',
      points: STUDIO37_PLATFORM_POINTS,
      href: '/tools/pricing',
      hrefLabel: 'Try the pricing tool we built',
    },
    moreFaq: [
      {
        question: 'Will I be able to update the site myself?',
        answer:
          'Yes. We plan editing around who on your team will make changes, from simple content editing for text and photos to a custom admin when you need records like leads or bookings.',
      },
      {
        question: 'How is a custom build different from a template site?',
        answer:
          'A template starts with a design and fits your business into it. A custom build starts with your offers, pages, and lead flow, so structure, speed, and tools are shaped around how you sell.',
      },
      {
        question: 'How is pricing set for a website project?',
        answer:
          'Scope is set in a consultation, because the work depends on page count, content needs, integrations, and whether you need custom tools.',
      },
    ],
    demoHref: '/request-portfolio?service=website-demo',
  },
  'seo-services': {
    intro:
      'SEO works when search engines can crawl the site cleanly, every service has a page that matches what buyers type, and those pages earn the click. We start with an audit of indexing, page intent, and internal links, fix what blocks rankings, then build out the service and local pages your market is already searching for.',
    signs: [
      'You rank for your business name but not for the services you sell.',
      'Search Console shows pages as crawled but not indexed.',
      'Several pages compete for the same search, so none of them win.',
      'Competitors with weaker reviews show up above you in local results.',
    ],
    included: [
      { title: 'Technical and indexing audit', body: 'Crawl errors, duplicate or thin pages, canonical problems, sitemap health, and structured data issues, ranked by impact.' },
      { title: 'Service-intent page plan', body: 'One strong page per service and search intent, so pages stop competing with each other and each can rank.' },
      { title: 'On-page and internal links', body: 'Titles, descriptions, headings, and links rewritten so search engines and buyers understand each page fast.' },
      { title: 'Reporting from Search Console', body: 'Impressions, clicks, page-one keywords, and indexed pages tracked from real Search Console data, not vanity scores.' },
    ],
    proof: {
      eyebrow: 'Client result',
      heading: 'Above Beyond Pools: under 10 page-one keywords to 76',
      body: 'An Austin pool and hot tub service company. The SEO partnership began in February 2026; Search Console reporting covered April 23 to September 27, 2026.',
      points: [
        '76 peak page-one keywords, up from under 10',
        '#1 for "hot tub cleaning services near me" and "pool cleaning austin"',
        '58% impression growth over three months',
        'Indexed pages expanded from about 45 to 64',
      ],
      href: '/case-studies/above-beyond-pools-seo',
      hrefLabel: 'Read the case study',
    },
    moreFaq: [
      {
        question: 'How long does SEO take to show results?',
        answer:
          'Technical fixes can show up within weeks, but ranking growth usually builds over months. For Above Beyond Pools, Search Console showed 58% impression growth over a three-month window after the work began.',
      },
      {
        question: 'What does "crawled, currently not indexed" mean?',
        answer:
          'Google visited the page but chose not to include it in results, usually because it looks thin or too similar to another page. The fix is making each page clearly useful and distinct, then requesting a recrawl.',
      },
      {
        question: 'Do you write the content too?',
        answer:
          'Yes. Service pages, location pages, and supporting articles can be written as part of the engagement, built around the searches your buyers use.',
      },
    ],
  },
  'ppc-management': {
    intro:
      'Paid search and paid social buy attention immediately, which makes them the fastest way to test an offer and the fastest way to waste a budget. We plan the offer, audience, and landing page before campaigns go live, set up conversion tracking so every lead is counted, and adjust spend toward the ads and searches that bring in real inquiries.',
    signs: [
      'You are spending on ads but cannot say what a lead costs.',
      'Ads send traffic to your home page instead of a page built for the offer.',
      'Clicks are coming in, but calls and forms are not.',
      'Campaigns were set up once and have not been touched since.',
    ],
    included: [
      { title: 'Offer and audience plan', body: 'Which service to promote, who should see it, and what the ad promises, agreed before any budget is spent.' },
      { title: 'Campaign build', body: 'Google Ads and paid social campaigns structured so spend can be compared by service, audience, and message.' },
      { title: 'Landing page alignment', body: 'A page that matches the ad, carries proof, and makes the next step obvious, built by us if you need one.' },
      { title: 'Tracking and optimization', body: 'Form and call tracking set up first, then regular reviews that move budget toward what produces leads.' },
    ],
    moreFaq: [
      {
        question: 'Google Ads or social ads: which should we start with?',
        answer:
          'Search ads catch people already looking for your service; social ads create demand with people who are not searching yet. Most local service businesses start with search, then add social once tracking is in place.',
      },
      {
        question: 'How do you measure whether ads are working?',
        answer:
          'By cost per lead and lead quality, not clicks. Conversion tracking on forms and calls is set up before launch so every inquiry can be tied back to the campaign that produced it.',
      },
    ],
  },
  'social-media-management': {
    intro:
      'Social media works for a local business when it shows real work, real people, and a reason to reach out, on a schedule you can keep. We set the content pillars and voice, plan a month at a time, produce or edit the posts, and report on what drives profile visits, messages, and inquiries rather than likes alone.',
    signs: [
      'Your last post was weeks ago because no one owns the calendar.',
      'Posts are mostly stock graphics that could belong to any business.',
      'Followers engage, but messages and inquiries do not follow.',
      'Each platform says something different about your business.',
    ],
    included: [
      { title: 'Voice and content pillars', body: 'Three to five themes tied to your offers and proof, so posts stay on-brand without starting from zero each week.' },
      { title: 'Monthly calendar', body: 'A month of posts planned ahead around launches, seasons, and promotions, approved before anything publishes.' },
      { title: 'Posts and captions', body: 'Platform-ready creative and captions, using your real photos and video wherever possible.' },
      { title: 'Monthly review', body: 'What earned saves, shares, profile visits, and messages, and what the next month should change.' },
    ],
    moreFaq: [
      {
        question: 'Do you use our photos or stock images?',
        answer:
          'Your real work performs better, so we plan posts around photos and video of your business. Because we are also a photography studio, content days can be added when you need fresh material.',
      },
      {
        question: 'Do you reply to comments and messages?',
        answer:
          'Community management can be included in the scope. Many businesses prefer to answer inquiries themselves, so we agree on who handles what before launch.',
      },
      {
        question: 'How many posts per week do we need?',
        answer:
          'Consistency matters more than volume. We recommend a schedule your business can sustain, then adjust based on what the monthly review shows.',
      },
    ],
  },
  'brand-content-production': {
    intro:
      'Brand content production starts with where each photo or clip will be used: the home page hero, a service page, an ad, a social post, or a sales deck. From that list we build the shot plan, schedule people and locations, and deliver files grouped by use, so one production day fills the website, the ads, and months of social.',
    signs: [
      'Your website still uses stock photos or images from years ago.',
      'You have photos, but none in the shapes your ads and social need.',
      'Your team, space, and products have changed since your last shoot.',
      'You are launching a site or campaign and need the visuals to match.',
    ],
    included: [
      { title: 'Usage-first creative brief', body: 'Every asset tied to a placement: website sections, ad sizes, social formats, and print or sales use.' },
      { title: 'Shot list and schedule', body: 'People, products, locations, and timing planned so the shoot day runs to a list instead of guesswork.' },
      { title: 'Two-photographer production', body: 'Two photographers on set, so portraits, workspace, and candid moments are covered at the same time.' },
      { title: 'Files grouped by use', body: 'Delivered in sets for web, ads, and social, with commercial usage included.' },
    ],
    proof: {
      eyebrow: 'Client work',
      heading: 'Brand and team content for a local volleyball school',
      body: 'Brand and community content for a volleyball school in Katy, photographed in May 2026.',
      points: ['Staff and members together under the school sign', 'Group photos of staff and families on the court'],
      href: '/services/commercial-photography',
      hrefLabel: 'See commercial photography',
      image: { id: 'VB_School_Chris_Faves_-_158_wlcspc', alt: 'Volleyball school staff and members cheering under the school sign' },
      reviewName: 'Ivana M.',
      reviewLabel: 'From another business client',
    },
    moreFaq: [
      {
        question: 'Do we own the photos?',
        answer:
          'Commercial usage is included, so you can use the content on your website, ads, social channels, and sales materials.',
      },
      {
        question: 'Can you shoot at our location?',
        answer:
          'Yes. We shoot on-site at your business, at locations around Montgomery County and Greater Houston, or at our Pinehurst studio for products and headshots.',
      },
      {
        question: 'How far ahead should we book?',
        answer:
          'Plan a few weeks ahead so the brief, shot list, and scheduling are done before the shoot, especially when several team members need to be there.',
      },
    ],
  },
  'video-content-creation': {
    intro:
      'Short video is now the default format on social and a strong trust signal on a website. We plan each video around one message and one action, capture the footage alongside your photo shoot when that makes sense, and cut versions for each platform, so a single production can supply reels, ads, and a website clip.',
    signs: [
      'Your social channels are photos only while competitors post reels.',
      'Visitors to your site cannot see you, your team, or your work in motion.',
      'You need ad creative and only have one version to test.',
      'You film on your phone but never have time to edit.',
    ],
    included: [
      { title: 'Message and hook plan', body: 'What each video says, why someone keeps watching past the first seconds, and the action it ends on.' },
      { title: 'Shoot plan', body: 'Scenes and clips planned for the final platforms, so one session produces several usable edits.' },
      { title: 'Platform edits', body: 'Vertical cuts for reels and stories, wider cuts for websites, and short variants for ad testing.' },
      { title: 'Photo and video together', body: 'Video can be captured during a brand or event shoot, so you get both from one day.' },
    ],
    proof: {
      eyebrow: 'Client work',
      heading: 'Photo and video coverage in one booking',
      body: 'We already deliver video alongside photography, like the quinceañera photo and video coverage reviewed here.',
      points: ['Photos and video for a quinceañera, delivered together'],
      reviewName: 'Felipa Q.',
    },
    moreFaq: [
      {
        question: 'Can video and photos be shot on the same day?',
        answer:
          'Yes. Planning both together is usually the most efficient option, because locations, people, and styling are already in place.',
      },
      {
        question: 'What video lengths do you deliver?',
        answer:
          'It depends on where the video will run. Social cuts are typically short and vertical, while website and brand videos can run longer.',
      },
    ],
  },
  'aeo-services': {
    intro:
      'AI answer engines like ChatGPT, Perplexity, and Google AI Overviews recommend businesses they can understand and quote. AEO makes that easier: consistent business facts across the web, structured data that spells out your services and locations, and pages that answer buyer questions in plain, quotable sentences.',
    signs: [
      'AI tools describe your business with the wrong services or location.',
      'Your FAQs live in images or scripts that AI crawlers cannot read.',
      'Your pages talk about you but do not answer the questions buyers ask.',
      'You already invest in SEO and want to be ready for AI search.',
    ],
    included: [
      { title: 'Entity and facts audit', body: 'How AI tools describe your business today, and where your name, services, and locations are inconsistent.' },
      { title: 'Structured data', body: 'Organization, LocalBusiness, Service, FAQ, and Breadcrumb markup that matches what is on each page.' },
      { title: 'Answer-first content', body: 'FAQ hubs and service pages that answer price, process, and location questions directly, in text crawlers can read.' },
      { title: 'AI crawler access', body: 'An llms.txt summary and crawler-friendly pages, so the facts you want cited are easy to find.' },
    ],
    proof: {
      eyebrow: 'Built and run in-house',
      heading: 'What we set up on studio37.cc',
      body: 'Our own site is the working example. Everything below is live and can be checked in the page source.',
      points: [
        'An /llms.txt summary of services, prices, and service areas',
        'A coded FAQ hub with answers in plain HTML, not scripts',
        'One FAQ block plus Service, LocalBusiness, and Breadcrumb markup per page',
        'City pages that answer cost, location, permit, and travel questions directly',
      ],
      href: '/faq',
      hrefLabel: 'See our FAQ hub',
    },
    moreFaq: [
      {
        question: 'What is llms.txt?',
        answer:
          'A plain-text file at the root of a website that summarizes who the business is and what it offers, written for AI tools that read the web. Ours is at studio37.cc/llms.txt.',
      },
      {
        question: 'Does AEO replace SEO?',
        answer:
          'No. AI answer engines lean on the same signals as search: crawlable pages, clear structure, and trusted facts. AEO adds answer-first content and structured data on top of a solid SEO foundation.',
      },
    ],
    demoHref: '/request-portfolio?service=website-demo',
  },
}
