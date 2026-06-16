const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

/**
 * Upload an image file to Cloudinary (unsigned preset).
 * @param {File} file
 * @param {string} folder
 * @returns {Promise<string>} secure_url
 */
export async function uploadImage(file, folder = 'portfolio') {
  return _upload(file, folder, 'image')
}

/**
 * Upload a PDF or other raw file to Cloudinary (unsigned preset).
 * @param {File} file
 * @param {string} folder
 * @returns {Promise<string>} secure_url
 */
export async function uploadFile(file, folder = 'portfolio/resume') {
  return _upload(file, folder, 'raw')
}

async function _upload(file, folder, resourceType) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', folder)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    { method: 'POST', body: formData },
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message ?? `Upload gagal (${res.status})`)
  }

  const data = await res.json()
  return data.secure_url
}
