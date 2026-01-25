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

interface Program {
  id: string
  name: string
}

interface RevenueFormProps {
  channels: Channel[]
  campuses: Campus[]
  programs: Program[]
  month: string
}

export default function RevenueForm({
  channels,
  campuses,
  programs,
  month,
}: RevenueFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    channel_id: '',
    campus_id: '',
    program_id: '',
    enrollments: '',
    revenue: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/revenue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          month,
          enrollments: parseInt(formData.enrollments) || 0,
          revenue: parseFloat(formData.revenue) || 0,
          campus_id: formData.campus_id || null,
          program_id: formData.program_id || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save revenue entry')
      }

      // Reset form and refresh
      setFormData({
        channel_id: '',
        campus_id: '',
        program_id: '',
        enrollments: '',
        revenue: '',
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
      {error && <div className="alert alert-danger py-2 small">{error}</div>}

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
        <label className="form-label small">Program (optional)</label>
        <select
          className="form-select form-select-sm"
          value={formData.program_id}
          onChange={(e) =>
            setFormData({ ...formData, program_id: e.target.value })
          }
        >
          <option value="">All Programs</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-6">
          <label className="form-label small">Enrollments *</label>
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="0"
            min="0"
            value={formData.enrollments}
            onChange={(e) =>
              setFormData({ ...formData, enrollments: e.target.value })
            }
            required
          />
        </div>
        <div className="col-6">
          <label className="form-label small">Revenue *</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData.revenue}
              onChange={(e) =>
                setFormData({ ...formData, revenue: e.target.value })
              }
              required
            />
          </div>
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
        className="btn btn-success btn-sm w-100"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add Revenue Entry'}
      </button>
    </form>
  )
}
