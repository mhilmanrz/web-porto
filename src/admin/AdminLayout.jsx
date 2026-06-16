import { useState, useEffect } from 'react'
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

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

/* ── Login Screen ── */
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // onAuthStateChanged in parent will handle the rest
    } catch (err) {
      const msg = {
        'auth/invalid-credential': 'Email atau password salah.',
        'auth/user-not-found': 'Akun tidak ditemukan.',
        'auth/wrong-password': 'Password salah.',
        'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti.',
        'auth/invalid-email': 'Format email tidak valid.',
      }[err.code] ?? 'Login gagal. Coba lagi.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#3b82f6] flex items-center justify-center text-white font-heading font-bold text-xl mb-4">
            MHR
          </div>
          <h1 className="font-heading font-bold text-2xl text-white">Admin Panel</h1>
          <p className="text-[#8b949e] text-sm mt-1">Masuk dengan akun admin kamu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-[#8b949e] mb-1.5">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="admin@email.com"
              className="w-full px-4 py-3 rounded-xl bg-[#161b22] border border-[#30363d] text-white placeholder-[#6e7681] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-[#8b949e] mb-1.5">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#161b22] border border-[#30363d] text-white placeholder-[#6e7681] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-colors"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>
          )}
          <button
            type="submit"
            disabled={!email || !password || loading}
            className="w-full py-3 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
          >
            {loading ? 'Masuk…' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ── Sidebar ── */
function Sidebar({ collapsed, onCollapse, onLogout, userEmail }) {
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

      {/* User + Footer */}
      <div className="px-2 py-4 border-t border-[#30363d] space-y-1">
        {!collapsed && userEmail && (
          <p className="text-[10px] text-[#6e7681] px-3 mb-2 truncate" title={userEmail}>
            {userEmail}
          </p>
        )}
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

/* ── Layout (single auth source of truth) ── */
export default function AdminLayout() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return unsub
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/admin')
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="w-8 h-8 rounded-full border-2 border-[#3b82f6] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <LoginScreen />
  }

  return (
    <div className="flex h-screen bg-[#0d1117] overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onCollapse={() => setCollapsed((v) => !v)}
        onLogout={handleLogout}
        userEmail={user.email}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
