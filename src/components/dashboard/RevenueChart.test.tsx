import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import RevenueChart from './RevenueChart'

class ResizeObserverMock {
  cb: ResizeObserverCallback
  constructor(cb: ResizeObserverCallback) {
    this.cb = cb
  }
  observe(target: Element) {
    this.cb(
      [
        { contentRect: { width: 640, height: 320 }, target } as ResizeObserverEntry,
      ],
      this as unknown as ResizeObserver,
    )
  }
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

describe('RevenueChart', () => {
  it('renders the revenue chart card with its accessible title', () => {
    render(<RevenueChart />)

    expect(
      screen.getByRole('heading', { name: 'Umsatzverlauf' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Umsatzverlauf' }),
    ).toBeInTheDocument()
  })

  it('labels both axes: months (de-DE) and currency ticks', () => {
    render(<RevenueChart />)

    expect(screen.getByText('Okt 2026')).toBeInTheDocument()
    expect(screen.getAllByText(/€/).length).toBeGreaterThan(0)
  })
})
