# Client Portal Gallery - Quick Start 🚀

## 1. Install (30 seconds)

```bash
npm install cloudinary bcryptjs
npm install --save-dev @types/bcryptjs
```

## 2. Configure Cloudinary (2 minutes)

Add to `.env.local`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Get free credentials at: https://cloudinary.com/users/register/free

## 3. Run Migrations (1 minute)

In Supabase Dashboard → SQL Editor:
1. Run `migrations/008_client_galleries.sql`
2. Run `supabase/migrations/20251128_gallery_functions.sql`

## 4. Test It! (5 minutes)

1. Visit `/admin/galleries`
2. Click "New Gallery"
3. Create a test gallery with password "test123"
4. Upload a few images
5. Copy the gallery link
6. Open in incognito window
7. Enter password and view!

## Routes Created

### Admin
- `/admin/galleries` - Manage all galleries
- `/admin/galleries/[id]` - Upload & manage images

### Client Portal
- `/gallery/[accessCode]` - Beautiful client gallery viewer

### API
- `POST /api/admin/galleries` - Create gallery
- `GET /api/admin/galleries` - List galleries
- `POST /api/admin/galleries/[id]/images` - Upload images
- `POST /api/galleries/[accessCode]/access` - Verify password
- `POST /api/galleries/[accessCode]/favorites` - Track favorites
- `POST /api/galleries/[accessCode]/downloads` - Track downloads

## Features ✨

**Admin:**
- Create password-protected galleries
- Drag-and-drop multi-image upload
- Auto watermarking
- Analytics (views, downloads, favorites)
- Featured images
- Expiration dates

**Client:**
- Password protection
- Beautiful grid layout
- Lightbox with keyboard nav
- Favorite photos
- Download tracking
- Mobile responsive

## Next Steps

- Customize watermark in `app/api/admin/galleries/[id]/images/route.ts`
- Change colors in component files
- Add email notifications
- Integrate payment for purchases

See `CLIENT_PORTAL_SETUP.md` for complete documentation.
