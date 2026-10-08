import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div>Dashboard-Inhalt</div>} />
          <Route path="customers" element={<div>Kundenliste-Inhalt</div>} />
        </Route>
      </Routes>
      <LocationDisplay />
    </MemoryRouter>,
  )
}

describe('App shell navigation', () => {
  it('starts on the dashboard route at /', () => {
    renderAt('/')
    expect(screen.getByTestId('location')).toHaveTextContent('/')
    expect(screen.getByText('Dashboard-Inhalt')).toBeInTheDocument()
  })

  it('switches from / to /customers when the nav link is clicked, without a reload', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.click(screen.getByRole('link', { name: 'Kundenliste' }))

    expect(screen.getByTestId('location')).toHaveTextContent('/customers')
    expect(screen.getByText('Kundenliste-Inhalt')).toBeInTheDocument()
    expect(screen.queryByText('Dashboard-Inhalt')).not.toBeInTheDocument()
  })

  it('exposes both navigation destinations', () => {
    renderAt('/')
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Kundenliste' })).toHaveAttribute(
      'href',
      '/customers',
    )
  })
})
