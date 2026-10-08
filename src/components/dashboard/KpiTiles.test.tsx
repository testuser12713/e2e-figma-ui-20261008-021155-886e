import { render, screen } from '@testing-library/react'
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
    expect(screen.getByText('Durchschnittlicher Auftragswert')).toBeInTheDocument()
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
