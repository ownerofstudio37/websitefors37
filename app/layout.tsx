import React, { Suspense } from "react";
import "./globals.css";
import { 
  Inter, 
  Playfair_Display,
  Lora, // Secondary serif option
  Montserrat // Secondary sans option
} from "next/font/google";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import QueryProvider from "@/components/QueryProvider";
import { businessInfo, generateLocalBusinessSchema } from "@/lib/seo-config";
import GoogleAnalyticsScript from "@/components/GoogleAnalyticsScript";
import SimpleAnalyticsScript from "@/components/SimpleAnalyticsScript";
import Analytics from "@/components/Analytics";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";
import ToasterClient from "@/components/ToasterClient";
import ChatBotMount from "@/components/ChatBotMount";
import AnalyticsSetup from "@/components/AnalyticsSetup";
import SEOFooter from "@/components/SEOFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
  preload: true,
  fallback: ['georgia', 'serif'],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "optional",
  weight: ["400", "600"],
  preload: false,
  fallback: ['georgia', 'serif'],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "optional",
  weight: ["400", "600"],
  preload: false,
  fallback: ['system-ui', 'arial'],
});

export const metadata = {
  title: {
    template: `%s | ${businessInfo.name} - Pinehurst, TX Photography`,
    default: `Studio37 Photography - Pinehurst, TX | Vintage Film Warmth Meets Modern Precision`,
  },
  description:
    "Studio37 Photography blends vintage film warmth with modern digital precision. Award-winning wedding, portrait, and commercial photography in Pinehurst, TX and Montgomery County.",
  keywords:
    "photography, photographer, Houston TX, Pinehurst TX, wedding photography, portrait photography, vintage style photography, film photography, digital photography, commercial photography",
  authors: [{ name: businessInfo.name }],
  creator: businessInfo.name,
  publisher: businessInfo.name,
  metadataBase: new URL(businessInfo.contact.website),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      'twilio-domain-verification': 'a41a3d624e3ac9cb94868de50be953d2',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  referrer: 'strict-origin-when-cross-origin',
  other: {
    "geo.region": "US-TX",
    "geo.placename": "Pinehurst, Texas",
    "geo.position": `${businessInfo.geo.latitude};${businessInfo.geo.longitude}`,
    ICBM: `${businessInfo.geo.latitude}, ${businessInfo.geo.longitude}`,
  },
};

// Next.js 14: Use the dedicated viewport export instead of metadata.viewport
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const WebVitals = dynamic(() => import("@/components/WebVitals"), {
    ssr: false,
    loading: () => null,
  });
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#b46e14" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema, null, 0),
          }}
        />
        <meta
          name="google-site-verification"
          content={process.env.GOOGLE_SITE_VERIFICATION || ""}
        />
        {/* Resource Hints for Performance */}
        {/* Preconnect to Cloudinary for faster image loading (LCP optimization) */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        {/* Analytics & Third-party */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        {/* Preconnect to Supabase for faster API responses */}
        <link rel="dns-prefetch" href={`//${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '')}`} />
  {/* Removed global Cloudinary Media Library (only needed in admin). */}
        {/* Explicit favicon for modern browsers */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${lora.variable} ${montserrat.variable} font-sans`}>
        {/* Load remaining decorative fonts as CSS variables only when needed */}
        {/* Accessibility: Skip to content link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-amber-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        {/* Google Analytics 4 - Loaded via client component to avoid server → client function prop issues */}
        <GoogleAnalyticsScript />
        {/* Simple Analytics - load safely (no-op on failure) */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <SimpleAnalyticsScript />
        <QueryProvider>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <AnalyticsSetup />
          <WebVitals />
          {/* Wrap dynamic/client sections in an error boundary to avoid hard crashes from runtime errors */}
          {/** Using a dynamic import here would not help with errors during render; instead, use a client error boundary. */}
          <ClientErrorBoundary label="navigation">
            <Navigation />
          </ClientErrorBoundary>
          <ClientErrorBoundary label="page">
            <main id="main" className="min-h-screen">{children}</main>
          </ClientErrorBoundary>
          <ClientErrorBoundary label="footer">
            <SEOFooter />
          </ClientErrorBoundary>
          {/* Interaction-based ChatBot mount for performance */}
          <ClientErrorBoundary label="chatbot">
            <ChatBotMount />
          </ClientErrorBoundary>
          <ToasterClient />
        </QueryProvider>
      </body>
    </html>
  );
}
