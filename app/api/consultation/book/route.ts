import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/consultation/book')

interface BookingRequest {
  date: string
  time: string
  name: string
  email: string
  phone: string
  notes?: string
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers)
  
  // Rate limiting: 3 bookings per 15 minutes
  const rl = rateLimit(`consultation-book:${ip}`, {
    limit: 3,
    windowMs: 15 * 60 * 1000
  })
  
  if (!rl.allowed) {
    log.warn('Rate limit exceeded', { ip, remainingTime: rl.remainingTime })
    return NextResponse.json(
      { error: 'Too many booking attempts. Please try again later.' },
      { status: 429 }
    )
  }

  try {
    const body: BookingRequest = await request.json()
    const { date, time, name, email, phone, notes } = body

    // Validation
    if (!date || !time || !name || !email || !phone) {
      log.warn('Missing required fields', { date, time, name, email, phone })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate date is not in the past
    const bookingDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (bookingDate < today) {
      return NextResponse.json(
        { error: 'Cannot book consultations in the past' },
        { status: 400 }
      )
    }

    // Validate business hours
    const isWeekend = bookingDate.getDay() === 0 || bookingDate.getDay() === 6
    const timeMatch = time.match(/(\d+):(\d+)\s*(AM|PM)/)
    
    if (!timeMatch) {
      return NextResponse.json(
        { error: 'Invalid time format' },
        { status: 400 }
      )
    }
    
    let hour = parseInt(timeMatch[1])
    const minute = parseInt(timeMatch[2])
    const ampm = timeMatch[3]
    
    // Convert to 24-hour format
    if (ampm === 'PM' && hour !== 12) hour += 12
    if (ampm === 'AM' && hour === 12) hour = 0
    
    // Check business hours
    if (isWeekend) {
      // Weekend: 12pm - 11pm (12:00 - 23:00)
      if (hour < 12 || hour >= 23) {
        return NextResponse.json(
          { error: 'Weekend consultations are available from 12:00 PM to 11:00 PM CST' },
          { status: 400 }
        )
      }
    } else {
      // Weekday: 4:30pm - 11pm (16:30 - 23:00)
      const timeInMinutes = hour * 60 + minute
      const startTime = 16 * 60 + 30 // 4:30 PM
      const endTime = 23 * 60 // 11:00 PM
      
      if (timeInMinutes < startTime || timeInMinutes >= endTime) {
        return NextResponse.json(
          { error: 'Weekday consultations are available from 4:30 PM to 11:00 PM CST' },
          { status: 400 }
        )
      }
    }

  // Server-side admin client (RLS bypass for trusted API route)
  const supabase = getSupabaseAdmin()

    // Check for existing bookings at this time
    const { data: existingBookings, error: checkError } = await supabase
      .from('appointments')
      .select('*')
      .eq('appointment_date', date)
      .eq('appointment_time', time)
      .eq('status', 'confirmed')

    if (checkError) {
      log.error('Error checking existing bookings', { error: checkError })
      return NextResponse.json(
        { error: 'Failed to check availability' },
        { status: 500 }
      )
    }

    // For consultations, we can have multiple at same time (different slots)
    // But for safety, let's limit to 3 simultaneous consultations
    if (existingBookings && existingBookings.length >= 3) {
      return NextResponse.json(
        { error: 'This time slot is no longer available' },
        { status: 409 }
      )
    }

    // Create the consultation booking
    const { data: booking, error: insertError } = await supabase
      .from('appointments')
      .insert({
        client_name: name,
        email: email,
        phone: phone,
        appointment_date: date,
        appointment_time: time,
        service_type: 'consultation',
        booking_type: 'consultation',
        status: 'confirmed',
        notes: notes || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) {
      log.error('Error creating booking', { error: insertError })
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    log.info('Consultation booked successfully', {
      bookingId: booking.id,
      date,
      time,
      email
    })

    // Create Google Calendar event (non-blocking - don't fail booking if this fails)
    try {
  const { getSupabaseAdmin } = await import('@/lib/supabaseAdmin')
      const { setCredentials, createConsultationEvent } = await import('@/lib/googleCalendar')
      
  const supabaseAdmin = getSupabaseAdmin()
      const { data: settings } = await supabaseAdmin
        .from('settings')
        .select('value')
        .eq('key', 'google_calendar_tokens')
        .single()
      
      if (settings?.value) {
        const tokens = JSON.parse(settings.value)
        setCredentials(tokens)
        
        const calendarEvent = await createConsultationEvent({
          date,
          time,
          clientName: name,
          clientEmail: email,
          phone,
          notes
        })
        
        // Store calendar event ID with booking
        await supabase
          .from('appointments')
          .update({ calendar_event_id: calendarEvent.id })
          .eq('id', booking.id)
        
        log.info('Google Calendar event created', {
          eventId: calendarEvent.id,
          bookingId: booking.id
        })
      }
    } catch (calendarError: any) {
      // Log but don't fail the booking
      log.warn('Failed to create calendar event', {
        error: calendarError.message,
        bookingId: booking.id
      })
    }

    // TODO: Send confirmation email
    // TODO: Send calendar invite
    // TODO: Add to CRM/leads if needed

    return NextResponse.json(
      {
        success: true,
        booking: {
          id: booking.id,
          date: booking.appointment_date,
          time: booking.appointment_time,
          name: booking.client_name,
          email: booking.email
        },
        message: 'Consultation booked successfully! Check your email for confirmation.'
      },
      { status: 201 }
    )

  } catch (error) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// GET endpoint to check available slots for a specific date
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Get all bookings for this date
    const { data: bookings, error } = await supabase
      .from('appointments')
      .select('appointment_time, booking_type')
      .eq('appointment_date', date)
      .eq('status', 'confirmed')

    if (error) {
      log.error('Error fetching bookings', { error })
      return NextResponse.json(
        { error: 'Failed to fetch availability' },
        { status: 500 }
      )
    }

    // Generate all possible time slots
    const bookingDate = new Date(date)
    const isWeekend = bookingDate.getDay() === 0 || bookingDate.getDay() === 6
    const startHour = isWeekend ? 12 : 16.5
    const endHour = 23

    const availableSlots: string[] = []
    const bookedTimes = bookings?.map(b => b.appointment_time) || []

    for (let hour = startHour; hour < endHour; hour += 0.5) {
      const h = Math.floor(hour)
      const m = (hour % 1) * 60
      const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h
      const ampm = h >= 12 ? 'PM' : 'AM'
      const displayTime = `${displayHour}:${m.toString().padStart(2, '0')} ${ampm}`

      // Count how many bookings at this time
      const bookingsAtTime = bookedTimes.filter(t => t === displayTime).length

      // Allow up to 3 simultaneous consultations
      if (bookingsAtTime < 3) {
        availableSlots.push(displayTime)
      }
    }

    return NextResponse.json({
      date,
      isWeekend,
      availableSlots,
      totalSlots: isWeekend ? 22 : 13,
      availableCount: availableSlots.length
    })

  } catch (error) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
