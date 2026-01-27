-- Add revenue_generated field to track deposits and payments
ALTER TABLE leads ADD COLUMN IF NOT EXISTS revenue_generated numeric(10,2) DEFAULT 0;

-- Create index for cost/revenue analysis queries
CREATE INDEX IF NOT EXISTS idx_leads_lead_cost ON leads(lead_cost);
CREATE INDEX IF NOT EXISTS idx_leads_revenue ON leads(revenue_generated);
