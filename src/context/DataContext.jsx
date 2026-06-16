import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  collection, doc, onSnapshot,
  setDoc, updateDoc, deleteDoc, writeBatch,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { projects as seedProjects } from '../content/projects/projects'

/* ─── Context ─── */
const DataContext = createContext(null)

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within <DataProvider>')
  return ctx
}

/* ─── Provider ─── */
export function DataProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [resumeUrl, setResumeUrlState] = useState('/assets/resume.pdf')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /* Listen to projects collection */
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'projects'),
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        // Sort by `order` field if present, then by title
        data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title))
        setProjects(data)
        setLoading(false)
      },
      (err) => {
        console.error('Firestore projects error:', err)
        setError(err.message)
        setLoading(false)
      },
    )
    return unsub
  }, [])

  /* Listen to settings/general */
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'settings', 'general'),
      (snap) => {
        if (snap.exists()) {
          setResumeUrlState(snap.data().resumeUrl ?? '/assets/resume.pdf')
        }
      },
      (err) => console.error('Firestore settings error:', err),
    )
    return unsub
  }, [])

  /* ─── Project CRUD ─── */
  const addProject = useCallback(async (project) => {
    const { techStack, ...rest } = project
    await setDoc(doc(db, 'projects', project.slug), {
      ...rest,
      techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map((s) => s.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }, [])

  const updateProject = useCallback(async (slug, data) => {
    const { techStack, ...rest } = data
    await updateDoc(doc(db, 'projects', slug), {
      ...rest,
      techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map((s) => s.trim()).filter(Boolean),
      updatedAt: new Date().toISOString(),
    })
  }, [])

  const deleteProject = useCallback(async (slug) => {
    await deleteDoc(doc(db, 'projects', slug))
  }, [])

  /* Seed default data to Firestore (run once to initialise) */
  const seedDefaultProjects = useCallback(async () => {
    const batch = writeBatch(db)
    seedProjects.forEach((p, i) => {
      batch.set(doc(db, 'projects', p.slug), {
        ...p,
        order: i,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    })
    await batch.commit()
  }, [])

  /* ─── Resume ─── */
  const setResumeUrl = useCallback(async (url) => {
    await setDoc(doc(db, 'settings', 'general'), { resumeUrl: url }, { merge: true })
  }, [])

  return (
    <DataContext.Provider
      value={{
        projects,
        resumeUrl,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
        seedDefaultProjects,
        setResumeUrl,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
