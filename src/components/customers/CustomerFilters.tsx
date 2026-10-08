import { useRef, type KeyboardEvent } from 'react'
import { customers } from '../../data/customers'
import { filterCustomers } from '../../lib/filterCustomers'
import type { StatusFilter } from '../../types'
import styles from './CustomerFilters.module.css'

export interface CustomerFiltersProps {
  query: string
  status: StatusFilter
  onQueryChange: (query: string) => void
  onStatusChange: (status: StatusFilter) => void
}

interface StatusOption {
  value: StatusFilter
  label: string
}

const statusOptions: StatusOption[] = [
  { value: 'all', label: 'Alle' },
  { value: 'active', label: 'Aktiv' },
  { value: 'inactive', label: 'Inaktiv' },
]

const countFormatter = new Intl.NumberFormat('de-DE')

export default function CustomerFilters({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: CustomerFiltersProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const segmentRefs = useRef<Array<HTMLButtonElement | null>>([])

  const visibleCount = filterCustomers(customers, query, status).length
  const total = customers.length
  const summary =
    visibleCount === total
      ? `${countFormatter.format(total)} Kunden`
      : `${countFormatter.format(visibleCount)} von ${countFormatter.format(total)} Kunden`

  const isNeutral = query.trim() === '' && status === 'all'

  const reset = () => {
    onQueryChange('')
    onStatusChange('all')
    inputRef.current?.focus()
  }

  const handleSegmentKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    const backward = event.key === 'ArrowLeft' || event.key === 'ArrowUp'
    if (!forward && !backward) {
      return
    }
    event.preventDefault()
    const nextIndex =
      (index + (forward ? 1 : -1) + statusOptions.length) % statusOptions.length
    onStatusChange(statusOptions[nextIndex].value)
    segmentRefs.current[nextIndex]?.focus()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar} role="search">
        <div className={styles.searchWrap}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Kunden suchen…"
            aria-label="Kunden suchen"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>

        <div
          className={styles.segmented}
          role="radiogroup"
          aria-label="Statusfilter"
        >
          {statusOptions.map((option, index) => {
            const checked = status === option.value
            return (
              <button
                key={option.value}
                ref={(node) => {
                  segmentRefs.current[index] = node
                }}
                type="button"
                role="radio"
                aria-checked={checked}
                className={
                  checked
                    ? `${styles.segment} ${styles.segmentActive}`
                    : styles.segment
                }
                onClick={() => onStatusChange(option.value)}
                onKeyDown={(event) => handleSegmentKeyDown(event, index)}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          className={styles.reset}
          onClick={reset}
          disabled={isNeutral}
        >
          Filter zurücksetzen
        </button>
      </div>

      <div className={styles.summary}>{summary}</div>
    </div>
  )
}
