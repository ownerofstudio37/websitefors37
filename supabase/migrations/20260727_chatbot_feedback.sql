CREATE TABLE IF NOT EXISTS public.chatbot_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rating text NOT NULL CHECK (rating IN ('good', 'bad')),
  user_message text,
  bot_response text NOT NULL,
  intent text,
  page_url text,
  notes text,
  reviewed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chatbot_feedback_created_at
  ON public.chatbot_feedback(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_chatbot_feedback_rating
  ON public.chatbot_feedback(rating);

ALTER TABLE public.chatbot_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage chatbot feedback" ON public.chatbot_feedback;
CREATE POLICY "Service role can manage chatbot feedback"
  ON public.chatbot_feedback
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
