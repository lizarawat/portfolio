import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { ticker } from '../../data/profile.js'
import './ticker.css'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

// A stock-tape of her toolkit, a nod to TradeCraft. Scrolling faster pushes
// the tape faster, and scrolling up runs it backwards.
export default function Ticker() {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(vel, [-2000, 0, 2000], [-4, 0, 4], { clamp: false })
  const dir = useRef(1)
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const b = boost.get()
    if (b < -0.05) dir.current = -1
    else if (b > 0.05) dir.current = 1
    base.set(base.get() - dir.current * (delta / 1000) * (1.6 + Math.abs(b)))
  })

  const run = [...ticker, ...ticker]
  return (
    <div className="ticker" aria-label={`Toolkit: ${ticker.join(', ')}`}>
      <motion.div className="ticker__track" style={{ x }} aria-hidden="true">
        {run.map((t, i) => (
          <span key={`${t}-${i}`} className="ticker__item">
            {t}
            <b className={i % 3 === 0 ? 'up' : i % 3 === 1 ? 'flat' : 'up2'}>{i % 3 === 1 ? '●' : '▲'}</b>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
