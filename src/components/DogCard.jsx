function DogCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <article className="dog-card card border-0 h-100 position-relative overflow-hidden shadow">
      <div className="ratio ratio-1x1 dog-card__media">
        <img
          className="dog-card__image object-fit-cover"
          src={photo.url}
          alt={photo.alt}
          width={320}
          height={320}
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
          loading="lazy"
          decoding="async"
        />
      </div>
      <button
        type="button"
        className="btn btn-light rounded-circle dog-card__favorite position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center p-0"
        aria-label={
          isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
        }
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(photo.url)}
      >
        <img
          src={
            isFavorite
              ? '/assets/icons/heart-filled.svg'
              : '/assets/icons/heart-outline.svg'
          }
          alt=""
        />
      </button>
    </article>
  )
}

export default DogCard
