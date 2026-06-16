import { forwardRef } from 'react'

const variants = {
  primary:
    'bg-[#0f2d52] hover:bg-[#1a4a80] text-white dark:bg-[#3b82f6] dark:hover:bg-[#2563eb]',
  accent:
    'bg-[#3b82f6] hover:bg-[#2563eb] text-white',
  outline:
    'border border-[#0f2d52] text-[#0f2d52] hover:bg-[#0f2d52] hover:text-white dark:border-[#3b82f6] dark:text-[#3b82f6] dark:hover:bg-[#3b82f6] dark:hover:text-white',
  ghost:
    'text-[#0f2d52] hover:bg-[#0f2d52]/10 dark:text-[#e6edf3] dark:hover:bg-white/10',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
}

/**
 * @param {object} props
 * @param {'primary'|'accent'|'outline'|'ghost'} [props.variant]
 * @param {'sm'|'md'|'lg'} [props.size]
 * @param {boolean} [props.isLoading]
 * @param {string} [props.className]
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', isLoading = false, className = '', children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={isLoading || rest.disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {isLoading && (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {children}
    </button>
  )
})

export default Button
