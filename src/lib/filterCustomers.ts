import type { Customer, StatusFilter } from '../types'

export function filterCustomers(
  customers: Customer[],
  query: string,
  status: StatusFilter,
): Customer[] {
  const needle = query.trim().toLowerCase()

  return customers.filter((customer) => {
    const matchesStatus = status === 'all' || customer.status === status
    if (!matchesStatus) {
      return false
    }

    if (needle === '') {
      return true
    }

    return (
      customer.name.toLowerCase().includes(needle) ||
      customer.company.toLowerCase().includes(needle) ||
      customer.city.toLowerCase().includes(needle)
    )
  })
}
