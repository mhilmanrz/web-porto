import { createContext, useContext, useCallback } from 'react'
import { projects as defaultProjects } from '../content/projects/projects'
import { useLocalStorage } from '../hooks/useLocalStorage'

/* ─── Context ─── */
const DataContext = createContext(null)

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within <DataProvider>')
  return ctx
}

/* ─── Provider ─── */
export function DataProvider({ children }) {
  // Projects — null means "use static defaults"
  const [projectsOverride, setProjectsOverride] = useLocalStorage('portfolio_projects', null)

  // Resume URL
  const [resumeUrl, setResumeUrl] = useLocalStorage('portfolio_resume_url', '/assets/resume.pdf')

  /* Resolved projects array */
  const projects = projectsOverride ?? defaultProjects

  /* ─── Project CRUD ─── */
  const addProject = useCallback(
    (project) => setProjectsOverride((prev) => [...(prev ?? defaultProjects), project]),
    [setProjectsOverride],
  )

  const updateProject = useCallback(
    (slug, data) =>
      setProjectsOverride((prev) =>
        (prev ?? defaultProjects).map((p) => (p.slug === slug ? { ...p, ...data } : p)),
      ),
    [setProjectsOverride],
  )

  const deleteProject = useCallback(
    (slug) =>
      setProjectsOverride((prev) => (prev ?? defaultProjects).filter((p) => p.slug !== slug)),
    [setProjectsOverride],
  )

  const resetProjects = useCallback(() => setProjectsOverride(null), [setProjectsOverride])

  return (
    <DataContext.Provider
      value={{
        /* Data */
        projects,
        resumeUrl,
        /* Project CRUD */
        addProject,
        updateProject,
        deleteProject,
        resetProjects,
        /* Resume */
        setResumeUrl,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
