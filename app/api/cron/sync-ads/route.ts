import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { format, subDays } from 'date-fns'

/**
 * Cron job endpoint for daily Google Ads and Meta Ads sync
 *
 * Configure in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/sync-ads",
 *     "schedule": "0 7 * * *"
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminSupabaseClient()
  const results = {
    google_ads: { success: false, records: 0, error: null as string | null },
    meta: { success: false, records: 0, error: null as string | null },
  }

  // Log sync start
  await supabase.from('sync_logs').insert({
    sync_type: 'ad_platforms',
    status: 'started',
    started_at: new Date().toISOString(),
  })

  try {
    // Sync Google Ads (if configured)
    if (
      process.env.GOOGLE_ADS_DEVELOPER_TOKEN &&
      process.env.GOOGLE_ADS_REFRESH_TOKEN
    ) {
      try {
        const googleResult = await syncGoogleAds()
        results.google_ads = { success: true, records: googleResult.records, error: null }
      } catch (error) {
        results.google_ads.error =
          error instanceof Error ? error.message : 'Unknown error'
      }
    } else {
      results.google_ads.error = 'Google Ads not configured'
    }

    // Sync Meta Ads (if configured)
    if (process.env.META_ACCESS_TOKEN && process.env.META_AD_ACCOUNT_ID) {
      try {
        const metaResult = await syncMetaAds()
        results.meta = { success: true, records: metaResult.records, error: null }
      } catch (error) {
        results.meta.error = error instanceof Error ? error.message : 'Unknown error'
      }
    } else {
      results.meta.error = 'Meta Ads not configured'
    }

    // Update daily_metrics with ad spend
    await updateMetricsWithAdSpend()

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        results,
      },
      { status: 500 }
    )
  }
}

/**
 * Sync Google Ads data
 * TODO: Implement with Google Ads API when credentials are available
 */
async function syncGoogleAds(): Promise<{ records: number }> {
  // Placeholder for Google Ads API integration
  // Reference: https://developers.google.com/google-ads/api/docs/start

  const supabase = createAdminSupabaseClient()
  const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd')

  // This would be replaced with actual Google Ads API call
  // const googleAdsClient = new GoogleAdsApi({
  //   client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  //   client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  //   developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
  // })
  //
  // const customer = googleAdsClient.Customer({
  //   customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
  //   refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
  // })
  //
  // const campaigns = await customer.report({
  //   entity: "campaign",
  //   metrics: ["metrics.impressions", "metrics.clicks", "metrics.cost_micros"],
  //   segments: ["segments.date"],
  //   from_date: yesterday,
  //   to_date: yesterday,
  // })

  console.log('Google Ads sync placeholder - implement when API is configured')

  return { records: 0 }
}

/**
 * Sync Meta (Facebook) Ads data
 * TODO: Implement with Meta Marketing API when credentials are available
 */
async function syncMetaAds(): Promise<{ records: number }> {
  // Placeholder for Meta Marketing API integration
  // Reference: https://developers.facebook.com/docs/marketing-api/

  const supabase = createAdminSupabaseClient()
  const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd')

  // This would be replaced with actual Meta Marketing API call
  // const url = `https://graph.facebook.com/v18.0/act_${process.env.META_AD_ACCOUNT_ID}/insights`
  // const params = {
  //   access_token: process.env.META_ACCESS_TOKEN,
  //   level: 'campaign',
  //   fields: 'campaign_name,impressions,clicks,spend,actions',
  //   time_range: JSON.stringify({ since: yesterday, until: yesterday }),
  // }
  //
  // const response = await fetch(`${url}?${new URLSearchParams(params)}`)
  // const data = await response.json()

  console.log('Meta Ads sync placeholder - implement when API is configured')

  return { records: 0 }
}

/**
 * Update daily_metrics table with ad spend from daily_ad_spend
 */
async function updateMetricsWithAdSpend(): Promise<void> {
  const supabase = createAdminSupabaseClient()

  // Get channel IDs for paid channels
  const { data: channels } = await supabase
    .from('channels')
    .select('id, platform')
    .eq('type', 'paid')

  if (!channels) return

  const googleChannel = channels.find((c) => c.platform === 'google')
  const metaChannel = channels.find((c) => c.platform === 'meta')

  // Get recent ad spend data
  const { data: adSpend } = await supabase
    .from('daily_ad_spend')
    .select('date, platform, campus_id, spend, impressions, clicks, conversions')
    .gte('date', format(subDays(new Date(), 7), 'yyyy-MM-dd'))

  if (!adSpend) return

  // Aggregate by date, channel, campus
  const aggregated = new Map<
    string,
    { spend: number; impressions: number; clicks: number; conversions: number }
  >()

  for (const row of adSpend) {
    const channelId =
      row.platform === 'google_ads' ? googleChannel?.id : metaChannel?.id
    if (!channelId) continue

    const key = `${row.date}-${channelId}-${row.campus_id || 'null'}`
    const current = aggregated.get(key) || {
      spend: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
    }

    current.spend += row.spend || 0
    current.impressions += row.impressions || 0
    current.clicks += row.clicks || 0
    current.conversions += row.conversions || 0

    aggregated.set(key, current)
  }

  // Update daily_metrics
  for (const [key, values] of aggregated) {
    const [date, channelId, campusId] = key.split('-')

    await supabase
      .from('daily_metrics')
      .upsert(
        {
          date,
          channel_id: channelId,
          campus_id: campusId === 'null' ? null : campusId,
          lead_expense_gross: values.spend,
          impressions: values.impressions,
          clicks: values.clicks,
          conversions: values.conversions,
        } as never,
        {
          onConflict: 'date,campus_id,channel_id',
        }
      )
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
