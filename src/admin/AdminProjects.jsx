import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function AdminProjects() {
  const { projects, deleteProject, resetProjects } = useData()
  const navigate = useNavigate()
  const [confirmDelete, setConfirmDelete] = useState(null)

  const handleDelete = (slug) => {
    deleteProject(slug)
    setConfirmDelete(null)
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl text-white mb-1">Projects</h1>
          <p className="text-[#8b949e] text-sm">{projects.length} project total</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { if (window.confirm('Reset ke data default?')) resetProjects() }}
            className="px-3 py-2 rounded-lg bg-[#30363d] hover:bg-[#3d444d] text-[#8b949e] hover:text-white text-xs transition-colors"
          >
            Reset Default
          </button>
          <button
            onClick={() => navigate('/admin/projects/new')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Project
          </button>
        </div>
      </div>

      {/* Table */}
      {projects.length === 0 ? (
        <div className="rounded-xl border border-[#30363d] p-16 text-center">
          <p className="text-[#8b949e]">Belum ada project. Klik "Tambah Project" untuk mulai.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-[#30363d] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#161b22] border-b border-[#30363d]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Judul</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider hidden sm:table-cell">Tags</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider hidden md:table-cell">Tech Stack</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {projects.map((p) => (
                <tr key={p.slug} className="bg-[#0d1117] hover:bg-[#161b22] transition-colors">
                  <td className="px-4 py-4">
                    <p className="font-medium text-[#e6edf3] line-clamp-1">{p.title}</p>
                    <p className="text-xs text-[#8b949e] mt-0.5 font-mono">{p.slug}</p>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-[#3b82f6]/15 text-[#3b82f6]">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell text-[#8b949e] text-xs">
                    {p.techStack.slice(0, 3).join(', ')}{p.techStack.length > 3 ? ' …' : ''}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/projects/${p.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Preview"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        to={`/admin/projects/edit/${p.slug}`}
                        className="p-1.5 rounded-lg text-[#8b949e] hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 transition-colors"
                        aria-label="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => setConfirmDelete(p.slug)}
                        className="p-1.5 rounded-lg text-[#8b949e] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        aria-label="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-7 max-w-sm w-full mx-4">
            <h3 className="font-heading font-semibold text-lg text-white mb-2">Hapus Project?</h3>
            <p className="text-[#8b949e] text-sm mb-6">
              Project <span className="font-mono text-[#e6edf3]">"{confirmDelete}"</span> akan dihapus permanen dari localStorage.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
              >
                Hapus
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-lg bg-[#30363d] hover:bg-[#3d444d] text-[#e6edf3] text-sm transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
