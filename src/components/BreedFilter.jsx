import { useEffect, useId, useRef, useState } from 'react'
import { BREED_OPTIONS } from '../data/breeds.js'

function BreedFilter({ selectedBreed, onBreedChange, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)
  const listId = useId()
  const selected =
    BREED_OPTIONS.find((b) => b.value === selectedBreed) ?? BREED_OPTIONS[0]

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  const handleSelect = (value) => {
    onBreedChange(value)
    setIsOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={`breed-filter${isOpen ? ' breed-filter--open' : ''}`}
    >
      <button
        type="button"
        className="btn breed-filter__trigger w-100 d-flex justify-content-between align-items-center"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listId}
        disabled={disabled}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="breed-filter__trigger-left d-flex align-items-center gap-3 min-w-0">
          <img src="/assets/icons/search.svg" alt="" aria-hidden="true" />
          <span className="breed-filter__option-icon" aria-hidden="true">
            {selected.icon}
          </span>
          <span className="breed-filter__label">{selected.label}</span>
        </span>
        <img
          src="/assets/icons/chevron-down.svg"
          alt=""
          aria-hidden="true"
          className={`breed-filter__chevron ${isOpen ? 'breed-filter__chevron--open' : ''}`}
        />
      </button>

      {isOpen && (
        <ul
          id={listId}
          className="breed-filter__menu list-group shadow"
          role="listbox"
        >
          {BREED_OPTIONS.map((breed) => (
            <li
              key={breed.value}
              className="list-group-item p-0 border-0"
              role="option"
              aria-selected={selectedBreed === breed.value}
            >
              <button
                type="button"
                className={`btn breed-filter__option list-group-item list-group-item-action border-0 d-flex align-items-center gap-3 w-100 ${selectedBreed === breed.value ? 'breed-filter__option--active active' : ''}`}
                onClick={() => handleSelect(breed.value)}
              >
                <span className="breed-filter__option-icon" aria-hidden="true">
                  {breed.icon}
                </span>
                <span>{breed.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BreedFilter

