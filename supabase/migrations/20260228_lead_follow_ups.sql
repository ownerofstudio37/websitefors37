-- Create lead_follow_ups table for email/SMS follow-up sequence tracking
CREATE TABLE IF NOT EXISTS lead_follow_ups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  sequence_type text NOT NULL CHECK (sequence_type IN ('day1', 'day3', 'day7')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'skipped')),
  scheduled_for timestamptz NOT NULL,
  sent_at timestamptz,
  failed_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_lead_follow_ups_lead_id ON lead_follow_ups(lead_id);
CREATE INDEX idx_lead_follow_ups_status ON lead_follow_ups(status);
CREATE INDEX idx_lead_follow_ups_scheduled_for ON lead_follow_ups(scheduled_for);

-- Enable RLS
ALTER TABLE lead_follow_ups ENABLE ROW LEVEL SECURITY;

-- Service role (backend API) has full access
CREATE POLICY lead_follow_ups_service_role ON lead_follow_ups
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_lead_follow_ups_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lead_follow_ups_updated_at
BEFORE UPDATE ON lead_follow_ups
FOR EACH ROW
EXECUTE FUNCTION update_lead_follow_ups_timestamp();
