export type AIPageTemplate =
  | 'auto'
  | 'service'
  | 'local'
  | 'blogLanding'
  | 'campaign'
  | 'leadMagnet'
  | 'commercial'

export const AI_PAGE_TEMPLATES: Array<{
  id: AIPageTemplate
  label: string
  brief: string
}> = [
  { id: 'auto', label: 'Auto-detect', brief: 'Choose the best structure from the brief.' },
  { id: 'service', label: 'Service page', brief: 'Service page with offer clarity, proof, pricing, FAQ, and booking CTA.' },
  { id: 'local', label: 'Local landing page', brief: 'City/service-area page with local proof, nearby location confidence, and service-specific copy.' },
  { id: 'blogLanding', label: 'Blog landing', brief: 'Editorial landing page with category clarity, featured posts, lead magnet, and conversion paths.' },
  { id: 'campaign', label: 'Campaign page', brief: 'Focused paid/organic campaign page with one offer, strong proof, and low-friction lead capture.' },
  { id: 'leadMagnet', label: 'Lead magnet', brief: 'Download/guide page with value preview, form CTA, trust, and follow-up expectations.' },
  { id: 'commercial', label: 'Commercial/branding', brief: 'Commercial or branding page with usage planning, delivery expectations, licensing support, and sample-gallery request CTA.' },
]

export const STUDIO37_IMAGE_POOL = {
  hero: [
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1759639187/A4B03835-ED8B-4FBB-A27E-1F2EE6CA1A18_1_105_c_gstgil_e_gen_restore_e_improve_e_sharpen_l_image_upload_My_Brand_IMG_2115_mtuowt_c_scale_fl_relative_w_0.40_o_80_fl_layer_apply_g_south_x_0.03_y_0.04_yqgycj.jpg',
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1779268257/PS375315_zyvbbi.jpg',
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1779268256/Untitled-30_fliqiq.jpg',
  ],
  services: [
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1779268256/Untitled-30_fliqiq.jpg',
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1779268257/PS375315_zyvbbi.jpg',
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791657/VB_School_Chris_Faves_-_28_vdjsiw.jpg',
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791658/VB_School_Chris_Faves_-_158_wlcspc.jpg',
  ],
}

const GENERIC_IMAGE_RE = /images\.unsplash\.com|via\.placeholder|placehold\.co|placeholder/i

function isGenericImage(value: unknown) {
  return typeof value === 'string' && GENERIC_IMAGE_RE.test(value)
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function hasType(components: any[], type: string) {
  return components.some((component) => component?.type === type)
}

function includesWeakCopy(value: unknown) {
  if (typeof value !== 'string') return false
  return /\b(lorem ipsum|your headline here|service one|service two|feature 1|feature 2|click here)\b/i.test(value)
}

function scrubWeakStrings(value: any): any {
  if (typeof value === 'string') {
    return includesWeakCopy(value) ? '' : value
  }
  if (Array.isArray(value)) return value.map(scrubWeakStrings)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, scrubWeakStrings(entry)]))
  }
  return value
}

export function getTemplateGuidance(template: AIPageTemplate) {
  return AI_PAGE_TEMPLATES.find((item) => item.id === template)?.brief || AI_PAGE_TEMPLATES[0].brief
}

export function applyAIPageQuality(rawComponents: any[], template: AIPageTemplate = 'auto') {
  const components = rawComponents.map((component, index) => {
    const next = {
      ...component,
      data: scrubWeakStrings(component?.data || {}),
      visibility: component?.visibility || { desktop: true, tablet: true, mobile: true },
    }

    if (next.type === 'hero') {
      next.data.backgroundImage = isGenericImage(next.data.backgroundImage)
        ? STUDIO37_IMAGE_POOL.hero[0]
        : next.data.backgroundImage || STUDIO37_IMAGE_POOL.hero[0]
      next.data.overlay = typeof next.data.overlay === 'number' ? Math.min(Math.max(next.data.overlay, 45), 68) : 56
      next.data.alignment = next.data.alignment || 'left'
      next.data.buttonText = next.data.buttonText || 'Book a Session'
      next.data.buttonLink = next.data.buttonLink || '/book-a-session'
      next.data.secondaryButtonText = next.data.secondaryButtonText || 'Request Complete Galleries'
      next.data.secondaryButtonLink = next.data.secondaryButtonLink || '/request-portfolio'
      next.data.fullBleed = next.data.fullBleed ?? true
    }

    if (next.type === 'servicesGrid' && Array.isArray(next.data.services)) {
      next.data.columns = next.data.columns || 3
      next.data.services = next.data.services.slice(0, 6).map((service: any, serviceIndex: number) => ({
        ...service,
        image: isGenericImage(service?.image)
          ? STUDIO37_IMAGE_POOL.services[serviceIndex % STUDIO37_IMAGE_POOL.services.length]
          : service?.image || STUDIO37_IMAGE_POOL.services[serviceIndex % STUDIO37_IMAGE_POOL.services.length],
        link: service?.link || '/services',
        features: Array.isArray(service?.features) ? service.features.slice(0, 5) : [],
      }))
    }

    if (next.type === 'ctaBanner') {
      next.data.primaryButtonText = next.data.primaryButtonText || 'Start Planning'
      next.data.primaryButtonLink = next.data.primaryButtonLink || '/book-a-session'
      next.data.secondaryButtonText = next.data.secondaryButtonText || 'Request Complete Galleries'
      next.data.secondaryButtonLink = next.data.secondaryButtonLink || '/request-portfolio'
    }

    if (next.type === 'pricingTable' && Array.isArray(next.data.plans)) {
      next.data.plans = next.data.plans.slice(0, 4).map((plan: any) => ({
        ...plan,
        ctaText: plan?.ctaText || 'Request Details',
        ctaLink: plan?.ctaLink || '/book-a-session',
      }))
    }

    if (next.type === 'text' && typeof next.data.content === 'string' && !/<(p|h2|h3|ul|ol)\b/i.test(next.data.content)) {
      next.data.content = `<p>${next.data.content}</p>`
    }

    next.data.animation = next.data.animation || (index < 2 ? 'fade-in' : 'slide-up')
    return next
  })

  if (!hasType(components, 'hero')) {
    components.unshift({
      id: makeId('hero'),
      type: 'hero',
      data: {
        title: 'Studio37 Planning, Proof, and Delivery',
        subtitle: 'A polished page draft with clear offers, real proof, and a confident path to inquiry.',
        backgroundImage: STUDIO37_IMAGE_POOL.hero[0],
        buttonText: 'Book a Session',
        buttonLink: '/book-a-session',
        secondaryButtonText: 'Request Complete Galleries',
        secondaryButtonLink: '/request-portfolio',
        alignment: 'left',
        overlay: 56,
        fullBleed: true,
      },
      visibility: { desktop: true, tablet: true, mobile: true },
    })
  }

  if (!hasType(components, 'testimonials')) {
    components.splice(Math.min(3, components.length), 0, {
      id: makeId('testimonials'),
      type: 'testimonials',
      data: {
        testimonials: [
          { quote: 'The planning, direction, and finished gallery felt polished from start to finish.', author: 'Studio37 Client', subtext: 'Greater Houston session' },
          { quote: 'We knew exactly where to go, what to expect, and when our gallery would arrive.', author: 'Studio37 Client', subtext: 'Pinehurst, TX' },
        ],
      },
      visibility: { desktop: true, tablet: true, mobile: true },
    })
  }

  if (!hasType(components, 'faq')) {
    components.splice(Math.max(components.length - 2, 1), 0, {
      id: makeId('faq'),
      type: 'faq',
      data: {
        heading: 'Questions Before You Book',
        items: [
          { question: 'What happens after I inquire?', answer: 'We review your goals, confirm the right package or plan, and send next steps before anything is finalized.' },
          { question: 'Can I see a complete gallery first?', answer: 'Yes. Request a finished gallery or tailored portfolio so you can see full delivery quality before booking.' },
        ],
      },
      visibility: { desktop: true, tablet: true, mobile: true },
    })
  }

  if (!hasType(components, 'ctaBanner')) {
    components.push({
      id: makeId('cta'),
      type: 'ctaBanner',
      data: {
        heading: template === 'commercial' ? 'Request a Commercial Sample Gallery' : 'Ready to Plan the Next Step?',
        subheading: 'Tell us what you are building and we will point you toward the right package, gallery sample, or consultation.',
        primaryButtonText: 'Book a Consultation',
        primaryButtonLink: '/book-a-session',
        secondaryButtonText: 'Request Complete Galleries',
        secondaryButtonLink: '/request-portfolio',
      },
      visibility: { desktop: true, tablet: true, mobile: true },
    })
  }

  return components.slice(0, 15)
}

export type AIPageQualityStatus = 'pass' | 'warn' | 'fail'

export interface AIPageQualityCheck {
  id: string
  label: string
  status: AIPageQualityStatus
  detail: string
}

export function evaluateAIPageQuality(page: {
  title?: string
  metaDescription?: string
  components?: any[]
}): AIPageQualityCheck[] {
  const components = page.components || []
  const allText = JSON.stringify(components).toLowerCase()
  const hasType = (type: string) => components.some((component) => component?.type === type)
  const hero = components.find((component) => component?.type === 'hero')
  const hasRealImage = components.some((component) => {
    const data = component?.data || {}
    if (typeof data.backgroundImage === 'string' && !isGenericImage(data.backgroundImage)) return true
    if (typeof data.image === 'string' && !isGenericImage(data.image)) return true
    return Array.isArray(data.services) && data.services.some((service: any) => service?.image && !isGenericImage(service.image))
  })
  const hasCta = components.some((component) => {
    const data = component?.data || {}
    return Boolean(data.buttonText || data.primaryButtonText || data.ctaText || data.primaryButtonLink)
  })

  return [
    {
      id: 'cta',
      label: 'Clear CTA',
      status: hasCta ? 'pass' : 'fail',
      detail: hasCta ? 'Primary action is present.' : 'Add a clear booking, inquiry, or portfolio request CTA.',
    },
    {
      id: 'copy',
      label: 'Specific Copy',
      status: /lorem ipsum|your headline here|service one|feature 1/.test(allText) ? 'fail' : 'pass',
      detail: /lorem ipsum|your headline here|service one|feature 1/.test(allText) ? 'Generic placeholder copy remains.' : 'No obvious placeholder copy found.',
    },
    {
      id: 'image',
      label: 'Real Visuals',
      status: hasRealImage ? 'pass' : 'warn',
      detail: hasRealImage ? 'At least one non-placeholder image is used.' : 'Add a real Studio37 or carefully selected page-specific image.',
    },
    {
      id: 'seo',
      label: 'SEO Basics',
      status: page.title && page.title.length >= 20 && page.metaDescription && page.metaDescription.length >= 80 ? 'pass' : 'warn',
      detail: 'Title should be specific; meta description should be roughly 80-160 characters.',
    },
    {
      id: 'proof',
      label: 'Proof',
      status: hasType('testimonials') || /review|gallery|delivered|two photographer|studio37/.test(allText) ? 'pass' : 'warn',
      detail: 'Include reviews, delivery expectations, gallery proof, or Studio37 process confidence.',
    },
    {
      id: 'local',
      label: 'Local Context',
      status: /pinehurst|montgomery|houston|woodlands|tomball|magnolia|conroe/.test(allText) ? 'pass' : 'warn',
      detail: 'Add service-area or location confidence when the page is local or service-driven.',
    },
    {
      id: 'mobile',
      label: 'Mobile Flow',
      status: components.length <= 15 && Boolean(hero?.data?.subtitle) ? 'pass' : 'warn',
      detail: 'Keep section count focused and make sure the first screen has headline, subtitle, and CTA.',
    },
  ]
}
