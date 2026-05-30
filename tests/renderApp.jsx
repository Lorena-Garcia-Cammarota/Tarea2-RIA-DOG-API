import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PatitasApp } from '../src/App.jsx'

export function renderApp(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <PatitasApp />
    </MemoryRouter>,
  )
}
