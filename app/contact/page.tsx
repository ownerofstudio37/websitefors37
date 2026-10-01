import React from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarCheck, CheckCircle, Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import Schema from '@/components/Schema'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateContactPageSchema, generateOrganizationSchema } from '@/lib/schema'
import { businessInfo } from '@/lib/seo-config'

export const metadata = generateSEOMetadata({
  title: 'Contact Studio37 - Professional Photography in Pinehurst, TX',
  description: `Contact Studio37 in Pinehurst, TX for weddings, portraits and branding. Email ${businessInfo.contact.email} or call ${businessInfo.contact.phone}. Replies within 24 hours.`,
  keywords: [
    'contact Studio37',
    'photography booking Pinehurst TX',
    'photographer contact Texas',
    'photography consultation',
    'Pinehurst photography studio contact',
    'photography inquiry Texas',
    'book photographer Montgomery County'
  ],
  canonicalUrl: 'https://www.studio37.cc/contact',
  pageType: 'contact'
})

export default async function ContactPage() {
  const contactCards = [
    {
      icon: Mail,
      title: 'Email',
      value: businessInfo.contact.email,
      href: `mailto:${businessInfo.contact.email}`,
      note: 'Best for details, dates, links, and project context.',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: businessInfo.contact.phone,
      href: `tel:${businessInfo.contact.phone}`,
      note: 'Available 7 days a week, 8AM-9PM CST.',
    },
    {
      icon: MapPin,
      title: 'Studio',
      value: 'Pinehurst, TX',
      href: '/local-photographer-pinehurst-tx',
      note: 'Studio visits by appointment only. We serve Greater Houston and Montgomery County.',
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col bg-stone-50">
      <Schema schema={[generateContactPageSchema(), generateOrganizationSchema()]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'How far in advance should I book my photography session?', acceptedAnswer: { '@type': 'Answer', text: 'For wedding photography, we recommend booking 6-12 months in advance. For portrait sessions and other events, 2-4 weeks notice is typically sufficient, but availability may vary during peak seasons.' } },
              { '@type': 'Question', name: 'What is your payment policy?', acceptedAnswer: { '@type': 'Answer', text: 'We require a 50% deposit to secure your booking date, with the remaining balance due one week before the session or event. For wedding photography, we offer payment plans.' } },
              { '@type': 'Question', name: 'How many photos will I receive?', acceptedAnswer: { '@type': 'Answer', text: 'The number of photos varies by package and session length. Typically, portrait sessions yield 20-40 edited images, while weddings can range from 300-800 photos. We focus on quality over quantity to deliver the best representation of your event.' } },
              { '@type': 'Question', name: 'How long until I receive my photos?', acceptedAnswer: { '@type': 'Answer', text: "Portrait sessions are typically delivered within 1-2 weeks. Wedding and event photography can take 4-6 weeks. We'll provide select preview images within days of your session." } },
              { '@type': 'Question', name: 'Do you travel for photography sessions?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we travel locally and internationally. Local travel within 30 miles is included in our standard rates. For destinations beyond that, additional travel fees apply.' } }
            ]
          })
        }}
      />
      <div className="absolute left-0 top-20 w-full h-[39rem] z-0 pointer-events-none bg-stone-900">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1759639187/A4B03835-ED8B-4FBB-A27E-1F2EE6CA1A18_1_105_c_gstgil_e_gen_restore_e_improve_e_sharpen_l_image_upload_My_Brand_IMG_2115_mtuowt_c_scale_fl_relative_w_0.40_o_80_fl_layer_apply_g_south_x_0.03_y_0.04_yqgycj.jpg"
          alt="Studio37 Pinehurst photography contact background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/85 via-stone-950/75 to-stone-950/55" />
      </div>
      <div className="container mx-auto px-4 py-24 max-w-6xl w-full flex-1 relative z-10">
        <section className="grid gap-10 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="text-white">
            <div className="eyebrow mb-4 inline-flex bg-white/10 text-amber-200 border-white/10">Contact Studio37</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">Tell us what you&apos;re planning.</h1>
            <p className="max-w-2xl text-xl text-stone-100 leading-relaxed">
              Send the date, city, and type of coverage you need. We&apos;ll help you choose the right next step without making you guess.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/book-consultation" className="btn-primary inline-flex items-center justify-center">
                Book Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="https://gallery.studio37.cc" className="btn-ghost inline-flex items-center justify-center border-white/30 text-white hover:text-white">
                View Portfolio
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              [Clock, 'Replies within 24 hours'],
              [ShieldCheck, 'PPA member and insured'],
              [CalendarCheck, 'Two photographers on every session'],
            ].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm">
                <Icon className="h-5 w-5 text-amber-200" aria-hidden="true" />
                <span>{label as string}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-8">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
            <div>
              <LeadCaptureForm />
            </div>
            <aside className="space-y-4">
              <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
                <p className="eyebrow mb-3">What Happens Next</p>
                <h2 className="text-2xl font-bold text-stone-950">A real person reviews the details.</h2>
                <div className="mt-5 space-y-4">
                  {[
                    'We confirm service fit, date, city, and package direction.',
                    'If proof helps, we send private examples matched to your project.',
                    'If you are ready, we move you into consultation or booking.',
                  ].map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-6 text-stone-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                {contactCards.map(({ icon: Icon, title, value, href, note }) => (
                  <div key={title} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50">
                        <Icon className="h-5 w-5 text-primary-700" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-950">{title}</h3>
                        <a href={href} className="mt-1 inline-flex font-semibold text-primary-700 hover:text-primary-800 hover:underline">
                          {value}
                        </a>
                        <p className="mt-1 text-sm leading-6 text-stone-600">{note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-stone-700">
                Not sure what to book? Choose <strong>Not sure yet</strong> in the form and tell us what you are comparing.
              </div>
            </aside>
          </div>
        </section>
      </div>
      {/* FAQ Section */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8"><div className="eyebrow mb-4">FAQ</div><h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2></div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="surface-panel p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">How far in advance should I book my photography session?</h3>
              <p className="text-gray-600">
                For wedding photography, we recommend booking 6-12 months in advance. For portrait sessions and other events, 2-4 weeks notice is typically sufficient, but availability may vary during peak seasons.
              </p>
            </div>
            <div className="surface-panel p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">What is your payment policy?</h3>
              <p className="text-gray-600">
                We require a 50% deposit to secure your booking date, with the remaining balance due one week before the session or event. For wedding photography, we offer payment plans.
              </p>
            </div>
            <div className="surface-panel p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">How many photos will I receive?</h3>
              <p className="text-gray-600">
                The number of photos varies by package and session length. Typically, portrait sessions yield 20-40 edited images, while weddings can range from 300-800 photos. We focus on quality over quantity to deliver the best representation of your event.
              </p>
            </div>
            <div className="surface-panel p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">How long until I receive my photos?</h3>
              <p className="text-gray-600">
                Portrait sessions are typically delivered within 1-2 weeks. Wedding and event photography can take 4-6 weeks due to the higher volume of images and detailed editing process. We'll provide select preview images within days of your session.
              </p>
            </div>
            <div className="surface-panel p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">Do you travel for photography sessions?</h3>
              <p className="text-gray-600">
                Yes, we travel locally and internationally for photography assignments. Local travel within 30 miles is included in our standard rates. For destinations beyond that, additional travel fees apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Text Block */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="section-soft max-w-5xl mx-auto p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-950 mb-4">Photography Inquiries From Pinehurst And Greater Houston</h2>
            <p className="text-stone-700 leading-8 mb-4">
              Studio37 is based in Pinehurst and serves Montgomery County, The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Huntsville, and Greater Houston. Use the form above, call (832) 713-9944, or email sales@studio37.cc with your date, city, and service type. Portrait sessions start at $350, wedding coverage starts at $1,200, and studio visits are available by appointment at 1701 Goodson Loop Unit 80, Pinehurst, TX 77362.
            </p>
            <p className="text-sm text-stone-500">
              Studio37 Photography · Pinehurst, TX · Phone: (832) 713-9944 · Email: sales@studio37.cc · Serving Montgomery County, The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Huntsville &amp; Greater Houston
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Need a City-Specific Page?</h2>
            <p className="text-gray-700 mb-4">
              Use our service-area pages to review local coverage details and book faster.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="/local-photographer-pinehurst-tx" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">All Locations</a>
              <a href="/local-photographer-new-caney-tx" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">New Caney</a>
              <a href="/local-photographer-willis-tx" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">Willis</a>
              <a href="/local-photographer-hockley-tx" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">Hockley</a>
              <a href="/local-photographer-bryan-tx" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">Bryan</a>
              <a href="/local-photographer-college-station-tx" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">College Station</a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <a href="https://ppa.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
              <Image
                src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774328861/PPA-Logo_wblk6k.png"
                alt="Professional Photographers of America"
                width={160}
                height={80}
                className="h-16 md:h-20 w-auto object-contain"
                unoptimized
              />
            </a>
            <a href="https://www.fullframeinsurance.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
              <Image
                src="https://app.fullframeinsurance.com/media/site_seals/0001/06/3b90b57044c80c69bd9c02042952a0a33dce7681.png"
                alt="Full Frame Insurance Seal"
                width={150}
                height={128}
                className="h-24 md:h-32 w-auto object-contain"
                unoptimized
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
