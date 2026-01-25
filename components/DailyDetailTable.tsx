'use client'

import { format, parseISO, getDay } from 'date-fns'

interface DailyData {
  date: string
  lead_expense_gross: number
  leads_count: number
  enrolls_count: number
  impressions?: number
  clicks?: number
}

interface DailyDetailTableProps {
  data: DailyData[]
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function DailyDetailTable({ data }: DailyDetailTableProps) {
  // Sort by date descending (most recent first)
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="table-responsive" style={{ maxHeight: '500px' }}>
      <table className="table table-hover table-sm mb-0">
        <thead className="sticky-top bg-light">
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th className="text-end">Spend</th>
            <th className="text-end">Leads</th>
            <th className="text-end">Enrolls</th>
            <th className="text-end">LTE%</th>
            <th className="text-end">CPL</th>
            <th className="text-end">CPE</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => {
            const date = parseISO(row.date)
            const dayOfWeek = getDay(date)
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
            const lte =
              row.leads_count > 0
                ? ((row.enrolls_count / row.leads_count) * 100).toFixed(1)
                : '0.0'
            const cpl =
              row.leads_count > 0
                ? (row.lead_expense_gross / row.leads_count).toFixed(2)
                : '0.00'
            const cpe =
              row.enrolls_count > 0
                ? (row.lead_expense_gross / row.enrolls_count).toFixed(2)
                : '0.00'

            return (
              <tr
                key={row.date}
                className={isWeekend ? 'table-secondary' : ''}
              >
                <td>{format(date, 'MMM d, yyyy')}</td>
                <td>
                  <span className={isWeekend ? 'text-muted' : ''}>
                    {dayNames[dayOfWeek]}
                  </span>
                </td>
                <td className="text-end">
                  ${row.lead_expense_gross.toLocaleString()}
                </td>
                <td className="text-end">{row.leads_count}</td>
                <td className="text-end">{row.enrolls_count}</td>
                <td className="text-end">{lte}%</td>
                <td className="text-end">${cpl}</td>
                <td className="text-end">${cpe}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
