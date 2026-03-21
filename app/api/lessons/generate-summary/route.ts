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

function buildFallbackSummary(input: {
  lessonNotes: string
  studentName?: string
  lessonTitle?: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
}): LessonSummaryResponse {
  const { lessonNotes, studentName, lessonTitle, skillLevel } = input
  const lines = lessonNotes
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)

  const keyPoints = lines.slice(0, 6)
  const focusPoints = lines.slice(6, 12)

  const levelHint =
    skillLevel === 'advanced'
      ? 'Push precision and consistency under pressure.'
      : skillLevel === 'intermediate'
      ? 'Build consistency and confidence across scenarios.'
      : 'Reinforce fundamentals with simple repeatable reps.'

  const fallback: LessonSummaryResponse = {
    documentTitle: lessonTitle ? `${lessonTitle} — Lesson Recap` : 'Photography Lesson Recap',
    studentName,
    lessonTitle,
    summary: {
      whatWeWorkedOn:
        keyPoints.length > 0
          ? `In this session we covered ${keyPoints.slice(0, 3).join(', ')}. ${levelHint}`
          : `In this session we worked on core photography skills and practical drills. ${levelHint}`,
      wins:
        keyPoints.slice(0, 3).length > 0
          ? keyPoints.slice(0, 3)
          : ['Improved camera handling and confidence', 'Better awareness of light and composition'],
      focusAreas:
        focusPoints.slice(0, 3).length > 0
          ? focusPoints.slice(0, 3)
          : ['Consistency in exposure settings', 'Intentional framing and subject placement', 'Steadier shooting workflow'],
    },
    homework: {
      assignments: [
        {
          title: 'Technique Repetition Set',
          objective: 'Build muscle memory for the techniques covered in this lesson.',
          instructions:
            'Run 3 short practice rounds this week. In each round, shoot 20 frames focused on one key skill from today, then review your best 5 and note what improved.',
          estimatedMinutes: 30,
        },
        {
          title: 'Applied Mini Session',
          objective: 'Apply today’s lesson in a real-world shooting scenario.',
          instructions:
            'Complete one 20–30 minute mini shoot using the lesson methods. Deliver 8 edited images and a short reflection on what worked and what needs adjustment.',
          estimatedMinutes: 45,
        },
      ],
      practiceTips: [
        'Practice in short, focused sessions instead of one long session.',
        'Review your images immediately and log one adjustment after each set.',
        'Prioritize consistency over complexity for this week.',
      ],
    },
    quiz: {
      title: 'Lesson Knowledge Check',
      instructions: 'Answer each question based on today’s lesson and your practice workflow.',
      questions: [
        {
          question: 'What was the primary technical focus of this lesson?',
          type: 'short-answer',
          answerKey: 'A clear statement of the lesson’s main technical objective.',
          explanation: 'This checks understanding of the session objective.',
        },
        {
          question: 'Which habit most improves consistency between shots?',
          type: 'multiple-choice',
          options: [
            'Changing multiple settings at once',
            'Using a repeatable pre-shot checklist',
            'Ignoring image review between sets',
            'Only shooting in one lighting condition',
          ],
          answerKey: 'Using a repeatable pre-shot checklist',
          explanation: 'Consistency comes from a repeatable process.',
        },
        {
          question: 'Name one correction you should apply when your results are inconsistent.',
          type: 'short-answer',
          answerKey: 'A valid correction tied to exposure, composition, focus, or shooting workflow.',
          explanation: 'The goal is to translate review into action.',
        },
      ],
      gradingRubric: [
        'Excellent: responses are specific, accurate, and tied to practice decisions.',
        'Proficient: responses are mostly correct with minor gaps in detail.',
        'Needs Work: responses are vague or do not connect to the lesson objectives.',
      ],
    },
    nextLessonPlan: {
      focus: 'Reinforce this lesson’s core technique, then layer in controlled complexity.',
      prepNeeded: [
        'Bring 8–12 recent practice images for critique.',
        'List 2 wins and 2 challenges from homework.',
        'Prepare one real-world shooting scenario to simulate in-session.',
      ],
    },
  }

  return fallback
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

    let safe: LessonSummaryResponse
    try {
      const aiResult = await generateJSON<LessonSummaryResponse>(prompt, {
        model: 'gemini-2.5-flash',
      })
      safe = sanitizeResponse(aiResult)
    } catch (aiError) {
      log.warn('AI JSON generation failed, using deterministic fallback', {
        message: aiError instanceof Error ? aiError.message : 'unknown error',
      })
      safe = sanitizeResponse(
        buildFallbackSummary({
          lessonNotes,
          studentName,
          lessonTitle,
          skillLevel,
        })
      )
    }

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
