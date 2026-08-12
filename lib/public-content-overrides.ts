import { supabase } from '@/lib/supabase'

type OverrideRow = {
  value: unknown
}

export async function getPublishedPublicContentOverride<T>(key: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await supabase
      .from('public_content_overrides')
      .select('value')
      .eq('key', key)
      .eq('status', 'published')
      .maybeSingle()

    if (error || !data?.value) return fallback
    return (data as OverrideRow).value as T
  } catch {
    return fallback
  }
}
