import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { DogCard } from './components/DogCard';
import { BreedFilter } from './components/BreedFilter';

interface DogPhoto {
  id: string;
  url: string;
  alt: string;
}

interface FavoriteDog {
  id: string;
  url: string;
  alt: string;
}

export default function App() {
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [dogPhotos, setDogPhotos] = useState<DogPhoto[]>([]);
  const [favorites, setFavorites] = useState<FavoriteDog[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('patitas-favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('patitas-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Load dog photos when breed changes
  useEffect(() => {
    loadDogPhotos();
  }, [selectedBreed]);

  const loadDogPhotos = async () => {
    setLoading(true);

    const dogPhotoUrls = [
      'https://images.unsplash.com/photo-1649003591147-8ef4e4e4aac7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1643687836150-f2b416adabf6?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1649003592839-ce0bf1a804fa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1623865766092-3e5ab9882b21?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1649003590516-6c39a7ea6d76?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1649003589713-46b45cb49acb?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1649003590858-90147e019921?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1649003587456-12185910dd34?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1649003592455-77c0efdec77e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1649003592350-4c2ced7c4bd7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1651044204351-f0a6aab96e3e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1649003591341-59cd92f24be6?w=400&h=400&fit=crop',
    ];

    try {
      const photos: DogPhoto[] = dogPhotoUrls.map((url, i) => ({
        id: `${selectedBreed}-${Date.now()}-${i}`,
        url,
        alt: `${selectedBreed === 'all' ? 'Dog' : selectedBreed} photo ${i + 1}`,
      }));

      setDogPhotos(photos);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: string, url: string, alt: string) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === id);
      if (exists) {
        return prev.filter((fav) => fav.id !== id);
      } else {
        return [...prev, { id, url, alt }];
      }
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-2xl">🐾</span>
              </div>
              <div>
                <h1 className="text-amber-900">Patitas</h1>
                <p className="text-sm text-amber-700/70">Descubre perritos adorables</p>
              </div>
            </div>
            <button
              onClick={() => setShowGallery(!showGallery)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-rose-500 hover:to-pink-600 transition-all"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Mi Galería ({favorites.length})</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!showGallery ? (
          <>
            {/* Search Filter */}
            <div className="mb-8">
              <BreedFilter
                selectedBreed={selectedBreed}
                onBreedChange={setSelectedBreed}
              />
            </div>

            {/* Dog Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-amber-500 animate-pulse mx-auto mb-3" />
                  <p className="text-amber-700">Cargando perritos adorables...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dogPhotos.map((photo) => (
                  <DogCard
                    key={photo.id}
                    id={photo.id}
                    url={photo.url}
                    alt={photo.alt}
                    isFavorite={isFavorite(photo.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Gallery View */}
            <div className="mb-6 text-center">
              <h2 className="text-amber-900 mb-2">Tu Galería Personal</h2>
              <p className="text-amber-700/70">
                {favorites.length === 0
                  ? '¡Aún no hay favoritos! Comienza a agregar perritos lindos.'
                  : `${favorites.length} ${favorites.length === 1 ? 'perrito adorable guardado' : 'perritos adorables guardados'}`}
              </p>
            </div>

            {favorites.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <p className="text-amber-700 mb-4">Tu galería está vacía</p>
                  <button
                    onClick={() => setShowGallery(false)}
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    Ver Perritos
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((photo) => (
                  <DogCard
                    key={photo.id}
                    id={photo.id}
                    url={photo.url}
                    alt={photo.alt}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}