-- Add lead_cost to leads and backfill existing rows
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_cost numeric(10,2);

-- Backfill existing leads with average historical cost
UPDATE leads SET lead_cost = 18.48 WHERE lead_cost IS NULL;
