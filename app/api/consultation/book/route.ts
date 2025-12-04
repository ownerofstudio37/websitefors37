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

    // Validate date/time is not in the past (allow same-day if time is still ahead in CST)
    const bookingDate = new Date(date)
    const tz = 'America/Chicago'
    const nowCST = new Date(
      new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }).format(new Date())
      .replace(
        /(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})/,
        '$3-$1-$2T$4:$5:$6'
      ) + ':00'
    )
    const todayCST = new Date(new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2'))
    
    // If booking date is strictly before today (CST), block
    if (bookingDate < todayCST) {
      return NextResponse.json(
        { error: 'Selected date is in the past. Please choose today or a future date.' },
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
    // Consultations: 10am - 10pm (10:00 - 22:00), 7 days a week
    const timeInMinutes = hour * 60 + minute
    const startTime = 10 * 60 // 10:00 AM
    const endTime = 22 * 60 // 10:00 PM
    
    if (timeInMinutes < startTime || timeInMinutes >= endTime) {
      return NextResponse.json(
        { error: 'Consultations are available from 10:00 AM to 10:00 PM CST, 7 days a week' },
        { status: 400 }
      )
    }

  // Server-side admin client (RLS bypass for trusted API route)
  const supabase = getSupabaseAdmin()

    // Check for existing bookings at this time
    // Build start/end time for the time slot
    const [datePart] = date.split('T')
    const slotStartTime = new Date(`${datePart}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`).toISOString()
    const slotEndTime = new Date(new Date(slotStartTime).getTime() + 30 * 60 * 1000).toISOString()
    
    const { data: existingBookings, error: checkError } = await supabase
      .from('appointments')
      .select('*')
      .gte('start_time', slotStartTime)
      .lt('start_time', slotEndTime)
      .in('status', ['scheduled', 'confirmed'])

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

    // Combine date and time to ensure same-day time is in the future (CST)
    const selectedTimeMinutes = hour * 60 + minute
    const nowCSTMinutes = nowCST.getHours() * 60 + nowCST.getMinutes()
    const isSameDayCST = bookingDate.toLocaleDateString('en-US', { timeZone: tz }) === nowCST.toLocaleDateString('en-US', { timeZone: tz })
    if (isSameDayCST && selectedTimeMinutes <= nowCSTMinutes) {
      return NextResponse.json(
        { error: 'Selected time has already passed. Please choose a later time today or another date.' },
        { status: 400 }
      )
    }

    // Create the consultation booking
    // Convert date and time to start_time and end_time timestamps
    // Reuse datePart from above
    const appointmentDateTime = new Date(`${datePart}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`)
    const startTime = appointmentDateTime.toISOString()
    const endTime = new Date(appointmentDateTime.getTime() + 30 * 60 * 1000).toISOString() // 30 min consultation
    
    const { data: booking, error: insertError } = await supabase
      .from('appointments')
      .insert({
        name: name,
        email: email,
        phone: phone,
        type: 'consultation',
        duration_minutes: 30,
        start_time: startTime,
        end_time: endTime,
        status: 'scheduled',
        notes: notes || ''
      })
      .select()
      .single()

    if (insertError) {
      log.error('Error creating booking', { error: insertError })
      return NextResponse.json(
        { error: `Failed to create booking: ${insertError?.message || insertError}` },
        { status: 400 }
      )
    }

    log.info('Consultation booked successfully', {
      bookingId: booking.id,
      startTime: booking.start_time,
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
          date: date,
          time: time,
          name: booking.name,
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

    const supabase = getSupabaseAdmin()

    // Get all bookings for this date
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)
    
    const { data: bookings, error } = await supabase
      .from('appointments')
      .select('start_time, type')
      .gte('start_time', startOfDay.toISOString())
      .lte('start_time', endOfDay.toISOString())
      .in('status', ['scheduled', 'confirmed'])

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
    // Convert booking start_times to display times for comparison
    const bookedTimes = bookings?.map(b => {
      const bookingTime = new Date(b.start_time)
      const h = bookingTime.getHours()
      const m = bookingTime.getMinutes()
      const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h
      const ampm = h >= 12 ? 'PM' : 'AM'
      return `${displayHour}:${m.toString().padStart(2, '0')} ${ampm}`
    }) || []

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
