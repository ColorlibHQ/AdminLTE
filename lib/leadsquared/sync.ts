/**
 * LeadSquared Sync Service
 *
 * Handles syncing leads from LeadSquared to Supabase
 */

import { createAdminSupabaseClient } from '../supabase/server'
import {
  LeadSquaredClient,
  LeadSquaredLead,
  DEFAULT_LEAD_COLUMNS,
} from './client'
import { format, subDays } from 'date-fns'

interface SyncResult {
  success: boolean
  recordsProcessed: number
  recordsCreated: number
  recordsUpdated: number
  recordsFailed: number
  errors: string[]
}

// Campus name to ID mapping (will be populated from DB)
let campusMap: Map<string, string> = new Map()
let channelMap: Map<string, string> = new Map()

/**
 * Initialize reference data maps from database
 */
async function initializeMaps() {
  const supabase = createAdminSupabaseClient()

  // Load campuses
  const { data: campuses } = await supabase.from('campuses').select('id, name')
  if (campuses) {
    campusMap = new Map(campuses.map((c) => [c.name.toLowerCase(), c.id]))
  }

  // Load channels
  const { data: channels } = await supabase.from('channels').select('id, name, platform')
  if (channels) {
    channelMap = new Map(channels.map((c) => [c.name.toLowerCase(), c.id]))
  }
}

/**
 * Determine channel from lead source
 */
function determineChannel(lead: LeadSquaredLead): string | null {
  const source = (lead.Source || '').toLowerCase()
  const medium = (lead.SourceMedium || '').toLowerCase()

  if (source.includes('google') || medium.includes('cpc') || medium.includes('ppc')) {
    return channelMap.get('paid sem') || null
  }
  if (source.includes('facebook') || source.includes('meta') || source.includes('instagram')) {
    return channelMap.get('paid social') || null
  }
  return channelMap.get('organic/direct') || null
}

/**
 * Match campus from lead data
 */
function matchCampus(lead: LeadSquaredLead): string | null {
  const campusName = (lead.mx_Campus || '').toLowerCase()
  if (!campusName) return null

  // Try exact match first
  if (campusMap.has(campusName)) {
    return campusMap.get(campusName) || null
  }

  // Try partial match
  for (const [name, id] of campusMap) {
    if (campusName.includes(name) || name.includes(campusName)) {
      return id
    }
  }

  return null
}

/**
 * Transform LeadSquared lead to our database format
 */
function transformLead(lead: LeadSquaredLead): Record<string, unknown> {
  return {
    leadsquared_id: lead.ProspectID,
    first_name: lead.FirstName || null,
    last_name: lead.LastName || null,
    email: lead.EmailAddress || null,
    phone: lead.Phone || null,
    campus_id: matchCampus(lead),
    channel_id: determineChannel(lead),
    source: lead.Source || null,
    source_medium: lead.SourceMedium || null,
    source_campaign: lead.SourceCampaign || null,
    lead_status: lead.LeadStatus || null,
    lead_stage: lead.ProspectStage || null,
    is_enrolled: (lead.LeadStatus || '').toLowerCase().includes('enrolled'),
    created_date: lead.CreatedOn
      ? format(new Date(lead.CreatedOn), 'yyyy-MM-dd')
      : format(new Date(), 'yyyy-MM-dd'),
    enrolled_date: lead.mx_Enrollment_Date
      ? format(new Date(lead.mx_Enrollment_Date as string), 'yyyy-MM-dd')
      : null,
    revenue: parseFloat(String(lead.mx_Revenue || 0)) || 0,
    raw_data: lead,
  }
}

/**
 * Sync leads from LeadSquared to database
 */
export async function syncLeads(
  fromDate?: string,
  toDate?: string
): Promise<SyncResult> {
  const result: SyncResult = {
    success: false,
    recordsProcessed: 0,
    recordsCreated: 0,
    recordsUpdated: 0,
    recordsFailed: 0,
    errors: [],
  }

  const supabase = createAdminSupabaseClient()
  const client = new LeadSquaredClient()

  // Log sync start
  const { data: syncLog } = await supabase
    .from('sync_logs')
    .insert({
      sync_type: 'leadsquared',
      status: 'started',
      started_at: new Date().toISOString(),
    })
    .select()
    .single()

  try {
    // Initialize reference data
    await initializeMaps()

    // Default to last 30 days if no dates provided
    const startDate = fromDate || format(subDays(new Date(), 30), 'yyyy-MM-dd')
    const endDate = toDate || format(new Date(), 'yyyy-MM-dd')

    console.log(`Syncing leads from ${startDate} to ${endDate}`)

    // Fetch leads from LeadSquared
    const leads = await client.fetchAllLeads(
      startDate,
      endDate,
      DEFAULT_LEAD_COLUMNS,
      (fetched) => {
        console.log(`Fetched ${fetched} leads...`)
      }
    )

    console.log(`Total leads fetched: ${leads.length}`)

    // Process leads in batches
    const batchSize = 100
    for (let i = 0; i < leads.length; i += batchSize) {
      const batch = leads.slice(i, i + batchSize)
      const transformedLeads = batch.map(transformLead)

      // Upsert leads
      const { error } = await supabase
        .from('leads')
        .upsert(transformedLeads as never[], {
          onConflict: 'leadsquared_id',
          ignoreDuplicates: false,
        })

      if (error) {
        result.errors.push(`Batch ${i / batchSize + 1}: ${error.message}`)
        result.recordsFailed += batch.length
      } else {
        result.recordsProcessed += batch.length
        // Note: Supabase upsert doesn't tell us created vs updated
        result.recordsCreated += batch.length
      }
    }

    result.success = result.errors.length === 0

    // Update sync log
    await supabase
      .from('sync_logs')
      .update({
        status: result.success ? 'success' : 'partial',
        records_processed: result.recordsProcessed,
        records_created: result.recordsCreated,
        records_updated: result.recordsUpdated,
        records_failed: result.recordsFailed,
        error_message: result.errors.length > 0 ? result.errors.join('; ') : null,
        completed_at: new Date().toISOString(),
      })
      .eq('id', syncLog?.id)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    result.errors.push(errorMessage)

    await supabase
      .from('sync_logs')
      .update({
        status: 'error',
        error_message: errorMessage,
        completed_at: new Date().toISOString(),
      })
      .eq('id', syncLog?.id)
  }

  return result
}

/**
 * Incremental sync - only fetch leads modified since last sync
 */
export async function incrementalSync(): Promise<SyncResult> {
  const supabase = createAdminSupabaseClient()

  // Get last successful sync time
  const { data: lastSync } = await supabase
    .from('sync_logs')
    .select('completed_at')
    .eq('sync_type', 'leadsquared')
    .eq('status', 'success')
    .order('completed_at', { ascending: false })
    .limit(1)
    .single()

  const fromDate = lastSync?.completed_at
    ? format(new Date(lastSync.completed_at), 'yyyy-MM-dd HH:mm:ss')
    : format(subDays(new Date(), 1), 'yyyy-MM-dd')

  return syncLeads(fromDate)
}

/**
 * Update daily metrics based on leads data
 */
export async function updateDailyMetrics(date: string): Promise<void> {
  const supabase = createAdminSupabaseClient()

  // Get lead counts grouped by channel and campus for the date
  const { data: leadCounts } = await supabase
    .from('leads')
    .select('channel_id, campus_id, is_enrolled')
    .eq('created_date', date)

  if (!leadCounts) return

  // Group by channel and campus
  const metrics = new Map<string, { leads: number; enrolls: number }>()

  for (const lead of leadCounts) {
    const key = `${lead.channel_id || 'null'}-${lead.campus_id || 'null'}`
    const current = metrics.get(key) || { leads: 0, enrolls: 0 }
    current.leads++
    if (lead.is_enrolled) current.enrolls++
    metrics.set(key, current)
  }

  // Upsert metrics
  for (const [key, counts] of metrics) {
    const [channelId, campusId] = key.split('-')

    await supabase
      .from('daily_metrics')
      .upsert(
        {
          date,
          channel_id: channelId === 'null' ? null : channelId,
          campus_id: campusId === 'null' ? null : campusId,
          leads_count: counts.leads,
          enrolls_count: counts.enrolls,
          lte_percent:
            counts.leads > 0
              ? Math.round((counts.enrolls / counts.leads) * 10000) / 100
              : 0,
        } as never,
        {
          onConflict: 'date,campus_id,channel_id',
        }
      )
  }
}
