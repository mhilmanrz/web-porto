import { useEffect, useRef } from 'react'

const icons = {
  success: (
    <svg className="w-5 h-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" />
    </svg>
  ),
}

/**
 * @param {object} props
 * @param {string} props.message
 * @param {'success'|'error'|'info'} [props.type]
 * @param {function} props.onClose
 */
export default function Toast({ message, type = 'info', onClose }) {
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setTimeout(onClose, 4000)
    return () => clearTimeout(timerRef.current)
  }, [onClose])

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 min-w-[280px] max-w-[400px] px-4 py-3 rounded-xl
        bg-white dark:bg-[#161b22]
        border border-[#e2e8f0] dark:border-[#30363d]
        shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
        animate-fade-in"
    >
      {icons[type]}
      <p className="text-sm text-[#1e293b] dark:text-[#e6edf3] flex-1">{message}</p>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="text-[#64748b] hover:text-[#1e293b] dark:text-[#8b949e] dark:hover:text-[#e6edf3] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
