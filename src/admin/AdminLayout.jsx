import { useState } from 'react'
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'
import AdminLogin from './AdminLogin'

const SESSION_KEY = 'portfolio_admin_auth'
const PIN = import.meta.env.VITE_ADMIN_PIN || 'admin123'

const NAV = [
  {
    to: '/admin',
    label: 'Dashboard',
    end: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    to: '/admin/projects',
    label: 'Projects',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    to: '/admin/resume',
    label: 'Resume',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
]

function Sidebar({ collapsed, onCollapse, onLogout }) {
  return (
    <aside
      className={[
        'h-screen flex flex-col bg-[#0d1117] border-r border-[#30363d] transition-all duration-300 shrink-0',
        collapsed ? 'w-16' : 'w-56',
      ].join(' ')}
    >
      {/* Brand */}
      <div className="h-16 flex items-center px-4 border-b border-[#30363d] gap-3 overflow-hidden">
        <div className="w-8 h-8 rounded-lg bg-[#3b82f6] flex items-center justify-center text-white font-heading font-bold text-xs shrink-0">
          MHR
        </div>
        {!collapsed && (
          <span className="font-heading font-semibold text-white text-sm whitespace-nowrap">
            Admin Panel
          </span>
        )}
        <button
          onClick={onCollapse}
          className="ml-auto text-[#6e7681] hover:text-white transition-colors shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {collapsed
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />}
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-[#3b82f6]/15 text-[#3b82f6]'
                  : 'text-[#8b949e] hover:bg-white/5 hover:text-white',
              ].join(' ')
            }
          >
            {item.icon}
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="px-2 py-4 border-t border-[#30363d] space-y-1">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#8b949e] hover:text-white hover:bg-white/5 transition-colors"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {!collapsed && <span>View Site</span>}
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#8b949e] hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

/* ─── Login Screen ─── */
function LoginScreen({ onSuccess }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (pin === PIN) {
        sessionStorage.setItem(SESSION_KEY, 'true')
        onSuccess()
      } else {
        setError('PIN salah. Coba lagi.')
        setPin('')
      }
      setLoading(false)
    }, 350)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#3b82f6] flex items-center justify-center text-white font-heading font-bold text-xl mb-4">
            MHR
          </div>
          <h1 className="font-heading font-bold text-2xl text-white">Admin Panel</h1>
          <p className="text-[#8b949e] text-sm mt-1">Masukkan PIN untuk melanjutkan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-pin" className="block text-sm font-medium text-[#8b949e] mb-1.5">
              PIN
            </label>
            <input
              id="admin-pin"
              type="password"
              autoComplete="current-password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError('') }}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#161b22] border border-[#30363d] text-white placeholder-[#6e7681] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] text-center text-2xl tracking-widest transition-colors"
            />
            {error && (
              <p className="mt-1.5 text-xs text-red-400 text-center">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!pin || loading}
            className="w-full py-3 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
          >
            {loading ? 'Memeriksa…' : 'Masuk'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#6e7681]">
          PIN default: <code className="text-[#3b82f6]">admin123</code>
          <br />Ubah via <code className="text-[#3b82f6]">VITE_ADMIN_PIN</code> di .env
        </p>
      </div>
    </div>
  )
}

/* ─── Layout (single source of truth for auth state) ─── */
export default function AdminLayout() {
  // Auth state lives HERE — single source of truth
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true')
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => setAuthed(true)

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    navigate('/admin')
  }

  if (!authed) {
    return <LoginScreen onSuccess={handleLogin} />
  }

  return (
    <div className="flex h-screen bg-[#0d1117] overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onCollapse={() => setCollapsed((v) => !v)}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
