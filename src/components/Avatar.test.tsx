import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Avatar from './Avatar'
import CustomerDetailHeader from './detail/CustomerDetailHeader'
import { customers } from '../data/customers'
import styles from './Avatar.module.css'
import cssSource from './Avatar.module.css?raw'

describe('Avatar', () => {
  it('renders the default 32px round table variant and is decorative', () => {
    render(<Avatar name="Anna Beispiel" />)

    const avatar = screen.getByText('AB')
    expect(avatar).toHaveClass(styles.avatar)
    expect(avatar).toHaveClass(styles.table)
    expect(avatar).not.toHaveClass(styles.header)

    // Table rows already show the name, so the avatar is decorative.
    expect(avatar).toHaveAttribute('aria-hidden', 'true')
    expect(avatar).not.toHaveAttribute('role')
    expect(avatar).not.toHaveAttribute('aria-label')
  })

  it('renders the large 56px header variant with its accessible name', () => {
    render(<Avatar name="Anna Beispiel" size="header" />)

    const avatar = screen.getByRole('img', { name: 'Avatar von Anna Beispiel' })
    expect(avatar).toHaveClass(styles.avatar)
    expect(avatar).toHaveClass(styles.header)
    expect(avatar).not.toHaveClass(styles.table)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('styles the table variant as a 32px circle and the header as a 56px card', () => {
    expect(cssSource).toMatch(/\.table\s*\{[^}]*width:\s*32px/s)
    expect(cssSource).toMatch(/\.table\s*\{[^}]*height:\s*32px/s)
    expect(cssSource).toMatch(
      /\.table\s*\{[^}]*border-radius:\s*var\(--radius-pill\)/s,
    )

    expect(cssSource).toMatch(/\.header\s*\{[^}]*width:\s*56px/s)
    expect(cssSource).toMatch(/\.header\s*\{[^}]*height:\s*56px/s)
    expect(cssSource).toMatch(
      /\.header\s*\{[^}]*border-radius:\s*var\(--radius-lg\)/s,
    )
  })

  it('renders the large header variant in the customer detail header', () => {
    const customer = customers[0]
    render(<CustomerDetailHeader customer={customer} />)

    const avatar = screen.getByRole('img', { name: `Avatar von ${customer.name}` })
    expect(avatar).toHaveClass(styles.header)
    expect(avatar).not.toHaveClass(styles.table)
  })
})
