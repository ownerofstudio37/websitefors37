import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateJSON } from '@/lib/ai-client'
import { getClientIp, rateLimit } from '@/lib/rateLimit'
import { createLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'
export const maxDuration = 45

const log = createLogger('api/lessons/generate-summary')

const BodySchema = z.object({
  lessonNotes: z.string().min(30, 'Please paste more lesson detail (minimum 30 characters).').max(25000),
  studentName: z.string().max(120).optional(),
  lessonTitle: z.string().max(160).optional(),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  tone: z.string().max(120).default('encouraging, professional, clear'),
})

type QuizQuestion = {
  question: string
  type: 'multiple-choice' | 'short-answer'
  options?: string[]
  answerKey: string
  explanation?: string
}

type LessonSummaryResponse = {
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
    questions: QuizQuestion[]
    gradingRubric: string[]
  }
  nextLessonPlan: {
    focus: string
    prepNeeded: string[]
  }
}

function sanitizeResponse(payload: LessonSummaryResponse): LessonSummaryResponse {
  const cleanQuestions = (payload.quiz?.questions || []).slice(0, 8).map((q) => ({
    question: String(q.question || '').trim(),
    type: q.type === 'short-answer' ? 'short-answer' : 'multiple-choice',
    options: q.type === 'multiple-choice'
      ? (Array.isArray(q.options) ? q.options.map((o) => String(o).trim()).filter(Boolean).slice(0, 5) : ['Option A', 'Option B', 'Option C', 'Option D'])
      : undefined,
    answerKey: String(q.answerKey || '').trim(),
    explanation: q.explanation ? String(q.explanation).trim() : undefined,
  }))

  return {
    documentTitle: String(payload.documentTitle || 'Lesson Summary').trim(),
    studentName: payload.studentName ? String(payload.studentName).trim() : undefined,
    lessonTitle: payload.lessonTitle ? String(payload.lessonTitle).trim() : undefined,
    summary: {
      whatWeWorkedOn: String(payload.summary?.whatWeWorkedOn || '').trim(),
      wins: (payload.summary?.wins || []).map((item) => String(item).trim()).filter(Boolean).slice(0, 8),
      focusAreas: (payload.summary?.focusAreas || []).map((item) => String(item).trim()).filter(Boolean).slice(0, 8),
    },
    homework: {
      assignments: (payload.homework?.assignments || []).slice(0, 8).map((item) => ({
        title: String(item.title || '').trim(),
        objective: String(item.objective || '').trim(),
        instructions: String(item.instructions || '').trim(),
        estimatedMinutes: Number(item.estimatedMinutes || 15),
      })),
      practiceTips: (payload.homework?.practiceTips || []).map((item) => String(item).trim()).filter(Boolean).slice(0, 10),
    },
    quiz: {
      title: String(payload.quiz?.title || 'Knowledge Check').trim(),
      instructions: String(payload.quiz?.instructions || '').trim(),
      questions: cleanQuestions,
      gradingRubric: (payload.quiz?.gradingRubric || []).map((item) => String(item).trim()).filter(Boolean).slice(0, 8),
    },
    nextLessonPlan: {
      focus: String(payload.nextLessonPlan?.focus || '').trim(),
      prepNeeded: (payload.nextLessonPlan?.prepNeeded || []).map((item) => String(item).trim()).filter(Boolean).slice(0, 8),
    },
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    const rl = rateLimit(`lesson-summary:${ip}`, { limit: 15, windowMs: 60 * 1000 })
    if (!rl.allowed) {
      const retryAfter = Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000))
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please wait and try again.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfter),
          },
        }
      )
    }

    const json = await req.json()
    const parsed = BodySchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const {
      lessonNotes,
      studentName,
      lessonTitle,
      skillLevel,
      tone,
    } = parsed.data

    const prompt = `You are Studio37's private photography lesson assistant.

Create a polished, branded lesson follow-up packet from the lesson notes.
The packet must include:
1) A concise lesson summary
2) Homework assignments
3) A quiz/test with answer key
4) Next lesson plan

Brand voice:
- Studio37 tone: warm, encouraging, practical, premium
- Writing tone requested: ${tone}
- Skill level: ${skillLevel}

Context:
- Student Name: ${studentName || 'Not provided'}
- Lesson Title: ${lessonTitle || 'Not provided'}

Lesson Notes:
"""
${lessonNotes}
"""

Return ONLY valid JSON matching this exact shape:
{
  "documentTitle": "string",
  "studentName": "string",
  "lessonTitle": "string",
  "summary": {
    "whatWeWorkedOn": "short paragraph",
    "wins": ["string", "string"],
    "focusAreas": ["string", "string"]
  },
  "homework": {
    "assignments": [
      {
        "title": "string",
        "objective": "string",
        "instructions": "clear step-by-step guidance",
        "estimatedMinutes": 20
      }
    ],
    "practiceTips": ["string", "string"]
  },
  "quiz": {
    "title": "string",
    "instructions": "string",
    "questions": [
      {
        "question": "string",
        "type": "multiple-choice",
        "options": ["string", "string", "string", "string"],
        "answerKey": "string",
        "explanation": "string"
      },
      {
        "question": "string",
        "type": "short-answer",
        "answerKey": "string",
        "explanation": "string"
      }
    ],
    "gradingRubric": ["string", "string"]
  },
  "nextLessonPlan": {
    "focus": "string",
    "prepNeeded": ["string", "string"]
  }
}

Rules:
- 3-6 quiz questions total
- At least 2 homework assignments
- Keep answers specific to the lesson notes
- Do not include markdown or code fences
- Do not include extra keys`

    const aiResult = await generateJSON<LessonSummaryResponse>(prompt, {
      model: 'gemini-3-flash',
    })

    const safe = sanitizeResponse(aiResult)

    if (!safe.summary.whatWeWorkedOn || safe.quiz.questions.length === 0 || safe.homework.assignments.length === 0) {
      return NextResponse.json(
        { error: 'Generated output was incomplete. Please try again with more lesson detail.' },
        { status: 422 }
      )
    }

    return NextResponse.json(safe)
  } catch (error: any) {
    log.error('Lesson summary generation failed', { message: error?.message || 'Unknown error' }, error)
    return NextResponse.json(
      { error: 'Failed to generate lesson summary. Please try again.' },
      { status: 500 }
    )
  }
}
