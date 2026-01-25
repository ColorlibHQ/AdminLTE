'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format, subDays } from 'date-fns'

export default function ManualSyncForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const today = format(new Date(), 'yyyy-MM-dd')
  const defaultFrom = format(subDays(new Date(), 30), 'yyyy-MM-dd')

  const [formData, setFormData] = useState({
    fromDate: defaultFrom,
    toDate: today,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/sync/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      setResult({
        success: data.success,
        message: data.success
          ? `Synced ${data.stats?.processed || 0} records`
          : data.error || 'Sync failed',
      })

      if (data.success) {
        router.refresh()
      }
    } catch (err) {
      setResult({
        success: false,
        message: err instanceof Error ? err.message : 'An error occurred',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="small text-muted mb-3">
        Manually trigger a sync from LeadSquared for a specific date range.
      </p>

      {result && (
        <div
          className={`alert py-2 small ${
            result.success ? 'alert-success' : 'alert-danger'
          }`}
        >
          {result.message}
        </div>
      )}

      <div className="row g-2 mb-3">
        <div className="col-6">
          <label className="form-label small">From Date</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={formData.fromDate}
            onChange={(e) =>
              setFormData({ ...formData, fromDate: e.target.value })
            }
            required
          />
        </div>
        <div className="col-6">
          <label className="form-label small">To Date</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={formData.toDate}
            onChange={(e) =>
              setFormData({ ...formData, toDate: e.target.value })
            }
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-sm w-100"
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>
            Syncing...
          </>
        ) : (
          <>
            <i className="bi bi-arrow-repeat me-1"></i>
            Start Sync
          </>
        )}
      </button>
    </form>
  )
}
