import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      month,
      channel_id,
      campus_id,
      program_id,
      enrollments,
      revenue,
      notes,
    } = body

    if (!month || enrollments === undefined || revenue === undefined) {
      return NextResponse.json(
        { error: 'month, enrollments, and revenue are required' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    // Upsert revenue entry
    const { data, error } = await supabase
      .from('revenue_entries')
      .upsert(
        {
          month,
          channel_id: channel_id || null,
          campus_id: campus_id || null,
          program_id: program_id || null,
          enrollments,
          revenue,
          notes: notes || null,
        },
        {
          onConflict: 'month,campus_id,program_id,channel_id',
        }
      )
      .select()
      .single()

    if (error) {
      console.error('Revenue save error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Revenue API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from('revenue_entries')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
