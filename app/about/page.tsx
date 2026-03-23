import React from "react"
import Image from "next/image"
import Link from "next/link"
import { generateSEOMetadata } from '@/lib/seo-helpers'
import BTSFeed from '@/components/BTSFeed'
import { optimizeCloudinaryUrl } from '@/lib/cloudinaryOptimizer'

export const metadata = generateSEOMetadata({
  title: 'About Studio37 - Christian & Caitie Photography Team in Pinehurst, TX',
  description: 'Meet Christian and Caitie, the award-winning photography team behind Studio37 in Pinehurst, Texas. Serving Montgomery County with personalized sessions and artistic excellence.',
  keywords: [
    'about Studio37',
    'Christian photographer Pinehurst TX',
    'Caitie photographer Texas',
    'photography team Montgomery County',
    'professional photographer Pinehurst',
    'award winning photographer Texas'
  ],
  canonicalUrl: 'https://www.studio37.cc/about'
})

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-950 text-white py-24 md:py-32">
        <div className="absolute inset-0 opacity-25">
          <Image
            src={optimizeCloudinaryUrl("https://res.cloudinary.com/dmjxho2rl/image/upload/v1759639187/A4B03835-ED8B-4FBB-A27E-1F2EE6CA1A18_1_105_c_gstgil_e_gen_restore_e_improve_e_sharpen_l_image_upload_My_Brand_IMG_2115_mtuowt_c_scale_fl_relative_w_0.40_o_80_fl_layer_apply_g_south_x_0.03_y_0.04_yqgycj.jpg", 1920, 'auto:low')}
            alt="Studio37 Photography workspace"
            fill
            className="object-cover"
            priority
            quality={70}
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <div className="eyebrow mb-5 bg-white/10 text-amber-200 border-white/10">About Studio37</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">A creative team built around calm direction and timeless work.</h1>
          <p className="text-xl text-stone-200 max-w-3xl mx-auto leading-relaxed">
            Meet the passionate photographers behind Pinehurst's premier photography studio, 
            capturing life's most precious moments throughout Montgomery County.
          </p>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <div className="eyebrow mb-4">The team</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Your Photography Team</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Christian and Caitie bring together years of experience, artistic vision, and genuine passion 
              for storytelling through photography.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Christian */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-72 h-72 md:w-80 md:h-80 mx-auto rounded-[32px] overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                  <Image
                    src={optimizeCloudinaryUrl("https://res.cloudinary.com/dmjxho2rl/image/upload/v1758315615/_MG_9234_aerdni_e_gen_restore_e_improve_l_image_upload_My_Brand_IMG_2115_mtuowt_c_scale_fl_relative_w_0.36_o_80_fl_layer_apply_g_west_x_0.03_y_0.04_bmly4s.jpg", 640, 'auto:low')}
                    alt="Christian - CEO, Marketing Lead, Producer and Photographer at Studio37"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                  Lead Photographer
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Christian</h3>
              <p className="text-amber-700 font-semibold mb-4">
                CEO, Marketing Lead, Producer & Photographer
              </p>
              <div className="surface-panel p-6 rounded-2xl text-left">
                <p className="text-stone-700 mb-4 leading-7">
                  Christian brings a unique blend of business acumen and artistic vision to Studio37. 
                  As CEO and lead photographer, he's passionate about creating not just beautiful images, 
                  but meaningful experiences for every client.
                </p>
                <ul className="text-sm text-stone-600 space-y-2">
                  <li>• Specializes in wedding and commercial photography</li>
                  <li>• 5+ years professional experience</li>
                  <li>• Expert in client relations and project management</li>
                </ul>
              </div>
            </div>

            {/* Caitie */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-72 h-72 md:w-80 md:h-80 mx-auto rounded-[32px] overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                  <Image
                    src={optimizeCloudinaryUrl("https://res.cloudinary.com/dmjxho2rl/image/upload/v1758315656/IMG_6580_axayxe_e_gen_restore_e_improve_e_sharpen_l_image_upload_My_Brand_IMG_2115_mtuowt_c_scale_fl_relative_w_0.36_o_80_fl_layer_apply_g_west_x_0.03_y_0.04_nkjfev.jpg", 640, 'auto:low')}
                    alt="Caitie - Co-Owner, Photographer and Editor at Studio37"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-stone-900 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                  Creative Director
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Caitie</h3>
              <p className="text-stone-700 font-semibold mb-4">
                Co-Owner, Photographer & Editor
              </p>
              <div className="surface-panel p-6 rounded-2xl text-left">
                <p className="text-stone-700 mb-4 leading-7">
                  Caitie's artistic eye and attention to detail ensure every image tells a perfect story. 
                  As co-owner and lead editor, she brings creativity and technical excellence to every project.
                </p>
                <ul className="text-sm text-stone-600 space-y-2">
                  <li>• Specializes in portraits and family photography</li>
                  <li>• Expert photo editor and post-production artist</li>
                  <li>• Creative vision and artistic direction</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="section-soft max-w-6xl mx-auto p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="eyebrow mb-4">Our story</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Studio37 became a trusted creative partner</h2>
              <p className="text-lg text-stone-600">
                How Studio37 became Pinehurst's most trusted photography studio
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-amber-700">Founded on Passion</h3>
                <p className="text-stone-700 mb-6 leading-7">
                  Studio37 Photography was born from Christian and Caitie's shared passion for capturing 
                  life's most meaningful moments. What started as a creative outlet quickly grew into 
                  Pinehurst's premier photography studio.
                </p>
                
                <h3 className="text-2xl font-bold mb-4 text-amber-700">Local Roots, Personal Touch</h3>
                <p className="text-stone-700 mb-6 leading-7">
                  As Pinehurst residents, we understand the unique beauty of Montgomery County. 
                  We're not just your photographers – we're your neighbors, invested in capturing 
                  your story with the care and attention it deserves.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>500+ happy clients served</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>4.9-star average rating</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>Award-winning photography team</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>Serving Montgomery County since 2020</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Dynamic BTS Feed Component */}
                <BTSFeed />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Text Block */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="section-soft max-w-5xl mx-auto p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-950 mb-4">About Studio37 — Pinehurst, TX Photography Team</h2>
            <p className="text-stone-700 leading-8 mb-4">
              Studio37 Photography is owned and operated by Christian and Caitie, a husband-and-wife creative team based in Pinehurst, Texas. Together they've built Montgomery County's most sought-after photography studio, earning a 4.9-star average rating and serving more than 500 clients since 2020 across Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Huntsville, and Greater Houston. Christian brings a background in business strategy, marketing, and cinematography — making him uniquely positioned to deliver images that serve both artistic and commercial goals. Caitie's expertise in editorial post-processing and creative direction ensures every gallery has a cohesive, intentional look that clients love. As proud members of the Professional Photographers of America (PPA) and a fully insured studio, Studio37 holds itself to the highest standards of professionalism, safety, and creative excellence. Our specialty services include wedding photography with Signature Duo Coverage, family and lifestyle portrait sessions, senior and graduation portraits, newborn photography, corporate event documentation, commercial product and brand photography, and full-service digital marketing retainers. If you're looking for a photographer in Pinehurst TX, Montgomery County, or the Greater Houston area who treats every session as a creative collaboration — not just a job — Studio37 is the studio for you.
            </p>
            <p className="text-sm text-stone-500">
              Studio37 Photography · 1701 Goodson Loop Unit 80, Pinehurst, TX 77362 · (832) 713-9944 · sales@studio37.cc
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 bg-stone-50 border-y border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Explore Local Service Area Pages</h2>
            <p className="text-gray-700 mb-4">
              We created city-specific pages so clients can find local details faster.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/locations" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">All Locations</Link>
              <Link href="/the-woodlands" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">The Woodlands</Link>
              <Link href="/conroe" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Conroe</Link>
              <Link href="/magnolia" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Magnolia</Link>
              <Link href="/tomball" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Tomball</Link>
              <Link href="/huntsville" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Huntsville</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-stone-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="eyebrow mb-4 bg-white/10 text-amber-200 border-white/10">Next step</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work with Studio37?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-stone-300">
            Let's discuss your photography needs and create beautiful memories together. 
            Christian and Caitie are excited to capture your story!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="btn-primary"
            >
              Get In Touch
            </Link>
            <Link 
              href="https://gallery.studio37.cc" 
              className="btn-secondary"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="surface-panel flex flex-wrap justify-center gap-8 items-center p-8">
            <a href="https://ppa.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
              <img 
                src="/ppa-logo.png" 
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