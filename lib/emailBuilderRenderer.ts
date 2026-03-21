/**
 * Server-safe email builder renderer.
 * Mirrors the block-rendering logic from components/EmailBuilder.tsx
 * but contains NO client-only code so it can be used in API routes.
 *
 * Usage:
 *   import { renderEmailHtml, type EmailBlock } from '@/lib/emailBuilderRenderer'
 *   const html = renderEmailHtml(blocks)      // produces HTML with {{variable}} placeholders
 *   const final = substituteVariables(html, { firstName: 'Jane', email: 'jane@example.com' })
 */

export type EmailBlockType =
  | 'logo'
  | 'hero'
  | 'text'
  | 'image'
  | 'button'
  | 'columns'
  | 'social'
  | 'footer'
  | 'spacer'
  | 'divider'

export interface EmailBlock {
  id?: string
  type: EmailBlockType
  content: Record<string, any>
}

const BRAND = {
  primary: '#b46e14',
  gold:    '#fbbf24',
  dark:    '#1a1a1a',
  text:    '#374151',
  muted:   '#6b7280',
  bg:      '#f6f9fc',
  white:   '#ffffff',
  border:  '#e5e7eb',
  address:    '1701 Goodson Loop Unit 80, Pinehurst, TX 77362',
  phone:      '832-713-9944',
  email:      'sales@studio37.cc',
  website:    'https://www.studio37.cc',
  instagram:  'https://www.instagram.com/studio37photography',
  facebook:   'https://www.facebook.com/studio37photography',
  bookingUrl: 'https://www.studio37.cc/book-consultation',
  logoLight:  'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077115/My%20Brand/IMG_2115_mtuowt.png',
  logoDark:   'https://res.cloudinary.com/dmjxho2rl/image/upload/v1762887036/IMG_2115_mtuowt_wgubjf.png',
}

const FONT = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'

function renderBlock(block: EmailBlock): string {
  switch (block.type) {
    case 'logo': {
      const tagline = block.content.tagline || ''
      const logoUrl = block.content.logoUrl || BRAND.logoDark
      return `
<div style="background:#ffffff;padding:22px 32px 18px;text-align:center;border-bottom:1px solid ${BRAND.border};">
  <img src="${logoUrl}" alt="Studio37" style="display:block;margin:0 auto;max-width:220px;width:100%;height:auto;" />
  ${tagline ? `<p style="color:${BRAND.muted};font-family:${FONT};font-size:12px;letter-spacing:1.5px;text-transform:uppercase;margin:6px 0 0 0;">${tagline}</p>` : ''}
</div>`
    }

    case 'hero': {
      const bg  = block.content.backgroundColor || BRAND.dark
      const fg  = block.content.textColor || '#ffffff'
      const title    = block.content.title || ''
      const subtitle = block.content.subtitle || ''
      const btnText  = block.content.buttonText  || ''
      const btnUrl   = block.content.buttonUrl   || BRAND.bookingUrl
      const btnColor = block.content.buttonColor || BRAND.primary
      const imgUrl   = block.content.imageUrl    || ''
      return `
<div style="background-color:${bg};padding:42px 32px;text-align:center;">
  ${imgUrl ? `<img src="${imgUrl}" alt="Hero" style="max-width:100%;height:auto;margin-bottom:24px;border-radius:8px;"/>` : ''}
  <h1 style="margin:0 0 12px 0;color:${fg};font-family:${FONT};font-size:30px;font-weight:800;line-height:1.25;">${title}</h1>
  ${subtitle ? `<p style="margin:0 0 24px 0;color:${fg};font-family:${FONT};font-size:18px;line-height:1.45;">${subtitle}</p>` : ''}
  ${btnText ? `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto;">
    <tr>
      <td bgcolor="${btnColor}" style="border-radius:6px;">
        <a href="${btnUrl}" style="display:inline-block;padding:14px 28px;background-color:${btnColor};border:1px solid ${btnColor};color:#ffffff !important;text-decoration:none !important;border-radius:6px;font-family:${FONT};font-size:16px;font-weight:700;line-height:1;mso-padding-alt:0;">
          <span style="color:#ffffff !important;text-decoration:none !important;">${btnText}</span>
        </a>
      </td>
    </tr>
  </table>` : ''}
</div>`
    }

    case 'text': {
      const paragraphs = (block.content.text || '')
        .split('\n\n')
        .map((p: string) => `<p style="margin:0 0 18px 0;color:#1f2937;font-family:${FONT};font-size:16px;line-height:1.65;">${p.replace(/\n/g, '<br/>')}</p>`)
        .join('')
      return `<div style="padding:28px 40px 18px;background:#ffffff;">${paragraphs}</div>`
    }

    case 'image': {
      const url     = block.content.url     || ''
      const alt     = block.content.alt     || 'Image'
      const align   = block.content.align   || 'center'
      const caption = block.content.caption || ''
      return `
<div style="padding:16px 40px;text-align:${align};">
  <img src="${url}" alt="${alt}" style="max-width:100%;height:auto;border-radius:8px;"/>
  ${caption ? `<p style="margin:8px 0 0 0;color:${BRAND.muted};font-family:${FONT};font-size:13px;text-align:center;font-style:italic;">${caption}</p>` : ''}
</div>`
    }

    case 'button': {
      const text  = block.content.text  || 'Click Here'
      const url   = block.content.url   || BRAND.bookingUrl
      const bg    = block.content.backgroundColor || BRAND.primary
      const fg    = block.content.textColor        || '#ffffff'
      const align = block.content.align            || 'center'
      return `
<div style="padding:16px 40px;text-align:${align};">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="${align === 'left' ? 'left' : align === 'right' ? 'right' : 'center'}" style="${align === 'center' ? 'margin:0 auto;' : ''}">
    <tr>
      <td bgcolor="${bg}" style="border-radius:6px;">
        <a href="${url}" style="display:inline-block;padding:14px 28px;background-color:${bg};border:1px solid ${bg};color:${fg} !important;text-decoration:none !important;border-radius:6px;font-family:${FONT};font-size:16px;font-weight:700;line-height:1;mso-padding-alt:0;">
          <span style="color:${fg} !important;text-decoration:none !important;">${text}</span>
        </a>
      </td>
    </tr>
  </table>
</div>`
    }

    case 'columns': {
      const c1t = block.content.col1Title || ''
      const c1  = block.content.col1Text  || ''
      const c2t = block.content.col2Title || ''
      const c2  = block.content.col2Text  || ''
      return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
  <tr>
    <td width="50%" valign="top" style="padding:16px 20px 16px 40px;">
      ${c1t ? `<h3 style="margin:0 0 8px 0;color:${BRAND.text};font-family:${FONT};font-size:16px;font-weight:700;">${c1t}</h3>` : ''}
      <p style="margin:0;color:${BRAND.text};font-family:${FONT};font-size:15px;line-height:24px;">${c1}</p>
    </td>
    <td width="50%" valign="top" style="padding:16px 40px 16px 20px;">
      ${c2t ? `<h3 style="margin:0 0 8px 0;color:${BRAND.text};font-family:${FONT};font-size:16px;font-weight:700;">${c2t}</h3>` : ''}
      <p style="margin:0;color:${BRAND.text};font-family:${FONT};font-size:15px;line-height:24px;">${c2}</p>
    </td>
  </tr>
</table>`
    }

    case 'social':
      return `
<div style="padding:24px 40px;text-align:center;background-color:#f9fafb;">
  <p style="margin:0 0 16px 0;color:${BRAND.muted};font-family:${FONT};font-size:13px;text-transform:uppercase;letter-spacing:2px;">Follow Us</p>
  <a href="${BRAND.instagram}" style="display:inline-block;margin:0 8px;padding:10px 20px;background-color:#e1306c;color:#ffffff;text-decoration:none;border-radius:6px;font-family:${FONT};font-size:13px;font-weight:600;">Instagram</a>
  <a href="${BRAND.facebook}"  style="display:inline-block;margin:0 8px;padding:10px 20px;background-color:#1877f2;color:#ffffff;text-decoration:none;border-radius:6px;font-family:${FONT};font-size:13px;font-weight:600;">Facebook</a>
  <a href="https://www.tiktok.com/@studio37photography" style="display:inline-block;margin:0 8px;padding:10px 20px;background-color:#010101;color:#ffffff;text-decoration:none;border-radius:6px;font-family:${FONT};font-size:13px;font-weight:600;">TikTok</a>
</div>`

    case 'footer':
      return `
<div style="padding:24px 40px;text-align:center;border-top:1px solid ${BRAND.border};">
  <p style="margin:0 0 6px 0;color:${BRAND.muted};font-family:${FONT};font-size:13px;"><strong>Studio37 Photography</strong></p>
  <p style="margin:0 0 6px 0;color:${BRAND.muted};font-family:${FONT};font-size:12px;">${BRAND.address}</p>
  <p style="margin:0 0 12px 0;color:${BRAND.muted};font-family:${FONT};font-size:12px;">
    <a href="tel:${BRAND.phone}" style="color:${BRAND.primary};text-decoration:none;">${BRAND.phone}</a> &nbsp;|&nbsp;
    <a href="mailto:${BRAND.email}" style="color:${BRAND.primary};text-decoration:none;">${BRAND.email}</a> &nbsp;|&nbsp;
    <a href="${BRAND.website}" style="color:${BRAND.primary};text-decoration:none;">studio37.cc</a>
  </p>
  <p style="margin:0;color:#9ca3af;font-family:${FONT};font-size:11px;">
    © ${new Date().getFullYear()} Studio37 Photography. All rights reserved.<br/>
    <a href="${BRAND.website}/unsubscribe?email={{email}}" style="color:#9ca3af;text-decoration:underline;">Unsubscribe</a>
  </p>
</div>`

    case 'spacer':
      return `<div style="height:${block.content.height || 24}px;"></div>`

    case 'divider':
      return `<div style="padding:8px 40px;"><hr style="border:0;border-top:1px solid ${BRAND.border};"/></div>`

    default:
      return ''
  }
}

/**
 * Render an array of EmailBlock objects to a full HTML email string.
 * {{variable}} placeholders in block content are preserved so callers
 * can substitute them with substituteVariables() afterwards.
 */
export function renderEmailHtml(blocks: EmailBlock[]): string {
  const bodyContent = blocks.map(renderBlock).join('\n')
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title>Studio37</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.bg};">
<div style="max-width:600px;margin:20px auto;background-color:${BRAND.white};border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
${bodyContent}
</div>
</body>
</html>`
}

/**
 * Substitute {{variable}} placeholders in an HTML string.
 * Any unresolved placeholders are removed (replaced with empty string)
 * so they never appear literally in outbound emails.
 */
export function substituteVariables(
  html: string,
  variables: Record<string, any>,
  defaults: Record<string, string> = {}
): string {
  let result = html

  // 1. Replace known variables
  const merged = { ...defaults, ...variables }
  for (const [key, value] of Object.entries(merged)) {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g')
    result = result.replace(regex, String(value ?? ''))
  }

  // 2. Strip any remaining unresolved {{...}} so they never reach the inbox
  result = result.replace(/\{\{[^}]+\}\}/g, '')

  return result
}

/**
 * Convenience: parse blocks_json from DB (handles string or already-parsed array)
 */
export function parseBlocksJson(blocksJson: unknown): EmailBlock[] | null {
  if (!blocksJson) return null

  if (Array.isArray(blocksJson)) {
    return blocksJson.length > 0 ? (blocksJson as EmailBlock[]) : null
  }

  if (typeof blocksJson === 'string') {
    try {
      const parsed = JSON.parse(blocksJson)
      return Array.isArray(parsed) && parsed.length > 0 ? (parsed as EmailBlock[]) : null
    } catch {
      return null
    }
  }

  return null
}
