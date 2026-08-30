-- Add path-based Visual Builder support without removing older slug/data CMS rows.
-- This lets existing hardcoded routes use page_configs layouts by path.

CREATE TABLE IF NOT EXISTS page_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  path TEXT,
  block_id TEXT,
  block_type TEXT,
  props JSONB NOT NULL DEFAULT '{}'::jsonb,
  draft_props JSONB,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE page_configs
  ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS data JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS path TEXT,
  ADD COLUMN IF NOT EXISTS block_id TEXT,
  ADD COLUMN IF NOT EXISTS block_type TEXT,
  ADD COLUMN IF NOT EXISTS props JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS draft_props JSONB,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE UNIQUE INDEX IF NOT EXISTS idx_page_configs_slug_unique
  ON page_configs(slug)
  WHERE slug IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_page_configs_path_block_unique
  ON page_configs(path, block_id)
  WHERE path IS NOT NULL AND block_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_page_configs_path ON page_configs(path);
CREATE INDEX IF NOT EXISTS idx_page_configs_updated_at ON page_configs(updated_at DESC);
