-- Client Portal & Projects System
-- Creates tables for managing client portal users and their projects

-- 1. Client Portal Users table
CREATE TABLE IF NOT EXISTS client_portal_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL, -- bcrypt hash
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  company VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Profile & preferences
  avatar_url TEXT,
  timezone VARCHAR(50) DEFAULT 'America/New_York',
  notification_preferences JSONB DEFAULT '{"email": true, "sms": false}'::jsonb,
  -- Metadata
  notes TEXT,
  tags TEXT[]
);

-- 2. Client Projects table
CREATE TABLE IF NOT EXISTS client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_user_id UUID NOT NULL REFERENCES client_portal_users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) DEFAULT 'portrait', -- portrait, wedding, commercial, headshot, etc.
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, scheduled, in-progress, review, completed, delivered, archived
  -- Dates
  session_date DATE,
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  -- Package & Pricing
  package_name VARCHAR(255),
  total_amount_cents INTEGER,
  paid_amount_cents INTEGER DEFAULT 0,
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, partial, paid, refunded
  -- Media
  cover_image_url TEXT,
  -- Metadata
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Client Messages table (for project communication)
CREATE TABLE IF NOT EXISTS client_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE,
  client_user_id UUID REFERENCES client_portal_users(id) ON DELETE CASCADE,
  sender_type VARCHAR(50) NOT NULL, -- 'admin' or 'client'
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  attachments JSONB, -- array of {url, filename, size}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Client Portal Sessions table (for login tracking)
CREATE TABLE IF NOT EXISTS client_portal_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_user_id UUID NOT NULL REFERENCES client_portal_users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_client_portal_users_email ON client_portal_users(email);
CREATE INDEX IF NOT EXISTS idx_client_portal_users_is_active ON client_portal_users(is_active);

CREATE INDEX IF NOT EXISTS idx_client_projects_client_user_id ON client_projects(client_user_id);
CREATE INDEX IF NOT EXISTS idx_client_projects_status ON client_projects(status);
CREATE INDEX IF NOT EXISTS idx_client_projects_session_date ON client_projects(session_date);

CREATE INDEX IF NOT EXISTS idx_client_messages_project_id ON client_messages(project_id);
CREATE INDEX IF NOT EXISTS idx_client_messages_client_user_id ON client_messages(client_user_id);
CREATE INDEX IF NOT EXISTS idx_client_messages_is_read ON client_messages(is_read);

CREATE INDEX IF NOT EXISTS idx_client_portal_sessions_token ON client_portal_sessions(token);
CREATE INDEX IF NOT EXISTS idx_client_portal_sessions_client_user_id ON client_portal_sessions(client_user_id);
CREATE INDEX IF NOT EXISTS idx_client_portal_sessions_expires_at ON client_portal_sessions(expires_at);

-- Enable RLS (Row Level Security)
ALTER TABLE client_portal_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_portal_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for client_portal_users
-- Clients can view their own profile
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Clients can view own profile'
      AND schemaname = 'public'
      AND tablename = 'client_portal_users'
  ) THEN
    EXECUTE 'CREATE POLICY "Clients can view own profile" ON client_portal_users FOR SELECT USING (id = (current_setting(''request.jwt.claims'', true)::json->>''sub'')::uuid)';
  END IF;
END $$;

-- RLS Policies for client_projects
-- Clients can view their own projects
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Clients can view own projects'
      AND schemaname = 'public'
      AND tablename = 'client_projects'
  ) THEN
    EXECUTE 'CREATE POLICY "Clients can view own projects" ON client_projects FOR SELECT USING (client_user_id = (current_setting(''request.jwt.claims'', true)::json->>''sub'')::uuid)';
  END IF;
END $$;

-- RLS Policies for client_messages
-- Clients can view messages for their projects
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Clients can view own messages'
      AND schemaname = 'public'
      AND tablename = 'client_messages'
  ) THEN
    EXECUTE 'CREATE POLICY "Clients can view own messages" ON client_messages FOR SELECT USING (client_user_id = (current_setting(''request.jwt.claims'', true)::json->>''sub'')::uuid)';
  END IF;
END $$;

-- Clients can insert messages
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Clients can send messages'
      AND schemaname = 'public'
      AND tablename = 'client_messages'
  ) THEN
    EXECUTE 'CREATE POLICY "Clients can send messages" ON client_messages FOR INSERT WITH CHECK (client_user_id = (current_setting(''request.jwt.claims'', true)::json->>''sub'')::uuid AND sender_type = ''client'')';
  END IF;
END $$;

-- Comments for documentation
COMMENT ON TABLE client_portal_users IS 'Client portal user accounts with authentication';
COMMENT ON TABLE client_projects IS 'Client photography projects and sessions';
COMMENT ON TABLE client_messages IS 'Messages between admin and clients for projects';
COMMENT ON TABLE client_portal_sessions IS 'Active login sessions for client portal users';
