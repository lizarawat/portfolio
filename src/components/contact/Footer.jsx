import { useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { useCanvas } from '../../hooks/useCanvas.js'
import { useInks } from '../../hooks/useTheme.js'
import { rng } from '../../lib/random.js'
import { makeBody, step } from '../../lib/physics.js'
import { profile, ticker } from '../../data/profile.js'
import './footer.css'

const WORDS = ticker.slice(0, 14)

function seed(w, h) {
  const rand = rng(7)
  const scale = Math.min(1, w / 1100)
  return WORDS.map((word, i) => {
    const r = (26 + word.length * 3.2) * (0.7 + scale * 0.3)
    const b = makeBody(i + 1, r + rand() * (w - r * 2), -rand() * h * 1.4 - r, r, word)
    b.ink = i % 3
    return b
  })
}

// Word discs with gravity and collisions; drag one and let go to throw it.
function Playground() {
  const inks = useInks()
  const reduce = useReducedMotion()
  const sim = useRef({ bodies: null, w: 0, grab: null, last: null })

  const ref = useCanvas((ctx, { w, h }, _t, dt) => {
    if (w === 0) return
    const s = sim.current
    if (!s.bodies || Math.abs(s.w - w) > 40) {
      s.bodies = seed(w, h)
      s.w = w
      if (reduce) for (let i = 0; i < 400; i++) step(s.bodies, { w, h })
    }
    if (!reduce || s.grab) step(s.bodies, { w, h, dt: Math.min(dt, 1 / 30) })

    ctx.clearRect(0, 0, w, h)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (const b of s.bodies) {
      const fill = b.ink === 0 ? inks.blue : b.ink === 1 ? inks.pink : inks.ink
      ctx.globalCompositeOperation = b.ink === 2 ? 'source-over' : inks.blend
      ctx.fillStyle = fill
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = b.ink === 1 ? '#1c1c21' : inks.paper
      ctx.font = `600 ${Math.max(10, Math.min(15, (b.r * 1.7) / b.label.length + 3))}px "IBM Plex Mono", monospace`
      ctx.fillText(b.label, b.x, b.y + 1)
    }
  })

  const at = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    return [e.clientX - r.left, e.clientY - r.top]
  }
  const down = (e) => {
    const [x, y] = at(e)
    const s = sim.current
    const hit = s.bodies?.find((b) => Math.hypot(b.x - x, b.y - y) < b.r)
    if (!hit) return
    e.currentTarget.setPointerCapture(e.pointerId)
    hit.held = true
    s.grab = hit
    s.last = [x, y, performance.now()]
  }
  const move = (e) => {
    const s = sim.current
    if (!s.grab) return
    const [x, y] = at(e)
    const now = performance.now()
    const [lx, ly, lt] = s.last
    const dt = Math.max(1, now - lt) / 1000
    s.grab.vx = (x - lx) / dt
    s.grab.vy = (y - ly) / dt
    s.grab.x = x
    s.grab.y = y
    s.last = [x, y, now]
  }
  const up = () => {
    const s = sim.current
    if (s.grab && s.last && performance.now() - s.last[2] > 80) {
      s.grab.vx = 0
      s.grab.vy = 0
    }
    if (s.grab) s.grab.held = false
    s.grab = null
  }

  return (
    <canvas
      ref={ref}
      className="ft__canvas"
      aria-label="A pile of toolkit words you can drag and throw"
      role="img"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    />
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="ft">
      <div className="ft__play">
        <Playground />
        <div className="ft__caption wrap">
          <p className="mono">
            Drag and throw. Circles, a spatial hash and impulse resolution: the ideas behind my C# engine, in a few lines of JS.
          </p>
        </div>
      </div>
      <div className="ft__bar wrap mono">
        <span>© {year} {profile.name}</span>
        <span>Set in Bricolage Grotesque & IBM Plex Mono. Printed in two inks.</span>
        <a className="link" href="#top">Back to top</a>
      </div>
    </footer>
  )
}
