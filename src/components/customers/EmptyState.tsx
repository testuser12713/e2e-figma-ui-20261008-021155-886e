export interface EmptyStateProps {
  onReset: () => void
}

export default function EmptyState(props: EmptyStateProps) {
  void props
  return null
}
