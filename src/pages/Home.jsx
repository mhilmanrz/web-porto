import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../context/DataContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

/* ---------- animation variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

/* ---------- Section wrapper ---------- */
function Section({ id, className = '', children }) {
  return (
    <section
      id={id}
      className={['py-20 px-4 sm:px-6 max-w-6xl mx-auto', className].join(' ')}
    >
      {children}
    </section>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && (
        <span className="inline-block mb-2 text-xs font-semibold tracking-widest text-[#3b82f6] uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0f2d52] dark:text-[#e6edf3] mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-[#64748b] dark:text-[#8b949e] max-w-xl mx-auto">{description}</p>
      )}
    </div>
  )
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center px-4 sm:px-6 overflow-hidden">
      {/* Background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e8f0fe] via-[#f8fafc] to-[#f0f4ff] dark:from-[#0d1117] dark:via-[#0d1117] dark:to-[#0f2d52]/20"
      />
      <div
        aria-hidden
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-[#3b82f6]/8 blur-3xl dark:bg-[#3b82f6]/6"
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 -left-16 w-72 h-72 rounded-full bg-[#0f2d52]/6 blur-3xl dark:bg-[#3b82f6]/4"
      />

      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-2xl">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
            Available for opportunities
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#0f2d52] dark:text-[#e6edf3] leading-[1.15] mb-5"
          >
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f2d52] to-[#3b82f6] dark:from-[#3b82f6] dark:to-[#60a5fa]">
              Hilman Riski
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg sm:text-xl text-[#0f2d52]/80 dark:text-[#8b949e] mb-4 font-medium"
          >
            Fresh IT Graduate · Product Operations · IT Business Analyst · Full-Stack Developer
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-[#64748b] dark:text-[#8b949e] mb-9 leading-relaxed max-w-lg"
          >
            Based in Jakarta, Indonesia. I bridge the gap between technology and business — building
            thoughtful products that solve real problems.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap gap-3"
          >
            <Link to="/projects">
              <Button variant="primary" size="lg" id="hero-view-projects">
                View Projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" id="hero-contact">
                Get In Touch
              </Button>
            </Link>
          </motion.div>

          {/* Tech pills */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex flex-wrap gap-2 mt-10"
          >
            {['React', 'Node.js', 'Laravel', 'PostgreSQL', 'Product Analysis'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-white dark:bg-[#161b22] border border-[#e2e8f0] dark:border-[#30363d] text-xs font-medium text-[#64748b] dark:text-[#8b949e] shadow-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- About Snapshot ---------- */
function AboutSnapshot() {
  const stats = [
    { label: 'Projects Completed', value: '10+' },
    { label: 'Tech Stack', value: '8+' },
    { label: 'Bootcamp', value: 'Dicoding #12' },
    { label: 'Location', value: 'Jakarta' },
  ]

  return (
    <Section id="about" className="border-t border-[#e2e8f0] dark:border-[#30363d]">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-block mb-3 text-xs font-semibold tracking-widest text-[#3b82f6] uppercase">
            About Me
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0f2d52] dark:text-[#e6edf3] mb-4">
            Bridging Tech &amp; Business
          </h2>
          <p className="text-[#64748b] dark:text-[#8b949e] mb-4 leading-relaxed">
            I'm a fresh Information Technology graduate with a passion for building products that
            matter. My experience spans full-stack development, product operations, and IT business
            analysis — giving me a holistic view of how software creates business value.
          </p>
          <p className="text-[#64748b] dark:text-[#8b949e] mb-6 leading-relaxed">
            During my time at Dicoding Bootcamp Batch 12, I led the development of an AI-powered
            learning planner that was selected as a showcase capstone project. I believe great
            products come from deep user empathy combined with solid technical execution.
          </p>
          <Link to="/resume">
            <Button variant="outline" size="md" id="about-view-resume">
              Download Resume
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center">
              <p className="font-heading font-bold text-2xl text-[#0f2d52] dark:text-[#e6edf3] mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-[#64748b] dark:text-[#8b949e]">{stat.label}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

/* ---------- Project Card ---------- */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.15}
    >
      <Card hover className="flex flex-col h-full overflow-hidden">
        {/* Thumbnail — cover image or gradient placeholder */}
        <div className="h-44 overflow-hidden bg-gradient-to-br from-[#0f2d52]/10 to-[#3b82f6]/20 dark:from-[#0f2d52]/40 dark:to-[#3b82f6]/20 flex items-center justify-center shrink-0">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={`Cover ${project.title}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-heading font-bold text-4xl text-[#0f2d52]/20 dark:text-white/10 select-none">
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
          <h3 className="font-heading font-semibold text-base text-[#0f2d52] dark:text-[#e6edf3] mb-2 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-sm text-[#64748b] dark:text-[#8b949e] mb-4 line-clamp-3 flex-1">
            {project.summary}
          </p>
          <Link
            to={`/projects/${project.slug}`}
            className="text-sm font-medium text-[#3b82f6] hover:text-[#2563eb] inline-flex items-center gap-1 transition-colors group"
          >
            View Case Study
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

/* ---------- Featured Projects ---------- */
function FeaturedProjects() {
  const { projects } = useData()
  const featured = projects.slice(0, 3)

  return (
    <Section id="featured-projects" className="border-t border-[#e2e8f0] dark:border-[#30363d]">
      <SectionHeading
        eyebrow="Work"
        title="Featured Projects"
        description="Selected projects that demonstrate my skills across product, development, and analysis."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
      <div className="text-center">
        <Link to="/projects">
          <Button variant="outline" size="md" id="home-all-projects">
            View All Projects
          </Button>
        </Link>
      </div>
    </Section>
  )
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <Section id="cta" className="border-t border-[#e2e8f0] dark:border-[#30363d]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-2xl bg-gradient-to-br from-[#0f2d52] to-[#1a4a80] dark:from-[#0f2d52]/80 dark:to-[#1a4a80]/60 p-10 sm:p-14 text-center"
      >
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
          Let's Build Something Together
        </h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          I'm actively looking for opportunities in Product Operations, IT Business Analysis, and
          Full-Stack Development.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact">
            <Button variant="accent" size="lg" id="cta-contact">
              Get In Touch
            </Button>
          </Link>
          <Link to="/resume">
            <Button
              variant="ghost"
              size="lg"
              id="cta-resume"
              className="text-white hover:bg-white/10"
            >
              View Resume
            </Button>
          </Link>
        </div>
      </motion.div>
    </Section>
  )
}

/* ---------- Page ---------- */
export default function Home() {
  return (
    <>
      <Hero />
      <AboutSnapshot />
      <FeaturedProjects />
      <CTA />
    </>
  )
}
