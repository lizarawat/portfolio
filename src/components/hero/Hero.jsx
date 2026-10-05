import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Sparkle } from '@phosphor-icons/react'
import { profile } from '../../data/profile.js'
import DeveloperTerminal from './DeveloperTerminal.jsx'
import './hero.css'

const rise = (delay) => ({
  initial: { opacity: 0, y: 22 },
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
            <span className="mono">{profile.status} • 0 NullPointers in Prod</span>
          </motion.div>

          <motion.p className="hero__eyebrow mono" {...rise(0.08)}>
            <Sparkle size={14} weight="fill" className="hero__sparkle-icon" />
            {profile.role}
          </motion.p>

          <motion.h1 className="hero__name" {...rise(0.18)}>
            <span className="hero__name-line">{profile.first}</span>
            <span className="hero__name-line hero__name-accent">{profile.last}</span>
          </motion.h1>

          <motion.p className="hero__lede" {...rise(0.35)}>
            {profile.lede}
          </motion.p>

          <motion.div className="hero__ctas" {...rise(0.48)}>
            <a className="btn btn--glow" href="#work">
              See the work <ArrowDown size={16} weight="bold" />
            </a>
            <a className="btn btn--ghost" href="#contact">
              Say hello <ArrowUpRight size={16} weight="bold" />
            </a>
          </motion.div>
        </div>

        <div className="hero__terminal-wrap">
          <DeveloperTerminal />
        </div>
      </div>
    </section>
  )
}
