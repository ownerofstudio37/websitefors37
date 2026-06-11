"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Briefcase, Calendar, Camera, CheckCircle2, Heart, Users } from "lucide-react"
import { calculatePortraitSessionTotalCents } from "@/lib/portrait-pricing"

type ServiceGoal = "portrait" | "wedding" | "event" | "commercial"
type CoverageNeed = "quick" | "standard" | "expanded" | "full"

type Recommendation = {
  packageKey?: string
  title: string
  price: string
  duration: string
  summary: string
  details: string[]
  href: Parameters<typeof Link>[0]["href"]
}

const goals: Array<{ key: ServiceGoal; label: string; icon: typeof Camera }> = [
  { key: "portrait", label: "Portrait", icon: Camera },
  { key: "wedding", label: "Wedding", icon: Heart },
  { key: "event", label: "Event", icon: Calendar },
  { key: "commercial", label: "Commercial", icon: Briefcase },
]

const coverageOptions: Array<{ key: CoverageNeed; label: string; hint: string }> = [
  { key: "quick", label: "Quick", hint: "A short, focused session" },
  { key: "standard", label: "Standard", hint: "The most common fit" },
  { key: "expanded", label: "Expanded", hint: "More variety and coverage" },
  { key: "full", label: "Full", hint: "All-day or campaign-level coverage" },
]

function money(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })}`
}

function bookingHref(params: Record<string, string | number>) {
  return {
    pathname: "/book-a-session",
    query: params,
  }
}

function getRecommendation(goal: ServiceGoal, coverage: CoverageNeed, people: number): Recommendation {
  if (goal === "portrait") {
    const minutesByNeed: Record<CoverageNeed, number> = {
      quick: 30,
      standard: 60,
      expanded: 90,
      full: 120,
    }
    const minutes = minutesByNeed[coverage]
    const category = people > 2 ? "family" : people === 2 ? "couple" : "solo"
    const priceCents = calculatePortraitSessionTotalCents({ minutes, category, people })
    const packageKey = minutes === 30 ? "portrait_mini" : minutes === 60 ? "portrait_standard" : minutes === 90 ? "portrait_extended" : undefined

    return {
      packageKey,
      title: minutes === 30 ? "Portrait Mini Session" : minutes === 60 ? "Portrait Standard Session" : minutes === 90 ? "Portrait Extended Session" : "Custom Portrait Session",
      price: money(priceCents),
      duration: `${minutes} minutes`,
      summary: "A guided portrait session with two-photographer coverage, editing, and a private delivery gallery.",
      details: ["Style and prep guidance", "Digital delivery gallery", people > 5 ? "Group surcharge included" : "Best-fit portrait coverage"],
      href: packageKey
        ? bookingHref({ package: packageKey })
        : bookingHref({ duration: minutes, people, type: category, price_cents: priceCents }),
    }
  }

  if (goal === "wedding") {
    const map: Record<CoverageNeed, Recommendation> = {
      quick: {
        packageKey: "wedding_micro",
        title: "Wedding Micro / Elopement",
        price: "$1,200",
        duration: "3 hours",
        summary: "Best for intimate vows, courthouse coverage, and small celebrations under 30 guests.",
        details: ["Duo Experience", "150+ edited photos", "48-hour sneak peek"],
        href: bookingHref({ package: "wedding_micro" }),
      },
      standard: {
        packageKey: "wedding_essential",
        title: "Wedding Essential",
        price: "$2,200",
        duration: "6 hours",
        summary: "A strong fit for ceremony, portraits, and the key reception moments.",
        details: ["Duo Experience", "300+ edited photos", "48-hour first look"],
        href: bookingHref({ package: "wedding_essential" }),
      },
      expanded: {
        packageKey: "wedding_complete",
        title: "Wedding Complete",
        price: "$3,200",
        duration: "8 hours",
        summary: "The most balanced wedding day option for getting-ready through reception coverage.",
        details: ["Complimentary engagement session", "500+ edited photos", "24-hour highlights"],
        href: bookingHref({ package: "wedding_complete" }),
      },
      full: {
        packageKey: "wedding_premium",
        title: "Wedding Premium",
        price: "$4,500",
        duration: "10+ hours",
        summary: "Full-story coverage for large timelines, multiple locations, and extra portrait variety.",
        details: ["Engagement plus bridal or rehearsal coverage", "700+ edited photos", "Full-day Duo Experience"],
        href: bookingHref({ package: "wedding_premium" }),
      },
    }
    return map[coverage]
  }

  if (goal === "event") {
    const map: Record<CoverageNeed, Recommendation> = {
      quick: {
        packageKey: "event_basic",
        title: "Event Basic Coverage",
        price: "$600",
        duration: "2 hours",
        summary: "Focused coverage for smaller gatherings, programs, and milestone moments.",
        details: ["50+ edited photos", "72-hour highlights", "Private gallery"],
        href: bookingHref({ package: "event_basic" }),
      },
      standard: {
        packageKey: "event_standard",
        title: "Event Standard Coverage",
        price: "$1,000",
        duration: "4 hours",
        summary: "A strong fit for parties, corporate events, graduations, and fundraisers.",
        details: ["125+ edited photos", "24-hour sneak peek", "Logistics consultation"],
        href: bookingHref({ package: "event_standard" }),
      },
      expanded: {
        packageKey: "event_premium",
        title: "Event Premium Coverage",
        price: "$1,800",
        duration: "6 hours",
        summary: "Expanded coverage for longer programs, multiple spaces, and fuller guest coverage.",
        details: ["250+ edited photos", "Timeline support", "Private digital gallery"],
        href: bookingHref({ package: "event_premium" }),
      },
      full: {
        packageKey: "event_premium",
        title: "Event Premium Coverage",
        price: "$1,800+",
        duration: "6+ hours",
        summary: "Start with premium coverage, then request a custom timeline for larger productions.",
        details: ["Best for complex event days", "Custom timeline planning", "Quote can be adjusted after consult"],
        href: bookingHref({ package: "event_premium" }),
      },
    }
    return map[coverage]
  }

  const map: Record<CoverageNeed, Recommendation> = {
    quick: {
      packageKey: "commercial_express",
      title: "Business Express",
      price: "$500",
      duration: "1 hour",
      summary: "Focused brand, product, team, or workplace content with fast delivery.",
      details: ["15+ edited images", "Full commercial usage", "48-hour turnaround"],
      href: bookingHref({ package: "commercial_express" }),
    },
    standard: {
      packageKey: "commercial_brand_starter",
      title: "Brand Starter",
      price: "$850",
      duration: "2 hours",
      summary: "A practical content refresh with brand style planning and multiple image categories.",
      details: ["30+ edited images", "Brand style brief", "Full commercial usage"],
      href: bookingHref({ package: "commercial_brand_starter" }),
    },
    expanded: {
      packageKey: "commercial_content_library",
      title: "Content Library",
      price: "$1,500",
      duration: "4 hours",
      summary: "A bigger production block for product, team, space, and lifestyle content.",
      details: ["75+ edited images", "Brand strategy session", "24-hour sneak peek"],
      href: bookingHref({ package: "commercial_content_library" }),
    },
    full: {
      packageKey: "commercial_full_brand_story",
      title: "Full Brand Story",
      price: "$2,800",
      duration: "8 hours",
      summary: "A full brand production day for campaigns, content libraries, and multi-location shoots.",
      details: ["150+ edited images", "Branding audit", "Behind-the-scenes reel"],
      href: bookingHref({ package: "commercial_full_brand_story" }),
    },
  }
  return map[coverage]
}

export default function PackageRecommender({ className = "" }: { className?: string }) {
  const [goal, setGoal] = useState<ServiceGoal>("portrait")
  const [coverage, setCoverage] = useState<CoverageNeed>("standard")
  const [people, setPeople] = useState(1)
  const recommendation = useMemo(() => getRecommendation(goal, coverage, people), [goal, coverage, people])

  return (
    <section className={`rounded-2xl border border-stone-200 bg-white p-6 shadow-lg ${className}`}>
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="eyebrow mb-3">Package Recommender</p>
          <h2 className="text-2xl font-bold text-stone-950 md:text-3xl">Find the right starting package</h2>
          <p className="mt-3 text-stone-600">
            Pick the goal and coverage level, then continue into booking with the recommended package preselected.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <label className="text-sm font-semibold text-stone-800">What are we photographing?</label>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {goals.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setGoal(key)}
                    className={`min-h-[76px] rounded-lg border px-3 py-3 text-sm font-semibold transition ${
                      goal === key ? "border-primary-600 bg-primary-600 text-white" : "border-stone-200 bg-stone-50 text-stone-800 hover:border-primary-300"
                    }`}
                  >
                    <Icon className="mx-auto mb-2 h-5 w-5" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-stone-800">How much coverage do you need?</label>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {coverageOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setCoverage(option.key)}
                    className={`rounded-lg border p-3 text-left transition ${
                      coverage === option.key ? "border-primary-600 bg-primary-50" : "border-stone-200 bg-white hover:border-primary-300"
                    }`}
                  >
                    <span className="block font-semibold text-stone-950">{option.label}</span>
                    <span className="mt-1 block text-sm text-stone-600">{option.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {goal === "portrait" && (
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  People
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={people}
                  onChange={(event) => setPeople(Math.max(1, Math.min(50, parseInt(event.target.value || "1", 10))))}
                  className="mt-3 w-28 rounded-lg border border-stone-300 px-3 py-2 text-center"
                />
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-primary-200 bg-primary-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Recommended Fit</p>
          <h3 className="mt-3 text-3xl font-bold text-stone-950">{recommendation.title}</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-800">{recommendation.price}</span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-800">{recommendation.duration}</span>
          </div>
          <p className="mt-5 leading-7 text-stone-700">{recommendation.summary}</p>
          <ul className="mt-5 space-y-3">
            {recommendation.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2 text-sm text-stone-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-700" aria-hidden="true" />
                {detail}
              </li>
            ))}
          </ul>
          <Link href={recommendation.href} className="btn-primary mt-6 inline-flex w-full items-center justify-center">
            Continue to Booking <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
