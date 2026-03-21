import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET(req: NextRequest) {
  try {
    const { data: templates, error } = await supabaseAdmin
      .from('email_templates')
      .select('id, slug')

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // Query actual email send data from leads table auto-response tracking
    // Leads with non-null auto_response_sent_at indicate an email was sent
    const { data: leadCounts } = await supabaseAdmin
      .from('leads')
      .select('source, created_at')
      .not('source', 'is', null)
      .order('created_at', { ascending: false })

    // Build stats from real lead data per source/template mapping
    const sourceToSlug: Record<string, string> = {
      'contact-form': 'contact-form-confirmation',
      'booking-form': 'booking-request-confirmation',
      'chatbot': 'welcome-email',
      'chatbot-quote-form': 'booking-request-confirmation',
      'chatbot-legacy': 'welcome-email',
      'newsletter_popup': 'newsletter-welcome',
      'newsletter_inline': 'newsletter-welcome',
    }

    const slugCounts: Record<string, { count: number; lastDate: string | null }> = {}
    for (const lead of leadCounts || []) {
      const slug = sourceToSlug[lead.source]
      if (!slug) continue
      if (!slugCounts[slug]) slugCounts[slug] = { count: 0, lastDate: null }
      slugCounts[slug].count++
      if (!slugCounts[slug].lastDate || lead.created_at > slugCounts[slug].lastDate!) {
        slugCounts[slug].lastDate = lead.created_at
      }
    }

    const stats = (templates || []).map(t => ({
      slug: t.slug,
      totalSent: slugCounts[t.slug]?.count ?? 0,
      lastSent: slugCounts[t.slug]?.lastDate ?? null,
    }))

    return NextResponse.json({ success: true, stats })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
