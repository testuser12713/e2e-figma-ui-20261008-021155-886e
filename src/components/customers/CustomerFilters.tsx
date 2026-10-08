import type { StatusFilter } from '../../types'

export interface CustomerFiltersProps {
  query: string
  status: StatusFilter
  onQueryChange: (query: string) => void
  onStatusChange: (status: StatusFilter) => void
}

export default function CustomerFilters(props: CustomerFiltersProps) {
  void props
  return null
}
