import React from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import LazyMount from "@/components/LazyMount";
import { PressCredentialsBlock } from "@/components/BuilderRuntime";
import { generateSEOMetadata } from "@/lib/seo-helpers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
// Note: MDX builder components are dynamically imported only when needed

// Lazy load below-the-fold components for better initial page load
const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="h-96 bg-gray-50" />,
});
const ServiceAreaSEO = dynamic(
  () => import("@/components/ServiceAreaSEO"),
  {
    loading: () => <div className="h-96 bg-white" />,
  }
);
const PortraitHighlightGallery = dynamic(
  () => import("@/components/PortraitHighlightGallery"),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-gray-50" />,
  }
);
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-96 bg-white" />,
});

// Defer newsletter modal - loads after page is interactive
const DiscountNewsletterModal = dynamic(
  () => import("@/components/DiscountNewsletterModal"),
  {
    ssr: false,
    loading: () => null,
  }
);

export const metadata = generateSEOMetadata({
  title: "Professional Photography Services in Pinehurst, TX",
  description:
    "Award-winning wedding, portrait & event photography in Pinehurst, Texas. Blending vintage film warmth with modern precision. Serving Montgomery County & Houston. Book today!",
  keywords: [
    "wedding photography Pinehurst TX",
    "portrait photographer Texas",
    "event photography Montgomery County",
    "commercial photography The Woodlands",
    "professional photographer near me",
    "family portraits Pinehurst",
    "engagement photography Texas",
  ],
  canonicalUrl: "https://www.studio37.cc",
  pageType: "website",
});

// Try to import rehype-raw, but fall back gracefully if not available
let rehypeRaw: any;
try {
  rehypeRaw = require("rehype-raw");
} catch {
  console.warn(
    "rehype-raw not available on home page; raw HTML in MDX will not be parsed"
  );
}

export default async function HomePage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  // If an editor-managed home page exists in content_pages (slug 'home'), render it.
  // Otherwise, fall back to the static homepage sections below.
  const supabase = createServerComponentClient({ cookies });
  const { data: siteSettings } = await supabase
    .from("settings")
    .select("*")
    .single();
  const { data: page } = await supabase
    .from("content_pages")
    .select("*")
    .eq("slug", "home")
    .eq("published", true)
    .maybeSingle();

  const useDraft = (searchParams?.edit === '1')
  const currentPath = "/"

  if (page?.content) {
    const { MDXBuilderComponents } = await import("@/components/BuilderRuntime")
    const { getPageConfigs, selectProps, getPageLayout } = await import("@/lib/pageConfigs")
    const EditableChrome = (await import("@/components/editor/EditableChrome")).default

    const [configs, layout] = await Promise.all([
      getPageConfigs(currentPath),
      getPageLayout(currentPath, useDraft)
    ])

    // If a persisted layout exists for this path, render from it instead of MDX
    if (layout && Array.isArray(layout.blocks) && layout.blocks.length > 0) {
      return (
        <div className="min-h-screen">
          {layout.blocks.map((blk, i) => {
            const Comp: any = (MDXBuilderComponents as any)[blk.type]
            if (!Comp) return null
            const override = blk.id ? configs.get(blk.id) : undefined
            return (
              <div key={blk.id || i} className="relative">
                <EditableChrome label={String(blk.type).replace(/Block$/, '').replace(/([a-z])([A-Z])/g,'$1 $2')} block={blk.type} anchorId={blk.id} />
                <Comp {...(blk.props || {})} _overrides={selectProps(override as any, useDraft)} />
              </div>
            )
          })}
        </div>
      )
    }

    // Fallback to MDX-rendered content with inline overrides
    // Wrap components to inject _overrides prop based on block anchorId
    const defaultAnchorIds: Record<string,string> = {
      LogoBlock:'logo', HeroBlock:'hero', TextBlock:'text', ImageBlock:'image', ButtonBlock:'button', ColumnsBlock:'columns', SpacerBlock:'spacer', SeoFooterBlock:'seo-footer', BadgesBlock:'badges', SlideshowHeroBlock:'slideshow-hero', TestimonialsBlock:'testimonials', GalleryHighlightsBlock:'gallery-highlights', WidgetEmbedBlock:'widget-embed', ServicesGridBlock:'services-grid', StatsBlock:'stats', CTABannerBlock:'cta-banner', IconFeaturesBlock:'icon-features', ContactFormBlock:'contact-form', NewsletterBlock:'newsletter', FAQBlock:'faq', PricingTableBlock:'pricing-table', PricingCalculatorBlock:'pricing-calculator'
    }
    const wrappedComponents = Object.fromEntries(
      Object.entries(MDXBuilderComponents).map(([name, Component]) => [
        name,
        (props: any) => {
          let anchorId = props.id || props.anchorId || defaultAnchorIds[name] || name
          const override = anchorId ? configs.get(anchorId) : undefined
          return (
            <div className="relative">
              <EditableChrome label={name.replace(/Block$/, '').replace(/([a-z])([A-Z])/g,'$1 $2')} block={name} anchorId={anchorId} />
              <Component {...props} _overrides={selectProps(override as any, useDraft)} />
            </div>
          )
        }
      ])
    )
    
    return (
      <div className="min-h-screen">
        <MDXRemote
          source={page.content}
          options={{
            mdxOptions: {
              rehypePlugins: rehypeRaw
                ? [rehypeRaw as any, [rehypeHighlight, {}] as any]
                : [[rehypeHighlight, {}] as any],
            },
          }}
          components={wrappedComponents as any}
        />
      </div>
    );
  }

  // Static fallback homepage - Check for layout override even without MDX content
  if (useDraft) {
    const { MDXBuilderComponents } = await import("@/components/BuilderRuntime")
    const { getPageConfigs, selectProps, getPageLayout } = await import("@/lib/pageConfigs")
    const EditableChrome = (await import("@/components/editor/EditableChrome")).default

    const [configs, layout] = await Promise.all([
      getPageConfigs(currentPath),
      getPageLayout(currentPath, useDraft)
    ])

    // If a persisted layout exists, render from it
    if (layout && Array.isArray(layout.blocks) && layout.blocks.length > 0) {
      return (
        <div className="min-h-screen">
          {layout.blocks.map((blk, i) => {
            const Comp: any = (MDXBuilderComponents as any)[blk.type]
            if (!Comp) return null
            const override = blk.id ? configs.get(blk.id) : undefined
            return (
              <div key={blk.id || i} className="relative">
                <EditableChrome label={String(blk.type).replace(/Block$/, '').replace(/([a-z])([A-Z])/g,'$1 $2')} block={blk.type} anchorId={blk.id} />
                <Comp {...(blk.props || {})} _overrides={selectProps(override as any, useDraft)} />
              </div>
            )
          })}
        </div>
      )
    }

    // Show edit mode message when no layout exists yet
    return (
      <>
        <div className="bg-yellow-50 border-b-2 border-yellow-400 px-4 py-3 text-center">
          <p className="text-sm text-yellow-800">
            <strong>Edit Mode Active</strong> — This page uses static components. 
            <a href="/admin/editor/layout?path=/" className="underline ml-2 font-semibold">Create a layout</a> to add editable blocks, or 
            <a href="/admin/content" className="underline ml-2 font-semibold">create MDX content</a> for this page.
          </p>
        </div>
        <LocalBusinessSchema />
        <Hero />
        <LazyMount minHeight={400}>
          <PortraitHighlightGallery />
        </LazyMount>
        <LazyMount minHeight={400}>
          <Services />
        </LazyMount>
        <LazyMount minHeight={400}>
          <ServiceAreaSEO />
        </LazyMount>

        {/* SEO Text Block */}
        <section className="py-14 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Photography Studio in Pinehurst, TX</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Studio37 Photography is Pinehurst, Texas's premier award-winning photography studio, serving couples, families, businesses, and event organizers across Montgomery County and rankable nearby markets including The Woodlands, Conroe, Willis, New Waverly, Huntsville, Spring, Tomball, Magnolia, Montgomery, New Caney, Porter, Splendora, Cleveland, Hockley, Waller, Plantersville, Navasota, Bryan, College Station, Cypress, Kingwood, Humble, Atascocita, and Houston. Founded by Christian and Caitie, Studio37 is built on a simple promise: every client receives the creative focus, technical excellence, and personal service their moments deserve. Our Signature Duo Coverage — two photographers deployed on every session — sets us apart from every other studio in the region, delivering richer galleries, more candid expressions, and zero missed moments at the same competitive rate. We specialize in wedding photography, portrait sessions, family photography, senior portraits, newborn photography, corporate event coverage, product and brand photography, commercial shoots, and full-service digital marketing and content creation. Blending warm, film-inspired aesthetics with modern post-processing, our images feel timeless, editorial, and authentic. We're proud PPA members, fully insured, and have served 500+ happy clients since 2020.
              </p>
              <p className="text-sm text-gray-500">
                Serving: Pinehurst TX · Magnolia · Tomball · Spring · The Woodlands · Conroe · Montgomery · Willis · New Waverly · Huntsville · New Caney · Porter · Splendora · Cleveland · Hockley · Waller · Plantersville · Navasota · Bryan · College Station · Cypress · Kingwood · Humble · Atascocita · Houston
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Capture Your Story?
              </h2>
              <p className="text-lg text-gray-700">
                Let's discuss your photography needs and create something
                beautiful together.
              </p>
            </div>
            <LeadCaptureForm />
          </div>
        </section>
        <LazyMount minHeight={400}>
          <Testimonials />
        </LazyMount>
        
        {/* Press & Credentials Section */}
        <PressCredentialsBlock 
          title="Featured In & Professional Credentials"
          subtitle="Award-winning photographer recognized by leading industry organizations"
          showBadges={true}
          showPress={true}
        />

        <DiscountNewsletterModal />
      </>
    )
  }

  // Static fallback homepage
  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      {/* Two Photographers Announcement */}
      <div className="bg-primary-50 border-b border-primary-200">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-sm md:text-base text-primary-800 font-medium">
            Two photographers on site — for the price of one. More coverage, more moments, same rate.
          </p>
        </div>
      </div>
      <LazyMount minHeight={400}>
        <PortraitHighlightGallery />
      </LazyMount>
      <LazyMount minHeight={400}>
        <Services />
      </LazyMount>
      <LazyMount minHeight={400}>
        <ServiceAreaSEO />
      </LazyMount>

      {/* SEO Text Block */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Photography Studio in Pinehurst, TX</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Studio37 Photography is Pinehurst, Texas's premier award-winning photography studio, serving couples, families, businesses, and event organizers across Montgomery County and rankable nearby markets including The Woodlands, Conroe, Willis, New Waverly, Huntsville, Spring, Tomball, Magnolia, Montgomery, New Caney, Porter, Splendora, Cleveland, Hockley, Waller, Plantersville, Navasota, Bryan, College Station, Cypress, Kingwood, Humble, Atascocita, and Houston. Founded by Christian and Caitie, Studio37 is built on a simple promise: every client receives the creative focus, technical excellence, and personal service their moments deserve. Our Signature Duo Coverage — two photographers deployed on every session — sets us apart from every other studio in the region, delivering richer galleries, more candid expressions, and zero missed moments at the same competitive rate. We specialize in wedding photography, portrait sessions, family photography, senior portraits, newborn photography, corporate event coverage, product and brand photography, commercial shoots, and full-service digital marketing and content creation. Blending warm, film-inspired aesthetics with modern post-processing, our images feel timeless, editorial, and authentic. We're proud PPA members, fully insured, and have served 500+ happy clients since 2020. Whether you're planning your dream wedding, scheduling a family portrait session, or growing your brand with strategic visual content, Studio37 is your trusted creative partner in Pinehurst and beyond.
            </p>
            <p className="text-sm text-gray-500">
              Serving: Pinehurst TX · Magnolia · Tomball · Spring · The Woodlands · Conroe · Montgomery · Willis · New Waverly · Huntsville · New Caney · Porter · Splendora · Cleveland · Hockley · Waller · Plantersville · Navasota · Bryan · College Station · Cypress · Kingwood · Humble · Atascocita · Houston
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Capture Your Story?
            </h2>
            <p className="text-lg text-gray-700">
              Let's discuss your photography needs and create something
              beautiful together.
            </p>
          </div>
          <LeadCaptureForm />
        </div>
      </section>
      <LazyMount minHeight={400}>
        <Testimonials />
      </LazyMount>

      {/* Press & Credentials Section */}
      <PressCredentialsBlock 
        title="Featured In & Professional Credentials"
        subtitle="Award-winning photographer recognized by leading industry organizations"
        showBadges={true}
        showPress={true}
      />

      <DiscountNewsletterModal />
    </>
  );
}
