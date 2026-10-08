import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { customers } from '../data/customers'
import CustomerDetailHeader from '../components/detail/CustomerDetailHeader'
import OverviewTab from '../components/detail/OverviewTab'
import OrdersTab from '../components/detail/OrdersTab'
import NotesTab from '../components/detail/NotesTab'
import styles from './CustomerDetail.module.css'

type TabId = 'overview' | 'orders' | 'notes'

const tabs: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Übersicht' },
  { id: 'orders', label: 'Aufträge' },
  { id: 'notes', label: 'Notizen' },
]

export default function CustomerDetail() {
  const { customerId } = useParams<{ customerId: string }>()
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  const customer = customers.find((entry) => entry.id === customerId)

  if (!customer) {
    return (
      <section className={styles.screen} aria-label="Kundendetail">
        <div className={styles.notFound}>
          <svg
            className={styles.notFoundIllustration}
            viewBox="0 0 96 96"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="22"
              y="20"
              width="52"
              height="44"
              rx="8"
              style={{ fill: 'var(--color-accent-soft)', stroke: 'var(--color-border)' }}
              strokeWidth="1.5"
            />
            <path
              d="M30 36h28M30 46h20M30 56h14"
              style={{ stroke: 'var(--color-border-strong)' }}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="62"
              cy="66"
              r="9"
              style={{ fill: 'var(--color-accent-soft)', stroke: 'var(--color-accent)' }}
              strokeWidth="1.5"
            />
            <path
              d="M68.5 72.5l7 7"
              style={{ stroke: 'var(--color-accent)' }}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <h1 className={styles.notFoundTitle}>Kunde nicht gefunden</h1>
          <p className={styles.notFoundBody}>
            Unter der angegebenen ID wurde kein Kunde gefunden. Möglicherweise ist der
            Datensatz entfernt oder die Adresse ist ungültig.
          </p>
          <Link className={styles.notFoundLink} to="/customers">
            Zur Kundenliste
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.screen} aria-label="Kundendetail">
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Kundendetail</h1>
          <p className={styles.subtitle}>Alle Informationen zu einem Kunden</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.newOrderButton} disabled>
            Neuer Auftrag
            <span className={styles.comingSoon}>Coming soon</span>
          </button>
        </div>
      </header>

      <Link className={styles.backLink} to="/customers">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Zur Kundenliste
      </Link>

      <CustomerDetailHeader customer={customer} />

      <div className={styles.tabs} role="tablist" aria-label="Kundendetail-Bereiche">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={activeTab === tab.id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id="panel-overview"
        role="tabpanel"
        aria-labelledby="tab-overview"
        hidden={activeTab !== 'overview'}
        className={styles.panel}
      >
        <OverviewTab customer={customer} />
      </div>
      <div
        id="panel-orders"
        role="tabpanel"
        aria-labelledby="tab-orders"
        hidden={activeTab !== 'orders'}
        className={styles.panel}
      >
        <OrdersTab customer={customer} />
      </div>
      <div
        id="panel-notes"
        role="tabpanel"
        aria-labelledby="tab-notes"
        hidden={activeTab !== 'notes'}
        className={styles.panel}
      >
        <NotesTab customer={customer} />
      </div>
    </section>
  )
}
