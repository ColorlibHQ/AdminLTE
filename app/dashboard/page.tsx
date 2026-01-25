import { createServerSupabaseClient } from '@/lib/supabase/server'
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns'
import MetricCard from '@/components/MetricCard'
import ChannelSummaryTable from '@/components/ChannelSummaryTable'
import DailyTrendChart from '@/components/DailyTrendChart'

async function getDashboardData() {
  const supabase = createServerSupabaseClient()

  // Get current month date range
  const today = new Date()
  const monthStart = format(startOfMonth(today), 'yyyy-MM-dd')
  const monthEnd = format(endOfMonth(today), 'yyyy-MM-dd')

  // Get last 30 days for trend
  const thirtyDaysAgo = format(subDays(today, 30), 'yyyy-MM-dd')
  const todayStr = format(today, 'yyyy-MM-dd')

  // Fetch metrics for current month
  const { data: monthlyMetrics } = await supabase
    .from('daily_metrics')
    .select(
      `
      date,
      channel_id,
      lead_expense_gross,
      leads_count,
      enrolls_count,
      channels (name)
    `
    )
    .gte('date', monthStart)
    .lte('date', monthEnd)

  // Fetch daily metrics for chart (last 30 days)
  const { data: dailyMetrics } = await supabase
    .from('daily_metrics')
    .select('*')
    .gte('date', thirtyDaysAgo)
    .lte('date', todayStr)
    .order('date')

  // Fetch channels
  const { data: channels } = await supabase
    .from('channels')
    .select('*')
    .order('name')

  // Fetch monthly budgets
  const { data: budgets } = await supabase
    .from('monthly_budgets')
    .select('*')
    .eq('month', monthStart)

  return {
    monthlyMetrics: monthlyMetrics || [],
    dailyMetrics: dailyMetrics || [],
    channels: channels || [],
    budgets: budgets || [],
    dateRange: { start: monthStart, end: monthEnd },
  }
}

export default async function DashboardPage() {
  const { monthlyMetrics, dailyMetrics, channels, budgets, dateRange } =
    await getDashboardData()

  // Calculate totals
  const totals = monthlyMetrics.reduce(
    (acc, m) => ({
      spend: acc.spend + (m.lead_expense_gross || 0),
      leads: acc.leads + (m.leads_count || 0),
      enrolls: acc.enrolls + (m.enrolls_count || 0),
    }),
    { spend: 0, leads: 0, enrolls: 0 }
  )

  const totalBudget = budgets.reduce((acc, b) => acc + (b.budget_amount || 0), 0)
  const budgetRemaining = totalBudget - totals.spend
  const ltePercent =
    totals.leads > 0
      ? ((totals.enrolls / totals.leads) * 100).toFixed(1)
      : '0.0'
  const cpl = totals.leads > 0 ? (totals.spend / totals.leads).toFixed(2) : '0.00'
  const cpe =
    totals.enrolls > 0 ? (totals.spend / totals.enrolls).toFixed(2) : '0.00'

  // Group metrics by channel
  const channelMetrics = channels.map((channel) => {
    const metrics = monthlyMetrics.filter((m) => m.channel_id === channel.id)
    const channelTotals = metrics.reduce(
      (acc, m) => ({
        spend: acc.spend + (m.lead_expense_gross || 0),
        leads: acc.leads + (m.leads_count || 0),
        enrolls: acc.enrolls + (m.enrolls_count || 0),
      }),
      { spend: 0, leads: 0, enrolls: 0 }
    )

    const channelBudget = budgets
      .filter((b) => b.channel_id === channel.id)
      .reduce((acc, b) => acc + (b.budget_amount || 0), 0)

    return {
      ...channel,
      ...channelTotals,
      budget: channelBudget,
      lte:
        channelTotals.leads > 0
          ? ((channelTotals.enrolls / channelTotals.leads) * 100).toFixed(1)
          : '0.0',
      cpl:
        channelTotals.leads > 0
          ? (channelTotals.spend / channelTotals.leads).toFixed(2)
          : '0.00',
      cpe:
        channelTotals.enrolls > 0
          ? (channelTotals.spend / channelTotals.enrolls).toFixed(2)
          : '0.00',
    }
  })

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Marketing Summary</h1>
          <p className="text-muted mb-0">
            {format(new Date(dateRange.start), 'MMMM yyyy')} Overview
          </p>
        </div>
        <div className="d-flex gap-2">
          <select className="form-select form-select-sm" style={{ width: 'auto' }}>
            <option>Current Month</option>
            <option>Last Month</option>
            <option>Last 90 Days</option>
            <option>Year to Date</option>
          </select>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-3">
          <MetricCard
            label="Total Spend"
            value={`$${totals.spend.toLocaleString()}`}
            sublabel={`Budget: $${totalBudget.toLocaleString()}`}
            color="primary"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <MetricCard
            label="Total Leads"
            value={totals.leads.toLocaleString()}
            sublabel={`CPL: $${cpl}`}
            color="info"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <MetricCard
            label="Total Enrolls"
            value={totals.enrolls.toLocaleString()}
            sublabel={`CPE: $${cpe}`}
            color="success"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <MetricCard
            label="LTE Rate"
            value={`${ltePercent}%`}
            sublabel={`Budget Remaining: $${budgetRemaining.toLocaleString()}`}
            color="warning"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-3 mb-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Daily Trend (Last 30 Days)</h5>
            </div>
            <div className="card-body">
              <DailyTrendChart data={dailyMetrics} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Budget vs Spend</h5>
            </div>
            <div className="card-body">
              {channelMetrics.map((channel) => (
                <div key={channel.id} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small">{channel.name}</span>
                    <span className="small">
                      ${channel.spend.toLocaleString()} / $
                      {channel.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div
                      className={`progress-bar ${
                        channel.budget > 0 && channel.spend > channel.budget
                          ? 'bg-danger'
                          : 'bg-primary'
                      }`}
                      style={{
                        width: `${
                          channel.budget > 0
                            ? Math.min((channel.spend / channel.budget) * 100, 100)
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Channel Summary Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Channel Performance</h5>
        </div>
        <div className="card-body p-0">
          <ChannelSummaryTable channels={channelMetrics} />
        </div>
      </div>
    </div>
  )
}
