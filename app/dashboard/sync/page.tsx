import { createServerSupabaseClient } from '@/lib/supabase/server'
import { format, formatDistanceToNow } from 'date-fns'
import ManualSyncForm from '@/components/ManualSyncForm'

async function getSyncData() {
  const supabase = createServerSupabaseClient()

  // Get recent sync logs
  const { data: syncLogs } = await supabase
    .from('sync_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  // Get last successful sync for each type
  const { data: lastLeadSync } = await supabase
    .from('sync_logs')
    .select('*')
    .eq('sync_type', 'leadsquared')
    .eq('status', 'success')
    .order('completed_at', { ascending: false })
    .limit(1)
    .single()

  const { data: lastAdSync } = await supabase
    .from('sync_logs')
    .select('*')
    .eq('sync_type', 'ad_platforms')
    .eq('status', 'success')
    .order('completed_at', { ascending: false })
    .limit(1)
    .single()

  // Get record counts
  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })

  const { count: metricsCount } = await supabase
    .from('daily_metrics')
    .select('*', { count: 'exact', head: true })

  return {
    syncLogs: syncLogs || [],
    lastLeadSync,
    lastAdSync,
    stats: {
      leads: leadsCount || 0,
      metrics: metricsCount || 0,
    },
  }
}

export default async function SyncPage() {
  const { syncLogs, lastLeadSync, lastAdSync, stats } = await getSyncData()

  const getStatusBadge = (status: string) => {
    const classes: Record<string, string> = {
      success: 'bg-success',
      error: 'bg-danger',
      started: 'bg-warning',
      partial: 'bg-warning',
    }
    return classes[status] || 'bg-secondary'
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1">Data Sync Status</h1>
        <p className="text-muted mb-0">
          Monitor and manage data synchronization from external sources
        </p>
      </div>

      {/* Status Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="text-muted mb-2">LeadSquared Sync</h6>
              {lastLeadSync ? (
                <>
                  <p className="mb-1">
                    <span className={`badge ${getStatusBadge(lastLeadSync.status)}`}>
                      {lastLeadSync.status}
                    </span>
                  </p>
                  <small className="text-muted">
                    {formatDistanceToNow(new Date(lastLeadSync.completed_at), {
                      addSuffix: true,
                    })}
                  </small>
                  <p className="mb-0 small mt-2">
                    {lastLeadSync.records_processed} records processed
                  </p>
                </>
              ) : (
                <p className="text-muted mb-0">No sync yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="text-muted mb-2">Ad Platforms Sync</h6>
              {lastAdSync ? (
                <>
                  <p className="mb-1">
                    <span className={`badge ${getStatusBadge(lastAdSync.status)}`}>
                      {lastAdSync.status}
                    </span>
                  </p>
                  <small className="text-muted">
                    {formatDistanceToNow(new Date(lastAdSync.completed_at), {
                      addSuffix: true,
                    })}
                  </small>
                </>
              ) : (
                <p className="text-muted mb-0">Not configured</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="text-muted mb-2">Total Leads</h6>
              <h3 className="mb-0">{stats.leads.toLocaleString()}</h3>
              <small className="text-muted">in database</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="text-muted mb-2">Daily Metrics</h6>
              <h3 className="mb-0">{stats.metrics.toLocaleString()}</h3>
              <small className="text-muted">records</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Manual Sync */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Manual Sync</h5>
            </div>
            <div className="card-body">
              <ManualSyncForm />
            </div>
          </div>

          {/* API Configuration Status */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="card-title mb-0">API Configuration</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>LeadSquared</span>
                <span className="badge bg-success">Configured</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Google Ads</span>
                <span className="badge bg-secondary">Not Configured</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span>Meta Ads</span>
                <span className="badge bg-secondary">Not Configured</span>
              </div>
              <p className="small text-muted mt-3 mb-0">
                Configure API credentials in your environment variables to enable
                automatic syncing.
              </p>
            </div>
          </div>
        </div>

        {/* Sync History */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Sync History</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive" style={{ maxHeight: '600px' }}>
                <table className="table table-hover table-sm mb-0">
                  <thead className="sticky-top bg-light">
                    <tr>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Records</th>
                      <th>Started</th>
                      <th>Duration</th>
                      <th>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syncLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center text-muted py-4">
                          No sync history yet
                        </td>
                      </tr>
                    ) : (
                      syncLogs.map((log) => {
                        const duration =
                          log.completed_at && log.started_at
                            ? Math.round(
                                (new Date(log.completed_at).getTime() -
                                  new Date(log.started_at).getTime()) /
                                  1000
                              )
                            : null

                        return (
                          <tr key={log.id}>
                            <td>
                              <code className="small">{log.sync_type}</code>
                            </td>
                            <td>
                              <span
                                className={`badge ${getStatusBadge(log.status)}`}
                              >
                                {log.status}
                              </span>
                            </td>
                            <td>
                              {log.records_processed > 0 && (
                                <span className="small">
                                  {log.records_processed} processed
                                  {log.records_failed > 0 && (
                                    <span className="text-danger">
                                      {' '}
                                      ({log.records_failed} failed)
                                    </span>
                                  )}
                                </span>
                              )}
                            </td>
                            <td>
                              <small>
                                {format(
                                  new Date(log.started_at),
                                  'MMM d, HH:mm'
                                )}
                              </small>
                            </td>
                            <td>
                              {duration !== null && (
                                <small>{duration}s</small>
                              )}
                            </td>
                            <td>
                              {log.error_message && (
                                <small
                                  className="text-danger"
                                  title={log.error_message}
                                >
                                  {log.error_message.slice(0, 50)}
                                  {log.error_message.length > 50 && '...'}
                                </small>
                              )}
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
