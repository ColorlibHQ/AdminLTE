'use client'

interface MetricCardProps {
  label: string
  value: string | number
  sublabel?: string
  change?: number
  color?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
}

export default function MetricCard({
  label,
  value,
  sublabel,
  change,
  color = 'primary',
}: MetricCardProps) {
  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    info: 'bg-info',
    warning: 'bg-warning',
    danger: 'bg-danger',
  }

  return (
    <div className={`small-box text-white ${colorClasses[color]}`}>
      <div className="inner">
        <h3>{value}</h3>
        <p>{label}</p>
        {sublabel && <p className="small opacity-75 mb-0">{sublabel}</p>}
      </div>
      {change !== undefined && (
        <div className="small-box-footer">
          <span className={change >= 0 ? 'text-success' : 'text-danger'}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
          </span>{' '}
          vs last period
        </div>
      )}
    </div>
  )
}
