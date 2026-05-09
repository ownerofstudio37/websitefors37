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
  Img,
} from '@react-email/components'

interface BookingConfirmationEmailProps {
  firstName?: string
  sessionType?: string
  sessionDate?: string
  sessionTime?: string
  location?: string
  duration?: string
  packageName?: string
  totalAmount?: string
  depositAmount?: string
  photographer?: string
}

export default function BookingConfirmationEmail({
  firstName = '',
  sessionType = 'Photography',
  sessionDate = '',
  sessionTime = '',
  location = 'Studio37',
  duration = '2 hours',
  packageName = '',
  totalAmount = '',
  depositAmount = '',
  photographer = 'Studio37 Team',
}: BookingConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your session with Studio37 is confirmed! 📸</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo Header */}
          <Section style={logoSection}>
            <Img 
              src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1762887052/IMG_2115_mtuowt_tayodz.png"
              alt="Studio37 Photography"
              style={logo}
            />
          </Section>

          {/* Hero Header */}
          <div style={header}>
            <Heading style={h1}>Booking Confirmed! ✓</Heading>
            <Text style={headerSubtext}>We're excited to photograph your session</Text>
          </div>
          
          <Text style={text}>
            Hi {firstName},
          </Text>

          <Text style={text}>
            Great news! Your {sessionType} session is confirmed. We can't wait to capture amazing memories with you!
          </Text>

          <div style={confirmationBox}>
            <Heading as="h2" style={h2}>Session Details</Heading>
            
            <div style={detailRow}>
              <span style={label}>Date:</span>
              <span style={value}>{sessionDate}</span>
            </div>
            
            <div style={detailRow}>
              <span style={label}>Time:</span>
              <span style={value}>{sessionTime}</span>
            </div>
            
            <div style={detailRow}>
              <span style={label}>Duration:</span>
              <span style={value}>{duration}</span>
            </div>
            
            <div style={detailRow}>
              <span style={label}>Location:</span>
              <span style={value}>{location}</span>
            </div>
            
            <div style={detailRow}>
              <span style={label}>Photographer:</span>
              <span style={value}>{photographer}</span>
            </div>

            {packageName && (
              <div style={detailRow}>
                <span style={label}>Package:</span>
                <span style={value}>{packageName}</span>
              </div>
            )}
          </div>

          {totalAmount && (
            <Section style={pricingBox}>
              <div style={pricingRow}>
                <span style={label}>Total Investment:</span>
                <span style={priceValue}>${totalAmount}</span>
              </div>
              {depositAmount && (
                <div style={pricingRow}>
                  <span style={label}>Deposit Paid:</span>
                  <span style={value}>${depositAmount}</span>
                </div>
              )}
            </Section>
          )}

          <Section style={section}>
            <Heading as="h3" style={h3}>What to Expect</Heading>
            <ul style={list}>
              <li>We'll send a reminder 24 hours before your session</li>
              <li>Please arrive 10 minutes early for setup</li>
              <li>Bring any props or outfit changes discussed</li>
              <li>Photos will be ready within 2-3 weeks</li>
            </ul>
          </Section>

          <div style={buttonContainer}>
            <Button href="https://www.studio37.cc/contact" style={button}>
              Questions? Contact Us
            </Button>
          </div>

          <Hr style={hr} />

          <Text style={callout}>
            <strong>Need to reschedule?</strong> No problem! Just reply to this email or call us at{' '}
            <Link href="tel:8327139944">832-713-9944</Link>
          </Text>

          <Text style={footer}>
            Studio37 Photography<br />
            1701 Goodson Loop Unit 80, Pinehurst, TX 77362<br />
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
  objectFit: 'contain' as const,
}

const header = {
  background: 'linear-gradient(135deg, #b46e14 0%, #d97706 100%)',
  padding: '40px 40px',
  textAlign: 'center' as const,
}

const headerSubtext = {
  color: '#fef3c7',
  fontSize: '14px',
  fontWeight: '500',
  margin: '8px 0 0 0',
  lineHeight: '1.4',
}

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
}

const h2 = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px 0',
}

const h3 = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 12px 0',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '16px 0',
}

const confirmationBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #b46e14',
  borderRadius: '12px',
  padding: '22px',
  margin: '28px auto',
  maxWidth: '460px',
  width: '78%',
  boxShadow: '0 4px 12px rgba(180, 110, 20, 0.08)',
}

const pricingBox = {
  backgroundColor: '#fffbeb',
  border: '1px solid #fbbf24',
  borderRadius: '8px',
  padding: '20px',
  margin: '16px 40px',
}

const detailRow = {
  display: 'flex' as const,
  justifyContent: 'space-between',
  marginBottom: '14px',
  fontSize: '15px',
  lineHeight: '1.5',
}

const pricingRow = {
  display: 'flex' as const,
  justifyContent: 'space-between',
  marginBottom: '10px',
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

const priceValue = {
  color: '#b46e14',
  fontWeight: '700',
  fontSize: '18px',
}

const section = {
  padding: '0 40px',
  margin: '32px 0',
}

const list = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '24px',
  marginLeft: '20px',
  paddingLeft: '0',
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
  transition: 'background-color 0.2s ease',
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
  margin: '20px 40px',
  fontSize: '14px',
  color: '#92400e',
}

const footer = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '20px',
  padding: '32px 40px',
  textAlign: 'center' as const,
  marginTop: '16px',
  borderTop: '1px solid #e5e7eb',
}
