import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { filterCustomers } from '../lib/filterCustomers'
import { customers } from '../data/customers'
import CustomerList from './CustomerList'

function renderScreen() {
  return render(
    <MemoryRouter initialEntries={['/customers']}>
      <CustomerList />
    </MemoryRouter>,
  )
}

describe('filterCustomers', () => {
  it('returns every customer for a neutral call', () => {
    expect(filterCustomers(customers, '', 'all')).toHaveLength(customers.length)
  })

  it('matches name, company and city case-insensitively', () => {
    expect(filterCustomers(customers, 'BERLIN', 'all').map((c) => c.id)).toEqual([
      'c-001',
    ])
    expect(filterCustomers(customers, 'schmidt', 'all').map((c) => c.id)).toEqual([
      'c-002',
    ])
    expect(filterCustomers(customers, 'müller', 'all').map((c) => c.id)).toEqual([
      'c-001',
    ])
  })

  it('intersects the query with the status filter', () => {
    expect(filterCustomers(customers, 'frankfurt', 'inactive')).toHaveLength(1)
    expect(filterCustomers(customers, 'frankfurt', 'active')).toHaveLength(0)
  })
})

describe('CustomerList filtering', () => {
  it('starts neutral without an empty state', () => {
    renderScreen()
    expect(screen.getByText('10 Kunden')).toBeInTheDocument()
    expect(screen.queryByText('Keine Kunden gefunden')).not.toBeInTheDocument()
  })

  it('narrows the list live and case-insensitively while typing', async () => {
    const user = userEvent.setup()
    renderScreen()
    const search = screen.getByPlaceholderText('Kunden suchen…')

    await user.type(search, 'berlin')
    expect(screen.getByText('1 von 10 Kunden')).toBeInTheDocument()

    await user.clear(search)
    await user.type(search, 'BERLIN')
    expect(screen.getByText('1 von 10 Kunden')).toBeInTheDocument()
  })

  it('combines the status filter with the search as an intersection', async () => {
    const user = userEvent.setup()
    renderScreen()

    await user.click(screen.getByRole('radio', { name: 'Inaktiv' }))
    expect(screen.getByText('3 von 10 Kunden')).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText('Kunden suchen…'), 'frankfurt')
    expect(screen.getByText('1 von 10 Kunden')).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'Aktiv' }))
    expect(screen.getByText('Keine Kunden gefunden')).toBeInTheDocument()
  })

  it('shows the empty state only after a filter is applied and resets via the button', async () => {
    const user = userEvent.setup()
    renderScreen()
    const search = screen.getByPlaceholderText('Kunden suchen…')

    await user.type(search, 'zzz')
    expect(screen.getByText('Keine Kunden gefunden')).toBeInTheDocument()

    const resets = screen.getAllByRole('button', {
      name: 'Filter zurücksetzen',
    })
    await user.click(resets[resets.length - 1])

    expect(screen.queryByText('Keine Kunden gefunden')).not.toBeInTheDocument()
    expect(search).toHaveValue('')
    expect(screen.getByRole('radio', { name: 'Alle' })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    expect(screen.getByText('10 Kunden')).toBeInTheDocument()
  })
})
