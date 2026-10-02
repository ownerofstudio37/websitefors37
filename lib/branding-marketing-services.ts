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
    metaTitle: 'Custom Website Development Pinehurst TX | Studio37',
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
    metaTitle: 'SEO Services Pinehurst TX | Web, Content & Local Search | Studio37',
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
    metaTitle: 'PPC Management Pinehurst TX | Google Ads & Paid Social | Studio37',
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
    metaTitle: 'Social Media Management Pinehurst TX | Studio37',
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
    metaTitle: 'Brand Content Production Pinehurst TX | Studio37',
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
    metaTitle: 'Video Content Creation Pinehurst TX | Brand Video | Studio37',
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
    metaTitle: 'AEO Services Pinehurst TX | AI Search Visibility | Studio37',
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
