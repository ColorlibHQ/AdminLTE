import { NextRequest, NextResponse } from 'next/server'
import { syncLeads, updateDailyMetrics } from '@/lib/leadsquared/sync'
import { format, eachDayOfInterval, parseISO } from 'date-fns'

/**
 * Manual sync endpoint for triggering data sync from the dashboard
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fromDate, toDate, updateMetrics = true } = body

    if (!fromDate || !toDate) {
      return NextResponse.json(
        { error: 'fromDate and toDate are required' },
        { status: 400 }
      )
    }

    console.log(`Manual sync requested: ${fromDate} to ${toDate}`)

    // Sync leads
    const result = await syncLeads(fromDate, toDate)

    // Update daily metrics for the date range
    if (updateMetrics) {
      const days = eachDayOfInterval({
        start: parseISO(fromDate),
        end: parseISO(toDate),
      })

      for (const day of days) {
        await updateDailyMetrics(format(day, 'yyyy-MM-dd'))
      }
    }

    return NextResponse.json({
      success: result.success,
      message: 'Manual sync completed',
      stats: {
        processed: result.recordsProcessed,
        created: result.recordsCreated,
        updated: result.recordsUpdated,
        failed: result.recordsFailed,
      },
      errors: result.errors,
    })
  } catch (error) {
    console.error('Manual sync error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
