# Updated: `.github/copilot-instructions.md` - Dec 4, 2025

## What Changed

Your `.github/copilot-instructions.md` has been updated with **critical business context** to help AI agents finish the admin dashboard AND prepare for client duplication. This ensures any future work on this codebase stays aligned with your SaaS goals.

---

## Key Additions

### 1. **Multi-Tenancy & Client Duplication Section** (NEW)
A dedicated section explaining the white-label architecture:
- `tenant_config` table structure (slug, branding, features, billing)
- `app_users` with `tenant_id` FK for user isolation
- RLS policies for data isolation across tenants
- Checklist for duplicating the codebase for new clients:
  - ✅ Database schema ready
  - ✅ Tenant utilities in `packages/shared/src/supabase.ts`
  - ⚠️ **TODO**: Admin UI to create new tenants
  - ⚠️ **TODO**: Verify all new features filter by `tenant_id`

**Why this matters**: When you clone this for a client, every feature MUST respect `tenant_id` isolation. AI agents need to know this upfront.

### 2. **Blocking Issues Section** (NEW)
Highlighted the 3 high-priority tasks that are blocking sales/qualification:

| Task | Time | Status | Impact |
|------|------|--------|--------|
| AI Lead Scoring | 8-10 hrs | ⏳ Not started | Auto-score leads 0-100; enables lead prioritization |
| Lead Deduplication | 6-8 hrs | ⏳ Not started | Prevent duplicate outreach; improve data quality |
| Security Migration | Pending | ⏳ Not started | Apply RLS policies; must complete before SaaS launch |

**Why this matters**: AI agents will prioritize these when working on `admin/` features, ensuring critical gaps close first.

### 3. **Admin Dashboard Completion Matrix** (NEW)
Clear status breakdown showing:

**✅ COMPLETED & Functional**
- Dashboard, CRM (leads/bookings/calendar), Content (pages/blog), Gallery, Marketing (email/SMS), Client Portals, AI Tools

**🟡 NEEDS COMPLETION** (Priority Order)
- Lead Scoring Dashboard (`/admin/lead-scoring`)
- Setup/Tenant Onboarding (`/admin/setup-tenant`) ⭐ **Required for SaaS launch**
- System Settings (`/admin/settings`)
- Database Audit UI (`/admin/database-migrations`)

**Why this matters**: AI agents will see exactly what's missing and won't waste time rebuilding completed features.

### 4. **Client Duplication Pattern for Development**
Updated the "For development" note:
> "Studio37 is default tenant with `slug: 'studio37'`. When cloning for a client, create new `tenant_config` row, then new `app_users` linking to that tenant."

**Why this matters**: Guides future setup workflows for new client instances.

---

## What This Enables

### ✨ For AI Agents (Immediate)
- **Finish admin tools faster**: Clear priority + completion matrix = no confusion about what to build
- **Respect multi-tenancy**: Agents understand data isolation requirements BEFORE building features
- **Prepare for duplication**: Agents will naturally filter by `tenant_id` on new features

### 🚀 For Your Business (Long-term)
- **Ready to clone**: When you get a client, the instructions are a blueprint for the AI agent setting it up
- **Consistent architecture**: Every feature built respects the same isolation patterns
- **Faster SaaS launch**: Blocking issues are highlighted; when 3 issues close, you're ready

---

## Recommended Next Steps

### 🎯 Immediate (This Week)
1. **Run the security migration**: `20251202_fix_security_issues.sql` enables RLS on public tables
   - This unblocks the SaaS launch
   - AI agents will know about it and include it in setup workflows

2. **Start AI Lead Scoring**: This is the highest ROI blocking issue
   - 8-10 hours to implement `/api/leads/score`
   - Enables `/admin/lead-scoring` dashboard
   - Directly impacts sales qualification

### 📋 Medium Priority (Next 2 weeks)
3. **Lead Deduplication**: Clean up duplicate leads + add merge UI
4. **Setup/Tenant Onboarding**: Build `/admin/setup-tenant` for client duplication
   - This is your SaaS launcher
   - Needed BEFORE you can clone for first client

### 🏗️ Long-term (Documentation)
- Update `README_ECOSYSTEM.md` with tenant setup instructions
- Create a "Client Onboarding" runbook for duplicating the codebase

---

## File References for Quick Navigation

**New/Updated Sections:**
- `.github/copilot-instructions.md` — Full instructions (updated)
- `FULL_SITE_AUDIT_DEC_2025.md` — Detailed audit with effort estimates (reference)
- `supabase/migrations/2025-11-04_app_ecosystem_schema.sql` — Tenant schema
- `packages/shared/src/supabase.ts` — Tenant utilities (getTenantBySlug, etc.)
- `packages/shared/src/utils.ts` — STUDIO37_TENANT_SLUG constant

**Admin Dashboard:**
- `app/admin/` — Dashboard structure (30+ features, see instructions for status)
- `app/admin/dashboard/page.tsx` — Main dashboard hub
- `app/admin/leads/` — CRM lead management (completed)
- `app/admin/lead-scoring/` — TO BE BUILT (your priority)

**Database:**
- `supabase/migrations/20251202_fix_security_issues.sql` — Security hardening (TO BE APPLIED)
- `supabase/migrations/2025-11-04_app_ecosystem_schema.sql` — Multi-tenancy schema

---

## How AI Agents Will Use This

When you ask an AI agent to:
- ✅ "Build `/admin/lead-scoring` dashboard" → Agent sees it's in Medium Priority + will wire to `/api/leads/score`
- ✅ "Create a new admin feature" → Agent sees Multi-Tenancy section + will filter by `tenant_id` automatically
- ✅ "Help me set up a client tenant" → Agent sees the Duplication Checklist + will know to create `tenant_config` + `app_users` rows
- ✅ "What's left to finish?" → Agent references Blocking Issues + Completion Matrix

---

## Questions to Consider

1. **Security migration**: Ready to apply `20251202_fix_security_issues.sql` now? (Can't SaaS-launch without it)
2. **Lead scoring priority**: Want to start `/api/leads/score` this week?
3. **First client**: Who's your first client you want to clone this for? (Helps prioritize Setup/Onboarding feature)
4. **Branding customization**: Do you need `/admin/settings` to let clients customize colors/logos per tenant?

---

## Summary

✅ **Updated `.github/copilot-instructions.md`** with:
- 🔑 Multi-tenancy architecture context
- 🚨 Blocking issues + effort estimates
- 📊 Admin dashboard completion matrix
- 📝 Admin feature patterns & gotchas

This ensures **every AI agent** helping you finish the admin dashboard understands the business goals (white-label SaaS) and technical requirements (tenant isolation) upfront. No wasted effort, faster execution.
