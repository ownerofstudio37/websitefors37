# Updated Priority: Blogging & Availability Fixes - Dec 4, 2025

## Current Status Summary

### ✅ Security Migration DONE
Great! `20251202_fix_security_issues.sql` has been applied. RLS policies are now enforced.

### Your New Priorities

Based on your message, here's the revised focus:

| Item | Status | Impact | 
|------|--------|--------|
| **Blog Editor** | 🔴 Needs fixing | Content creation blocking |
| **AI Blog Writer** | 🔴 Needs fixing | Auto-generation broken |
| **Book Consultation Flow** | ⚠️ Needs config | 24 slots/day (10am-10pm) |
| **Get Quote Flow** | ⚠️ Needs config | 4 sessions/day, 7 days/week |
| **Book Session Flow** | ⚠️ Needs config | 4 sessions/day, 7 days/week |

---

## Detailed Analysis

### 1. 🔴 BLOG FEATURES (Highest Priority)

#### Blog Editor (`/admin/blog`)
**File**: `app/admin/blog/page.tsx` (1119 lines)
**Status**: Large, complex component needs debugging

**Known Issues to Investigate**:
- Content not saving properly
- Markdown editor integration issues
- Slug generation/validation
- Featured image upload issues
- SEO metadata handling

**API Endpoint**: 
- POST `/api/blog/save` — needs to exist or be created
- GET `/api/blog/posts` — fetching works

#### AI Blog Writer (`/admin/blog`)
**Files**: Multiple versions exist:
- `app/api/blog/generate/route.ts` — PRIMARY
- `app/api/blog/generate-fixed.ts` — Backup/fix attempt
- `app/api/blog/generate/route_new.ts` — Another variant

**Status**: 3 route files suggest previous failed attempts at fixing

**Known Issues**:
- Multiple conflicting implementations
- Gemini 3 API integration unclear
- Response parsing issues
- Content quality/format problems

**What Needs Fixing**:
```typescript
// Current flow (from route.ts):
1. User submits topic, keywords, tone, wordCount
2. POST /api/blog/generate
3. API calls generateBlogPost() from ai-client
4. Returns blog post JSON
5. Admin UI displays/saves

// Issues:
- generateBlogPost() may be incomplete
- Response structure unclear
- Error handling missing
- No streaming/status updates
```

---

### 2. ⚠️ AVAILABILITY/BOOKING FLOWS

Your requirements:
```
Book Consultation (/book-consultation)
├─ 24 slots per day
├─ 10am - 10pm (12 hours)
├─ 30-min slots = 24 slots
└─ 7 days/week

Book Session (/book-a-session)
├─ 4 sessions per day
├─ 7 days/week
└─ Flexible duration (30min-full day)

Get Quote (/get-quote)
├─ 4 sessions per day
└─ 7 days/week
```

#### Current Code Analysis

**API Route: `/api/availability/route.ts`** (193 lines)
```typescript
// CURRENT HARDCODED VALUES:
maxPhotoSessions = 4        ✅ Correct (4/day)
maxConsultationSlots = 26   ❌ WRONG (should be 24 for 10am-10pm)

// Issue:
// 26 slots = 8am-9pm (13 hours)
// You need: 24 slots = 10am-10pm (12 hours)
```

**Consultation Booking: `/api/consultation/book/route.ts`** (360 lines)
```typescript
// ISSUES FOUND:
1. Business hours check is incomplete (line ~95)
2. Weekend/weekday hours may be hardcoded wrong
3. Time slot generation logic unclear
4. Need to confirm: same hours for all 7 days?
```

**Consultation UI: `components/ConsultationBookingForm.tsx`** (567 lines)
```typescript
// ISSUES:
1. Fallback time generation (line ~110) uses hardcoded hours
2. generateTimeSlots() uses custom slot logic instead of calling API
3. Need to ensure it calls /api/consultation/book correctly
```

---

## Fix Action Items

### Phase 1: Availability Configuration (30 mins)

**File**: `app/api/availability/route.ts`

1. **Change consultation slots**: 26 → 24
2. **Adjust hours calculation**: 8am-9pm → 10am-10pm
3. **Verify all 7 days**: Should be same 24-slot availability

```diff
- const maxConsultationSlots = 26  // 8am to 9pm = 13 hours
+ const maxConsultationSlots = 24  // 10am to 10pm = 12 hours
```

**File**: `app/api/consultation/book/route.ts`

1. **Check business hours validation** (search for "Check business hours")
2. **Ensure**: 10am start, 10pm end for consultations
3. **Verify**: 7 days/week, no weekend restrictions for consultations

**File**: `components/ConsultationBookingForm.tsx`

1. **Fix fallback slot generation** (line ~110)
   - Change from `16.5` (4:30pm) start time to `10` (10am)
   - Change from `23` (11pm) end time to `22` (10pm)
2. **Remove weekend-only logic** if present

---

### Phase 2: Blog Editor Debugging (2-3 hours)

**Primary Task**: Get `/admin/blog` page working end-to-end

1. **Identify the blocker**:
   - Is save API broken? → Check if `POST /api/blog/save` exists
   - Is Markdown editor broken? → Check dynamic import
   - Is database issue? → Check `blog_posts` table RLS policies (recently enabled!)
   
2. **RLS Policy Check**: 
   ```sql
   -- These were JUST enabled in 20251202_fix_security_issues.sql
   -- Make sure they don't block admin writes
   SELECT * FROM pg_policies WHERE tablename = 'blog_posts';
   ```

3. **Test the flow**:
   - Create new blog post
   - Edit title → slug auto-generates
   - Write content in Markdown editor
   - Upload featured image
   - Save post
   - Verify in DB

---

### Phase 3: AI Blog Writer Fix (2-4 hours)

**Primary Task**: Clean up the 3 conflicting blog generation endpoints

1. **Decide which to use**:
   - `route.ts` — Currently imported in UI
   - `route-fixed.ts` — Appears to be a fix attempt
   - `route_new.ts` — Another variant

2. **Recommended approach**:
   - Delete the broken ones
   - Keep only ONE endpoint: `route.ts`
   - Fix the implementation

3. **Key fixes needed**:
   ```typescript
   // In app/api/blog/generate/route.ts
   
   // 1. Ensure generateBlogPost() is properly imported
   import { generateBlogPost } from "@/lib/ai-client"
   
   // 2. Check response structure matches UI expectations
   // Expected: { title, slug, content, excerpt, meta_description, featured_image, etc. }
   
   // 3. Add proper error handling
   // 4. Add structured logging (already done)
   // 5. Test with Gemini 3 API
   ```

4. **Test the flow**:
   - Go to `/admin/blog`
   - Click "Generate with AI"
   - Fill: topic, keywords, tone, wordCount
   - Watch logs in terminal
   - Verify response format
   - Check if content displays correctly

---

## Files to Create/Update

### New Files Needed
- ✅ None identified yet (may need blog save endpoint verification)

### Files to Update
1. `app/api/availability/route.ts` — Fix consultation slot count
2. `app/api/consultation/book/route.ts` — Verify business hours
3. `components/ConsultationBookingForm.tsx` — Fix time slot generation
4. `app/admin/blog/page.tsx` — Debug save/editor issues
5. `app/api/blog/generate/route.ts` — Clean up & fix AI generation

### Files to DELETE
- `app/api/blog/generate-fixed.ts` — Backup/failed attempt
- `app/api/blog/generate/route_new.ts` — Duplicate variant

---

## Database Impact Check

Since you just ran security migrations, verify:

1. **RLS Policies for blog_posts**:
   ```sql
   -- Check what policies exist
   SELECT * FROM pg_policies WHERE tablename = 'blog_posts';
   
   -- Admin should be able to write (check auth.role())
   ```

2. **RLS Policies for appointments**:
   ```sql
   -- Consultations/bookings rely on this
   SELECT * FROM pg_policies WHERE tablename = 'appointments';
   ```

3. **If admin can't save blog posts**:
   - RLS policy may be too restrictive
   - Add explicit policy for admin writes:
   ```sql
   CREATE POLICY admin_blog_writes ON blog_posts
     FOR ALL
     USING (auth.role() = 'authenticated')
     WITH CHECK (auth.role() = 'authenticated');
   ```

---

## Recommended Execution Order

1. **First (5 mins)**: Update availability limits
2. **Second (30 mins)**: Test booking flows work with new times
3. **Third (1-2 hours)**: Debug blog editor
4. **Fourth (2-3 hours)**: Fix AI blog writer
5. **Finally**: Delete backup files, verify everything works

---

## Quick Debug Commands

```bash
# Check for blog save endpoint
grep -r "POST.*blog.*save" app/api/

# Check blog-related endpoints
ls -la app/api/blog/

# Search for RLS issues with blog_posts
grep -r "blog_posts" supabase/migrations/

# Verify Gemini model is configured
echo $GOOGLE_GENAI_MODEL

# Check if ai-client exports generateBlogPost
grep "export.*generateBlogPost" lib/ai-client.ts
```

---

## Notes for AI Agents

When you ask for help fixing these:

✅ **For Availability**:
- Simple config change (24 slots, 10am-10pm)
- Touch 3 files max
- Test with booking flow

✅ **For Blog Editor**:
- Start by checking if `/api/blog/save` exists
- If not, may need to create it
- Check RLS policies on blog_posts table
- Verify Markdown editor dynamic import works

✅ **For AI Blog Writer**:
- Consolidate the 3 route files into 1
- Verify `generateBlogPost()` in `lib/ai-client.ts` exists
- Test response format matches UI expectations
- Enable verbose logging to debug Gemini API calls

---

## Success Criteria

When you're done:

- [ ] Can create new consultation bookings with 24 slots (10am-10pm)
- [ ] Can book photo sessions (4 slots/day)
- [ ] Can create blog post in admin UI
- [ ] Blog editor saves to database
- [ ] Can generate blog with AI
- [ ] Generated content displays correctly
- [ ] No conflicts between 3 blog generate files

