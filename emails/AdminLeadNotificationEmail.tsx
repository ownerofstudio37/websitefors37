import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Button,
  Hr,
  Row,
  Column,
} from '@react-email/components'

interface AdminLeadNotificationEmailProps {
  name?: string
  email?: string
  phone?: string
  serviceInterest?: string
  budgetRange?: string
  eventDate?: string
  message?: string
  source?: string
  leadId?: string
  leadScore?: number
  siteUrl?: string
}

const BRAND_GOLD = '#fbbf24'
const BRAND_DARK = '#1a1a1a'
const BRAND_PRIMARY = '#b46e14'

function getScoreColor(score?: number) {
  if (!score) return '#6b7280'
  if (score >= 70) return '#059669'
  if (score >= 40) return '#d97706'
  return '#dc2626'
}

function getScoreLabel(score?: number) {
  if (!score) return 'Unscored'
  if (score >= 70) return '🔥 Hot Lead'
  if (score >= 40) return '⚡ Warm Lead'
  return '❄️ Cool Lead'
}

function getSourceLabel(source?: string) {
  const map: Record<string, string> = {
    'chatbot': '🤖 AI Chatbot',
    'chatbot-quote-form': '🤖 Chatbot Quote Form',
    'chatbot-legacy': '🤖 Chatbot (Legacy)',
    'contact-form': '📝 Contact Form',
    'booking-form': '📅 Booking Form',
    'newsletter_popup': '📰 Newsletter Popup',
    'newsletter_inline': '📰 Newsletter Inline',
    'manual': '👤 Manual Entry',
  }
  return map[source || ''] || source || 'Unknown'
}

export default function AdminLeadNotificationEmail({
  name = 'Unknown',
  email = '',
  phone = '',
  serviceInterest = '',
  budgetRange = '',
  eventDate = '',
  message = '',
  source = '',
  leadId = '',
  leadScore,
  siteUrl = 'https://www.studio37.cc',
}: AdminLeadNotificationEmailProps) {
  const scoreColor = getScoreColor(leadScore)
  const scoreLabel = getScoreLabel(leadScore)
  const sourceLabel = getSourceLabel(source)
  const adminUrl = `${siteUrl}/admin/leads`

  return (
    <Html>
      <Head />
      <Preview>🔔 New Lead: {name} — {serviceInterest || 'Studio37'}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Admin Header */}
          <div style={adminHeader}>
            <div style={headerLeft}>
              <span style={headerBadge}>STUDIO37 ADMIN</span>
              <Heading style={headerTitle}>New Lead Notification</Heading>
            </div>
            <div style={headerRight}>
              <Text style={notifBell}>🔔</Text>
            </div>
          </div>

          {/* Lead score banner */}
          {leadScore !== undefined && (
            <div style={{ ...scoreBanner, borderLeftColor: scoreColor }}>
              <span style={{ ...scoreNum, color: scoreColor }}>{leadScore}/100</span>
              <span style={{ ...scoreLabel2, color: scoreColor }}>{scoreLabel}</span>
            </div>
          )}

          {/* Lead details card */}
          <Section style={cardSection}>
            <Heading as="h2" style={cardTitle}>Contact Information</Heading>

            <Row style={detailRow}>
              <Column style={detailLabel}>Name</Column>
              <Column style={detailValue}><strong>{name}</strong></Column>
            </Row>

            {email && (
              <Row style={detailRow}>
                <Column style={detailLabel}>Email</Column>
                <Column style={detailValue}>
                  <Link href={`mailto:${email}`} style={inlineLink}>{email}</Link>
                </Column>
              </Row>
            )}

            {phone && (
              <Row style={detailRow}>
                <Column style={detailLabel}>Phone</Column>
                <Column style={detailValue}>
                  <Link href={`tel:${phone}`} style={inlineLink}>{phone}</Link>
                </Column>
              </Row>
            )}

            {serviceInterest && (
              <Row style={detailRow}>
                <Column style={detailLabel}>Service</Column>
                <Column style={detailValue}>{serviceInterest}</Column>
              </Row>
            )}

            {budgetRange && (
              <Row style={detailRow}>
                <Column style={detailLabel}>Budget</Column>
                <Column style={detailValue}>{budgetRange}</Column>
              </Row>
            )}

            {eventDate && (
              <Row style={detailRow}>
                <Column style={detailLabel}>Date</Column>
                <Column style={detailValue}>{eventDate}</Column>
              </Row>
            )}

            <Row style={detailRow}>
              <Column style={detailLabel}>Source</Column>
              <Column style={detailValue}>{sourceLabel}</Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabel}>Received</Column>
              <Column style={detailValue}>{new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</Column>
            </Row>
          </Section>

          {/* Message block */}
          {message && (
            <Section style={messageSection}>
              <Heading as="h3" style={messageTitle}>Their Message</Heading>
              <div style={messageBox}>
                <Text style={messageText}>{message}</Text>
              </div>
            </Section>
          )}

          <Hr style={hr} />

          {/* Action buttons */}
          <Section style={actionsSection}>
            <Text style={actionsLabel}>Quick Actions</Text>
            <Row>
              <Column style={actionCol}>
                <Button href={adminUrl} style={primaryActionBtn}>
                  Open in CRM →
                </Button>
              </Column>
              {email && (
                <Column style={actionCol}>
                  <Button href={`mailto:${email}?subject=Re: Your Studio37 Inquiry`} style={secondaryActionBtn}>
                    Reply by Email
                  </Button>
                </Column>
              )}
              {phone && (
                <Column style={actionCol}>
                  <Button href={`tel:${phone}`} style={secondaryActionBtn}>
                    Call Now
                  </Button>
                </Column>
              )}
            </Row>
          </Section>

          {/* Footer */}
          <Text style={footer}>
            Studio37 Admin Notification · Lead ID: {leadId || 'N/A'}<br />
            This is an automated admin notification. Do not reply to this email.<br />
            <Link href={adminUrl} style={footerLink}>Manage all leads</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f1f5f9',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '20px auto',
  maxWidth: '600px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
}

const adminHeader = {
  background: `linear-gradient(135deg, ${BRAND_DARK} 0%, #111827 100%)`,
  padding: '24px 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const headerLeft = { flex: 1 }

const headerBadge = {
  backgroundColor: BRAND_GOLD,
  color: BRAND_DARK,
  fontSize: '10px',
  fontWeight: '800' as const,
  letterSpacing: '2px',
  padding: '3px 10px',
  borderRadius: '20px',
  display: 'inline-block',
}

const headerTitle = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: '700' as const,
  margin: '8px 0 0 0',
}

const headerRight = { textAlign: 'right' as const }

const notifBell = {
  fontSize: '36px',
  margin: '0',
}

const scoreBanner = {
  borderLeft: `4px solid #059669`,
  margin: '0',
  padding: '14px 32px',
  backgroundColor: '#f0fdf4',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}

const scoreNum = {
  fontSize: '22px',
  fontWeight: '800' as const,
  margin: '0',
  display: 'inline',
}

const scoreLabel2 = {
  fontSize: '14px',
  fontWeight: '700' as const,
  margin: '0 0 0 12px',
  display: 'inline',
}

const cardSection = {
  padding: '24px 32px',
}

const cardTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '700' as const,
  margin: '0 0 16px 0',
  borderBottom: '2px solid #f3f4f6',
  paddingBottom: '8px',
}

const detailRow = {
  marginBottom: '10px',
  verticalAlign: 'top' as const,
}

const detailLabel = {
  width: '120px',
  color: '#6b7280',
  fontSize: '13px',
  fontWeight: '600' as const,
  verticalAlign: 'top' as const,
  paddingTop: '2px',
}

const detailValue = {
  color: '#1f2937',
  fontSize: '14px',
  verticalAlign: 'top' as const,
}

const inlineLink = { color: BRAND_PRIMARY, textDecoration: 'none' }

const messageSection = {
  padding: '0 32px 24px',
}

const messageTitle = {
  color: '#1f2937',
  fontSize: '15px',
  fontWeight: '700' as const,
  margin: '0 0 10px 0',
}

const messageBox = {
  backgroundColor: '#f9fafb',
  borderLeft: `4px solid ${BRAND_GOLD}`,
  borderRadius: '0 8px 8px 0',
  padding: '14px 16px',
}

const messageText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
  fontStyle: 'italic',
}

const hr = { borderColor: '#e5e7eb', margin: '0 32px' }

const actionsSection = {
  padding: '20px 32px 24px',
}

const actionsLabel = {
  color: '#6b7280',
  fontSize: '11px',
  fontWeight: '700' as const,
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  margin: '0 0 12px 0',
}

const actionCol = {
  verticalAlign: 'top' as const,
  paddingRight: '8px',
}

const primaryActionBtn = {
  backgroundColor: BRAND_DARK,
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '700' as const,
  padding: '11px 20px',
  textDecoration: 'none',
  display: 'inline-block',
}

const secondaryActionBtn = {
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  color: '#374151',
  fontSize: '13px',
  fontWeight: '600' as const,
  padding: '11px 16px',
  textDecoration: 'none',
  display: 'inline-block',
  border: '1px solid #e5e7eb',
}

const footer = {
  color: '#9ca3af',
  fontSize: '11px',
  textAlign: 'center' as const,
  lineHeight: '20px',
  padding: '12px 32px 20px',
  margin: '0',
  backgroundColor: '#f9fafb',
  borderTop: '1px solid #f3f4f6',
}

const footerLink = { color: BRAND_PRIMARY, textDecoration: 'underline', fontSize: '11px' }
