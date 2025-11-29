# 📸 Client Galleries & Portals - Complete Setup Guide

## Overview

You have **TWO** complementary systems for working with clients:

### 1. **Client Galleries** 🎨
Password-protected photo delivery galleries where clients can:
- View their photos in a beautiful interface
- Mark favorites
- Download images (if enabled)
- No login required - just access code + password

**Best for:** Photo delivery, proofing, selections

### 2. **Client Portals** 👤
Full client accounts where clients can:
- Log in with email/password
- View all their projects and bookings
- Access multiple galleries linked to their account
- Message you directly
- Track payment status

**Best for:** Ongoing client relationships, multiple projects, communication

---

## 🚀 Quick Setup Checklist

### Step 1: Run Database Migrations

You need to run TWO migrations in your Supabase SQL Editor:

#### Migration 1: Client Galleries System
```sql
-- Run this file in Supabase SQL Editor:
-- supabase/migrations/2025-11-29_client_galleries_system.sql
```

This creates:
- ✅ `galleries` - Gallery metadata, access codes, passwords
- ✅ `gallery_images` - Photos with Cloudinary URLs
- ✅ `gallery_favorites` - Client selections
- ✅ `gallery_downloads` - Download tracking
- ✅ `gallery_access_log` - Security audit trail

#### Migration 2: Client Portal System
```sql
-- Run this file in Supabase SQL Editor:
-- supabase/migrations/2025-11-29_client_portal_system.sql
```

This creates:
- ✅ `client_portal_users` - Client login accounts
- ✅ `client_projects` - Projects/bookings
- ✅ `client_messages` - Two-way messaging
- ✅ `client_portal_sessions` - Login session tracking

### Step 2: Verify Environment Variables

Make sure you have in `.env.local`:

```bash
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Server-only

# Cloudinary (required for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_preset  # Create in Cloudinary dashboard

# Resend (optional - for sending gallery links via email)
RESEND_API_KEY=your_resend_key
```

### Step 3: Test the Features

1. **Visit Admin Dashboard:** `http://localhost:3000/admin`
2. **Test Client Galleries:** Go to `Admin → Client Galleries`
3. **Test Client Portals:** Go to `Admin → Client Portals`

---

## 📚 Usage Guides

### Creating a Client Gallery (Simple Photo Delivery)

**Use this when:** Client just needs to view/download photos from one session

1. Go to `/admin/galleries`
2. Click **"New Gallery"**
3. Fill in:
   - Client name and email
   - Gallery title (e.g., "Smith Wedding - October 2024")
   - Session type and date
   - **Password** (client will need this)
   - Download settings
   - Expiration (optional)
4. Click **"Create Gallery"**
5. You'll get a unique access code (e.g., `smith-wedding-abc123`)
6. Share with client: `https://yourdomain.com/gallery/smith-wedding-abc123`

**To upload photos:**
1. Click on the gallery in the list
2. Drag & drop images OR click to upload
3. Images are automatically uploaded to Cloudinary
4. Thumbnails and watermarks are generated

**Client experience:**
1. Client visits the gallery link
2. Enters password
3. Views photos in beautiful grid
4. Can favorite images
5. Downloads (if you enabled it)

---

### Creating a Client Portal Account (Full Client Relationship)

**Use this when:** Client will have multiple projects, needs messaging, wants to track everything

1. Go to `/admin/client-portals`
2. Click **"Create Portal Access"**
3. Fill in:
   - First & last name
   - Email
   - Phone (optional)
   - Password (client's login password)
   - Link to existing Lead (optional)
4. Click **"Create User"**

**Client can now:**
- Log in at `/portal/login` (you'll need to create this page)
- See all their projects
- View galleries linked to their projects
- Message you
- Track payments

**To create a project for a client:**
1. Go to `/admin/client-portals/[userId]/projects`
2. Click **"New Project"**
3. Fill in project details:
   - Name (e.g., "Fall Family Session")
   - Type (portrait, wedding, etc.)
   - Session date
   - Package and pricing
   - Link a gallery (optional)
4. Save

---

## 🔗 Linking Galleries to Portal Accounts

You can connect galleries to portal accounts for a complete experience:

### Option 1: Create standalone gallery (quick delivery)
```typescript
// Just create the gallery - no portal account needed
POST /api/admin/galleries
{
  "client_name": "John Smith",
  "client_email": "john@example.com",
  "title": "Summer Portraits",
  "password": "secure123"
}
```

### Option 2: Create portal account + project + gallery (full service)
```typescript
// 1. Create portal user
POST /api/admin/client-portals
{
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Smith",
  "password": "clientpass"
}

// 2. Create project for that user
POST /api/admin/client-portals/[userId]/projects
{
  "name": "Summer Portraits",
  "type": "portrait",
  "session_date": "2025-06-15"
}

// 3. Create gallery and link to project
POST /api/admin/galleries
{
  "client_name": "John Smith",
  "client_email": "john@example.com",
  "title": "Summer Portraits",
  "password": "secure123",
  "project_id": "[project-id]"  // Links it
}
```

---

## 🎯 Routes & Files

### Admin Routes

**Client Galleries (Photo Delivery):**
- `/admin/galleries` - List all galleries, create new
- `/admin/galleries/[id]` - Upload/manage photos for a gallery

**Client Portals (Account Management):**
- `/admin/client-portals` - List all portal users
- `/admin/client-portals/[id]` - View user details
- `/admin/client-portals/[id]/projects` - Manage user's projects

### Client-Facing Routes

**Galleries (Public with password):**
- `/gallery/[accessCode]` - Beautiful photo viewer
  - No login required
  - Just needs password

**Portal (Authenticated client area) - TODO:**
- `/portal/login` - Client login page
- `/portal/dashboard` - Client's projects overview
- `/portal/projects/[id]` - Project details & gallery
- `/portal/messages` - Messaging with studio

### API Routes

**Gallery APIs:**
- `GET/POST /api/admin/galleries` - List/create galleries
- `GET/PATCH/DELETE /api/admin/galleries/[id]` - Manage gallery
- `POST /api/admin/galleries/[id]/images` - Upload images
- `POST /api/galleries/[accessCode]/access` - Verify password
- `POST /api/galleries/[accessCode]/favorites` - Toggle favorite
- `POST /api/galleries/[accessCode]/downloads` - Track download

**Portal APIs:**
- `GET/POST /api/admin/client-portals` - List/create users
- `GET/PATCH /api/admin/client-portals/[id]` - Manage user
- `GET/POST /api/admin/client-portals/[id]/projects` - Manage projects

---

## 🔧 What's Already Built

### ✅ Completed Features

**Client Galleries:**
- ✅ Admin UI for creating galleries
- ✅ Admin UI for uploading photos (Cloudinary)
- ✅ Client gallery viewer with password protection
- ✅ Favorites system
- ✅ Download tracking
- ✅ Access logging for security
- ✅ Beautiful responsive design with Framer Motion
- ✅ Lightbox for viewing full images
- ✅ Grid/carousel views

**Client Portals:**
- ✅ Admin UI for managing portal users
- ✅ Admin UI for creating projects
- ✅ Database schema for users, projects, messages
- ✅ API endpoints for all operations

### 🚧 What's Missing (Need to Build)

**Client Portal Frontend:**
- ❌ `/portal/login` page (client login form)
- ❌ `/portal/dashboard` page (list projects)
- ❌ `/portal/projects/[id]` page (project details + gallery access)
- ❌ `/portal/messages` page (messaging UI)
- ❌ Client authentication middleware
- ❌ Session management for clients

**Nice-to-Haves:**
- ❌ Email notifications when gallery is ready
- ❌ Email template: "Your photos are ready!"
- ❌ Automatic email with access link + password
- ❌ Bulk download (ZIP all favorites)
- ❌ Purchase integration (Stripe for photo purchases)
- ❌ Custom branding per gallery

---

## 🚀 Next Steps

### Priority 1: Finish Client Portal Frontend (if you want full portal)

Create these pages to complete the client portal experience:

1. **Login page** (`app/portal/login/page.tsx`)
   - Email/password form
   - "Forgot password" link
   - Redirect to dashboard after login

2. **Dashboard** (`app/portal/dashboard/page.tsx`)
   - List all client's projects
   - Show status, dates, payments
   - Links to individual projects

3. **Project detail** (`app/portal/projects/[id]/page.tsx`)
   - Project info
   - Payment status
   - Access to gallery (if linked)
   - Messaging section

4. **Authentication middleware**
   - Session management for clients
   - Protect `/portal/**` routes
   - Similar to admin auth but for clients

### Priority 2: Email Automation

Add email notifications for galleries:

1. **Create email template** (`emails/GalleryReady.tsx`)
   ```tsx
   import { Html, Button, Text } from '@react-email/components'
   
   export default function GalleryReady({ 
     clientName, 
     galleryTitle, 
     accessLink, 
     password 
   }) {
     return (
       <Html>
         <Text>Hi {clientName}!</Text>
         <Text>Your photos from {galleryTitle} are ready!</Text>
         <Button href={accessLink}>View Gallery</Button>
         <Text>Password: {password}</Text>
       </Html>
     )
   }
   ```

2. **Send after gallery creation**
   - Add to `app/api/admin/galleries/route.ts`
   - Use Resend to send email
   - Include access link + password

### Priority 3: Enhanced Features

- **Bulk download:** ZIP all favorites
- **Shopping cart:** Stripe integration for photo purchases
- **Print fulfillment:** Integrate with Printful/Printique
- **Mobile app:** React Native client portal app

---

## 💡 Recommended Workflow

### For Quick Photo Delivery (No portal needed):
```
1. Shoot completed
2. Edit & export photos
3. Create gallery in admin (`/admin/galleries`)
4. Upload photos (drag & drop)
5. Share link + password with client (email/text)
6. Client views, favorites, downloads
```

### For Full-Service Clients (Portal accounts):
```
1. Client books → Create portal account
2. Create project for the booking
3. Shoot completed → Create gallery
4. Link gallery to project
5. Client logs into portal
6. Sees project with gallery access
7. Can message you, track payment, download
```

---

## 🔐 Security Notes

### Gallery Passwords
- Passwords are bcrypt hashed before storage
- Password check happens server-side (API route)
- Access codes are URL-friendly (no special chars)
- Access logs track all login attempts

### Portal Authentication
- Client passwords should be strong (add validation)
- Sessions expire after inactivity
- IP address tracking for security
- Optional 2FA can be added

### File Security
- Cloudinary URLs can be signed (optional)
- Watermarks for preview (full-res only after download)
- Download limits can be enforced
- Consider purchase requirement before downloads

---

## 📊 Database Schema Reference

### Client Galleries Tables

**galleries**
- `id`, `client_name`, `client_email`
- `title`, `description`, `session_type`, `session_date`
- `access_code`, `password_hash`, `status`, `expires_at`
- `allow_downloads`, `require_purchase`, `watermark_enabled`
- `total_photos`, `views_count`, `downloads_count`

**gallery_images**
- `id`, `gallery_id`
- `cloudinary_url`, `thumbnail_url`, `watermarked_url`
- `filename`, `caption`, `width`, `height`, `file_size`, `format`
- `is_featured`, `sequence_number`
- `views_count`, `favorite_count`, `download_count`

**gallery_favorites**
- `id`, `gallery_id`, `image_id`
- `client_email`, `session_token`, `notes`

**gallery_downloads**
- `id`, `gallery_id`, `image_id`
- `client_email`, `session_token`, `ip_address`, `user_agent`

**gallery_access_log**
- `id`, `gallery_id`, `access_type`
- `ip_address`, `user_agent`, `success`, `error_message`

### Client Portal Tables

**client_portal_users**
- `id`, `email`, `password_hash`
- `first_name`, `last_name`, `phone`, `company`
- `is_active`, `last_login_at`, `email_verified`
- `avatar_url`, `timezone`, `notification_preferences`

**client_projects**
- `id`, `client_user_id`, `name`, `type`, `description`
- `status`, `session_date`, `due_date`, `completed_at`
- `package_name`, `total_amount_cents`, `paid_amount_cents`, `payment_status`
- `cover_image_url`, `tags`

**client_messages**
- `id`, `project_id`, `client_user_id`
- `sender_type`, `message`, `is_read`, `attachments`

**client_portal_sessions**
- `id`, `client_user_id`, `token`
- `ip_address`, `user_agent`, `expires_at`

---

## 🎓 Pro Tips

1. **Gallery Expiration:** Set realistic expiration dates (90-120 days). Send reminder emails before expiration.

2. **Favorites:** Encourage clients to favorite their selections. Use this for print orders or album design.

3. **Watermarks:** Use subtle watermarks on preview images. Remove for purchased/downloaded versions.

4. **Organization:** Use consistent naming for galleries (format: "ClientName - SessionType - Date")

5. **Communication:** If using portals, add messaging for seamless communication during the selection process.

6. **Mobile:** Both gallery viewer and portal should be mobile-responsive. Test on phones!

7. **Performance:** Use Cloudinary transformations for responsive images (different sizes for mobile/desktop).

8. **Analytics:** Track which images are favorited most - helps understand your best work!

---

## 🐛 Troubleshooting

### Gallery images not uploading?
- Check Cloudinary credentials in `.env.local`
- Verify upload preset exists and is unsigned
- Check browser console for errors
- Verify `next.config.js` has Cloudinary in `remotePatterns`

### Client can't access gallery?
- Verify access code is correct (case-sensitive)
- Check password is correct (case-sensitive)
- Verify gallery status is "active" not "expired"
- Check expiration date hasn't passed

### Portal user can't log in?
- Need to build `/portal/login` page first (not built yet)
- Verify email and password are correct
- Check `is_active` is true in database
- Verify session management is set up

### Images not loading?
- Check Cloudinary URLs in database
- Verify network tab in browser
- Check CORS settings if using custom domain
- Verify Cloudinary account is active

---

## 📞 Support & Next Actions

**What works right now:**
✅ Client galleries (photo delivery)
✅ Admin management of galleries
✅ Client portal backend (API + database)
✅ Admin management of portal users

**What to build next:**
1. Client portal frontend pages (`/portal/*`)
2. Email notifications for gallery delivery
3. Bulk download feature
4. Purchase/payment integration

**Need help?** Check these files:
- Gallery viewer: `app/gallery/[accessCode]/page.tsx`
- Admin gallery UI: `app/admin/galleries/page.tsx`
- Admin portal UI: `app/admin/client-portals/page.tsx`
- Database schemas: `supabase/migrations/2025-11-29_*.sql`

---

Ready to finish the setup? Run those two migrations in Supabase, verify your env vars, and you're good to go! 🚀
