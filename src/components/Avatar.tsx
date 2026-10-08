import styles from './Avatar.module.css'

interface AvatarProps {
  name: string
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

export default function Avatar({ name }: AvatarProps) {
  const index = paletteIndex(name) + 1
  return (
    <span
      className={styles.avatar}
      style={{ background: `var(--avatar-bg-${index})` }}
      role="img"
      aria-label={`Avatar von ${name}`}
    >
      <span aria-hidden="true">{initials(name)}</span>
    </span>
  )
}
