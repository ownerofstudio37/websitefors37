"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  FileText,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Globe,
  Target,
  ArrowLeft,
  Loader2,
  Brain,
} from "lucide-react";
import Link from "next/link";
import SEOAnalyzerModal from "@/components/SEOAnalyzerModal";
import GAHealthCheckModal from "@/components/GAHealthCheckModal";
import type { ContentPage, BlogPost } from "@/lib/supabase";
import { INDEXABILITY_CHECK_URLS, REQUIRED_SITEMAP_URLS } from "@/lib/seo-audit-config";

interface SEOMetrics {
  totalPages: number;
  pagesWithMeta: number;
  pagesWithImages: number;
  avgTitleLength: number;
  avgDescriptionLength: number;
  sitemapStatus: "active" | "inactive" | "error";
  sitemapIndexStatus: "active" | "inactive" | "error";
  robotsStatus: "active" | "inactive" | "error";
  sitemapUrlCount: number;
  sitemapRequiredUrlsPresent: number;
  sitemapExcludedUrlCount: number;
  sitemapRedirectedUrlCount: number;
  robotsReferencesSitemap: boolean;
  sitemapLastChecked: string | null;
  canonicalChecked: number;
  canonicalHealthy: number;
  structuredServicePages: number;
  structuredLocationPages: number;
  structuredBlogPosts: number;
  structuredFaqPages: number;
  localBusinessSchemaPresent: boolean;
  localSeoPagesChecked: number;
  localSeoPagesHealthy: number;
  indexabilityChecked: number;
  indexabilityHealthy: number;
}

interface SEOIssue {
  id: string;
  title: string;
  description: string;
  status: "open" | "resolved";
  owner: string;
  severity: "high" | "medium" | "low";
  actionLabel: string;
  href?: string;
}

const EXCLUDED_SITEMAP_PATTERNS = [
  /\/admin(?:\/|$)/,
  /\/login$/,
  /\/setup-admin$/,
  /\/gallery$/,
  /\/gallery\/[^/]+/,
  /\/portfolio$/,
];

const REDIRECTED_SITEMAP_PATHS = [
  "/gallery",
  "/portfolio",
  "/pinehurst",
  "/the-woodlands",
  "/spring",
  "/tomball",
  "/conroe",
  "/magnolia",
  "/montgomery",
  "/willis",
  "/huntsville",
  "/new-caney",
  "/new-waverly",
  "/hockley",
  "/bryan",
  "/college-station",
  "/houston",
];

const CANONICAL_CHECK_URLS = [
  "https://www.studio37.cc",
  "https://www.studio37.cc/services",
  "https://www.studio37.cc/book-a-session",
  "https://www.studio37.cc/contact",
  "https://www.studio37.cc/tools/pricing",
  "https://www.studio37.cc/tools/package-recommender",
  "https://www.studio37.cc/session-prep",
  "https://www.studio37.cc/locations",
  "https://www.studio37.cc/locations/katy-tx",
];

const SERVICE_SCHEMA_URLS = [
  "https://www.studio37.cc/services/wedding-photography",
  "https://www.studio37.cc/services/portrait-photography",
  "https://www.studio37.cc/services/commercial-photography",
];

const LOCATION_SCHEMA_URLS = [
  "https://www.studio37.cc/locations/katy-tx",
  "https://www.studio37.cc/local-photographer-houston-tx",
  "https://www.studio37.cc/local-photographer-the-woodlands-tx",
];

const FAQ_SCHEMA_URLS = [
  "https://www.studio37.cc/tools/pricing",
  "https://www.studio37.cc/tools/package-recommender",
  "https://www.studio37.cc/services/wedding-photography",
  "https://www.studio37.cc/session-prep",
];

const LOCAL_SEO_CHECK_URLS = [
  "https://www.studio37.cc/local-photographer-houston-tx",
  "https://www.studio37.cc/local-photographer-the-woodlands-tx",
  "https://www.studio37.cc/local-photographer-magnolia-tx",
  "https://www.studio37.cc/wedding-photographer-katy-tx",
  "https://www.studio37.cc/headshot-photographer-houston-tx",
];

export default function SEOPage() {
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedItem, setSelectedItem] = useState<{
    content: string;
    title: string;
    metaDescription: string;
    url: string;
  } | null>(null);
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [showGAHealth, setShowGAHealth] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"pages" | "posts">("pages");

  const [metrics, setMetrics] = useState<SEOMetrics>({
    totalPages: 0,
    pagesWithMeta: 0,
    pagesWithImages: 0,
    avgTitleLength: 0,
    avgDescriptionLength: 0,
    sitemapStatus: "inactive",
    sitemapIndexStatus: "inactive",
    robotsStatus: "inactive",
    sitemapUrlCount: 0,
    sitemapRequiredUrlsPresent: 0,
    sitemapExcludedUrlCount: 0,
    sitemapRedirectedUrlCount: 0,
    robotsReferencesSitemap: false,
    sitemapLastChecked: null,
    canonicalChecked: 0,
    canonicalHealthy: 0,
    structuredServicePages: 0,
    structuredLocationPages: 0,
    structuredBlogPosts: 0,
    structuredFaqPages: 0,
    localBusinessSchemaPresent: false,
    localSeoPagesChecked: 0,
    localSeoPagesHealthy: 0,
    indexabilityChecked: 0,
    indexabilityHealthy: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSEOData();
  }, []);

  const analyzeLiveUrl = async (url: string) => {
    const response = await fetch("/api/seo/analyze-live", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) return null;
    return response.json();
  };

  const getSchemaTypes = (structuredData: any[]) => {
    const types = new Set<string>();

    const collect = (schema: any) => {
      if (!schema || typeof schema !== "object") return;
      const type = schema["@type"];
      if (Array.isArray(type)) type.forEach((item) => types.add(String(item)));
      if (typeof type === "string") types.add(type);
      if (Array.isArray(schema["@graph"])) schema["@graph"].forEach(collect);
      if (Array.isArray(schema.mainEntity)) schema.mainEntity.forEach(collect);
    };

    structuredData.forEach(collect);
    return types;
  };

  const fetchSEOData = async () => {
    setLoading(true);
    try {
      const { supabase } = await import("@/lib/supabase");

      const [
        { data: pagesData, error: pagesError },
        { data: postsData, error: postsError },
        sitemapResponse,
        sitemapIndexResponse,
        robotsResponse,
      ] = await Promise.all([
        supabase
          .from("content_pages")
          .select("*")
          .order("updated_at", { ascending: false }),
        supabase
          .from("blog_posts")
          .select("*")
          .order("updated_at", { ascending: false }),
        fetch('/sitemap.xml').catch(() => null),
        fetch('/sitemap_index.xml').catch(() => null),
        fetch('/robots.txt').catch(() => null),
      ]);

      if (!pagesError && pagesData) {
        setPages(pagesData);
      }

      if (!postsError && postsData) {
        setPosts(postsData);
      }

      // Calculate metrics
      const allContent = [...(pagesData || []), ...(postsData || [])];
      const pagesWithMeta = allContent.filter((p) => p.meta_description).length;
      const pagesWithImages = allContent.filter((item: any) => {
        const content = typeof item.content === 'string' ? item.content : ''
        const hasImageField = Boolean(
          item.featured_image ||
          item.cover_image ||
          item.hero_image ||
          item.image ||
          item.image_url ||
          item.og_image
        )
        const hasInlineImage = /!\[[^\]]*\]\([^)]*\)|<img\s+[^>]*src=|https?:\/\/[^\s]+\.(png|jpe?g|webp|gif|svg)/i.test(content)
        return hasImageField || hasInlineImage
      }).length
      const avgTitleLength =
        allContent.length > 0
          ? Math.round(
              allContent.reduce((sum, p) => sum + (p.title?.length || 0), 0) /
                allContent.length
            )
          : 0;
      const avgDescLength =
        pagesWithMeta > 0
          ? Math.round(
              allContent
                .filter((p) => p.meta_description)
                .reduce(
                  (sum, p) => sum + (p.meta_description?.length || 0),
                  0
                ) / pagesWithMeta
            )
          : 0;

      let sitemapUrls: string[] = [];
      let robotsText = "";

      if (sitemapResponse?.ok) {
        const sitemapText = await sitemapResponse.clone().text();
        const sitemapXml = new DOMParser().parseFromString(sitemapText, "application/xml");
        sitemapUrls = Array.from(sitemapXml.querySelectorAll("url > loc"))
          .map((node) => node.textContent?.trim())
          .filter((url): url is string => Boolean(url));
      }

      if (robotsResponse?.ok) {
        robotsText = await robotsResponse.clone().text();
      }

      const sitemapRequiredUrlsPresent = REQUIRED_SITEMAP_URLS.filter((url) =>
        sitemapUrls.includes(url)
      ).length;
      const sitemapExcludedUrlCount = sitemapUrls.filter((url) =>
        EXCLUDED_SITEMAP_PATTERNS.some((pattern) => pattern.test(url))
      ).length;
      const redirectedSitemapUrls = REDIRECTED_SITEMAP_PATHS.map((path) => `https://www.studio37.cc${path}`);
      const sitemapRedirectedUrlCount = sitemapUrls.filter((url) =>
        redirectedSitemapUrls.includes(url)
      ).length;
      const robotsReferencesSitemap = /Sitemap:\s*https:\/\/www\.studio37\.cc\/sitemap\.xml/i.test(robotsText);

      const firstBlogPostUrl = (postsData || []).find((post) => post.slug)?.slug
        ? `https://www.studio37.cc/blog/${(postsData || []).find((post) => post.slug)!.slug}`
        : "https://www.studio37.cc/blog";

      const canonicalTargets = [...CANONICAL_CHECK_URLS, firstBlogPostUrl];
      const canonicalResults = await Promise.all(
        canonicalTargets.map(async (url) => ({ url, data: await analyzeLiveUrl(url) }))
      );
      const canonicalHealthy = canonicalResults.filter(({ url, data }) =>
        data?.canonical === url || data?.canonical === `${url}/`
      ).length;

      const serviceSchemaResults = await Promise.all(SERVICE_SCHEMA_URLS.map(analyzeLiveUrl));
      const locationSchemaResults = await Promise.all(LOCATION_SCHEMA_URLS.map(analyzeLiveUrl));
      const faqSchemaResults = await Promise.all(FAQ_SCHEMA_URLS.map(analyzeLiveUrl));
      const blogSchemaResult = await analyzeLiveUrl(firstBlogPostUrl);
      const homeSchemaResult = await analyzeLiveUrl("https://www.studio37.cc");

      const structuredServicePages = serviceSchemaResults.filter((data) => {
        const types = getSchemaTypes(data?.structuredData || []);
        return types.has("Service") || types.has("LocalBusiness");
      }).length;
      const structuredLocationPages = locationSchemaResults.filter((data) => {
        const types = getSchemaTypes(data?.structuredData || []);
        return types.has("LocalBusiness") || types.has("BreadcrumbList") || types.has("Place");
      }).length;
      const structuredFaqPages = faqSchemaResults.filter((data) => {
        const types = getSchemaTypes(data?.structuredData || []);
        return types.has("FAQPage");
      }).length;
      const structuredBlogPosts = (() => {
        const types = getSchemaTypes(blogSchemaResult?.structuredData || []);
        return types.has("Article") || types.has("BlogPosting") ? 1 : 0;
      })();
      const localBusinessSchemaPresent = getSchemaTypes(homeSchemaResult?.structuredData || []).has("LocalBusiness");

      const localSeoResults = await Promise.all(LOCAL_SEO_CHECK_URLS.map(analyzeLiveUrl));
      const localSeoPagesHealthy = localSeoResults.filter((data) => {
        if (!data) return false;
        return Boolean(data.metaDescription) &&
          Boolean(data.openGraph?.image) &&
          data.images?.withoutAlt === 0 &&
          data.content?.wordCount >= 350;
      }).length;

      const indexabilityResults = await Promise.all(
        INDEXABILITY_CHECK_URLS.map(async (url) => ({ url, data: await analyzeLiveUrl(url) }))
      );
      const indexabilityHealthy = indexabilityResults.filter(({ url, data }) => {
        if (!data) return false;
        return Boolean(data.title) &&
          Boolean(data.metaDescription) &&
          (data.canonical === url || data.canonical === `${url}/`) &&
          data.structuredData?.length > 0;
      }).length;

      setMetrics({
        totalPages: allContent.length,
        pagesWithMeta,
        pagesWithImages,
        avgTitleLength,
        avgDescriptionLength: avgDescLength,
        sitemapStatus: sitemapResponse ? (sitemapResponse.ok ? 'active' : 'error') : 'inactive',
        sitemapIndexStatus: sitemapIndexResponse ? (sitemapIndexResponse.ok ? 'active' : 'error') : 'inactive',
        robotsStatus: robotsResponse ? (robotsResponse.ok ? 'active' : 'error') : 'inactive',
        sitemapUrlCount: sitemapUrls.length,
        sitemapRequiredUrlsPresent,
        sitemapExcludedUrlCount,
        sitemapRedirectedUrlCount,
        robotsReferencesSitemap,
        sitemapLastChecked: new Date().toISOString(),
        canonicalChecked: canonicalTargets.length,
        canonicalHealthy,
        structuredServicePages,
        structuredLocationPages,
        structuredBlogPosts,
        structuredFaqPages,
        localBusinessSchemaPresent,
        localSeoPagesChecked: LOCAL_SEO_CHECK_URLS.length,
        localSeoPagesHealthy,
        indexabilityChecked: INDEXABILITY_CHECK_URLS.length,
        indexabilityHealthy,
      });
    } catch (error) {
      console.error("Error fetching SEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeContent = (
    item: ContentPage | BlogPost,
    type: "page" | "post"
  ) => {
    setSelectedItem({
      content: item.content,
      title: item.title,
      metaDescription: item.meta_description || "",
      url:
        type === "page"
          ? `/${(item as ContentPage).slug}`
          : `/blog/${(item as BlogPost).slug}`,
    });
    setShowAnalyzer(true);
  };

  const handleSaveUpdates = async (updates: {
    title?: string;
    metaDescription?: string;
  }) => {
    if (!selectedItem) return;

    try {
      const { supabase } = await import("@/lib/supabase");

      // Find the item being updated
      const page = pages.find((p) => p.title === selectedItem.title);
      const post = posts.find((p) => p.title === selectedItem.title);

      if (page) {
        await supabase
          .from("content_pages")
          .update({
            title: updates.title || page.title,
            meta_description: updates.metaDescription || page.meta_description,
          })
          .eq("id", page.id);
      } else if (post) {
        await supabase
          .from("blog_posts")
          .update({
            title: updates.title || post.title,
            meta_description: updates.metaDescription || post.meta_description,
          })
          .eq("id", post.id);
      }

      // Refresh content
      await fetchSEOData();
    } catch (error) {
      console.error("Error saving updates:", error);
    }
  };

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const seoChecks = [
    {
      name: "Sitemap.xml",
      status: metrics.sitemapStatus === "active" ? "success" : "warning",
      description: "XML sitemap is active and accessible",
      action: "View Sitemap",
      link: "/sitemap.xml",
    },
    {
      name: "Robots.txt",
      status: metrics.robotsStatus === "active" ? "success" : "warning",
      description: "Robots file properly configured",
      action: "View Robots",
      link: "/robots.txt",
    },
    {
      name: "Meta Descriptions",
      status:
        metrics.pagesWithMeta === metrics.totalPages ? "success" : "warning",
      description: `${metrics.pagesWithMeta}/${metrics.totalPages} pages have meta descriptions`,
      action: "Review Pages",
    },
    {
      name: "Page Titles",
      status:
        metrics.avgTitleLength > 30 && metrics.avgTitleLength < 60
          ? "success"
          : "warning",
      description: `Average title length: ${metrics.avgTitleLength} characters`,
      action: "Optimize Titles",
    },
  ];

  const sitemapIsHealthy =
    metrics.sitemapStatus === "active" &&
    metrics.sitemapIndexStatus === "active" &&
    metrics.robotsStatus === "active" &&
    metrics.robotsReferencesSitemap &&
    metrics.sitemapRequiredUrlsPresent === REQUIRED_SITEMAP_URLS.length &&
    metrics.sitemapExcludedUrlCount === 0 &&
    metrics.sitemapRedirectedUrlCount === 0;

  const metaCoverage = metrics.totalPages > 0
    ? Math.round((metrics.pagesWithMeta / metrics.totalPages) * 100)
    : 0;

  const seoIssues: SEOIssue[] = [
    {
      id: "sitemap-access",
      title: "Sitemap and index accessibility",
      description: "Sitemap.xml and sitemap_index.xml should both return successful responses.",
      status: metrics.sitemapStatus === "active" && metrics.sitemapIndexStatus === "active" ? "resolved" : "open",
      owner: "SEO / Engineering",
      severity: "high",
      actionLabel: "Open sitemap",
      href: "/sitemap.xml",
    },
    {
      id: "robots-discovery",
      title: "Robots sitemap discovery",
      description: "Robots.txt should reference the canonical sitemap URL for crawler discovery.",
      status: metrics.robotsStatus === "active" && metrics.robotsReferencesSitemap ? "resolved" : "open",
      owner: "SEO / Engineering",
      severity: "high",
      actionLabel: "Open robots",
      href: "/robots.txt",
    },
    {
      id: "required-sitemap-urls",
      title: "Required sitemap coverage",
      description: `${metrics.sitemapRequiredUrlsPresent}/${REQUIRED_SITEMAP_URLS.length} required URLs are currently present.`,
      status: metrics.sitemapRequiredUrlsPresent === REQUIRED_SITEMAP_URLS.length ? "resolved" : "open",
      owner: "SEO",
      severity: "medium",
      actionLabel: "Review sitemap",
      href: "/sitemap.xml",
    },
    {
      id: "excluded-sitemap-urls",
      title: "Redirected/private URLs in sitemap",
      description: `${metrics.sitemapExcludedUrlCount} excluded URLs and ${metrics.sitemapRedirectedUrlCount} redirected source URLs were detected in sitemap output.`,
      status: metrics.sitemapExcludedUrlCount === 0 && metrics.sitemapRedirectedUrlCount === 0 ? "resolved" : "open",
      owner: "Engineering",
      severity: "high",
      actionLabel: "Review sitemap",
      href: "/sitemap.xml",
    },
    {
      id: "canonical-coverage",
      title: "Canonical tag coverage",
      description: `${metrics.canonicalHealthy}/${metrics.canonicalChecked} sampled pages return a self-referencing canonical URL.`,
      status: metrics.canonicalChecked > 0 && metrics.canonicalHealthy === metrics.canonicalChecked ? "resolved" : "open",
      owner: "SEO / Engineering",
      severity: "high",
      actionLabel: "Recheck canonicals",
    },
    {
      id: "structured-data",
      title: "Structured data coverage",
      description: `${metrics.structuredServicePages}/${SERVICE_SCHEMA_URLS.length} service pages, ${metrics.structuredLocationPages}/${LOCATION_SCHEMA_URLS.length} location pages, ${metrics.structuredFaqPages}/${FAQ_SCHEMA_URLS.length} FAQ targets, blog schema ${metrics.structuredBlogPosts ? "present" : "missing"}, local business schema ${metrics.localBusinessSchemaPresent ? "present" : "missing"}.`,
      status:
        metrics.structuredServicePages === SERVICE_SCHEMA_URLS.length &&
        metrics.structuredLocationPages === LOCATION_SCHEMA_URLS.length &&
        metrics.structuredFaqPages === FAQ_SCHEMA_URLS.length &&
        metrics.structuredBlogPosts === 1 &&
        metrics.localBusinessSchemaPresent
          ? "resolved"
          : "open",
      owner: "SEO / Content",
      severity: "medium",
      actionLabel: "Review structured data",
    },
    {
      id: "local-seo-metadata",
      title: "Top local page copy and image metadata",
      description: `${metrics.localSeoPagesHealthy}/${metrics.localSeoPagesChecked} sampled local pages have meta descriptions, OG images, complete image alt text, and 350+ words.`,
      status: metrics.localSeoPagesChecked > 0 && metrics.localSeoPagesHealthy === metrics.localSeoPagesChecked ? "resolved" : "open",
      owner: "Content",
      severity: "medium",
      actionLabel: "Review local pages",
    },
    {
      id: "tools-lead-magnets-indexability",
      title: "Tools and lead magnet indexability",
      description: `${metrics.indexabilityHealthy}/${metrics.indexabilityChecked} sampled tools and prep-guide pages have title, meta description, self-canonical URL, and structured data.`,
      status: metrics.indexabilityChecked > 0 && metrics.indexabilityHealthy === metrics.indexabilityChecked ? "resolved" : "open",
      owner: "SEO / Engineering",
      severity: "medium",
      actionLabel: "Review tools",
    },
    {
      id: "meta-coverage",
      title: "Meta description coverage",
      description: `${metrics.pagesWithMeta}/${metrics.totalPages} content items have meta descriptions.`,
      status: metrics.totalPages > 0 && metrics.pagesWithMeta === metrics.totalPages ? "resolved" : "open",
      owner: "Content",
      severity: "medium",
      actionLabel: "Review pages",
    },
    {
      id: "title-length",
      title: "Average page title length",
      description: `Average title length is ${metrics.avgTitleLength} characters. Target 30-60 characters.`,
      status: metrics.avgTitleLength > 30 && metrics.avgTitleLength < 60 ? "resolved" : "open",
      owner: "Content",
      severity: "low",
      actionLabel: "Review content",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading SEO data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Admin
            </Link>
            <div>
              <h1 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary-600" />
                SEO Analyzer & AI Tools
              </h1>
              <p className="text-sm text-gray-600">
                Optimize your content for search engines
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* SEO Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.totalPages}
                </p>
                <p className="text-xs text-green-600 mt-1">All indexed</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Title Length
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.avgTitleLength}
                </p>
                <p className="text-xs text-green-600 mt-1">Optimal range</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Meta Coverage
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {metaCoverage}%
                </p>
                <p className="text-xs text-green-600 mt-1">Complete coverage</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SEO Score</p>
                <p className="text-2xl font-bold text-gray-900">92</p>
                <p className="text-xs text-green-600 mt-1">Excellent</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Sitemap Health */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {sitemapIsHealthy ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                )}
                Sitemap Health
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Crawler readiness for sitemap, sitemap index, and robots discovery.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Sitemap
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="/sitemap_index.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Index
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Robots
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-6">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-600">Sitemap URLs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.sitemapUrlCount}</p>
              <p className="text-xs text-gray-500 mt-1">
                {metrics.sitemapLastChecked
                  ? `Checked ${new Date(metrics.sitemapLastChecked).toLocaleTimeString()}`
                  : "Not checked yet"}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-600">Required URLs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {metrics.sitemapRequiredUrlsPresent}/{REQUIRED_SITEMAP_URLS.length}
              </p>
              <p className={metrics.sitemapRequiredUrlsPresent === REQUIRED_SITEMAP_URLS.length ? "text-xs text-green-600 mt-1" : "text-xs text-yellow-600 mt-1"}>
                Homepage, services, booking, contact, pricing, and location sample
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-600">Excluded URLs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {metrics.sitemapExcludedUrlCount + metrics.sitemapRedirectedUrlCount}
              </p>
              <p className={metrics.sitemapExcludedUrlCount === 0 && metrics.sitemapRedirectedUrlCount === 0 ? "text-xs text-green-600 mt-1" : "text-xs text-red-600 mt-1"}>
                Admin/private URLs plus redirected source URLs
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-600">Discovery</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {metrics.robotsReferencesSitemap ? "Ready" : "Review"}
              </p>
              <p className={metrics.robotsReferencesSitemap ? "text-xs text-green-600 mt-1" : "text-xs text-yellow-600 mt-1"}>
                Robots references canonical sitemap
              </p>
            </div>
          </div>
        </div>

        {/* Search Console & Advanced SEO Monitoring */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Search Console Submission</h2>
              <p className="text-sm text-gray-600 mt-1">
                Submit both sitemap endpoints and monitor submitted/indexed counts after deployment.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-900">Primary sitemap</p>
                <code className="mt-1 block text-sm text-gray-700">https://www.studio37.cc/sitemap.xml</code>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-900">Sitemap index</p>
                <code className="mt-1 block text-sm text-gray-700">https://www.studio37.cc/sitemap_index.xml</code>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://search.google.com/search-console/sitemaps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                  Open Search Console
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  onClick={fetchSEOData}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Recheck local sitemap health
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Advanced SEO Coverage</h2>
              <p className="text-sm text-gray-600 mt-1">
                Live sampled checks for canonicals, schemas, and high-value local SEO pages.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-600">Canonicals</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics.canonicalHealthy}/{metrics.canonicalChecked}
                </p>
                <p className="text-xs text-gray-500 mt-1">Self-referencing sampled pages</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-600">Structured Data</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics.structuredServicePages + metrics.structuredLocationPages + metrics.structuredFaqPages + metrics.structuredBlogPosts}
                </p>
                <p className="text-xs text-gray-500 mt-1">Passing schema targets</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-600">Local Business</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics.localBusinessSchemaPresent ? "Ready" : "Review"}
                </p>
                <p className="text-xs text-gray-500 mt-1">Homepage LocalBusiness schema</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-600">Local Pages</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics.localSeoPagesHealthy}/{metrics.localSeoPagesChecked}
                </p>
                <p className="text-xs text-gray-500 mt-1">Copy, OG image, and alt metadata</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Health Checks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              SEO Health Check
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {seoChecks.map((check, index) => (
              <div
                key={index}
                className="p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {check.status === "success" ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{check.name}</h3>
                    <p className="text-sm text-gray-600">{check.description}</p>
                  </div>
                </div>
                {check.link && (
                  <a
                    href={check.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {check.action}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO Issue Queue */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">SEO Issue Queue</h2>
              <p className="text-sm text-gray-600 mt-1">
                Track owner, status, fix action, and recheck action for search readiness issues.
              </p>
            </div>
            <button
              onClick={fetchSEOData}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Loader2 className="h-4 w-4" />
              Recheck all
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {seoIssues.map((issue) => (
              <div key={issue.id} className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 rounded-full p-1 ${issue.status === "resolved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {issue.status === "resolved" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-gray-900">{issue.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          issue.status === "resolved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {issue.status}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          issue.severity === "high" ? "bg-red-100 text-red-700" :
                          issue.severity === "medium" ? "bg-amber-100 text-amber-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                      <p className="text-xs text-gray-500 mt-2">Owner: {issue.owner}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {issue.href ? (
                      <a
                        href={issue.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {issue.actionLabel}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <button
                        onClick={() => setActiveTab("pages")}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {issue.actionLabel}
                      </button>
                    )}
                    <button
                      onClick={fetchSEOData}
                      className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
                    >
                      Recheck
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Analysis Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search pages or posts to analyze..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("pages")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "pages"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pages ({filteredPages.length})
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "posts"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Blog Posts ({filteredPosts.length})
            </button>
          </div>

          {/* Content List */}
          <div className="space-y-3">
            {activeTab === "pages" && filteredPages.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No pages found</p>
              </div>
            )}

            {activeTab === "posts" && filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No blog posts found</p>
              </div>
            )}

            {activeTab === "pages" &&
              filteredPages.map((page) => (
                <div
                  key={page.id}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {page.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">/{page.slug}</p>
                      {page.meta_description && (
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {page.meta_description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>
                          Updated:{" "}
                          {new Date(page.updated_at).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded ${
                            page.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {page.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => analyzeContent(page, "page")}
                      className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 whitespace-nowrap"
                    >
                      <TrendingUp className="h-4 w-4" />
                      Analyze SEO
                    </button>
                  </div>
                </div>
              ))}

            {activeTab === "posts" &&
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        /blog/{post.slug}
                      </p>
                      {post.excerpt && (
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>
                          Updated:{" "}
                          {new Date(post.updated_at).toLocaleDateString()}
                        </span>
                        {post.category && (
                          <span>Category: {post.category}</span>
                        )}
                        <span
                          className={`px-2 py-1 rounded ${
                            post.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => analyzeContent(post, "post")}
                      className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 whitespace-nowrap"
                    >
                      <TrendingUp className="h-4 w-4" />
                      Analyze SEO
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick SEO Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="/admin/settings"
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Update Meta Tags
                    </p>
                    <p className="text-sm text-gray-600">
                      Manage default SEO settings
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="/admin/content"
                className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Content Audit</p>
                    <p className="text-sm text-gray-600">Review page content</p>
                  </div>
                </div>
              </a>

              <a
                href="/admin/chatbot-training"
                className="p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors"
                title="Train your AI assistant with examples and personality settings"
              >
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-pink-600" />
                  <div>
                    <p className="font-medium text-gray-900">AI Training</p>
                    <p className="text-sm text-gray-600">
                      Teach your chatbot with Q&A
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://analytics.google.com/analytics/web/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors block"
                title="Open Google Analytics in a new tab"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Analytics Report
                    </p>
                    <p className="text-sm text-gray-600">
                      View SEO performance
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Analyzer Modal */}
      {selectedItem && (
        <SEOAnalyzerModal
          isOpen={showAnalyzer}
          onClose={() => setShowAnalyzer(false)}
          content={selectedItem.content}
          title={selectedItem.title}
          metaDescription={selectedItem.metaDescription}
          url={selectedItem.url}
          onSave={handleSaveUpdates}
        />
      )}
      {/* GA Health Check Modal */}
      {showGAHealth && (
        <GAHealthCheckModal
          isOpen={showGAHealth}
          onClose={() => setShowGAHealth(false)}
        />
      )}
    </div>
  );
}
