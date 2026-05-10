import { NextResponse } from "next/server";
import { createLogger } from "@/lib/logger";

const log = createLogger("api/admin/pagespeed");

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PSI_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const SITE_URL = "https://www.studio37.cc";

/** Pull a numeric audit value safely */
function auditValue(audits: any, id: string): number | null {
  const a = audits?.[id];
  if (!a) return null;
  return a.numericValue ?? a.score ?? null;
}

/** Map PSI category score (0-1) to 0-100 */
function score(raw: number | null | undefined): number | null {
  if (raw == null) return null;
  return Math.round(raw * 100);
}

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PSI_API_KEY || process.env.GOOGLE_API_KEY || "";
    const keyParam = apiKey ? `&key=${apiKey}` : "";

    const [mobileRes, desktopRes] = await Promise.all([
      fetch(`${PSI_URL}?url=${encodeURIComponent(SITE_URL)}&strategy=mobile${keyParam}`, {
        next: { revalidate: 0 },
      }),
      fetch(`${PSI_URL}?url=${encodeURIComponent(SITE_URL)}&strategy=desktop${keyParam}`, {
        next: { revalidate: 0 },
      }),
    ]);

    if (!mobileRes.ok || !desktopRes.ok) {
      const errText = await mobileRes.text();
      log.error("PSI API error", { status: mobileRes.status, body: errText.slice(0, 300) });
      return NextResponse.json(
        { error: `PageSpeed API returned ${mobileRes.status}` },
        { status: 502 }
      );
    }

    const [mobile, desktop] = await Promise.all([mobileRes.json(), desktopRes.json()]);

    function extract(data: any) {
      const cats = data?.lighthouseResult?.categories;
      const audits = data?.lighthouseResult?.audits;
      return {
        performance: score(cats?.performance?.score),
        accessibility: score(cats?.accessibility?.score),
        bestPractices: score(cats?.["best-practices"]?.score),
        seo: score(cats?.seo?.score),
        lcp: auditValue(audits, "largest-contentful-paint"),
        cls: auditValue(audits, "cumulative-layout-shift"),
        inp: auditValue(audits, "interaction-to-next-paint"),
        fcp: auditValue(audits, "first-contentful-paint"),
        ttfb: auditValue(audits, "server-response-time"),
        tbt: auditValue(audits, "total-blocking-time"),
        speedIndex: auditValue(audits, "speed-index"),
        opportunities: Object.values(audits || {})
          .filter((a: any) => a.score !== null && a.score < 0.9 && a.details?.type === "opportunity")
          .slice(0, 5)
          .map((a: any) => ({
            id: a.id,
            title: a.title,
            description: a.description,
            savings: a.details?.overallSavingsMs
              ? `Save ~${Math.round(a.details.overallSavingsMs)}ms`
              : null,
          })),
      };
    }

    return NextResponse.json({
      url: SITE_URL,
      fetchedAt: new Date().toISOString(),
      mobile: extract(mobile),
      desktop: extract(desktop),
    });
  } catch (err: any) {
    log.error("PageSpeed route crashed", { error: err?.message });
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
