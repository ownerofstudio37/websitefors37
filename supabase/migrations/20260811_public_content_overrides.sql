CREATE TABLE IF NOT EXISTS public_content_overrides (
  key TEXT PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('image_slots', 'recent_work', 'reviews', 'testimonials', 'cta_rules', 'turnaround')),
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_public_content_overrides_type_status
  ON public_content_overrides(content_type, status);

CREATE OR REPLACE FUNCTION update_public_content_overrides_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_public_content_overrides_updated_at ON public_content_overrides;
CREATE TRIGGER update_public_content_overrides_updated_at
  BEFORE UPDATE ON public_content_overrides
  FOR EACH ROW
  EXECUTE FUNCTION update_public_content_overrides_updated_at();

ALTER TABLE public_content_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published public content overrides" ON public_content_overrides;
CREATE POLICY "Public can read published public content overrides"
  ON public_content_overrides
  FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "Service role can manage public content overrides" ON public_content_overrides;
CREATE POLICY "Service role can manage public content overrides"
  ON public_content_overrides
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
