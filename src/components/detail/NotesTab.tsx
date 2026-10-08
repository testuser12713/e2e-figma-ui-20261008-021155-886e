import type { Customer } from '../../types'
import styles from './NotesTab.module.css'

export interface NotesTabProps {
  customer: Customer
}

export default function NotesTab({ customer }: NotesTabProps) {
  void customer
  return (
    <div className={styles.notes}>
      <p>Für diesen Kunden sind noch keine Notizen hinterlegt.</p>
    </div>
  )
}
