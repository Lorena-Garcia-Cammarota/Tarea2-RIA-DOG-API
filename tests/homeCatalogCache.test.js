import { describe, expect, it } from 'vitest'
import {
  clearHomeCatalogCache,
  getHomeCatalogCache,
  setHomeCatalogCache,
} from '../src/services/homeCatalogCache.js'

describe('homeCatalogCache', () => {
  it('guarda y devuelve el catálogo del home', () => {
    clearHomeCatalogCache()
    setHomeCatalogCache({
      breedValue: 'all',
      imageUrls: ['https://example.com/a.jpg'],
    })
    expect(getHomeCatalogCache()).toEqual({
      breedValue: 'all',
      imageUrls: ['https://example.com/a.jpg'],
    })
    clearHomeCatalogCache()
    expect(getHomeCatalogCache()).toBeNull()
  })
})
