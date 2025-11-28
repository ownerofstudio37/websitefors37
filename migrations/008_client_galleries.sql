-- Client Photo Gallery System
-- Create tables for managing private client galleries with password protection

-- 1. Galleries table - stores collection information
CREATE TABLE IF NOT EXISTS galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  session_date DATE,
  session_type VARCHAR(100), -- wedding, portrait, commercial, etc.
  title VARCHAR(255) NOT NULL,
  description TEXT,
  password_hash VARCHAR(255) NOT NULL, -- bcrypt hash
  access_code VARCHAR(50) UNIQUE NOT NULL, -- URL-friendly code
  status VARCHAR(50) DEFAULT 'active', -- active, archived, expired
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Download settings
  allow_downloads BOOLEAN DEFAULT false,
  require_purchase BOOLEAN DEFAULT true,
  download_limit INTEGER, -- max downloads per image
  -- Metadata
  total_photos INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0
);

-- 2. Gallery images table - stores individual photos
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  cloudinary_public_id VARCHAR(255) NOT NULL,
  cloudinary_url TEXT NOT NULL,
  thumbnail_url TEXT, -- smaller preview
  watermarked_url TEXT, -- watermarked version
  full_res_url TEXT, -- full resolution (requires purchase)
  filename VARCHAR(255),
  file_size INTEGER, -- bytes
  width INTEGER,
  height INTEGER,
  format VARCHAR(20), -- jpg, png, etc.
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  -- Engagement tracking
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  -- Status
  is_featured BOOLEAN DEFAULT false,
  is_available_for_purchase BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Gallery favorites - tracks client favorites
CREATE TABLE IF NOT EXISTS gallery_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  image_id UUID NOT NULL REFERENCES gallery_images(id) ON DELETE CASCADE,
  session_id VARCHAR(255), -- browser session to track anonymous users
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gallery_id, image_id, session_id)
);

-- 4. Gallery downloads - tracks downloads for limits
CREATE TABLE IF NOT EXISTS gallery_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  image_id UUID NOT NULL REFERENCES gallery_images(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  ip_address VARCHAR(45),
  download_type VARCHAR(50), -- preview, watermarked, full_res
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Gallery access log - audit trail
CREATE TABLE IF NOT EXISTS gallery_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  access_code VARCHAR(50),
  password_attempt BOOLEAN,
  success BOOLEAN,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_galleries_access_code ON galleries(access_code);
CREATE INDEX IF NOT EXISTS idx_galleries_client_email ON galleries(client_email);
CREATE INDEX IF NOT EXISTS idx_galleries_status ON galleries(status);
CREATE INDEX IF NOT EXISTS idx_galleries_expires_at ON galleries(expires_at);

CREATE INDEX IF NOT EXISTS idx_gallery_images_gallery_id ON gallery_images(gallery_id);
CREATE INDEX IF NOT EXISTS idx_gallery_images_display_order ON gallery_images(gallery_id, display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_images_cloudinary_id ON gallery_images(cloudinary_public_id);

CREATE INDEX IF NOT EXISTS idx_gallery_favorites_gallery_id ON gallery_favorites(gallery_id);
CREATE INDEX IF NOT EXISTS idx_gallery_favorites_image_id ON gallery_favorites(image_id);
CREATE INDEX IF NOT EXISTS idx_gallery_favorites_session ON gallery_favorites(session_id);

CREATE INDEX IF NOT EXISTS idx_gallery_downloads_gallery_id ON gallery_downloads(gallery_id);
CREATE INDEX IF NOT EXISTS idx_gallery_downloads_image_id ON gallery_downloads(image_id);

CREATE INDEX IF NOT EXISTS idx_gallery_access_log_gallery_id ON gallery_access_log(gallery_id);
CREATE INDEX IF NOT EXISTS idx_gallery_access_log_created_at ON gallery_access_log(created_at);

-- Add RLS policies (Row Level Security)
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_access_log ENABLE ROW LEVEL SECURITY;

-- Public read access for galleries (password protected at app level)
CREATE POLICY "Public can view active galleries"
  ON galleries FOR SELECT
  USING (status = 'active' AND (expires_at IS NULL OR expires_at > NOW()));

-- Public can view images from their gallery
CREATE POLICY "Public can view gallery images"
  ON gallery_images FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM galleries
    WHERE galleries.id = gallery_images.gallery_id
    AND galleries.status = 'active'
    AND (galleries.expires_at IS NULL OR galleries.expires_at > NOW())
  ));

-- Public can add favorites
CREATE POLICY "Public can add favorites"
  ON gallery_favorites FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can view favorites"
  ON gallery_favorites FOR SELECT
  USING (true);

-- Public can record downloads
CREATE POLICY "Public can record downloads"
  ON gallery_downloads FOR INSERT
  WITH CHECK (true);

-- Public can log access attempts
CREATE POLICY "Public can log access"
  ON gallery_access_log FOR INSERT
  WITH CHECK (true);

-- Update calendar_event_id column to appointments if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'appointments' 
    AND column_name = 'calendar_event_id'
  ) THEN
    ALTER TABLE appointments ADD COLUMN calendar_event_id VARCHAR(255);
    CREATE INDEX idx_appointments_calendar_event ON appointments(calendar_event_id);
  END IF;
END $$;

-- Comments for documentation
COMMENT ON TABLE galleries IS 'Private client photo galleries with password protection';
COMMENT ON TABLE gallery_images IS 'Individual photos within galleries';
COMMENT ON TABLE gallery_favorites IS 'Client favorite selections';
COMMENT ON TABLE gallery_downloads IS 'Download tracking and limits';
COMMENT ON TABLE gallery_access_log IS 'Security audit trail for gallery access';
