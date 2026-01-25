'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Channel {
  id: string
  name: string
}

interface Campus {
  id: string
  name: string
}

interface BudgetFormProps {
  channels: Channel[]
  campuses: Campus[]
  month: string
}

export default function BudgetForm({
  channels,
  campuses,
  month,
}: BudgetFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    channel_id: '',
    campus_id: '',
    budget_amount: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          month,
          budget_amount: parseFloat(formData.budget_amount),
          campus_id: formData.campus_id || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save budget')
      }

      // Reset form and refresh
      setFormData({
        channel_id: '',
        campus_id: '',
        budget_amount: '',
        notes: '',
      })
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger py-2 small">{error}</div>
      )}

      <div className="mb-3">
        <label className="form-label small">Channel *</label>
        <select
          className="form-select form-select-sm"
          value={formData.channel_id}
          onChange={(e) =>
            setFormData({ ...formData, channel_id: e.target.value })
          }
          required
        >
          <option value="">Select channel...</option>
          {channels.map((channel) => (
            <option key={channel.id} value={channel.id}>
              {channel.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label small">Campus (optional)</label>
        <select
          className="form-select form-select-sm"
          value={formData.campus_id}
          onChange={(e) =>
            setFormData({ ...formData, campus_id: e.target.value })
          }
        >
          <option value="">All Campuses</option>
          {campuses.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label small">Budget Amount *</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={formData.budget_amount}
            onChange={(e) =>
              setFormData({ ...formData, budget_amount: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label small">Notes</label>
        <textarea
          className="form-control form-control-sm"
          rows={2}
          placeholder="Optional notes..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-sm w-100"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add Budget Entry'}
      </button>
    </form>
  )
}
