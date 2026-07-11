import Link from 'next/link'
import { recentWorkItems, prepGuideDownloads } from '@/lib/public-content'
import { conversionCopy, leadMagnetSegments } from '@/lib/conversion-copy'
import { adminRouteOwnership } from '@/lib/admin-route-ownership'

const expectedGalleryHost = 'https://gallery.studio37.cc'

const launchChecklist = [
  'Metadata and canonical URL',
  'Schema target confirmed',
  'Sitemap inclusion checked',
  'Internal links and CTA path',
  'Analytics event named',
  'Mobile visual QA captured',
]

const timelineEvents = [
  { event: 'package_recommender_selection', source: 'Package recommender', status: 'Recorded in browser lead timeline' },
  { event: 'pricing_calculator_update', source: 'Pricing calculator', status: 'Recorded in browser lead timeline' },
  { event: 'prep_guide_requested', source: 'Prep guides', status: 'Recorded from hub and download forms' },
  { event: 'quote_capture_submitted', source: 'Saved quote', status: 'Submitted to leads with source metadata' },
]

const adminWorkflowQA = [
  { label: 'Lead to project', href: '/admin/leads', detail: 'Open a real lead, confirm context, create project, and return to the lead record.' },
  { label: 'Project to ShootProof', href: '/admin/projects', detail: 'Open the created project and confirm the ShootProof delivery handoff is visible.' },
  { label: 'Gallery tracker', href: '/admin/galleries', detail: 'Track the ShootProof link/status without creating a fake public gallery.' },
  { label: 'SEO health', href: '/admin/seo', detail: 'Recheck sitemap status, URL count, cache age, and noindex header status.' },
  { label: 'Mobile quick actions', href: '/admin', detail: 'At phone width, confirm lead, project, gallery, blog, and SEO actions remain reachable.' },
]

const blogSchedulingQA = [
  'Create and save a draft without public visibility.',
  'Schedule a future post and confirm it stays out of public blog lists and sitemap URLs.',
  'Edit the scheduled time and confirm the admin preview reflects the new timestamp.',
  'Publish immediately and confirm the post appears publicly after refresh.',
  'Unpublish or revert the test post so production content stays clean.',
]

export default function AdminOperationsPage() {
  const leadMagnets = Object.entries(prepGuideDownloads)
  const routeCounts = adminRouteOwnership.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1
    return acc
  }, {})
  const simplificationReview = adminRouteOwnership.filter((item) =>
    ['legacy', 'experimental', 'backup', 'internal'].includes(item.status)
  )

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/admin" className="text-sm font-medium text-blue-700 hover:underline">Back to admin</Link>
            <h1 className="mt-2 text-3xl font-bold text-gray-950">Admin Operations</h1>
            <p className="mt-1 text-sm text-gray-600">Recent work, lead magnets, launch QA, lead timelines, and editor route ownership in one review surface.</p>
          </div>
          <Link href="/admin/page-builder" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Open primary builder
          </Link>
        </div>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-950">Recent Work Manager</h2>
              <p className="mt-1 text-sm text-gray-600">Backed by shared public-content data with feature/order/image checks.</p>
            </div>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">{recentWorkItems.filter((item) => item.featured).length} featured</span>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-3 py-2">Order</th>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Service</th>
                  <th className="px-3 py-2">Alt text</th>
                  <th className="px-3 py-2">Gallery</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentWorkItems.map((item) => {
                  const galleryOk = !item.galleryUrl || item.galleryUrl.startsWith(expectedGalleryHost)
                  return (
                    <tr key={item.title}>
                      <td className="px-3 py-3 font-medium">{item.order}</td>
                      <td className="px-3 py-3">{item.title}</td>
                      <td className="px-3 py-3">{item.service}</td>
                      <td className="px-3 py-3 text-gray-600">{item.alt}</td>
                      <td className="px-3 py-3">{item.galleryUrl || expectedGalleryHost}</td>
                      <td className="px-3 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${galleryOk && item.featured ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          {galleryOk && item.featured ? 'Ready' : 'Review'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-950">Sitemap Alerting</h2>
            <p className="mt-1 text-sm text-gray-600">Admin SEO already tracks required URL coverage and sitemap health before launch.</p>
            <Link href="/admin/seo" className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:underline">
              Review sitemap health
            </Link>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-950">Public Launch Checklist</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {launchChecklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-950">Saved Quote Template</h2>
            <p className="mt-2 text-sm font-medium text-gray-900">{conversionCopy.quoteCaptureHeadline}</p>
            <p className="mt-2 text-sm text-gray-600">{conversionCopy.quoteCaptureBody}</p>
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">Email route uses template slug: saved-quote-follow-up</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-950">Lead Magnet Report</h2>
            <p className="mt-1 text-sm text-gray-600">Guide requests include source metadata, UTM context, and segmented follow-up templates.</p>
            <div className="mt-4 space-y-3">
              {leadMagnets.map(([key, guide]) => {
                const segment = leadMagnetSegments[key as keyof typeof leadMagnetSegments]
                return (
                  <div key={key} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-950">{guide.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{guide.serviceInterest}</p>
                      </div>
                      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">{segment.template}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">{segment.task}</p>
                    <Link href={`/session-prep/${key}/download`} className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:underline">
                      View download page
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-950">Admin Route Inventory</h2>
            <p className="mt-1 text-sm text-gray-600">Preferred ownership for overlapping content and editor routes.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(routeCounts).map(([status, count]) => (
                <span key={status} className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold capitalize text-gray-700">
                  {status}: {count}
                </span>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {adminRouteOwnership.map((item) => (
                <div key={item.file} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-sm font-semibold text-gray-950">{item.route}</code>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold capitalize text-gray-700">{item.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-950">Admin Route Simplification Review</h2>
              <p className="mt-1 text-sm text-amber-900">Keep these routes out of the daily cockpit unless they graduate back to primary ownership.</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800">{simplificationReview.length} routes to keep quiet</span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {simplificationReview.map((item) => (
              <div key={`simplify-${item.file}`} className="rounded-lg border border-amber-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <code className="text-sm font-semibold text-gray-950">{item.route}</code>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold capitalize text-amber-800">{item.status}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-950">Lead Timeline Events</h2>
          <p className="mt-1 text-sm text-gray-600">Conversion interactions are captured as lead context so admin follow-up has a trail.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {timelineEvents.map((item) => (
              <div key={item.event} className="rounded-lg border border-gray-200 p-4">
                <code className="text-sm font-semibold text-gray-950">{item.event}</code>
                <p className="mt-2 text-sm text-gray-600">{item.source}</p>
                <p className="mt-1 text-xs font-semibold text-green-700">{item.status}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-950">Real-Record Admin Workflow QA</h2>
            <p className="mt-1 text-sm text-gray-600">Use this pass after deploy with real or disposable records so the admin workflow is tested end to end.</p>
            <div className="mt-4 space-y-3">
              {adminWorkflowQA.map((item) => (
                <Link key={item.label} href={item.href} className="block rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50">
                  <div className="text-sm font-semibold text-gray-950">{item.label}</div>
                  <p className="mt-1 text-sm text-gray-600">{item.detail}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-950">Blog Scheduling QA</h2>
            <p className="mt-1 text-sm text-gray-600">Run this against live Supabase before trusting scheduled content automation.</p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-700">
              {blogSchedulingQA.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <Link href="/admin/blog" className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:underline">
              Open blog scheduler
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
