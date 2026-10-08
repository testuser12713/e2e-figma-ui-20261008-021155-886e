import type { Customer } from '../../types'
import { orders } from '../../data/orders'
import { formatCurrency, formatDate } from '../../lib/format'
import styles from './OverviewTab.module.css'

export interface OverviewTabProps {
  customer: Customer
}

export default function OverviewTab({ customer }: OverviewTabProps) {
  const customerOrders = orders.filter((order) => order.customerId === customer.id)
  const billableOrders = customerOrders.filter((order) => order.status !== 'cancelled')
  const totalRevenue = billableOrders.reduce((sum, order) => sum + order.amount, 0)
  const averageOrderValue = billableOrders.length > 0 ? totalRevenue / billableOrders.length : 0
  const openOrders = customerOrders.filter((order) => order.status === 'open').length

  const masterData = [
    { label: 'Firma', value: customer.company },
    { label: 'Ansprechpartner', value: customer.name },
    { label: 'E-Mail', value: customer.email },
    { label: 'Telefon', value: customer.phone },
    { label: 'Stadt', value: customer.city },
    { label: 'Kunde seit', value: formatDate(customer.since) },
  ]

  const keyFigures = [
    { label: 'Gesamtumsatz', value: formatCurrency(totalRevenue) },
    { label: 'Anzahl Aufträge', value: String(customerOrders.length) },
    { label: 'Ø Auftragswert', value: formatCurrency(averageOrderValue) },
    { label: 'Offene Aufträge', value: String(openOrders) },
  ]

  return (
    <div className={styles.grid}>
      <section className={`${styles.card} ${styles.cardPad}`}>
        <h3 className={styles.sectionTitle}>Stammdaten</h3>
        <dl className={styles.kv}>
          {masterData.map((row) => (
            <div className={styles.kvRow} key={row.label}>
              <dt className={styles.kvTerm}>{row.label}</dt>
              <dd className={styles.kvDescription}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${styles.card} ${styles.cardPad}`}>
        <h3 className={styles.sectionTitle}>Kennzahlen</h3>
        <div className={styles.miniStats}>
          {keyFigures.map((figure) => (
            <div className={styles.miniStat} key={figure.label}>
              <div className={styles.miniStatLabel}>{figure.label}</div>
              <div className={styles.miniStatValue}>{figure.value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
