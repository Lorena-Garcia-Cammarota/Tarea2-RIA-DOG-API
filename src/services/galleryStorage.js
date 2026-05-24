const STORAGE_KEY = 'patitas-gallery'

export function getSavedGallery() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveToGallery(imageUrl) {
  const gallery = getSavedGallery()
  if (gallery.includes(imageUrl)) {
    return gallery
  }
  const updated = [...gallery, imageUrl]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function removeFromGallery(imageUrl) {
  const updated = getSavedGallery().filter((url) => url !== imageUrl)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}
