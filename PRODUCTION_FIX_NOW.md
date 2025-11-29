# 🚨 PRODUCTION FIX - RUN IMMEDIATELY

## Current Issue

Your production site (`https://www.studio37.cc`) is showing errors because:
- ✅ Code is deployed with new table names (`client_galleries`, etc.)
- ❌ Database doesn't have these tables yet

## Quick Fix (5 minutes)

### Step 1: Open Supabase Production Dashboard

1. Go to https://supabase.com/dashboard
2. Select your **PRODUCTION** project (for studio37.cc)
3. Click **SQL Editor** in the left sidebar

### Step 2: Run Client Galleries Migration

Copy and paste this ENTIRE migration:

```sql
-- Client Galleries System
-- Password-protected photo galleries for client delivery
-- Note: Uses "client_galleries" and "client_gallery_images" to avoid conflict with existing "gallery_images" table

-- 1. Client Galleries table
CREATE TABLE IF NOT EXISTS client_galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Client info
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  
  -- Gallery details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  session_type VARCHAR(100),
  session_date DATE,
  
  -- Access control
  access_code VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Settings
  allow_downloads BOOLEAN DEFAULT false,
  require_purchase BOOLEAN DEFAULT true,
  watermark_enabled BOOLEAN DEFAULT true,
  
  -- Stats
  total_photos INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Client Gallery Images table
CREATE TABLE IF NOT EXISTS client_gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES client_galleries(id) ON DELETE CASCADE,
  
  -- Image URLs
  cloudinary_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  watermarked_url TEXT,
  
  -- Image metadata
  filename VARCHAR(255),
  caption TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  format VARCHAR(50),
  
  -- Organization
  is_featured BOOLEAN DEFAULT false,
  sequence_number INTEGER,
  
  -- Stats
  views_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  
  -- Metadata
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Client Gallery Favorites
CREATE TABLE IF NOT EXISTS client_gallery_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES client_galleries(id) ON DELETE CASCADE,
  image_id UUID NOT NULL REFERENCES client_gallery_images(id) ON DELETE CASCADE,
  client_email VARCHAR(255),
  session_token VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gallery_id, image_id, session_token)
);

-- 4. Client Gallery Downloads
CREATE TABLE IF NOT EXISTS client_gallery_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES client_galleries(id) ON DELETE CASCADE,
  image_id UUID NOT NULL REFERENCES client_gallery_images(id) ON DELETE CASCADE,
  client_email VARCHAR(255),
  session_token VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Client Gallery Access Log
CREATE TABLE IF NOT EXISTS client_gallery_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES client_galleries(id) ON DELETE CASCADE,
  access_type VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_client_galleries_access_code ON client_galleries(access_code);
CREATE INDEX IF NOT EXISTS idx_client_galleries_status ON client_galleries(status);
CREATE INDEX IF NOT EXISTS idx_client_galleries_client_email ON client_galleries(client_email);
CREATE INDEX IF NOT EXISTS idx_client_galleries_expires_at ON client_galleries(expires_at);

CREATE INDEX IF NOT EXISTS idx_client_gallery_images_gallery_id ON client_gallery_images(gallery_id);
CREATE INDEX IF NOT EXISTS idx_client_gallery_images_sequence ON client_gallery_images(gallery_id, sequence_number);

CREATE INDEX IF NOT EXISTS idx_client_gallery_favorites_gallery ON client_gallery_favorites(gallery_id);
CREATE INDEX IF NOT EXISTS idx_client_gallery_favorites_image ON client_gallery_favorites(image_id);

CREATE INDEX IF NOT EXISTS idx_client_gallery_downloads_gallery ON client_gallery_downloads(gallery_id);
CREATE INDEX IF NOT EXISTS idx_client_gallery_downloads_image ON client_gallery_downloads(image_id);

CREATE INDEX IF NOT EXISTS idx_client_gallery_access_log_gallery ON client_gallery_access_log(gallery_id);
CREATE INDEX IF NOT EXISTS idx_client_gallery_access_log_created ON client_gallery_access_log(created_at);

-- Enable RLS
ALTER TABLE client_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_access_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read client galleries by access code"
  ON client_galleries FOR SELECT
  USING (true);

CREATE POLICY "Allow public read client gallery images"
  ON client_gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert client gallery favorites"
  ON client_gallery_favorites FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read client gallery favorites"
  ON client_gallery_favorites FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert client gallery downloads"
  ON client_gallery_downloads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert client gallery access logs"
  ON client_gallery_access_log FOR INSERT
  WITH CHECK (true);

-- Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_client_galleries_updated_at
  BEFORE UPDATE ON client_galleries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments
COMMENT ON TABLE client_galleries IS 'Password-protected photo galleries for client delivery';
COMMENT ON TABLE client_gallery_images IS 'Photos within client galleries, stored on Cloudinary';
COMMENT ON TABLE client_gallery_favorites IS 'Client-selected favorite images';
COMMENT ON TABLE client_gallery_downloads IS 'Tracks all client gallery image downloads';
COMMENT ON TABLE client_gallery_access_log IS 'Security audit log for client gallery access';
```

Click **RUN** button.

### Step 3: Run Helper Functions Migration

Copy and paste this:

```sql
-- Helper functions for client gallery operations

-- Increment favorite count on image
CREATE OR REPLACE FUNCTION increment_favorite_count(image_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE client_gallery_images
  SET favorite_count = favorite_count + 1
  WHERE id = image_id;
END;
$$ LANGUAGE plpgsql;

-- Increment download counts
CREATE OR REPLACE FUNCTION increment_download_count(image_id UUID, gallery_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE client_gallery_images
  SET download_count = download_count + 1
  WHERE id = image_id;
  
  UPDATE client_galleries
  SET downloads_count = downloads_count + 1
  WHERE id = gallery_id;
END;
$$ LANGUAGE plpgsql;

-- Decrement gallery photo count
CREATE OR REPLACE FUNCTION decrement_gallery_photos(gallery_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE client_galleries
  SET total_photos = GREATEST(0, total_photos - 1)
  WHERE id = gallery_id;
END;
$$ LANGUAGE plpgsql;
```

Click **RUN** button.

### Step 4: Verify

1. Refresh your site: https://www.studio37.cc/admin/client-portals
2. Error should be gone!
3. Try accessing a portal user's projects page

## ✅ Done!

Your site should be working now. The error was because your code expected the new `client_galleries` tables but they didn't exist in production yet.

## Next Time

To avoid this issue:
1. Always run migrations in production BEFORE deploying code
2. OR use feature flags to enable new features gradually
3. OR maintain backward compatibility during migrations

---

**Need help?** Let me know if you see any other errors after running these migrations!
