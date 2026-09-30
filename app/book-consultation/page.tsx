import { Suspense } from 'react'
import ConsultationBookingForm from '@/components/ConsultationBookingForm'
import { Phone, Mail, Clock, CheckCircle2, Search, Target } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { studio37Reviews } from '@/lib/public-content'

export const metadata = generateSEOMetadata({
  title: 'Book a Free Photography Consultation',
  description:
    'Schedule a free 15-minute consultation with Studio37. Get expert recommendations for wedding, portrait, event, or commercial photography and a clear next-step plan.',
  keywords: [
    'free photography consultation',
    'book photographer consultation',
    'photography planning call',
    'wedding consultation Pinehurst TX',
    'portrait consultation Texas',
  ],
  canonicalUrl: 'https://www.studio37.cc/book-consultation',
  pageType: 'service',
})

export default function BookConsultationPage({
  searchParams,
}: {
  searchParams?: { service?: string; source?: string }
}) {
  const proofReviews = [studio37Reviews[4], studio37Reviews[7], studio37Reviews[9]].filter(Boolean)
  const serviceParam = searchParams?.service || ''
  const isMarketingAudit = /marketing-audit|growth|seo|website|branding/i.test(serviceParam)
  const pageCopy = isMarketingAudit
    ? {
        eyebrow: 'Growth Audit',
        title: 'Request Your Free Website + SEO Growth Audit',
        intro:
          'Start with a focused 15-minute audit call. We will review your website, search visibility, content gaps, paid traffic opportunities, and lead path so you know the cleanest next move.',
        cardOneTitle: 'Focused Review',
        cardOneCopy: 'We look at the site, offer, search structure, and obvious conversion gaps before recommending scope.',
        cardTwoTitle: '100% Free',
        cardTwoCopy: 'No obligation. The goal is to identify whether SEO, website structure, content, PPC, or follow-up should come first.',
        cardThreeTitle: 'Clear Next Step',
        cardThreeCopy: 'You leave with a practical direction, not a generic agency menu.',
      }
    : {
        eyebrow: 'Consultation',
        title: 'Book Your Free Consultation',
        intro:
          'Start with a quick 15-minute planning call. We will confirm the right service, package direction, availability, and whether you should book a session, request a quote, or review private gallery examples first.',
        cardOneTitle: 'Quick & Easy',
        cardOneCopy: 'Just 15 minutes to discuss your vision and get expert recommendations.',
        cardTwoTitle: '100% Free',
        cardTwoCopy: 'No obligations, no hidden costs. Just valuable insights for your project',
        cardThreeTitle: 'We Call You',
        cardThreeCopy: 'At your selected time, we will call you and turn the conversation into a clear next step.',
      }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white pt-20">
      {/* Hero Section */}
      <div className="bg-stone-950 text-white py-20 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="eyebrow mb-4 bg-white/10 text-amber-200 border-white/10">{pageCopy.eyebrow}</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {pageCopy.title}
            </h1>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
              {pageCopy.intro}
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="surface-panel text-center p-8">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {isMarketingAudit ? <Search className="h-8 w-8 text-primary-600" /> : <Clock className="h-8 w-8 text-primary-600" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{pageCopy.cardOneTitle}</h3>
            <p className="text-gray-600">
              {pageCopy.cardOneCopy}
            </p>
          </div>

          <div className="surface-panel text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{pageCopy.cardTwoTitle}</h3>
            <p className="text-gray-600">
              {pageCopy.cardTwoCopy}
            </p>
          </div>

          <div className="surface-panel text-center p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {isMarketingAudit ? <Target className="h-8 w-8 text-blue-600" /> : <Phone className="h-8 w-8 text-blue-600" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{pageCopy.cardThreeTitle}</h3>
            <p className="text-gray-600">
              {pageCopy.cardThreeCopy}
            </p>
          </div>
        </div>

        {isMarketingAudit && (
          <div className="mb-12 rounded-xl border border-primary-200 bg-primary-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-800">What To Bring</p>
            <h2 className="mt-2 text-2xl font-bold text-stone-950">Share your website URL and the business outcome you want.</h2>
            <p className="mt-3 max-w-3xl leading-7 text-stone-700">
              Helpful context includes your current site, top service, target location, lead source, ad spend if any, and whether the main issue feels like traffic, trust, conversion, or follow-up.
            </p>
          </div>
        )}

        <div className="mb-12 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">
            {isMarketingAudit ? 'Audit vs. Full Engagement' : 'Consultation vs. Session Booking'}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-950">
            {isMarketingAudit ? 'Use this page when you want a clear growth diagnosis first.' : 'Use this page when you want guidance before committing.'}
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-stone-700">
            {isMarketingAudit
              ? 'The audit call is the first look at your website, search visibility, content, ads, and lead path. A full engagement comes later only if the scope, priority, and expected next step make sense.'
              : 'A consultation is the planning call. Session booking is the paid shoot handoff after the package, timing, location, and deliverables are clear. If you came from pricing or the package recommender, your context helps us recommend the next step faster.'}
          </p>
        </div>

        <div className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">After You Submit</p>
              <h2 className="mt-2 text-2xl font-bold text-stone-950">A real person reviews the details before you commit.</h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-stone-700">
              <p><strong>1.</strong> {isMarketingAudit ? 'We review your website, stated goal, and the service context you shared.' : 'We confirm availability, service fit, and any package context you already shared.'}</p>
              <p><strong>2.</strong> We call at your selected time and recommend the cleanest next step.</p>
              <p><strong>3.</strong> {isMarketingAudit ? 'If the next move is not obvious, we separate quick fixes from deeper website, SEO, PPC, or content work.' : 'If you need proof first, we can send private galleries matched to your project.'}</p>
            </div>
            <p className="mt-5 rounded-lg bg-stone-50 p-3 text-sm font-medium text-stone-700">Typical response window: within one business day for follow-up details.</p>
          </div>
          <div className="grid gap-3">
            {proofReviews.map((review) => (
              <figure key={review.name} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                <blockquote className="text-sm leading-6 text-stone-700">&quot;{review.quote}&quot;</blockquote>
                <figcaption className="mt-3 text-sm text-stone-500">
                  <span className="font-semibold text-stone-950">{review.name}</span> · {review.detail}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* What We'll Discuss */}
        <div className="section-soft p-8 md:p-10 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What We'll Discuss
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{isMarketingAudit ? 'Your Website + Growth Goal' : 'Your Photography Needs'}</h4>
                <p className="text-gray-600 text-sm">
                  {isMarketingAudit ? 'Share your URL, service area, top offer, and what currently feels stuck.' : "Tell us about your event, project, or vision. We'll help you understand what's possible."}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{isMarketingAudit ? 'Channel Priorities' : 'Package Recommendations'}</h4>
                <p className="text-gray-600 text-sm">
                  {isMarketingAudit ? 'We will sort whether the first move is website structure, SEO, PPC, content, social, or follow-up.' : "We'll suggest the best packages and services based on your specific requirements."}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{isMarketingAudit ? 'Scope + Timing' : 'Timeline & Availability'}</h4>
                <p className="text-gray-600 text-sm">
                  {isMarketingAudit ? 'We will discuss what can be improved quickly and what needs a larger build or retainer.' : "Check if we're available for your dates and discuss the project timeline."}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">4</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Pricing & Next Steps</h4>
                <p className="text-gray-600 text-sm">
                  {isMarketingAudit ? 'If there is a fit, we will outline the practical next step and what kind of scope it belongs in.' : 'Get transparent pricing information and understand the booking process.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <Suspense fallback={null}>
          <ConsultationBookingForm />
        </Suspense>

        {/* Alternative Contact Methods */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Prefer to reach out differently?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:sales@studio37.cc"
              className="btn-secondary"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
            <a
              href="tel:+18327139944"
              className="btn-secondary"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 py-8 border-t border-gray-200 flex flex-wrap justify-center gap-8 items-center surface-panel">
          <a href="https://ppa.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
            <img 
              src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774328861/PPA-Logo_wblk6k.png"
              alt="Professional Photographers of America" 
              className="h-16 md:h-20 w-auto object-contain"
              loading="lazy"
              width="120"
              height="80"
            />
          </a>
          <a href="https://www.fullframeinsurance.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
            <img 
              src="https://app.fullframeinsurance.com/media/site_seals/0001/06/3b90b57044c80c69bd9c02042952a0a33dce7681.png"
              alt="Full Frame Insurance Seal" 
              className="h-24 md:h-32 w-auto object-contain"
              loading="lazy"
              width="120"
              height="128"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
