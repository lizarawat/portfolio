import { useState } from 'react'
import { motion } from 'motion/react'
import { ChartBar, ChartScatter, Crosshair, FunnelSimple } from '@phosphor-icons/react'
import BrandMark from '../ui/BrandMark.jsx'
import { typeCase } from '../../data/skills.js'
import Overprint from '../ui/Overprint.jsx'
import './typecase.css'

const DEPTH = ['', 'Getting started', 'Working knowledge', 'Daily driver']
const GLYPHS = { ChartBar, ChartScatter, Crosshair, FunnelSimple }

// Faint logo watermark tucked into the compartment's lower-right corner.
function Watermark({ marks, glyph }) {
  if (marks?.length) {
    return (
      <span className={`tc__wm tc__wm--${marks.length}`} aria-hidden="true">
        {marks.map((m) => (
          <BrandMark key={m} name={m} className="tc__logo" />
        ))}
      </span>
    )
  }
  const Glyph = GLYPHS[glyph]
  if (!Glyph) return null
  return (
    <span className="tc__wm tc__wm--1" aria-hidden="true">
      <Glyph className="tc__logo" weight="fill" />
    </span>
  )
}
const cells = typeCase.flatMap((d) => d.items.map((it) => ({ ...it, drawer: d.drawer, ink: d.ink })))

export default function TypeCase() {
  const [focus, setFocus] = useState(null)

  return (
    <section className="tc" id="toolkit" aria-labelledby="toolkit-title">
      <div className="wrap">
        <div className="tc__head">
          <Overprint id="toolkit-title">Toolkit</Overprint>
          <p className="tc__intro">
            Sorted like a printer’s type case. Denser ink means more hours spent with the tool.
          </p>
          <div className="tc__drawers" role="group" aria-label="Highlight a drawer">
            {typeCase.map((d) => (
              <button
                key={d.drawer}
                type="button"
                className={`tc__drawer tc__drawer--${d.ink}`}
                aria-pressed={focus === d.drawer}
                onClick={() => setFocus((f) => (f === d.drawer ? null : d.drawer))}
              >
                <i aria-hidden="true" /> {d.drawer}
              </button>
            ))}
          </div>
        </div>

        <div className="tc__tray">
          {cells.map((c, i) => {
            const dim = focus && focus !== c.drawer
            return (
              <motion.div
                key={c.name}
                className={`tc__cell tc__cell--${c.size} tc__cell--${c.ink} d${c.depth} ${dim ? 'is-dim' : ''}`}
                initial={{ opacity: 0, y: -24, rotate: (i % 5) - 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20, delay: (i % 8) * 0.04 }}
                tabIndex={0}
                aria-label={`${c.name}${c.note ? ` (${c.note})` : ''}: ${DEPTH[c.depth]}`}
              >
                <Watermark marks={c.marks} glyph={c.glyph} />
                <span className="tc__sort">
                  <span className="tc__name">{c.name}</span>
                  {c.note && <span className="tc__note mono">{c.note}</span>}
                </span>
                <span className="tc__depth mono" aria-hidden="true">{DEPTH[c.depth]}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
