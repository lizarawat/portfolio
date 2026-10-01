import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { INDIA_LITERACY, literacy } from '../../data/census.js'
import Plate, { PlateButton } from './Plate.jsx'
import './census.css'

const SORTED = [...literacy].sort((a, b) => b.rate - a.rate)

// The dashboard's dynamic top-N filter, rebuilt: real 2011 literacy rates,
// bars in halftone, blue above the national figure and pink below it.
export default function CensusDemo() {
  const [end, setEnd] = useState('top')
  const [n, setN] = useState(8)
  const rows = useMemo(() => (end === 'top' ? SORTED.slice(0, n) : SORTED.slice(-n).reverse()), [end, n])

  return (
    <Plate
      title="Literacy by state"
      note="Census of India 2011"
      tools={
        <>
          <PlateButton active={end === 'top'} onClick={() => setEnd('top')}>Top</PlateButton>
          <PlateButton active={end === 'bottom'} onClick={() => setEnd('bottom')}>Bottom</PlateButton>
          <label className="cz__n mono">
            N = {n}
            <input type="range" min="3" max="12" value={n} onChange={(e) => setN(Number(e.target.value))} aria-label="Number of states" />
          </label>
        </>
      }
      readout={
        <>
          <span>India <b>{INDIA_LITERACY}%</b></span>
          <span>Range <b>{SORTED.at(-1).rate}% to {SORTED[0].rate}%</b></span>
          <span>Gap <b>{(SORTED[0].rate - SORTED.at(-1).rate).toFixed(1)} pts</b></span>
        </>
      }
    >
      <div className="cz" role="list" aria-label={`${end === 'top' ? 'Highest' : 'Lowest'} ${n} literacy rates`}>
        <div className="cz__guide" aria-hidden="true">
          <span />
          <span className="cz__guide-col">
            <i className="cz__avg" style={{ left: `${INDIA_LITERACY}%` }}>
              <span className="mono">India {INDIA_LITERACY}</span>
            </i>
          </span>
          <span />
        </div>
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((r, i) => (
            <motion.div
              key={r.state}
              role="listitem"
              className={`cz__row ${r.rate >= INDIA_LITERACY ? 'is-above' : 'is-below'}`}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28, delay: i * 0.02 }}
            >
              <span className="cz__state">{r.state}</span>
              <span className="cz__track">
                <motion.span
                  className="cz__bar"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: `inset(0 ${100 - r.rate}% 0 0)` }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.04 }}
                />
              </span>
              <span className="cz__val mono">{r.rate.toFixed(1)}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Plate>
  )
}
