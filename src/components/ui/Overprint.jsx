import { motion } from 'motion/react'
import './overprint.css'

export default function Overprint({ as = 'h2', children, className = '', delay = 0, id }) {
  const Tag = motion[as]
  const label = typeof children === 'string' ? children : undefined

  return (
    <Tag
      className={`op-heading ${className}`}
      aria-label={label}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <span className="op-heading__text">{children}</span>
    </Tag>
  )
}
