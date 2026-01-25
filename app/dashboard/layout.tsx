import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase/server'

async function getChannels() {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.from('channels').select('*').order('name')
  return data || []
}

async function getCampuses() {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase
    .from('campuses')
    .select('*')
    .eq('is_active', true)
    .order('name')
  return data || []
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const channels = await getChannels()
  const campuses = await getCampuses()

  return (
    <div className="app-wrapper">
      {/* Sidebar */}
      <aside className="app-sidebar">
        <div className="sidebar-brand p-3 text-white">
          <Link href="/dashboard" className="text-decoration-none text-white">
            <strong>Tricoci</strong> Marketing
          </Link>
        </div>

        <nav className="mt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link">
                <i className="bi bi-speedometer2 me-2"></i>
                Summary
              </Link>
            </li>

            {/* Channel Detail Links */}
            <li className="nav-item mt-3">
              <span className="nav-link text-muted small text-uppercase">
                Channels
              </span>
            </li>
            {channels.map((channel) => (
              <li key={channel.id} className="nav-item">
                <Link
                  href={`/dashboard/channel/${channel.id}`}
                  className="nav-link"
                >
                  <i
                    className={`bi me-2 ${
                      channel.type === 'paid' ? 'bi-currency-dollar' : 'bi-globe'
                    }`}
                  ></i>
                  {channel.name}
                </Link>
              </li>
            ))}

            {/* Campus Links */}
            <li className="nav-item mt-3">
              <span className="nav-link text-muted small text-uppercase">
                Campuses
              </span>
            </li>
            {campuses.slice(0, 5).map((campus) => (
              <li key={campus.id} className="nav-item">
                <Link
                  href={`/dashboard/campus/${campus.id}`}
                  className="nav-link"
                >
                  <i className="bi bi-building me-2"></i>
                  {campus.name}
                </Link>
              </li>
            ))}
            {campuses.length > 5 && (
              <li className="nav-item">
                <Link href="/dashboard/campuses" className="nav-link">
                  <i className="bi bi-three-dots me-2"></i>
                  View All ({campuses.length})
                </Link>
              </li>
            )}

            {/* Management Links */}
            <li className="nav-item mt-3">
              <span className="nav-link text-muted small text-uppercase">
                Management
              </span>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/budget" className="nav-link">
                <i className="bi bi-wallet2 me-2"></i>
                Budget
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/revenue" className="nav-link">
                <i className="bi bi-cash-stack me-2"></i>
                Revenue
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/dashboard/sync" className="nav-link">
                <i className="bi bi-arrow-repeat me-2"></i>
                Sync Status
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Header */}
      <header className="app-header">
        <div className="d-flex align-items-center w-100">
          <button
            className="btn btn-link text-dark d-lg-none"
            type="button"
            data-bs-toggle="sidebar"
          >
            <i className="bi bi-list fs-4"></i>
          </button>

          <div className="ms-auto d-flex align-items-center gap-3">
            <span className="text-muted small">Last sync: --</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content-wrapper">{children}</main>
    </div>
  )
}
