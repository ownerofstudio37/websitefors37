import { NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/test-email')

/**
 * Test Email Configuration Endpoint
 * Use this to verify that email notifications are working correctly
 * GET /api/test-email?to=your@email.com
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const adminEmail = process.env.ADMIN_EMAIL || 'ceo@studio37.cc'
    const testEmail = searchParams.get('to') || adminEmail
    
    // Check environment variables
    const config = {
      RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
      RESEND_API_KEY_PREVIEW: process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 7)}...` : 'NOT SET',
      EMAIL_FROM: process.env.EMAIL_FROM || 'Studio37 <contact@studio37.cc>',
      ADMIN_EMAIL: adminEmail,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studio37.cc',
      TEST_EMAIL: testEmail
    }
    
    log.info('Testing email configuration', { testEmail, config })
    
    // Send test email
    const testHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10B981;">✅ Email Configuration Test - SUCCESS</h2>
        <p>This is a test email from Studio37's lead notification system.</p>
        <p><strong>📅 Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</p>
        <p><strong>📧 Sent to:</strong> ${testEmail}</p>
        
        <div style="background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Configuration Status:</h3>
          <ul style="list-style: none; padding: 0;">
            <li>🔑 RESEND_API_KEY: ${config.RESEND_API_KEY ? '✅ Configured (' + config.RESEND_API_KEY_PREVIEW + ')' : '❌ Missing'}</li>
            <li>📧 EMAIL_FROM: ${config.EMAIL_FROM}</li>
            <li>👤 ADMIN_EMAIL: ${config.ADMIN_EMAIL}</li>
            <li>🌐 SITE_URL: ${config.NEXT_PUBLIC_SITE_URL}</li>
          </ul>
        </div>
        
        <div style="background: #DBEAFE; border-left: 4px solid #3B82F6; padding: 15px; margin: 20px 0;">
          <p style="margin: 0;"><strong>✨ If you received this email, your notification system is working correctly!</strong></p>
          <p style="margin: 10px 0 0 0;">You should receive lead notifications at this email address when new contacts submit the form.</p>
        </div>
        
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 12px;">
          Sent from Studio37 Lead Notification System<br>
          Test initiated at ${new Date().toISOString()}
        </p>
      </div>
    `
    
    const response = await fetch(`${config.NEXT_PUBLIC_SITE_URL}/api/marketing/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: testEmail,
        subject: '✅ Studio37 Email Test - Lead Notification System',
        html: testHtml
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      log.error('Test email failed', { status: response.status, result })
      return NextResponse.json({
        success: false,
        error: result.error || 'Email send failed',
        config,
        response: result
      }, { status: response.status })
    }
    
    log.info('Test email sent successfully', { testEmail, result })
    
    return NextResponse.json({
      success: true,
      message: `Test email sent to ${testEmail}`,
      config,
      result
    })
    
  } catch (err: any) {
    log.error('Test email error', undefined, err)
    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack
    }, { status: 500 })
  }
}
