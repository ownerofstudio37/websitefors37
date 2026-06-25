import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Privacy Policy | Studio37 Photography',
  description: 'How Studio37 Photography collects, uses, and protects client and lead information submitted through studio37.cc.',
  noIndex: true,
})

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-stone-50 py-20">
      <section className="container mx-auto max-w-3xl px-4">
        <p className="eyebrow mb-3">Privacy</p>
        <h1 className="text-4xl font-bold text-stone-950 md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-stone-600">Last updated June 25, 2026.</p>

        <div className="mt-10 space-y-8 rounded-lg border border-stone-200 bg-white p-6 leading-7 text-stone-700 shadow-sm">
          <section>
            <h2 className="text-2xl font-semibold text-stone-950">Information We Collect</h2>
            <p className="mt-3">
              Studio37 Photography may collect your name, email address, phone number, service interest, event details,
              message content, booking preferences, and source information such as page URL or campaign parameters when
              you submit a form, request a quote, download a guide, or book a session.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stone-950">How We Use It</h2>
            <p className="mt-3">
              We use submitted information to respond to inquiries, prepare quotes, schedule sessions, deliver guides,
              send appointment updates, improve the website, and follow up about services you requested or showed
              interest in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stone-950">Email And SMS</h2>
            <p className="mt-3">
              If you opt in or submit a booking or lead form, we may contact you by email, phone, or SMS about your
              inquiry. Message and data rates may apply. You can ask us to stop non-essential follow-up at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stone-950">Sharing And Storage</h2>
            <p className="mt-3">
              We do not sell personal information. We may use trusted service providers for hosting, analytics, email,
              SMS, CRM, gallery delivery, scheduling, and payment or quote workflows when those tools are needed to run
              the business.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stone-950">Contact</h2>
            <p className="mt-3">
              For privacy questions or deletion requests, email{' '}
              <a href="mailto:ceo@studio37.cc" className="font-semibold text-amber-800 underline">
                ceo@studio37.cc
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
