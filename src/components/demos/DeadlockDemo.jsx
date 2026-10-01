import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { findCycle } from '../../lib/graph.js'
import { PlateButton } from './Plate.jsx'
import './deadlock.css'

const PROCS = [
  { id: 'P1', x: 60, y: 50 },
  { id: 'P2', x: 200, y: 50 },
  { id: 'P3', x: 200, y: 150 },
  { id: 'P4', x: 60, y: 150 },
]
const AT = Object.fromEntries(PROCS.map((p) => [p.id, p]))
const BASE = { P1: ['P2'], P2: ['P3'], P3: [], P4: ['P1'] }

// Wait-for graph: an arrow P1 > P2 means P1 waits on a resource P2 holds.
export default function DeadlockDemo() {
  const [closing, setClosing] = useState(false)
  const waits = useMemo(() => ({ ...BASE, P3: closing ? ['P1'] : [] }), [closing])
  const cycle = findCycle(waits)
  const inCycle = (a, b) => {
    const i = cycle.indexOf(a)
    return i >= 0 && cycle[(i + 1) % cycle.length] === b
  }

  return (
    <div className="dl">
      <svg viewBox="0 0 260 200" className="dl__svg" role="img" aria-label={cycle.length ? `Deadlock: ${cycle.join(', ')}` : 'No deadlock'}>
        <defs>
          <marker id="dl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="dl__head" />
          </marker>
        </defs>
        {Object.entries(waits).flatMap(([a, list]) =>
          list.map((b) => {
            const p = AT[a]
            const q = AT[b]
            const d = Math.hypot(q.x - p.x, q.y - p.y)
            const ux = (q.x - p.x) / d
            const uy = (q.y - p.y) / d
            const hot = inCycle(a, b)
            return (
              <motion.line
                key={`${a}${b}`}
                x1={p.x + ux * 22}
                y1={p.y + uy * 22}
                x2={q.x - ux * 24}
                y2={q.y - uy * 24}
                className={`dl__edge ${hot ? 'is-hot' : ''}`}
                markerEnd="url(#dl-arrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            )
          }),
        )}
        {PROCS.map((p) => (
          <g key={p.id} transform={`translate(${p.x} ${p.y})`} className={`dl__proc ${cycle.includes(p.id) ? 'is-hot' : ''}`}>
            <rect x="-20" y="-16" width="40" height="32" rx="8" />
            <text dy="5">{p.id}</text>
          </g>
        ))}
      </svg>
      <div className="dl__side">
        <p className={`dl__status mono ${cycle.length ? 'is-hot' : ''}`} aria-live="polite">
          {cycle.length ? `Deadlock: ${[...cycle, cycle[0]].join(' > ')}` : 'Safe: no cycle in the wait-for graph'}
        </p>
        <PlateButton active={closing} onClick={() => setClosing((c) => !c)}>
          {closing ? 'Preempt P3' : 'P3 requests R1'}
        </PlateButton>
      </div>
    </div>
  )
}
