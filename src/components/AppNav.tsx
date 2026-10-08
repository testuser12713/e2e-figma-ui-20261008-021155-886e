import { NavLink } from 'react-router-dom'
import styles from './AppNav.module.css'

interface NavItem {
  to: string
  label: string
  end: boolean
}

const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/customers', label: 'Kundenliste', end: false },
]

export default function AppNav() {
  return (
    <nav className={styles.nav} aria-label="Hauptnavigation">
      <div className={styles.brand}>Business Handler</div>
      <ul className={styles.list}>
        {navItems.map((item) => (
          <li key={item.to} className={styles.listItem}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
