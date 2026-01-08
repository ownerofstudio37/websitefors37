import { Metadata } from 'next'
import QrTwoStepForm from '@/components/qr/QrTwoStepForm'

export const metadata: Metadata = {
  title: 'Scan to Claim — T‑Shirt Offer | Studio37',
  description: 'Scan the QR on our T‑shirts to claim an exclusive consultation offer — get up to $50 off when you book a consultation now.',
}

export default function ShirtCampaignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Scan & Save — Up to $50 Off</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-6">Book a consultation now to get up to $50 off your session. Quick 2-step form — we’ll follow up right away.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready to claim your offer?</h2>
          <p className="text-gray-600">Enter your contact info below and we’ll give you the booking link to get the discount.</p>
        </div>

        <QrTwoStepForm campaign="shirt" />

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>By submitting, you agree to receive emails and SMS about your booking. <a href="/privacy" className="underline">Privacy policy</a>.</p>
        </div>
      </div>
    </div>
  )
}
