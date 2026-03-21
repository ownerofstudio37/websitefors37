import Link from 'next/link'
import { businessInfo } from '@/lib/seo-config'

export default function SEOFooter() {
  const { name, legalName, address, contact, serviceAreas } = businessInfo

  return (
    <footer className="bg-gray-950 text-gray-200 border-t border-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">{legalName}</h2>
            <p className="text-sm text-gray-300 mb-3">White-glove photography and brand services for growth-focused clients in Texas.</p>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} {name}. All rights reserved.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-3">NAP</h3>
            <address className="not-italic text-sm text-gray-200 leading-6">
              <div>{legalName}</div>
              <div>{address.streetAddress}</div>
              <div>{address.addressLocality}, {address.addressRegion} {address.postalCode}</div>
              <div>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </div>
              <div>
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </div>
            </address>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/services/branding-marketing" className="hover:text-white transition-colors">Branding &amp; Marketing</Link></li>
              <li><Link href="/book-consultation" className="hover:text-white transition-colors">Book Consultation</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <p className="mt-4 text-xs text-gray-400">
              Serving {serviceAreas.join(', ')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
