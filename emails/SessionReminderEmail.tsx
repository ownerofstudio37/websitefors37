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
  Hr,
} from '@react-email/components'

const LOGO = 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1762887052/IMG_2115_mtuowt_tayodz.png'

interface SessionReminderEmailProps {
  firstName?: string
  sessionType?: string
  sessionDate?: string
  sessionTime?: string
  location?: string
}

export default function SessionReminderEmail({
  firstName = '',
  sessionType = 'photo',
  sessionDate = '',
  sessionTime = '',
  location = 'Studio37',
}: SessionReminderEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Photo Session is Coming Up!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img src={LOGO} alt="Studio37 Photography" style={logo} />
          </Section>

          {/* Header */}
          <div style={header}>
            <Heading style={h1}>Session Reminder 📅</Heading>
            <Text style={headerSub}>Your upcoming session is just around the corner</Text>
          </div>

          <Text style={text}>Hi {firstName},</Text>
          <Text style={text}>
            This is a friendly reminder that your {sessionType} session is scheduled for:
          </Text>

          <Section style={detailsBox}>
            <Text style={detailItem}>
              <strong>Date:</strong> {sessionDate}
            </Text>
            <Text style={detailItem}>
              <strong>Time:</strong> {sessionTime}
            </Text>
            <Text style={detailItem}>
              <strong>Location:</strong> {location}
            </Text>
          </Section>

          <Heading as="h2" style={h2}>What to bring:</Heading>
          <ul style={list}>
            <li>Outfit changes (if planned)</li>
            <li>Props or personal items</li>
            <li>Your excitement! 📸</li>
          </ul>

          <Text style={text}>
            See you soon!
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Studio37 Photography<br />
            1701 Goodson Loop Unit 80, Pinehurst, TX 77362<br />
            <Link href="https://www.studio37.cc">www.studio37.cc</Link> | 
            <Link href="tel:8327139944"> 832-713-9944</Link>
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
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: '600',
  margin: '20px 0 10px',
  padding: '0 40px',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '16px 0',
}

const detailsBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #b46e14',
  borderRadius: '12px',
  padding: '22px',
  margin: '28px auto',
  maxWidth: '460px',
  width: '78%',
  boxShadow: '0 4px 12px rgba(180, 110, 20, 0.08)',
}

const detailItem = {
  color: '#1f2937',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0',
}

const list = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  marginLeft: '20px',
  padding: '0 40px',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 40px',
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
