# 🔧 Table Name Update Required

## ⚠️ IMPORTANT: Table Name Conflict Resolved

The original migration tried to create tables named `galleries` and `gallery_images`, but these **already exist** in your database for the public website gallery feature.

### ✅ Solution: New Table Names

The migration has been updated to use **client-specific** table names:

| Old Name (Conflicted) | New Name (Fixed) |
|----------------------|------------------|
| `galleries` | `client_galleries` |
| `gallery_images` | `client_gallery_images` |
| `gallery_favorites` | `client_gallery_favorites` |
| `gallery_downloads` | `client_gallery_downloads` |
| `gallery_access_log` | `client_gallery_access_log` |

### 📝 Migration File Updated

✅ **File:** `supabase/migrations/2025-11-29_client_galleries_system.sql`

This migration is now safe to run without conflicts.

---

## 🔄 Code Updates Needed

Since the table names changed, we need to update the API routes and admin pages that reference them.

### Files to Update:

1. **`app/api/admin/galleries/route.ts`** - Change all `galleries` → `client_galleries`
2. **`app/api/admin/galleries/[id]/route.ts`** - Change table references
3. **`app/api/admin/galleries/[id]/images/route.ts`** - Change `gallery_images` → `client_gallery_images`
4. **`app/api/admin/galleries/[id]/images/[imageId]/route.ts`** - Change table references
5. **`app/api/galleries/[accessCode]/access/route.ts`** - Change table references
6. **`app/api/galleries/[accessCode]/favorites/route.ts`** - Change table references
7. **`app/api/galleries/[accessCode]/downloads/route.ts`** - Change table references
8. **`supabase/migrations/20251128_gallery_functions.sql`** - Update helper functions

### Quick Find & Replace:

In all files under `app/api/admin/galleries/` and `app/api/galleries/`:

```typescript
// Find:
.from('galleries')
// Replace with:
.from('client_galleries')

// Find:
.from('gallery_images')
// Replace with:
.from('client_gallery_images')

// Find:
.from('gallery_favorites')
// Replace with:
.from('client_gallery_favorites')

// Find:
.from('gallery_downloads')
// Replace with:
.from('client_gallery_downloads')

// Find:
.from('gallery_access_log')
// Replace with:
.from('client_gallery_access_log')
```

---

## ⚡ Quick Fix Script

Would you like me to:

1. **Update all the API routes** to use the new table names?
2. **Update the helper functions** in the migrations?
3. **Test the changes** to ensure everything works?

Let me know and I'll make these updates for you! 🚀
