import type { Customer, StatusFilter } from '../types'

export function filterCustomers(
  customers: Customer[],
  query: string,
  status: StatusFilter,
): Customer[] {
  void query
  void status
  return customers
}
