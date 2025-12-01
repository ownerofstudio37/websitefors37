# Project Management System - Quick Start

## 🚀 5-Minute Setup

### Step 1: Run Database Migration (2 min)

```bash
# Via Supabase Dashboard
1. Go to https://app.supabase.com → Your Project → SQL Editor
2. Click "New query"
3. Copy contents of supabase/migrations/2025-12-01_project_management_system.sql
4. Paste and click "Run"
```

**What this creates:**
- 9 new tables for project management
- 4 pre-configured workflow templates (Wedding, Portrait, Event, Commercial)
- Automatic progress tracking triggers
- RLS security policies

### Step 2: Access Dashboard (1 min)

Navigate to: **`http://localhost:3000/admin/projects`** (or your production URL)

You'll see:
- 📊 Stats dashboard (Total, Active, On Track, At Risk)
- 🔍 Search and filter controls
- 📋 Project list view

### Step 3: Create Your First Project (2 min)

#### Option A: From Existing Lead

```typescript
// In /admin/leads, add a "Convert to Project" button:
async function handleConvertToProject(lead) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      project_name: `${lead.name} - ${lead.service_interest}`,
      project_type: 'wedding', // or 'portrait', 'event', 'commercial'
      lead_id: lead.id,
      client_name: lead.name,
      client_email: lead.email,
      client_phone: lead.phone,
      workflow_id: '<get-from-workflows-table>',
      start_date: new Date().toISOString().split('T')[0],
      target_completion_date: '2025-07-01',
      status: 'planning',
      priority: 'normal'
    })
  })
  
  const { project } = await response.json()
  // Redirect to project page
  window.location.href = `/admin/projects/${project.id}`
}
```

#### Option B: Manual Creation (UI coming soon)

For now, use the API directly or create via SQL:

```sql
INSERT INTO project_management (
  project_name, project_type, client_name, client_email,
  status, priority, start_date, target_completion_date
) VALUES (
  'Smith Wedding 2025',
  'wedding',
  'John Smith',
  'john@example.com',
  'planning',
  'high',
  '2025-06-01',
  '2025-07-15'
);
```

---

## 📋 Common Tasks

### View All Projects
```http
GET /api/projects?limit=50
```

### Filter by Status
```http
GET /api/projects?status=in-progress
```

### Get Project Details
```http
GET /api/projects/{project-id}
```

Returns: project + phases + tasks + timeline + comments + files

### Update Project Status
```http
PATCH /api/projects/{project-id}
Content-Type: application/json

{
  "status": "in-progress",
  "health_status": "on-track"
}
```

### Create a Task
```http
POST /api/projects/{project-id}/tasks
Content-Type: application/json

{
  "title": "Edit wedding photos",
  "description": "Color correction for ceremony photos",
  "task_type": "edit",
  "status": "todo",
  "priority": "high",
  "due_date": "2025-06-20T17:00:00Z",
  "estimated_hours": 8
}
```

### Complete a Task
```http
PATCH /api/tasks/{task-id}
Content-Type: application/json

{
  "status": "completed",
  "actual_hours": 7.5
}
```

This automatically:
- Updates project progress %
- Logs timeline event
- Sets completion timestamp

---

## 🔗 CRM Integration Examples

### 1. Convert Lead to Project

Add this button to your leads table:

```tsx
<button
  onClick={() => convertLeadToProject(lead)}
  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
>
  Start Project
</button>
```

### 2. Link Appointment to Project

When booking an appointment for an existing lead:

```typescript
// Check if lead already has a project
const { data: project } = await supabase
  .from('project_management')
  .select('id')
  .eq('lead_id', appointment.lead_id)
  .single()

if (project) {
  // Update project with session date
  await fetch(`/api/projects/${project.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      appointment_id: appointment.id,
      session_date: appointment.appointment_date,
      status: 'scheduled'
    })
  })
}
```

### 3. Auto-Create Task from Booking Reminder

After sending a reminder:

```typescript
await fetch(`/api/projects/${projectId}/tasks`, {
  method: 'POST',
  body: JSON.stringify({
    title: 'Follow up on booking confirmation',
    task_type: 'admin',
    status: 'todo',
    priority: 'normal',
    due_date: new Date(Date.now() + 86400000).toISOString(), // +1 day
    notes: `Sent reminder to ${client.email} at ${new Date().toISOString()}`
  })
})
```

---

## 📊 Pre-Configured Workflows

### Wedding Photography (45 days)
1. **Initial Planning** (7 days) - Consultation, contract
2. **Pre-Wedding Prep** (14 days) - Engagement photos, venue scout
3. **Wedding Day** (1 day) - Shooting
4. **Post-Production** (21 days) - Editing, culling
5. **Client Review** (7 days) - Gallery, feedback
6. **Final Delivery** (3 days) - Export, send

**Auto-created tasks:** 13 tasks with calculated due dates

### Portrait Session (10 days)
Planning → Session → Editing → Delivery

### Event Coverage (14 days)
Pre-Event → Event Day → Post-Processing → Delivery

### Commercial Project (30 days)
Discovery → Pre-Production → Production → Post-Production → Approval → Delivery

---

## 🎯 Next Steps

1. ✅ **Migration complete** - Tables created
2. ✅ **Dashboard accessible** - View at /admin/projects
3. 🔨 **Create project form** - Build UI for `/admin/projects/new`
4. 🔨 **Task management UI** - Detailed project view page
5. 🔨 **Timeline view** - Visual project timeline
6. 🔨 **Kanban board** - Drag-and-drop task management

---

## 🐛 Troubleshooting

**No projects showing?**
- Verify migration ran successfully: `SELECT COUNT(*) FROM project_management;`
- Check browser console for errors
- Ensure you're logged in as admin

**Can't create project?**
- Check Supabase logs for errors
- Verify admin_users table has your account
- Test API endpoint directly with curl/Postman

**Progress not updating?**
- Verify trigger exists: `SELECT tgname FROM pg_trigger WHERE tgname = 'trigger_update_project_progress';`
- Check task status is actually 'completed'

---

## 📚 Full Documentation

See **PROJECT_MANAGEMENT_GUIDE.md** for:
- Complete API reference
- Advanced features
- Custom workflow creation
- Reporting queries
- Security details

---

**Need help?** Check the comprehensive guide or create an issue.
