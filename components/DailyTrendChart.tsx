'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { format, parseISO } from 'date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface DailyMetric {
  date: string
  lead_expense_gross: number
  leads_count: number
  enrolls_count: number
}

interface DailyTrendChartProps {
  data: DailyMetric[]
}

export default function DailyTrendChart({ data }: DailyTrendChartProps) {
  // Group by date and sum values
  const groupedData = data.reduce(
    (acc, item) => {
      const date = item.date
      if (!acc[date]) {
        acc[date] = { spend: 0, leads: 0, enrolls: 0 }
      }
      acc[date].spend += item.lead_expense_gross || 0
      acc[date].leads += item.leads_count || 0
      acc[date].enrolls += item.enrolls_count || 0
      return acc
    },
    {} as Record<string, { spend: number; leads: number; enrolls: number }>
  )

  const sortedDates = Object.keys(groupedData).sort()
  const labels = sortedDates.map((d) => format(parseISO(d), 'MMM d'))

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Leads',
        data: sortedDates.map((d) => groupedData[d].leads),
        borderColor: 'rgb(23, 162, 184)',
        backgroundColor: 'rgba(23, 162, 184, 0.5)',
        yAxisID: 'y',
        tension: 0.3,
      },
      {
        label: 'Enrolls',
        data: sortedDates.map((d) => groupedData[d].enrolls),
        borderColor: 'rgb(40, 167, 69)',
        backgroundColor: 'rgba(40, 167, 69, 0.5)',
        yAxisID: 'y',
        tension: 0.3,
      },
      {
        label: 'Spend ($)',
        data: sortedDates.map((d) => groupedData[d].spend),
        borderColor: 'rgb(111, 66, 193)',
        backgroundColor: 'rgba(111, 66, 193, 0.5)',
        yAxisID: 'y1',
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Count',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Spend ($)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  if (data.length === 0) {
    return (
      <div
        className="d-flex align-items-center justify-content-center text-muted"
        style={{ height: '300px' }}
      >
        <div className="text-center">
          <i className="bi bi-graph-up fs-1 mb-2 d-block"></i>
          <p>No data available for the selected period</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '300px' }}>
      <Line options={options} data={chartData} />
    </div>
  )
}
