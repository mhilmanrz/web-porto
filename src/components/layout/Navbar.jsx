import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [])

  const navLinkClass = ({ isActive }) =>
    [
      'relative text-sm font-medium transition-colors duration-150',
      'after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:rounded-full after:transition-all after:duration-200',
      isActive
        ? 'text-[#3b82f6] after:w-full after:bg-[#3b82f6]'
        : 'text-[#1e293b] dark:text-[#e6edf3] hover:text-[#3b82f6] dark:hover:text-[#3b82f6] after:w-0 hover:after:w-full after:bg-[#3b82f6]',
    ].join(' ')

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-md shadow-[0_1px_12px_rgba(15,45,82,0.08)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.4)]'
          : 'bg-white/70 dark:bg-[#0d1117]/70 backdrop-blur-sm',
      ].join(' ')}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Moh Hilman Riski — Home"
        >
          <span className="w-9 h-9 rounded-lg bg-[#0f2d52] dark:bg-[#3b82f6] flex items-center justify-center text-white font-bold text-sm font-heading transition-transform duration-200 group-hover:scale-105 select-none">
            MHR
          </span>
          <span className="hidden sm:block font-heading font-semibold text-[#0f2d52] dark:text-[#e6edf3] text-sm leading-tight">
            Moh Hilman Riski
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={navLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#64748b] dark:text-[#8b949e] hover:text-[#3b82f6] dark:hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 transition-all duration-200"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#64748b] dark:text-[#8b949e] hover:bg-[#0f2d52]/10 dark:hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0d1117] border-t border-[#e2e8f0] dark:border-[#30363d] px-4 py-4 flex flex-col gap-1 animate-fade-in">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                    : 'text-[#1e293b] dark:text-[#e6edf3] hover:bg-[#0f2d52]/5 dark:hover:bg-white/5',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
