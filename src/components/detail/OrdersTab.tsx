import type { Customer, OrderStatus } from '../../types'
import { orders } from '../../data/orders'
import { formatCurrency, formatDate } from '../../lib/format'
import styles from './OrdersTab.module.css'

export interface OrdersTabProps {
  customer: Customer
}

const statusLabels: Record<OrderStatus, string> = {
  open: 'Offen',
  completed: 'Abgeschlossen',
  cancelled: 'Storniert',
}

const statusStyles: Record<OrderStatus, string> = {
  open: styles.open,
  completed: styles.completed,
  cancelled: styles.cancelled,
}

export default function OrdersTab({ customer }: OrdersTabProps) {
  const customerOrders = orders
    .filter((order) => order.customerId === customer.id)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  if (customerOrders.length === 0) {
    return (
      <section className={styles.card}>
        <p className={styles.empty}>Für diesen Kunden sind noch keine Aufträge vorhanden.</p>
      </section>
    )
  }

  return (
    <section className={styles.card}>
      <table className={styles.table}>
        <caption className="visually-hidden">Aufträge von {customer.name}</caption>
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Beschreibung</th>
            <th scope="col" className={styles.alignRight}>
              Betrag
            </th>
            <th scope="col" className={styles.alignRight}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {customerOrders.map((order) => (
            <tr key={order.id}>
              <td className={styles.date}>{formatDate(order.date)}</td>
              <td className={styles.description} title={order.description}>
                {order.description}
              </td>
              <td className={`${styles.amount} ${styles.alignRight}`}>
                {formatCurrency(order.amount)}
              </td>
              <td className={styles.alignRight}>
                <span className={`${styles.badge} ${statusStyles[order.status]}`}>
                  <span className="visually-hidden">Status: </span>
                  {statusLabels[order.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
