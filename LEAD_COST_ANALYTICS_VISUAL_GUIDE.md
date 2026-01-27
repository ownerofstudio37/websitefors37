# Lead Cost & Revenue Tracking - Visual Guide

## Admin Navigation Map

```
📊 Admin Dashboard (/)
├── 📄 Pages
├── 📰 Blog Posts
├── 🖼️ Gallery
├── 📅 Appointments
├── 📅 Calendar View
├── 💬 Leads & Messages              ← WHERE YOU MANAGE LEADS
│   ├── Create Lead (form w/ $18.48 cost)
│   ├── Scan Screenshot (auto $18.48)
│   ├── Import Contacts (CSV/VCard, $18.48 each)
│   ├── Lead Detail Modal
│   │   ├── Display: Lead Cost
│   │   └── Input: Revenue Generated (editable, saves on blur)
│   └── Export CSV (includes lead_cost & revenue_generated)
│
├── 🎯 Lead Scoring
├── 📈 Cost & Revenue               ← NEW! YOUR ANALYTICS DASHBOARD
│   ├── Key Metrics (5 KPIs)
│   ├── Monthly Breakdown (table)
│   └── Top Revenue Leads (table)
│
├── 📁 Projects
├── 💼 Client Portals
├── ✉️ Email Templates
├── 📊 Analytics
├── 🎨 Theme Customizer
└── ⚙️ Settings
```

---

## Feature Locations & How to Use

### 1️⃣ Add & Track Lead Costs

**Location:** `/admin/leads` → Various entry points

#### A. Manual Creation
```
Create Lead Button
  ↓
Form Opens
  ├── Name (required)
  ├── Email (defaults to lead@example.com)
  ├── Phone
  ├── Service Interest
  ├── Budget Range
  ├── Event Date
  ├── Lead Cost ← $18.48 (editable)
  └── Message
  
  ↓ Click Save
  
Lead Created with cost tracked
```

#### B. Screenshot Import
```
Scan Screenshot Button (Camera Icon)
  ↓
Upload Screenshot (Thumbtack, Bark, WeddingWire, etc.)
  ↓
Gemini AI Extracts:
  ├── Name
  ├── Email (or defaults to lead@example.com)
  ├── Phone
  ├── Service Interest
  ├── Event Date
  ├── Budget Range
  └── Message
  
  ↓ Review & Edit (optional)
  
  ↓ Click Save (automatically adds lead_cost: $18.48)
  
Lead Created with screenshot data + cost tracked
```

#### C. Bulk CSV/VCard Import
```
Import Contacts Button
  ↓
Upload CSV or VCard file
  ↓
System Parses:
  ├── Name
  ├── Email
  └── Phone
  
  ↓ Process (adds lead_cost: $18.48 to each)
  
  ↓ Click Import
  
All contacts created with default $18.48 cost
```

---

### 2️⃣ Update Revenue When Paid

**Location:** `/admin/leads` → Open any lead → Detail Modal

```
Leads Table (lists all leads)
  ↓
Click any lead row → Detail Modal opens
  ↓
Modal shows:
  ├── Lead Info (Name, Email, Phone, Status)
  ├── Lead Cost: $18.48 (read-only display)
  ├── Revenue Generated Input ← ENTER PAYMENT AMOUNT HERE
  │   └── Accepts decimal (e.g., 500.00)
  │
  └── Communication Log (emails, SMS, notes, meetings)
  
When you type amount and click away (blur), it saves:
  ✓ Toast notification: "Revenue updated"
  ✓ Saved to Supabase
  ✓ Analytics dashboard updates automatically
```

**Example:**
```
Lead: "John Smith" (cost: $18.48)
  → Customer pays deposit: $500
  → Enter 500 in "Revenue Generated" input
  → Click away (blur)
  → Saved! 
  → ROI = (500 - 18.48) / 18.48 × 100 = 2,606%
```

---

### 3️⃣ View Analytics & ROI

**Location:** `/admin/lead-cost-analytics` (or "Cost & Revenue" in sidebar)

#### Key Metrics (Top Row - 5 Cards)
```
┌─────────────────────────────────────────────────────────────┐
│ Total Leads  │ Total Cost  │ Avg Cost  │ Total Revenue │ ROI │
│      47      │  $870.56    │ $18.52    │    $8,500.00  │2,800%
│              │             │           │               │
│              │ (Cost down) │ (Per lead)│ (All deposits) │ +Profit
└─────────────────────────────────────────────────────────────┘
```

Hover over cards to see additional details.

#### Monthly Breakdown (Interactive Table)
```
┌────────────────────────────────────────────────────────┐
│ Month  │ Leads │ Lead Cost │ Revenue │ Profit │ ROI % │
├────────────────────────────────────────────────────────┤
│ 2025-01│   12  │  $221.76  │ $2,500  │$2,278 │1,027% │
│ 2025-02│    8  │  $147.84  │ $1,800  │$1,652 │ 1,116%│
│ 2025-03│   27  │  $499.96  │ $4,200  │$3,700 │  741% │
└────────────────────────────────────────────────────────┘
```

Click column headers to sort. Hover for details.

#### Top Revenue-Generating Leads (Detailed Table)
```
┌──────────────────────────────────────────────────────────┐
│ Name         │ Email           │ Cost  │ Revenue │ Profit│Status
├──────────────────────────────────────────────────────────┤
│ Sarah Jones  │ sarah@example.c │$18.48│ $2,000  │$1,981│✅Converted
│ Mike Chen    │ mike@example.com│$18.48│ $1,500  │$1,481│✅Converted
│ Lisa Garcia  │ lisa@example.com│$18.48│ $1,200  │$1,181│✅Converted
│ ...         │ ...             │ ...  │ ...    │ ...  │ ...
└──────────────────────────────────────────────────────────┘
```

Shows top 10 leads by revenue. See your best customers at a glance.

---

## Data Flow Diagram

```
                    LEAD SOURCES
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    Manual Entry    Screenshot      CSV/VCard
                     Import         Import
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
            /api/leads route (POST)
                    │
        ┌───────────┴───────────┐
        │                       │
    Validation              Default Values
    (Zod Schema)            (lead_cost: 18.48)
        │                       │
        └───────────┬───────────┘
                    │
                    ▼
            Supabase Insert
            ├── name
            ├── email
            ├── phone
            ├── lead_cost: $18.48  ← TRACKED HERE
            ├── revenue_generated: 0 (waiting for payment)
            └── created_at
                    │
                    ▼
            Lead Created ✓
                    │
         ┌──────────┴──────────┐
         │                     │
      Display in          Update later
      Leads Table          (when paid)
         │                     │
         │                     ▼
         │            Lead Detail Modal
         │            "Revenue Generated" input
         │                     │
         │            ▼ Enter amount, blur ▼
         │
         │            /api/leads/:id (PATCH)
         │                     │
         │            Update revenue_generated
         │                     │
         └─────────────┬──────┘
                       │
                       ▼
            Analytics Dashboard
            ├── Re-fetch all leads
            ├── Calculate:
            │   ├── Total cost (SUM lead_cost)
            │   ├── Total revenue (SUM revenue_generated)
            │   ├── ROI % = (revenue - cost) / cost × 100
            │   └── Monthly aggregates
            │
            └── Display metrics & tables
```

---

## Example Day-in-Life: Lead Acquisition Tracking

### Morning: Get a Thumbtack Lead
```
1. Customer gets Thumbtack notification
2. Opens admin → Leads & Messages
3. Clicks "Scan Screenshot"
4. Takes screenshot of Thumbtack message
5. Uploads to modal
6. AI extracts: "Sarah Johnson, wants wedding photography, $3,000 budget"
7. Review looks good → Click Save
8. ✓ Lead created with name, email (defaults), phone, lead_cost: $18.48
```

### Later: Lead Gets Qualified
```
1. Sarah responds to email, wants to book
2. Open lead detail → Update status to "Qualified"
3. Send her pricing proposal (via Compose modal)
4. Communication log updates
```

### Next Week: Deposit Arrives
```
1. Sarah pays $500 deposit via Stripe
2. Open her lead detail → Find "Revenue Generated" input
3. Enter "500"
4. Click away (blur) → Toast: "Revenue updated" ✓
5. Supabase saves revenue_generated = 500
```

### Month-End: Review Analytics
```
1. Go to Cost & Revenue dashboard
2. See metrics:
   - Total cost: $370.96 (20 leads × $18.48)
   - Total revenue: $5,500
   - Profit: $5,129.04
   - ROI: 1,382%
3. See monthly breakdown:
   - Jan: 10 leads, $184.80 cost, $2,200 revenue
   - Feb: 10 leads, $184.80 cost, $3,300 revenue
4. See top leads (Sarah Johnson: $500 revenue)
5. Export data to Google Sheets for reporting
```

---

## Keyboard Shortcuts & Tips

| Action | How |
|--------|-----|
| Open revenue input | Click lead in table → scroll to footer |
| Save revenue | Type amount → Tab or click away (onBlur) |
| Export all leads | Leads & Messages → Export CSV button |
| Refresh analytics | Go to Cost & Revenue → auto-loads latest data |
| Edit lead cost | Create Lead form or manually update lead |
| Reset to default | Leave blank in Create Lead → defaults to $18.48 |

---

## FAQ

### Q: Where does the $18.48 come from?
**A:** That's your default lead acquisition cost (from Thumbtack, Bark, or wherever). When you add a lead manually, via screenshot, or CSV, it defaults to $18.48. You can change this per-lead in the Create Lead form.

### Q: What if revenue is $0?
**A:** ROI shows as $0 (or the profit is negative if you paid more than $0 for the lead). This helps you identify leads that haven't converted yet.

### Q: Can I see ROI by source (Thumbtack vs. Bark)?
**A:** The `source` field is tracked but the current analytics shows overall/monthly trends. You can filter manually in the Leads table by source, then note which are top revenue earners.

### Q: Does the analytics update automatically?
**A:** When you update revenue in the lead detail modal, you need to refresh the Cost & Revenue page to see updated metrics. The page fetches all leads on load.

### Q: Can I bulk import revenue?
**A:** Not yet. You'll need to update revenue one lead at a time via the detail modal. If you have 100+ updates, let me know and we can build a bulk revenue import feature.

---

## Performance Notes

The analytics page fetches ALL leads from Supabase and calculates aggregations client-side (in your browser). This is fast for up to ~1,000 leads. If you have more:
- Page load might take 2-3 seconds
- Consider archiving old leads or creating a server-side API for pre-computed aggregations

For now, it's instant and doesn't burden the server. ✓

---

## Next Steps

1. ✅ Navigate to `/admin/lead-cost-analytics` in your browser
2. ✅ Try creating a test lead with a custom cost
3. ✅ Update the revenue on that lead
4. ✅ Refresh the analytics page → See it update
5. ✅ Export leads to CSV → Open in Google Sheets → Compare cost/revenue side-by-side

You're all set! 🎉

