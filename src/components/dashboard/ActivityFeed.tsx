import { Link } from 'react-router-dom'
import { activities } from '../../data/activities'
import { formatDate } from '../../lib/format'
import styles from './ActivityFeed.module.css'

export default function ActivityFeed() {
  const entries = [...activities].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section className={styles.section} aria-label="Letzte Aktivitäten">
      <div className={styles.head}>
        <h2 className={styles.title}>Letzte Aktivitäten</h2>
        <Link className={styles.link} to="/customers">
          Alle Kunden ansehen →
        </Link>
      </div>
      <div className={styles.card}>
        {entries.length === 0 ? (
          <p className={styles.empty}>Keine Aktivitäten vorhanden.</p>
        ) : (
          <ul className={styles.list}>
            {entries.map((activity) => (
              <li key={activity.id}>
                <Link
                  className={styles.row}
                  to={`/customers/${activity.customerId}`}
                >
                  <span className={`${styles.date} numeric`}>
                    {formatDate(activity.date)}
                  </span>
                  <span className={styles.name}>{activity.customerName}</span>
                  <span className={styles.text} title={activity.text}>
                    {activity.text}
                  </span>
                  <span className={styles.chevron} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
