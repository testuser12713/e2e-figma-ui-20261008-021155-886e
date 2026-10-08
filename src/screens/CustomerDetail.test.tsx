import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import CustomerDetail from './CustomerDetail'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/customers/:customerId" element={<CustomerDetail />} />
        <Route path="/customers" element={<div>Kundenliste-Inhalt</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('CustomerDetail', () => {
  it('renders the customer header and the three tabs', () => {
    renderAt('/customers/c-001')

    expect(screen.getByRole('heading', { name: 'Kundendetail' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Anna Müller' })).toBeInTheDocument()
    expect(screen.getByText('Müller GmbH')).toBeInTheDocument()
    expect(screen.getByText('anna.mueller@mueller-gmbh.de')).toBeInTheDocument()
    expect(screen.getByText('+49 30 1234567')).toBeInTheDocument()
    expect(screen.getByText('Berlin')).toBeInTheDocument()
    expect(screen.getByText('Aktiv')).toBeInTheDocument()

    expect(screen.getByRole('tab', { name: 'Übersicht' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Aufträge' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Notizen' })).toBeInTheDocument()
  })

  it('marks the overview tab active by default and switches the visible panel', async () => {
    const user = userEvent.setup()
    renderAt('/customers/c-002')

    const overview = screen.getByRole('tab', { name: 'Übersicht' })
    const orders = screen.getByRole('tab', { name: 'Aufträge' })
    const notes = screen.getByRole('tab', { name: 'Notizen' })

    expect(overview).toHaveAttribute('aria-selected', 'true')
    expect(orders).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Übersicht')

    await user.click(orders)
    expect(orders).toHaveAttribute('aria-selected', 'true')
    expect(overview).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Aufträge')

    await user.click(notes)
    expect(notes).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Notizen')
    expect(
      screen.getByText('Für diesen Kunden sind noch keine Notizen hinterlegt.'),
    ).toBeInTheDocument()
  })

  it('renders the disabled coming-soon new-order button', () => {
    renderAt('/customers/c-003')

    const button = screen.getByRole('button', { name: /Neuer Auftrag/ })
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Coming soon')
  })

  it('shows the not-found view with a link back to the customer list for an unknown id', () => {
    renderAt('/customers/does-not-exist')

    expect(screen.getByText('Kunde nicht gefunden')).toBeInTheDocument()
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Kundendetail' })).not.toBeInTheDocument()

    const backLink = screen.getByRole('link', { name: /Zur Kundenliste/ })
    expect(backLink).toHaveAttribute('href', '/customers')
  })
})
