import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Toast from '../components/ui/Toast'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const INITIAL = { name: '', email: '', subject: '', message: '' }

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#1e293b] dark:text-[#e6edf3] mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function inputClass(hasError) {
  return [
    'w-full px-4 py-2.5 rounded-lg border text-sm',
    'bg-white dark:bg-[#161b22]',
    'text-[#1e293b] dark:text-[#e6edf3]',
    'placeholder-[#94a3b8] dark:placeholder-[#6e7681]',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40 focus:border-[#3b82f6]',
    hasError
      ? 'border-red-400 dark:border-red-500'
      : 'border-[#e2e8f0] dark:border-[#30363d]',
  ].join(' ')
}

function validate(form) {
  const errs = {}
  if (!form.name.trim()) errs.name = 'Name is required'
  if (!form.email.trim()) errs.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address'
  if (!form.message.trim()) errs.message = 'Message is required'
  return errs
}

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const closeToast = () => setToast(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      setForm(INITIAL)
      setToast({ type: 'success', message: 'Message sent! I\'ll get back to you soon.' })
    } catch {
      setToast({ type: 'error', message: 'Something went wrong. Please try again or email me directly.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      <div className="grid md:grid-cols-5 gap-12">
        {/* Left info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:col-span-2"
        >
          <h1 className="font-heading font-bold text-4xl text-[#0f2d52] dark:text-[#e6edf3] mb-3">
            Get In Touch
          </h1>
          <p className="text-[#64748b] dark:text-[#8b949e] mb-8 leading-relaxed">
            I'm open to full-time opportunities, freelance projects, and collaborations. Feel free
            to reach out — I typically respond within 24 hours.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: 'Email',
                value: 'mhilmanriski@gmail.com',
                href: 'mailto:mhilmanriski@gmail.com',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: 'Location',
                value: 'Jakarta, Indonesia',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
                label: 'LinkedIn',
                value: 'Moh Hilman Riski',
                href: 'https://linkedin.com/in/mhilmanrizq/',
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 text-[#3b82f6] flex items-center justify-center shrink-0">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs text-[#64748b] dark:text-[#8b949e]">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#0f2d52] dark:text-[#e6edf3] hover:text-[#3b82f6] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-[#0f2d52] dark:text-[#e6edf3]">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-3"
        >
          <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-[#e2e8f0] dark:border-[#30363d] shadow-[0_4px_20px_rgba(15,45,82,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] p-7 sm:p-9">
            <h2 className="font-heading font-semibold text-xl text-[#0f2d52] dark:text-[#e6edf3] mb-6">
              Send a Message
            </h2>
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field id="contact-name" label="Your Name" error={errors.name}>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Budi Santoso"
                    className={inputClass(!!errors.name)}
                  />
                </Field>
                <Field id="contact-email" label="Email Address" error={errors.email}>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="budi@example.com"
                    className={inputClass(!!errors.email)}
                  />
                </Field>
              </div>
              <Field id="contact-subject" label="Subject (optional)" error={errors.subject}>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Job opportunity, collaboration…"
                  className={inputClass(false)}
                />
              </Field>
              <Field id="contact-message" label="Message" error={errors.message}>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hi Hilman, I'd love to discuss…"
                  className={inputClass(!!errors.message)}
                />
              </Field>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                id="contact-submit"
                className="w-full"
              >
                {loading ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </div>
        </motion.div> */}
      </div>
    </div>
  )
}
