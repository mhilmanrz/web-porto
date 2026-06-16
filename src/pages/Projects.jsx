import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../context/DataContext'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const ALL_TAGS = ['All', 'Product', 'Dev', 'Bootcamp', 'Internship']

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }),
}

export default function Projects() {
  const { projects } = useData()
  const [activeTag, setActiveTag] = useState('All')

  const filtered =
    activeTag === 'All'
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag))

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-10 text-center"
      >
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-[#0f2d52] dark:text-[#e6edf3] mb-3">
          Projects
        </h1>
        <p className="text-[#64748b] dark:text-[#8b949e] max-w-lg mx-auto">
          A collection of work spanning product development, full-stack engineering, and bootcamp
          capstone projects.
        </p>
      </motion.div>

      {/* Tag filter */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="flex flex-wrap justify-center gap-2 mb-10"
        role="group"
        aria-label="Filter projects by tag"
      >
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            className={[
              'px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200',
              activeTag === tag
                ? 'bg-[#0f2d52] text-white border-[#0f2d52] dark:bg-[#3b82f6] dark:border-[#3b82f6]'
                : 'bg-white dark:bg-[#161b22] text-[#64748b] dark:text-[#8b949e] border-[#e2e8f0] dark:border-[#30363d] hover:border-[#3b82f6] hover:text-[#3b82f6]',
            ].join(' ')}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-[#64748b] dark:text-[#8b949e] py-20">
          No projects found for this filter.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i}
              layout
            >
              <Card hover className="flex flex-col h-full overflow-hidden">
                {/* Thumbnail — cover image or gradient */}
                <div className="h-44 overflow-hidden bg-gradient-to-br from-[#0f2d52]/10 to-[#3b82f6]/20 dark:from-[#0f2d52]/40 dark:to-[#3b82f6]/20 flex items-center justify-center shrink-0">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={`Cover ${project.title}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-heading font-bold text-5xl text-[#0f2d52]/15 dark:text-white/10 select-none">
                      {project.title.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <Badge key={tag} label={tag} />
                    ))}
                  </div>
                  <h2 className="font-heading font-semibold text-base text-[#0f2d52] dark:text-[#e6edf3] mb-2 line-clamp-2">
                    {project.title}
                  </h2>
                  <p className="text-sm text-[#64748b] dark:text-[#8b949e] mb-4 line-clamp-3 flex-1">
                    {project.summary}
                  </p>
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded bg-[#f1f5f9] dark:bg-[#0f2d52]/30 text-[#64748b] dark:text-[#8b949e]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[#f1f5f9] dark:bg-[#0f2d52]/30 text-[#64748b] dark:text-[#8b949e]">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-sm font-medium text-[#3b82f6] hover:text-[#2563eb] inline-flex items-center gap-1 transition-colors group"
                    >
                      Case Study
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#64748b] dark:text-[#8b949e] hover:text-[#3b82f6] transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                          </svg>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live site" className="text-[#64748b] dark:text-[#8b949e] hover:text-[#3b82f6] transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
