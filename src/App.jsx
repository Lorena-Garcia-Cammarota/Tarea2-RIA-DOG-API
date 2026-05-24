import { useCallback, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import {
  getSavedGallery,
  removeFromGallery,
  saveToGallery,
} from './services/galleryStorage.js'

function App() {
  const [favoriteUrls, setFavoriteUrls] = useState(
    () => new Set(getSavedGallery()),
  )

  const onToggleFavorite = useCallback((url) => {
    setFavoriteUrls((prev) => {
      const next = new Set(prev)
      if (next.has(url)) {
        next.delete(url)
        removeFromGallery(url)
      } else {
        next.add(url)
        saveToGallery(url)
      }
      return next
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="patitas-page min-vh-100 d-flex flex-column">
        <Header galleryCount={favoriteUrls.size} />
        <main className="container-fluid container-lg flex-grow-1 px-3 px-sm-4 py-3 py-md-4 pb-4 pb-lg-5">
          <AppRouter
            favoriteUrls={favoriteUrls}
            onToggleFavorite={onToggleFavorite}
          />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

