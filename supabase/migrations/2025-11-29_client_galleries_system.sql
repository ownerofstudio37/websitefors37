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
  session_type VARCHAR(100), -- 'portrait', 'wedding', 'family', 'commercial', 'event'
  session_date DATE,
  
  -- Access control
  access_code VARCHAR(100) UNIQUE NOT NULL, -- URL-friendly unique code
  password_hash VARCHAR(255) NOT NULL, -- bcrypt hash
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'expired', 'archived'
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
  
  -- Image URLs (Cloudinary or other storage)
  cloudinary_url TEXT NOT NULL, -- Full resolution
  thumbnail_url TEXT NOT NULL, -- Small preview
  watermarked_url TEXT, -- Watermarked version for preview
  
  -- Image metadata
  filename VARCHAR(255),
  caption TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER, -- bytes
  format VARCHAR(50), -- 'jpg', 'png', 'webp'
  
  -- Organization
  is_featured BOOLEAN DEFAULT false,
  sequence_number INTEGER, -- Display order
  
  -- Stats
  views_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  
  -- Metadata
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Client Gallery Favorites (client selections)
CREATE TABLE IF NOT EXISTS client_gallery_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES client_galleries(id) ON DELETE CASCADE,
  image_id UUID NOT NULL REFERENCES client_gallery_images(id) ON DELETE CASCADE,
  
  -- Client info (optional - can track by session or client email)
  client_email VARCHAR(255),
  session_token VARCHAR(255), -- Anonymous session tracking
  
  -- Notes
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate favorites
  UNIQUE(gallery_id, image_id, session_token)
);

-- 4. Client Gallery Downloads (tracking)
CREATE TABLE IF NOT EXISTS client_gallery_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES client_galleries(id) ON DELETE CASCADE,
  image_id UUID NOT NULL REFERENCES client_gallery_images(id) ON DELETE CASCADE,
  
  -- Download info
  client_email VARCHAR(255),
  session_token VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Client Gallery Access Log (security audit trail)
CREATE TABLE IF NOT EXISTS client_gallery_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES client_galleries(id) ON DELETE CASCADE,
  
  -- Access details
  access_type VARCHAR(50) NOT NULL, -- 'login_success', 'login_fail', 'view', 'download'
  ip_address VARCHAR(45),
  user_agent TEXT,
  
  -- Result
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
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

-- Enable RLS (Row Level Security)
ALTER TABLE client_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_gallery_access_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read access (for client viewing)
-- Note: Admin operations should use service role key

-- Allow public to read galleries by access code (password check happens in API)
CREATE POLICY "Allow public read client galleries by access code"
  ON client_galleries FOR SELECT
  USING (true);

-- Allow public to read gallery images
CREATE POLICY "Allow public read client gallery images"
  ON client_gallery_images FOR SELECT
  USING (true);

-- Allow public to insert favorites
CREATE POLICY "Allow public insert client gallery favorites"
  ON client_gallery_favorites FOR INSERT
  WITH CHECK (true);

-- Allow public to read their own favorites
CREATE POLICY "Allow public read client gallery favorites"
  ON client_gallery_favorites FOR SELECT
  USING (true);

-- Allow public to insert downloads
CREATE POLICY "Allow public insert client gallery downloads"
  ON client_gallery_downloads FOR INSERT
  WITH CHECK (true);

-- Allow public to insert access logs
CREATE POLICY "Allow public insert client gallery access logs"
  ON client_gallery_access_log FOR INSERT
  WITH CHECK (true);

-- Trigger to update updated_at timestamp
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

-- Comments for documentation
COMMENT ON TABLE client_galleries IS 'Password-protected photo galleries for client delivery';
COMMENT ON TABLE client_gallery_images IS 'Photos within client galleries, stored on Cloudinary';
COMMENT ON TABLE client_gallery_favorites IS 'Client-selected favorite images';
COMMENT ON TABLE client_gallery_downloads IS 'Tracks all client gallery image downloads';
COMMENT ON TABLE client_gallery_access_log IS 'Security audit log for client gallery access';
