import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  fetchBreedImageCatalog,
  fetchImageUrlsForBreed,
  fetchPhotosForBreed,
  fetchRandomDogImages,
  HOME_IMAGE_POOL_SIZE,
  getTotalPages,
  paginateUrls,
  urlsToPhotos,
} from '../src/services/dogApi.js'

describe('dogApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetchRandomDogImages devuelve un arreglo de URLs', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'success',
          message: ['https://dog.ceo/api/breed/husky/image1.jpg'],
        }),
      }),
    )

    const urls = await fetchRandomDogImages(1)
    expect(urls).toEqual(['https://dog.ceo/api/breed/husky/image1.jpg'])
  })

  it('fetchPhotosForBreed usa el endpoint de raza', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'success',
        message: ['https://dog.ceo/api/breed/beagle/image1.jpg'],
      }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await fetchPhotosForBreed('beagle', 3)

    expect(fetchMock).toHaveBeenCalledWith(
      'https://dog.ceo/api/breed/beagle/images/random/3',
    )
  })

  it('fetchBreedImageCatalog usa el endpoint de listado completo', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'success',
        message: [
          'https://dog.ceo/api/breed/beagle/a.jpg',
          'https://dog.ceo/api/breed/beagle/b.jpg',
        ],
      }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const urls = await fetchBreedImageCatalog('beagle')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://dog.ceo/api/breed/beagle/images',
    )
    expect(urls).toHaveLength(2)
  })

  it('fetchImageUrlsForBreed usa aleatorio en "Todos los perros"', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'success',
        message: Array.from({ length: HOME_IMAGE_POOL_SIZE }, (_, i) => `url-${i}`),
      }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await fetchImageUrlsForBreed('all')

    expect(fetchMock).toHaveBeenCalledWith(
      `https://dog.ceo/api/breeds/image/random/${HOME_IMAGE_POOL_SIZE}`,
    )
  })

  it('fetchImageUrlsForBreed usa catálogo fijo por raza', async () => {
    const catalog = Array.from(
      { length: HOME_IMAGE_POOL_SIZE + 10 },
      (_, i) => `https://dog.ceo/api/breed/beagle/z${String(i).padStart(2, '0')}.jpg`,
    )
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'success',
        message: catalog,
      }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const urls = await fetchImageUrlsForBreed('beagle')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://dog.ceo/api/breed/beagle/images',
    )
    expect(urls).toHaveLength(HOME_IMAGE_POOL_SIZE)
    expect(urls[0]).toBe(catalog[0])
    expect(urls).toEqual([...catalog].sort().slice(0, HOME_IMAGE_POOL_SIZE))
  })

  it('paginateUrls y getTotalPages dividen por páginas de PAGE_SIZE', () => {
    const urls = Array.from({ length: 25 }, (_, i) => `url-${i}`)
    expect(getTotalPages(urls.length)).toBe(3)
    expect(paginateUrls(urls, 2)).toHaveLength(12)
    expect(paginateUrls(urls, 3)).toHaveLength(1)
  })

  it('urlsToPhotos arma objetos con id igual a la URL', () => {
    const photos = urlsToPhotos(
      ['https://example.com/dog.jpg'],
      'Beagle',
    )
    expect(photos[0]).toEqual({
      id: 'https://example.com/dog.jpg',
      url: 'https://example.com/dog.jpg',
      alt: 'Beagle 1',
    })
  })
})
