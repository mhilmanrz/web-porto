import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function AdminResume() {
  const { resumeUrl, setResumeUrl } = useData()
  const [urlInput, setUrlInput] = useState(resumeUrl ?? '')
  const [status, setStatus] = useState(null) // { type: 'saving'|'success'|'error', message }

  const handleSaveUrl = async (e) => {
    e.preventDefault()
    const url = urlInput.trim() || '/assets/resume.pdf'
    setStatus({ type: 'saving', message: 'Menyimpan ke Firestore…' })
    try {
      await setResumeUrl(url)
      setStatus({ type: 'success', message: '✓ Berhasil disimpan ke Firestore!' })
      setTimeout(() => setStatus(null), 3000)
    } catch (err) {
      setStatus({ type: 'error', message: `Gagal: ${err.message}` })
    }
  }

  const handleReset = async () => {
    const def = '/assets/resume.pdf'
    try {
      await setResumeUrl(def)
      setUrlInput(def)
      setStatus({ type: 'success', message: '✓ Reset ke default.' })
      setTimeout(() => setStatus(null), 2500)
    } catch (err) {
      setStatus({ type: 'error', message: `Gagal: ${err.message}` })
    }
  }

  return (
    <div className="p-6 sm:p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-white mb-1">Resume</h1>
        <p className="text-[#8b949e] text-sm">Kelola URL atau file PDF resume yang ditampilkan di halaman Resume.</p>
      </div>

      {/* Current status */}
      <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-5 mb-6">
        <p className="text-xs text-[#8b949e] uppercase font-semibold tracking-wider mb-2">URL Saat Ini (Firestore)</p>
        <p className="text-sm text-[#e6edf3] font-mono break-all">
          {resumeUrl || '—'}
        </p>
        <div className="flex gap-2 mt-4">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3b82f6]/15 text-[#3b82f6] text-xs font-medium hover:bg-[#3b82f6]/25 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Preview
          </a>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#30363d] text-[#8b949e] text-xs hover:text-white transition-colors"
          >
            Reset Default
          </button>
        </div>
      </div>

      {/* URL Input */}
      <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-5 mb-5">
        <h2 className="font-heading font-semibold text-white text-sm mb-1">Set Resume URL</h2>
        <p className="text-xs text-[#8b949e] mb-4">
          Masukkan path lokal (<code className="text-[#3b82f6]">/assets/resume.pdf</code>), URL Google Drive, atau CDN lainnya. URL disimpan ke Firestore.
        </p>
        <form onSubmit={handleSaveUrl} className="flex gap-2">
          <input
            id="resume-url-input"
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="/assets/resume.pdf atau https://drive.google.com/…"
            className="flex-1 px-3 py-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-sm text-[#e6edf3] placeholder-[#6e7681] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-colors font-mono"
          />
          <button
            type="submit"
            disabled={status?.type === 'saving'}
            className="px-4 py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-60 text-white text-sm font-semibold transition-colors shrink-0"
          >
            {status?.type === 'saving' ? 'Menyimpan…' : 'Simpan'}
          </button>
        </form>

        {status && status.type !== 'saving' && (
          <p className={['mt-2 text-xs', status.type === 'success' ? 'text-emerald-400' : 'text-red-400'].join(' ')}>
            {status.message}
          </p>
        )}
      </div>

      {/* Tips */}
      <div className="rounded-lg bg-[#0d1117] border border-[#30363d] p-4 text-xs text-[#8b949e]">
        <p className="font-semibold text-[#6e7681] mb-2">💡 Cara terbaik menyimpan resume</p>
        <ol className="space-y-1.5 list-decimal list-inside">
          <li>Letakkan file PDF di <code className="text-[#3b82f6]">public/assets/resume.pdf</code> lalu set URL ke <code className="text-[#3b82f6]">/assets/resume.pdf</code></li>
          <li>Atau upload ke Google Drive → klik kanan → Get link → pakai URL-nya</li>
          <li>Atau gunakan layanan lain seperti Cloudinary (upload PDF manual di dashboard)</li>
        </ol>
      </div>
    </div>
  )
}
