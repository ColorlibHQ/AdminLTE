import { createServerSupabaseClient } from '@/lib/supabase/server'
import { format, startOfMonth, addMonths, subMonths } from 'date-fns'
import RevenueForm from '@/components/RevenueForm'

async function getRevenueData(month?: string) {
  const supabase = createServerSupabaseClient()

  const targetMonth = month || format(startOfMonth(new Date()), 'yyyy-MM-dd')

  // Get reference data
  const { data: channels } = await supabase
    .from('channels')
    .select('*')
    .order('name')

  const { data: campuses } = await supabase
    .from('campuses')
    .select('*')
    .eq('is_active', true)
    .order('name')

  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .eq('is_active', true)
    .order('name')

  // Get revenue entries for the month
  const { data: revenueEntries } = await supabase
    .from('revenue_entries')
    .select(
      `
      *,
      channels (name),
      campuses (name),
      programs (name)
    `
    )
    .eq('month', targetMonth)
    .order('created_at')

  // Get 6-month history
  const sixMonthsAgo = format(subMonths(new Date(), 6), 'yyyy-MM-dd')
  const { data: revenueHistory } = await supabase
    .from('revenue_entries')
    .select('month, revenue, enrollments, channel_id')
    .gte('month', sixMonthsAgo)
    .order('month')

  return {
    channels: channels || [],
    campuses: campuses || [],
    programs: programs || [],
    revenueEntries: revenueEntries || [],
    revenueHistory: revenueHistory || [],
    currentMonth: targetMonth,
  }
}

export default async function RevenuePage({
  searchParams,
}: {
  searchParams: { month?: string }
}) {
  const {
    channels,
    campuses,
    programs,
    revenueEntries,
    revenueHistory,
    currentMonth,
  } = await getRevenueData(searchParams.month)

  // Calculate totals by channel
  const channelTotals = channels.map((channel) => {
    const entries = revenueEntries.filter((e) => e.channel_id === channel.id)
    const revenue = entries.reduce((acc, e) => acc + (e.revenue || 0), 0)
    const enrollments = entries.reduce(
      (acc, e) => acc + (e.enrollments || 0),
      0
    )
    return { ...channel, revenue, enrollments }
  })

  const grandTotalRevenue = channelTotals.reduce((acc, c) => acc + c.revenue, 0)
  const grandTotalEnrollments = channelTotals.reduce(
    (acc, c) => acc + c.enrollments,
    0
  )

  // Month navigation
  const prevMonth = format(subMonths(new Date(currentMonth), 1), 'yyyy-MM-dd')
  const nextMonth = format(addMonths(new Date(currentMonth), 1), 'yyyy-MM-dd')

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Revenue Tracking</h1>
          <p className="text-muted mb-0">
            Track enrollments and revenue by channel, campus, and program
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <a
            href={`?month=${prevMonth}`}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="bi bi-chevron-left"></i>
          </a>
          <span className="fw-bold">
            {format(new Date(currentMonth), 'MMMM yyyy')}
          </span>
          <a
            href={`?month=${nextMonth}`}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="bi bi-chevron-right"></i>
          </a>
        </div>
      </div>

      <div className="row">
        {/* Revenue Summary */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Revenue Summary</h5>
            </div>
            <div className="card-body">
              {channelTotals.map((channel) => (
                <div
                  key={channel.id}
                  className="d-flex justify-content-between py-2 border-bottom"
                >
                  <div>
                    <span>{channel.name}</span>
                    <br />
                    <small className="text-muted">
                      {channel.enrollments} enrollments
                    </small>
                  </div>
                  <strong>${channel.revenue.toLocaleString()}</strong>
                </div>
              ))}
              <div className="d-flex justify-content-between py-2 mt-2">
                <div>
                  <strong>Total Revenue</strong>
                  <br />
                  <small className="text-muted">
                    {grandTotalEnrollments} enrollments
                  </small>
                </div>
                <strong className="text-success">
                  ${grandTotalRevenue.toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          {/* Add Revenue Entry */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Add Revenue Entry</h5>
            </div>
            <div className="card-body">
              <RevenueForm
                channels={channels}
                campuses={campuses}
                programs={programs}
                month={currentMonth}
              />
            </div>
          </div>
        </div>

        {/* Revenue Details */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Revenue Entries</h5>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="bi bi-download me-1"></i> Export
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Channel</th>
                      <th>Campus</th>
                      <th>Program</th>
                      <th className="text-end">Enrollments</th>
                      <th className="text-end">Revenue</th>
                      <th>Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueEntries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center text-muted py-4">
                          No revenue entries for this month.
                          <br />
                          Use the form to add revenue data.
                        </td>
                      </tr>
                    ) : (
                      revenueEntries.map((entry) => (
                        <tr key={entry.id}>
                          <td>
                            {(entry.channels as { name: string })?.name || '-'}
                          </td>
                          <td>
                            {(entry.campuses as { name: string })?.name || (
                              <span className="text-muted">All</span>
                            )}
                          </td>
                          <td>
                            {(entry.programs as { name: string })?.name || (
                              <span className="text-muted">All</span>
                            )}
                          </td>
                          <td className="text-end">{entry.enrollments}</td>
                          <td className="text-end">
                            ${entry.revenue.toLocaleString()}
                          </td>
                          <td>
                            <small className="text-muted">
                              {entry.notes || '-'}
                            </small>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">
                              Edit
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Revenue Per Enrollment */}
          {grandTotalEnrollments > 0 && (
            <div className="card mt-4">
              <div className="card-header">
                <h5 className="card-title mb-0">Revenue per Enrollment</h5>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  {channelTotals
                    .filter((c) => c.enrollments > 0)
                    .map((channel) => (
                      <div key={channel.id} className="col-md-4 mb-3">
                        <h4 className="mb-0">
                          ${(channel.revenue / channel.enrollments).toFixed(0)}
                        </h4>
                        <small className="text-muted">{channel.name}</small>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
