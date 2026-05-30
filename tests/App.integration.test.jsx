import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { clearHomeCatalogCache } from '../src/services/homeCatalogCache.js'
import { renderApp } from './renderApp.jsx'

const MOCK_URLS = Array.from(
  { length: 12 },
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

async function waitForHomeLoaded() {
  await waitFor(() => {
    expect(screen.getByLabelText(/explorar perros/i)).toBeInTheDocument()
  })
  await screen.findAllByRole('button', { name: /agregar a favoritos/i })
}

describe('App (integración)', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
    clearHomeCatalogCache()
  })

  it('navega de home a galería y muestra el título', async () => {
    mockDogApiFetch()
    renderApp('/')

    expect(screen.getByText('Patitas')).toBeInTheDocument()
    await waitForHomeLoaded()

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

    renderApp('/galeria')

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /perro favorito/i })).toHaveAttribute(
        'src',
        favoriteUrl,
      )
    })

    expect(screen.getByText('(1)')).toBeInTheDocument()
  })

  it('agrega favorito desde home y lo muestra en galería', async () => {
    mockDogApiFetch()
    renderApp('/')
    await waitForHomeLoaded()

    const addButtons = screen.getAllByRole('button', {
      name: /agregar a favoritos/i,
    })
    fireEvent.click(addButtons[0])

    await waitFor(() => {
      expect(screen.getByText('(1)')).toBeInTheDocument()
    })

    expect(JSON.parse(localStorage.getItem('patitas-gallery'))).toEqual([
      MOCK_URLS[0],
    ])

    fireEvent.click(screen.getByRole('link', { name: /mi galería/i }))

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /perro favorito/i })).toHaveAttribute(
        'src',
        MOCK_URLS[0],
      )
    })
  })

  it('muestra estado vacío en galería sin favoritos', async () => {
    mockDogApiFetch()
    renderApp('/galeria')

    expect(await screen.findByText('Tu galería está vacía')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver perritos/i })).toBeInTheDocument()
  })

  it('cambia de raza y vuelve a llamar a la API', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'success',
        message: MOCK_URLS,
      }),
    })
    vi.stubGlobal('fetch', fetchMock)

    renderApp('/')
    await waitForHomeLoaded()

    expect(fetchMock).toHaveBeenCalled()
    const callsAfterLoad = fetchMock.mock.calls.length

    fireEvent.click(screen.getByRole('button', { name: /todos los perros/i }))
    fireEvent.click(await screen.findByRole('button', { name: /^beagle$/i }))

    await waitFor(() => {
      expect(fetchMock.mock.calls.length).toBeGreaterThan(callsAfterLoad)
    })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/breed/beagle/images'),
    )
  })

  it('no vuelve a pedir imágenes al regresar del home desde galería', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'success',
        message: MOCK_URLS,
      }),
    })
    vi.stubGlobal('fetch', fetchMock)

    renderApp('/')
    await waitForHomeLoaded()

    const callsAfterLoad = fetchMock.mock.calls.length

    fireEvent.click(screen.getByRole('link', { name: /mi galería/i }))
    await screen.findByText('Tu Galería Personal')

    fireEvent.click(screen.getByRole('link', { name: /volver al inicio/i }))

    await waitFor(() => {
      expect(screen.getByLabelText(/explorar perros/i)).toBeInTheDocument()
    })

    expect(fetchMock.mock.calls.length).toBe(callsAfterLoad)
  })
})
