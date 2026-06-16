import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function AdminResume() {
  const { resumeUrl, setResumeUrl } = useData()
  const [urlInput, setUrlInput] = useState(resumeUrl)
  const [saved, setSaved] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)

  const handleSaveUrl = (e) => {
    e.preventDefault()
    setResumeUrl(urlInput.trim() || '/assets/resume.pdf')
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.includes('pdf')) {
      setUploadStatus({ type: 'error', message: 'Hanya file PDF yang diizinkan.' })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus({ type: 'warn', message: 'File > 5MB mungkin terlalu besar untuk localStorage. Pertimbangkan memakai URL eksternal.' })
    }

    setUploadStatus({ type: 'loading', message: 'Memproses…' })
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      setResumeUrl(dataUrl)
      setUrlInput(dataUrl.slice(0, 40) + '…')
      setUploadStatus({ type: 'success', message: `✓ "${file.name}" berhasil diupload dan disimpan.` })
    }
    reader.onerror = () => {
      setUploadStatus({ type: 'error', message: 'Gagal membaca file.' })
    }
    reader.readAsDataURL(file)
  }

  const handleReset = () => {
    const def = '/assets/resume.pdf'
    setResumeUrl(def)
    setUrlInput(def)
    setUploadStatus(null)
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
        <p className="text-xs text-[#8b949e] uppercase font-semibold tracking-wider mb-2">URL Saat Ini</p>
        <p className="text-sm text-[#e6edf3] font-mono break-all">
          {resumeUrl?.startsWith('data:') ? '(base64 PDF — tersimpan di localStorage)' : resumeUrl}
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

      {/* Option 1: URL */}
      <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-5 mb-5">
        <h2 className="font-heading font-semibold text-white text-sm mb-1">Opsi 1 — Masukkan URL</h2>
        <p className="text-xs text-[#8b949e] mb-4">
          Masukkan path lokal (<code className="text-[#3b82f6]">/assets/resume.pdf</code>) atau URL Google Drive / CDN.
        </p>
        <form onSubmit={handleSaveUrl} className="flex gap-2">
          <input
            id="resume-url-input"
            type="text"
            value={urlInput.startsWith('data:') ? '' : urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="/assets/resume.pdf atau https://…"
            className="flex-1 px-3 py-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-sm text-[#e6edf3] placeholder-[#6e7681] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-colors font-mono"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold transition-colors shrink-0"
          >
            {saved ? '✓ Disimpan' : 'Simpan'}
          </button>
        </form>
      </div>

      {/* Option 2: Upload */}
      <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-5">
        <h2 className="font-heading font-semibold text-white text-sm mb-1">Opsi 2 — Upload PDF</h2>
        <p className="text-xs text-[#8b949e] mb-4">
          Upload PDF ke browser (disimpan sebagai base64 di localStorage). Maks ~4MB untuk menghindari masalah storage.
        </p>
        <label
          htmlFor="resume-file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#30363d] rounded-xl cursor-pointer hover:border-[#3b82f6]/50 transition-colors"
        >
          <svg className="w-8 h-8 text-[#6e7681] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-[#8b949e]">Klik atau drag file PDF di sini</p>
          <p className="text-xs text-[#6e7681] mt-1">Maks 5MB</p>
          <input
            id="resume-file-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {uploadStatus && (
          <div
            className={[
              'mt-3 px-4 py-2.5 rounded-lg text-sm',
              uploadStatus.type === 'success' ? 'bg-emerald-500/15 text-emerald-400' : '',
              uploadStatus.type === 'error'   ? 'bg-red-500/15 text-red-400' : '',
              uploadStatus.type === 'warn'    ? 'bg-amber-500/15 text-amber-400' : '',
              uploadStatus.type === 'loading' ? 'bg-[#30363d] text-[#8b949e]' : '',
            ].join(' ')}
          >
            {uploadStatus.message}
          </div>
        )}

        <div className="mt-4 rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-xs text-[#8b949e]">
          <p className="font-semibold text-[#6e7681] mb-1">💡 Tips</p>
          Untuk produksi, letakkan file PDF di <code className="text-[#3b82f6]">public/assets/resume.pdf</code> dan pakai URL <code className="text-[#3b82f6]">/assets/resume.pdf</code> agar tidak menyimpan file besar di localStorage.
        </div>
      </div>
    </div>
  )
}
