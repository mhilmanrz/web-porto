import { useState, useCallback } from 'react'

/**
 * useState that persists to localStorage.
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @returns {[T, function(T|function(T):T): void]}
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value) => {
      try {
        const next = typeof value === 'function' ? value(storedValue) : value
        setStoredValue(next)
        window.localStorage.setItem(key, JSON.stringify(next))
      } catch (err) {
        console.warn(`useLocalStorage[${key}] write failed:`, err)
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue]
}
