import { Link } from 'react-router-dom'

function GalleryEmptyState() {
  return (
    <div className="gallery-empty d-flex flex-column align-items-center text-center px-3 pb-5">
      <p className="gallery-empty__hint mb-4 mb-sm-5">
        ¡Aún no hay favoritos! Comienza a agregar perritos lindos.
      </p>
      <div className="gallery-empty__icon mb-3" aria-hidden="true">
        <img src="/assets/icons/heart-outline.svg" alt="" />
      </div>
      <p className="gallery-empty__message fw-semibold mb-4">
        Tu galería está vacía
      </p>
      <Link
        to="/"
        className="btn gallery-empty__cta rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2"
      >
        <img
          src="/assets/logo.png"
          alt=""
          className="patitas-cta-btn__logo"
          width={22}
          height={22}
          aria-hidden="true"
        />
        Ver Perritos
      </Link>
    </div>
  )
}

export default GalleryEmptyState
