import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { PARTS, score, verdict } from '../../lib/toulmin.js'
import Plate, { PlateButton } from './Plate.jsx'
import './toulmin.css'

const BY_ID = Object.fromEntries(PARTS.map((p) => [p.id, p]))
const START = new Set(['claim', 'data'])

function sentence(active) {
  const has = (id) => active.has(id)
  const out = []
  if (has('qualifier')) out.push(['qualifier', BY_ID.qualifier.text])
  if (has('claim')) out.push(['claim', has('qualifier') ? BY_ID.claim.text.replace(/^C/, 'c') : BY_ID.claim.text])
  if (has('data')) out.push(['data', `Evidence: ${BY_ID.data.text}`])
  if (has('warrant')) out.push(['warrant', `Because ${BY_ID.warrant.text.replace(/^L/, 'l')}`])
  if (has('backing')) out.push(['backing', BY_ID.backing.text])
  if (has('rebuttal')) out.push(['rebuttal', `This holds ${BY_ID.rebuttal.text}`])
  return out
}

// Semicircle gauge; the needle is a spring so score changes feel physical.
function Gauge({ value }) {
  const reduce = useReducedMotion()
  const angle = -90 + (value / 100) * 180
  return (
    <div className="gauge" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} aria-label="Argument score">
      <svg viewBox="0 0 200 116" aria-hidden="true">
        <path d="M14 104 A86 86 0 0 1 186 104" className="gauge__track" />
        <motion.path
          d="M14 104 A86 86 0 0 1 186 104"
          className="gauge__fill"
          initial={false}
          animate={{ pathLength: value / 100 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 16 }}
        />
        {[0, 25, 50, 75, 100].map((t) => {
          const a = Math.PI * (1 - t / 100)
          return (
            <line
              key={t}
              x1={100 + Math.cos(a) * 72}
              y1={104 - Math.sin(a) * 72}
              x2={100 + Math.cos(a) * 64}
              y2={104 - Math.sin(a) * 64}
              className="gauge__tick"
            />
          )
        })}
        <motion.g
          style={{ originX: '100px', originY: '104px' }}
          initial={false}
          animate={{ rotate: angle }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 12 }}
        >
          <line x1="100" y1="104" x2="100" y2="34" className="gauge__needle" />
        </motion.g>
        <circle cx="100" cy="104" r="6" className="gauge__hub" />
      </svg>
      <div className="gauge__num">{value}</div>
      <div className="gauge__verdict mono">{verdict(value)}</div>
    </div>
  )
}

export default function ToulminDemo() {
  const [active, setActive] = useState(START)
  const toggle = (id) =>
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const s = score(active)

  return (
    <Plate title="Toulmin scorer" note="Rubric only, no LLM" readout={<span>Tap the parts of the argument to add or remove them.</span>}>
      <div className="tm">
        <div className="tm__map">
          {PARTS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`tm__node tm__node--${p.id} ${active.has(p.id) ? 'is-on' : ''}`}
              aria-pressed={active.has(p.id)}
              onClick={() => toggle(p.id)}
            >
              <span className="tm__label">{p.label}</span>
              <span className="tm__w mono">+{p.weight}</span>
            </button>
          ))}
          <svg className="tm__wires" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 24 H250" />
            <path d="M150 24 V156" />
            <path d="M250 24 V90" />
          </svg>
        </div>
        <Gauge value={s} />
      </div>
      <p className="tm__text">
        {sentence(active).map(([id, t]) => (
          <motion.span key={id} className={`tm__frag tm__frag--${id}`} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            {t}{' '}
          </motion.span>
        ))}
        {active.size === 0 && <span className="tm__empty">Nothing to judge yet. Add a claim.</span>}
      </p>
      <div className="sr-only" aria-live="polite">Score {s}, {verdict(s)}</div>
      <div className="tm__tools">
        <PlateButton onClick={() => setActive(new Set(PARTS.map((p) => p.id)))}>Complete it</PlateButton>
        <PlateButton onClick={() => setActive(new Set())}>Clear</PlateButton>
      </div>
    </Plate>
  )
}
