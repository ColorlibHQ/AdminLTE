import { NextRequest, NextResponse } from 'next/server'
import { incrementalSync, updateDailyMetrics } from '@/lib/leadsquared/sync'
import { format, subDays } from 'date-fns'

/**
 * Cron job endpoint for daily LeadSquared sync
 *
 * Configure in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/sync-leads",
 *     "schedule": "0 6 * * *"
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('Starting LeadSquared sync...')

    // Run incremental sync
    const result = await incrementalSync()

    // Update daily metrics for last 7 days (to catch any updates)
    for (let i = 0; i < 7; i++) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd')
      await updateDailyMetrics(date)
    }

    console.log('Sync completed:', result)

    return NextResponse.json({
      success: result.success,
      message: 'Sync completed',
      stats: {
        processed: result.recordsProcessed,
        created: result.recordsCreated,
        updated: result.recordsUpdated,
        failed: result.recordsFailed,
      },
      errors: result.errors,
    })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Also allow POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request)
}
