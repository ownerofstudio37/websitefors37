'use client'

import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  GripVertical,
  Trash2,
  Type,
  Image as ImageIcon,
  Square,
  Layout,
  Settings,
  Share2,
  MapPin,
  Star,
  ChevronDown,
  Sparkles,
} from 'lucide-react'

// --- Brand Constants ---

const BRAND = {
  primary: '#b46e14',
  gold: '#fbbf24',
  darkHeader: '#1a1a1a',
  text: '#374151',
  muted: '#6b7280',
  bg: '#f6f9fc',
  white: '#ffffff',
  border: '#e5e7eb',
  address: '1701 Goodson Loop Unit 80, Pinehurst, TX 77362',
  phone: '832-713-9944',
  email: 'sales@studio37.cc',
  website: 'https://www.studio37.cc',
  instagram: 'https://www.instagram.com/studio37photography',
  facebook: 'https://www.facebook.com/studio37photography',
  bookingUrl: 'https://www.studio37.cc/book-a-session',
}

// --- Types ---

export type EmailBlockType = 
  | 'logo'
  | 'hero'
  | 'text'
  | 'image'
  | 'button'
  | 'spacer'
  | 'divider'
  | 'columns'
  | 'social'
  | 'footer'

export interface EmailBlock {
  id: string
  type: EmailBlockType
  content: Record<string, any>
}

// --- Block Definitions ---

const BLOCK_TYPES: { type: EmailBlockType; label: string; icon: any }[] = [
  { type: 'logo',    label: 'Logo Header',  icon: Star },
  { type: 'hero',    label: 'Hero Section', icon: Layout },
  { type: 'text',    label: 'Text Block',   icon: Type },
  { type: 'image',   label: 'Image',        icon: ImageIcon },
  { type: 'button',  label: 'Button',       icon: Square },
  { type: 'columns', label: 'Two Columns',  icon: Layout },
  { type: 'social',  label: 'Social Links', icon: Share2 },
  { type: 'footer',  label: 'Footer',       icon: MapPin },
  { type: 'spacer',  label: 'Spacer',       icon: ChevronDown },
  { type: 'divider', label: 'Divider',      icon: ChevronDown },
]

// --- Template Presets ---

export const EMAIL_TEMPLATE_PRESETS: Record<string, { label: string; description: string; blocks: Omit<EmailBlock, 'id'>[] }> = {
  'lead-follow-up-day1': {
    label: '📬 Follow-Up Day 1',
    description: 'Warm first follow-up after lead submits contact info',
    blocks: [
      { type: 'logo', content: { tagline: 'Studio37 Photography' } },
      { type: 'hero', content: { title: 'Thank You for Reaching Out! 📸', subtitle: 'We received your message and are excited to connect with you.', backgroundColor: '#1a1a1a', textColor: '#ffffff', buttonText: 'Book a Consultation', buttonUrl: BRAND.bookingUrl, buttonColor: BRAND.primary } },
      { type: 'text', content: { text: 'Hi {{firstName}},\n\nThank you for your interest in Studio37 Photography! We specialize in capturing life\'s most precious moments — from weddings and portraits to commercial shoots.\n\nWe\'d love to learn more about what you have in mind. Reply to this email or click below to schedule a quick chat.' } },
      { type: 'button', content: { text: '📅 Schedule a Free Consultation', url: BRAND.bookingUrl, backgroundColor: BRAND.primary, textColor: '#ffffff', align: 'center' } },
      { type: 'divider', content: {} },
      { type: 'text', content: { text: 'In the meantime, check out our latest work in the gallery!\nWe can\'t wait to hear your vision.' } },
      { type: 'button', content: { text: '🖼️ View Our Portfolio', url: 'https://www.studio37.cc/gallery', backgroundColor: '#374151', textColor: '#ffffff', align: 'center' } },
      { type: 'social', content: {} },
      { type: 'footer', content: {} },
    ],
  },
  'lead-follow-up-day3': {
    label: '📬 Follow-Up Day 3',
    description: 'Value-focused check-in on day 3',
    blocks: [
      { type: 'logo', content: { tagline: 'Studio37 Photography' } },
      { type: 'hero', content: { title: 'Still Thinking It Over?', subtitle: 'We\'re here whenever you\'re ready.', backgroundColor: '#2d2d2d', textColor: '#ffffff', buttonText: 'View Packages', buttonUrl: 'https://www.studio37.cc/packages', buttonColor: BRAND.gold } },
      { type: 'text', content: { text: 'Hi {{firstName}},\n\nJust checking in! We noticed you reached out a few days ago and wanted to make sure your questions got answered.\n\nWe offer:' } },
      { type: 'columns', content: { col1Title: '✨ Wedding Photography', col1Text: 'Full-day coverage with cinematic storytelling and stunning galleries.', col2Title: '📸 Portrait Sessions', col2Text: 'Professional portraits for families, individuals, and corporate headshots.' } },
      { type: 'divider', content: {} },
      { type: 'text', content: { text: 'We\'d love to chat about your vision. No pressure — just a friendly conversation!' } },
      { type: 'button', content: { text: 'Let\'s Connect', url: BRAND.bookingUrl, backgroundColor: BRAND.primary, textColor: '#ffffff', align: 'center' } },
      { type: 'social', content: {} },
      { type: 'footer', content: {} },
    ],
  },
  'lead-follow-up-day7': {
    label: '📬 Follow-Up Day 7',
    description: 'Last-touch follow-up with urgency/offer',
    blocks: [
      { type: 'logo', content: { tagline: 'Studio37 Photography' } },
      { type: 'hero', content: { title: '⏰ Last Chance to Claim Your Spot', subtitle: 'Our calendar is filling up — lock in your session now.', backgroundColor: BRAND.primary, textColor: '#ffffff', buttonText: 'Book My Session', buttonUrl: BRAND.bookingUrl, buttonColor: '#1a1a1a' } },
      { type: 'text', content: { text: 'Hi {{firstName}},\n\nThis is our final check-in! We wanted to reach out one last time because we\'d genuinely love to work with you.\n\nIf now isn\'t the right time, no worries at all — but if you\'re ready to move forward, we\'d love to save your date before our schedule fills up.' } },
      { type: 'button', content: { text: '📅 Secure Your Session Now', url: BRAND.bookingUrl, backgroundColor: BRAND.primary, textColor: '#ffffff', align: 'center' } },
      { type: 'text', content: { text: 'Questions? Hit reply or call us directly at ' + BRAND.phone + '. We\'re happy to chat!' } },
      { type: 'divider', content: {} },
      { type: 'social', content: {} },
      { type: 'footer', content: {} },
    ],
  },
  'outreach': {
    label: '📣 Marketing Outreach',
    description: 'Cold outreach / campaign email',
    blocks: [
      { type: 'logo', content: { tagline: 'Studio37 Photography' } },
      { type: 'hero', content: { title: 'Your Story Deserves to Be Told Beautifully', subtitle: 'Award-winning photography in Houston & beyond.', backgroundColor: '#1a1a1a', textColor: '#ffffff', buttonText: 'See Our Work', buttonUrl: 'https://www.studio37.cc/gallery', buttonColor: BRAND.gold } },
      { type: 'text', content: { text: 'Hi {{firstName}},\n\nAt Studio37, we believe every moment has a story worth preserving. From intimate family sessions to grand weddings and brand photography — we bring your vision to life with expert craftsmanship and artistic vision.' } },
      { type: 'image', content: { url: 'https://www.studio37.cc/images/portfolio-hero.jpg', alt: 'Studio37 Photography Portfolio', align: 'center' } },
      { type: 'columns', content: { col1Title: '💍 Weddings', col1Text: 'Full-day and half-day packages. Documentary and editorial style.', col2Title: '👨‍👩‍👧‍👦 Portraits', col2Text: 'Family, maternity, newborn, senior, and professional headshots.' } },
      { type: 'button', content: { text: 'Book Your Free Consultation', url: BRAND.bookingUrl, backgroundColor: BRAND.primary, textColor: '#ffffff', align: 'center' } },
      { type: 'social', content: {} },
      { type: 'footer', content: {} },
    ],
  },
  'booking-confirmation': {
    label: '✅ Booking Confirmation',
    description: 'Session confirmation email to client',
    blocks: [
      { type: 'logo', content: { tagline: 'Studio37 Photography' } },
      { type: 'hero', content: { title: 'Booking Confirmed! ✓', subtitle: 'We\'re excited to photograph your session.', backgroundColor: '#1a1a1a', textColor: '#ffffff' } },
      { type: 'text', content: { text: 'Hi {{firstName}},\n\nGreat news — your {{sessionType}} session is confirmed! Here are your details:' } },
      { type: 'columns', content: { col1Title: '📅 Date', col1Text: '{{sessionDate}}', col2Title: '🕐 Time', col2Text: '{{sessionTime}}' } },
      { type: 'columns', content: { col1Title: '📍 Location', col1Text: '{{location}}', col2Title: '📦 Package', col2Text: '{{packageName}}' } },
      { type: 'divider', content: {} },
      { type: 'text', content: { text: 'Need to make changes? Reply to this email or call us at ' + BRAND.phone + '.' } },
      { type: 'button', content: { text: '📸 Prepare for Your Session', url: 'https://www.studio37.cc/session-prep', backgroundColor: BRAND.primary, textColor: '#ffffff', align: 'center' } },
      { type: 'social', content: {} },
      { type: 'footer', content: {} },
    ],
  },
  'newsletter': {
    label: '📰 Newsletter',
    description: 'Regular newsletter / announcement email',
    blocks: [
      { type: 'logo', content: { tagline: 'Studio37 Photography' } },
      { type: 'hero', content: { title: 'Studio37 Monthly Update', subtitle: 'News, featured work, and tips for your next session.', backgroundColor: '#1a1a1a', textColor: '#ffffff' } },
      { type: 'text', content: { text: 'Hi {{firstName}},\n\nWelcome to this month\'s Studio37 newsletter! We\'ve been busy capturing beautiful moments and we can\'t wait to share what\'s new.' } },
      { type: 'image', content: { url: 'https://www.studio37.cc/images/featured-work.jpg', alt: 'Featured Work', align: 'center' } },
      { type: 'text', content: { text: '✨ Featured Session\n\nThis month\'s feature is a stunning golden-hour engagement session at Hermann Park. The couple\'s chemistry was electric — take a look in the gallery!' } },
      { type: 'button', content: { text: 'View Full Gallery', url: 'https://www.studio37.cc/gallery', backgroundColor: BRAND.primary, textColor: '#ffffff', align: 'center' } },
      { type: 'divider', content: {} },
      { type: 'text', content: { text: '📅 Booking Update\n\nWe have limited spots available for the upcoming season. Secure your date early!' } },
      { type: 'button', content: { text: 'Check Availability', url: BRAND.bookingUrl, backgroundColor: '#374151', textColor: '#ffffff', align: 'center' } },
      { type: 'social', content: {} },
      { type: 'footer', content: {} },
    ],
  },
}

// --- Helper: Generate HTML ---

export const renderEmailHtml = (blocks: EmailBlock[]): string => {
  const renderBlock = (block: EmailBlock): string => {
    const fontStack = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'

    switch (block.type) {
      case 'logo':
        return `
          <div style="background: ${BRAND.darkHeader}; padding: 24px 40px; text-align: center;">
            <div style="display: inline-block;">
              <span style="color: ${BRAND.gold}; font-family: ${fontStack}; font-size: 28px; font-weight: 800; letter-spacing: 2px;">STUDIO</span><span style="color: #ffffff; font-family: ${fontStack}; font-size: 28px; font-weight: 800; letter-spacing: 2px;">37</span>
            </div>
            ${block.content.tagline ? `<p style="color: #9ca3af; font-family: ${fontStack}; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin: 6px 0 0 0;">${block.content.tagline}</p>` : ''}
          </div>
        `
      case 'hero': {
        const bg = block.content.backgroundColor || BRAND.darkHeader
        const fg = block.content.textColor || '#ffffff'
        return `
          <div style="background-color: ${bg}; padding: 48px 40px; text-align: center;">
            ${block.content.imageUrl ? `<img src="${block.content.imageUrl}" alt="Hero" style="max-width: 100%; height: auto; margin-bottom: 24px; border-radius: 8px;" />` : ''}
            <h1 style="margin: 0 0 12px 0; color: ${fg}; font-family: ${fontStack}; font-size: 28px; font-weight: 700; line-height: 1.3;">${block.content.title || 'Hero Title'}</h1>
            ${block.content.subtitle ? `<p style="margin: 0 0 28px 0; color: ${fg}; font-family: ${fontStack}; font-size: 16px; opacity: 0.85; line-height: 1.5;">${block.content.subtitle}</p>` : ''}
            ${block.content.buttonText ? `<a href="${block.content.buttonUrl || '#'}" style="display: inline-block; padding: 14px 32px; background-color: ${block.content.buttonColor || BRAND.primary}; color: #ffffff; text-decoration: none; border-radius: 6px; font-family: ${fontStack}; font-size: 16px; font-weight: 700;">${block.content.buttonText}</a>` : ''}
          </div>
        `
      }
      case 'text': {
        const textHtml = (block.content.text || '')
          .split('\n\n')
          .map((para: string) => `<p style="margin: 0 0 16px 0; color: ${BRAND.text}; font-family: ${fontStack}; font-size: 16px; line-height: 26px;">${para.replace(/\n/g, '<br/>')}</p>`)
          .join('')
        return `<div style="padding: 24px 40px;">${textHtml}</div>`
      }
      case 'image':
        return `
          <div style="padding: 16px 40px; text-align: ${block.content.align || 'center'};">
            <img src="${block.content.url || 'https://via.placeholder.com/600x300'}" alt="${block.content.alt || 'Image'}" style="max-width: 100%; height: auto; border-radius: 8px;" />
            ${block.content.caption ? `<p style="margin: 8px 0 0 0; color: ${BRAND.muted}; font-family: ${fontStack}; font-size: 13px; text-align: center; font-style: italic;">${block.content.caption}</p>` : ''}
          </div>
        `
      case 'button':
        return `
          <div style="padding: 16px 40px; text-align: ${block.content.align || 'center'};">
            <a href="${block.content.url || '#'}" style="display: inline-block; padding: 14px 32px; background-color: ${block.content.backgroundColor || BRAND.primary}; color: ${block.content.textColor || '#ffffff'}; text-decoration: none; border-radius: 6px; font-family: ${fontStack}; font-size: 16px; font-weight: 700;">${block.content.text || 'Click Me'}</a>
          </div>
        `
      case 'columns':
        return `
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td width="50%" valign="top" style="padding: 16px 20px 16px 40px;">
                ${block.content.col1Title ? `<h3 style="margin: 0 0 8px 0; color: ${BRAND.text}; font-family: ${fontStack}; font-size: 16px; font-weight: 700;">${block.content.col1Title}</h3>` : ''}
                <p style="margin: 0; color: ${BRAND.text}; font-family: ${fontStack}; font-size: 15px; line-height: 24px;">${block.content.col1Text || 'Column 1'}</p>
              </td>
              <td width="50%" valign="top" style="padding: 16px 40px 16px 20px;">
                ${block.content.col2Title ? `<h3 style="margin: 0 0 8px 0; color: ${BRAND.text}; font-family: ${fontStack}; font-size: 16px; font-weight: 700;">${block.content.col2Title}</h3>` : ''}
                <p style="margin: 0; color: ${BRAND.text}; font-family: ${fontStack}; font-size: 15px; line-height: 24px;">${block.content.col2Text || 'Column 2'}</p>
              </td>
            </tr>
          </table>
        `
      case 'social':
        return `
          <div style="padding: 24px 40px; text-align: center; background-color: #f9fafb;">
            <p style="margin: 0 0 16px 0; color: ${BRAND.muted}; font-family: ${fontStack}; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Follow Us</p>
            <a href="${BRAND.instagram}" style="display: inline-block; margin: 0 8px; padding: 10px 20px; background-color: #e1306c; color: #ffffff; text-decoration: none; border-radius: 6px; font-family: ${fontStack}; font-size: 13px; font-weight: 600;">Instagram</a>
            <a href="${BRAND.facebook}" style="display: inline-block; margin: 0 8px; padding: 10px 20px; background-color: #1877f2; color: #ffffff; text-decoration: none; border-radius: 6px; font-family: ${fontStack}; font-size: 13px; font-weight: 600;">Facebook</a>
            <a href="https://www.tiktok.com/@studio37photography" style="display: inline-block; margin: 0 8px; padding: 10px 20px; background-color: #010101; color: #ffffff; text-decoration: none; border-radius: 6px; font-family: ${fontStack}; font-size: 13px; font-weight: 600;">TikTok</a>
          </div>
        `
      case 'footer':
        return `
          <div style="padding: 24px 40px; text-align: center; border-top: 1px solid ${BRAND.border};">
            <p style="margin: 0 0 6px 0; color: ${BRAND.muted}; font-family: ${fontStack}; font-size: 13px;"><strong>Studio37 Photography</strong></p>
            <p style="margin: 0 0 6px 0; color: ${BRAND.muted}; font-family: ${fontStack}; font-size: 12px;">${BRAND.address}</p>
            <p style="margin: 0 0 12px 0; color: ${BRAND.muted}; font-family: ${fontStack}; font-size: 12px;">
              <a href="tel:${BRAND.phone}" style="color: ${BRAND.primary}; text-decoration: none;">${BRAND.phone}</a> &nbsp;|&nbsp;
              <a href="mailto:${BRAND.email}" style="color: ${BRAND.primary}; text-decoration: none;">${BRAND.email}</a> &nbsp;|&nbsp;
              <a href="${BRAND.website}" style="color: ${BRAND.primary}; text-decoration: none;">studio37.cc</a>
            </p>
            <p style="margin: 0; color: #9ca3af; font-family: ${fontStack}; font-size: 11px;">
              © ${new Date().getFullYear()} Studio37 Photography. All rights reserved.<br/>
              <a href="${BRAND.website}/unsubscribe?email={{email}}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
            </p>
          </div>
        `
      case 'spacer':
        return `<div style="height: ${block.content.height || 24}px;"></div>`
      case 'divider':
        return `<div style="padding: 8px 40px;"><hr style="border: 0; border-top: 1px solid ${BRAND.border};" /></div>`
      default:
        return ''
    }
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Studio37</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.bg};">
<div style="max-width: 600px; margin: 20px auto; background-color: ${BRAND.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
${blocks.map(renderBlock).join('\n')}
</div>
</body>
</html>`
}

// --- Components ---

const SortableBlock = ({ block, onRemove, onEdit, isSelected }: {
  block: EmailBlock
  onRemove: (id: string) => void
  onEdit: (block: EmailBlock) => void
  isSelected: boolean
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  const meta = BLOCK_TYPES.find(t => t.type === block.type)
  const Icon = meta?.icon || Square

  const getPreview = () => {
    switch (block.type) {
      case 'logo': return 'STUDIO37'
      case 'hero': return block.content.title || 'Hero'
      case 'text': return (block.content.text || '').slice(0, 40) || 'Empty text'
      case 'button': return block.content.text || 'Button'
      case 'image': return block.content.alt || 'Image'
      case 'footer': return 'Studio37 footer'
      case 'social': return 'Instagram · Facebook · TikTok'
      case 'columns': return (block.content.col1Title || block.content.col1Text || 'Two columns')
      default: return meta?.label || block.type
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-2 p-3 mb-2 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all ${isSelected ? 'ring-2 ring-amber-500 border-amber-500' : 'border-gray-200'}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
        <GripVertical className="w-5 h-5" />
      </div>
      <div className="flex-1 flex items-center gap-3 cursor-pointer" onClick={() => onEdit(block)}>
        <div className="p-2 bg-gray-100 rounded-md text-gray-600">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="font-medium text-sm text-gray-900">{meta?.label || block.type}</div>
          <div className="text-xs text-gray-400 truncate max-w-[180px]">{getPreview()}</div>
        </div>
      </div>
      <button
        onClick={() => onRemove(block.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

const BlockEditor = ({ block, onChange }: { block: EmailBlock; onChange: (content: Record<string, any>) => void }) => {
  if (!block) return <div className="p-6 text-gray-400 text-center text-sm">Select a block to edit its settings</div>

  const set = (key: string, value: any) => onChange({ ...block.content, [key]: value })

  return (
    <div className="p-4 space-y-4 overflow-y-auto">
      <h3 className="font-semibold text-gray-900 border-b pb-2 text-sm uppercase tracking-wide">
        {BLOCK_TYPES.find(t => t.type === block.type)?.label || block.type}
      </h3>

      {block.type === 'logo' && (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Tagline (optional)</label>
          <input type="text" value={block.content.tagline || ''} onChange={e => set('tagline', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" placeholder="Studio37 Photography" />
        </div>
      )}

      {block.type === 'hero' && (
        <>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
            <input type="text" value={block.content.title || ''} onChange={e => set('title', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
            <input type="text" value={block.content.subtitle || ''} onChange={e => set('subtitle', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Background Color</label>
            <input type="color" value={block.content.backgroundColor || BRAND.darkHeader} onChange={e => set('backgroundColor', e.target.value)} className="w-full h-10 p-1 border rounded-md" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Text Color</label>
            <input type="color" value={block.content.textColor || '#ffffff'} onChange={e => set('textColor', e.target.value)} className="w-full h-10 p-1 border rounded-md" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
            <input type="text" value={block.content.buttonText || ''} onChange={e => set('buttonText', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Button URL</label>
            <input type="text" value={block.content.buttonUrl || ''} onChange={e => set('buttonUrl', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Button Color</label>
            <input type="color" value={block.content.buttonColor || BRAND.primary} onChange={e => set('buttonColor', e.target.value)} className="w-full h-10 p-1 border rounded-md" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Hero Image URL (optional)</label>
            <input type="text" value={block.content.imageUrl || ''} onChange={e => set('imageUrl', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" placeholder="https://..." /></div>
        </>
      )}

      {block.type === 'text' && (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Content</label>
          <textarea value={block.content.text || ''} onChange={e => set('text', e.target.value)} rows={8} className="w-full px-3 py-2 border rounded-md font-mono text-sm resize-y" />
          <p className="text-xs text-gray-400 mt-1">Blank lines create new paragraphs. Use {'{{firstName}}'} for personalization.</p>
        </div>
      )}

      {block.type === 'image' && (
        <>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
            <input type="text" value={block.content.url || ''} onChange={e => set('url', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Alt Text</label>
            <input type="text" value={block.content.alt || ''} onChange={e => set('alt', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Caption (optional)</label>
            <input type="text" value={block.content.caption || ''} onChange={e => set('caption', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Alignment</label>
            <select value={block.content.align || 'center'} onChange={e => set('align', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select></div>
        </>
      )}

      {block.type === 'button' && (
        <>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
            <input type="text" value={block.content.text || ''} onChange={e => set('text', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">URL</label>
            <input type="text" value={block.content.url || ''} onChange={e => set('url', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Background</label>
              <input type="color" value={block.content.backgroundColor || BRAND.primary} onChange={e => set('backgroundColor', e.target.value)} className="w-full h-10 p-1 border rounded-md" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Text Color</label>
              <input type="color" value={block.content.textColor || '#ffffff'} onChange={e => set('textColor', e.target.value)} className="w-full h-10 p-1 border rounded-md" /></div>
          </div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Alignment</label>
            <select value={block.content.align || 'center'} onChange={e => set('align', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select></div>
        </>
      )}

      {block.type === 'columns' && (
        <>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Left Column Title</label>
            <input type="text" value={block.content.col1Title || ''} onChange={e => set('col1Title', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Left Column Text</label>
            <textarea value={block.content.col1Text || ''} onChange={e => set('col1Text', e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-md text-sm resize-y" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Right Column Title</label>
            <input type="text" value={block.content.col2Title || ''} onChange={e => set('col2Title', e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Right Column Text</label>
            <textarea value={block.content.col2Text || ''} onChange={e => set('col2Text', e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-md text-sm resize-y" /></div>
        </>
      )}

      {block.type === 'spacer' && (
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Height (px)</label>
          <input type="number" value={block.content.height || 24} onChange={e => set('height', parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-md text-sm" /></div>
      )}

      {(block.type === 'social' || block.type === 'footer' || block.type === 'divider') && (
        <p className="text-sm text-gray-500 text-center py-4">This block uses Studio37 brand defaults and has no editable settings.</p>
      )}
    </div>
  )
}

// --- Default Content Per Block ---

const getDefaultContent = (type: EmailBlockType): Record<string, any> => {
  switch (type) {
    case 'logo':    return { tagline: 'Studio37 Photography' }
    case 'hero':    return { title: 'Your Headline Here', subtitle: 'A compelling supporting message goes here.', backgroundColor: BRAND.darkHeader, textColor: '#ffffff', buttonText: 'Book Now', buttonUrl: BRAND.bookingUrl, buttonColor: BRAND.primary }
    case 'text':    return { text: 'Hi {{firstName}},\n\nAdd your message here. Use double line breaks for new paragraphs.' }
    case 'image':   return { url: '', alt: 'Studio37 Photo', align: 'center', caption: '' }
    case 'button':  return { text: 'Book Your Session', url: BRAND.bookingUrl, backgroundColor: BRAND.primary, textColor: '#ffffff', align: 'center' }
    case 'columns': return { col1Title: '✨ Feature One', col1Text: 'Describe this feature or offering.', col2Title: '📸 Feature Two', col2Text: 'Describe this feature or offering.' }
    case 'social':  return {}
    case 'footer':  return {}
    case 'spacer':  return { height: 24 }
    case 'divider': return {}
    default:        return {}
  }
}

// --- Main Component ---

export default function EmailBuilder({
  initialBlocks = [],
  onChange,
}: {
  initialBlocks?: EmailBlock[]
  onChange?: (html: string, blocks: EmailBlock[]) => void
}) {
  const [blocks, setBlocks] = useState<EmailBlock[]>(initialBlocks)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')
  const [showPresets, setShowPresets] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const notify = (next: EmailBlock[]) => {
    if (onChange) onChange(renderEmailHtml(next), next)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setBlocks(items => {
        const next = arrayMove(items, items.findIndex(i => i.id === active.id), items.findIndex(i => i.id === over.id))
        notify(next)
        return next
      })
    }
  }

  const addBlock = (type: EmailBlockType) => {
    const block: EmailBlock = { id: Math.random().toString(36).slice(2, 10), type, content: getDefaultContent(type) }
    const next = [...blocks, block]
    setBlocks(next)
    setSelectedBlockId(block.id)
    notify(next)
  }

  const loadPreset = (key: string) => {
    const preset = EMAIL_TEMPLATE_PRESETS[key]
    if (!preset) return
    const next: EmailBlock[] = preset.blocks.map(b => ({ ...b, id: Math.random().toString(36).slice(2, 10) }))
    setBlocks(next)
    setSelectedBlockId(null)
    notify(next)
    setShowPresets(false)
  }

  const updateBlock = (id: string, content: Record<string, any>) => {
    const next = blocks.map(b => b.id === id ? { ...b, content } : b)
    setBlocks(next)
    notify(next)
  }

  const removeBlock = (id: string) => {
    const next = blocks.filter(b => b.id !== id)
    setBlocks(next)
    if (selectedBlockId === id) setSelectedBlockId(null)
    notify(next)
  }

  const selectedBlock = blocks.find(b => b.id === selectedBlockId)

  return (
    <div className="flex h-[680px] border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-sm">
      {/* Left Sidebar: Block List + Add Blocks */}
      <div className="w-60 bg-white border-r flex flex-col shrink-0">
        <div className="p-3 border-b bg-gray-50 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Blocks</h3>
            <p className="text-xs text-gray-400">Drag to reorder</p>
          </div>
          {/* Preset loader */}
          <div className="relative">
            <button
              onClick={() => setShowPresets(v => !v)}
              className="flex items-center gap-1 px-2 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-md text-xs font-medium hover:bg-amber-100"
            >
              <Sparkles className="w-3 h-3" /> Presets
            </button>
            {showPresets && (
              <div className="absolute right-0 top-8 z-50 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                <div className="p-2 border-b bg-gray-50">
                  <p className="text-xs font-semibold text-gray-600">Load Template Preset</p>
                  <p className="text-xs text-gray-400">Replaces current blocks</p>
                </div>
                {Object.entries(EMAIL_TEMPLATE_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => loadPreset(key)}
                    className="w-full text-left px-3 py-2 hover:bg-amber-50 transition-colors"
                  >
                    <div className="text-xs font-medium text-gray-900">{preset.label}</div>
                    <div className="text-xs text-gray-400 truncate">{preset.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.map(block => (
                <SortableBlock
                  key={block.id}
                  block={block}
                  onRemove={removeBlock}
                  onEdit={b => setSelectedBlockId(b.id)}
                  isSelected={selectedBlockId === block.id}
                />
              ))}
            </SortableContext>
          </DndContext>
          {blocks.length === 0 && (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg text-xs">
              <p className="font-medium mb-1">Start building</p>
              <p>Add blocks below or load a preset ↗</p>
            </div>
          )}
        </div>

        <div className="p-3 border-t bg-gray-50 max-h-48 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Add Block</p>
          <div className="grid grid-cols-2 gap-1">
            {BLOCK_TYPES.map(bt => (
              <button
                key={bt.type}
                onClick={() => addBlock(bt.type)}
                className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-lg hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 transition-colors text-xs gap-1 text-gray-600"
              >
                <bt.icon className="w-3.5 h-3.5" />
                <span className="leading-tight text-center">{bt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center: Preview Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-4 py-2 border-b bg-white flex items-center justify-between gap-4">
          <div className="flex gap-1">
            {(['edit', 'preview'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${mode === m ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {m === 'edit' ? '✏️ Editor' : '👁️ Preview'}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-400">{blocks.length} block{blocks.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="max-w-[600px] mx-auto bg-white shadow-md rounded-lg overflow-hidden min-h-[400px]">
            {mode === 'edit' ? (
              <div>
                {blocks.map(block => (
                  <div
                    key={block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`relative cursor-pointer transition-all ${selectedBlockId === block.id ? 'outline outline-2 outline-amber-500 outline-offset-[-2px] z-10' : 'hover:outline hover:outline-1 hover:outline-amber-300'}`}
                  >
                    <div dangerouslySetInnerHTML={{
                      __html: renderEmailHtml([block])
                        .replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/i, '')
                        .replace(/<\/body>[\s\S]*?<\/html>/i, '')
                        .replace(/<div style="max-width.*?overflow: hidden; box-shadow[^"]*;">/, '')
                        .replace(/<\/div>\s*$/, '')
                    }} />
                  </div>
                ))}
                {blocks.length === 0 && (
                  <div className="p-16 text-center text-gray-400 text-sm">Add blocks from the sidebar or load a preset</div>
                )}
              </div>
            ) : (
              <iframe
                srcDoc={renderEmailHtml(blocks)}
                className="w-full border-none"
                style={{ minHeight: 500, height: '100%' }}
                title="Email Preview"
              />
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Block Settings */}
      <div className="w-64 bg-white border-l shrink-0 overflow-y-auto">
        {selectedBlock ? (
          <BlockEditor
            block={selectedBlock}
            onChange={content => updateBlock(selectedBlock.id, content)}
          />
        ) : (
          <div className="p-8 text-center text-gray-400">
            <Settings className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Select a block to edit its settings</p>
          </div>
        )}
      </div>
    </div>
  )
}

/*

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getIcon = () => {
    const type = BLOCK_TYPES.find(t => t.type === block.type)
    const Icon = type ? type.icon : Square
    return <Icon className="w-4 h-4" />
  }

  const getLabel = () => {
    const type = BLOCK_TYPES.find(t => t.type === block.type)
    return type ? type.label : block.type
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-2 p-3 mb-2 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all ${isSelected ? 'ring-2 ring-primary-500 border-primary-500' : 'border-gray-200'}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
        <GripVertical className="w-5 h-5" />
      </div>
      
      <div 
        className="flex-1 flex items-center gap-3 cursor-pointer"
        onClick={() => onEdit(block)}
      >
        <div className="p-2 bg-gray-100 rounded-md text-gray-600">
          {getIcon()}
        </div>
        <div>
          <div className="font-medium text-sm text-gray-900">{getLabel()}</div>
          <div className="text-xs text-gray-500 truncate max-w-[200px]">
            {block.type === 'text' ? (block.content.text || 'Empty text') : 
             block.type === 'hero' ? (block.content.title || 'Hero') :
             block.type === 'button' ? (block.content.text || 'Button') :
             'Configure block'}
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(block.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

*/

const LegacyBlockEditor = ({ block, onChange }: { block: EmailBlock, onChange: (updates: any) => void }) => {
  if (!block) return <div className="p-4 text-gray-500 text-center">Select a block to edit</div>

  const handleChange = (key: string, value: any) => {
    onChange({ ...block.content, [key]: value })
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-medium text-gray-900 border-b pb-2 mb-4">Edit {BLOCK_TYPES.find(t => t.type === block.type)?.label}</h3>
      
      {block.type === 'hero' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={block.content.title || ''}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={block.content.subtitle || ''}
              onChange={e => handleChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={block.content.imageUrl || ''}
                onChange={e => handleChange('imageUrl', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              {/* ImageUploader integration would go here */}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={block.content.buttonText || ''}
              onChange={e => handleChange('buttonText', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
            <input
              type="text"
              value={block.content.buttonUrl || ''}
              onChange={e => handleChange('buttonUrl', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </>
      )}

      {block.type === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={block.content.text || ''}
            onChange={e => handleChange('text', e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border rounded-md font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Supports basic text. Newlines create paragraphs.</p>
        </div>
      )}

      {block.type === 'image' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={block.content.url || ''}
              onChange={e => handleChange('url', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
            <input
              type="text"
              value={block.content.alt || ''}
              onChange={e => handleChange('alt', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
            <select
              value={block.content.align || 'center'}
              onChange={e => handleChange('align', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </>
      )}

      {block.type === 'button' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={block.content.text || ''}
              onChange={e => handleChange('text', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <input
              type="text"
              value={block.content.url || ''}
              onChange={e => handleChange('url', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
              <input
                type="color"
                value={block.content.backgroundColor || '#000000'}
                onChange={e => handleChange('backgroundColor', e.target.value)}
                className="w-full h-10 p-1 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
              <input
                type="color"
                value={block.content.textColor || '#ffffff'}
                onChange={e => handleChange('textColor', e.target.value)}
                className="w-full h-10 p-1 border rounded-md"
              />
            </div>
          </div>
        </>
      )}

      {block.type === 'spacer' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
          <input
            type="number"
            value={block.content.height || 20}
            onChange={e => handleChange('height', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}

      {block.type === 'columns' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Column 1 Text</label>
            <textarea
              value={block.content.col1Text || ''}
              onChange={e => handleChange('col1Text', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Column 2 Text</label>
            <textarea
              value={block.content.col2Text || ''}
              onChange={e => handleChange('col2Text', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </>
      )}
    </div>
  )
}

// --- Main Component ---

function EmailBuilderLegacy({ 
  initialBlocks = [], 
  onChange 
}: { 
  initialBlocks?: EmailBlock[], 
  onChange?: (html: string, blocks: EmailBlock[]) => void 
}) {
  const [blocks, setBlocks] = useState<EmailBlock[]>(initialBlocks)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        const newBlocks = arrayMove(items, oldIndex, newIndex)
        notifyChange(newBlocks)
        return newBlocks
      })
    }
  }

  const addBlock = (type: EmailBlockType) => {
    const newBlock: EmailBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: getDefaultContent(type)
    }
    const newBlocks = [...blocks, newBlock]
    setBlocks(newBlocks)
    setSelectedBlockId(newBlock.id)
    notifyChange(newBlocks)
  }

  const updateBlock = (id: string, content: any) => {
    const newBlocks = blocks.map(b => b.id === id ? { ...b, content } : b)
    setBlocks(newBlocks)
    notifyChange(newBlocks)
  }

  const removeBlock = (id: string) => {
    const newBlocks = blocks.filter(b => b.id !== id)
    setBlocks(newBlocks)
    if (selectedBlockId === id) setSelectedBlockId(null)
    notifyChange(newBlocks)
  }

  const notifyChange = (currentBlocks: EmailBlock[]) => {
    if (onChange) {
      const html = renderEmailHtml(currentBlocks)
      onChange(html, currentBlocks)
    }
  }

  const getDefaultContent = (type: EmailBlockType) => {
    switch (type) {
      case 'hero': return { title: 'Welcome!', subtitle: 'Thanks for joining us.', buttonText: 'Get Started', backgroundColor: '#f3f4f6' }
      case 'text': return { text: 'Add your text here...' }
      case 'image': return { url: '', alt: 'Image', align: 'center' }
      case 'button': return { text: 'Click Me', url: '#', backgroundColor: '#000000', textColor: '#ffffff', align: 'center' }
      case 'spacer': return { height: 20 }
      case 'divider': return {}
      case 'columns': return { col1Text: 'Left column content', col2Text: 'Right column content' }
      default: return {}
    }
  }

  const selectedBlock = blocks.find(b => b.id === selectedBlockId)

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden bg-gray-50">
      {/* Left Sidebar: Blocks List */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">Blocks</h3>
          <p className="text-xs text-gray-500">Drag to reorder</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={blocks.map(b => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((block) => (
                <SortableBlock 
                  key={block.id} 
                  block={block} 
                  onRemove={removeBlock}
                  onEdit={(b: EmailBlock) => setSelectedBlockId(b.id)}
                  isSelected={selectedBlockId === block.id}
                />
              ))}
            </SortableContext>
          </DndContext>

          {blocks.length === 0 && (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
              <p>No blocks yet</p>
              <p className="text-xs">Add one below</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="grid grid-cols-2 gap-2">
            {BLOCK_TYPES.map(type => (
              <button
                key={type.type}
                onClick={() => addBlock(type.type as EmailBlockType)}
                className="flex flex-col items-center justify-center p-2 bg-white border rounded-md hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-colors text-xs gap-1"
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Middle: Preview */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-2 border-b bg-white flex justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={() => setMode('edit')}
              className={`px-3 py-1 rounded-md text-sm ${mode === 'edit' ? 'bg-gray-100 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Editor
            </button>
            <button 
              onClick={() => setMode('preview')}
              className={`px-3 py-1 rounded-md text-sm ${mode === 'preview' ? 'bg-gray-100 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Preview
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 bg-gray-100">
          <div className="max-w-[600px] mx-auto bg-white shadow-lg min-h-[500px] rounded-sm overflow-hidden">
            {mode === 'edit' ? (
              <div className="divide-y divide-dashed divide-gray-200">
                {blocks.map(block => (
                  <div 
                    key={block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`relative group cursor-pointer hover:bg-blue-50 transition-colors ${selectedBlockId === block.id ? 'ring-2 ring-inset ring-blue-500 z-10' : ''}`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: renderEmailHtml([block]).replace(/<body.*?>|<\/body>|<\/html>|<!DOCTYPE html>|<html>|<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">|<\/div>$/g, '') }} />
                  </div>
                ))}
                {blocks.length === 0 && (
                  <div className="p-12 text-center text-gray-400">
                    Start adding blocks from the left sidebar
                  </div>
                )}
              </div>
            ) : (
              <iframe 
                srcDoc={renderEmailHtml(blocks)}
                className="w-full h-full min-h-[500px] border-none"
                title="Email Preview"
              />
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Settings */}
      <div className="w-72 bg-white border-l overflow-y-auto">
        {selectedBlock ? (
          <BlockEditor 
            block={selectedBlock} 
            onChange={(content) => updateBlock(selectedBlock.id, content)} 
          />
        ) : (
          <div className="p-8 text-center text-gray-400">
            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Select a block to configure its settings</p>
          </div>
        )}
      </div>
    </div>
  )
}
