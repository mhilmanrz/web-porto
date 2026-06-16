import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-heading font-black text-[120px] sm:text-[160px] leading-none text-[#0f2d52]/10 dark:text-white/5 select-none mb-0">
          404
        </p>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#0f2d52] dark:text-[#e6edf3] mb-3 -mt-6">
          Page Not Found
        </h1>
        <p className="text-[#64748b] dark:text-[#8b949e] mb-8 max-w-sm mx-auto">
          Looks like this page doesn't exist. It may have been moved or deleted.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg" id="not-found-home">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
