import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeView from '../views/HomeView.jsx'

const GalleryView = lazy(() => import('../views/GalleryView.jsx'))

function RouteFallback() {
  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      role="status"
      aria-live="polite"
    >
      <div className="spinner-border text-warning" aria-hidden="true" />
      <span className="visually-hidden">Cargando vista…</span>
    </div>
  )
}

function AppRouter({ favoriteUrls, onToggleFavorite }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeView
            favoriteUrls={favoriteUrls}
            onToggleFavorite={onToggleFavorite}
          />
        }
      />
      <Route
        path="/galeria"
        element={
          <Suspense fallback={<RouteFallback />}>
            <GalleryView
              favoriteUrls={favoriteUrls}
              onToggleFavorite={onToggleFavorite}
            />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default AppRouter
