import { motion, useReducedMotion } from 'motion/react'
import './overprint.css'

const EASE = [0.65, 0, 0.35, 1]
const SHOWN = 'inset(0 0% 0 0%)'

// Display type printed in two passes: blue first, then pink laid over it,
// slightly out of register. Each pass wipes in like an ink roller when the
// heading scrolls into view. The in-view trigger lives on the heading itself:
// the layers start fully clipped, and a clipped element never reads as visible.
export default function Overprint({ as = 'h2', children, className = '', delay = 0, settle = 5, id }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const label = typeof children === 'string' ? children : undefined
  const rest = { x: settle, y: -settle / 2 }

  const blue = {
    hidden: { clipPath: 'inset(0 100% 0 0%)' },
    shown: { clipPath: SHOWN, transition: { duration: 0.9, ease: EASE, delay } },
  }
  const pink = {
    hidden: { clipPath: 'inset(0 0% 0 100%)', x: 18, y: -6 },
    shown: { clipPath: SHOWN, ...rest, transition: { duration: 0.9, ease: EASE, delay: delay + 0.22 } },
  }

  return (
    <Tag
      className={`op ${className}`}
      aria-label={label}
      id={id}
      initial={reduce ? 'shown' : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.span className="op__layer op__blue" aria-hidden="true" variants={blue}>
        {children}
      </motion.span>
      <motion.span className="op__layer op__pink" aria-hidden="true" variants={pink}>
        {children}
      </motion.span>
    </Tag>
  )
}
