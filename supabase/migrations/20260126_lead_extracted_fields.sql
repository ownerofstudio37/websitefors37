-- Add audit fields for OCR/AI-ingested leads
alter table public.leads
  add column if not exists extracted_text text;

alter table public.leads
  add column if not exists source_metadata jsonb;
