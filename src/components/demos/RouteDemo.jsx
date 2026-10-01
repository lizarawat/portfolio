import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { dijkstra, edgeKey } from '../../lib/graph.js'
import Plate, { PlateButton } from './Plate.jsx'
import './route.css'

const NODES = [
  { id: 'A', x: 50, y: 180 },
  { id: 'B', x: 160, y: 70 },
  { id: 'C', x: 160, y: 290 },
  { id: 'D', x: 290, y: 180 },
  { id: 'E', x: 300, y: 50 },
  { id: 'F', x: 300, y: 310 },
  { id: 'G', x: 430, y: 110 },
  { id: 'H', x: 430, y: 260 },
  { id: 'I', x: 550, y: 180 },
]
const EDGES = [
  ['A', 'B', 4], ['A', 'C', 3], ['A', 'D', 9], ['B', 'E', 5], ['B', 'D', 3], ['C', 'D', 5],
  ['C', 'F', 6], ['D', 'G', 4], ['D', 'H', 5], ['E', 'G', 3], ['F', 'H', 2], ['G', 'I', 4],
  ['H', 'I', 4], ['G', 'H', 6],
].map(([a, b, w]) => ({ a, b, w }))
const POS = Object.fromEntries(NODES.map((n) => [n.id, n]))
const STEP = 0.14

export default function RouteDemo() {
  const reduce = useReducedMotion()
  const [src, setSrc] = useState('A')
  const [dst, setDst] = useState('I')
  const [role, setRole] = useState('dst')
  const [failed, setFailed] = useState(() => new Set())

  const result = useMemo(() => dijkstra(NODES, EDGES, src, dst, failed), [src, dst, failed])
  const runKey = `${src}${dst}${[...failed].sort().join()}`
  const settleTime = reduce ? 0 : result.order.length * STEP
  const pts = result.path.map((id) => POS[id])

  const pick = (id) => {
    if (role === 'src' && id !== dst) {
      setSrc(id)
      setRole('dst')
    } else if (role === 'dst' && id !== src) {
      setDst(id)
    }
  }
  const cut = (k) =>
    setFailed((prev) => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })

  return (
    <Plate
      title="Router mesh"
      note="Dijkstra"
      tools={
        <>
          <PlateButton active={role === 'src'} onClick={() => setRole('src')}>Pick source</PlateButton>
          <PlateButton active={role === 'dst'} onClick={() => setRole('dst')}>Pick target</PlateButton>
          <PlateButton onClick={() => setFailed(new Set())} disabled={!failed.size}>Repair links</PlateButton>
        </>
      }
      readout={
        result.path.length ? (
          <>
            <span>Route <b>{result.path.join(' > ')}</b></span>
            <span>Cost <b>{result.dist}</b></span>
            <span>Settled <b>{result.order.length}/{NODES.length}</b></span>
            <span>Cut links <b>{failed.size}</b></span>
          </>
        ) : (
          <span className="rt__down">No route from {src} to {dst}. Repair a link.</span>
        )
      }
    >
      <svg className="rt" viewBox="0 0 600 360" role="img" aria-label={`Network graph. Shortest route ${result.path.join(' to ') || 'unavailable'}.`}>
        {EDGES.map((e) => {
          const k = edgeKey(e.a, e.b)
          const a = POS[e.a]
          const b = POS[e.b]
          const isCut = failed.has(k)
          return (
            <g key={k} className={`rt__edge ${isCut ? 'is-cut' : ''}`}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="rt__line" />
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className="rt__hit"
                role="button"
                tabIndex={0}
                aria-label={`${isCut ? 'Repair' : 'Cut'} link ${e.a} to ${e.b}`}
                onClick={() => cut(k)}
                onKeyDown={(ev) => (ev.key === 'Enter' || ev.key === ' ') && (ev.preventDefault(), cut(k))}
              />
            </g>
          )
        })}

        {pts.length > 1 && (
          <motion.polyline
            key={`p-${runKey}`}
            points={pts.map((p) => `${p.x},${p.y}`).join(' ')}
            className="rt__path"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 0.8, delay: settleTime, ease: [0.65, 0, 0.35, 1] }}
          />
        )}

        {EDGES.map((e) => {
          const a = POS[e.a]
          const b = POS[e.b]
          const isCut = failed.has(edgeKey(e.a, e.b))
          return (
            <g key={`w-${e.a}${e.b}`} transform={`translate(${(a.x + b.x) / 2} ${(a.y + b.y) / 2})`} className={`rt__w ${isCut ? 'is-cut' : ''}`}>
              <rect x="-11" y="-10" width="22" height="20" rx="10" />
              <text dy="4">{isCut ? '×' : e.w}</text>
            </g>
          )
        })}

        {NODES.map((n) => {
          const idx = result.order.indexOf(n.id)
          const role_ = n.id === src ? 'src' : n.id === dst ? 'dst' : ''
          return (
            <g
              key={n.id}
              className={`rt__node ${role_ ? `is-${role_}` : ''}`}
              transform={`translate(${n.x} ${n.y})`}
              role="button"
              tabIndex={0}
              aria-label={`Router ${n.id}${role_ === 'src' ? ', source' : role_ === 'dst' ? ', target' : ''}`}
              onClick={() => pick(n.id)}
              onKeyDown={(ev) => (ev.key === 'Enter' || ev.key === ' ') && (ev.preventDefault(), pick(n.id))}
            >
              {idx >= 0 && (
                <motion.circle
                  key={`s-${runKey}`}
                  r="25"
                  className="rt__settled"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: reduce ? 0 : idx * STEP, type: 'spring', stiffness: 300, damping: 18 }}
                />
              )}
              <circle r="19" className="rt__disc" />
              <text dy="5" className="rt__id">{n.id}</text>
            </g>
          )
        })}

        {pts.length > 1 && !reduce && (
          <motion.circle
            key={`k-${runKey}`}
            r="7"
            className="rt__packet"
            initial={{ cx: pts[0].x, cy: pts[0].y, opacity: 0 }}
            animate={{ cx: pts.map((p) => p.x), cy: pts.map((p) => p.y), opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 0.45 * pts.length,
              delay: settleTime + 0.8,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: 'linear',
            }}
          />
        )}
      </svg>
      <p className="rt__hint mono">Click a link to cut it. Click a router to move the target.</p>
    </Plate>
  )
}
