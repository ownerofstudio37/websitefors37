import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'
import bcrypt from 'bcryptjs'

const log = createLogger('api/admin/galleries')

// GET - List all galleries
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    
    const { data: galleries, error } = await supabase
      .from('galleries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      log.error('Failed to fetch galleries', { error })
      return NextResponse.json(
        { success: false, error: 'Failed to fetch galleries' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, galleries })
  } catch (error) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// POST - Create new gallery
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      client_name,
      client_email,
      session_date,
      session_type,
      title,
      description,
      password,
      allow_downloads,
      require_purchase,
      expires_days
    } = body

    // Validate required fields
    if (!client_name || !client_email || !title || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate access code (URL-friendly)
    const access_code = `${client_name.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString(36)}`
    
    // Hash password
    const password_hash = await bcrypt.hash(password, 10)

    // Calculate expiry date
    let expires_at = null
    if (expires_days && expires_days > 0) {
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + expires_days)
      expires_at = expiryDate.toISOString()
    }

    const supabase = getSupabaseAdmin()
    
    const { data: gallery, error } = await supabase
      .from('galleries')
      .insert({
        client_name,
        client_email,
        session_date: session_date || null,
        session_type: session_type || null,
        title,
        description: description || null,
        password_hash,
        access_code,
        status: 'active',
        expires_at,
        allow_downloads: allow_downloads || false,
        require_purchase: require_purchase !== false, // default true
        total_photos: 0,
        views_count: 0,
        downloads_count: 0
      })
      .select()
      .single()

    if (error) {
      log.error('Failed to create gallery', { error })
      return NextResponse.json(
        { success: false, error: `Failed to create gallery: ${error.message}` },
        { status: 400 }
      )
    }

    log.info('Gallery created', { galleryId: gallery.id, client_name, title })

    return NextResponse.json({ success: true, gallery }, { status: 201 })
  } catch (error: any) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
