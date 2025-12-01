-- ============================================================================
-- Project Management System with CRM Integration
-- Purpose: Track photography projects from booking through delivery
-- Date: 2025-12-01
-- ============================================================================

-- Project Workflows (Templates for different project types)
CREATE TABLE IF NOT EXISTS project_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  project_type VARCHAR(50) NOT NULL, -- 'wedding', 'portrait', 'event', 'commercial'
  
  -- Template configuration
  default_phases JSONB DEFAULT '[]'::jsonb, -- [{ name, duration_days, order }]
  default_tasks JSONB DEFAULT '[]'::jsonb, -- [{ name, phase, assignee_role, due_offset_days }]
  checklist_template JSONB DEFAULT '[]'::jsonb, -- Pre-shoot, post-shoot checklists
  
  -- Financial defaults
  default_deliverables JSONB DEFAULT '[]'::jsonb, -- [{ name, quantity, unit }]
  estimated_duration_days INTEGER,
  
  is_active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workflows_type ON project_workflows(project_type);
CREATE INDEX idx_workflows_active ON project_workflows(is_active);

-- Project Management (extends client_projects with timeline tracking)
CREATE TABLE IF NOT EXISTS project_management (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Core relationships
  client_project_id UUID UNIQUE REFERENCES client_projects(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  workflow_id UUID REFERENCES project_workflows(id) ON DELETE SET NULL,
  
  -- Project details
  project_name VARCHAR(255) NOT NULL,
  project_code VARCHAR(50) UNIQUE, -- e.g., 'WED-2025-001'
  project_type VARCHAR(50) NOT NULL,
  
  -- Status tracking
  status VARCHAR(30) NOT NULL DEFAULT 'planning' CHECK (status IN (
    'planning',           -- Initial planning phase
    'scheduled',          -- Session date confirmed
    'pre-production',     -- Prep work in progress
    'in-progress',        -- Active shoot/session
    'post-production',    -- Editing phase
    'client-review',      -- Awaiting client feedback
    'revisions',          -- Making requested changes
    'final-delivery',     -- Preparing final deliverables
    'completed',          -- Project finished
    'on-hold',           -- Temporarily paused
    'cancelled'          -- Project cancelled
  )),
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Timeline
  start_date DATE,
  target_completion_date DATE,
  actual_completion_date DATE,
  session_date TIMESTAMP WITH TIME ZONE,
  
  -- Progress tracking
  overall_progress INTEGER DEFAULT 0 CHECK (overall_progress >= 0 AND overall_progress <= 100),
  phases_completed INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  total_tasks INTEGER DEFAULT 0,
  
  -- Team
  project_manager_id UUID REFERENCES admin_users(id),
  assigned_photographer_id UUID REFERENCES admin_users(id),
  assigned_editor_id UUID REFERENCES admin_users(id),
  team_members JSONB DEFAULT '[]'::jsonb, -- [{ user_id, role, name }]
  
  -- Client information
  client_name VARCHAR(255),
  client_email VARCHAR(255),
  client_phone VARCHAR(50),
  
  -- Deliverables tracking
  deliverables JSONB DEFAULT '[]'::jsonb, -- [{ name, status, delivered_at, url }]
  revision_count INTEGER DEFAULT 0,
  
  -- Risk & health
  health_status VARCHAR(20) DEFAULT 'on-track' CHECK (health_status IN ('on-track', 'at-risk', 'delayed', 'blocked')),
  risk_factors JSONB DEFAULT '[]'::jsonb, -- [{ risk, mitigation, severity }]
  blockers TEXT,
  
  -- Notes & metadata
  description TEXT,
  notes TEXT,
  tags TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Audit
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pm_client_project ON project_management(client_project_id);
CREATE INDEX idx_pm_lead ON project_management(lead_id);
CREATE INDEX idx_pm_appointment ON project_management(appointment_id);
CREATE INDEX idx_pm_status ON project_management(status);
CREATE INDEX idx_pm_priority ON project_management(priority);
CREATE INDEX idx_pm_health ON project_management(health_status);
CREATE INDEX idx_pm_session_date ON project_management(session_date);
CREATE INDEX idx_pm_target_date ON project_management(target_completion_date);
CREATE INDEX idx_pm_project_manager ON project_management(project_manager_id);
CREATE INDEX idx_pm_photographer ON project_management(assigned_photographer_id);
CREATE INDEX idx_pm_tags ON project_management USING GIN (tags);
CREATE INDEX idx_pm_code ON project_management(project_code);

-- Project Phases (major stages in project lifecycle)
CREATE TABLE IF NOT EXISTS project_phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES project_management(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  phase_order INTEGER NOT NULL,
  
  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'skipped')),
  
  -- Timeline
  planned_start_date DATE,
  planned_end_date DATE,
  actual_start_date DATE,
  actual_end_date DATE,
  duration_days INTEGER,
  
  -- Progress
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  
  -- Dependencies
  depends_on_phase_id UUID REFERENCES project_phases(id) ON DELETE SET NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_phases_project ON project_phases(project_id);
CREATE INDEX idx_phases_status ON project_phases(status);
CREATE INDEX idx_phases_order ON project_phases(project_id, phase_order);

-- Project Tasks (granular actionable items)
CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES project_management(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES project_phases(id) ON DELETE CASCADE,
  
  -- Task details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  task_type VARCHAR(50), -- 'pre-shoot', 'shoot', 'edit', 'delivery', 'admin', 'client-action'
  
  -- Status & priority
  status VARCHAR(20) NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'completed', 'blocked', 'cancelled')),
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Assignment
  assigned_to UUID REFERENCES admin_users(id),
  assigned_by UUID REFERENCES admin_users(id),
  
  -- Timeline
  due_date TIMESTAMP WITH TIME ZONE,
  start_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  estimated_hours DECIMAL(5,2),
  actual_hours DECIMAL(5,2),
  
  -- Dependencies
  depends_on_task_ids UUID[], -- Tasks that must complete first
  blocks_task_ids UUID[], -- Tasks blocked by this one
  
  -- Checklist (sub-items)
  checklist JSONB DEFAULT '[]'::jsonb, -- [{ item, completed, completed_at }]
  
  -- Attachments & links
  attachments JSONB DEFAULT '[]'::jsonb, -- [{ name, url, type }]
  related_urls JSONB DEFAULT '[]'::jsonb,
  
  -- Metadata
  tags TEXT[],
  notes TEXT,
  
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_project ON project_tasks(project_id);
CREATE INDEX idx_tasks_phase ON project_tasks(phase_id);
CREATE INDEX idx_tasks_assigned ON project_tasks(assigned_to);
CREATE INDEX idx_tasks_status ON project_tasks(status);
CREATE INDEX idx_tasks_due_date ON project_tasks(due_date);
CREATE INDEX idx_tasks_priority ON project_tasks(priority);
CREATE INDEX idx_tasks_tags ON project_tasks USING GIN (tags);

-- Project Milestones (key events and deliverables)
CREATE TABLE IF NOT EXISTS project_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES project_management(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES project_phases(id) ON DELETE SET NULL,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  milestone_type VARCHAR(50), -- 'delivery', 'approval', 'payment', 'session', 'custom'
  
  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'missed', 'cancelled')),
  
  -- Timeline
  target_date DATE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Deliverables
  deliverables JSONB DEFAULT '[]'::jsonb, -- [{ name, url, delivered }]
  
  -- Client visibility
  visible_to_client BOOLEAN DEFAULT true,
  client_approved BOOLEAN DEFAULT false,
  client_approved_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_milestones_project ON project_milestones(project_id);
CREATE INDEX idx_milestones_phase ON project_milestones(phase_id);
CREATE INDEX idx_milestones_target_date ON project_milestones(target_date);
CREATE INDEX idx_milestones_status ON project_milestones(status);

-- Project Timeline Events (activity log and history)
CREATE TABLE IF NOT EXISTS project_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES project_management(id) ON DELETE CASCADE,
  
  -- Event details
  event_type VARCHAR(50) NOT NULL, -- 'status_change', 'task_completed', 'message_sent', 'file_uploaded', 'milestone_reached', etc.
  event_title VARCHAR(255) NOT NULL,
  event_description TEXT,
  
  -- Related entities
  related_entity_type VARCHAR(50), -- 'task', 'phase', 'milestone', 'message', 'file'
  related_entity_id UUID,
  
  -- User who triggered event
  user_id UUID REFERENCES admin_users(id),
  user_name VARCHAR(255),
  user_role VARCHAR(50),
  
  -- Event metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Visibility
  is_client_visible BOOLEAN DEFAULT false,
  is_system_generated BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_timeline_project ON project_timeline(project_id);
CREATE INDEX idx_timeline_created ON project_timeline(created_at DESC);
CREATE INDEX idx_timeline_type ON project_timeline(event_type);
CREATE INDEX idx_timeline_user ON project_timeline(user_id);

-- Project Comments (discussions and notes)
CREATE TABLE IF NOT EXISTS project_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES project_management(id) ON DELETE CASCADE,
  task_id UUID REFERENCES project_tasks(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES project_phases(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES project_comments(id) ON DELETE CASCADE,
  
  -- Comment content
  comment_text TEXT NOT NULL,
  comment_type VARCHAR(20) DEFAULT 'comment' CHECK (comment_type IN ('comment', 'note', 'decision', 'question')),
  
  -- Author
  author_id UUID REFERENCES admin_users(id),
  author_name VARCHAR(255),
  author_role VARCHAR(50),
  
  -- Mentions & notifications
  mentioned_users UUID[], -- User IDs mentioned with @
  
  -- Attachments
  attachments JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  is_resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES admin_users(id),
  
  -- Metadata
  is_internal BOOLEAN DEFAULT false, -- Hide from client
  is_pinned BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  edited_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_comments_project ON project_comments(project_id);
CREATE INDEX idx_comments_task ON project_comments(task_id);
CREATE INDEX idx_comments_phase ON project_comments(phase_id);
CREATE INDEX idx_comments_author ON project_comments(author_id);
CREATE INDEX idx_comments_created ON project_comments(created_at DESC);
CREATE INDEX idx_comments_parent ON project_comments(parent_comment_id);

-- Project Files (centralized file management)
CREATE TABLE IF NOT EXISTS project_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES project_management(id) ON DELETE CASCADE,
  task_id UUID REFERENCES project_tasks(id) ON DELETE SET NULL,
  
  -- File details
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50), -- 'contract', 'brief', 'photo', 'video', 'document', 'asset'
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT,
  mime_type VARCHAR(100),
  
  -- Categorization
  category VARCHAR(50), -- 'raw', 'edited', 'final', 'contract', 'reference'
  tags TEXT[],
  
  -- Permissions
  is_client_accessible BOOLEAN DEFAULT false,
  requires_approval BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES admin_users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  
  -- Version control
  version_number INTEGER DEFAULT 1,
  parent_file_id UUID REFERENCES project_files(id) ON DELETE SET NULL,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  
  -- Audit
  uploaded_by UUID REFERENCES admin_users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_files_project ON project_files(project_id);
CREATE INDEX idx_files_task ON project_files(task_id);
CREATE INDEX idx_files_type ON project_files(file_type);
CREATE INDEX idx_files_category ON project_files(category);
CREATE INDEX idx_files_tags ON project_files USING GIN (tags);
CREATE INDEX idx_files_uploaded ON project_files(uploaded_at DESC);
CREATE INDEX idx_files_parent ON project_files(parent_file_id);

-- Project Time Tracking
CREATE TABLE IF NOT EXISTS project_time_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES project_management(id) ON DELETE CASCADE,
  task_id UUID REFERENCES project_tasks(id) ON DELETE SET NULL,
  
  -- User & activity
  user_id UUID REFERENCES admin_users(id),
  user_name VARCHAR(255),
  activity_type VARCHAR(50), -- 'shooting', 'editing', 'admin', 'client-communication', 'travel'
  description TEXT,
  
  -- Time tracking
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  is_billable BOOLEAN DEFAULT true,
  
  -- Metadata
  notes TEXT,
  tags TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_time_entries_project ON project_time_entries(project_id);
CREATE INDEX idx_time_entries_task ON project_time_entries(task_id);
CREATE INDEX idx_time_entries_user ON project_time_entries(user_id);
CREATE INDEX idx_time_entries_start ON project_time_entries(start_time);

-- ============================================================================
-- Functions and Triggers
-- ============================================================================

-- Function to update project progress
CREATE OR REPLACE FUNCTION update_project_progress()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE project_management
  SET 
    tasks_completed = (
      SELECT COUNT(*) 
      FROM project_tasks 
      WHERE project_id = NEW.project_id AND status = 'completed'
    ),
    total_tasks = (
      SELECT COUNT(*) 
      FROM project_tasks 
      WHERE project_id = NEW.project_id
    ),
    overall_progress = (
      SELECT COALESCE(
        ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'completed') / NULLIF(COUNT(*), 0)),
        0
      )
      FROM project_tasks
      WHERE project_id = NEW.project_id
    ),
    last_activity_at = NOW(),
    updated_at = NOW()
  WHERE id = NEW.project_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for task status changes
CREATE TRIGGER trigger_update_project_progress
AFTER INSERT OR UPDATE OF status ON project_tasks
FOR EACH ROW
EXECUTE FUNCTION update_project_progress();

-- Function to auto-generate project code
CREATE OR REPLACE FUNCTION generate_project_code()
RETURNS TRIGGER AS $$
DECLARE
  type_prefix VARCHAR(10);
  year_suffix VARCHAR(10);
  sequence_num INTEGER;
BEGIN
  IF NEW.project_code IS NULL THEN
    -- Get prefix based on project type
    type_prefix := CASE NEW.project_type
      WHEN 'wedding' THEN 'WED'
      WHEN 'portrait' THEN 'POR'
      WHEN 'event' THEN 'EVT'
      WHEN 'commercial' THEN 'COM'
      ELSE 'PRJ'
    END;
    
    year_suffix := TO_CHAR(CURRENT_DATE, 'YYYY');
    
    -- Get next sequence number for this type and year
    SELECT COALESCE(MAX(
      CAST(SUBSTRING(project_code FROM '\d+$') AS INTEGER)
    ), 0) + 1 INTO sequence_num
    FROM project_management
    WHERE project_code LIKE type_prefix || '-' || year_suffix || '-%';
    
    NEW.project_code := type_prefix || '-' || year_suffix || '-' || LPAD(sequence_num::TEXT, 3, '0');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for project code generation
CREATE TRIGGER trigger_generate_project_code
BEFORE INSERT ON project_management
FOR EACH ROW
EXECUTE FUNCTION generate_project_code();

-- Function to log timeline events
CREATE OR REPLACE FUNCTION log_project_timeline_event()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO project_timeline (
      project_id,
      event_type,
      event_title,
      event_description,
      user_id,
      metadata,
      is_system_generated
    ) VALUES (
      NEW.id,
      'status_change',
      'Project status changed',
      'Status changed from ' || OLD.status || ' to ' || NEW.status,
      NEW.updated_at, -- This should ideally come from app context
      jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status),
      true
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for status changes
CREATE TRIGGER trigger_log_status_change
AFTER UPDATE OF status ON project_management
FOR EACH ROW
EXECUTE FUNCTION log_project_timeline_event();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update trigger to all relevant tables
CREATE TRIGGER trigger_update_workflows
BEFORE UPDATE ON project_workflows
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_pm
BEFORE UPDATE ON project_management
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_phases
BEFORE UPDATE ON project_phases
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_tasks
BEFORE UPDATE ON project_tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_comments
BEFORE UPDATE ON project_comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

ALTER TABLE project_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_time_entries ENABLE ROW LEVEL SECURITY;

-- Admin users can access all project data
CREATE POLICY admin_all_access ON project_management
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY admin_workflows ON project_workflows
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY admin_phases ON project_phases
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY admin_tasks ON project_tasks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY admin_milestones ON project_milestones
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY admin_timeline ON project_timeline
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY admin_comments ON project_comments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY admin_files ON project_files
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY admin_time ON project_time_entries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- ============================================================================
-- Seed Data: Default Workflows
-- ============================================================================

INSERT INTO project_workflows (name, description, project_type, default_phases, default_tasks, estimated_duration_days) VALUES
(
  'Wedding Photography Standard',
  'Standard workflow for wedding photography projects',
  'wedding',
  '[
    {"name": "Initial Planning", "duration_days": 7, "order": 1},
    {"name": "Pre-Wedding Prep", "duration_days": 14, "order": 2},
    {"name": "Wedding Day", "duration_days": 1, "order": 3},
    {"name": "Post-Production", "duration_days": 21, "order": 4},
    {"name": "Client Review", "duration_days": 7, "order": 5},
    {"name": "Final Delivery", "duration_days": 3, "order": 6}
  ]'::jsonb,
  '[
    {"name": "Initial consultation meeting", "phase": "Initial Planning", "assignee_role": "photographer", "due_offset_days": 2},
    {"name": "Contract signing", "phase": "Initial Planning", "assignee_role": "admin", "due_offset_days": 5},
    {"name": "Engagement photo session", "phase": "Pre-Wedding Prep", "assignee_role": "photographer", "due_offset_days": 14},
    {"name": "Scout venue location", "phase": "Pre-Wedding Prep", "assignee_role": "photographer", "due_offset_days": 10},
    {"name": "Prepare equipment checklist", "phase": "Pre-Wedding Prep", "assignee_role": "photographer", "due_offset_days": 3},
    {"name": "Wedding day shooting", "phase": "Wedding Day", "assignee_role": "photographer", "due_offset_days": 0},
    {"name": "Backup all raw files", "phase": "Post-Production", "assignee_role": "photographer", "due_offset_days": 1},
    {"name": "Photo selection and culling", "phase": "Post-Production", "assignee_role": "editor", "due_offset_days": 7},
    {"name": "Edit selected photos", "phase": "Post-Production", "assignee_role": "editor", "due_offset_days": 18},
    {"name": "Create online gallery", "phase": "Client Review", "assignee_role": "admin", "due_offset_days": 22},
    {"name": "Client feedback round", "phase": "Client Review", "assignee_role": "photographer", "due_offset_days": 28},
    {"name": "Export final deliverables", "phase": "Final Delivery", "assignee_role": "editor", "due_offset_days": 30},
    {"name": "Send delivery notification", "phase": "Final Delivery", "assignee_role": "admin", "due_offset_days": 31}
  ]'::jsonb,
  45
),
(
  'Portrait Session Standard',
  'Standard workflow for portrait photography sessions',
  'portrait',
  '[
    {"name": "Planning", "duration_days": 3, "order": 1},
    {"name": "Session", "duration_days": 1, "order": 2},
    {"name": "Editing", "duration_days": 7, "order": 3},
    {"name": "Delivery", "duration_days": 2, "order": 4}
  ]'::jsonb,
  '[
    {"name": "Schedule session", "phase": "Planning", "assignee_role": "admin", "due_offset_days": 1},
    {"name": "Discuss wardrobe and styling", "phase": "Planning", "assignee_role": "photographer", "due_offset_days": 2},
    {"name": "Portrait session shooting", "phase": "Session", "assignee_role": "photographer", "due_offset_days": 0},
    {"name": "Select and edit photos", "phase": "Editing", "assignee_role": "editor", "due_offset_days": 5},
    {"name": "Upload to client gallery", "phase": "Delivery", "assignee_role": "admin", "due_offset_days": 8},
    {"name": "Send completion email", "phase": "Delivery", "assignee_role": "admin", "due_offset_days": 8}
  ]'::jsonb,
  10
),
(
  'Event Coverage Standard',
  'Standard workflow for event photography',
  'event',
  '[
    {"name": "Pre-Event Planning", "duration_days": 5, "order": 1},
    {"name": "Event Day", "duration_days": 1, "order": 2},
    {"name": "Post-Processing", "duration_days": 5, "order": 3},
    {"name": "Delivery", "duration_days": 2, "order": 4}
  ]'::jsonb,
  '[
    {"name": "Event briefing call", "phase": "Pre-Event Planning", "assignee_role": "photographer", "due_offset_days": 3},
    {"name": "Scout event venue", "phase": "Pre-Event Planning", "assignee_role": "photographer", "due_offset_days": 2},
    {"name": "Event coverage", "phase": "Event Day", "assignee_role": "photographer", "due_offset_days": 0},
    {"name": "Cull and organize photos", "phase": "Post-Processing", "assignee_role": "editor", "due_offset_days": 2},
    {"name": "Basic edits and color correction", "phase": "Post-Processing", "assignee_role": "editor", "due_offset_days": 5},
    {"name": "Upload final images", "phase": "Delivery", "assignee_role": "admin", "due_offset_days": 7},
    {"name": "Send download link", "phase": "Delivery", "assignee_role": "admin", "due_offset_days": 7}
  ]'::jsonb,
  14
),
(
  'Commercial Project Standard',
  'Standard workflow for commercial photography projects',
  'commercial',
  '[
    {"name": "Discovery & Planning", "duration_days": 7, "order": 1},
    {"name": "Pre-Production", "duration_days": 10, "order": 2},
    {"name": "Production", "duration_days": 2, "order": 3},
    {"name": "Post-Production", "duration_days": 10, "order": 4},
    {"name": "Client Approval", "duration_days": 5, "order": 5},
    {"name": "Final Delivery", "duration_days": 3, "order": 6}
  ]'::jsonb,
  '[
    {"name": "Creative brief meeting", "phase": "Discovery & Planning", "assignee_role": "photographer", "due_offset_days": 2},
    {"name": "Concept development", "phase": "Discovery & Planning", "assignee_role": "photographer", "due_offset_days": 5},
    {"name": "Contract and payment terms", "phase": "Discovery & Planning", "assignee_role": "admin", "due_offset_days": 7},
    {"name": "Location scouting", "phase": "Pre-Production", "assignee_role": "photographer", "due_offset_days": 10},
    {"name": "Model/talent booking", "phase": "Pre-Production", "assignee_role": "admin", "due_offset_days": 12},
    {"name": "Props and styling", "phase": "Pre-Production", "assignee_role": "photographer", "due_offset_days": 14},
    {"name": "Production day 1", "phase": "Production", "assignee_role": "photographer", "due_offset_days": 0},
    {"name": "Production day 2", "phase": "Production", "assignee_role": "photographer", "due_offset_days": 1},
    {"name": "Advanced retouching", "phase": "Post-Production", "assignee_role": "editor", "due_offset_days": 8},
    {"name": "First draft review", "phase": "Client Approval", "assignee_role": "photographer", "due_offset_days": 15},
    {"name": "Revisions round", "phase": "Client Approval", "assignee_role": "editor", "due_offset_days": 18},
    {"name": "Export in multiple formats", "phase": "Final Delivery", "assignee_role": "editor", "due_offset_days": 20},
    {"name": "Archive project files", "phase": "Final Delivery", "assignee_role": "admin", "due_offset_days": 21}
  ]'::jsonb,
  30
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Comments
-- ============================================================================

COMMENT ON TABLE project_workflows IS 'Reusable workflow templates for different project types';
COMMENT ON TABLE project_management IS 'Core project management table with timeline and progress tracking';
COMMENT ON TABLE project_phases IS 'Major phases/stages within a project';
COMMENT ON TABLE project_tasks IS 'Granular tasks and action items within projects';
COMMENT ON TABLE project_milestones IS 'Key deliverables and checkpoints';
COMMENT ON TABLE project_timeline IS 'Activity log and history of project events';
COMMENT ON TABLE project_comments IS 'Discussion threads on projects, tasks, and phases';
COMMENT ON TABLE project_files IS 'Centralized file management for projects';
COMMENT ON TABLE project_time_entries IS 'Time tracking for project activities';
