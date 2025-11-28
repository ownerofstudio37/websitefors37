# Client Portal Gallery System - Setup Guide 🎨

## What You Got

A complete, production-ready client photo gallery system with:

### Admin Features (/admin/galleries)
- 🎯 **Create Private Galleries** - Password-protected collections for each client
- 📸 **Drag-and-Drop Upload** - Multi-image upload with automatic processing
- 🔒 **Access Management** - Unique access codes and password protection
- 📊 **Analytics** - Track views, favorites, and downloads
- ⚙️ **Gallery Settings** - Control downloads, expiration, and purchase requirements
- ⭐ **Featured Images** - Mark special photos
- 🗑️ **Bulk Management** - Delete and organize with ease

### Client Portal (/gallery/[accessCode])
- 🔐 **Password Protection** - Secure access with beautiful auth screen
- 🖼️ **Stunning Gallery Grid** - Responsive masonry layout
- 🔍 **Lightbox Viewer** - Full-screen image viewing with keyboard navigation
- ❤️ **Favorites System** - Let clients save their favorite photos
- 💾 **Download Tracking** - Optional watermarked/full-res downloads
- 📱 **Mobile Optimized** - Perfect on all devices
- ✨ **Smooth Animations** - Framer Motion powered transitions

## Installation Steps

### 1. Install Dependencies

```bash
npm install cloudinary bcryptjs
npm install --save-dev @types/bcryptjs
```

### 2. Environment Variables

Add to your `.env.local`:

```env
# Cloudinary Configuration (for image hosting)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Get Cloudinary Credentials:**
1. Sign up at https://cloudinary.com (free tier: 25GB storage, 25GB bandwidth/month)
2. Dashboard → Settings → Access Keys
3. Copy Cloud Name, API Key, and API Secret

### 3. Run Database Migrations

```bash
# Run the gallery schema migration (already exists)
# migrations/008_client_galleries.sql

# Run the helper functions migration
# supabase/migrations/20251128_gallery_functions.sql
```

Apply to Supabase:
```bash
# In Supabase Dashboard → SQL Editor, run:
cat migrations/008_client_galleries.sql | pbcopy  # paste into SQL editor
cat supabase/migrations/20251128_gallery_functions.sql | pbcopy  # paste into SQL editor
```

### 4. Update Next.js Config (if needed)

Verify `next.config.js` has Cloudinary in image remotePatterns:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**',
    },
    // ...other patterns
  ]
}
```

## Usage Guide

### Creating a Gallery

1. **Go to Admin** → `/admin/galleries`
2. **Click "New Gallery"**
3. **Fill in details:**
   - Client name and email
   - Gallery title (e.g., "Smith Wedding - October 2024")
   - Session type (wedding, portrait, family, commercial, event)
   - Session date
   - Description (optional)
   - **Password** (clients will need this to access)
   - Download settings
   - Expiration (days)

4. **Click "Create Gallery"**
   - You'll get a unique access code (e.g., `john-doe-abc123`)
   - Share the link with your client: `https://yourdomain.com/gallery/john-doe-abc123`

### Uploading Photos

1. **Open gallery** → Click "Manage" on any gallery card
2. **Drag & drop images** or click to upload
3. **Images are automatically:**
   - Uploaded to Cloudinary
   - Optimized (max 2000x2000)
   - Thumbnail generated (400x400)
   - Watermarked version created (with "© Studio37")
4. **Mark featured photos** by clicking the star icon
5. **Delete photos** with the trash icon

### Client Experience

1. **Client receives link** (via email or message)
2. **Enters password** on beautiful auth screen
3. **Views gallery** with smooth animations
4. **Can favorite photos** by clicking hearts
5. **Can download** (if enabled) - tracks automatically
6. **Switch between "All Photos" and "Favorites"**
7. **Full-screen lightbox** with keyboard navigation (←/→ arrows, ESC to close)

## File Structure

```
app/
├── admin/
│   └── galleries/
│       ├── page.tsx              # Gallery list & create
│       └── [id]/
│           └── page.tsx          # Gallery management
├── gallery/
│   └── [accessCode]/
│       └── page.tsx              # Client portal viewer
└── api/
    ├── admin/
    │   └── galleries/
    │       ├── route.ts          # List & create galleries
    │       └── [id]/
    │           ├── route.ts      # Get/update/delete gallery
    │           └── images/
    │               ├── route.ts  # Upload images
    │               └── [imageId]/
    │                   └── route.ts  # Update/delete image
    └── galleries/
        └── [accessCode]/
            ├── access/
            │   └── route.ts      # Password verification
            ├── favorites/
            │   └── route.ts      # Track favorites
            └── downloads/
                └── route.ts      # Track downloads
```

## Database Schema

Already created by `migrations/008_client_galleries.sql`:

- **galleries** - Gallery metadata, passwords, settings
- **gallery_images** - Image files with Cloudinary URLs
- **gallery_favorites** - Client favorite selections
- **gallery_downloads** - Download tracking
- **gallery_access_log** - Security audit trail

## Features Breakdown

### Security
- ✅ Bcrypt password hashing
- ✅ Access logging (IP, user agent, timestamp)
- ✅ Gallery expiration dates
- ✅ Session-based favorite tracking
- ✅ RLS policies on all tables

### Image Optimization
- ✅ Automatic resizing (2000px max)
- ✅ Thumbnail generation (400px)
- ✅ Watermarking (bottom-right corner)
- ✅ Multiple format support (JPG, PNG, WEBP)
- ✅ CDN delivery via Cloudinary

### Analytics
- ✅ View count per gallery
- ✅ View count per image
- ✅ Favorite count per image
- ✅ Download count per image & gallery
- ✅ Access logs with IP tracking

### User Experience
- ✅ Drag-and-drop upload
- ✅ Bulk operations
- ✅ Keyboard navigation in lightbox
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Loading states
- ✅ Error handling

## Testing Checklist

- [ ] Create a test gallery
- [ ] Upload 5-10 test images
- [ ] Mark 2-3 as featured
- [ ] Copy gallery link
- [ ] Open in incognito/private window
- [ ] Test password entry
- [ ] View images in grid
- [ ] Open lightbox, test keyboard navigation
- [ ] Favorite 3 images
- [ ] Switch to "Favorites" view
- [ ] Test download (if enabled)
- [ ] Check admin analytics updated

## Customization

### Change Watermark
Edit `app/api/admin/galleries/[id]/images/route.ts`:

```typescript
const watermarkedUrl = cloudinary.url(uploadResult.public_id, {
  transformation: [
    { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
    {
      overlay: 'text:Arial_40_bold:© Your Brand',  // ← Change this
      gravity: 'south_east',
      x: 20,
      y: 20,
      opacity: 50
    }
  ]
})
```

### Change Colors
Edit component files, look for `bg-indigo-600`, `bg-purple-600`, etc. and replace with your brand colors.

### Add Purchase Flow
The schema already supports `require_purchase` flag. You can integrate:
- Stripe/PayPal for payments
- Mark images as "purchased"
- Unlock full-res downloads after payment

## Troubleshooting

**Images not uploading?**
- Check Cloudinary credentials in `.env.local`
- Verify Cloudinary account is active
- Check browser console for errors

**Password doesn't work?**
- Passwords are case-sensitive
- Make sure you're using the exact password from creation

**Gallery link doesn't work?**
- Access code must match exactly
- Check gallery status is "active"
- Verify gallery hasn't expired

**Images not loading?**
- Check Cloudinary URLs in database
- Verify `next.config.js` has Cloudinary in remotePatterns
- Check browser console for CORS errors

## Next Steps

1. **Email Templates** - Send gallery links automatically after upload
2. **Purchase Integration** - Add Stripe for photo purchases
3. **Bulk Download** - Let clients download all favorites as ZIP
4. **Print Shop** - Integrate with print services (Printful, etc.)
5. **Custom Branding** - White-label option for pro photographers
6. **Mobile App** - Native iOS/Android apps

## Support

Need help? Check:
- Cloudinary docs: https://cloudinary.com/documentation
- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs

---

**You now have a professional client portal system! 🎉**

Share gallery links confidently and let your clients enjoy a premium photo viewing experience.
