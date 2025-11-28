import { google, calendar_v3 } from 'googleapis'
import { createLogger } from './logger'

const log = createLogger('lib/googleCalendar')

// Google Calendar configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/calendar/callback'
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary'

// OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
)

// Calendar API scopes
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
]

/**
 * Generate OAuth2 authorization URL
 */
export function getAuthUrl(): string {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent' // Force consent to get refresh token
  })
}

/**
 * Exchange authorization code for tokens
 */
export async function getTokensFromCode(code: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    return tokens
  } catch (error) {
    log.error('Failed to get tokens from code', { error })
    throw error
  }
}

/**
 * Set OAuth2 credentials from stored tokens
 */
export function setCredentials(tokens: any) {
  oauth2Client.setCredentials(tokens)
}

/**
 * Get calendar API instance
 */
function getCalendarAPI(): calendar_v3.Calendar {
  return google.calendar({ version: 'v3', auth: oauth2Client })
}

/**
 * Create a calendar event for a consultation
 */
export async function createConsultationEvent(params: {
  date: string
  time: string
  clientName: string
  clientEmail: string
  phone: string
  notes?: string
}) {
  try {
    const { date, time, clientName, clientEmail, phone, notes } = params
    
    // Parse date and time to create start/end DateTime
    const [year, month, day] = date.split('-').map(Number)
    const [timeStr, ampm] = time.split(' ')
    const [hours, minutes] = timeStr.split(':').map(Number)
    let hour24 = hours
    if (ampm === 'PM' && hours !== 12) hour24 += 12
    if (ampm === 'AM' && hours === 12) hour24 = 0
    
    const startDateTime = new Date(year, month - 1, day, hour24, minutes)
    const endDateTime = new Date(startDateTime.getTime() + 15 * 60 * 1000) // 15 minutes
    
    const event: calendar_v3.Schema$Event = {
      summary: `Consultation: ${clientName}`,
      description: `15-minute consultation call with ${clientName}\n\nPhone: ${phone}\nEmail: ${clientEmail}\n\nNotes:\n${notes || 'No notes provided'}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Chicago' // CST
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Chicago'
      },
      attendees: [
        { email: clientEmail, displayName: clientName }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 60 },
          { method: 'email', minutes: 60 }
        ]
      },
      conferenceData: {
        createRequest: {
          requestId: `consultation-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      }
    }
    
    const calendar = getCalendarAPI()
    const response = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all' // Send email invitation to attendees
    })
    
    log.info('Calendar event created', {
      eventId: response.data.id,
      clientName,
      date,
      time
    })
    
    return response.data
  } catch (error: any) {
    log.error('Failed to create calendar event', {
      error: error.message,
      stack: error.stack
    })
    throw error
  }
}

/**
 * Get busy times from Google Calendar
 */
export async function getBusyTimes(params: {
  startDate: string
  endDate: string
}): Promise<Array<{ start: string; end: string }>> {
  try {
    const { startDate, endDate } = params
    
    const calendar = getCalendarAPI()
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: new Date(startDate).toISOString(),
        timeMax: new Date(endDate).toISOString(),
        timeZone: 'America/Chicago',
        items: [{ id: GOOGLE_CALENDAR_ID }]
      }
    })
    
    const busyTimes = response.data.calendars?.[GOOGLE_CALENDAR_ID]?.busy || []
    
    return busyTimes.map(busy => ({
      start: busy.start || '',
      end: busy.end || ''
    }))
  } catch (error: any) {
    log.error('Failed to get busy times', {
      error: error.message,
      startDate,
      endDate
    })
    throw error
  }
}

/**
 * List upcoming events
 */
export async function listUpcomingEvents(maxResults: number = 10) {
  try {
    const calendar = getCalendarAPI()
    const response = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: 'startTime'
    })
    
    return response.data.items || []
  } catch (error: any) {
    log.error('Failed to list events', { error: error.message })
    throw error
  }
}

/**
 * Delete a calendar event
 */
export async function deleteEvent(eventId: string) {
  try {
    const calendar = getCalendarAPI()
    await calendar.events.delete({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId,
      sendUpdates: 'all' // Notify attendees
    })
    
    log.info('Calendar event deleted', { eventId })
  } catch (error: any) {
    log.error('Failed to delete event', {
      error: error.message,
      eventId
    })
    throw error
  }
}

/**
 * Update a calendar event
 */
export async function updateEvent(eventId: string, updates: Partial<calendar_v3.Schema$Event>) {
  try {
    const calendar = getCalendarAPI()
    const response = await calendar.events.patch({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId,
      requestBody: updates,
      sendUpdates: 'all'
    })
    
    log.info('Calendar event updated', { eventId })
    return response.data
  } catch (error: any) {
    log.error('Failed to update event', {
      error: error.message,
      eventId
    })
    throw error
  }
}

/**
 * Generate .ics calendar file for email attachment
 */
export function generateICS(params: {
  date: string
  time: string
  clientName: string
  clientEmail: string
  description?: string
}): string {
  const { date, time, clientName, clientEmail, description } = params
  
  // Parse date and time
  const [year, month, day] = date.split('-').map(Number)
  const [timeStr, ampm] = time.split(' ')
  const [hours, minutes] = timeStr.split(':').map(Number)
  let hour24 = hours
  if (ampm === 'PM' && hours !== 12) hour24 += 12
  if (ampm === 'AM' && hours === 12) hour24 = 0
  
  const startDateTime = new Date(year, month - 1, day, hour24, minutes)
  const endDateTime = new Date(startDateTime.getTime() + 15 * 60 * 1000)
  
  // Format dates for ICS (YYYYMMDDTHHMMSSZ)
  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }
  
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Studio37 Photography//Consultation Booking//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${Date.now()}@studio37.cc
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDateTime)}
DTEND:${formatDate(endDateTime)}
SUMMARY:Consultation with Studio37 Photography
DESCRIPTION:${description || '15-minute consultation call'}
ORGANIZER;CN=Studio37 Photography:mailto:contact@studio37photography.com
ATTENDEE;CN=${clientName};RSVP=TRUE:mailto:${clientEmail}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:Reminder: Consultation in 1 hour
END:VALARM
END:VEVENT
END:VCALENDAR`
  
  return icsContent
}
