import { createClient } from '@supabase/supabase-js'

type OverrideRow = {
  value: unknown
}

export async function getPublishedPublicContentOverride<T>(key: string, fallback: T): Promise<T> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) return fallback

  try {
    const supabase = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

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
