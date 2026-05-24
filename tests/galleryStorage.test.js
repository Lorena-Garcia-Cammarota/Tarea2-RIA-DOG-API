import { afterEach, describe, expect, it } from 'vitest'
import {
  getSavedGallery,
  removeFromGallery,
  saveToGallery,
} from '../src/services/galleryStorage.js'

describe('galleryStorage', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('empieza vacío si no hay datos', () => {
    expect(getSavedGallery()).toEqual([])
  })

  it('guarda y elimina favoritos en LocalStorage', () => {
    const url = 'https://dog.ceo/api/breed/beagle/demo.jpg'

    saveToGallery(url)
    expect(getSavedGallery()).toEqual([url])

    saveToGallery(url)
    expect(getSavedGallery()).toHaveLength(1)

    removeFromGallery(url)
    expect(getSavedGallery()).toEqual([])
  })
})
