import { useData } from '../context/DataContext'
import { Link } from 'react-router-dom'

function StatCard({ label, value, icon, to }) {
  return (
    <Link
      to={to}
      className="block p-6 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#3b82f6]/50 transition-colors group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/15 text-[#3b82f6] flex items-center justify-center">
          {icon}
        </div>
        <svg className="w-4 h-4 text-[#30363d] group-hover:text-[#3b82f6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
      <p className="font-heading font-bold text-3xl text-white mb-1">{value}</p>
      <p className="text-sm text-[#8b949e]">{label}</p>
    </Link>
  )
}

export default function AdminDashboard() {
  const { projects, resumeUrl } = useData()

  // Count projects with images
  const withCover = projects.filter((p) => p.coverImage).length
  const withGallery = projects.filter((p) => p.gallery?.length > 0).length

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      to: '/admin/projects',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: 'Dengan Foto',
      value: withCover,
      to: '/admin/projects',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Resume',
      value: resumeUrl ? '✓' : '—',
      to: '/admin/resume',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-white mb-1">Dashboard</h1>
        <p className="text-[#8b949e] text-sm">Kelola konten portfolio kamu dari sini.</p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Projects list */}
      <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-white text-sm">Projects</h2>
          <Link to="/admin/projects" className="text-xs text-[#3b82f6] hover:text-[#60a5fa]">
            Kelola semua →
          </Link>
        </div>
        <div className="space-y-3">
          {projects.slice(0, 5).map((p) => (
            <div key={p.slug} className="flex items-center gap-3">
              {/* Thumbnail preview or initial */}
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#0f2d52]/60 flex items-center justify-center">
                {p.coverImage ? (
                  <img src={p.coverImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#3b82f6] text-xs font-bold font-heading">
                    {p.title.charAt(0)}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-[#e6edf3] truncate">{p.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {p.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] text-[#8b949e]">{t}</span>
                  ))}
                  {p.coverImage && (
                    <span className="text-[10px] text-emerald-400">● cover</span>
                  )}
                  {p.gallery?.length > 0 && (
                    <span className="text-[10px] text-[#3b82f6]">
                      {p.gallery.length} foto
                    </span>
                  )}
                </div>
              </div>
              <Link
                to={`/admin/projects/edit/${p.slug}`}
                className="ml-auto text-[#6e7681] hover:text-[#3b82f6] transition-colors shrink-0"
                aria-label={`Edit ${p.title}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Link>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-[#6e7681]">Belum ada project.</p>
          )}
        </div>
      </div>

      {/* Storage tip */}
      {(withCover > 0 || withGallery > 0) && (
        <div className="mt-4 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-400">
          💡 Gambar tersimpan di localStorage browser. Saat deploy ke Firebase, gambar akan dipindah ke Firebase Storage.
        </div>
      )}
    </div>
  )
}
