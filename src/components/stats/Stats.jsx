import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { stats } from '../../data/profile.js'
import './stats.css'

function Count({ value, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return undefined
    const c = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setShown })
    return () => c.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref} className="stat__num">
      <span className="stat__affix">{prefix}</span>
      {shown.toFixed(decimals)}
      <span className="stat__affix">{suffix}</span>
    </span>
  )
}

export default function Stats() {
  return (
    <section className="stats" aria-label="In numbers">
      <div className="stats__flood">
        <ul className="stats__row wrap">
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              className="stat"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <Count {...s} />
              <span className="stat__label">{s.label}</span>
              <span className="stat__note mono">{s.note}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
