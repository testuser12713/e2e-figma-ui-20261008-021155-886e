import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import KpiTiles from './KpiTiles'
import { customers } from '../../data/customers'
import { orders } from '../../data/orders'
import { formatCurrency } from '../../lib/format'

const normalize = (value: string) => value.replace(/\u00a0/g, ' ')

const textIs = (expected: string) => (content: string) =>
  normalize(content) === normalize(expected)

describe('KpiTiles', () => {
  it('renders the four KPI tile labels', () => {
    render(<KpiTiles />)

    expect(screen.getByText('Gesamtumsatz')).toBeInTheDocument()
    expect(screen.getByText('Offene Aufträge')).toBeInTheDocument()
    expect(screen.getByText('Aktive Kunden')).toBeInTheDocument()
    expect(screen.getByText('Ø Auftragswert')).toBeInTheDocument()
  })

  it('renders the short label for the fourth tile', () => {
    render(<KpiTiles />)

    expect(screen.getByText('Ø Auftragswert')).toBeInTheDocument()
    expect(screen.queryByText('Durchschnittlicher Auftragswert')).not.toBeInTheDocument()
  })

  it('renders a delta line inside every KPI tile', () => {
    render(<KpiTiles />)

    const fourthTile = screen.getByText('Ø Auftragswert').closest('article')
    expect(fourthTile).not.toBeNull()

    expect(within(fourthTile as HTMLElement).getByText(textIs('▼ −1,2 %'))).toBeInTheDocument()

    for (const label of ['Gesamtumsatz', 'Offene Aufträge', 'Aktive Kunden', 'Ø Auftragswert']) {
      const tile = screen.getByText(label).closest('article')
      expect(tile).not.toBeNull()
      expect(within(tile as HTMLElement).getByText(/[▲▼]/)).toBeInTheDocument()
    }
  })

  it('computes the values from the sample data', () => {
    const totalRevenue = customers.reduce((sum, customer) => sum + customer.revenue, 0)
    const openOrders = orders.filter((order) => order.status === 'open').length
    const activeCustomers = customers.filter((customer) => customer.status === 'active').length
    const averageOrderValue =
      orders.length > 0
        ? orders.reduce((sum, order) => sum + order.amount, 0) / orders.length
        : 0

    render(<KpiTiles />)

    expect(screen.getByText(textIs(formatCurrency(totalRevenue)))).toBeInTheDocument()
    expect(screen.getByText(textIs(String(openOrders)))).toBeInTheDocument()
    expect(screen.getByText(textIs(String(activeCustomers)))).toBeInTheDocument()
    expect(screen.getByText(textIs(formatCurrency(averageOrderValue)))).toBeInTheDocument()
  })
})
