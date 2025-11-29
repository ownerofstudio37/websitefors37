# 🚨 PRODUCTION FIX - Alternative Version (Policies Already Exist)

Since the policies already exist, run this modified version instead:

## Step 1: Run This in Supabase SQL Editor

```sql
-- Client Galleries System (Without Duplicate Policies)

-- 1. Client Galleries table
CREATE TABLE IF NOT EXISTS client_galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  session_type VARCHAR(100),
  session_date DATE,
  access_code VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  expires_at TIMESTAMP WITH TIME ZONE,
  allow_downloads BOOLEAN DEFAULT false,
  require_purchase BOOLEAN DEFAULT true,
  watermark_enabled BOOLEAN DEFAULT true,
  total_photos INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Client Gallery Images table
CREATE TABLE IF NOT EXISTS client_gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES client_galleries(id) ON DELETE CASCADE,
  cloudinary_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  watermarked_url TEXT,
  filename VARCHAR(255),
  caption TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  format VARCHAR(50),
  is_featured BOOLEAN DEFAULT false,
  sequence_number INTEGER,
  views_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
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

-- Indexes (IF NOT EXISTS prevents duplicates)
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

-- Enable RLS (safe to run multiple times)
ALTER TABLE client_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_access_log ENABLE ROW LEVEL SECURITY;

-- Skip policies since they already exist

-- Trigger (OR REPLACE prevents duplicates)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists, then create
DROP TRIGGER IF EXISTS update_client_galleries_updated_at ON client_galleries;
CREATE TRIGGER update_client_galleries_updated_at
  BEFORE UPDATE ON client_galleries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Step 2: Run Helper Functions

```sql
-- Helper functions for client gallery operations

CREATE OR REPLACE FUNCTION increment_favorite_count(image_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE client_gallery_images
  SET favorite_count = favorite_count + 1
  WHERE id = image_id;
END;
$$ LANGUAGE plpgsql;

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

CREATE OR REPLACE FUNCTION decrement_gallery_photos(gallery_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE client_galleries
  SET total_photos = GREATEST(0, total_photos - 1)
  WHERE id = gallery_id;
END;
$$ LANGUAGE plpgsql;
```

## ✅ Done!

Now refresh your site and the errors should be gone!
