"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Gauge,
  RefreshCw,
  Smartphone,
  Monitor,
  Zap,
  MousePointerClick,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type Strategy = "mobile" | "desktop";

interface ScoreSet {
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
  lcp: number | null;
  cls: number | null;
  inp: number | null;
  fcp: number | null;
  ttfb: number | null;
  tbt: number | null;
  speedIndex: number | null;
  opportunities: { id: string; title: string; description: string; savings: string | null }[];
}

interface PSIResult {
  url: string;
  fetchedAt: string;
  mobile: ScoreSet;
  desktop: ScoreSet;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function scoreColor(score: number | null) {
  if (score == null) return "text-gray-400";
  if (score >= 90) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function scoreBg(score: number | null) {
  if (score == null) return "bg-gray-100";
  if (score >= 90) return "bg-green-50 border-green-200";
  if (score >= 50) return "bg-yellow-50 border-yellow-200";
  return "bg-red-50 border-red-200";
}

function ScoreIcon({ score }: { score: number | null }) {
  if (score == null) return <Activity className="h-5 w-5 text-gray-400" />;
  if (score >= 90) return <CheckCircle className="h-5 w-5 text-green-600" />;
  if (score >= 50) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
  return <AlertCircle className="h-5 w-5 text-red-600" />;
}

function fmt(val: number | null, decimals = 0) {
  if (val == null) return "—";
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
}

function vitRating(name: string, val: number | null): "good" | "needs-improvement" | "poor" | null {
  if (val == null) return null;
  const thresholds: Record<string, [number, number]> = {
    lcp: [2500, 4000],
    cls: [0.1, 0.25],
    inp: [200, 500],
    fcp: [1800, 3000],
    ttfb: [800, 1800],
    tbt: [200, 600],
  };
  const [good, poor] = thresholds[name] ?? [Infinity, Infinity];
  if (val <= good) return "good";
  if (val <= poor) return "needs-improvement";
  return "poor";
}

const vitRatingColor: Record<string, string> = {
  good: "text-green-600",
  "needs-improvement": "text-yellow-600",
  poor: "text-red-600",
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function CategoryCard({ label, score }: { label: string; score: number | null }) {
  return (
    <div className={`rounded-xl border p-5 flex flex-col items-center gap-2 ${scoreBg(score)}`}>
      <ScoreIcon score={score} />
      <span className={`text-4xl font-bold ${scoreColor(score)}`}>{score ?? "—"}</span>
      <span className="text-sm text-gray-600 font-medium text-center">{label}</span>
    </div>
  );
}

function VitalRow({
  label,
  vitKey,
  value,
  unit,
}: {
  label: string;
  vitKey: string;
  value: number | null;
  unit: string;
}) {
  const rating = vitRating(vitKey, value);
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center gap-2">
        {vitKey === "lcp" && <Zap className="h-4 w-4 text-orange-500" />}
        {vitKey === "cls" && <Activity className="h-4 w-4 text-purple-500" />}
        {vitKey === "inp" && <MousePointerClick className="h-4 w-4 text-blue-500" />}
        {vitKey === "fcp" && <Zap className="h-4 w-4 text-green-500" />}
        {vitKey === "ttfb" && <Clock className="h-4 w-4 text-gray-500" />}
        {vitKey === "tbt" && <Clock className="h-4 w-4 text-yellow-500" />}
        <span className="text-sm font-medium text-gray-800">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-mono text-gray-800">
          {value == null ? "—" : `${fmt(value, vitKey === "cls" ? 3 : 0)}${unit ? " " + unit : ""}`}
        </span>
        {rating && (
          <span className={`text-xs font-semibold ${vitRatingColor[rating]}`}>{rating}</span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function PerformancePage() {
  const [result, setResult] = useState<PSIResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<Strategy>("mobile");

  const runAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/pagespeed");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const data: ScoreSet | null = result ? result[strategy] : null;
  const fetchedAt = result?.fetchedAt ? new Date(result.fetchedAt).toLocaleTimeString() : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              Back to Admin
            </Link>
            <div>
              <h1 className="text-xl font-semibold flex items-center gap-2">
                <Gauge className="h-6 w-6 text-amber-600" />
                Performance — Production Site
              </h1>
              <p className="text-sm text-gray-500">
                Real Lighthouse scores for{" "}
                <a href="https://www.studio37.cc" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-700">
                  www.studio37.cc
                </a>
                {fetchedAt && <span className="ml-2 text-gray-400">· fetched {fetchedAt}</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.studio37.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm"
            >
              Open PageSpeed <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={runAnalysis}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium disabled:opacity-60 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Analyzing…" : result ? "Re-run" : "Run Analysis"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!result && !loading && !error && (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <Gauge className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">No data yet</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Click <strong>Run Analysis</strong> to fetch real Lighthouse scores directly from
              Google PageSpeed Insights for your live site.
            </p>
            <button
              onClick={runAnalysis}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium transition-colors"
            >
              <Zap className="h-4 w-4" />
              Run Analysis
            </button>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <RefreshCw className="h-10 w-10 mx-auto mb-4 text-amber-500 animate-spin" />
            <p className="text-gray-600 text-sm">
              Running Lighthouse on your live site… this takes ~15–30 seconds.
            </p>
          </div>
        )}

        {result && data && (
          <>
            {/* Strategy toggle */}
            <div className="flex gap-2">
              {(["mobile", "desktop"] as Strategy[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStrategy(s)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    strategy === s
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {s === "mobile" ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            {/* Category scores */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <CategoryCard label="Performance" score={data.performance} />
              <CategoryCard label="Accessibility" score={data.accessibility} />
              <CategoryCard label="Best Practices" score={data.bestPractices} />
              <CategoryCard label="SEO" score={data.seo} />
            </div>

            {/* Core Web Vitals */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Core Web Vitals</h2>
              <VitalRow label="Largest Contentful Paint (LCP)" vitKey="lcp" value={data.lcp} unit="ms" />
              <VitalRow label="Cumulative Layout Shift (CLS)" vitKey="cls" value={data.cls} unit="" />
              <VitalRow label="Interaction to Next Paint (INP)" vitKey="inp" value={data.inp} unit="ms" />
              <VitalRow label="First Contentful Paint (FCP)" vitKey="fcp" value={data.fcp} unit="ms" />
              <VitalRow label="Time to First Byte (TTFB)" vitKey="ttfb" value={data.ttfb} unit="ms" />
              <VitalRow label="Total Blocking Time (TBT)" vitKey="tbt" value={data.tbt} unit="ms" />
            </div>

            {/* Opportunities */}
            {data.opportunities.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-800 mb-4">Top Opportunities</h2>
                <ul className="space-y-3">
                  {data.opportunities.map((op) => (
                    <li key={op.id} className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{op.title}</p>
                        {op.savings && (
                          <p className="text-xs text-green-700 font-semibold">{op.savings}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
