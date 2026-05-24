import { getBreedByValue } from '../data/breeds.js'

const API_BASE = 'https://dog.ceo/api'

export const PAGE_SIZE = 12
/** @deprecated Use PAGE_SIZE — kept for tests */
export const DEFAULT_IMAGE_COUNT = PAGE_SIZE

/** Una sola pantalla: 12 URLs (4×3), sin paginación extra. */
export const HOME_IMAGE_POOL_SIZE = 12
/** @deprecated Use HOME_IMAGE_POOL_SIZE */
export const ALL_BREEDS_POOL_SIZE = HOME_IMAGE_POOL_SIZE

export async function fetchRandomDogImages(count = DEFAULT_IMAGE_COUNT) {
  const response = await fetch(`${API_BASE}/breeds/image/random/${count}`)
  if (!response.ok) {
    throw new Error('No se pudieron cargar las imágenes')
  }
  const data = await response.json()
  if (data.status !== 'success') {
    throw new Error('No se pudieron cargar las imágenes')
  }
  return normalizeImageList(data.message)
}

export async function fetchBreedImages(breedPath, count = DEFAULT_IMAGE_COUNT) {
  const response = await fetch(
    `${API_BASE}/breed/${breedPath}/images/random/${count}`,
  )
  if (!response.ok) {
    throw new Error('No se pudieron cargar imágenes de la raza')
  }
  const data = await response.json()
  if (data.status !== 'success') {
    throw new Error('No se pudieron cargar imágenes de la raza')
  }
  return normalizeImageList(data.message)
}

/** Todas las URLs de una raza (para paginar en el cliente; no va a LocalStorage). */
export async function fetchBreedImageCatalog(breedPath) {
  const response = await fetch(`${API_BASE}/breed/${breedPath}/images`)
  if (!response.ok) {
    throw new Error('No se pudieron cargar imágenes de la raza')
  }
  const data = await response.json()
  if (data.status !== 'success') {
    throw new Error('No se pudieron cargar imágenes de la raza')
  }
  return normalizeImageList(data.message)
}

/** Primeras N URLs del catálogo, orden fijo (mismas fotos en cada visita/página). */
export function takeFixedPool(urls, size = HOME_IMAGE_POOL_SIZE) {
  return [...urls].sort().slice(0, size)
}

async function fetchBreedFixedPool(breedPath) {
  const catalog = await fetchBreedImageCatalog(breedPath)
  return takeFixedPool(catalog)
}

/** Primera página rápida (12 URLs) para mostrar contenido antes. */
export async function fetchInitialImageUrls(breedValue) {
  const breed = getBreedByValue(breedValue)
  if (breed.value === 'all' || !breed.apiPath) {
    return fetchRandomDogImages(PAGE_SIZE)
  }
  const catalog = await fetchBreedImageCatalog(breed.apiPath)
  return takeFixedPool(catalog, PAGE_SIZE)
}

/**
 * Lista completa para paginar (hasta HOME_IMAGE_POOL_SIZE).
 * "Todos" → aleatorio global; cada raza → catálogo fijo (mismas fotos siempre).
 */
export async function fetchImageUrlsForBreed(breedValue) {
  const breed = getBreedByValue(breedValue)
  if (breed.value === 'all' || !breed.apiPath) {
    return fetchRandomDogImages(HOME_IMAGE_POOL_SIZE)
  }
  return fetchBreedFixedPool(breed.apiPath)
}

/** Carga imágenes según el valor del filtro (`all`, `pitbull`, …). */
export async function fetchPhotosForBreed(
  breedValue,
  count = PAGE_SIZE,
) {
  const breed = getBreedByValue(breedValue)
  if (breed.value === 'all' || !breed.apiPath) {
    return fetchRandomDogImages(count)
  }
  return fetchBreedImages(breed.apiPath, count)
}

export function paginateUrls(urls, page, pageSize = PAGE_SIZE) {
  const start = (page - 1) * pageSize
  return urls.slice(start, start + pageSize)
}

export function getTotalPages(urlCount, pageSize = PAGE_SIZE) {
  if (urlCount === 0) return 0
  return Math.ceil(urlCount / pageSize)
}

export function getVisiblePageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ])

  const sorted = [...pages].filter((page) => page >= 1 && page <= totalPages)
  sorted.sort((a, b) => a - b)
  return sorted
}

function normalizeImageList(message) {
  return Array.isArray(message) ? message : [message]
}

export function urlsToPhotos(urls, breedLabel) {
  return urls.map((url, index) => ({
    id: url,
    url,
    alt: `${breedLabel} ${index + 1}`,
  }))
}
