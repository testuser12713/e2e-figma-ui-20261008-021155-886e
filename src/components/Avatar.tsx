import styles from './Avatar.module.css'

export type AvatarSize = 'table' | 'header'

export interface AvatarProps {
  name: string
  size?: AvatarSize
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return '?'
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function paletteIndex(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 6
  }
  return Math.abs(hash)
}

export default function Avatar({ name, size = 'table' }: AvatarProps) {
  const index = paletteIndex(name) + 1
  const className = `${styles.avatar} ${
    size === 'header' ? styles.header : styles.table
  }`
  const style = { background: `var(--avatar-bg-${index})` }

  if (size === 'header') {
    return (
      <span
        className={className}
        style={style}
        role="img"
        aria-label={`Avatar von ${name}`}
      >
        <span aria-hidden="true">{initials(name)}</span>
      </span>
    )
  }

  return (
    <span className={className} style={style} aria-hidden="true">
      {initials(name)}
    </span>
  )
}
