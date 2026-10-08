import type { Customer } from '../../types'

export interface CustomerTableProps {
  customers: Customer[]
  onSelect: (id: string) => void
}

export default function CustomerTable(props: CustomerTableProps) {
  void props
  return null
}
