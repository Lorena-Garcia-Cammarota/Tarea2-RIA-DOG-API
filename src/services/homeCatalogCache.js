/** Caché en memoria del listado del home (evita recargar al volver desde galería). */
let cache = null

export function getHomeCatalogCache() {
  return cache
}

export function setHomeCatalogCache(entry) {
  cache = entry
}

export function clearHomeCatalogCache() {
  cache = null
}
