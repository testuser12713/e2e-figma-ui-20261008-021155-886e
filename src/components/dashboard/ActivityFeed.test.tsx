import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ActivityFeed from './ActivityFeed'
import { activities } from '../../data/activities'
import { formatDate } from '../../lib/format'

function renderFeed() {
  return render(
    <MemoryRouter>
      <ActivityFeed />
    </MemoryRouter>,
  )
}

describe('ActivityFeed', () => {
  it('lists at least five activities, each with date, customer and text', () => {
    renderFeed()

    expect(activities.length).toBeGreaterThanOrEqual(5)
    const rows = screen.getAllByRole('listitem')
    expect(rows.length).toBeGreaterThanOrEqual(5)

    for (const activity of activities) {
      expect(screen.getByText(activity.customerName)).toBeInTheDocument()
      expect(screen.getByText(activity.text)).toBeInTheDocument()
      expect(screen.getByText(formatDate(activity.date))).toBeInTheDocument()
    }
  })

  it('renders the entries newest first', () => {
    renderFeed()

    const expectedNames = [...activities]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((a) => a.customerName)

    const actualNames = screen
      .getAllByRole('listitem')
      .map((row) => expectedNames.find((name) => row.textContent?.includes(name)))

    expect(actualNames).toEqual(expectedNames)
  })

  it('links each entry to the matching customer detail route', () => {
    renderFeed()

    for (const activity of activities) {
      expect(
        screen.getByRole('link', { name: new RegExp(activity.customerName) }),
      ).toHaveAttribute('href', `/customers/${activity.customerId}`)
    }
  })
})
