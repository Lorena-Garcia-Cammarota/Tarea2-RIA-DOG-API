import DogCard from './DogCard.jsx'

function DogGrid({
  photos,
  favoriteUrls,
  onToggleFavorite,
  showScrollHint = true,
}) {
  return (
    <>
      <div className="row g-3 g-md-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="col-12 col-sm-6 col-md-4 col-xl-3 dog-grid__cell"
          >
            <DogCard
              photo={photo}
              isFavorite={favoriteUrls.has(photo.url)}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
      {showScrollHint && (
        <p className="dog-grid__scroll-hint text-center small mt-4 mb-3">
          Deslizá hacia abajo para ver más perritos
        </p>
      )}
    </>
  )
}

export default DogGrid
