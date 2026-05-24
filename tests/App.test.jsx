import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../src/components/Header.jsx'

describe('Header', () => {
  it('muestra el título Patitas', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )
    expect(screen.getByText('Patitas')).toBeInTheDocument()
  })
})
