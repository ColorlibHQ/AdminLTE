import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { month, channel_id, campus_id, budget_amount, notes } = body

    if (!month || !channel_id || budget_amount === undefined) {
      return NextResponse.json(
        { error: 'month, channel_id, and budget_amount are required' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    // Upsert budget entry
    const { data, error } = await supabase
      .from('monthly_budgets')
      .upsert(
        {
          month,
          channel_id,
          campus_id: campus_id || null,
          budget_amount,
          notes: notes || null,
        },
        {
          onConflict: 'month,campus_id,channel_id',
        }
      )
      .select()
      .single()

    if (error) {
      console.error('Budget save error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Budget API error:', error)
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
      .from('monthly_budgets')
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
