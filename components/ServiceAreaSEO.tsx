import React from 'react'
import Link from 'next/link'
import { MapPin, Camera, Building, Heart, Users } from 'lucide-react'

export default function ServiceAreaSEO() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Professional Photography in Pinehurst & Montgomery County
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Studio37 is your premier photography studio serving <strong>Pinehurst, The Woodlands, Conroe, Magnolia, and Tomball</strong>. 
            We are proud to extend our professional services across the entirety of <strong>Montgomery County</strong> and a 
            <strong> 120-mile radius around zip code 77362</strong>. Whether you need on-location shoots or studio sessions, 
            our team brings creativity and technical excellence to every project.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600">
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4 text-primary-600" /> Pinehurst, TX
            </span>
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4 text-primary-600" /> The Woodlands
            </span>
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4 text-primary-600" /> Montgomery County
            </span>
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4 text-primary-600" /> Greater Houston Area
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Commercial */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm text-primary-600">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Commercial</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Elevate your brand with high-end product photography, architectural shots, and business branding content.
            </p>
            <Link href="/commercial-photography" className="text-primary-600 font-medium text-sm hover:underline">
              View Commercial Services &rarr;
            </Link>
          </div>

          {/* Weddings */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm text-primary-600">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Weddings</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Timeless wedding coverage that captures every emotion. From engagement sessions to full-day celebrations.
            </p>
            <Link href="/wedding-photography" className="text-primary-600 font-medium text-sm hover:underline">
              View Wedding Packages &rarr;
            </Link>
          </div>

          {/* Portraits */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm text-primary-600">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Portraits</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Professional headshots, family portraits, and senior pictures. Studio and on-location options available.
            </p>
            <Link href="/portrait-photography" className="text-primary-600 font-medium text-sm hover:underline">
              Book a Session &rarr;
            </Link>
          </div>

          {/* Events */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm text-primary-600">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Events</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Comprehensive coverage for corporate events, galas, parties, and community gatherings.
            </p>
            <Link href="/event-photography" className="text-primary-600 font-medium text-sm hover:underline">
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
