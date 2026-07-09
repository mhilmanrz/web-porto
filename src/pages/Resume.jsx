import { motion } from 'framer-motion'
import { useData } from '../context/DataContext'
import Button from '../components/ui/Button'

export default function Resume() {
  const { resumeUrl, loading } = useData()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-heading font-bold text-4xl text-[#0f2d52] dark:text-[#e6edf3] mb-2">
            Resume
          </h1>
          <p className="text-[#64748b] dark:text-[#8b949e]">
            My latest CV — download or view below.
          </p>
        </div>
        {!loading && resumeUrl && (
          <a href={resumeUrl} download="Hilman_Riski_CV.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="md" id="resume-download">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </Button>
          </a>
        )}
      </motion.div>

      {/* PDF Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl overflow-hidden border border-[#e2e8f0] dark:border-[#30363d] shadow-[0_4px_24px_rgba(15,45,82,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      >
        {/* Loading skeleton */}
        {loading && (
          <div className="w-full h-[80vh] min-h-[600px] bg-[#f1f5f9] dark:bg-[#161b22] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#3b82f6] border-t-transparent animate-spin" />
              <p className="text-sm text-[#64748b] dark:text-[#8b949e]">Memuat resume…</p>
            </div>
          </div>
        )}

        {/* No resume set */}
        {!loading && !resumeUrl && (
          <div className="w-full h-[80vh] min-h-[600px] bg-[#f1f5f9] dark:bg-[#161b22] flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-[#cbd5e1] dark:text-[#30363d] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-[#64748b] dark:text-[#8b949e] text-sm">Resume belum tersedia.</p>
            </div>
          </div>
        )}

        {/* PDF iframe — only render when URL is ready */}
        {!loading && resumeUrl && (
          <iframe
            key={resumeUrl}
            id="resume-iframe"
            src={resumeUrl}
            title="Moh Hilman Riski Resume"
            className="w-full h-[80vh] min-h-[600px]"
            style={{ border: 'none' }}
          >
            <p className="p-6 text-[#64748b] dark:text-[#8b949e]">
              Your browser doesn't support PDF preview.{' '}
              <a href={resumeUrl} download className="text-[#3b82f6] underline">
                Download the PDF
              </a>{' '}
              instead.
            </p>
          </iframe>
        )}
      </motion.div>

      {!loading && resumeUrl && (
        <p className="mt-4 text-center text-sm text-[#64748b] dark:text-[#8b949e]">
          If the preview doesn't load,{' '}
          <a href={resumeUrl} download className="text-[#3b82f6] hover:text-[#2563eb] underline">
            download the PDF directly
          </a>.
        </p>
      )}
    </div>
  )
}
