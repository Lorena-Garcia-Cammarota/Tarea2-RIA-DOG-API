import { useCallback, useEffect, useMemo, useState } from 'react'
import BreedFilter from '../components/BreedFilter.jsx'
import DogGrid from '../components/DogGrid.jsx'
import { getBreedByValue } from '../data/breeds.js'
import { fetchImageUrlsForBreed, urlsToPhotos } from '../services/dogApi.js'
import {
  getHomeCatalogCache,
  setHomeCatalogCache,
} from '../services/homeCatalogCache.js'

function readCachedState() {
  const cached = getHomeCatalogCache()
  if (!cached?.imageUrls?.length) {
    return {
      selectedBreed: 'all',
      imageUrls: [],
      loading: true,
    }
  }
  return {
    selectedBreed: cached.breedValue,
    imageUrls: cached.imageUrls,
    loading: false,
  }
}

function HomeView({ favoriteUrls, onToggleFavorite }) {
  const initial = readCachedState()
  const [selectedBreed, setSelectedBreed] = useState(initial.selectedBreed)
  const [imageUrls, setImageUrls] = useState(initial.imageUrls)
  const [loading, setLoading] = useState(initial.loading)
  const [error, setError] = useState(null)

  const breed = getBreedByValue(selectedBreed)

  const photos = useMemo(
    () => urlsToPhotos(imageUrls, breed.label),
    [imageUrls, breed.label],
  )

  const loadCatalog = useCallback(async (breedValue) => {
    const cached = getHomeCatalogCache()
    if (
      cached?.breedValue === breedValue &&
      cached.imageUrls.length > 0
    ) {
      setImageUrls(cached.imageUrls)
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const urls = await fetchImageUrlsForBreed(breedValue)
      setImageUrls(urls)
      setHomeCatalogCache({
        breedValue,
        imageUrls: urls,
      })
    } catch (err) {
      setImageUrls([])
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudieron cargar las imágenes',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCatalog(selectedBreed)
  }, [selectedBreed, loadCatalog])

  useEffect(() => {
    if (imageUrls.length === 0 || loading || error) return
    setHomeCatalogCache({
      breedValue: selectedBreed,
      imageUrls,
    })
  }, [selectedBreed, imageUrls, loading, error])

  const handleBreedChange = (breedValue) => {
    setSelectedBreed(breedValue)
  }

  return (
    <section className="home-view" aria-label="Explorar perros">
      <div className="row justify-content-center mb-3 mb-md-4">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
          <BreedFilter
            selectedBreed={selectedBreed}
            onBreedChange={handleBreedChange}
            disabled={loading}
          />
        </div>
      </div>

      {loading && (
        <div
          className="d-flex flex-column align-items-center justify-content-center gap-3 py-5 text-center patitas-text"
          role="status"
          aria-live="polite"
        >
          <div
            className="spinner-border text-warning"
            role="status"
            aria-hidden="true"
          />
          <p className="mb-0">Cargando perritos adorables…</p>
        </div>
      )}

      {!loading && error && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="alert alert-warning text-center shadow-sm patitas-alert"
              role="alert"
            >
              <p className="mb-3">{error}</p>
              <button
                type="button"
                className="btn btn-warning rounded-pill px-4"
                onClick={() => loadCatalog(selectedBreed)}
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && photos.length > 0 && (
        <DogGrid
          photos={photos}
          favoriteUrls={favoriteUrls}
          onToggleFavorite={onToggleFavorite}
          showScrollHint={false}
        />
      )}
    </section>
  )
}

export default HomeView
