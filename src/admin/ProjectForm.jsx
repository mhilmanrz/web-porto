import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { compressImage, formatBytes, base64Size } from '../utils/imageUtils'

const ALL_TAGS = ['Product', 'Dev', 'Bootcamp', 'Internship']

const EMPTY = {
  slug: '',
  title: '',
  tags: [],
  summary: '',
  problem: '',
  approach: '',
  impact: '',
  techStack: '',
  liveUrl: '',
  githubUrl: '',
  coverImage: null,
  gallery: [],
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#e6edf3] mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {hint && <p className="text-xs text-[#8b949e] mb-1.5">{hint}</p>}
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

const inputCls = (err) =>
  [
    'w-full px-3 py-2.5 rounded-lg bg-[#0d1117] border text-sm text-[#e6edf3] placeholder-[#6e7681]',
    'focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-colors',
    err ? 'border-red-500' : 'border-[#30363d]',
  ].join(' ')

const textareaCls = (err) => inputCls(err) + ' resize-y min-h-[100px]'

/* ── Image upload zone ── */
function ImageDropZone({ id, label, hint, onFile, children }) {
  const inputRef = useRef()
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) onFile(file)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[#e6edf3] mb-1.5">{label}</label>
      {hint && <p className="text-xs text-[#8b949e] mb-2">{hint}</p>}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          'relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-5 cursor-pointer transition-colors',
          dragging
            ? 'border-[#3b82f6] bg-[#3b82f6]/10'
            : 'border-[#30363d] hover:border-[#3b82f6]/50',
        ].join(' ')}
      >
        <svg className="w-8 h-8 text-[#6e7681] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs text-[#8b949e] text-center">Klik atau drag gambar di sini</p>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = '' }}
        />
      </div>
      {children}
    </div>
  )
}

export default function ProjectForm() {
  const navigate = useNavigate()
  const { slug: editSlug } = useParams()
  const { projects, addProject, updateProject } = useData()

  const existing = editSlug ? projects.find((p) => p.slug === editSlug) : null
  const isEdit = !!existing

  const [form, setForm] = useState(() => {
    if (existing) return { ...existing, techStack: existing.techStack.join(', ') }
    return EMPTY
  })
  const [errors, setErrors] = useState({})
  const [autoSlug, setAutoSlug] = useState(!isEdit)
  const [imgLoading, setImgLoading] = useState({ cover: false, gallery: false })

  const set = (field) => (e) => {
    const val = e.target.value
    setForm((prev) => {
      const next = { ...prev, [field]: val }
      if (field === 'title' && autoSlug) next.slug = slugify(val)
      return next
    })
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }))
  }

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  /* ── Cover image ── */
  const handleCoverFile = async (file) => {
    setImgLoading((p) => ({ ...p, cover: true }))
    try {
      const compressed = await compressImage(file, { maxWidth: 1400, quality: 0.8 })
      setForm((prev) => ({ ...prev, coverImage: compressed }))
    } catch {
      alert('Gagal memproses gambar')
    } finally {
      setImgLoading((p) => ({ ...p, cover: false }))
    }
  }

  const removeCover = () => setForm((prev) => ({ ...prev, coverImage: null }))

  /* ── Gallery ── */
  const handleGalleryFile = async (file) => {
    setImgLoading((p) => ({ ...p, gallery: true }))
    try {
      const compressed = await compressImage(file, { maxWidth: 1200, quality: 0.75 })
      setForm((prev) => ({ ...prev, gallery: [...(prev.gallery ?? []), compressed] }))
    } catch {
      alert('Gagal memproses gambar')
    } finally {
      setImgLoading((p) => ({ ...p, gallery: false }))
    }
  }

  const removeGalleryItem = (idx) =>
    setForm((prev) => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== idx) }))

  /* ── Validate ── */
  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Judul wajib diisi'
    if (!form.slug.trim()) e.slug = 'Slug wajib diisi'
    if (form.tags.length === 0) e.tags = 'Pilih minimal 1 tag'
    if (!form.summary.trim()) e.summary = 'Summary wajib diisi'
    if (!isEdit) {
      const dup = projects.find((p) => p.slug === form.slug.trim())
      if (dup) e.slug = `Slug "${form.slug}" sudah dipakai`
    }
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const data = {
      ...form,
      slug: form.slug.trim(),
      techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
    }

    if (isEdit) updateProject(editSlug, data)
    else addProject(data)
    navigate('/admin/projects')
  }

  // Storage estimate
  const totalSize = base64Size(form.coverImage ?? '') +
    (form.gallery ?? []).reduce((s, img) => s + base64Size(img), 0)

  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate('/admin/projects')}
          className="text-[#8b949e] hover:text-white transition-colors"
          aria-label="Back"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        </button>
        <h1 className="font-heading font-bold text-xl text-white">
          {isEdit ? 'Edit Project' : 'Tambah Project Baru'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <Field id="pf-title" label="Judul" required error={errors.title}>
          <input id="pf-title" value={form.title} onChange={set('title')} placeholder="Learning Planner AI" className={inputCls(errors.title)} />
        </Field>

        {/* Slug */}
        <Field id="pf-slug" label="Slug (URL)" required error={errors.slug} hint="Otomatis dari judul, bisa diedit.">
          <div className="flex gap-2">
            <input
              id="pf-slug"
              value={form.slug}
              onChange={(e) => { setAutoSlug(false); set('slug')(e) }}
              placeholder="learning-planner-ai"
              className={inputCls(errors.slug) + ' flex-1 font-mono text-xs'}
            />
            <button type="button" onClick={() => { setAutoSlug(true); setForm((p) => ({ ...p, slug: slugify(p.title) })) }} className="px-3 py-2 rounded-lg bg-[#30363d] text-[#8b949e] hover:text-white text-xs transition-colors">Auto</button>
          </div>
        </Field>

        {/* Tags */}
        <Field id="pf-tags" label="Tags" required error={errors.tags}>
          <div className="flex flex-wrap gap-2 mt-1" role="group" aria-label="Tags">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={form.tags.includes(tag)}
                className={[
                  'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                  form.tags.includes(tag)
                    ? 'bg-[#3b82f6] border-[#3b82f6] text-white'
                    : 'bg-transparent border-[#30363d] text-[#8b949e] hover:border-[#3b82f6]',
                ].join(' ')}
              >
                {tag}
              </button>
            ))}
          </div>
        </Field>

        {/* Summary */}
        <Field id="pf-summary" label="Summary" required error={errors.summary} hint="Deskripsi singkat untuk card.">
          <textarea id="pf-summary" value={form.summary} onChange={set('summary')} className={textareaCls(errors.summary)} rows={3} />
        </Field>

        {/* Problem / Approach / Impact */}
        {[
          { id: 'pf-problem', field: 'problem', label: 'Problem' },
          { id: 'pf-approach', field: 'approach', label: 'Approach' },
          { id: 'pf-impact', field: 'impact', label: 'Impact' },
        ].map(({ id, field, label }) => (
          <Field key={id} id={id} label={label}>
            <textarea id={id} value={form[field]} onChange={set(field)} className={textareaCls(false)} rows={3} />
          </Field>
        ))}

        {/* Tech Stack */}
        <Field id="pf-tech" label="Tech Stack" hint="Pisahkan dengan koma. Contoh: React, Node.js, PostgreSQL">
          <input id="pf-tech" value={form.techStack} onChange={set('techStack')} placeholder="React 19, Vite, Express" className={inputCls(false)} />
        </Field>

        {/* URLs */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Field id="pf-live" label="Live URL">
            <input id="pf-live" type="url" value={form.liveUrl} onChange={set('liveUrl')} placeholder="https://…" className={inputCls(false)} />
          </Field>
          <Field id="pf-github" label="GitHub URL">
            <input id="pf-github" type="url" value={form.githubUrl} onChange={set('githubUrl')} placeholder="https://github.com/…" className={inputCls(false)} />
          </Field>
        </div>

        {/* Divider */}
        <div className="border-t border-[#30363d] pt-5">
          <p className="text-sm font-semibold text-[#e6edf3] mb-4">📸 Foto & Galeri</p>

          {/* Cover Image */}
          <div className="mb-6">
            <Field id="pf-cover" label="Cover Image" hint="Foto utama yang tampil di card dan header halaman detail.">
              {form.coverImage ? (
                <div className="relative rounded-xl overflow-hidden border border-[#30363d]">
                  <img src={form.coverImage} alt="Cover preview" className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <span className="text-[10px] bg-black/70 text-white px-2 py-1 rounded">
                      {formatBytes(base64Size(form.coverImage))}
                    </span>
                    <button
                      type="button"
                      onClick={removeCover}
                      className="bg-red-500/90 hover:bg-red-600 text-white rounded-lg px-2 py-1 text-xs transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <ImageDropZone id="pf-cover-input" onFile={handleCoverFile}>
                  {imgLoading.cover && (
                    <p className="text-xs text-[#3b82f6] mt-2 text-center">Memproses…</p>
                  )}
                </ImageDropZone>
              )}
            </Field>
          </div>

          {/* Gallery */}
          <Field id="pf-gallery" label="Galeri" hint={`Foto dokumentasi kegiatan atau screenshot. Saat ini: ${form.gallery?.length ?? 0} foto.`}>
            {/* Existing gallery grid */}
            {form.gallery?.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                {form.gallery.map((src, idx) => (
                  <div key={idx} className="relative group aspect-video rounded-lg overflow-hidden border border-[#30363d]">
                    <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(idx)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs"
                    >
                      ✕ Hapus
                    </button>
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/60 text-white px-1 rounded">
                      {formatBytes(base64Size(src))}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {/* Add more */}
            <ImageDropZone id="pf-gallery-input" onFile={handleGalleryFile}>
              {imgLoading.gallery && (
                <p className="text-xs text-[#3b82f6] mt-2 text-center">Memproses…</p>
              )}
            </ImageDropZone>
          </Field>

          {/* Storage indicator */}
          {totalSize > 0 && (
            <div className={[
              'mt-3 text-xs px-3 py-2 rounded-lg',
              totalSize > 4 * 1024 * 1024
                ? 'bg-red-500/15 text-red-400'
                : totalSize > 2 * 1024 * 1024
                ? 'bg-amber-500/15 text-amber-400'
                : 'bg-emerald-500/15 text-emerald-400',
            ].join(' ')}>
              💾 Total ukuran gambar project ini: <strong>{formatBytes(totalSize)}</strong>
              {totalSize > 4 * 1024 * 1024 && ' — ⚠️ Mendekati batas localStorage!'}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold transition-colors">
            {isEdit ? 'Simpan Perubahan' : 'Tambah Project'}
          </button>
          <button type="button" onClick={() => navigate('/admin/projects')} className="px-5 py-2.5 rounded-lg bg-[#30363d] hover:bg-[#3d444d] text-[#e6edf3] text-sm transition-colors">
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
