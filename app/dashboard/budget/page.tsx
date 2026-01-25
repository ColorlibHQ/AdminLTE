import { createServerSupabaseClient } from '@/lib/supabase/server'
import { format, startOfMonth, addMonths, subMonths } from 'date-fns'
import BudgetForm from '@/components/BudgetForm'

async function getBudgetData(month?: string) {
  const supabase = createServerSupabaseClient()

  const targetMonth = month || format(startOfMonth(new Date()), 'yyyy-MM-dd')

  // Get channels
  const { data: channels } = await supabase
    .from('channels')
    .select('*')
    .order('name')

  // Get campuses
  const { data: campuses } = await supabase
    .from('campuses')
    .select('*')
    .eq('is_active', true)
    .order('name')

  // Get budgets for the month
  const { data: budgets } = await supabase
    .from('monthly_budgets')
    .select(
      `
      *,
      channels (name),
      campuses (name)
    `
    )
    .eq('month', targetMonth)
    .order('created_at')

  // Get last 6 months for history
  const sixMonthsAgo = format(subMonths(new Date(), 6), 'yyyy-MM-dd')
  const { data: budgetHistory } = await supabase
    .from('monthly_budgets')
    .select('month, budget_amount, channel_id')
    .gte('month', sixMonthsAgo)
    .order('month')

  return {
    channels: channels || [],
    campuses: campuses || [],
    budgets: budgets || [],
    budgetHistory: budgetHistory || [],
    currentMonth: targetMonth,
  }
}

export default async function BudgetPage({
  searchParams,
}: {
  searchParams: { month?: string }
}) {
  const { channels, campuses, budgets, budgetHistory, currentMonth } =
    await getBudgetData(searchParams.month)

  // Calculate totals by channel
  const channelTotals = channels.map((channel) => {
    const channelBudgets = budgets.filter((b) => b.channel_id === channel.id)
    const total = channelBudgets.reduce(
      (acc, b) => acc + (b.budget_amount || 0),
      0
    )
    return { ...channel, total }
  })

  const grandTotal = channelTotals.reduce((acc, c) => acc + c.total, 0)

  // Generate month navigation
  const prevMonth = format(subMonths(new Date(currentMonth), 1), 'yyyy-MM-dd')
  const nextMonth = format(addMonths(new Date(currentMonth), 1), 'yyyy-MM-dd')

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Budget Management</h1>
          <p className="text-muted mb-0">
            Set and track monthly marketing budgets by channel
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <a href={`?month=${prevMonth}`} className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-chevron-left"></i>
          </a>
          <span className="fw-bold">
            {format(new Date(currentMonth), 'MMMM yyyy')}
          </span>
          <a href={`?month=${nextMonth}`} className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-chevron-right"></i>
          </a>
        </div>
      </div>

      <div className="row">
        {/* Budget Summary */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Budget Summary</h5>
            </div>
            <div className="card-body">
              {channelTotals.map((channel) => (
                <div
                  key={channel.id}
                  className="d-flex justify-content-between py-2 border-bottom"
                >
                  <span>{channel.name}</span>
                  <strong>${channel.total.toLocaleString()}</strong>
                </div>
              ))}
              <div className="d-flex justify-content-between py-2 mt-2">
                <strong>Total Budget</strong>
                <strong className="text-primary">
                  ${grandTotal.toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          {/* Quick Add */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Add Budget Entry</h5>
            </div>
            <div className="card-body">
              <BudgetForm
                channels={channels}
                campuses={campuses}
                month={currentMonth}
              />
            </div>
          </div>
        </div>

        {/* Budget Details */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Budget Entries</h5>
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
                      <th className="text-end">Budget</th>
                      <th>Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgets.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-muted py-4">
                          No budget entries for this month.
                          <br />
                          Use the form to add budget allocations.
                        </td>
                      </tr>
                    ) : (
                      budgets.map((budget) => (
                        <tr key={budget.id}>
                          <td>{(budget.channels as { name: string })?.name}</td>
                          <td>
                            {(budget.campuses as { name: string })?.name || (
                              <span className="text-muted">All Campuses</span>
                            )}
                          </td>
                          <td className="text-end">
                            ${budget.budget_amount.toLocaleString()}
                          </td>
                          <td>
                            <small className="text-muted">
                              {budget.notes || '-'}
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

          {/* Budget History Chart */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="card-title mb-0">6-Month Budget Trend</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Channel</th>
                      {Array.from({ length: 6 }, (_, i) => {
                        const month = subMonths(new Date(), 5 - i)
                        return (
                          <th key={i} className="text-end">
                            {format(month, 'MMM')}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {channels.map((channel) => (
                      <tr key={channel.id}>
                        <td>{channel.name}</td>
                        {Array.from({ length: 6 }, (_, i) => {
                          const month = format(
                            startOfMonth(subMonths(new Date(), 5 - i)),
                            'yyyy-MM-dd'
                          )
                          const monthBudget = budgetHistory
                            .filter(
                              (b) =>
                                b.channel_id === channel.id && b.month === month
                            )
                            .reduce((acc, b) => acc + (b.budget_amount || 0), 0)
                          return (
                            <td key={i} className="text-end">
                              {monthBudget > 0
                                ? `$${monthBudget.toLocaleString()}`
                                : '-'}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
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
