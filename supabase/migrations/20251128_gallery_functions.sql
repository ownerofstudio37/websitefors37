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
