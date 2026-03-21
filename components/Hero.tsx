 "use client";

import React from "react";
import { Camera, ArrowRight } from "@/icons";
import Link from "next/link";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/lib/cloudinaryOptimizer";

export default function Hero() {
  const heroTitle = "Photography with editorial polish and real emotion.";
  const heroSubtitle = "Wedding, portrait, and brand photography for clients who want timeless images, a calm process, and a polished final gallery.";
  
  // Static hero image - optimized for LCP
  const rawHeroImage = "https://res.cloudinary.com/dmjxho2rl/image/upload/v1759639187/A4B03835-ED8B-4FBB-A27E-1F2EE6CA1A18_1_105_c_gstgil_e_gen_restore_e_improve_e_sharpen_l_image_upload_My_Brand_IMG_2115_mtuowt_c_scale_fl_relative_w_0.40_o_80_fl_layer_apply_g_south_x_0.03_y_0.04_yqgycj.jpg";
  
  // Generate multi-density sources for responsive loading (reduces LCP bytes)
  const heroImageLarge = optimizeCloudinaryUrl(rawHeroImage, 1600, 'auto:good');
  const heroImageMedium = optimizeCloudinaryUrl(rawHeroImage, 1200, 'auto:good');
  const heroImageSmall = optimizeCloudinaryUrl(rawHeroImage, 800, 'auto:good');
  // Use the medium as default src (balanced quality vs size).
  const heroImage = heroImageMedium;
  const heroMinHeight = "88svh";
  const overlayPct = 68;

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ 
        minHeight: heroMinHeight,
        contain: 'layout style paint', // Performance: contain layout to prevent reflow
      }}
      aria-label="Hero section - Studio 37 Photography"
    >
      {/* Background Image - Next/Image only to improve LCP request discovery */}
      <div className="absolute inset-0 z-0" style={{ contain: 'strict' }}>
        <Image
          src={heroImage}
          alt="Studio 37 Photography - Professional wedding and portrait photography"
          fill
          priority
          fetchPriority="high"
          quality={70}
          sizes="100vw"
          decoding="async"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>

      {/* Overlay with vintage gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to top, rgba(120, 53, 15, ${
            overlayPct / 100
          }), rgba(146, 64, 14, ${
            Math.max(overlayPct - 20, 0) / 100
          }), rgba(0,0,0,0))`,
          willChange: 'auto', // keep simple; no layer promotion
        }}
      ></div>

      {/* Film grain removed for performance - dark overlay provides depth */}

      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-6xl mx-auto pt-24 md:pt-32 pb-16 md:pb-24">
          <div className="max-w-3xl text-left">
            <div className="eyebrow-hero mb-5">Pinehurst, TX · Weddings · Portraits · Brand</div>
            <h1
              className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-6 leading-[0.95] text-white drop-shadow-lg"
              suppressHydrationWarning
            >
              {heroTitle}
            </h1>

            <p
              className="text-lg md:text-2xl mb-8 text-stone-100 max-w-2xl leading-relaxed"
              suppressHydrationWarning
            >
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-stone-100/90 mb-8">
              <span className="rounded-full bg-white/10 px-4 py-2 border border-white/10">500+ client sessions</span>
              <span className="rounded-full bg-white/10 px-4 py-2 border border-white/10">Two-photographer coverage</span>
              <span className="rounded-full bg-white/10 px-4 py-2 border border-white/10">Packages from $350</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link
              href="/book-consultation"
              className="btn-primary text-lg px-8 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2"
              aria-label="Get instant photography quote"
            >
              Book a Consultation
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>

            <Link
              href="/get-quote"
              className="btn-secondary text-lg px-8 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2"
              aria-label="Get instant photography quote"
            >
              Get Instant Quote
            </Link>

            <Link
              href="https://gallery.studio37.cc"
              className="btn-ghost text-lg px-8 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2"
              aria-label="View our photography portfolio"
            >
              View Portfolio
            </Link>
            </div>
          </div>

          <div className="mt-10 max-w-xl rounded-[28px] border border-white/15 bg-white/10 backdrop-blur-md p-5 md:p-6 text-white shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-amber-300/20 p-3 border border-amber-200/20">
                <Camera className="h-6 w-6 text-amber-200" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-amber-200 mb-2">Why Studio37</p>
                <p className="text-base md:text-lg text-stone-100 leading-relaxed">
                  Vintage warmth, modern polish, and a white-glove client experience from inquiry to final delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-6 md:inset-10 rounded-[32px] border border-white/10 pointer-events-none z-10"></div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow motion-safe:animate-bounce-slow" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-amber-200/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-200/70 rounded-full mt-2"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, 10px);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce-slow { animation: none; }
        }
      `}</style>
    </section>
  );
}
