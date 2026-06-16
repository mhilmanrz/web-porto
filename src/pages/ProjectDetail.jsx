import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../context/DataContext'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } }),
}

/* ── Lightbox ── */
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  // keyboard navigation
  const handleKey = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={handleKey}
        tabIndex={0}
        role="dialog"
        aria-modal
        aria-label="Gallery lightbox"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          aria-label="Close lightbox"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Counter */}
        <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
          {current + 1} / {images.length}
        </span>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Image */}
        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          src={images[current]}
          alt={`Gallery image ${current + 1}`}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Case Study Section ── */
function Section({ number, title, children }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={number * 0.1}
      className="mb-10"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-8 rounded-full bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 text-[#3b82f6] flex items-center justify-center text-sm font-bold font-heading shrink-0">
          {number}
        </span>
        <h2 className="font-heading font-bold text-xl text-[#0f2d52] dark:text-[#e6edf3]">
          {title}
        </h2>
      </div>
      <p className="text-[#64748b] dark:text-[#8b949e] leading-relaxed pl-11">{children}</p>
    </motion.div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { projects } = useData()
  const project = projects.find((p) => p.slug === slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!project) return <Navigate to="/projects" replace />

  const galleryImages = project.gallery ?? []
  const hasGallery = galleryImages.length > 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <motion.nav
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-2 text-sm text-[#64748b] dark:text-[#8b949e] mb-8"
        aria-label="Breadcrumb"
      >
        <Link to="/projects" className="hover:text-[#3b82f6] transition-colors">Projects</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-[#0f2d52] dark:text-[#e6edf3] font-medium line-clamp-1">
          {project.title}
        </span>
      </motion.nav>

      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0f2d52] dark:text-[#e6edf3] mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-[#64748b] dark:text-[#8b949e] leading-relaxed">
          {project.summary}
        </p>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
        className="flex flex-wrap gap-2 mb-10 p-5 rounded-xl bg-[#f8fafc] dark:bg-[#161b22] border border-[#e2e8f0] dark:border-[#30363d]"
      >
        <span className="text-xs font-semibold text-[#64748b] dark:text-[#8b949e] mr-1 self-center">
          Tech Stack:
        </span>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2.5 py-1 rounded-full bg-white dark:bg-[#0d1117] border border-[#e2e8f0] dark:border-[#30363d] text-[#64748b] dark:text-[#8b949e] font-medium"
          >
            {tech}
          </span>
        ))}
      </motion.div>

      {/* Cover Image / Hero */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
        className="rounded-2xl overflow-hidden mb-12"
      >
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={`Cover ${project.title}`}
            className="w-full max-h-[480px] object-cover cursor-zoom-in"
            onClick={() => setLightboxIndex(0)}
          />
        ) : (
          <div className="h-60 sm:h-80 bg-gradient-to-br from-[#0f2d52]/10 to-[#3b82f6]/20 dark:from-[#0f2d52]/40 dark:to-[#3b82f6]/20 flex items-center justify-center">
            <span className="font-heading font-black text-8xl text-[#0f2d52]/10 dark:text-white/8 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </motion.div>

      {/* Case Study Sections */}
      <div className="border-t border-[#e2e8f0] dark:border-[#30363d] pt-10">
        {project.problem && <Section number={1} title="Problem">{project.problem}</Section>}
        {project.approach && <Section number={2} title="Approach">{project.approach}</Section>}
        {project.impact && <Section number={3} title="Impact">{project.impact}</Section>}
      </div>

      {/* Gallery */}
      {hasGallery && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-[#e2e8f0] dark:border-[#30363d]"
        >
          <h2 className="font-heading font-bold text-xl text-[#0f2d52] dark:text-[#e6edf3] mb-5">
            Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryImages.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-xl overflow-hidden aspect-video bg-[#f1f5f9] dark:bg-[#161b22] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                aria-label={`Open image ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-[#8b949e]">{galleryImages.length} foto · klik untuk perbesar</p>
        </motion.div>
      )}

      {/* Links */}
      {(project.liveUrl || project.githubUrl) && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-[#e2e8f0] dark:border-[#30363d]"
        >
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" id={`${project.slug}-live`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </Button>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md" id={`${project.slug}-github`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                View on GitHub
              </Button>
            </a>
          )}
        </motion.div>
      )}

      {/* Back */}
      <div className="mt-12">
        <Link to="/projects">
          <Button variant="ghost" size="sm" id={`${project.slug}-back`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={project.coverImage
            ? [project.coverImage, ...galleryImages]
            : galleryImages
          }
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
