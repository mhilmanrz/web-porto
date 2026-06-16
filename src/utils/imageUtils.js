/**
 * Compress and convert a File to a base64 data URL.
 * Resizes to maxWidth and applies quality compression.
 * @param {File} file
 * @param {{ maxWidth?: number, quality?: number }} options
 * @returns {Promise<string>} base64 data URL
 */
export function compressImage(file, { maxWidth = 1200, quality = 0.75 } = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      // Calculate target dimensions
      let { width, height } = img
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      const base64 = canvas.toDataURL('image/jpeg', quality)
      resolve(base64)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Gagal membaca gambar'))
    }

    img.src = url
  })
}

/**
 * Estimate size of a base64 string in bytes.
 * @param {string} base64
 * @returns {number}
 */
export function base64Size(base64) {
  // base64 → actual bytes: each 4 chars = 3 bytes
  const str = base64.split(',')[1] ?? base64
  return Math.round((str.length * 3) / 4)
}

/**
 * Format bytes to human readable string.
 * @param {number} bytes
 * @returns {string}
 */
export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
