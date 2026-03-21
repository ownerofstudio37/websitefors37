-- Admin email system enhancements
-- 1) Persist visual-builder structure for email templates
-- 2) Track real email send analytics for template reporting

-- Persist visual builder block JSON
ALTER TABLE email_templates
  ADD COLUMN IF NOT EXISTS blocks_json JSONB DEFAULT '[]'::jsonb;

-- Optional helper index for templates with block data
CREATE INDEX IF NOT EXISTS idx_email_templates_blocks_json
  ON email_templates USING GIN (blocks_json);

-- Real send logs for analytics (delivery volume by template)
CREATE TABLE IF NOT EXISTS email_send_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NULL REFERENCES email_templates(id) ON DELETE SET NULL,
  template_slug TEXT NULL,
  lead_id UUID NULL REFERENCES leads(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  provider TEXT DEFAULT 'resend',
  provider_message_id TEXT NULL,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('queued', 'sent', 'failed', 'bounced', 'delivered', 'opened', 'clicked')),
  error_message TEXT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_send_logs_template_id ON email_send_logs(template_id);
CREATE INDEX IF NOT EXISTS idx_email_send_logs_template_slug ON email_send_logs(template_slug);
CREATE INDEX IF NOT EXISTS idx_email_send_logs_status ON email_send_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_send_logs_sent_at ON email_send_logs(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_send_logs_lead_id ON email_send_logs(lead_id);

ALTER TABLE email_send_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS email_send_logs_service_role ON email_send_logs;
CREATE POLICY email_send_logs_service_role ON email_send_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
