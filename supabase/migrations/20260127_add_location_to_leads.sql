-- Add location column to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS location TEXT;

-- Add index for location searches
CREATE INDEX IF NOT EXISTS idx_leads_location ON leads(location);

-- Add comment
COMMENT ON COLUMN leads.location IS 'Geographic location of the lead (city, state, or venue)';
