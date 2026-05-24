import DogGrid from '../components/DogGrid.jsx'
import GalleryBackButton from '../components/GalleryBackButton.jsx'
import GalleryEmptyState from '../components/GalleryEmptyState.jsx'
import { getSavedGallery } from '../services/galleryStorage.js'

function urlsToGalleryPhotos(urls) {
  return urls.map((url, index) => ({
    id: `favorite-${index}-${url}`,
    url,
    alt: 'Perro favorito',
  }))
}

function GalleryView({ favoriteUrls, onToggleFavorite }) {
  const savedUrls = getSavedGallery().filter((url) => favoriteUrls.has(url))
  const isEmpty = savedUrls.length === 0

  return (
    <section
      className="gallery-view mx-auto w-100"
      aria-label="Galería personal"
    >
      <header className="text-center mb-3 mb-md-4 px-1">
        <h2 className="gallery-view__title mb-0">Tu Galería Personal</h2>
        <GalleryBackButton className="mt-3" />
      </header>

      {isEmpty ? (
        <GalleryEmptyState />
      ) : (
        <DogGrid
          photos={urlsToGalleryPhotos(savedUrls)}
          favoriteUrls={favoriteUrls}
          onToggleFavorite={onToggleFavorite}
          showScrollHint={false}
        />
      )}
    </section>
  )
}

export default GalleryView
