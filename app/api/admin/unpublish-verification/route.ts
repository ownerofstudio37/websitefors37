import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const supabase = getSupabaseAdmin()
    
    // Unpublish verification pages
    const { error } = await supabase
      .from('content_pages')
      .update({ published: false })
      .or('slug.in.(algolia-verification,a41a3d624e3ac9cb94868de50be953d2,bing-site-auth,google-site-verification,yandex-verification),slug.like.a______________________________________________________________________________%')
    
    if (error) {
      console.error('Error unpublishing verification pages:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    // Get updated pages
    const { data: pages } = await supabase
      .from('content_pages')
      .select('slug, published')
      .or('slug.in.(algolia-verification,a41a3d624e3ac9cb94868de50be953d2,bing-site-auth,google-site-verification,yandex-verification)')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Verification pages unpublished',
      pages 
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
