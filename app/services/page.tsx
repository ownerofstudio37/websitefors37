import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'

export const metadata = generateSEOMetadata({
  title: 'Professional Photography Services in Pinehurst, TX',
  description: 'Studio37 offers comprehensive photography services in Pinehurst, Texas including wedding photography, portrait sessions, event coverage, and commercial photography. Serving Montgomery County and surrounding areas.',
  keywords: [
    'wedding photography Pinehurst TX',
    'portrait photography Texas',
    'event photography Montgomery County',
    'commercial photography services',
    'family photography Pinehurst',
    'corporate headshots Texas',
    'engagement photography',
    'bridal photography Pinehurst'
  ],
  canonicalUrl: 'https://studio37.cc/services',
  pageType: 'service'
})

// Static marketing page; revalidate daily
export const revalidate = 86400

const Services = dynamic(() => import('@/components/Services'), {
  ssr: false,
  loading: () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Photography Services</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            From intimate portraits to grand celebrations, we offer comprehensive photography services tailored to your unique needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-50 p-8 rounded-lg border-2 border-gray-100">
              <div className="h-36 bg-gray-200 rounded-lg mb-6" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-3" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
})

export default function ServicesPage() {
  const serviceSchema = generateServiceSchema(
    'Photography Services',
    'Professional photography services in Pinehurst, Texas including wedding photography, portrait sessions, event coverage, and commercial photography.'
  )

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

  {/* Hero Section */}
  <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-30">
          <Image 
            src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1758315587/_MG_9234_aerdni_e_gen_restore_e_improve_l_image_upload_My_Brand_IMG_2115_mtuowt_c_scale_fl_relative_w_0.36_o_80_fl_layer_apply_g_west_x_0.03_y_0.04_vunmkp.jpg" 
            alt="Photography equipment"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Photography Services in Pinehurst, TX</h1>
            <p className="text-xl text-gray-200 mb-8">
              Capturing life's most precious moments with artistic excellence and professional craftsmanship throughout Montgomery County.
            </p>
            <Link 
              href="#services" 
              className="btn-primary inline-flex items-center text-lg px-6 py-3"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Services Component */}
            {/* Main Services Component */}
      <div id="services" className="py-16">
        <Services />
      </div>

      {/* Two Photographers Announcement */}
      <div className="bg-primary-50 border-y border-primary-200">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-primary-800 font-medium">
            Two photographers on site — for the price of one. More coverage, more moments, same rate.
          </p>
        </div>
      </div>

      {/* Individual Service Pages Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Specialized Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn more about each of our photography specialties with detailed information, packages, and pricing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href="/services/wedding-photography" 
              className="group p-6 bg-gradient-to-br from-rose-50 to-amber-50 rounded-lg border border-rose-200 hover:border-rose-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-200 transition-colors">
                  <span className="text-3xl">💍</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Wedding Photography</h3>
                <p className="text-gray-600 mb-4">Romantic, timeless wedding photography in Pinehurst, TX</p>
                <div className="flex items-center justify-center text-rose-600 group-hover:text-rose-700">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link 
              href="/services/portrait-photography" 
              className="group p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <span className="text-3xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Portrait Photography</h3>
                <p className="text-gray-600 mb-4">Family portraits, senior photos, and professional headshots</p>
                <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link 
              href="/services/event-photography" 
              className="group p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Event Photography</h3>
                <p className="text-gray-600 mb-4">Corporate events, parties, and special celebrations</p>
                <div className="flex items-center justify-center text-green-600 group-hover:text-green-700">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link 
              href="/services/commercial-photography" 
              className="group p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                  <span className="text-3xl">🏢</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Commercial Photography</h3>
                <p className="text-gray-600 mb-4">Business branding, product shots, and corporate imagery</p>
                <div className="flex items-center justify-center text-gray-600 group-hover:text-gray-700">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Services Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Process</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Initial Consultation</h3>
                    <p className="text-gray-600">
                      We start by understanding your vision, preferences, and requirements. This helps us tailor our services to your specific needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Planning & Preparation</h3>
                    <p className="text-gray-600">
                      We plan every detail, from location scouting to lighting setups, ensuring everything is perfect for your shoot.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Photography Session</h3>
                    <p className="text-gray-600">
                      Our professional photographers work their magic, capturing stunning images that tell your unique story.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Post-Production & Delivery</h3>
                    <p className="text-gray-600">
                      Your images are carefully edited and delivered in your preferred format, ready to be cherished for years to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Studio 37</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Professional Expertise</h3>
                    <p className="text-gray-600">Our photographers bring years of experience and technical knowledge to every project.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Customized Approach</h3>
                    <p className="text-gray-600">We tailor our services to match your unique vision and requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">State-of-the-Art Equipment</h3>
                    <p className="text-gray-600">We use the latest photography technology to deliver exceptional image quality.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Attention to Detail</h3>
                    <p className="text-gray-600">We focus on capturing those small, special moments that others might miss.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Quick Turnaround</h3>
                    <p className="text-gray-600">We understand the excitement of seeing your photos, so we work efficiently without sacrificing quality.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Customer Satisfaction</h3>
                    <p className="text-gray-600">Your happiness is our priority, and we work with you until you're completely satisfied.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Session?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Schedule a free 15-minute consultation to discuss your photography needs, or contact us directly to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book-consultation" 
              className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center text-lg transition-colors"
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/contact" 
              className="bg-primary-700 text-white hover:bg-primary-800 border-2 border-white px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center text-lg transition-colors"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
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
      </section>
    </div>
  )
}
