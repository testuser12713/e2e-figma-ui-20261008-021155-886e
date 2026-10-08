import KpiTiles from '../components/dashboard/KpiTiles'
import RevenueChart from '../components/dashboard/RevenueChart'
import ActivityFeed from '../components/dashboard/ActivityFeed'

export default function Dashboard() {
  return (
    <section aria-label="Dashboard">
      <KpiTiles />
      <RevenueChart />
      <ActivityFeed />
    </section>
  )
}
