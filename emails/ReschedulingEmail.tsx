import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Section,
  Button,
  Hr,
} from '@react-email/components'

const LOGO = 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1762887052/IMG_2115_mtuowt_tayodz.png'

interface ReschedulingEmailProps {
  firstName?: string
  sessionType?: string
  oldDate?: string
  oldTime?: string
  newDate?: string
  newTime?: string
  location?: string
  reason?: string
}

export default function ReschedulingEmail({
  firstName = '',
  sessionType = 'Photography Session',
  oldDate = '',
  oldTime = '',
  newDate = '',
  newTime = '',
  location = 'Studio37',
  reason = '',
}: ReschedulingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Studio37 session has been rescheduled</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img src={LOGO} alt="Studio37 Photography" style={logo} />
          </Section>

          {/* Header */}
          <div style={header}>
            <Heading style={h1}>Session Rescheduled</Heading>
            <Text style={headerSub}>We've updated your session details below</Text>
          </div>

          <Text style={text}>Hi {firstName},</Text>
          <Text style={text}>
            Your {sessionType} has been rescheduled. Here are your updated session details:
          </Text>

          {reason && (
            <Section style={reasonBox}>
              <Text style={reasonText}>
                <strong>Reason for change:</strong> {reason}
              </Text>
            </Section>
          )}

          {oldDate && (
            <div style={oldDateBox}>
              <Text style={oldDateLabel}>Previous Date (Cancelled)</Text>
              <Text style={strikethrough}>{oldDate} at {oldTime}</Text>
            </div>
          )}

          <div style={newDateBox}>
            <Heading as="h2" style={h2}>Your New Session Date ✓</Heading>
            <div style={detailRow}>
              <span style={label}>Date:</span>
              <span style={value}>{newDate}</span>
            </div>
            <div style={detailRow}>
              <span style={label}>Time:</span>
              <span style={value}>{newTime}</span>
            </div>
            <div style={detailRow}>
              <span style={label}>Location:</span>
              <span style={value}>{location}</span>
            </div>
          </div>

          <div style={buttonContainer}>
            <Button href="https://www.studio37.cc/contact" style={button}>
              Add to Calendar
            </Button>
          </div>

          <Text style={text}>
            We apologize for any inconvenience and look forward to seeing you on your new date!
          </Text>

          <Hr style={hr} />

          <Section style={callout}>
            <Text style={calloutText}>
              <strong>Need to make changes?</strong><br />
              Reply to this email or call us at <Link href="tel:8327139944">832-713-9944</Link>
            </Text>
          </Section>

          <Text style={footer}>
            Studio37 Photography · 1701 Goodson Loop Unit 80, Pinehurst, TX 77362<br />
            <Link href="https://www.studio37.cc">www.studio37.cc</Link> |{' '}
            <Link href="mailto:sales@studio37.cc">sales@studio37.cc</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  marginBottom: '64px',
  maxWidth: '600px',
  overflow: 'hidden' as const,
}

const logoSection = {
  backgroundColor: '#ffffff',
  padding: '24px 40px 16px',
  textAlign: 'center' as const,
  borderBottom: '1px solid #e5e7eb',
}

const logo = {
  maxWidth: '180px',
  width: '100%',
  height: 'auto',
}

const header = {
  background: 'linear-gradient(135deg, #b46e14 0%, #d97706 100%)',
  padding: '40px 40px',
  textAlign: 'center' as const,
}

const headerSub = {
  color: '#fef3c7',
  fontSize: '14px',
  fontWeight: '500',
  margin: '8px 0 0 0',
}

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
}

const h2 = {
  color: '#92400e',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 16px 0',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '16px 0',
}

const reasonBox = {
  backgroundColor: '#fef3c7',
  border: '1px solid #b46e14',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 40px',
}

const reasonText = {
  color: '#92400e',
  fontSize: '15px',
  margin: '0',
}

const oldDateBox = {
  backgroundColor: '#fee2e2',
  borderRadius: '8px',
  padding: '16px 24px',
  margin: '16px 40px',
  textAlign: 'center' as const,
}

const oldDateLabel = {
  color: '#991b1b',
  fontSize: '12px',
  fontWeight: '700' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 6px 0',
}

const strikethrough = {
  color: '#991b1b',
  fontSize: '16px',
  textDecoration: 'line-through',
  margin: '0',
}

const newDateBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #b46e14',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px auto',
  maxWidth: '460px',
  width: '78%',
  boxShadow: '0 4px 12px rgba(180, 110, 20, 0.08)',
}

const detailRow = {
  display: 'flex' as const,
  justifyContent: 'space-between',
  marginBottom: '12px',
  fontSize: '15px',
  lineHeight: '1.5',
}

const label = {
  color: '#6b7280',
  fontWeight: '500',
}

const value = {
  color: '#1f2937',
  fontWeight: '600',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#b46e14',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 40px',
}

const callout = {
  backgroundColor: '#fef3c7',
  border: '1px solid #b46e14',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 40px',
}

const calloutText = {
  color: '#92400e',
  fontSize: '14px',
  margin: '0',
  textAlign: 'center' as const,
}

const footer = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '20px',
  padding: '32px 40px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e5e7eb',
  marginTop: '16px',
}
