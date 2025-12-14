import Link from 'next/link'
import { headers } from 'next/headers'
import CreateProjectButton from '@/components/CreateProjectButton'
import ClientProjectsList from '@/components/admin/ClientProjectsList'

export const dynamic = 'force-dynamic'

interface Project {
  id: string
  name: string
  type: string
  description: string | null
  status: string
  session_date: string | null
  due_date: string | null
  completed_at: string | null
  package_name: string | null
  total_amount_cents: number | null
  paid_amount_cents: number
  payment_status: string
  cover_image_url: string | null
  tags: string[] | null
  created_at: string
  updated_at: string
}

interface ClientUser {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
}

async function getClientUser(userId: string): Promise<ClientUser | null> {
  const h = headers()
  const host = h.get('x-forwarded-host') || h.get('host')
  const proto = h.get('x-forwarded-proto') || 'https'
  const baseUrl = `${proto}://${host}`
  try {
    const res = await fetch(`${baseUrl}/api/admin/client-portals/${userId}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    const u = data?.user
    if (!u) return null
    return { id: u.id, email: u.email, first_name: u.first_name, last_name: u.last_name }
  } catch {
    return null
  }
}

async function getClientProjects(userId: string): Promise<Project[]> {
  const h = headers()
  const host = h.get('x-forwarded-host') || h.get('host')
  const proto = h.get('x-forwarded-proto') || 'https'
  const baseUrl = `${proto}://${host}`
  try {
    const res = await fetch(`${baseUrl}/api/admin/client-portals/${userId}/projects`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return data?.projects || []
  } catch {
    return []
  }
}

function getStatusBadgeColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    review: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    delivered: 'bg-teal-100 text-teal-800',
    archived: 'bg-gray-100 text-gray-800'
  }
  return colors[status || 'pending'] || 'bg-gray-100 text-gray-800'
}

function getPaymentStatusBadgeColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-red-100 text-red-800',
    partial: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    refunded: 'bg-gray-100 text-gray-800'
  }
  return colors[status || 'pending'] || 'bg-gray-100 text-gray-800'
}

function formatCurrency(cents: number | null): string {
  if (cents === null) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cents / 100)
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.filter((t): t is string => typeof t === 'string')
  if (typeof tags === 'string') return tags.split(',').map((s) => s.trim()).filter(Boolean)
  return []
}

export default async function ClientProjectsPage({
  params
}: {
  params: { id: string }
}) {
  const client = await getClientUser(params.id)
  
  if (!client) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Client Not Found</h1>
          <p className="text-gray-600 mb-4">
            The client you're looking for doesn't exist.
          </p>
          <Link 
            href="/admin/client-portals"
            className="text-blue-600 hover:underline"
          >
            ← Back to Client Portals
          </Link>
        </div>
      </div>
    )
  }

  const projects = await getClientProjects(params.id)
  const clientName = [client.first_name, client.last_name].filter(Boolean).join(' ') || client.email

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/admin/client-portals"
            className="text-sm text-blue-600 hover:underline mb-2 inline-block"
          >
            ← Back to Client Portals
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Projects for {clientName}
              </h1>
              <p className="text-gray-600 mt-1">{client.email}</p>
            </div>
            <Link
              href={`/admin/client-portals/${params.id}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              View Client Details
            </Link>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new project for this client.</p>
            <div className="mt-6">
              <CreateProjectButton clientId={params.id} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <CreateProjectButton clientId={params.id} />
            </div>
            <ClientProjectsList projects={projects} />
          </div>
        )}
      </div>
    </div>
  )
}
