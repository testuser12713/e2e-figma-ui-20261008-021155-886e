import type { CustomerStatus } from '../types'
import styles from './StatusBadge.module.css'

interface StatusBadgeProps {
  status: CustomerStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const label = status === 'active' ? 'Aktiv' : 'Inaktiv'
  const variant = status === 'active' ? styles.active : styles.inactive
  return (
    <span className={`${styles.badge} ${variant}`}>
      <span className="visually-hidden">Status: </span>
      {label}
    </span>
  )
}
