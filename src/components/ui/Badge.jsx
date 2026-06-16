const colorMap = {
  Product: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Dev:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  Bootcamp:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Internship:'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Career:  'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  All:     'bg-[#0f2d52] text-white dark:bg-[#3b82f6]',
  default: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.className]
 */
export default function Badge({ label, className = '', ...rest }) {
  const color = colorMap[label] ?? colorMap.default
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        color,
        className,
      ].join(' ')}
      {...rest}
    >
      {label}
    </span>
  )
}
