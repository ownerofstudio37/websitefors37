'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Loader2,
  Sparkles,
  Printer,
  Copy,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react'

type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

type LessonSummaryData = {
  documentTitle: string
  studentName?: string
  lessonTitle?: string
  summary: {
    whatWeWorkedOn: string
    wins: string[]
    focusAreas: string[]
  }
  homework: {
    assignments: Array<{
      title: string
      objective: string
      instructions: string
      estimatedMinutes: number
    }>
    practiceTips: string[]
  }
  quiz: {
    title: string
    instructions: string
    questions: Array<{
      question: string
      type: 'multiple-choice' | 'short-answer'
      options?: string[]
      answerKey: string
      explanation?: string
    }>
    gradingRubric: string[]
  }
  nextLessonPlan: {
    focus: string
    prepNeeded: string[]
  }
}

export default function LessonSummaryBuilderPage() {
  const [lessonTitle, setLessonTitle] = useState('')
  const [studentName, setStudentName] = useState('')
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('beginner')
  const [tone, setTone] = useState('encouraging, professional, clear')
  const [lessonNotes, setLessonNotes] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [result, setResult] = useState<LessonSummaryData | null>(null)

  const exportRef = useRef<HTMLDivElement>(null)

  const canGenerate = lessonNotes.trim().length >= 30

  const handleGenerate = async () => {
    if (!canGenerate) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/lessons/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTitle,
          studentName,
          lessonNotes,
          skillLevel,
          tone,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Generation failed')

      setResult(json)
    } catch (e: any) {
      setError(e?.message || 'Failed to generate summary')
    } finally {
      setLoading(false)
    }
  }

  const handleExportPDF = () => {
    if (!exportRef.current) return

    const cloned = exportRef.current.cloneNode(true) as HTMLDivElement
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    printWindow.document.write(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${result?.documentTitle || 'Lesson Summary'}</title>
    <style>
      * { box-sizing: border-box; }
      body { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1c1917; margin: 0; background: #fffdf7; }
      .page { max-width: 840px; margin: 0 auto; padding: 30px 32px 42px; }
      h1,h2,h3 { margin: 0 0 10px; }
      h1 { font-size: 30px; font-family: Georgia, 'Times New Roman', serif; }
      h2 { font-size: 19px; margin-top: 24px; border-bottom: 1px solid #eadcc7; padding-bottom: 8px; }
      h3 { font-size: 15px; }
      p, li { font-size: 13px; line-height: 1.65; }
      ul, ol { margin: 8px 0 0; padding-left: 20px; }
      .card { border: 1px solid #eadcc7; border-radius: 12px; padding: 14px; margin-bottom: 10px; background: #fff; }
      .meta { color: #78716c; font-size: 12px; margin-top: 4px; }
      .pill { display: inline-block; font-size: 11px; border: 1px solid #eadcc7; border-radius: 999px; padding: 4px 10px; margin-right: 6px; }
      @media print {
        @page { size: A4; margin: 10mm; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    </style>
  </head>
  <body>
    <div class="page">${cloned.innerHTML}</div>
    <script>window.onload = () => window.print();<\/script>
  </body>
</html>`)
    printWindow.document.close()
  }

  const plainText = useMemo(() => {
    if (!result) return ''

    const lines: string[] = []
    lines.push(result.documentTitle)
    if (result.studentName) lines.push(`Student: ${result.studentName}`)
    if (result.lessonTitle) lines.push(`Lesson: ${result.lessonTitle}`)
    lines.push('')

    lines.push('SUMMARY')
    lines.push(result.summary.whatWeWorkedOn)
    lines.push('')

    lines.push('Wins:')
    result.summary.wins.forEach((w) => lines.push(`- ${w}`))
    lines.push('')

    lines.push('Focus Areas:')
    result.summary.focusAreas.forEach((f) => lines.push(`- ${f}`))
    lines.push('')

    lines.push('HOMEWORK')
    result.homework.assignments.forEach((a, idx) => {
      lines.push(`${idx + 1}. ${a.title} (${a.estimatedMinutes} min)`)
      lines.push(`Objective: ${a.objective}`)
      lines.push(`Instructions: ${a.instructions}`)
      lines.push('')
    })

    lines.push('Quiz / Test')
    result.quiz.questions.forEach((q, idx) => {
      lines.push(`${idx + 1}) ${q.question}`)
      if (q.type === 'multiple-choice') {
        q.options?.forEach((op) => lines.push(`   - ${op}`))
      }
      lines.push(`Answer Key: ${q.answerKey}`)
      if (q.explanation) lines.push(`Explanation: ${q.explanation}`)
      lines.push('')
    })

    lines.push('Next Lesson Plan')
    lines.push(result.nextLessonPlan.focus)
    result.nextLessonPlan.prepNeeded.forEach((p) => lines.push(`- ${p}`))

    return lines.join('\n')
  }, [result])

  const handleCopy = async () => {
    if (!plainText) return
    await navigator.clipboard.writeText(plainText)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-stone-500 hover:text-stone-800">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-stone-900 flex items-center gap-2">
                <GraduationCap className="h-7 w-7 text-amber-700" /> Lesson Summary Builder
              </h1>
              <p className="text-sm text-stone-600 mt-1">Paste your lesson notes and generate a branded summary, homework, and test with PDF export.</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6 items-start">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4 sticky top-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">Lesson Title</label>
              <input
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Intro to camera settings"
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">Student Name</label>
              <input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Client or student name"
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">Skill Level</label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">Tone</label>
                <input
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">Lesson Notes</label>
              <textarea
                value={lessonNotes}
                onChange={(e) => setLessonNotes(e.target.value)}
                rows={14}
                placeholder="Paste what you covered in the lesson: camera settings, posing feedback, homework from last week, what improved, what needs work, and next session goals..."
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm resize-y"
              />
              <p className="text-[11px] text-stone-400 mt-1">Minimum 30 characters. More detail gives better homework + quiz quality.</p>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              onClick={handleGenerate}
              disabled={loading || !canGenerate}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 text-white px-4 py-2.5 text-sm font-semibold hover:bg-amber-800 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? 'Generating…' : 'Generate Summary + Homework + Test'}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm min-h-[75vh]">
            {!result ? (
              <div className="h-full min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
                <GraduationCap className="h-10 w-10 text-stone-300 mb-3" />
                <p className="text-stone-600 font-medium">No summary generated yet</p>
                <p className="text-sm text-stone-400 mt-1 max-w-md">Paste your lesson notes and click generate. You’ll get a branded recap with assignments and a quiz you can export as PDF.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-stone-200 px-5 py-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{result.documentTitle}</p>
                    <p className="text-xs text-stone-500 mt-0.5">Ready to export and send to your student</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-stone-200 rounded-lg text-stone-700 hover:bg-stone-50"
                    >
                      {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? 'Copied' : 'Copy Text'}
                    </button>
                    <button
                      onClick={handleExportPDF}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-stone-900 text-white rounded-lg hover:bg-black"
                    >
                      <Printer className="h-3.5 w-3.5" /> Export PDF
                    </button>
                  </div>
                </div>

                <div ref={exportRef} className="p-6 md:p-8 bg-[#fffdf7]">
                  <div className="mb-4">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 border border-amber-200 bg-amber-50 rounded-full px-3 py-1">Studio37 Lesson Recap</span>
                    <h2 className="text-3xl font-bold text-stone-900 mt-3 font-serif">{result.documentTitle}</h2>
                    <div className="text-sm text-stone-600 mt-2 flex flex-wrap gap-2">
                      {result.studentName && <span className="px-2 py-1 rounded-full border border-stone-200 bg-white">Student: {result.studentName}</span>}
                      {result.lessonTitle && <span className="px-2 py-1 rounded-full border border-stone-200 bg-white">Lesson: {result.lessonTitle}</span>}
                    </div>
                  </div>

                  <section className="mb-6">
                    <h3 className="text-lg font-semibold text-stone-900 border-b border-amber-200 pb-1.5 mb-3">Lesson Summary</h3>
                    <p className="text-sm text-stone-700 leading-7 mb-3">{result.summary.whatWeWorkedOn}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-stone-200 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-2">Wins</p>
                        <ul className="text-sm text-stone-700 space-y-1.5 list-disc pl-4">
                          {result.summary.wins.map((win, idx) => <li key={`win-${idx}`}>{win}</li>)}
                        </ul>
                      </div>
                      <div className="rounded-xl border border-stone-200 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-2">Focus Areas</p>
                        <ul className="text-sm text-stone-700 space-y-1.5 list-disc pl-4">
                          {result.summary.focusAreas.map((focus, idx) => <li key={`focus-${idx}`}>{focus}</li>)}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="mb-6">
                    <h3 className="text-lg font-semibold text-stone-900 border-b border-amber-200 pb-1.5 mb-3">Homework</h3>
                    <div className="space-y-3">
                      {result.homework.assignments.map((assignment, idx) => (
                        <div key={`assignment-${idx}`} className="rounded-xl border border-stone-200 bg-white p-4">
                          <div className="flex items-center justify-between gap-3 mb-1.5">
                            <p className="font-semibold text-stone-900">{idx + 1}. {assignment.title}</p>
                            <span className="text-[11px] font-semibold text-stone-500 border border-stone-200 rounded-full px-2 py-0.5">{assignment.estimatedMinutes} min</span>
                          </div>
                          <p className="text-sm text-stone-700"><span className="font-medium">Objective:</span> {assignment.objective}</p>
                          <p className="text-sm text-stone-700 mt-1"><span className="font-medium">Instructions:</span> {assignment.instructions}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-xl border border-stone-200 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 mb-2">Practice Tips</p>
                      <ul className="text-sm text-stone-700 list-disc pl-4 space-y-1.5">
                        {result.homework.practiceTips.map((tip, idx) => <li key={`tip-${idx}`}>{tip}</li>)}
                      </ul>
                    </div>
                  </section>

                  <section className="mb-6">
                    <h3 className="text-lg font-semibold text-stone-900 border-b border-amber-200 pb-1.5 mb-3">Test / Knowledge Check</h3>
                    <p className="text-sm text-stone-700 mb-3">{result.quiz.instructions}</p>
                    <div className="space-y-3">
                      {result.quiz.questions.map((q, idx) => (
                        <div key={`question-${idx}`} className="rounded-xl border border-stone-200 bg-white p-4">
                          <p className="font-medium text-stone-900">{idx + 1}. {q.question}</p>
                          {q.type === 'multiple-choice' && q.options && (
                            <ol className="list-[upper-alpha] pl-5 mt-2 text-sm text-stone-700 space-y-1">
                              {q.options.map((opt, optIdx) => <li key={`opt-${idx}-${optIdx}`}>{opt}</li>)}
                            </ol>
                          )}
                          <div className="mt-2 text-sm text-stone-700">
                            <p><span className="font-semibold">Answer Key:</span> {q.answerKey}</p>
                            {q.explanation && <p className="mt-1"><span className="font-semibold">Explanation:</span> {q.explanation}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-xl border border-stone-200 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-stone-700 mb-2">Grading Rubric</p>
                      <ul className="text-sm text-stone-700 list-disc pl-4 space-y-1.5">
                        {result.quiz.gradingRubric.map((r, idx) => <li key={`rubric-${idx}`}>{r}</li>)}
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-stone-900 border-b border-amber-200 pb-1.5 mb-3">Next Lesson Plan</h3>
                    <p className="text-sm text-stone-700 mb-2">{result.nextLessonPlan.focus}</p>
                    <ul className="text-sm text-stone-700 list-disc pl-4 space-y-1.5">
                      {result.nextLessonPlan.prepNeeded.map((prep, idx) => <li key={`prep-${idx}`}>{prep}</li>)}
                    </ul>
                  </section>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
