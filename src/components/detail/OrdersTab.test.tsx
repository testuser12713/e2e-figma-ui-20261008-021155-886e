import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { customers } from '../../data/customers'
import OrdersTab from './OrdersTab'

describe('OrdersTab', () => {
  it('lists the orders of the customer newest first with de-DE date and amount', () => {
    const customer = customers.find((entry) => entry.id === 'c-001')!
    render(<OrdersTab customer={customer} />)

    const rows = screen.getAllByRole('row').slice(1)
    expect(rows).toHaveLength(2)

    expect(within(rows[0]).getByText('01.10.2026')).toBeInTheDocument()
    expect(within(rows[0]).getByText('Lizenzverlängerung Q4')).toBeInTheDocument()
    expect(within(rows[0]).getByText('8.900,50 €')).toBeInTheDocument()
    expect(within(rows[0]).getByText('Offen')).toBeInTheDocument()

    expect(within(rows[1]).getByText('18.09.2026')).toBeInTheDocument()
    expect(within(rows[1]).getByText('Jahreswartung ERP-System')).toBeInTheDocument()
    expect(within(rows[1]).getByText('12.400,00 €')).toBeInTheDocument()
    expect(within(rows[1]).getByText('Abgeschlossen')).toBeInTheDocument()
  })

  it('shows an empty-state line when the customer has no orders', () => {
    const customer = customers.find((entry) => entry.id === 'c-005')!
    render(<OrdersTab customer={customer} />)

    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getByText('Für diesen Kunden sind noch keine Aufträge vorhanden.')).toBeInTheDocument()
  })
})
