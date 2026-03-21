import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createLogger } from "@/lib/logger";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { renderEmailTemplate, hasReactEmailTemplate, renderHtmlTemplate } from "@/lib/emailRenderer";
import { renderEmailHtml, parseBlocksJson } from "@/lib/emailBuilderRenderer";

const log = createLogger("api/marketing/email/send");

// Lazy Resend instantiation moved inside POST handler to avoid build-time failure
// when RESEND_API_KEY is not configured (e.g., preview builds).
// Do NOT create the client at module scope.

interface SendEmailRequest {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  blocks?: any[];
  templateId?: string;
  variables?: Record<string, any>;
  campaignId?: string;
  leadId?: string;
  from?: string;
  replyTo?: string;
}

function normalizeEmailVariables(rawVariables: unknown, recipients: string[]): Record<string, any> {
  let parsed: Record<string, any> = {}

  if (rawVariables && typeof rawVariables === 'object' && !Array.isArray(rawVariables)) {
    parsed = rawVariables as Record<string, any>
  } else if (typeof rawVariables === 'string') {
    try {
      const maybe = JSON.parse(rawVariables)
      if (maybe && typeof maybe === 'object' && !Array.isArray(maybe)) {
        parsed = maybe as Record<string, any>
      }
    } catch {
      parsed = {}
    }
  }

  const fullName = String(parsed.name || '').trim()
  const nameParts = fullName ? fullName.split(/\s+/) : []

  const firstName =
    parsed.firstName ??
    parsed.first_name ??
    (nameParts[0] || undefined) ??
    'there'

  const lastName =
    parsed.lastName ??
    parsed.last_name ??
    (nameParts.length > 1 ? nameParts.slice(1).join(' ') : '')

  const recipientEmail = recipients[0] || ''

  return {
    ...parsed,
    firstName,
    first_name: parsed.first_name ?? firstName,
    lastName,
    last_name: parsed.last_name ?? lastName,
    email: parsed.email ?? recipientEmail,
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(req.headers as any);
    const rl = rateLimit(`email-send:${ip}`, { limit: 10, windowMs: 60 * 1000 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many email requests" },
        { status: 429 }
      );
    }

    // Check if API key is configured (guard before creating client)
    if (!process.env.RESEND_API_KEY) {
      log.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    // Safe to instantiate Resend only after confirming key exists
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body: SendEmailRequest = await req.json();
    const {
      to,
      subject,
      html,
      text,
      blocks,
      templateId,
      variables,
      campaignId,
      leadId,
      from,
      replyTo,
    } = body;

    // Validate required fields
    if (!to || !subject) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject" },
        { status: 400 }
      );
    }

    const recipients = Array.isArray(to) ? to : [to];
    const normalizedVariables = normalizeEmailVariables(variables, recipients)

    let emailHtml = html || "";
    let emailText = text || "";
    let resolvedTemplateSlug: string | null = null;

    // If template ID provided, fetch and render template
    if (templateId) {
      const { data: template, error: templateError } = await supabaseAdmin
        .from("email_templates")
        .select("*")
        .eq("id", templateId)
        .single();

      if (templateError || !template) {
        log.error("Template fetch failed", { templateId, error: templateError });
        return NextResponse.json(
          { error: "Template not found" },
          { status: 404 }
        );
      }

      resolvedTemplateSlug = template.slug;

      // Try React Email rendering first, fallback to simple substitution
      if (hasReactEmailTemplate(template.slug)) {
        log.info(`Rendering with React Email: ${template.slug}`)
        emailHtml = await renderEmailTemplate(template.slug, normalizedVariables)
        // React Email generates both HTML and plain text automatically
      } else {
        // Check for visual-builder blocks_json first — re-render fresh HTML so
        // {{variable}} placeholders in block content get properly substituted.
        const blocks = parseBlocksJson(template.blocks_json)
        if (blocks) {
          log.info(`Rendering from blocks_json (${blocks.length} blocks): ${template.slug}`)
          const blockHtml = renderEmailHtml(blocks)
          emailHtml = renderHtmlTemplate(blockHtml, normalizedVariables)
        } else {
          log.info(`Rendering with simple substitution: ${template.slug}`)
          emailHtml = renderHtmlTemplate(template.html_content, normalizedVariables)
        }
        emailText = renderHtmlTemplate(template.text_content || "", normalizedVariables)
      }
    } else {
      // Non-template sends can still contain placeholders from the visual editor.
      // Prefer rendering from blocks when provided so output is consistent with
      // template-based sends and less email-client fragile.
      if (Array.isArray(blocks) && blocks.length > 0) {
        const blockHtml = renderEmailHtml(blocks as any)
        emailHtml = renderHtmlTemplate(blockHtml, normalizedVariables)
      } else if (emailHtml) {
        emailHtml = renderHtmlTemplate(emailHtml, normalizedVariables)
      }
      if (emailText) {
        emailText = renderHtmlTemplate(emailText, normalizedVariables)
      }
    }

    if (!emailHtml && !emailText) {
      return NextResponse.json(
        { error: "Either html, text, or templateId must be provided" },
        { status: 400 }
      );
    }

    // Prepare recipients array
    const results: any[] = [];

    // Send emails
    for (const recipient of recipients) {
      try {
        const emailData: any = {
          from: from || process.env.EMAIL_FROM || "Studio37 <contact@studio37.cc>",
          to: recipient,
          subject,
          html: emailHtml,
          ...(emailText && { text: emailText }),
          ...(replyTo && { reply_to: replyTo }),
        };

        const { data: sendResult, error: sendError } = await resend.emails.send(emailData);

        if (sendError) {
          log.error("Failed to send email", { recipient, error: sendError });
          results.push({
            recipient,
            success: false,
            error: sendError.message,
          });

          try {
            await supabaseAdmin.from('email_send_logs').insert({
              template_id: templateId || null,
              template_slug: resolvedTemplateSlug,
              lead_id: leadId || null,
              recipient_email: recipient,
              subject,
              provider: 'resend',
              status: 'failed',
              error_message: sendError.message,
              metadata: {
                campaignId: campaignId || null,
              },
              sent_at: new Date().toISOString(),
            })
          } catch (logErr) {
            log.warn('Failed to insert email_send_logs failure record', { recipient, error: String(logErr) })
          }

          // Track failed send if campaign
          if (campaignId) {
            await trackCampaignSend(
              campaignId,
              recipient,
              leadId,
              "bounced",
              null,
              sendError.message
            );
          }
          continue;
        }

        log.info("Email sent successfully", {
          recipient,
          messageId: sendResult?.id,
        });

        results.push({
          recipient,
          success: true,
          messageId: sendResult?.id,
        });

        try {
          await supabaseAdmin.from('email_send_logs').insert({
            template_id: templateId || null,
            template_slug: resolvedTemplateSlug,
            lead_id: leadId || null,
            recipient_email: recipient,
            subject,
            provider: 'resend',
            provider_message_id: sendResult?.id || null,
            status: 'sent',
            metadata: {
              campaignId: campaignId || null,
            },
            sent_at: new Date().toISOString(),
          })
        } catch (logErr) {
          log.warn('Failed to insert email_send_logs sent record', { recipient, error: String(logErr) })
        }

        // Track successful send if campaign
        if (campaignId) {
          await trackCampaignSend(
            campaignId,
            recipient,
            leadId,
            "sent",
            sendResult?.id
          );
        }
      } catch (err: any) {
        log.error("Email send exception", { recipient }, err);
        results.push({
          recipient,
          success: false,
          error: err.message,
        });

        try {
          await supabaseAdmin.from('email_send_logs').insert({
            template_id: templateId || null,
            template_slug: resolvedTemplateSlug,
            lead_id: leadId || null,
            recipient_email: recipient,
            subject,
            provider: 'resend',
            status: 'failed',
            error_message: err.message,
            metadata: {
              campaignId: campaignId || null,
              exception: true,
            },
            sent_at: new Date().toISOString(),
          })
        } catch (logErr) {
          log.warn('Failed to insert email_send_logs exception record', { recipient, error: String(logErr) })
        }
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    return NextResponse.json({
      success: failCount === 0,
      results,
      summary: {
        total: recipients.length,
        sent: successCount,
        failed: failCount,
      },
    });
  } catch (err: any) {
    log.error("Email API error", undefined, err);
    return NextResponse.json(
      { error: err.message || "Failed to send email" },
      { status: 500 }
    );
  }
}

// Helper: Track campaign send in database
async function trackCampaignSend(
  campaignId: string,
  recipientEmail: string,
  leadId: string | undefined,
  status: string,
  providerMessageId: string | null = null,
  errorMessage: string | null = null
) {
  try {
    const sendData: any = {
      campaign_id: campaignId,
      recipient_email: recipientEmail,
      status,
      provider: "resend",
      ...(leadId && { lead_id: leadId }),
      ...(providerMessageId && { provider_message_id: providerMessageId }),
      ...(errorMessage && { error_message: errorMessage }),
      ...(status === "sent" && { sent_at: new Date().toISOString() }),
    };

    await supabaseAdmin.from("email_campaign_sends").insert(sendData);

    // Update campaign totals
    const updateField =
      status === "sent"
        ? "total_sent"
        : status === "bounced"
        ? "total_bounced"
        : null;

    if (updateField) {
      await supabaseAdmin.rpc("increment_campaign_stat", {
        campaign_id: campaignId,
        stat_field: updateField,
      });
    }
  } catch (err) {
    log.error("Failed to track campaign send", { campaignId, recipientEmail }, err);
  }
}
