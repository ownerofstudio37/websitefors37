import ConsultationBookingForm from '@/components/ConsultationBookingForm'
import { Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'

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

export default function BookConsultationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white pt-20">
      {/* Hero Section */}
      <div className="bg-stone-950 text-white py-20 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="eyebrow mb-4 bg-white/10 text-amber-200 border-white/10">Consultation</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Book Your Free Consultation
            </h1>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
              Let's discuss your photography needs in a quick 15-minute call. No pressure, just honest advice from our experienced team.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="surface-panel text-center p-8">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quick & Easy</h3>
            <p className="text-gray-600">
              Just 15 minutes to discuss your vision and get expert recommendations
            </p>
          </div>

          <div className="surface-panel text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">100% Free</h3>
            <p className="text-gray-600">
              No obligations, no hidden costs. Just valuable insights for your project
            </p>
          </div>

          <div className="surface-panel text-center p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">We Call You</h3>
            <p className="text-gray-600">
              At your selected time, we'll give you a call to discuss everything
            </p>
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
                <h4 className="font-semibold text-gray-900 mb-1">Your Photography Needs</h4>
                <p className="text-gray-600 text-sm">
                  Tell us about your event, project, or vision. We'll help you understand what's possible.
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
                <h4 className="font-semibold text-gray-900 mb-1">Package Recommendations</h4>
                <p className="text-gray-600 text-sm">
                  We'll suggest the best packages and services based on your specific requirements.
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
                <h4 className="font-semibold text-gray-900 mb-1">Timeline & Availability</h4>
                <p className="text-gray-600 text-sm">
                  Check if we're available for your dates and discuss the project timeline.
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
                  Get transparent pricing information and understand the booking process.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <ConsultationBookingForm />

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
              src="https://www.ppa.com/assets/images/pages/PPA_logo1_COLOR_RGB_Meta.png" 
              alt="Professional Photographers of America" 
              className="h-16 md:h-20 w-auto object-contain"
            />
          </a>
          <a href="https://www.fullframeinsurance.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
            <img 
              src="https://app.fullframeinsurance.com/media/site_seals/0001/06/3b90b57044c80c69bd9c02042952a0a33dce7681.png" 
              alt="Full Frame Insurance Seal" 
              className="h-24 md:h-32 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
