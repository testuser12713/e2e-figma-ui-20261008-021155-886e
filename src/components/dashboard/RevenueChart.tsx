import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { revenueSeries } from '../../data/revenue'
import { formatCurrency } from '../../lib/format'
import styles from './RevenueChart.module.css'

const monthFormatter = new Intl.DateTimeFormat('de-DE', {
  month: 'short',
  year: 'numeric',
})

function formatMonth(month: string): string {
  const [year, monthIndex] = month.split('-').map(Number)
  const date = new Date(year, monthIndex - 1, 1)
  return monthFormatter.format(date).replace('.', '')
}

export default function RevenueChart() {
  return (
    <section className={styles.card} aria-label="Umsatzverlauf">
      <div className={styles.head}>
        <h2 className={styles.title} id="revenue-chart-title">
          Umsatzverlauf
        </h2>
        <span className={styles.subtitle}>
          Umsatz pro Monat, letzte {revenueSeries.length} Monate
        </span>
      </div>
      <div
        className={styles.chartWrap}
        role="img"
        aria-labelledby="revenue-chart-title"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueSeries}
            margin={{ top: 16, right: 16, bottom: 8, left: 8 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickFormatter={formatMonth} tickLine={false} />
            <YAxis
              tickFormatter={(value) => formatCurrency(Number(value))}
              width={96}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              labelFormatter={(label) => formatMonth(String(label))}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Umsatz"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
