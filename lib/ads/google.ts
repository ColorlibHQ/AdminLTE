/**
 * Google Ads API Integration
 *
 * Documentation: https://developers.google.com/google-ads/api/docs/start
 *
 * Prerequisites:
 * 1. Create a Google Cloud Project
 * 2. Enable the Google Ads API
 * 3. Create OAuth 2.0 credentials
 * 4. Get a developer token from Google Ads
 * 5. Link your Google Ads account
 *
 * Environment variables needed:
 * - GOOGLE_ADS_CLIENT_ID
 * - GOOGLE_ADS_CLIENT_SECRET
 * - GOOGLE_ADS_DEVELOPER_TOKEN
 * - GOOGLE_ADS_REFRESH_TOKEN
 * - GOOGLE_ADS_CUSTOMER_ID
 */

import { createAdminSupabaseClient } from '../supabase/server'
import { format, subDays } from 'date-fns'

interface GoogleAdsConfig {
  clientId: string
  clientSecret: string
  developerToken: string
  refreshToken: string
  customerId: string
}

interface GoogleAdsCampaignReport {
  campaign_id: string
  campaign_name: string
  date: string
  impressions: number
  clicks: number
  cost_micros: number // Cost in micros (divide by 1,000,000 for actual cost)
  conversions: number
  conversions_value: number
}

export class GoogleAdsClient {
  private config: GoogleAdsConfig
  private accessToken: string | null = null

  constructor() {
    this.config = {
      clientId: process.env.GOOGLE_ADS_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
      developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
      refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN || '',
      customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || '',
    }
  }

  isConfigured(): boolean {
    return !!(
      this.config.clientId &&
      this.config.clientSecret &&
      this.config.developerToken &&
      this.config.refreshToken &&
      this.config.customerId
    )
  }

  /**
   * Get OAuth access token using refresh token
   */
  private async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        refresh_token: this.config.refreshToken,
        grant_type: 'refresh_token',
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${await response.text()}`)
    }

    const data = await response.json()
    this.accessToken = data.access_token
    return this.accessToken
  }

  /**
   * Execute a Google Ads Query Language (GAQL) query
   */
  private async query(gaql: string): Promise<unknown[]> {
    const accessToken = await this.getAccessToken()
    const customerId = this.config.customerId.replace(/-/g, '')

    const response = await fetch(
      `https://googleads.googleapis.com/v15/customers/${customerId}/googleAds:searchStream`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'developer-token': this.config.developerToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: gaql }),
      }
    )

    if (!response.ok) {
      throw new Error(`Google Ads API error: ${await response.text()}`)
    }

    const data = await response.json()
    return data.flatMap((batch: { results: unknown[] }) => batch.results || [])
  }

  /**
   * Fetch campaign performance data for a date range
   */
  async getCampaignReport(
    startDate: string,
    endDate: string
  ): Promise<GoogleAdsCampaignReport[]> {
    const gaql = `
      SELECT
        campaign.id,
        campaign.name,
        segments.date,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversions_value
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
      ORDER BY segments.date DESC
    `

    const results = await this.query(gaql)

    return results.map((row: any) => ({
      campaign_id: row.campaign.id,
      campaign_name: row.campaign.name,
      date: row.segments.date,
      impressions: parseInt(row.metrics.impressions) || 0,
      clicks: parseInt(row.metrics.clicks) || 0,
      cost_micros: parseInt(row.metrics.costMicros) || 0,
      conversions: parseFloat(row.metrics.conversions) || 0,
      conversions_value: parseFloat(row.metrics.conversionsValue) || 0,
    }))
  }
}

/**
 * Sync Google Ads data to database
 */
export async function syncGoogleAdsData(
  startDate?: string,
  endDate?: string
): Promise<{ records: number; errors: string[] }> {
  const client = new GoogleAdsClient()

  if (!client.isConfigured()) {
    return { records: 0, errors: ['Google Ads not configured'] }
  }

  const supabase = createAdminSupabaseClient()
  const errors: string[] = []

  // Default to yesterday if no dates provided
  const from = startDate || format(subDays(new Date(), 1), 'yyyy-MM-dd')
  const to = endDate || format(subDays(new Date(), 1), 'yyyy-MM-dd')

  try {
    // Get Paid SEM channel ID
    const { data: channel } = await supabase
      .from('channels')
      .select('id')
      .eq('platform', 'google')
      .single()

    if (!channel) {
      throw new Error('Paid SEM channel not found')
    }

    // Fetch campaign data
    const campaigns = await client.getCampaignReport(from, to)

    // Insert into daily_ad_spend
    for (const campaign of campaigns) {
      const { error } = await supabase.from('daily_ad_spend').upsert(
        {
          date: campaign.date,
          platform: 'google_ads',
          channel_id: channel.id,
          campaign_id: campaign.campaign_id,
          campaign_name: campaign.campaign_name,
          impressions: campaign.impressions,
          clicks: campaign.clicks,
          spend: campaign.cost_micros / 1000000, // Convert micros to dollars
          conversions: campaign.conversions,
          conversion_value: campaign.conversions_value,
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
