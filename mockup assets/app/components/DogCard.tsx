import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface DogCardProps {
  id: string;
  url: string;
  alt: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string, url: string, alt: string) => void;
}

export function DogCard({ id, url, alt, isFavorite, onToggleFavorite }: DogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="relative rounded-3xl overflow-hidden shadow-lg bg-white group cursor-pointer"
    >
      <img
        src={url}
        alt={alt}
        className="w-full h-64 object-cover"
      />
      <button
        onClick={() => onToggleFavorite(id, url, alt)}
        className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all"
      >
        <Heart
          className={`w-5 h-5 transition-all ${
            isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
          }`}
        />
      </button>
    </motion.div>
  );
}
