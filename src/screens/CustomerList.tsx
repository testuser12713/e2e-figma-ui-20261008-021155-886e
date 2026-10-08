import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { customers } from '../data/customers'
import { filterCustomers } from '../lib/filterCustomers'
import type { StatusFilter } from '../types'
import CustomerFilters from '../components/customers/CustomerFilters'
import CustomerTable from '../components/customers/CustomerTable'
import EmptyState from '../components/customers/EmptyState'

export default function CustomerList() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')

  const filtered = filterCustomers(customers, query, status)
  const hasActiveFilter = query.trim() !== '' || status !== 'all'
  const showEmptyState = hasActiveFilter && filtered.length === 0

  const resetFilters = () => {
    setQuery('')
    setStatus('all')
  }

  return (
    <section aria-label="Kundenliste">
      <h1>Kundenliste</h1>
      <CustomerFilters
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />
      <CustomerTable
        customers={filtered}
        onSelect={(id) => navigate('/customers/' + id)}
      />
      {showEmptyState ? <EmptyState onReset={resetFilters} /> : null}
    </section>
  )
}
