import { createServerSupabaseClient } from '@/lib/supabase/server'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import Link from 'next/link'

async function getCampusData() {
  const supabase = createServerSupabaseClient()

  const today = new Date()
  const monthStart = format(startOfMonth(today), 'yyyy-MM-dd')
  const monthEnd = format(endOfMonth(today), 'yyyy-MM-dd')

  // Get all campuses
  const { data: campuses } = await supabase
    .from('campuses')
    .select('*')
    .order('name')

  // Get metrics aggregated by campus for current month
  const { data: metrics } = await supabase
    .from('daily_metrics')
    .select('campus_id, lead_expense_gross, leads_count, enrolls_count')
    .gte('date', monthStart)
    .lte('date', monthEnd)
    .not('campus_id', 'is', null)

  // Aggregate metrics by campus
  const campusMetrics = new Map<
    string,
    { spend: number; leads: number; enrolls: number }
  >()

  for (const metric of metrics || []) {
    if (!metric.campus_id) continue
    const current = campusMetrics.get(metric.campus_id) || {
      spend: 0,
      leads: 0,
      enrolls: 0,
    }
    current.spend += metric.lead_expense_gross || 0
    current.leads += metric.leads_count || 0
    current.enrolls += metric.enrolls_count || 0
    campusMetrics.set(metric.campus_id, current)
  }

  // Get budgets by campus
  const { data: budgets } = await supabase
    .from('monthly_budgets')
    .select('campus_id, budget_amount')
    .eq('month', monthStart)
    .not('campus_id', 'is', null)

  const campusBudgets = new Map<string, number>()
  for (const budget of budgets || []) {
    if (!budget.campus_id) continue
    const current = campusBudgets.get(budget.campus_id) || 0
    campusBudgets.set(budget.campus_id, current + (budget.budget_amount || 0))
  }

  return {
    campuses: campuses || [],
    campusMetrics,
    campusBudgets,
    currentMonth: monthStart,
  }
}

export default async function CampusesPage() {
  const { campuses, campusMetrics, campusBudgets, currentMonth } =
    await getCampusData()

  // Calculate totals
  const totals = {
    spend: 0,
    leads: 0,
    enrolls: 0,
    budget: 0,
  }

  const campusData = campuses.map((campus) => {
    const metrics = campusMetrics.get(campus.id) || {
      spend: 0,
      leads: 0,
      enrolls: 0,
    }
    const budget = campusBudgets.get(campus.id) || 0

    totals.spend += metrics.spend
    totals.leads += metrics.leads
    totals.enrolls += metrics.enrolls
    totals.budget += budget

    return {
      ...campus,
      ...metrics,
      budget,
      lte:
        metrics.leads > 0
          ? ((metrics.enrolls / metrics.leads) * 100).toFixed(1)
          : '0.0',
      cpl: metrics.leads > 0 ? (metrics.spend / metrics.leads).toFixed(2) : '0.00',
      cpe:
        metrics.enrolls > 0
          ? (metrics.spend / metrics.enrolls).toFixed(2)
          : '0.00',
    }
  })

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1">All Campuses</h1>
        <p className="text-muted mb-0">
          Performance overview for {format(new Date(currentMonth), 'MMMM yyyy')}
        </p>
      </div>

      {/* Campus Grid */}
      <div className="row g-3 mb-4">
        {campusData.map((campus) => (
          <div key={campus.id} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">{campus.name}</h6>
                {!campus.is_active && (
                  <span className="badge bg-secondary">Inactive</span>
                )}
              </div>
              <div className="card-body">
                <div className="row text-center mb-3">
                  <div className="col-4">
                    <div className="small text-muted">Spend</div>
                    <div className="fw-bold">${campus.spend.toLocaleString()}</div>
                  </div>
                  <div className="col-4">
                    <div className="small text-muted">Leads</div>
                    <div className="fw-bold">{campus.leads}</div>
                  </div>
                  <div className="col-4">
                    <div className="small text-muted">Enrolls</div>
                    <div className="fw-bold">{campus.enrolls}</div>
                  </div>
                </div>

                <div className="row text-center small">
                  <div className="col-4">
                    <span className="text-muted">LTE: </span>
                    <span>{campus.lte}%</span>
                  </div>
                  <div className="col-4">
                    <span className="text-muted">CPL: </span>
                    <span>${campus.cpl}</span>
                  </div>
                  <div className="col-4">
                    <span className="text-muted">CPE: </span>
                    <span>${campus.cpe}</span>
                  </div>
                </div>

                {campus.budget > 0 && (
                  <div className="mt-3">
                    <div className="d-flex justify-content-between small mb-1">
                      <span>Budget</span>
                      <span>
                        ${campus.spend.toLocaleString()} / $
                        {campus.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div
                        className={`progress-bar ${
                          campus.spend > campus.budget ? 'bg-danger' : 'bg-primary'
                        }`}
                        style={{
                          width: `${Math.min((campus.spend / campus.budget) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="card-footer bg-transparent">
                <Link
                  href={`/dashboard/campus/${campus.id}`}
                  className="btn btn-sm btn-outline-primary w-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Campus Comparison</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Campus</th>
                  <th className="text-end">Budget</th>
                  <th className="text-end">Spend</th>
                  <th className="text-end">Leads</th>
                  <th className="text-end">Enrolls</th>
                  <th className="text-end">LTE%</th>
                  <th className="text-end">CPL</th>
                  <th className="text-end">CPE</th>
                </tr>
              </thead>
              <tbody>
                {campusData
                  .filter((c) => c.is_active)
                  .sort((a, b) => b.spend - a.spend)
                  .map((campus) => (
                    <tr key={campus.id}>
                      <td>
                        <Link
                          href={`/dashboard/campus/${campus.id}`}
                          className="text-decoration-none"
                        >
                          {campus.name}
                        </Link>
                      </td>
                      <td className="text-end">
                        ${campus.budget.toLocaleString()}
                      </td>
                      <td className="text-end">
                        <span
                          className={
                            campus.budget > 0 && campus.spend > campus.budget
                              ? 'text-danger fw-bold'
                              : ''
                          }
                        >
                          ${campus.spend.toLocaleString()}
                        </span>
                      </td>
                      <td className="text-end">{campus.leads}</td>
                      <td className="text-end">{campus.enrolls}</td>
                      <td className="text-end">{campus.lte}%</td>
                      <td className="text-end">${campus.cpl}</td>
                      <td className="text-end">${campus.cpe}</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot className="table-light">
                <tr className="fw-bold">
                  <td>Total</td>
                  <td className="text-end">${totals.budget.toLocaleString()}</td>
                  <td className="text-end">${totals.spend.toLocaleString()}</td>
                  <td className="text-end">{totals.leads}</td>
                  <td className="text-end">{totals.enrolls}</td>
                  <td className="text-end">
                    {totals.leads > 0
                      ? ((totals.enrolls / totals.leads) * 100).toFixed(1)
                      : '0.0'}
                    %
                  </td>
                  <td className="text-end">
                    $
                    {totals.leads > 0
                      ? (totals.spend / totals.leads).toFixed(2)
                      : '0.00'}
                  </td>
                  <td className="text-end">
                    $
                    {totals.enrolls > 0
                      ? (totals.spend / totals.enrolls).toFixed(2)
                      : '0.00'}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
