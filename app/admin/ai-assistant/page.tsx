'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, Wand2, Mail, FileText, LayoutTemplate } from 'lucide-react'

type TaskType = 'blog-post' | 'lead-outreach' | 'page-blueprint'

const TASK_META: Record<TaskType, { label: string; icon: any; help: string }> = {
  'blog-post': {
    label: 'Blog Post',
    icon: FileText,
    help: 'Generate SEO-ready blog drafts and optionally save unpublished drafts.',
  },
  'lead-outreach': {
    label: 'Lead Outreach',
    icon: Mail,
    help: 'Generate outreach email blocks for the visual builder and optionally save as a template.',
  },
  'page-blueprint': {
    label: 'Page Blueprint',
    icon: LayoutTemplate,
    help: 'Generate a conversion-focused page structure with sections, SEO, and builder hints.',
  },
}

export default function AiAssistantPage() {
  const [taskType, setTaskType] = useState<TaskType>('blog-post')
  const [prompt, setPrompt] = useState('')
  const [saveDraft, setSaveDraft] = useState(true)
  const [keywords, setKeywords] = useState('wedding photography, houston photographer')
  const [tone, setTone] = useState('professional and friendly')
  const [wordCount, setWordCount] = useState(900)
  const [templateName, setTemplateName] = useState('AI Outreach Draft')
  const [subject, setSubject] = useState('A quick note from Studio37')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  async function handleRun() {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const options: Record<string, any> = {}
      if (taskType === 'blog-post') {
        options.keywords = keywords
        options.tone = tone
        options.wordCount = wordCount
      }
      if (taskType === 'lead-outreach') {
        options.templateName = templateName
        options.subject = subject
      }

      const res = await fetch('/api/admin/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType,
          prompt,
          saveDraft,
          options,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Assistant request failed')
      }

      setResult(data)
    } catch (e: any) {
      setError(e.message || 'Failed to run assistant')
    } finally {
      setLoading(false)
    }
  }

  const TaskIcon = TASK_META[taskType].icon

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl text-white p-6 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href="/admin" className="text-indigo-100 text-sm hover:text-white">← Back to Admin</Link>
            <h1 className="text-3xl font-bold mt-2 flex items-center gap-2">
              <Sparkles className="w-8 h-8" />
              AI Admin Assistant
            </h1>
            <p className="mt-2 text-indigo-100 max-w-3xl">
              Your internal AI copilot for admin tasks: draft blog posts, create lead outreach templates,
              and generate page blueprints for the visual builder.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(TASK_META) as TaskType[]).map((type) => {
              const Icon = TASK_META[type].icon
              const active = taskType === type
              return (
                <button
                  key={type}
                  onClick={() => setTaskType(type)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {TASK_META[type].label}
                </button>
              )
            })}
          </div>

          <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-sm text-indigo-800">
            <p className="font-medium">{TASK_META[taskType].label}</p>
            <p>{TASK_META[taskType].help}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Task Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={8}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder={
                taskType === 'blog-post'
                  ? 'Write a blog post about how to prepare for an outdoor engagement session in Houston in summer...'
                  : taskType === 'lead-outreach'
                  ? 'Create a warm outreach email for wedding leads that mentioned they are still comparing photographers...'
                  : 'Build a high-conversion landing page blueprint for newborn photography packages...'
              }
            />
          </div>

          {taskType === 'blog-post' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Keywords</label>
                <input value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Word Count</label>
                <input type="number" value={wordCount} onChange={(e) => setWordCount(Number(e.target.value) || 900)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Tone</label>
                <input value={tone} onChange={(e) => setTone(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
            </div>
          )}

          {taskType === 'lead-outreach' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Template Name</label>
                <input value={templateName} onChange={(e) => setTemplateName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Subject</label>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={saveDraft} onChange={(e) => setSaveDraft(e.target.checked)} className="rounded border-gray-300" />
              Save draft automatically when possible
            </label>

            <button
              onClick={handleRun}
              disabled={loading || prompt.trim().length < 8}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              {loading ? 'Running...' : 'Run Assistant'}
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-700 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
          <h2 className="font-semibold text-gray-900">Result</h2>

          {!result && !loading && (
            <p className="text-sm text-gray-500">Run a task to see structured output here.</p>
          )}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </div>
          )}

          {result && (
            <div className="space-y-3">
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Completed {result.taskType} {result.saved ? 'and saved draft' : ''}
              </div>

              {result.savedResource?.id && result.taskType === 'blog-post' && (
                <Link href={`/admin/blog`} className="text-sm text-indigo-600 hover:text-indigo-800">
                  Open blog drafts →
                </Link>
              )}

              {result.savedResource?.id && result.taskType === 'lead-outreach' && (
                <Link href={`/admin/email-templates/editor/${result.savedResource.id}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                  Open saved email template →
                </Link>
              )}

              <pre className="text-xs bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-auto max-h-[500px]">
                {JSON.stringify(result.output, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Usage Tips</h3>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Be specific about audience, intent, and CTA in your prompt.</li>
          <li>For outreach, include objections (budget/timing) and desired tone.</li>
          <li>For page blueprints, include the service and conversion goal (book call, quote request, etc).</li>
        </ul>
      </section>
    </div>
  )
}
