import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { customers } from '../../data/customers'
import { formatCurrency } from '../../lib/format'
import OverviewTab from './OverviewTab'

function escapeRegExp(value: string): RegExp {
  return new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s'))
}

describe('OverviewTab', () => {
  it('shows the master data of the customer', () => {
    const customer = customers.find((entry) => entry.id === 'c-001')!
    render(<OverviewTab customer={customer} />)

    expect(screen.getByText('Stammdaten')).toBeInTheDocument()
    expect(screen.getByText('Müller GmbH')).toBeInTheDocument()
    expect(screen.getByText('Anna Müller')).toBeInTheDocument()
    expect(screen.getByText('anna.mueller@mueller-gmbh.de')).toBeInTheDocument()
    expect(screen.getByText('+49 30 1234567')).toBeInTheDocument()
    expect(screen.getByText('Berlin')).toBeInTheDocument()
    expect(screen.getByText('14.03.2019')).toBeInTheDocument()
  })

  it('derives the key figures from the orders of the customer', () => {
    const customer = customers.find((entry) => entry.id === 'c-001')!
    render(<OverviewTab customer={customer} />)

    expect(screen.getByText('Kennzahlen')).toBeInTheDocument()
    expect(screen.getByText('Gesamtumsatz')).toBeInTheDocument()
    expect(screen.getByText(escapeRegExp(formatCurrency(12400 + 8900.5)))).toBeInTheDocument()
    expect(screen.getByText('Anzahl Aufträge')).toBeInTheDocument()
    expect(screen.getByText('Offene Aufträge')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText(escapeRegExp(formatCurrency((12400 + 8900.5) / 2)))).toBeInTheDocument()
  })

  it('shows zeroed key figures for a customer without orders', () => {
    const customer = customers.find((entry) => entry.id === 'c-005')!
    render(<OverviewTab customer={customer} />)

    expect(screen.getAllByText(escapeRegExp(formatCurrency(0))).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('0')).toHaveLength(2)
  })
})
