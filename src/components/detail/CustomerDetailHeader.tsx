import type { Customer } from '../../types'
import Avatar from '../Avatar'
import StatusBadge from '../StatusBadge'
import styles from './CustomerDetailHeader.module.css'

export interface CustomerDetailHeaderProps {
  customer: Customer
}

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={styles.contactIcon}
    >
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2 4l6 5 6-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={styles.contactIcon}
    >
      <path
        d="M3.5 2.5l2 1.5L6 6l-1.5 1.5a9 9 0 006 6L12 12l2 .5 1.5 2-1 1a1.5 1.5 0 01-1.6.3A13 13 0 012.8 5.1a1.5 1.5 0 01.3-1.6l1-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={styles.contactIcon}
    >
      <path d="M8 14.5S3 10.5 3 7a5 5 0 0110 0c0 3.5-5 7.5-5 7.5z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="7" r="1.75" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function CustomerDetailHeader({ customer }: CustomerDetailHeaderProps) {
  return (
    <section className={styles.header} aria-label="Kundenkopf">
      <Avatar name={customer.name} />
      <div className={styles.identity}>
        <h2 className={styles.name}>{customer.name}</h2>
        <p className={styles.company}>{customer.company}</p>
        <div className={styles.contact}>
          <span className={styles.contactItem}>
            <MailIcon />
            {customer.email}
          </span>
          <span className={styles.contactItem}>
            <PhoneIcon />
            {customer.phone}
          </span>
          <span className={styles.contactItem}>
            <PinIcon />
            {customer.city}
          </span>
        </div>
      </div>
      <StatusBadge status={customer.status} />
    </section>
  )
}
