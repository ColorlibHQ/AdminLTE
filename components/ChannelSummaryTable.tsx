'use client'

import Link from 'next/link'

interface ChannelData {
  id: string
  name: string
  type: string
  spend: number
  leads: number
  enrolls: number
  budget: number
  lte: string
  cpl: string
  cpe: string
}

interface ChannelSummaryTableProps {
  channels: ChannelData[]
}

export default function ChannelSummaryTable({
  channels,
}: ChannelSummaryTableProps) {
  const totals = channels.reduce(
    (acc, c) => ({
      spend: acc.spend + c.spend,
      leads: acc.leads + c.leads,
      enrolls: acc.enrolls + c.enrolls,
      budget: acc.budget + c.budget,
    }),
    { spend: 0, leads: 0, enrolls: 0, budget: 0 }
  )

  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>Channel</th>
            <th className="text-end">Budget</th>
            <th className="text-end">Spend</th>
            <th className="text-end">Leads</th>
            <th className="text-end">Enrolls</th>
            <th className="text-end">LTE%</th>
            <th className="text-end">CPL</th>
            <th className="text-end">CPE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr key={channel.id}>
              <td>
                <span
                  className={`channel-badge ${
                    channel.name.toLowerCase().includes('sem')
                      ? 'paid-sem'
                      : channel.name.toLowerCase().includes('social')
                        ? 'paid-social'
                        : 'organic'
                  }`}
                >
                  {channel.name}
                </span>
              </td>
              <td className="text-end">${channel.budget.toLocaleString()}</td>
              <td className="text-end">
                <span
                  className={
                    channel.spend > channel.budget ? 'text-danger fw-bold' : ''
                  }
                >
                  ${channel.spend.toLocaleString()}
                </span>
              </td>
              <td className="text-end">{channel.leads.toLocaleString()}</td>
              <td className="text-end">{channel.enrolls.toLocaleString()}</td>
              <td className="text-end">{channel.lte}%</td>
              <td className="text-end">${channel.cpl}</td>
              <td className="text-end">${channel.cpe}</td>
              <td>
                <Link
                  href={`/dashboard/channel/${channel.id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="table-light">
          <tr className="fw-bold">
            <td>Total</td>
            <td className="text-end">${totals.budget.toLocaleString()}</td>
            <td className="text-end">${totals.spend.toLocaleString()}</td>
            <td className="text-end">{totals.leads.toLocaleString()}</td>
            <td className="text-end">{totals.enrolls.toLocaleString()}</td>
            <td className="text-end">
              {totals.leads > 0
                ? ((totals.enrolls / totals.leads) * 100).toFixed(1)
                : '0.0'}
              %
            </td>
            <td className="text-end">
              ${totals.leads > 0 ? (totals.spend / totals.leads).toFixed(2) : '0.00'}
            </td>
            <td className="text-end">
              $
              {totals.enrolls > 0
                ? (totals.spend / totals.enrolls).toFixed(2)
                : '0.00'}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
