import { customers } from '../../data/customers'
import { orders } from '../../data/orders'
import { formatCurrency } from '../../lib/format'
import styles from './KpiTiles.module.css'

export default function KpiTiles() {
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.revenue, 0)
  const openOrders = orders.filter((order) => order.status === 'open').length
  const activeCustomers = customers.filter((customer) => customer.status === 'active').length
  const averageOrderValue =
    orders.length > 0
      ? orders.reduce((sum, order) => sum + order.amount, 0) / orders.length
      : 0

  const tiles = [
    { label: 'Gesamtumsatz', value: formatCurrency(totalRevenue) },
    { label: 'Offene Aufträge', value: String(openOrders) },
    { label: 'Aktive Kunden', value: String(activeCustomers) },
    { label: 'Durchschnittlicher Auftragswert', value: formatCurrency(averageOrderValue) },
  ]

  return (
    <section className={styles.grid} aria-label="Kennzahlen">
      {tiles.map((tile) => (
        <article key={tile.label} className={styles.tile}>
          <div className={styles.label}>{tile.label}</div>
          <div className={styles.value}>{tile.value}</div>
        </article>
      ))}
    </section>
  )
}
