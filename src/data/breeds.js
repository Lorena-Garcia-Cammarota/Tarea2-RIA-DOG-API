/**
 * Lista fija de razas. `apiPath` es el segmento de la Dog CEO API
 * (https://dog.ceo/dog-api/documentation/random).
 */
export const BREED_OPTIONS = [
  { value: 'all', label: 'Todos los Perros', icon: '🐕', apiPath: null },
  { value: 'pitbull', label: 'Pitbull', icon: '🦴', apiPath: 'pitbull' },
  { value: 'terrier', label: 'Terrier', icon: '🐕‍🦺', apiPath: 'terrier' },
  { value: 'doberman', label: 'Dóberman', icon: '🐾', apiPath: 'doberman' },
  { value: 'labrador', label: 'Labrador', icon: '🦮', apiPath: 'labrador' },
  {
    value: 'golden',
    label: 'Golden Retriever',
    icon: '✨',
    apiPath: 'retriever/golden',
  },
  { value: 'husky', label: 'Husky', icon: '❄️', apiPath: 'husky' },
  { value: 'poodle', label: 'Poodle', icon: '💝', apiPath: 'poodle' },
  { value: 'corgi', label: 'Corgi', icon: '👑', apiPath: 'corgi' },
  { value: 'beagle', label: 'Beagle', icon: '🎯', apiPath: 'beagle' },
]

export function getBreedByValue(value) {
  return BREED_OPTIONS.find((b) => b.value === value) ?? BREED_OPTIONS[0]
}
