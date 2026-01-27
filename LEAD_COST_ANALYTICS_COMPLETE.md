# Lead Cost & Revenue Analytics Widget - Complete ✅

## What's New

You now have a **standalone analytics dashboard** at `/admin/lead-cost-analytics` that displays:

### Key Metrics (Top Row)
- **Total Leads** — Count of all leads in your CRM
- **Total Lead Cost** — Sum of all lead acquisition costs
- **Avg Cost/Lead** — Average cost per lead (total cost ÷ total leads)
- **Total Revenue** — Sum of all revenue generated from leads
- **ROI** — Return on investment percentage + net profit display

### Monthly Breakdown Table
Aggregates by month showing:
- **Month** (YYYY-MM format)
- **Leads** (count for that month)
- **Lead Cost** (total acquisition cost)
- **Revenue** (total deposits/payments)
- **Profit** (revenue - cost)
- **ROI %** (profit ÷ cost × 100)

### Top Revenue-Generating Leads Table
Shows your top 10 leads sorted by revenue, including:
- Name & email
- Lead cost
- Revenue generated
- Profit margin
- Current status (converted, qualified, contacted, new)

---

## How It Works

### Data Sources
The analytics widget pulls from the `leads` table:
- `lead_cost` — Cost paid to acquire this lead (defaults $18.48)
- `revenue_generated` — Amount paid by customer (deposit, payment, etc.)
- `created_at` — Used to group by month
- `status` — Displayed for top revenue leads

### Calculations
All calculations are done client-side after fetching all leads:
- **Total Profit** = Sum(revenue_generated) - Sum(lead_cost)
- **ROI %** = (Total Profit / Total Lead Cost) × 100
- **Avg Cost/Lead** = Total Lead Cost / Total Leads
- Monthly aggregates: SUM by month, then calculate profit & ROI per month

---

## Quick Start

### 1. Run the Migration ✅ (Already created)
The migration file exists at `supabase/migrations/20260127_add_revenue_field.sql`:
```sql
ALTER TABLE leads ADD COLUMN IF NOT EXISTS revenue_generated numeric(10,2) DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_leads_lead_cost ON leads(lead_cost);
CREATE INDEX IF NOT EXISTS idx_leads_revenue ON leads(revenue_generated);
```

Execute this in Supabase SQL editor or via the CLI:
```bash
npm run supabase migration up
```

### 2. Access the Dashboard
- Navigate to Admin Panel → **Cost & Revenue** (sidebar link added)
- Or go directly to `/admin/lead-cost-analytics`

### 3. Update Lead Costs & Revenue
In the **Leads & Messages** page, you can:
- **Edit lead_cost** in the "Create Lead" form (defaults $18.48)
- **Update revenue_generated** via inline input in the lead detail modal (footer section)
- Revenue updates save immediately to Supabase (onBlur handler)

---

## Integration with Existing Features

### Lead Creation (Multiple Entry Points)
All ways of adding leads now include cost tracking:

1. **Manual Entry** (`/admin/leads` → Create Lead button)
   - Form includes `lead_cost` field (pre-filled with $18.48)
   - User can edit before save

2. **Screenshot Import** (`/admin/leads` → Scan Screenshot)
   - Automatically adds `lead_cost: 18.48` on save
   - User can edit in review step

3. **CSV/VCard Import** (`/admin/leads` → Import Contacts)
   - Automatically assigns `lead_cost: 18.48` to each imported contact
   - Bulk import with default cost applied to all

4. **Form Submissions** (Public website form)
   - Auto-assigned `lead_cost: 18.48` in API preprocessing

### Lead Detail Modal
Opening a lead shows:
- **Lead Cost** (read-only display)
- **Revenue Generated** (editable input field)
  - Updates save to Supabase on blur
  - Toast notification confirms save

---

## Database Schema

### New Column
```sql
-- Added to leads table
revenue_generated numeric(10,2) DEFAULT 0
```

### Existing Column (Already Present)
```sql
-- Already in leads table
lead_cost numeric(10,2)
```

### Indexes (For Query Performance)
```sql
idx_leads_lead_cost  — Speeds up cost aggregation queries
idx_leads_revenue    — Speeds up revenue analysis queries
```

---

## File Changes Summary

### Created
- `app/admin/lead-cost-analytics/page.tsx` — Main analytics dashboard component

### Modified
- `components/AdminDesktopSidebar.tsx` — Added "Cost & Revenue" nav link with TrendingUp icon

### Already Exists (Migrations)
- `supabase/migrations/20260127_add_lead_cost.sql` — Added lead_cost column, backfilled $18.48
- `supabase/migrations/20260127_add_revenue_field.sql` — Added revenue_generated, created indexes

---

## Next Steps

1. ✅ **Create new analytics page** — Done (`lead-cost-analytics`)
2. ✅ **Add sidebar navigation** — Done (Cost & Revenue link)
3. ⏳ **Run Supabase migration** — Execute `20260127_add_revenue_field.sql` in your Supabase dashboard
4. ⏳ **Deploy to production** — Push code changes to trigger Netlify build
5. ⏳ **Start tracking revenue** — Use the lead detail modal to input deposits/payments as they come in

---

## Example Usage

### Scenario: You get a Thumbtack lead
1. Go to **Leads & Messages** → Click **Scan Screenshot**
2. Upload the Thumbtack screenshot → AI extracts data → Review → Save
3. Lead saved with `lead_cost: 18.48` automatically
4. Later, customer pays a $500 deposit:
   - Open the lead detail modal
   - Scroll to footer, find "Revenue Generated" input
   - Enter `500` → Clicks away (onBlur)
   - Saved! Toast confirms
5. Go to **Cost & Revenue** dashboard:
   - See this lead in "Top Revenue-Generating Leads" table
   - See monthly totals updated in "Monthly Breakdown"
   - See ROI updated in key metrics (e.g., 2,592% for this $500 vs $18.48 cost)

---

## Analytics Insights You Can Now Track

- **Lead acquisition efficiency** — Are you paying too much per lead?
- **Revenue per source** — Which platforms (Thumbtack, Bark, WeddingWire) generate best ROI?
- **Seasonal trends** — Which months are most profitable?
- **Top performers** — Which leads generate the most revenue?
- **Monthly profitability** — Are you making or losing money overall?

---

## Troubleshooting

### No data showing?
- Ensure migration has been run (column must exist in database)
- Refresh the page (Ctrl+F5) to clear any cached data
- Check browser console for errors

### Revenue input not saving?
- Check network tab to ensure POST request to Supabase succeeds
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Try editing a different field in the lead (phone, etc.) to test if all edits work

### Incorrect ROI calculation?
- Verify lead costs are correct (each lead should have a numeric value)
- Ensure revenue_generated values are entered correctly
- ROI = (Total Profit / Total Lead Cost) × 100, where Profit = Revenue - Cost

---

## Code Structure

```
app/admin/lead-cost-analytics/
└── page.tsx                         # Main analytics dashboard
    ├── fetchAnalytics()             # Fetch all leads, compute aggregates
    ├── Key Metrics Component        # Grid of 5 KPIs (total leads, cost, avg, revenue, ROI)
    ├── Monthly Breakdown Table      # Month-by-month breakdown
    └── Top Revenue Leads Table      # Top 10 by revenue

components/AdminDesktopSidebar.tsx   # Updated with Cost & Revenue nav link
```

---

## Questions?

The analytics page fetches all leads on load and computes aggregations client-side for simplicity. If you have 1000+ leads and performance is an issue, we can move aggregations server-side (create a dedicated API endpoint). For now, this approach is fast and doesn't require backend changes.

