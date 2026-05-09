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

interface PaymentReminderEmailProps {
  firstName?: string
  sessionType?: string
  sessionDate?: string
  amountDue?: string
  dueDate?: string
  invoiceNumber?: string
  paymentLink?: string
}

export default function PaymentReminderEmail({
  firstName = '',
  sessionType = 'Photography Session',
  sessionDate = '',
  amountDue = '0',
  dueDate = '',
  invoiceNumber = '',
  paymentLink = 'https://www.studio37.cc/contact',
}: PaymentReminderEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Payment reminder for your Studio37 session</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img src={LOGO} alt="Studio37 Photography" style={logo} />
          </Section>

          {/* Header */}
          <div style={header}>
            <Heading style={h1}>Payment Reminder</Heading>
            <Text style={headerSub}>Your session is coming up — let's get squared away!</Text>
          </div>

          <Text style={text}>Hi {firstName},</Text>

          <Text style={text}>
            We hope you're as excited as we are about your upcoming {sessionType}!
          </Text>

          <Text style={text}>
            This is a friendly reminder that your remaining balance is due before your session.
          </Text>

          <Section style={paymentBox}>
            <div style={amountRow}>
              <span style={amountLabel}>Amount Due:</span>
              <span style={amountValue}>${amountDue}</span>
            </div>
            
            {dueDate && (
              <div style={detailRow}>
                <span style={label}>Due Date:</span>
                <span style={value}>{dueDate}</span>
              </div>
            )}
            
            {sessionDate && (
              <div style={detailRow}>
                <span style={label}>Session Date:</span>
                <span style={value}>{sessionDate}</span>
              </div>
            )}
            
            {invoiceNumber && (
              <div style={detailRow}>
                <span style={label}>Invoice:</span>
                <span style={value}>#{invoiceNumber}</span>
              </div>
            )}
          </Section>

          <div style={buttonContainer}>
            <Button href={paymentLink} style={button}>
              Make Payment
            </Button>
          </div>

          <Section style={section}>
            <Heading as="h3" style={h3}>Payment Methods</Heading>
            <ul style={list}>
              <li>Credit/Debit Card (online)</li>
              <li>PayPal or Venmo</li>
              <li>Cash or Check (in person)</li>
              <li>Bank transfer (ACH)</li>
            </ul>
          </Section>

          <Hr style={hr} />

          <Text style={callout}>
            <strong>Questions about your invoice?</strong><br />
            Reply to this email or call us at <Link href="tel:8327139944">832-713-9944</Link>
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

const paymentBox = {
  backgroundColor: '#fffbeb',
  border: '2px solid #f59e0b',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 40px',
}

const amountRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '16px',
  marginBottom: '16px',
  borderBottom: '1px solid #fbbf24',
}

const amountLabel = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: '600',
}

const amountValue = {
  color: '#b46e14',
  fontSize: '32px',
  fontWeight: '700',
}

const detailRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px',
  fontSize: '15px',
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
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
}

const section = {
  padding: '0 40px',
  margin: '24px 0',
}

const list = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '24px',
  marginLeft: '20px',
  paddingLeft: '0',
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
  fontSize: '14px',
  color: '#92400e',
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
