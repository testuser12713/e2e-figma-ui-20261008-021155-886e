import styles from './EmptyState.module.css'

export interface EmptyStateProps {
  onReset: () => void
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <svg
        className={styles.illustration}
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
          fill="var(--color-accent-soft)"
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />
        <path
          d="M30 36h28M30 46h20M30 56h14"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="62"
          cy="66"
          r="9"
          fill="var(--color-accent-soft)"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
        />
        <path
          d="M68.5 72.5l7 7"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <h2 className={styles.title}>Keine Kunden gefunden</h2>
      <p className={styles.body}>
        Ihre Suche und der Statusfilter ergeben zusammen keine Treffer. Setzen
        Sie die Filter zurück, um alle Kunden zu sehen.
      </p>
      <button type="button" className={styles.reset} onClick={onReset}>
        Filter zurücksetzen
      </button>
    </div>
  )
}
