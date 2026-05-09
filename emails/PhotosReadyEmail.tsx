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

interface PhotosReadyEmailProps {
  firstName?: string
  sessionType?: string
  galleryLink?: string
  expiryDays?: string
}

export default function PhotosReadyEmail({
  firstName = '',
  sessionType = '',
  galleryLink = '',
  expiryDays = '30',
}: PhotosReadyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Photos Are Ready! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img src={LOGO} alt="Studio37 Photography" style={logo} />
          </Section>

          {/* Header */}
          <div style={header}>
            <Heading style={h1}>Your Photos Are Ready! 🎉</Heading>
            <Text style={headerSub}>Your gallery is live and waiting for you</Text>
          </div>

          <Text style={text}>Hi {firstName},</Text>
          <Text style={text}>
            Your photos from your {sessionType} session are now ready to view!
          </Text>

          <Button href={galleryLink} style={button}>
            View Your Gallery 🎉
          </Button>

          <Text style={text}>
            Your gallery will be available for {expiryDays} days. Don't forget to download your favorites!
          </Text>

          <Hr style={hr} />

          <Text style={text}>
            Love your photos? We'd appreciate a review!
          </Text>

          <div style={reviewButtons}>
            <Link href="https://www.google.com/search?q=studio37+photography" style={reviewLink}>
              Google Review
            </Link>
            <Link href="https://www.facebook.com/studio37photography" style={reviewLink}>
              Facebook Review
            </Link>
          </div>

          <Hr style={hr} />

          <Text style={footer}>
            Studio37 Photography<br />
            1701 Goodson Loop Unit 80, Pinehurst, TX 77362<br />
            <Link href="https://www.studio37.cc">www.studio37.cc</Link> | 
            <Link href="mailto:sales@studio37.cc"> sales@studio37.cc</Link>
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

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '16px 0',
}

const button = {
  backgroundColor: '#b46e14',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '280px',
  padding: '16px 24px',
  margin: '32px auto',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 40px',
}

const reviewButtons = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  padding: '0 40px',
  margin: '24px 0',
}

const reviewLink = {
  backgroundColor: '#f3f4f6',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  color: '#374151',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '10px 20px',
  display: 'inline-block',
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
