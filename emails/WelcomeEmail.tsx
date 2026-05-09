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

interface WelcomeEmailProps {
  firstName?: string
  serviceType?: string
}

export default function WelcomeEmail({
  firstName = 'there',
  serviceType = 'photography',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Studio37 Photography!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img src={LOGO} alt="Studio37 Photography" style={logo} />
          </Section>

          {/* Header */}
          <div style={header}>
            <Heading style={h1}>Welcome, {firstName}! 🎉</Heading>
            <Text style={headerSub}>We're excited to work with you</Text>
          </div>

          <Text style={text}>
            Thank you for your interest in Studio37 Photography. We're excited to work with you on your {serviceType} project!
          </Text>

          <Section style={section}>
            <Heading as="h2" style={h2}>Next steps:</Heading>
            <ul style={list}>
              <li>Review your consultation notes</li>
              <li>Check available dates</li>
              <li>View our portfolio</li>
            </ul>
          </Section>

          <Button
            href="https://www.studio37.cc/book-a-session"
            style={button}
          >
            Book Your Session
          </Button>

          <Text style={text}>
            Best regards,<br />
            Studio37 Team
          </Text>

          <Text style={footer}>
            Studio37 Photography<br />
            1701 Goodson Loop Unit 80<br />
            Pinehurst, TX 77362<br />
            <Link href="https://www.studio37.cc">www.studio37.cc</Link>
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
  fontSize: '24px',
  fontWeight: '600',
  margin: '20px 0 10px',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '16px 0',
}

const section = {
  padding: '0 40px',
}

const list = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  marginLeft: '20px',
}

const button = {
  backgroundColor: '#b46e14',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '200px',
  padding: '14px 20px',
  margin: '24px auto',
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
