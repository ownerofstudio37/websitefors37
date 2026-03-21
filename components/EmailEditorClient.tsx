'use client'

import { useState, useEffect, useCallback } from 'react'
import { Save, Eye, Code2, Layout, CheckCircle, AlertCircle, Loader2, Sparkles, ExternalLink } from 'lucide-react'
import EmailBuilder, { EmailBlock, renderEmailHtml, EMAIL_TEMPLATE_PRESETS } from './EmailBuilder'

interface EmailTemplate {
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

interface Props {
  templateId: string
  initialTemplate: EmailTemplate
}

type EditorTab = 'visual' | 'html' | 'preview'

export default function EmailEditorClient({ templateId, initialTemplate }: Props) {
  const [template, setTemplate] = useState<EmailTemplate>(initialTemplate)
  const [blocks, setBlocks] = useState<EmailBlock[]>(() => {
    try {
      return initialTemplate.blocks_json ? JSON.parse(initialTemplate.blocks_json) : []
    } catch {
      return []
    }
  })
  const [htmlContent, setHtmlContent] = useState(initialTemplate.html_content || '')
  const [tab, setTab] = useState<EditorTab>('visual')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [showAiPanel, setShowAiPanel] = useState(false)

  // When blocks change via the visual builder, sync HTML
  const handleBuilderChange = useCallback((html: string, newBlocks: EmailBlock[]) => {
    setBlocks(newBlocks)
    setHtmlContent(html)
  }, [])

  // Save to API
  const save = async () => {
    setSaving(true)
    setSaveStatus('idle')
    try {
      const payload: Partial<EmailTemplate> & { blocks_json?: string } = {
        name: template.name,
        subject: template.subject,
        category: template.category,
        html_content: tab === 'html' ? htmlContent : renderEmailHtml(blocks),
        text_content: template.text_content,
        is_active: template.is_active,
        blocks_json: JSON.stringify(blocks),
      }
      const res = await fetch(`/api/admin/email-templates/${templateId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Save failed')
      setTemplate(prev => ({ ...prev, ...payload }))
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (err: any) {
      console.error('Save error:', err)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 5000)
    } finally {
      setSaving(false)
    }
  }

  // AI content generation
  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return
    setAiGenerating(true)
    try {
      const res = await fetch('/api/ai/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          templateName: template.name,
          category: template.category,
        }),
      })
      const data = await res.json()
      if (res.ok && data.blocks) {
        setBlocks(data.blocks)
        setHtmlContent(renderEmailHtml(data.blocks))
        setTab('visual')
        setShowAiPanel(false)
        setAiPrompt('')
      }
    } catch (err) {
      console.error('AI generation error:', err)
    } finally {
      setAiGenerating(false)
    }
  }

  const currentHtml = tab === 'html' ? htmlContent : renderEmailHtml(blocks)

  return (
    <div className="space-y-4">
      {/* Header toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Template Name</label>
            <input
              type="text"
              value={template.name}
              onChange={e => setTemplate(p => ({ ...p, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Subject Line</label>
            <input
              type="text"
              value={template.subject}
              onChange={e => setTemplate(p => ({ ...p, subject: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
              placeholder="e.g. Thanks for contacting Studio37!"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* AI Button */}
          <button
            onClick={() => setShowAiPanel(v => !v)}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-violet-700 hover:to-indigo-700 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Write</span>
          </button>

          {/* Preview link */}
          <a
            href={`/admin/email-templates/preview/${templateId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </a>

          {/* Save button */}
          <button
            onClick={save}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              saveStatus === 'saved'
                ? 'bg-green-600 text-white'
                : saveStatus === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveStatus === 'saved' ? (
              <CheckCircle className="w-4 h-4" />
            ) : saveStatus === 'error' ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving…' : saveStatus === 'saved' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save'}
          </button>
        </div>
      </div>

      {/* AI Panel */}
      {showAiPanel && (
        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <h3 className="font-semibold text-violet-900">AI Email Writer</h3>
          </div>
          <p className="text-sm text-violet-700">Describe what you want this email to do and AI will generate the full template using Studio37 branding.</p>
          <textarea
            value={aiPrompt}
            onChange={e => setAiPrompt(e.target.value)}
            rows={3}
            placeholder="e.g. A warm 3-day follow-up email for wedding photography leads who haven't responded yet. Mention our packages start at $1,800 and we have limited dates available."
            className="w-full px-3 py-2 border border-violet-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none bg-white resize-none"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={generateWithAI}
              disabled={aiGenerating || !aiPrompt.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {aiGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {aiGenerating ? 'Generating…' : 'Generate Email'}
            </button>
            <button onClick={() => setShowAiPanel(false)} className="px-3 py-2 text-violet-600 text-sm hover:bg-violet-100 rounded-lg transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Variables reference */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide mr-1">Variables:</span>
        {['{{firstName}}', '{{lastName}}', '{{email}}', '{{phone}}', '{{sessionDate}}', '{{sessionType}}', '{{packageName}}', '{{location}}'].map(v => (
          <code key={v} className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono border border-amber-200">{v}</code>
        ))}
      </div>

      {/* Editor Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50">
          {([
            { id: 'visual', label: 'Visual Builder', icon: Layout },
            { id: 'html',   label: 'HTML Code',      icon: Code2 },
            { id: 'preview', label: 'Email Preview',  icon: Eye },
          ] as { id: EditorTab; label: string; icon: any }[]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === id
                  ? 'border-amber-500 text-amber-700 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {tab === 'visual' && (
            <EmailBuilder
              initialBlocks={blocks}
              onChange={handleBuilderChange}
            />
          )}

          {tab === 'html' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Edit raw HTML. Changes here will be used when saving (visual builder won't reflect manual HTML edits).</p>
                <button
                  onClick={() => setHtmlContent(renderEmailHtml(blocks))}
                  className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                >
                  ↺ Sync from Visual Builder
                </button>
              </div>
              <textarea
                value={htmlContent}
                onChange={e => setHtmlContent(e.target.value)}
                rows={30}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg font-mono text-xs resize-y focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none bg-gray-50"
                spellCheck={false}
              />
            </div>
          )}

          {tab === 'preview' && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500">Live preview with current template variables replaced with sample values.</p>
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-inner bg-gray-100 p-4">
                <div className="max-w-[600px] mx-auto">
                  <iframe
                    srcDoc={currentHtml
                      .replace(/\{\{firstName\}\}/g, 'Sarah')
                      .replace(/\{\{lastName\}\}/g, 'Johnson')
                      .replace(/\{\{sessionDate\}\}/g, 'Saturday, April 12, 2026')
                      .replace(/\{\{sessionTime\}\}/g, '2:00 PM')
                      .replace(/\{\{sessionType\}\}/g, 'Wedding Photography')
                      .replace(/\{\{packageName\}\}/g, 'Full-Day Package')
                      .replace(/\{\{location\}\}/g, 'Studio37 Studio, Pinehurst TX')
                      .replace(/\{\{email\}\}/g, 'sarah@example.com')
                    }
                    className="w-full border-none rounded-lg"
                    style={{ minHeight: 600 }}
                    title="Email Preview"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Template metadata */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Template Settings</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
            <select
              value={template.category}
              onChange={e => setTemplate(p => ({ ...p, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="general">General</option>
              <option value="onboarding">Onboarding</option>
              <option value="follow-up">Follow-Up</option>
              <option value="reminders">Reminders</option>
              <option value="delivery">Delivery</option>
              <option value="newsletter">Newsletter</option>
              <option value="outreach">Outreach</option>
              <option value="confirmation">Confirmation</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Slug</label>
            <input
              type="text"
              value={template.slug}
              readOnly
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={template.is_active}
                onChange={e => setTemplate(p => ({ ...p, is_active: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-400"
              />
              <span className="text-sm text-gray-700">{template.is_active ? 'Active' : 'Inactive'}</span>
            </label>
          </div>
          <div className="flex items-end">
            <button
              onClick={save}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
