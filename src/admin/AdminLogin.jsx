import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdminAuth } from '../hooks/useAdminAuth'

export default function AdminLogin({ onSuccess }) {
  const { login } = useAdminAuth()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const ok = login(pin)
      if (ok) {
        onSuccess?.()
      } else {
        setError('PIN salah. Coba lagi.')
        setPin('')
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
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
      </motion.div>
    </div>
  )
}
