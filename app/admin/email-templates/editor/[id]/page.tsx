export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import EmailEditorClient from '@/components/EmailEditorClient'

type EmailTemplate = {
  id: string
  name: string
  slug: string
  subject: string
  category: string
  is_active: boolean
  html_content: string
  text_content: string
  blocks_json?: string
}

async function getTemplate(id: string): Promise<EmailTemplate | null> {
  const { data, error } = await supabaseAdmin
    .from('email_templates')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as EmailTemplate
}

export default async function EmailTemplateEditor({ params }: { params: { id: string } }) {
  const template = await getTemplate(params.id)

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin/email-templates" className="text-sm text-indigo-600 hover:text-indigo-800">
            ← Back to Templates
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Email Template Editor</h1>
        </div>
      </div>

      {!template ? (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-yellow-800">
          <p className="font-semibold text-lg">Template not found</p>
          <p className="text-sm mt-1">This template may have been deleted or the ID is invalid.</p>
          <Link href="/admin/email-templates/editor/new" className="mt-4 inline-block text-sm font-medium text-yellow-700 underline">
            Create a new template instead →
          </Link>
        </div>
      ) : (
        <EmailEditorClient templateId={template.id} initialTemplate={template} />
      )}
    </div>
  )
}
