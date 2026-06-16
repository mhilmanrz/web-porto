/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {boolean} [props.hover] - Enable lift-on-hover effect
 */
export default function Card({ className = '', hover = false, children, ...rest }) {
  return (
    <div
      className={[
        'rounded-xl bg-white dark:bg-[#161b22]',
        'border border-[#e2e8f0] dark:border-[#30363d]',
        'shadow-[0_1px_4px_rgba(15,45,82,0.08)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]',
        hover
          ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(15,45,82,0.12)] dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)]'
          : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
