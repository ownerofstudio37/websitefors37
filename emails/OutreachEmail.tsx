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

interface OutreachEmailProps {
  firstName?: string
  customMessage?: string
  offerText?: string
  ctaText?: string
  ctaUrl?: string
  campaignName?: string
}

const BRAND_GOLD = '#fbbf24'
const BRAND_DARK = '#1a1a1a'
const BRAND_PRIMARY = '#b46e14'

export default function OutreachEmail({
  firstName = 'there',
  customMessage = '',
  offerText = '',
  ctaText = 'Book a Free Consultation',
  ctaUrl = 'https://www.studio37.cc/book-a-session',
  campaignName = '',
  email = '',
}: OutreachEmailProps & { email?: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your story deserves to be told beautifully — Studio37 Photography</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <div style={logoHeader}>
            <span style={logoText}><span style={logoGold}>STUDIO</span>37</span>
            <p style={logoSub}>Photography</p>
          </div>

          {/* Hero */}
          <div style={hero}>
            <Heading style={heroHeadline}>Your Story Deserves to Be Told Beautifully</Heading>
            <Text style={heroSub}>Award-winning photography in Houston &amp; beyond</Text>
            <Button href="https://gallery.studio37.cc" style={heroButton}>
              View Our Portfolio →
            </Button>
          </div>

          {/* Body */}
          <Section style={bodySection}>
            <Text style={greeting}>Hi {firstName},</Text>

            {customMessage ? (
              customMessage.split('\n\n').map((para, i) => (
                <Text key={i} style={bodyText}>{para}</Text>
              ))
            ) : (
              <>
                <Text style={bodyText}>
                  At Studio37, we believe every moment has a story worth preserving — from the quiet intimacy of a newborn's first days to the grandeur of your wedding celebration.
                </Text>
                <Text style={bodyText}>
                  We specialize in capturing authentic, emotion-driven images that you'll treasure for a lifetime. Our clients often tell us their photos are the greatest investment they've ever made.
                </Text>
              </>
            )}
          </Section>

          {/* Services grid */}
          <Section style={servicesSection}>
            <Heading as="h2" style={servicesHeading}>What We Offer</Heading>
            <Row>
              <Column style={serviceCol}>
                <Text style={serviceIcon}>💍</Text>
                <Text style={serviceTitle}>Weddings</Text>
                <Text style={serviceDesc}>Full &amp; half-day coverage. Editorial + documentary storytelling.</Text>
              </Column>
              <Column style={serviceCol}>
                <Text style={serviceIcon}>👨‍👩‍👧</Text>
                <Text style={serviceTitle}>Portraits</Text>
                <Text style={serviceDesc}>Family, maternity, newborn, senior, and professional headshots.</Text>
              </Column>
            </Row>
            <Row style={{ marginTop: '16px' }}>
              <Column style={serviceCol}>
                <Text style={serviceIcon}>🎉</Text>
                <Text style={serviceTitle}>Events</Text>
                <Text style={serviceDesc}>Corporate events, milestones, and brand activations.</Text>
              </Column>
              <Column style={serviceCol}>
                <Text style={serviceIcon}>📸</Text>
                <Text style={serviceTitle}>Commercial</Text>
                <Text style={serviceDesc}>Brand photography, product shots, and editorial content.</Text>
              </Column>
            </Row>
          </Section>

          {/* Offer block (if present) */}
          {offerText && (
            <div style={offerBadge}>
              <Text style={offerInner}>✨ {offerText}</Text>
            </div>
          )}

          {/* Primary CTA */}
          <Section style={ctaSection}>
            <Button href={ctaUrl} style={primaryButton}>
              {ctaText}
            </Button>
            <Text style={ctaSub}>No obligation. Just a friendly conversation about your vision.</Text>
          </Section>

          {/* Social proof */}
          <div style={proofSection}>
            <Text style={proofQuote}>
              "Studio37 exceeded our expectations! The photos are stunning and the team was so professional. Our wedding album is something we'll treasure forever."
            </Text>
            <Text style={proofAuthor}>— Sarah M., Wedding Photography Client</Text>
          </div>

          <Hr style={hr} />

          {/* Contact */}
          <Section style={contactSection}>
            <Text style={contactText}>
              Ready to talk? Call us at{' '}
              <Link href="tel:8327139944" style={inlineLink}>832-713-9944</Link>
              {' '}or reply to this email. We'd love to hear from you.
            </Text>
            <Text style={signoff}>
              Warmly,<br />
              <strong>The Studio37 Team</strong>
            </Text>
          </Section>

          {/* Social */}
          <div style={socialSection}>
            <Text style={socialLabel}>FOLLOW OUR WORK</Text>
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

const logoText = {
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

const hero = {
  background: `linear-gradient(135deg, ${BRAND_DARK} 0%, #2d2d2d 100%)`,
  padding: '48px 40px 40px',
  textAlign: 'center' as const,
}

const heroHeadline = {
  color: '#ffffff',
  fontSize: '26px',
  fontWeight: '700' as const,
  margin: '0 0 12px 0',
  lineHeight: '1.35',
}

const heroSub = {
  color: BRAND_GOLD,
  fontSize: '13px',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  margin: '0 0 28px 0',
}

const heroButton = {
  backgroundColor: BRAND_GOLD,
  borderRadius: '8px',
  color: BRAND_DARK,
  fontSize: '15px',
  fontWeight: '700' as const,
  padding: '13px 30px',
  textDecoration: 'none',
  display: 'inline-block',
}

const bodySection = { padding: '28px 40px 12px' }

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

const servicesSection = {
  margin: '0 40px 24px',
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  padding: '24px 20px',
}

const servicesHeading = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: '700' as const,
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
}

const serviceCol = {
  width: '50%',
  textAlign: 'center' as const,
  verticalAlign: 'top' as const,
  padding: '0 12px',
}

const serviceIcon = { fontSize: '26px', margin: '0 0 6px 0' }
const serviceTitle = { color: '#1f2937', fontSize: '14px', fontWeight: '700' as const, margin: '0 0 4px 0' }
const serviceDesc = { color: '#6b7280', fontSize: '12px', lineHeight: '18px', margin: '0' }

const offerBadge = {
  backgroundColor: '#fef9ec',
  border: `2px solid ${BRAND_GOLD}`,
  borderRadius: '10px',
  margin: '0 40px 24px',
  padding: '16px 20px',
  textAlign: 'center' as const,
}

const offerInner = {
  color: '#92400e',
  fontSize: '15px',
  fontWeight: '700' as const,
  margin: '0',
}

const ctaSection = { padding: '0 40px 20px', textAlign: 'center' as const }

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

const ctaSub = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '10px 0 0 0',
}

const proofSection = {
  backgroundColor: '#1a1a1a',
  padding: '28px 40px',
  textAlign: 'center' as const,
}

const proofQuote = {
  color: '#e5e7eb',
  fontSize: '15px',
  fontStyle: 'italic',
  lineHeight: '26px',
  margin: '0 0 12px 0',
}

const proofAuthor = {
  color: BRAND_GOLD,
  fontSize: '12px',
  fontWeight: '600' as const,
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  margin: '0',
}

const hr = { borderColor: '#e5e7eb', margin: '0 40px' }

const contactSection = { padding: '20px 40px' }

const contactText = {
  color: '#374151',
  fontSize: '14px',
  margin: '0 0 12px 0',
}

const inlineLink = { color: BRAND_PRIMARY }

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
