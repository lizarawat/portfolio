import { MARKS } from '../../data/marks.js'

// Renders a Simple Icons logo by key. Decorative by default.
export default function BrandMark({ name, className = '', title }) {
  const icon = MARKS[name]
  if (!icon) return null
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}
