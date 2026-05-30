import { getBreedByValue } from '../data/breeds.js'

const API_BASE = 'https://dog.ceo/api'

export const PAGE_SIZE = 12
/** @deprecated Use PAGE_SIZE — kept for tests */
export const DEFAULT_IMAGE_COUNT = PAGE_SIZE

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

export function takeFixedPool(urls, size = HOME_IMAGE_POOL_SIZE) {
  return [...urls].sort().slice(0, size)
}

async function fetchBreedFixedPool(breedPath) {
  const catalog = await fetchBreedImageCatalog(breedPath)
  return takeFixedPool(catalog)
}

export async function fetchImageUrlsForBreed(breedValue) {
  const breed = getBreedByValue(breedValue)
  if (breed.value === 'all' || !breed.apiPath) {
    return fetchRandomDogImages(HOME_IMAGE_POOL_SIZE)
  }
  return fetchBreedFixedPool(breed.apiPath)
}

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
