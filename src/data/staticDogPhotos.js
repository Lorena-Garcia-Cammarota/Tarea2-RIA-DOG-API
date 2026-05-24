/**
 * Imágenes estáticas para el diseño (sin Dog CEO API).
 * URLs tomadas del export Figma en mockup assets.
 */
const BASE_PHOTOS = [
  'https://images.unsplash.com/photo-1649003591147-8ef4e4e4aac7?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1643687836150-f2b416adabf6?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1649003592839-ce0bf1a804fa?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1623865766092-3e5ab9882b21?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1649003590516-6c39a7ea6d76?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1649003589713-46b45cb49acb?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1649003590858-90147e019921?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1649003587456-12185910dd34?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1649003592455-77c0efdec77e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1649003592350-4c2ced7c4bd7?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1651044204351-f0a6aab96e3e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1649003591341-59cd92f24be6?w=600&h=600&fit=crop',
]

/** 24 tarjetas: 12 visibles en la primera “pantalla” + más al hacer scroll */
export function getStaticDogPhotos(count = 24) {
  return Array.from({ length: count }, (_, i) => ({
    id: `static-dog-${i + 1}`,
    url: BASE_PHOTOS[i % BASE_PHOTOS.length],
    alt: `Perrito adorable ${i + 1}`,
  }))
}
