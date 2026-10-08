import { customers } from '../../data/customers'
import { orders } from '../../data/orders'
import { formatCurrency } from '../../lib/format'
import styles from './KpiTiles.module.css'

type DeltaTone = 'success' | 'danger'

interface KpiTile {
  label: string
  value: string
  delta: string
  deltaTone: DeltaTone
}

export default function KpiTiles() {
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.revenue, 0)
  const openOrders = orders.filter((order) => order.status === 'open').length
  const activeCustomers = customers.filter((customer) => customer.status === 'active').length
  const averageOrderValue =
    orders.length > 0
      ? orders.reduce((sum, order) => sum + order.amount, 0) / orders.length
      : 0

  const tiles: KpiTile[] = [
    {
      label: 'Gesamtumsatz',
      value: formatCurrency(totalRevenue),
      delta: '▲ +12,4\u00a0%',
      deltaTone: 'success',
    },
    {
      label: 'Offene Aufträge',
      value: String(openOrders),
      delta: '▲ +2',
      deltaTone: 'success',
    },
    {
      label: 'Aktive Kunden',
      value: String(activeCustomers),
      delta: '▲ +1',
      deltaTone: 'success',
    },
    {
      label: 'Ø Auftragswert',
      value: formatCurrency(averageOrderValue),
      delta: '▼ −1,2\u00a0%',
      deltaTone: 'danger',
    },
  ]

  return (
    <section className={styles.grid} aria-label="Kennzahlen">
      {tiles.map((tile) => (
        <article key={tile.label} className={styles.tile}>
          <div className={styles.label}>{tile.label}</div>
          <div className={styles.value}>{tile.value}</div>
          <div
            className={
              tile.deltaTone === 'danger'
                ? `${styles.delta} ${styles.deltaDanger}`
                : `${styles.delta} ${styles.deltaSuccess}`
            }
          >
            {tile.delta}
          </div>
        </article>
      ))}
    </section>
  )
}
