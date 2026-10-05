import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react'
import { profile } from '../../data/profile.js'
import HalftonePortrait from './HalftonePortrait.jsx'
import './hero.css'

const EASE = [0.65, 0, 0.35, 1]
const LINES = [profile.first, profile.last]

// One line of the name, per-letter so the hovered glyph can stretch along
// the font's width axis. Both ink layers read the same `hot` index.
function NameLine({ word, line, hot, setHot }) {
  return (
    <span className="name__line">
      {[...word].map((ch, i) => {
        const id = `${line}-${i}`
        const d = hot && hot[0] === line ? Math.abs(hot[1] - i) : 9
        const stretch = d === 0 ? 100 : d === 1 ? 88 : 76
        return (
          <span
            key={id}
            className="name__ch"
            style={{ fontStretch: `${stretch}%` }}
            onPointerEnter={setHot ? () => setHot([line, i]) : undefined}
          >
            {ch}
          </span>
        )
      })}
    </span>
  )
}

function Name() {
  const reduce = useReducedMotion()
  const [hot, setHot] = useState(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18 })
  const sy = useSpring(my, { stiffness: 120, damping: 18 })
  const px = useTransform(sx, (v) => 7 + v * 14)
  const py = useTransform(sy, (v) => -4 + v * 9)

  useEffect(() => {
    if (reduce) return undefined
    const on = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', on, { passive: true })
    return () => window.removeEventListener('pointermove', on)
  }, [reduce, mx, my])

  const lines = (interactive) =>
    LINES.map((w, l) => <NameLine key={w} word={w} line={l} hot={hot} setHot={interactive ? setHot : null} />)

  return (
    <h1 className="name" aria-label={profile.name} onPointerLeave={() => setHot(null)}>
      <motion.span
        className="name__layer name__blue"
        aria-hidden="true"
        initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      >
        {lines(true)}
      </motion.span>
      <motion.span
        className="name__layer name__pink"
        aria-hidden="true"
        style={{ x: px, y: py }}
        initial={reduce ? false : { clipPath: 'inset(0 0 0 100%)' }}
        animate={{ clipPath: 'inset(0 0 0 0%)' }}
        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
      >
        {lines(false)}
      </motion.span>
    </h1>
  )
}

const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid wrap">
        <div className="hero__copy">
          <motion.div className="hero__status-badge" {...rise(0.02)}>
            <span className="hero__status-dot" />
            <span className="mono">{profile.status}</span>
          </motion.div>

          <motion.p className="hero__eyebrow mono" {...rise(0.08)}>
            {profile.role}
          </motion.p>
          <Name />
          <motion.p className="hero__lede" {...rise(0.95)}>
            {profile.lede}
          </motion.p>
          <motion.div className="hero__ctas" {...rise(1.08)}>
            <a className="btn btn--glow" href="#work">
              See the work <ArrowDown size={16} weight="bold" />
            </a>
            <a className="btn btn--ghost" href="#contact">
              Say hello <ArrowUpRight size={16} weight="bold" />
            </a>
          </motion.div>
        </div>

        <motion.figure
          className="portrait"
          initial={{ opacity: 0, rotate: -3, y: 30 }}
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="portrait__sheet">
            <span className="crop crop--tl" aria-hidden="true" />
            <span className="crop crop--tr" aria-hidden="true" />
            <span className="crop crop--bl" aria-hidden="true" />
            <span className="crop crop--br" aria-hidden="true" />
            <div className="portrait__window">
              <HalftonePortrait
                photo={profile.photo}
                initials={profile.initials}
                label={profile.photo ? `Halftone portrait of ${profile.name}` : `${profile.name} monogram, printed as a halftone`}
              />
            </div>
            <div className="portrait__bar" aria-hidden="true">
              <i style={{ '--c': 'var(--blue)' }} />
              <i style={{ '--c': 'var(--blue)', opacity: 0.55 }} />
              <i style={{ '--c': 'var(--blue)', opacity: 0.25 }} />
              <i style={{ '--c': 'var(--pink)' }} />
              <i style={{ '--c': 'var(--pink)', opacity: 0.55 }} />
              <i style={{ '--c': 'var(--pink)', opacity: 0.25 }} />
              <i className="portrait__over" />
            </div>
          </div>
          <motion.span
            className="portrait__stamp"
            initial={{ scale: 1.6, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 1.5 }}
          >
            {profile.status}
          </motion.span>
          <figcaption className="portrait__hint mono">Hover the print to inspect the dots</figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
