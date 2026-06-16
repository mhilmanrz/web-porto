import { useState, useRef } from 'react'
import { useData } from '../context/DataContext'
import { uploadFile } from '../lib/cloudinary'

export default function AdminResume() {
  const { resumeUrl, setResumeUrl } = useData()
  const [urlInput, setUrlInput] = useState(resumeUrl ?? '')
  const [status, setStatus] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  /* ── Save URL to Firestore ── */
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

  /* ── Upload PDF to Cloudinary ── */
  const handlePdfFile = async (file) => {
    if (!file) return
    if (file.type !== 'application/pdf') {
      setStatus({ type: 'error', message: 'Hanya file PDF yang diizinkan.' })
      return
    }

    setUploading(true)
    setStatus({ type: 'uploading', message: `Mengupload "${file.name}" ke Cloudinary…` })
    try {
      const url = await uploadFile(file, 'portfolio/resume')
      // Auto-save to Firestore
      await setResumeUrl(url)
      setUrlInput(url)
      setStatus({ type: 'success', message: `✓ "${file.name}" berhasil diupload dan disimpan!` })
      setTimeout(() => setStatus(null), 4000)
    } catch (err) {
      setStatus({ type: 'error', message: `Upload gagal: ${err.message}` })
    } finally {
      setUploading(false)
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (file) handlePdfFile(file)
    e.target.value = ''
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handlePdfFile(file)
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
        <p className="text-[#8b949e] text-sm">Upload atau set URL PDF resume yang ditampilkan di halaman Resume.</p>
      </div>

      {/* Current URL */}
      <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-5 mb-5">
        <p className="text-xs text-[#8b949e] uppercase font-semibold tracking-wider mb-2">
          URL Aktif (Firestore)
        </p>
        <p className="text-sm text-[#e6edf3] font-mono break-all mb-4">
          {resumeUrl || '—'}
        </p>
        <div className="flex gap-2">
          {resumeUrl && (
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
          )}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#30363d] text-[#8b949e] text-xs hover:text-white transition-colors"
          >
            Reset Default
          </button>
        </div>
      </div>

      {/* Upload PDF — Drag & Drop */}
      <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-5 mb-5">
        <h2 className="font-heading font-semibold text-white text-sm mb-1">
          Upload PDF Resume
        </h2>
        <p className="text-xs text-[#8b949e] mb-4">
          Upload langsung ke Cloudinary CDN. URL otomatis tersimpan ke Firestore setelah upload selesai.
        </p>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={[
            'flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200',
            dragging
              ? 'border-[#3b82f6] bg-[#3b82f6]/10 scale-[1.01]'
              : uploading
              ? 'border-[#30363d] cursor-not-allowed opacity-60'
              : 'border-[#30363d] hover:border-[#3b82f6]/60 hover:bg-white/[0.02]',
          ].join(' ')}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#3b82f6] border-t-transparent animate-spin" />
              <p className="text-sm text-[#3b82f6]">Mengupload ke Cloudinary…</p>
            </div>
          ) : (
            <>
              <svg className="w-10 h-10 text-[#6e7681] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-[#8b949e] font-medium">Klik atau drag file PDF di sini</p>
              <p className="text-xs text-[#6e7681] mt-1">PDF · Maks 10MB · Upload ke Cloudinary CDN</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* Status */}
        {status && (
          <div className={[
            'mt-3 px-4 py-2.5 rounded-lg text-sm flex items-center gap-2',
            status.type === 'success'  ? 'bg-emerald-500/15 text-emerald-400' : '',
            status.type === 'error'    ? 'bg-red-500/15 text-red-400' : '',
            status.type === 'uploading'? 'bg-[#3b82f6]/10 text-[#3b82f6]' : '',
            status.type === 'saving'   ? 'bg-[#30363d] text-[#8b949e]' : '',
          ].join(' ')}>
            {status.type === 'uploading' && (
              <div className="w-3.5 h-3.5 rounded-full border border-current border-t-transparent animate-spin shrink-0" />
            )}
            {status.message}
          </div>
        )}
      </div>

      {/* Manual URL */}
      <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-5 mb-5">
        <h2 className="font-heading font-semibold text-white text-sm mb-1">
          Atau Set URL Manual
        </h2>
        <p className="text-xs text-[#8b949e] mb-4">
          Google Drive, Dropbox, atau path lokal seperti <code className="text-[#3b82f6]">/assets/resume.pdf</code>.
        </p>
        <form onSubmit={handleSaveUrl} className="flex gap-2">
          <input
            id="resume-url-input"
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://… atau /assets/resume.pdf"
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
      </div>

      {/* Tips */}
      <div className="rounded-lg bg-[#0d1117] border border-[#30363d] p-4 text-xs text-[#8b949e]">
        <p className="font-semibold text-[#6e7681] mb-2">💡 Tips</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Upload PDF langsung di sini → otomatis ke Cloudinary CDN</li>
          <li>Atau letakkan PDF di <code className="text-[#3b82f6]">public/assets/resume.pdf</code> lalu set URL <code className="text-[#3b82f6]">/assets/resume.pdf</code></li>
          <li>Google Drive: klik kanan file → Share → Anyone with link → salin URL</li>
        </ul>
      </div>
    </div>
  )
}
