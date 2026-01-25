/**
 * Meta (Facebook/Instagram) Marketing API Integration
 *
 * Documentation: https://developers.facebook.com/docs/marketing-api/
 *
 * Prerequisites:
 * 1. Create a Meta Developer App
 * 2. Add the Marketing API product
 * 3. Get an access token with ads_read permission
 * 4. Get your Ad Account ID
 *
 * Environment variables needed:
 * - META_ACCESS_TOKEN
 * - META_AD_ACCOUNT_ID
 */

import { createAdminSupabaseClient } from '../supabase/server'
import { format, subDays } from 'date-fns'

interface MetaAdsConfig {
  accessToken: string
  adAccountId: string
}

interface MetaCampaignInsight {
  campaign_id: string
  campaign_name: string
  date_start: string
  date_stop: string
  impressions: number
  clicks: number
  spend: number
  actions?: Array<{
    action_type: string
    value: string
  }>
}

export class MetaAdsClient {
  private config: MetaAdsConfig
  private apiVersion = 'v18.0'
  private baseUrl = 'https://graph.facebook.com'

  constructor() {
    this.config = {
      accessToken: process.env.META_ACCESS_TOKEN || '',
      adAccountId: process.env.META_AD_ACCOUNT_ID || '',
    }
  }

  isConfigured(): boolean {
    return !!(this.config.accessToken && this.config.adAccountId)
  }

  /**
   * Make a request to the Meta Marketing API
   */
  private async request<T>(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<T> {
    const url = new URL(
      `${this.baseUrl}/${this.apiVersion}/${endpoint}`
    )

    // Add access token and params
    url.searchParams.set('access_token', this.config.accessToken)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    const response = await fetch(url.toString())

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        `Meta API error: ${error.error?.message || response.statusText}`
      )
    }

    return response.json()
  }

  /**
   * Get campaign insights for a date range
   */
  async getCampaignInsights(
    startDate: string,
    endDate: string
  ): Promise<MetaCampaignInsight[]> {
    const accountId = this.config.adAccountId.startsWith('act_')
      ? this.config.adAccountId
      : `act_${this.config.adAccountId}`

    const insights: MetaCampaignInsight[] = []

    // Fetch insights
    const response = await this.request<{
      data: Array<{
        campaign_id: string
        campaign_name: string
        date_start: string
        date_stop: string
        impressions: string
        clicks: string
        spend: string
        actions?: Array<{ action_type: string; value: string }>
      }>
      paging?: { next: string }
    }>(`${accountId}/insights`, {
      level: 'campaign',
      fields:
        'campaign_id,campaign_name,impressions,clicks,spend,actions',
      time_range: JSON.stringify({
        since: startDate,
        until: endDate,
      }),
      time_increment: '1', // Daily breakdown
    })

    for (const row of response.data || []) {
      insights.push({
        campaign_id: row.campaign_id,
        campaign_name: row.campaign_name,
        date_start: row.date_start,
        date_stop: row.date_stop,
        impressions: parseInt(row.impressions) || 0,
        clicks: parseInt(row.clicks) || 0,
        spend: parseFloat(row.spend) || 0,
        actions: row.actions,
      })
    }

    return insights
  }

  /**
   * Get ad account info
   */
  async getAdAccount(): Promise<{
    id: string
    name: string
    currency: string
    account_status: number
  }> {
    const accountId = this.config.adAccountId.startsWith('act_')
      ? this.config.adAccountId
      : `act_${this.config.adAccountId}`

    return this.request(accountId, {
      fields: 'id,name,currency,account_status',
    })
  }
}

/**
 * Sync Meta Ads data to database
 */
export async function syncMetaAdsData(
  startDate?: string,
  endDate?: string
): Promise<{ records: number; errors: string[] }> {
  const client = new MetaAdsClient()

  if (!client.isConfigured()) {
    return { records: 0, errors: ['Meta Ads not configured'] }
  }

  const supabase = createAdminSupabaseClient()
  const errors: string[] = []

  // Default to yesterday if no dates provided
  const from = startDate || format(subDays(new Date(), 1), 'yyyy-MM-dd')
  const to = endDate || format(subDays(new Date(), 1), 'yyyy-MM-dd')

  try {
    // Get Paid Social channel ID
    const { data: channel } = await supabase
      .from('channels')
      .select('id')
      .eq('platform', 'meta')
      .single()

    if (!channel) {
      throw new Error('Paid Social channel not found')
    }

    // Fetch campaign data
    const campaigns = await client.getCampaignInsights(from, to)

    // Insert into daily_ad_spend
    for (const campaign of campaigns) {
      // Extract conversions from actions
      const conversions =
        campaign.actions?.find(
          (a) =>
            a.action_type === 'lead' ||
            a.action_type === 'complete_registration'
        )?.value || '0'

      const { error } = await supabase.from('daily_ad_spend').upsert(
        {
          date: campaign.date_start,
          platform: 'meta',
          channel_id: channel.id,
          campaign_id: campaign.campaign_id,
          campaign_name: campaign.campaign_name,
          impressions: campaign.impressions,
          clicks: campaign.clicks,
          spend: campaign.spend,
          conversions: parseInt(conversions),
          raw_data: campaign,
        },
        {
          onConflict: 'date,platform,campaign_id',
        }
      )

      if (error) {
        errors.push(`Campaign ${campaign.campaign_id}: ${error.message}`)
      }
    }

    return { records: campaigns.length, errors }
  } catch (error) {
    return {
      records: 0,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }
  }
}
