"use client"

import React, { useEffect, useState } from 'react'

export default function AdminEmailSender() {
  const [templates, setTemplates] = useState<any[]>([])
  const [loadingTemplates, setLoadingTemplates] = useState(false)
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [templateId, setTemplateId] = useState<string | null>(null)
  const [variablesText, setVariablesText] = useState('{}')
  const [html, setHtml] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoadingTemplates(true)
      try {
        const res = await fetch('/api/admin/email-templates')
        if (!res.ok) throw new Error('Failed to load templates')
        const data = await res.json()
        if (mounted) setTemplates(data?.templates || [])
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoadingTemplates(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const handleSend = async () => {
    setResult(null)
    setSending(true)
    try {
      const variables = JSON.parse(variablesText || '{}')
      const body: any = {
        to: to.split(',').map(s => s.trim()).filter(Boolean),
        subject: subject || (templateId ? `Admin send: ${templateId}` : 'Admin message'),
      }

      if (templateId) {
        body.templateId = templateId
        body.variables = variables
      } else {
        body.html = html || '<p></p>'
      }

      const res = await fetch('/api/marketing/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || JSON.stringify(data))
      setResult('Sent successfully')
    } catch (err: any) {
      console.error(err)
      setResult('Send failed: ' + (err?.message || String(err)))
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Email Sender</h1>
      <p className="mb-6 text-sm text-gray-600">Send one-off marketing or transactional emails via Resend.</p>

      <label className="block mb-2 text-sm font-medium">To (comma-separated)</label>
      <input value={to} onChange={e => setTo(e.target.value)} className="w-full mb-4 input" placeholder="ceo@studio37.cc" />

      <label className="block mb-2 text-sm font-medium">Template (optional)</label>
      <div className="mb-4">
        {loadingTemplates ? (
          <div>Loading templates…</div>
        ) : (
          <select value={templateId || ''} onChange={e => setTemplateId(e.target.value || null)} className="w-full mb-2 input">
            <option value="">-- Use custom HTML --</option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name || t.slug}</option>
            ))}
          </select>
        )}
      </div>

      <label className="block mb-2 text-sm font-medium">Subject</label>
      <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full mb-4 input" />

      {templateId ? (
        <>
          <label className="block mb-2 text-sm font-medium">Template variables (JSON)</label>
          <textarea value={variablesText} onChange={e => setVariablesText(e.target.value)} rows={6} className="w-full mb-4 textarea" />
        </>
      ) : (
        <>
          <label className="block mb-2 text-sm font-medium">HTML body</label>
          <textarea value={html} onChange={e => setHtml(e.target.value)} rows={10} className="w-full mb-4 textarea" />
        </>
      )}

      <div className="flex items-center gap-4">
        <button onClick={handleSend} disabled={sending || !to.trim()} className="btn-primary">
          {sending ? 'Sending…' : 'Send Email'}
        </button>
        {result && <div className="text-sm">{result}</div>}
      </div>

      <style jsx>{`
        .input { padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem }
        .textarea { padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem }
        .btn-primary { background: #b76e2f; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem }
      `}</style>
    </div>
  )
}
