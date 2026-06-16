import { useState, useCallback } from 'react'

const SESSION_KEY = 'portfolio_admin_auth'
const PIN = import.meta.env.VITE_ADMIN_PIN || 'admin123'

export function useAdminAuth() {
  const [authed, setAuthed] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })

  const login = useCallback((pin) => {
    if (pin === PIN) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setAuthed(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }, [])

  return { authed, login, logout }
}
