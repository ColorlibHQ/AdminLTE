import { createServerSupabaseClient } from '@/lib/supabase/server'
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from 'date-fns'
import { notFound } from 'next/navigation'
import MetricCard from '@/components/MetricCard'
import DailyTrendChart from '@/components/DailyTrendChart'
import DailyDetailTable from '@/components/DailyDetailTable'

interface PageProps {
  params: { id: string }
  searchParams: { period?: string }
}

async function getChannelData(channelId: string, period: string = 'month') {
  const supabase = createServerSupabaseClient()

  // Get channel info
  const { data: channel } = await supabase
    .from('channels')
    .select('*')
    .eq('id', channelId)
    .single()

  if (!channel) return null

  // Determine date range
  const today = new Date()
  let startDate: string
  let endDate: string = format(today, 'yyyy-MM-dd')

  switch (period) {
    case 'week':
      startDate = format(subDays(today, 7), 'yyyy-MM-dd')
      break
    case 'quarter':
      startDate = format(subDays(today, 90), 'yyyy-MM-dd')
      break
    case 'year':
      startDate = format(subDays(today, 365), 'yyyy-MM-dd')
      break
    case 'month':
    default:
      startDate = format(startOfMonth(today), 'yyyy-MM-dd')
      endDate = format(endOfMonth(today), 'yyyy-MM-dd')
  }

  // Fetch daily metrics for this channel
  const { data: dailyMetrics } = await supabase
    .from('daily_metrics')
    .select('*')
    .eq('channel_id', channelId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date')

  // Fetch budget for current month
  const monthStart = format(startOfMonth(today), 'yyyy-MM-dd')
  const { data: budgets } = await supabase
    .from('monthly_budgets')
    .select('*')
    .eq('channel_id', channelId)
    .eq('month', monthStart)

  // Fetch weekly view
  const { data: weeklyMetrics } = await supabase
    .from('weekly_metrics')
    .select('*')
    .eq('channel_id', channelId)
    .gte('week_start', startDate)
    .lte('week_end', endDate)
    .order('week_start')

  return {
    channel,
    dailyMetrics: dailyMetrics || [],
    weeklyMetrics: weeklyMetrics || [],
    budgets: budgets || [],
    dateRange: { start: startDate, end: endDate },
  }
}

export default async function ChannelDetailPage({
  params,
  searchParams,
}: PageProps) {
  const data = await getChannelData(params.id, searchParams.period)

  if (!data) {
    notFound()
  }

  const { channel, dailyMetrics, weeklyMetrics, budgets, dateRange } = data

  // Calculate totals
  const totals = dailyMetrics.reduce(
    (acc, m) => ({
      spend: acc.spend + (m.lead_expense_gross || 0),
      leads: acc.leads + (m.leads_count || 0),
      enrolls: acc.enrolls + (m.enrolls_count || 0),
      impressions: acc.impressions + (m.impressions || 0),
      clicks: acc.clicks + (m.clicks || 0),
    }),
    { spend: 0, leads: 0, enrolls: 0, impressions: 0, clicks: 0 }
  )

  const totalBudget = budgets.reduce((acc, b) => acc + (b.budget_amount || 0), 0)
  const ltePercent =
    totals.leads > 0
      ? ((totals.enrolls / totals.leads) * 100).toFixed(1)
      : '0.0'
  const cpl = totals.leads > 0 ? (totals.spend / totals.leads).toFixed(2) : '0.00'
  const cpe =
    totals.enrolls > 0 ? (totals.spend / totals.enrolls).toFixed(2) : '0.00'
  const ctr =
    totals.impressions > 0
      ? ((totals.clicks / totals.impressions) * 100).toFixed(2)
      : '0.00'

  // Prepare daily data with all dates in range
  const allDates = eachDayOfInterval({
    start: parseISO(dateRange.start),
    end: parseISO(dateRange.end),
  })

  const dailyDataMap = new Map(dailyMetrics.map((m) => [m.date, m]))
  const completeDaily = allDates.map((date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const existing = dailyDataMap.get(dateStr)
    return (
      existing || {
        date: dateStr,
        lead_expense_gross: 0,
        leads_count: 0,
        enrolls_count: 0,
        impressions: 0,
        clicks: 0,
      }
    )
  })

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <a href="/dashboard">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">{channel.name}</li>
            </ol>
          </nav>
          <h1 className="h3 mb-0">
            <span
              className={`channel-badge me-2 ${
                channel.name.toLowerCase().includes('sem')
                  ? 'paid-sem'
                  : channel.name.toLowerCase().includes('social')
                    ? 'paid-social'
                    : 'organic'
              }`}
            >
              {channel.type}
            </span>
            {channel.name} Detail
          </h1>
        </div>
        <div className="d-flex gap-2">
          <a
            href={`?period=week`}
            className={`btn btn-sm ${searchParams.period === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            Week
          </a>
          <a
            href={`?period=month`}
            className={`btn btn-sm ${!searchParams.period || searchParams.period === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            Month
          </a>
          <a
            href={`?period=quarter`}
            className={`btn btn-sm ${searchParams.period === 'quarter' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            Quarter
          </a>
          <a
            href={`?period=year`}
            className={`btn btn-sm ${searchParams.period === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            YTD
          </a>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-2">
          <MetricCard
            label="Spend"
            value={`$${totals.spend.toLocaleString()}`}
            sublabel={`Budget: $${totalBudget.toLocaleString()}`}
            color="primary"
          />
        </div>
        <div className="col-md-6 col-lg-2">
          <MetricCard
            label="Leads"
            value={totals.leads.toLocaleString()}
            sublabel={`CPL: $${cpl}`}
            color="info"
          />
        </div>
        <div className="col-md-6 col-lg-2">
          <MetricCard
            label="Enrolls"
            value={totals.enrolls.toLocaleString()}
            sublabel={`CPE: $${cpe}`}
            color="success"
          />
        </div>
        <div className="col-md-6 col-lg-2">
          <MetricCard
            label="LTE%"
            value={`${ltePercent}%`}
            color="warning"
          />
        </div>
        <div className="col-md-6 col-lg-2">
          <MetricCard
            label="Impressions"
            value={totals.impressions.toLocaleString()}
            sublabel={`CTR: ${ctr}%`}
            color="secondary"
          />
        </div>
        <div className="col-md-6 col-lg-2">
          <MetricCard
            label="Clicks"
            value={totals.clicks.toLocaleString()}
            color="secondary"
          />
        </div>
      </div>

      {/* Daily Trend Chart */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">Daily Trend</h5>
        </div>
        <div className="card-body">
          <DailyTrendChart data={completeDaily} />
        </div>
      </div>

      {/* Weekly Summary */}
      {weeklyMetrics.length > 0 && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">Weekly Summary</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Week</th>
                    <th className="text-end">Spend</th>
                    <th className="text-end">Leads</th>
                    <th className="text-end">Enrolls</th>
                    <th className="text-end">LTE%</th>
                    <th className="text-end">CPL</th>
                    <th className="text-end">CPE</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyMetrics.map((week) => (
                    <tr key={week.week_start}>
                      <td>
                        Week {week.week_number}
                        <br />
                        <small className="text-muted">
                          {format(parseISO(week.week_start), 'MMM d')} -{' '}
                          {format(parseISO(week.week_end), 'MMM d')}
                        </small>
                      </td>
                      <td className="text-end">
                        ${(week.lead_expense || 0).toLocaleString()}
                      </td>
                      <td className="text-end">{week.leads || 0}</td>
                      <td className="text-end">{week.enrolls || 0}</td>
                      <td className="text-end">{week.lte_percent || 0}%</td>
                      <td className="text-end">${week.cpl || '0.00'}</td>
                      <td className="text-end">${week.cpe || '0.00'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Daily Detail Table */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Daily Detail</h5>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="bi bi-download me-1"></i> Export CSV
          </button>
        </div>
        <div className="card-body p-0">
          <DailyDetailTable data={completeDaily} />
        </div>
      </div>
    </div>
  )
}
