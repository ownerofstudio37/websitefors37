-- Fix missing gallery_id related issues if an earlier partial schema created gallery_images without the column
DO $$
DECLARE
  has_gallery_images bool;
  has_gallery_id bool;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='gallery_images'
  ) INTO has_gallery_images;

  IF has_gallery_images THEN
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema='public' AND table_name='gallery_images' AND column_name='gallery_id'
    ) INTO has_gallery_id;

    IF NOT has_gallery_id THEN
      RAISE NOTICE 'Adding gallery_id column to gallery_images';
      ALTER TABLE public.gallery_images ADD COLUMN gallery_id UUID;
      -- We cannot set NOT NULL until existing rows are backfilled.
      -- If galleries table exists, optionally backfill here if you know a default.
      -- Example placeholder: leave null and enforce in future inserts.
    END IF;

    -- Ensure foreign key constraint exists
    PERFORM 1 FROM pg_constraint
      WHERE conrelid = 'public.gallery_images'::regclass
        AND contype = 'f'
        AND conname = 'gallery_images_gallery_id_fkey';
    IF NOT FOUND AND has_gallery_id THEN
      RAISE NOTICE 'Adding FK constraint gallery_images.gallery_id -> galleries(id)';
      ALTER TABLE public.gallery_images
        ADD CONSTRAINT gallery_images_gallery_id_fkey FOREIGN KEY (gallery_id)
        REFERENCES public.galleries(id) ON DELETE CASCADE;
    END IF;

    -- Create index if missing
    PERFORM 1 FROM pg_indexes WHERE schemaname='public' AND indexname='idx_gallery_images_gallery_id';
    IF NOT FOUND AND has_gallery_id THEN
      CREATE INDEX idx_gallery_images_gallery_id ON public.gallery_images(gallery_id);
    END IF;
  END IF;
END $$;

-- Repeat for gallery_favorites (gallery_id, image_id already expected)
DO $$
DECLARE
  has_favorites bool;
  favorites_has_gallery_id bool;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='gallery_favorites'
  ) INTO has_favorites;
  IF has_favorites THEN
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema='public' AND table_name='gallery_favorites' AND column_name='gallery_id'
    ) INTO favorites_has_gallery_id;
    IF NOT favorites_has_gallery_id THEN
      ALTER TABLE public.gallery_favorites ADD COLUMN gallery_id UUID;
    END IF;
  END IF;
END $$;

-- Repeat for gallery_downloads
DO $$
DECLARE
  has_downloads bool;
  downloads_has_gallery_id bool;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='gallery_downloads'
  ) INTO has_downloads;
  IF has_downloads THEN
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema='public' AND table_name='gallery_downloads' AND column_name='gallery_id'
    ) INTO downloads_has_gallery_id;
    IF NOT downloads_has_gallery_id THEN
      ALTER TABLE public.gallery_downloads ADD COLUMN gallery_id UUID;
    END IF;
  END IF;
END $$;

-- Repeat for gallery_access_log
DO $$
DECLARE
  has_access_log bool;
  access_log_has_gallery_id bool;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='gallery_access_log'
  ) INTO has_access_log;
  IF has_access_log THEN
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema='public' AND table_name='gallery_access_log' AND column_name='gallery_id'
    ) INTO access_log_has_gallery_id;
    IF NOT access_log_has_gallery_id THEN
      ALTER TABLE public.gallery_access_log ADD COLUMN gallery_id UUID;
    END IF;
  END IF;
END $$;

-- NOTE: After backfilling gallery_id values you can enforce NOT NULL:
-- ALTER TABLE public.gallery_images ALTER COLUMN gallery_id SET NOT NULL;
-- ALTER TABLE public.gallery_favorites ALTER COLUMN gallery_id SET NOT NULL;