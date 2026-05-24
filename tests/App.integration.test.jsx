import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from '../src/App.jsx'

const MOCK_URLS = Array.from(
  { length: 48 },
  (_, i) => `https://dog.ceo/api/breed/beagle/test-${i}.jpg`,
)

function mockDogApiFetch() {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'success',
        message: MOCK_URLS,
      }),
    }),
  )
}

describe('App (integración)', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('navega de home a galería y muestra el título', async () => {
    mockDogApiFetch()
    render(<App />)

    expect(screen.getByText('Patitas')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByLabelText(/explorar perros/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('link', { name: /mi galería/i }))

    expect(
      await screen.findByText('Tu Galería Personal'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /volver al inicio/i })).toBeInTheDocument()
  })

  it('persiste favoritos y los muestra en galería', async () => {
    mockDogApiFetch()
    const favoriteUrl = MOCK_URLS[0]
    localStorage.setItem('patitas-gallery', JSON.stringify([favoriteUrl]))

    render(<App />)

    fireEvent.click(screen.getByRole('link', { name: /mi galería/i }))

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /perro favorito/i })).toHaveAttribute(
        'src',
        favoriteUrl,
      )
    })

    expect(screen.getByText('(1)')).toBeInTheDocument()
  })
})
