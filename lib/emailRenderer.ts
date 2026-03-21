import { render } from '@react-email/render'
import WelcomeEmail from '@/emails/WelcomeEmail'
import SessionReminderEmail from '@/emails/SessionReminderEmail'
import PhotosReadyEmail from '@/emails/PhotosReadyEmail'
import BookingConfirmationEmail from '@/emails/BookingConfirmationEmail'
import PaymentReminderEmail from '@/emails/PaymentReminderEmail'
import ReviewRequestEmail from '@/emails/ReviewRequestEmail'
import ReschedulingEmail from '@/emails/ReschedulingEmail'
import ContactFormConfirmationEmail from '@/emails/ContactFormConfirmationEmail'
import BookingRequestConfirmationEmail from '@/emails/BookingRequestConfirmationEmail'
import CouponDeliveryEmail from '@/emails/CouponDeliveryEmail'
import NewsletterWelcomeEmail from '@/emails/NewsletterWelcomeEmail'
import LeadFollowUpEmail from '@/emails/LeadFollowUpEmail'
import OutreachEmail from '@/emails/OutreachEmail'
import AdminLeadNotificationEmail from '@/emails/AdminLeadNotificationEmail'

/**
 * Map of template slugs to React Email components
 * Add new templates here as you create them
 */
const EMAIL_TEMPLATES = {
  'welcome-email': WelcomeEmail,
  'session-reminder': SessionReminderEmail,
  'photos-ready': PhotosReadyEmail,
  'booking-confirmation': BookingConfirmationEmail,
  'payment-reminder': PaymentReminderEmail,
  'review-request': ReviewRequestEmail,
  'rescheduling': ReschedulingEmail,
  'contact-form-confirmation': ContactFormConfirmationEmail,
  'booking-request-confirmation': BookingRequestConfirmationEmail,
  'coupon-delivery': CouponDeliveryEmail,
  'newsletter-welcome': NewsletterWelcomeEmail,
  // Follow-up sequence — pass followUpDay: 1|3|7 in the variables
  'lead-follow-up-day1': (props: any) => LeadFollowUpEmail({ ...props, followUpDay: 1 }),
  'lead-follow-up-day3': (props: any) => LeadFollowUpEmail({ ...props, followUpDay: 3 }),
  'lead-follow-up-day7': (props: any) => LeadFollowUpEmail({ ...props, followUpDay: 7 }),
  // Outreach / marketing campaigns
  'outreach': OutreachEmail,
  // Admin notification (sent to studio owner)
  'admin-lead-notification': AdminLeadNotificationEmail,
}

export type EmailTemplateSlug = keyof typeof EMAIL_TEMPLATES

/**
 * Render an email template with data using React Email
 * @param slug - Template slug (e.g., 'welcome-email')
 * @param data - Variables to populate in the template
 * @returns Rendered HTML string
 */
export async function renderEmailTemplate(
  slug: string,
  data: Record<string, any>
): Promise<string> {
  const TemplateComponent = EMAIL_TEMPLATES[slug as EmailTemplateSlug]
  
  if (!TemplateComponent) {
    throw new Error(`Email template not found: ${slug}`)
  }
  
  // Render React component to HTML
  const html = await render(TemplateComponent(data))
  return html
}

/**
 * Check if a template slug has a React Email component
 */
export function hasReactEmailTemplate(slug: string): boolean {
  return slug in EMAIL_TEMPLATES
}

/**
 * Get all available React Email template slugs
 */
export function getAvailableTemplates(): string[] {
  return Object.keys(EMAIL_TEMPLATES)
}

/**
 * Fallback: Simple variable substitution for HTML templates without React components.
 * After substituting known variables, any remaining {{...}} placeholders are removed
 * so they never appear literally in outbound emails.
 */
export function renderHtmlTemplate(
  html: string,
  data: Record<string, any>
): string {
  let rendered = html

  // Replace {{variable}} with data values (whitespace-tolerant)
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g')
    rendered = rendered.replace(regex, String(value ?? ''))
  })

  // Strip any remaining unresolved {{...}} placeholders
  rendered = rendered.replace(/\{\{[^}]+\}\}/g, '')

  return rendered
}
