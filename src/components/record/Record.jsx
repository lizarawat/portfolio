import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { achievements, education, training } from '../../data/record.js'
import { profile } from '../../data/profile.js'
import { credentials } from '../../data/credentials.js'
import Overprint from '../ui/Overprint.jsx'
import './record.css'

// Barcode widths derived from the name, so it is stable and not random noise.
const BARS = [...`${profile.name}${profile.email}`].map((ch, i) => 1 + ((ch.charCodeAt(0) * (i + 3)) % 4))

// The receipt is sticky, so progress is measured against the whole section.
function Receipt({ section }) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start 75%', 'center 45%'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const clip = useTransform(p, (v) => `inset(0 0 ${Math.max(0, 100 - v * 115)}% 0)`)
  const y = useTransform(p, [0, 1], [-40, 0])

  return (
    <div className="rc">
      <div className="rc__slot" aria-hidden="true" />
      <motion.div className="rc__paper" style={reduce ? undefined : { clipPath: clip, y }}>
        <div className="rc__top mono">
          <strong>{profile.name.toUpperCase()}</strong>
          <span>Achievements log</span>
          <span>{profile.location}</span>
        </div>
        <div className="rc__rule" aria-hidden="true" />
        <ul className="rc__items">
          {achievements.map((a) => (
            <li key={a.what}>
              <div className="rc__line">
                <span className="rc__what">{a.what}</span>
                <span className="rc__when mono">{a.when}</span>
              </div>
              <span className="rc__where mono">{a.where}</span>
            </li>
          ))}
        </ul>
        <div className="rc__rule" aria-hidden="true" />
        <div className="rc__total mono">
          <span>Problems solved</span>
          <strong>400+</strong>
        </div>
        <div className="rc__total mono">
          <span>Certificates held</span>
          <strong>{credentials.length}</strong>
        </div>
        <div className="rc__rule" aria-hidden="true" />
        <div className="rc__bars" aria-hidden="true">
          {BARS.map((w, i) => (
            <i key={i} style={{ width: w * 1.6, marginRight: ((w + i) % 3) + 1 }} />
          ))}
        </div>
        <p className="rc__foot mono">Still printing. More to come.</p>
      </motion.div>
    </div>
  )
}

export default function Record() {
  const section = useRef(null)
  return (
    <section className="rec" id="record" aria-labelledby="record-title" ref={section}>
      <div className="rec__grid wrap">
        <div className="rec__left">
          <Overprint id="record-title">The record</Overprint>

          <ol className="edu">
            {education.map((e, i) => (
              <motion.li
                key={e.school}
                className="edu__card"
                initial={{ opacity: 0, x: -30, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: i % 2 ? 0.6 : -0.6 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <div className="edu__score">
                  <span className="edu__num">{e.score}</span>
                  <span className="edu__unit mono">{e.unit}</span>
                </div>
                <div className="edu__body">
                  <h3 className="edu__school">{e.school}</h3>
                  <p className="edu__what">{e.what}</p>
                  <p className="edu__when mono">
                    {e.when}, {e.where}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          <motion.div
            className="train"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="train__head">
              <h3>{training.title}</h3>
              <span className="mono">
                {training.where}, {training.when}
              </span>
            </div>
            <ul>
              {training.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Receipt section={section} />
      </div>
    </section>
  )
}
