import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface BreedFilterProps {
  selectedBreed: string;
  onBreedChange: (breed: string) => void;
}

const breeds = [
  { value: 'all', label: '🐕 Todos los Perros', emoji: '🐕' },
  { value: 'pitbull', label: '🦴 Pitbull', emoji: '🦴' },
  { value: 'terrier', label: '🐕‍🦺 Terrier', emoji: '🐕‍🦺' },
  { value: 'doberman', label: '🐾 Dóberman', emoji: '🐾' },
  { value: 'labrador', label: '🦮 Labrador', emoji: '🦮' },
  { value: 'golden retriever', label: '✨ Golden Retriever', emoji: '✨' },
  { value: 'husky', label: '❄️ Husky', emoji: '❄️' },
  { value: 'poodle', label: '💝 Poodle', emoji: '💝' },
  { value: 'corgi', label: '👑 Corgi', emoji: '👑' },
  { value: 'beagle', label: '🎯 Beagle', emoji: '🎯' },
  { value: 'bulldog', label: '💪 Bulldog', emoji: '💪' },
];

export function BreedFilter({ selectedBreed, onBreedChange }: BreedFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedBreedObj = breeds.find(b => b.value === selectedBreed) || breeds[0];

  return (
    <div className="relative max-w-md mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-white border-2 border-amber-200 rounded-3xl shadow-md hover:shadow-lg hover:border-amber-300 focus:border-amber-400 focus:outline-none transition-all flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500" />
          <span className="text-amber-900">{selectedBreedObj.label}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border-2 border-amber-200 rounded-3xl shadow-xl overflow-hidden z-20 max-h-96 overflow-y-auto">
          {breeds.map((breed) => (
            <button
              key={breed.value}
              onClick={() => {
                onBreedChange(breed.value);
                setIsOpen(false);
              }}
              className={`w-full px-6 py-3.5 text-left hover:bg-amber-50 transition-colors flex items-center gap-3 ${
                selectedBreed === breed.value ? 'bg-amber-100' : ''
              }`}
            >
              <span className="text-xl">{breed.emoji}</span>
              <span className="text-amber-900">{breed.label.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
