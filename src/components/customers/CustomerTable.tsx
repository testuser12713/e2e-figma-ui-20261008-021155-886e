import type { KeyboardEvent } from 'react'
import type { Customer } from '../../types'
import { formatCurrency } from '../../lib/format'
import Avatar from '../Avatar'
import StatusBadge from '../StatusBadge'
import styles from './CustomerTable.module.css'

export interface CustomerTableProps {
  customers: Customer[]
  onSelect: (id: string) => void
}

export default function CustomerTable({ customers, onSelect }: CustomerTableProps) {
  const handleKeyDown =
    (customer: Customer) => (event: KeyboardEvent<HTMLTableRowElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect(customer.id)
      }
    }

  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Firma</th>
            <th scope="col" className={styles.colCity}>
              Ort
            </th>
            <th scope="col" className={styles.numeric}>
              Umsatz
            </th>
            <th scope="col" className={styles.right}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className={styles.row}
              tabIndex={0}
              role="link"
              aria-label={`${customer.name}, ${customer.company} öffnen`}
              onClick={() => onSelect(customer.id)}
              onKeyDown={handleKeyDown(customer)}
            >
              <td>
                <div className={styles.cellName}>
                  <Avatar name={customer.name} />
                  <div className={styles.nameWrap}>
                    <div className={styles.name}>{customer.name}</div>
                    <div className={styles.clientId}>{customer.id}</div>
                  </div>
                </div>
              </td>
              <td className={styles.muted}>{customer.company}</td>
              <td className={`${styles.muted} ${styles.colCity}`}>{customer.city}</td>
              <td className={styles.numeric}>{formatCurrency(customer.revenue)}</td>
              <td className={styles.right}>
                <StatusBadge status={customer.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
