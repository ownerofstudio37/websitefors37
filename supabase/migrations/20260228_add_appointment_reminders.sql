-- Add reminder_sent_at tracking column to appointments table
-- Purpose: Track when appointment reminders have been sent to avoid duplicates
-- Date: 2026-02-28

ALTER TABLE appointments
ADD COLUMN IF NOT EXISTS reminder_sent_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Create index for efficient querying of appointments that need reminders
CREATE INDEX IF NOT EXISTS idx_appointments_reminder_check 
ON appointments(status, reminder_sent_at, appointment_date) 
WHERE status = 'confirmed' AND reminder_sent_at IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN appointments.reminder_sent_at IS 'Timestamp when 24-hour appointment reminder was sent. Used to avoid sending duplicate reminders.';
