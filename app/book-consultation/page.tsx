import { Metadata } from 'next'
import ConsultationBookingForm from '@/components/ConsultationBookingForm'
import { Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Book a Free Consultation | Studio37 Photography',
  description: 'Schedule a free 15-minute consultation call with our photography team. Discuss your vision, ask questions, and learn how we can bring your photography needs to life.',
  openGraph: {
    title: 'Book a Free Consultation | Studio37 Photography',
    description: 'Schedule a free 15-minute consultation call with our photography team.',
    type: 'website',
  }
}

export default function BookConsultationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your Free Consultation
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Let's discuss your photography needs in a quick 15-minute call. No pressure, just honest advice from our experienced team.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quick & Easy</h3>
            <p className="text-gray-600">
              Just 15 minutes to discuss your vision and get expert recommendations
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">100% Free</h3>
            <p className="text-gray-600">
              No obligations, no hidden costs. Just valuable insights for your project
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">We Call You</h3>
            <p className="text-gray-600">
              At your selected time, we'll give you a call to discuss everything
            </p>
          </div>
        </div>

        {/* What We'll Discuss */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What We'll Discuss
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
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
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
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
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
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
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
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
              href="mailto:contact@studio37photography.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors font-medium"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors font-medium"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
