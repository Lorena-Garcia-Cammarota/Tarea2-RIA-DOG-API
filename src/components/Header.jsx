import { Link } from 'react-router-dom'

function Header({ galleryCount = 0 }) {
  return (
    <header className="patitas-header">
      <div className="container-fluid container-lg px-3 px-sm-4 py-2 py-md-3">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 gap-md-3">
          <Link
            to="/"
            className="patitas-header__brand flex-shrink-1 min-w-0 me-auto"
          >
            <img
              src="/assets/logo.png"
              alt=""
              className="patitas-header__logo flex-shrink-0"
              width={48}
              height={48}
            />
            <div className="min-w-0">
              <h1 className="patitas-header__title text-truncate">Patitas</h1>
              <p className="patitas-header__tagline d-none d-sm-block mb-0 text-truncate">
                Descubre perritos adorables
              </p>
            </div>
          </Link>
          <Link
            to="/galeria"
            className="btn patitas-header__gallery-btn rounded-pill d-inline-flex align-items-center gap-1 gap-sm-2 flex-shrink-0 ms-auto ms-sm-0"
          >
            <img src="/assets/icons/heart-filled.svg" alt="" aria-hidden="true" />
            <span className="d-none d-sm-inline">Mi Galería</span>
            <span className="d-sm-none">Galería</span>
            <span>({galleryCount})</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
