import { useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { useCanvas } from '../../hooks/useCanvas.js'
import { useInks } from '../../hooks/useTheme.js'
import { rng } from '../../lib/random.js'
import { buildHash, makeBody, step } from '../../lib/physics.js'

const CELL = 28

// Broad phase, made visible: only lit grid cells hold bodies, so only those
// cells are ever checked for collisions.
export default function HashDemo() {
  const inks = useInks()
  const reduce = useReducedMotion()
  const sim = useRef(null)

  const ref = useCanvas((ctx, { w, h }, _t, dt) => {
    if (w === 0) return
    if (!sim.current || sim.current.w !== w) {
      const rand = rng(11)
      const bodies = Array.from({ length: 16 }, (_, i) =>
        makeBody(i + 1, 20 + rand() * (w - 40), -rand() * h, 7 + rand() * 7),
      )
      sim.current = { w, bodies, rand, t: 0 }
      if (reduce) for (let i = 0; i < 300; i++) step(bodies, { w, h, gravity: 900, restitution: 0.55 })
    }
    const s = sim.current
    if (!reduce) {
      s.t += dt
      if (s.t > 3.2) {
        s.t = 0
        const b = s.bodies[Math.floor(s.rand() * s.bodies.length)]
        b.vy = -500 - s.rand() * 300
        b.vx = (s.rand() - 0.5) * 400
      }
      step(s.bodies, { w, h, dt: Math.min(dt, 1 / 30), gravity: 900, restitution: 0.55 })
    }

    ctx.clearRect(0, 0, w, h)
    const grid = buildHash(s.bodies, CELL)
    ctx.strokeStyle = inks.rule
    ctx.lineWidth = 1
    for (let x = 0; x <= w; x += CELL) {
      ctx.beginPath()
      ctx.moveTo(x + 0.5, 0)
      ctx.lineTo(x + 0.5, h)
      ctx.stroke()
    }
    for (let y = h; y >= 0; y -= CELL) {
      ctx.beginPath()
      ctx.moveTo(0, y + 0.5)
      ctx.lineTo(w, y + 0.5)
      ctx.stroke()
    }
    ctx.globalCompositeOperation = inks.blend
    ctx.fillStyle = inks.blue
    ctx.globalAlpha = 0.18
    for (const b of s.bodies) {
      const gx = Math.floor(b.x / CELL)
      const gy = Math.floor(b.y / CELL)
      for (let i = -1; i <= 1; i++)
        for (let j = -1; j <= 1; j++) {
          const cx = (gx + i) * CELL
          const cy = (gy + j) * CELL
          if (Math.abs(cx + CELL / 2 - b.x) < CELL / 2 + b.r && Math.abs(cy + CELL / 2 - b.y) < CELL / 2 + b.r) ctx.fillRect(cx, cy, CELL, CELL)
        }
    }
    ctx.globalAlpha = 0.95
    ctx.fillStyle = inks.pink
    for (const b of s.bodies) {
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = inks.ink2
    ctx.font = '500 10px "IBM Plex Mono", monospace'
    ctx.fillText(`${grid.size} cells checked`, 8, 14)
  })

  return <canvas ref={ref} className="demo-canvas demo-canvas--hash" role="img" aria-label="Circles bouncing over a spatial hash grid" />
}
