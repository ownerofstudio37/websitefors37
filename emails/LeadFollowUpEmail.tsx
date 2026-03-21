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

interface LeadFollowUpEmailProps {
  firstName?: string
  followUpDay?: 1 | 3 | 7
  serviceInterest?: string
  bookingUrl?: string
}

const BRAND_GOLD = '#fbbf24'
const BRAND_DARK = '#1a1a1a'
const BRAND_PRIMARY = '#b46e14'

function getConfig(day: 1 | 3 | 7, service: string) {
  const svc = service || 'photography'
  switch (day) {
    case 1:
      return {
        preview: `Thanks for reaching out to Studio37! Here's what comes next.`,
        headerGradient: `linear-gradient(135deg, ${BRAND_DARK} 0%, #2d2d2d 100%)`,
        headline: 'Thank You for Reaching Out! 📸',
        subhead: `We received your message and are excited to connect.`,
        body: `We'd love to learn more about your vision for your ${svc} project. Whether you're just exploring or ready to book, we're here to help make your experience exceptional.`,
        ctaText: '📅 Schedule a Free Consultation',
        secondaryCta: 'View Our Portfolio',
        secondaryUrl: 'https://gallery.studio37.cc',
        urgency: '',
      }
    case 3:
      return {
        preview: `Still thinking it over? We'd love to help with your ${svc} project.`,
        headerGradient: `linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)`,
        headline: 'Still Thinking It Over?',
        subhead: `We're here whenever you're ready — no pressure.`,
        body: `We noticed you reached out a few days ago about your ${svc} session. We wanted to make sure all your questions were answered and nothing slipped through the cracks.\n\nAt Studio37, we pride ourselves on open communication and a stress-free booking experience. Have questions about pricing, availability, or what a session looks like? We're happy to chat!`,
        ctaText: 'Let\'s Connect →',
        secondaryCta: 'See Our Packages',
        secondaryUrl: 'https://www.studio37.cc/packages',
        urgency: '',
      }
    case 7:
      return {
        preview: `One last note — we'd love to work with you before our calendar fills up.`,
        headerGradient: `linear-gradient(135deg, ${BRAND_PRIMARY} 0%, #8b4a0a 100%)`,
        headline: '⏰ A Few Dates Still Available',
        subhead: `Our calendar is filling up — we wanted to check in one more time.`,
        body: `Hi there! This will be our last check-in — we know your inbox gets busy. We genuinely would love to work with you on your ${svc} project, and we have a few openings left this season.\n\nIf the timing isn't right, that's completely okay. But if you're ready to move forward, we'd love to hold your spot before the calendar closes out.`,
        ctaText: '🔒 Secure My Session',
        secondaryCta: '',
        secondaryUrl: '',
        urgency: '⚡ Limited availability remaining for this season',
      }
  }
}

export default function LeadFollowUpEmail({
  firstName = 'there',
  followUpDay = 1,
  serviceInterest = 'photography',
  bookingUrl = 'https://www.studio37.cc/book-a-session',
  email = '',
}: LeadFollowUpEmailProps & { email?: string }) {
  const cfg = getConfig(followUpDay, serviceInterest)

  return (
    <Html>
      <Head />
      <Preview>{cfg.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo header */}
          <div style={logoHeader}>
            <span style={logoS37}><span style={logoGold}>STUDIO</span>37</span>
            <p style={logoSub}>Photography</p>
          </div>

          {/* Hero */}
          <div style={{ background: cfg.headerGradient, padding: '40px 40px 32px', textAlign: 'center' }}>
            <Heading style={heroHeadline}>{cfg.headline}</Heading>
            <Text style={heroSub}>{cfg.subhead}</Text>
          </div>

          {/* Body text */}
          <Section style={bodySection}>
            <Text style={greeting}>Hi {firstName},</Text>
            {cfg.body.split('\n\n').map((para, i) => (
              <Text key={i} style={bodyText}>{para}</Text>
            ))}
          </Section>

          {/* Urgency badge */}
          {cfg.urgency && (
            <div style={urgencyBadge}>
              <Text style={urgencyText}>{cfg.urgency}</Text>
            </div>
          )}

          {/* Primary CTA */}
          <Section style={ctaSection}>
            <Button href={bookingUrl} style={primaryButton}>
              {cfg.ctaText}
            </Button>
          </Section>

          {/* Day 3 value props */}
          {followUpDay === 3 && (
            <Section style={valuePropSection}>
              <Row>
                <Column style={valueCol}>
                  <Text style={valueIcon}>💍</Text>
                  <Text style={valueTitle}>Wedding Photography</Text>
                  <Text style={valueDesc}>Full &amp; half-day coverage. Documentary + editorial styles.</Text>
                </Column>
                <Column style={valueCol}>
                  <Text style={valueIcon}>👨‍👩‍👧</Text>
                  <Text style={valueTitle}>Family &amp; Portraits</Text>
                  <Text style={valueDesc}>Maternity, newborn, senior, and professional headshots.</Text>
                </Column>
              </Row>
            </Section>
          )}

          {/* Secondary CTA */}
          {cfg.secondaryCta && (
            <Section style={secondaryCtaSection}>
              <Button href={cfg.secondaryUrl} style={secondaryButton}>
                {cfg.secondaryCta}
              </Button>
            </Section>
          )}

          <Hr style={hr} />

          {/* Contact line */}
          <Section style={contactSection}>
            <Text style={contactText}>
              Questions? Reply to this email or call us at{' '}
              <Link href="tel:8327139944" style={link}>832-713-9944</Link>
            </Text>
            <Text style={signoff}>
              With care,<br />
              <strong>The Studio37 Team</strong>
            </Text>
          </Section>

          {/* Social */}
          <div style={socialSection}>
            <Text style={socialLabel}>FOLLOW US</Text>
            <div>
              <Link href="https://www.instagram.com/studio37photography" style={socialLink}>Instagram</Link>
              {'  ·  '}
              <Link href="https://www.facebook.com/studio37photography" style={socialLink}>Facebook</Link>
              {'  ·  '}
              <Link href="https://www.tiktok.com/@studio37photography" style={socialLink}>TikTok</Link>
            </div>
          </div>

          {/* Footer */}
          <Text style={footer}>
            Studio37 Photography · 1701 Goodson Loop Unit 80, Pinehurst, TX 77362<br />
            <Link href="https://www.studio37.cc" style={footerLink}>www.studio37.cc</Link>
            {' | '}
            <Link href="mailto:sales@studio37.cc" style={footerLink}>sales@studio37.cc</Link>
            <br />
            <Link href={`https://www.studio37.cc/unsubscribe?email=${encodeURIComponent(email)}`} style={unsubLink}>Unsubscribe</Link>
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
  margin: '20px auto',
  maxWidth: '600px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
}

const logoHeader = {
  backgroundColor: BRAND_DARK,
  padding: '20px 40px',
  textAlign: 'center' as const,
}

const logoGold = { color: BRAND_GOLD }

const logoS37 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '800' as const,
  letterSpacing: '3px',
}

const logoSub = {
  color: '#9ca3af',
  fontSize: '11px',
  letterSpacing: '4px',
  textTransform: 'uppercase' as const,
  margin: '4px 0 0 0',
}

const heroHeadline = {
  color: '#ffffff',
  fontSize: '26px',
  fontWeight: '700' as const,
  margin: '0 0 10px 0',
  lineHeight: '1.3',
}

const heroSub = {
  color: 'rgba(255,255,255,0.80)',
  fontSize: '15px',
  margin: '0',
  lineHeight: '1.5',
}

const bodySection = {
  padding: '28px 40px 12px',
}

const greeting = {
  color: '#1f2937',
  fontSize: '17px',
  fontWeight: '600' as const,
  margin: '0 0 12px 0',
}

const bodyText = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '26px',
  margin: '0 0 16px 0',
}

const urgencyBadge = {
  backgroundColor: '#fef3c7',
  borderLeft: `4px solid ${BRAND_GOLD}`,
  margin: '0 40px 16px',
  padding: '12px 16px',
  borderRadius: '0 8px 8px 0',
}

const urgencyText = {
  color: '#92400e',
  fontSize: '14px',
  fontWeight: '600' as const,
  margin: '0',
}

const ctaSection = {
  padding: '8px 40px 20px',
  textAlign: 'center' as const,
}

const primaryButton = {
  backgroundColor: BRAND_PRIMARY,
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '700' as const,
  padding: '14px 36px',
  textDecoration: 'none',
  display: 'inline-block',
}

const valuePropSection = {
  margin: '8px 40px 20px',
  backgroundColor: '#f9fafb',
  borderRadius: '10px',
  padding: '20px',
}

const valueCol = {
  width: '50%',
  verticalAlign: 'top' as const,
  padding: '0 10px',
  textAlign: 'center' as const,
}

const valueIcon = { fontSize: '28px', margin: '0 0 6px 0' }
const valueTitle = { color: '#1f2937', fontSize: '14px', fontWeight: '700' as const, margin: '0 0 4px 0' }
const valueDesc = { color: '#6b7280', fontSize: '13px', lineHeight: '20px', margin: '0' }

const secondaryCtaSection = {
  padding: '0 40px 20px',
  textAlign: 'center' as const,
}

const secondaryButton = {
  backgroundColor: '#374151',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600' as const,
  padding: '11px 28px',
  textDecoration: 'none',
  display: 'inline-block',
}

const hr = { borderColor: '#e5e7eb', margin: '0 40px' }

const contactSection = {
  padding: '20px 40px',
}

const contactText = {
  color: '#374151',
  fontSize: '14px',
  margin: '0 0 12px 0',
}

const link = { color: BRAND_PRIMARY }

const signoff = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
}

const socialSection = {
  backgroundColor: '#f9fafb',
  padding: '20px 40px',
  textAlign: 'center' as const,
}

const socialLabel = {
  color: '#9ca3af',
  fontSize: '10px',
  letterSpacing: '3px',
  textTransform: 'uppercase' as const,
  margin: '0 0 10px 0',
}

const socialLink = {
  color: BRAND_PRIMARY,
  textDecoration: 'none',
  fontSize: '13px',
  fontWeight: '600' as const,
}

const footer = {
  color: '#9ca3af',
  fontSize: '11px',
  textAlign: 'center' as const,
  lineHeight: '20px',
  padding: '16px 40px 24px',
  margin: '0',
}

const footerLink = { color: '#9ca3af', textDecoration: 'underline' }
const unsubLink = { color: '#d1d5db', textDecoration: 'underline', fontSize: '11px' }
