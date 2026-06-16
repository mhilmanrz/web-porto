const WORDS_PER_MINUTE = 200

/**
 * Estimate reading time for a string of text.
 * @param {string} text
 * @returns {string} e.g. "3 min read"
 */
export function readTime(text = '') {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
  return `${minutes} min read`
}
