import { redirect } from 'next/navigation'

export default async function AdminLeadDetailRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/admin/leads?lead=${encodeURIComponent(id)}`)
}
