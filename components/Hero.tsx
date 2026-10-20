import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera } from "@/icons";

// Home page hero: a real client photo, the pitch, and two clear actions. Trust points live in the
// PublicTrustStrip directly below, so they are not repeated here.
// The owner's chosen butterfly macro (with the Studio37 mark). Swap for a client photo here when ready.
const HERO_IMAGE = {
  src: "https://res.cloudinary.com/dmjxho2rl/image/upload/v1759639187/A4B03835-ED8B-4FBB-A27E-1F2EE6CA1A18_1_105_c_gstgil_e_gen_restore_e_improve_e_sharpen_l_image_upload_My_Brand_IMG_2115_mtuowt_c_scale_fl_relative_w_0.40_o_80_fl_layer_apply_g_south_x_0.03_y_0.04_yqgycj.jpg",
  alt: "Macro photo of an orange butterfly on a green flower bud, with the Studio37 logo",
};

export default function Hero() {
  const heroTitle = "Pinehurst wedding, portrait, and event photography that feels calm and true to you.";
  const heroSubtitle =
    "Two photographers on every session, clear direction, and published prices, across Pinehurst, The Woodlands, and Greater Houston.";

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white" aria-label="Studio37 Photography">
      <div className="absolute inset-0">
        <Image src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} fill priority sizes="100vw" quality={90} className="object-cover" />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.35),rgba(12,10,9,0.85))] md:bg-[linear-gradient(90deg,rgba(12,10,9,0.9),rgba(12,10,9,0.55),rgba(12,10,9,0.15))]"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 pb-14 pt-28 md:pb-24 md:pt-36">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <div className="max-w-3xl">
            <div className="eyebrow-hero mb-5">Pinehurst, TX · Greater Houston</div>
            <h1 className="mb-5 font-serif text-4xl font-bold leading-[1.02] drop-shadow-lg sm:text-5xl md:text-7xl">{heroTitle}</h1>
            <p className="mb-7 max-w-2xl text-lg leading-8 text-stone-100 md:text-2xl md:leading-relaxed">{heroSubtitle}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/book-consultation"
                className="btn-primary justify-center px-6 py-3 text-base focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 sm:px-8 sm:py-4 sm:text-lg"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="https://gallery.studio37.cc"
                className="btn-secondary justify-center border-white/60 bg-white/10 px-6 py-3 text-base text-white hover:bg-white hover:text-stone-950 sm:px-8 sm:py-4 sm:text-lg"
              >
                See Our Work
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-amber-100">
              <Link href="/pricing" className="inline-flex items-center hover:underline">
                See all prices
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/tools/package-recommender" className="inline-flex items-center hover:underline">
                Find my package
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="hidden rounded-xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md lg:block">
            <div className="flex items-start gap-4">
              <div className="rounded-lg border border-amber-200/20 bg-amber-300/20 p-3">
                <Camera className="h-6 w-6 text-amber-200" />
              </div>
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-amber-200">Why Studio37</p>
                <p className="text-lg leading-relaxed text-stone-100">
                  Warm color, clean direction, and practical planning before anyone steps in front of the camera.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
