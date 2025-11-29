import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function ProjectsAdminPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Projects</h1>
      <p className="text-gray-600 mb-8">Manage all client projects, sessions, and deliverables from one place.</p>
      <div className="mb-6">
        <Link href="/admin/client-portals/new-project" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Start New Project
        </Link>
      </div>
      {/* TODO: List projects here, filter by client, status, date, etc. */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Projects Yet</h2>
        <p className="text-gray-600 mb-4">Create your first project to get started.</p>
        <Link href="/admin/client-portals/new-project" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Create Project
        </Link>
      </div>
    </div>
  )
}
