import Link from 'next/link'
import { recentWorkItems, prepGuideDownloads } from '@/lib/public-content'
import { leadMagnetSegments } from '@/lib/conversion-copy'

const editorRoutes = [
  { route: '/admin/content', status: 'Legacy', note: 'Keep for fallback content review.' },
  { route: '/admin/content-enhanced', status: 'Legacy', note: 'Use only when enhanced CMS data must be inspected.' },
  { route: '/admin/page-builder', status: 'Primary builder', note: 'Preferred visual page-building workflow.' },
  { route: '/admin/live-editor', status: 'Legacy', note: 'Use only for historical pages that still depend on it.' },
  { route: '/admin/visual-editor/[slug]', status: 'Specialized', note: 'Deep-link visual editor for a known slug.' },
  { route: '/admin/site-editor', status: 'Simple settings', note: 'Small config edits with live preview.' },
]

const expectedGalleryHost = 'https://gallery.studio37.cc'

export default function AdminOperationsPage() {
  const leadMagnets = Object.entries(prepGuideDownloads)

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/admin" className="text-sm font-medium text-blue-700 hover:underline">Back to admin</Link>
            <h1 className="mt-2 text-3xl font-bold text-gray-950">Admin Operations</h1>
            <p className="mt-1 text-sm text-gray-600">Recent work, lead magnets, and editor route ownership in one review surface.</p>
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
            <div className="mt-4 space-y-3">
              {editorRoutes.map((item) => (
                <div key={item.route} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-sm font-semibold text-gray-950">{item.route}</code>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">{item.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
