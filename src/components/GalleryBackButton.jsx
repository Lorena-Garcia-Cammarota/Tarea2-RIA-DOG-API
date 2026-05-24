import { Link } from 'react-router-dom'

function GalleryBackButton({ className = '' }) {
  return (
    <Link
      to="/"
      className={`btn gallery-empty__cta rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 ${className}`.trim()}
    >
      <img
        src="/assets/logo.png"
        alt=""
        className="patitas-cta-btn__logo"
        width={22}
        height={22}
        aria-hidden="true"
      />
      Volver al inicio
    </Link>
  )
}

export default GalleryBackButton
