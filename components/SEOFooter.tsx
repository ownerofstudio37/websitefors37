import Link from 'next/link'
import { businessInfo } from '@/lib/seo-config'

export default function SEOFooter() {
  const { name, legalName, address, contact, serviceAreas } = businessInfo

  return (
    <footer className="bg-stone-950 text-stone-200 border-t border-white/5">
      <div className="container mx-auto px-4 py-14">
        <div className="mb-10 rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 md:px-8 md:py-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div>
              <p className="eyebrow mb-4 bg-white/10 text-amber-200 border-white/10">Studio37</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Luxury visuals. Calm process. Better outcomes.</h2>
              <p className="text-stone-300 max-w-2xl leading-relaxed">White-glove photography and brand services for couples, families, and growth-focused businesses across Texas.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link href="/book-consultation" className="btn-primary">Book Consultation</Link>
              <Link href="https://gallery.studio37.cc" className="btn-secondary">View Gallery</Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">{legalName}</h2>
            <p className="text-sm text-stone-300 mb-4 leading-6">White-glove photography and brand services for growth-focused clients in Texas.</p>
            <div className="flex flex-wrap gap-2 text-xs text-stone-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Wedding Photography</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Portraits</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Brand Content</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-400 mb-3">Contact</h3>
            <address className="not-italic text-sm text-stone-200 leading-7">
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
            <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-400 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/locations" className="hover:text-white transition-colors">Service Areas</Link></li>
              <li><Link href="/services/branding-marketing" className="hover:text-white transition-colors">Branding &amp; Marketing</Link></li>
              <li><Link href="/book-consultation" className="hover:text-white transition-colors">Book Consultation</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <p className="mt-4 text-xs text-stone-400 leading-6">
              Serving {serviceAreas.join(', ')}.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-sm text-stone-400 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="https://gallery.studio37.cc" className="hover:text-white transition-colors">Gallery</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
