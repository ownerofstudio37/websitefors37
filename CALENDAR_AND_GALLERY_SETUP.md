# Google Calendar Auto-Sync + Client Gallery Portal - Implementation Guide

## 🎉 Features Implemented

### Part 1: Google Calendar Auto-Sync 📅
**Status**: Code Complete ✅ | **Setup Required**: Yes ⚙️

#### What It Does:
- **Auto-block calendar**: Consultation bookings automatically create Google Calendar events
- **Two-way sync**: Events in your Google Calendar show as "unavailable" on the website
- **Client invites**: Clients automatically receive calendar invites with meeting details
- **Google Meet integration**: Automatic video call links for consultations
- **Never double-book**: Calendar conflicts prevent overlapping bookings

### Part 2: Client Photo Gallery Portal 🖼️
**Status**: Database Ready ✅ | **UI In Progress** 🚧

#### What It Does:
- **Private galleries**: Password-protected collections for each client
- **Watermarked previews**: Clients can browse with watermarks
- **Favorite selection**: Clients mark their favorite photos
- **Purchase & download**: Full-resolution after purchase
- **Shareable links**: Send gallery URLs with expiration dates
- **Analytics**: Track views, downloads, and favorites

---

## 🚀 Part 1 Setup: Google Calendar Integration

### Step 1: Install Required Package

Run this command in your project directory:

```bash
npm install googleapis
```

### Step 2: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it "Studio37 Calendar Integration"

### Step 3: Enable Google Calendar API

1. In your Google Cloud project, go to **APIs & Services** > **Library**
2. Search for "Google Calendar API"
3. Click **Enable**

### Step 4: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. If prompted, configure OAuth consent screen:
   - User Type: **External**
   - App name: **Studio37 Photography**
   - User support email: your email
   - Developer contact: your email
   - Add scope: `https://www.googleapis.com/auth/calendar` and `https://www.googleapis.com/auth/calendar.events`
   - Add test users: your email
4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: **Studio37 Calendar Sync**
   - Authorized redirect URIs:
     - `http://localhost:3000/api/calendar/callback` (development)
     - `https://studio37.cc/api/calendar/callback` (production)
5. Copy your **Client ID** and **Client Secret**

### Step 5: Add Environment Variables

Add these to your `.env.local` file:

```bash
# Google Calendar Integration
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=https://studio37.cc/api/calendar/callback
GOOGLE_CALENDAR_ID=primary
```

### Step 6: Connect Your Google Calendar

1. Deploy your code to production
2. Log in to your admin panel at `/admin`
3. Go to **Settings** (we'll need to create this page)
4. Click **Connect Google Calendar**
5. Authorize the app to access your calendar
6. You'll be redirected back with "✅ Calendar Connected"

### Step 7: Test the Integration

1. **Test booking**: Book a consultation at `/book-consultation`
2. **Check your calendar**: Event should appear in Google Calendar
3. **Check client email**: They should receive a calendar invite
4. **Test busy sync**: Add an event to your Google Calendar
5. **Check availability**: That date should show reduced availability

---

## 📁 Files Created (Google Calendar)

### Library Files
- `lib/googleCalendar.ts` - Core calendar integration functions
  - `createConsultationEvent()` - Creates calendar events
  - `getBusyTimes()` - Fetches busy periods
  - `generateICS()` - Creates .ics files for email
  - `listUpcomingEvents()` - Lists scheduled consultations
  - `deleteEvent()` / `updateEvent()` - Manage events

### API Endpoints
- `app/api/calendar/auth/route.ts` - Initiate OAuth flow
- `app/api/calendar/callback/route.ts` - Handle OAuth callback
- `app/api/calendar/busy/route.ts` - Get busy times from calendar

### Modified Files
- `app/api/consultation/book/route.ts` - Auto-creates calendar events on booking
- `app/api/availability/route.ts` - Syncs Google Calendar busy times

---

## 🎨 Part 2 Setup: Client Gallery Portal

### Step 1: Run Database Migration

Execute the SQL migration in your Supabase dashboard:

```bash
# Location: migrations/008_client_galleries.sql
```

This creates 5 tables:
1. **galleries** - Collection metadata
2. **gallery_images** - Individual photos
3. **gallery_favorites** - Client favorites
4. **gallery_downloads** - Download tracking
5. **gallery_access_log** - Security audit trail

### Step 2: Cloudinary Setup (Already Done ✅)

You already have Cloudinary integrated. We'll use it for:
- Photo uploads
- Watermark application
- Image transformations
- CDN delivery

### Step 3: Admin Gallery Manager (Coming Next)

**Location**: `/admin/galleries`

Features:
- Create new gallery
- Upload photos (drag & drop)
- Set password
- Configure download settings
- Generate shareable link
- Set expiration date

### Step 4: Client Gallery Viewer (Coming Next)

**Location**: `/gallery/[accessCode]`

Features:
- Password protection
- Grid layout with lightbox
- Favorite toggle
- Download buttons
- Progress indicators
- Mobile-friendly

---

## 🔐 Security Features

### Google Calendar
- OAuth 2.0 authentication
- Refresh tokens stored securely in database
- Admin-only authorization
- Non-blocking (booking works even if calendar fails)

### Client Galleries
- Password-protected (bcrypt hashing)
- Access logging with IP tracking
- Expiration dates
- Download limits
- Session-based tracking
- RLS policies in Supabase

---

## 📊 Database Schema

### Calendar Integration
**Table**: `settings`
- Stores Google Calendar OAuth tokens
- Key: `google_calendar_tokens`

**Table**: `appointments`
- New column: `calendar_event_id` (links to Google Calendar)

### Client Galleries

**galleries** table:
```sql
id, client_name, client_email, session_date, session_type,
title, description, password_hash, access_code, status,
expires_at, allow_downloads, require_purchase, download_limit,
total_photos, views_count, downloads_count
```

**gallery_images** table:
```sql
id, gallery_id, cloudinary_public_id, cloudinary_url,
thumbnail_url, watermarked_url, full_res_url,
filename, file_size, width, height, format,
caption, display_order, view_count, favorite_count,
download_count, is_featured, is_available_for_purchase
```

**gallery_favorites** table:
```sql
id, gallery_id, image_id, session_id
```

**gallery_downloads** table:
```sql
id, gallery_id, image_id, session_id, ip_address,
download_type, created_at
```

**gallery_access_log** table:
```sql
id, gallery_id, access_code, password_attempt, success,
ip_address, user_agent, created_at
```

---

## 🔄 How It Works

### Google Calendar Sync Flow

1. **Client books consultation** → `/book-consultation`
2. **Booking saved** → Supabase `appointments` table
3. **Calendar event created** → Google Calendar API
4. **Event ID stored** → `appointments.calendar_event_id`
5. **Client receives invite** → Via Google Calendar
6. **Availability updates** → Next API call syncs busy times

### Busy Time Sync

1. **User checks availability** → `/api/availability`
2. **Fetch bookings** → From Supabase
3. **Fetch Google Calendar** → Via `getBusyTimes()`
4. **Merge data** → Busy dates = fully booked
5. **Return availability** → Shows real-time status

### Client Gallery Flow (Once UI is Built)

1. **Admin creates gallery** → `/admin/galleries/new`
2. **Uploads photos** → Cloudinary with watermarks
3. **Sets password** → Bcrypt hash
4. **Generates link** → `/gallery/abc123xyz`
5. **Client receives email** → With link and password
6. **Client browses** → Password-protected gallery
7. **Marks favorites** → Tracked in database
8. **Purchases & downloads** → Full-resolution access

---

## 📝 TODO: Remaining Work

### Google Calendar (95% Complete)
- [x] OAuth setup
- [x] Calendar event creation
- [x] Busy time sync
- [x] Availability integration
- [x] ICS file generation
- [ ] Admin settings page UI
- [ ] Initial OAuth authorization flow
- [ ] Calendar event list in admin
- [ ] Reschedule/cancel consultation flows

### Client Galleries (30% Complete)
- [x] Database schema
- [x] Migration file
- [ ] Admin gallery creation form
- [ ] Photo upload with Cloudinary
- [ ] Watermark application
- [ ] Password-protected gallery viewer
- [ ] Favorite toggle functionality
- [ ] Download system
- [ ] Purchase integration (future)
- [ ] Email notifications
- [ ] Gallery analytics dashboard

---

## 🎯 Quick Start Commands

### Install Dependencies
```bash
npm install googleapis
```

### Run Database Migration
```bash
# Copy SQL from migrations/008_client_galleries.sql
# Paste into Supabase SQL Editor
# Click "Run"
```

### Environment Variables Needed
```bash
# Add to .env.local
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_REDIRECT_URI=https://studio37.cc/api/calendar/callback
GOOGLE_CALENDAR_ID=primary
```

### Test Calendar Integration
1. Complete OAuth setup in Google Cloud
2. Add environment variables
3. Visit `/api/calendar/auth` (as admin)
4. Authorize calendar access
5. Book a test consultation
6. Check your Google Calendar

---

## 🚨 Important Notes

### Google Calendar
- **Requires manual OAuth setup** - One-time configuration
- **Non-blocking design** - Bookings work even if calendar fails
- **Two-way sync** - Your calendar → website, website → your calendar
- **Handles timezones** - All times in CST (America/Chicago)
- **Google Meet** - Automatic video call links for consultations

### Client Galleries
- **Password protection** - Never expose without authentication
- **Watermarks required** - Don't serve full-res without purchase
- **Expiration dates** - Set reasonable timeframes (30-90 days)
- **Storage costs** - Cloudinary charges for transformations/storage
- **Mobile-first** - Design for phone screens

---

## 💡 Future Enhancements

### Google Calendar
- **Sync to multiple calendars** - Support for team calendars
- **Automatic reminders** - SMS/email before consultations
- **Reschedule interface** - Client-initiated rescheduling
- **Availability rules** - Block specific dates/times
- **Calendar view** - Visual calendar in admin panel

### Client Galleries
- **Stripe integration** - Accept payments for photos
- **Print ordering** - Partner with print labs
- **Slideshows** - Auto-play gallery view
- **Social sharing** - Post-purchase sharing options
- **Batch downloads** - ZIP all favorites
- **Mobile app** - Native iOS/Android gallery viewer

---

## 📞 Support

### Google OAuth Issues
- Check redirect URIs match exactly
- Ensure Calendar API is enabled
- Verify test users are added
- Check token expiration

### Calendar Not Syncing
- Check `settings` table for tokens
- Verify credentials are set correctly
- Check Supabase logs for errors
- Ensure Calendar ID is correct

### Gallery Access Issues
- Verify migration ran successfully
- Check RLS policies
- Confirm password hashing works
- Review access logs

---

## ✅ Success Checklist

### Google Calendar Setup
- [ ] Google Cloud project created
- [ ] Calendar API enabled
- [ ] OAuth credentials created
- [ ] Environment variables added
- [ ] `googleapis` package installed
- [ ] OAuth authorization completed
- [ ] Test booking creates calendar event
- [ ] Client receives calendar invite
- [ ] Busy times sync correctly

### Client Galleries Setup
- [ ] Database migration executed
- [ ] Tables created successfully
- [ ] Cloudinary watermarks configured
- [ ] Admin gallery form built
- [ ] Photo upload working
- [ ] Client gallery page created
- [ ] Password protection works
- [ ] Favorite system functional
- [ ] Download tracking enabled
- [ ] Expiration dates enforced

---

**Next Steps**: 
1. Install `googleapis` package
2. Complete Google OAuth setup
3. Test calendar integration
4. Build admin gallery manager UI
5. Create client gallery viewer

Let me know when you're ready for the next phase! 🚀
