# 🚀 Project Management System - Quick Setup

## ⚠️ IMPORTANT: Run Database Migration First!

Before the Project Management system will work, you **MUST** run the database migration to create all the required tables.

## Step 1: Run Database Migration

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **"New query"**
5. Copy and paste the **ENTIRE contents** of this file:
   ```
   supabase/migrations/2025-12-01_project_management_system.sql
   ```
6. Click **"Run"** or press `Ctrl/Cmd + Enter`
7. Wait for success message (may take 10-30 seconds)

### Option B: Using Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db push
```

## Step 2: Verify Migration Success

Run this query in Supabase SQL Editor to verify tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_name LIKE 'project_%' 
ORDER BY table_name;
```

You should see 9 tables:
- `project_comments`
- `project_files`
- `project_management`
- `project_milestones`
- `project_phases`
- `project_tasks`
- `project_time_entries`
- `project_timeline`
- `project_workflows`

## Step 3: Verify Workflow Templates

Check that the 4 workflow templates were created:

```sql
SELECT name, project_type, estimated_duration_days 
FROM project_workflows 
ORDER BY project_type;
```

You should see:
- Commercial Project Standard (30 days)
- Event Coverage Standard (14 days)
- Portrait Session Standard (10 days)
- Wedding Photography Standard (45 days)

## Step 4: Test the System

1. **Refresh your browser** at `/admin/projects`
2. Click **"New Project"** button
3. The workflow dropdown should now populate with real workflows
4. Fill out the form:
   - Select a lead (optional) or fill client info manually
   - Choose project type and workflow
   - Set start date (target date auto-calculates!)
   - Add description
5. Click **"Create Project"**
6. You should be redirected to the project detail page

## What the Migration Creates

### 9 Database Tables
- ✅ **project_workflows** - Reusable templates
- ✅ **project_management** - Core project tracking
- ✅ **project_phases** - Major project stages
- ✅ **project_tasks** - Actionable to-do items
- ✅ **project_milestones** - Key deliverables
- ✅ **project_timeline** - Activity history log
- ✅ **project_comments** - Discussion threads
- ✅ **project_files** - File management
- ✅ **project_time_entries** - Time tracking

### 4 Pre-configured Workflows
- ✅ **Wedding** (45 days) - 6 phases, 13 tasks
- ✅ **Portrait** (10 days) - 4 phases, 6 tasks
- ✅ **Event** (14 days) - 4 phases, 7 tasks
- ✅ **Commercial** (30 days) - 6 phases, 13 tasks

### Automated Features
- ✅ Auto-generates project codes (WED-2025-001, POR-2025-002, etc.)
- ✅ Auto-calculates progress based on task completion
- ✅ Auto-logs timeline events for all changes
- ✅ Auto-creates phases and tasks from workflow templates
- ✅ Auto-updates timestamps on record changes

### Security (RLS Policies)
- ✅ Admin-only access to all project data
- ✅ Row Level Security enabled on all tables
- ✅ 9 RLS policies protecting project information

## Troubleshooting

### Error: "Failed to create project" (500)
**Solution**: Run the database migration! The tables don't exist yet.

### Error: "Workflow dropdown is empty"
**Solution**: Check that the migration seeded the 4 workflow templates. Run the verification query above.

### Error: "relation project_management does not exist"
**Solution**: The migration wasn't run successfully. Try running it again in Supabase SQL Editor.

### Migration Fails Partway Through
**Solution**: 
1. Drop existing tables if any were partially created:
   ```sql
   DROP TABLE IF EXISTS project_time_entries CASCADE;
   DROP TABLE IF EXISTS project_files CASCADE;
   DROP TABLE IF EXISTS project_comments CASCADE;
   DROP TABLE IF EXISTS project_timeline CASCADE;
   DROP TABLE IF EXISTS project_milestones CASCADE;
   DROP TABLE IF EXISTS project_tasks CASCADE;
   DROP TABLE IF EXISTS project_phases CASCADE;
   DROP TABLE IF EXISTS project_management CASCADE;
   DROP TABLE IF EXISTS project_workflows CASCADE;
   ```
2. Run the full migration again

## Next Steps After Migration

1. ✅ **Create your first project** via `/admin/projects/new`
2. ✅ **Build project detail page** at `/admin/projects/[id]/page.tsx`
3. ✅ **Add "Convert to Project" button** in leads page
4. ✅ **Create Kanban board view** for visual task management
5. ✅ **Build timeline visualization** for project history

## Support

- **Migration file**: `supabase/migrations/2025-12-01_project_management_system.sql`
- **Complete guide**: `PROJECT_MANAGEMENT_GUIDE.md`
- **Quick reference**: `PROJECT_MANAGEMENT_QUICKSTART.md`

---

**Remember**: The migration only needs to be run **once**. After that, all projects will use the same database structure. 🎉
