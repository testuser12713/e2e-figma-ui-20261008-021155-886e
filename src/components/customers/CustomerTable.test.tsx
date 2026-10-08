import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Customer } from '../../types'
import { customers as sampleCustomers } from '../../data/customers'
import CustomerTable from './CustomerTable'

const customers: Customer[] = [
  {
    id: 'c-101',
    name: 'Anna Beispiel',
    company: 'Beispiel GmbH',
    city: 'Berlin',
    email: 'anna@beispiel.de',
    phone: '+49 30 000000',
    status: 'active',
    revenue: 1234.5,
    since: '2019-03-14',
  },
  {
    id: 'c-102',
    name: 'Ben Muster',
    company: 'Muster AG',
    city: 'Hamburg',
    email: 'ben@muster.de',
    phone: '+49 40 111111',
    status: 'inactive',
    revenue: 98765.4,
    since: '2020-07-02',
  },
]

describe('CustomerTable', () => {
  it('renders one row per customer with all column values', () => {
    render(<CustomerTable customers={customers} onSelect={() => {}} />)

    expect(screen.getByText('Anna Beispiel')).toBeInTheDocument()
    expect(screen.getByText('Beispiel GmbH')).toBeInTheDocument()
    expect(screen.getByText('Berlin')).toBeInTheDocument()
    expect(screen.getByText('1.234,50 €')).toBeInTheDocument()
    expect(screen.getByText('Aktiv')).toBeInTheDocument()

    expect(screen.getByText('Ben Muster')).toBeInTheDocument()
    expect(screen.getByText('Muster AG')).toBeInTheDocument()
    expect(screen.getByText('Hamburg')).toBeInTheDocument()
    expect(screen.getByText('98.765,40 €')).toBeInTheDocument()
    expect(screen.getByText('Inaktiv')).toBeInTheDocument()

    expect(screen.getAllByRole('link')).toHaveLength(customers.length)
  })

  it('shows at least eight sample customers', () => {
    render(<CustomerTable customers={sampleCustomers} onSelect={() => {}} />)
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(8)
  })

  it('calls onSelect with the customer id when a row is clicked', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<CustomerTable customers={customers} onSelect={onSelect} />)

    await user.click(screen.getByRole('link', { name: /Anna Beispiel/ }))

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith('c-101')
  })

  it('calls onSelect when a focused row is activated with Enter or Space', () => {
    const onSelect = vi.fn()
    render(<CustomerTable customers={customers} onSelect={onSelect} />)

    const row = screen.getByRole('link', { name: /Ben Muster/ })
    row.focus()

    fireEvent.keyDown(row, { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledWith('c-102')

    fireEvent.keyDown(row, { key: ' ' })
    expect(onSelect).toHaveBeenCalledTimes(2)
  })
})
