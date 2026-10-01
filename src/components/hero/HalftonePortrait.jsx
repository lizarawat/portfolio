import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useCanvas } from '../../hooks/useCanvas.js'
import { useInks } from '../../hooks/useTheme.js'
import { screen, dotRadius, loupe } from '../../lib/halftone.js'

const CELL = 7
const LENS = 96
const PASS_BLUE = { angle: 15, delay: 0.25 }
const PASS_PINK = { angle: 75, delay: 0.75 }
const PRINT_TIME = 1.1

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Paints the tone source into an offscreen canvas at display size. With a
// photo we use it (object-fit: cover); without one, a monogram over a soft
// radial wash, so the halftone still has real tonal range to show off.
function paintSource(w, h, img, initials) {
  const c = document.createElement('canvas')
  c.width = Math.max(1, Math.round(w))
  c.height = Math.max(1, Math.round(h))
  const g = c.getContext('2d', { willReadFrequently: true })
  g.fillStyle = '#fff'
  g.fillRect(0, 0, w, h)
  if (img) {
    const s = Math.max(w / img.width, h / img.height)
    const iw = img.width * s
    const ih = img.height * s
    g.drawImage(img, (w - iw) / 2, (h - ih) / 2.6, iw, ih)
  } else {
    const wash = g.createRadialGradient(w * 0.62, h * 0.34, 0, w * 0.62, h * 0.34, w * 0.75)
    wash.addColorStop(0, 'rgb(255 60 60)')
    wash.addColorStop(1, 'rgb(255 255 255)')
    g.fillStyle = wash
    g.fillRect(0, 0, w, h)
    g.fillStyle = 'rgb(20 20 120)'
    g.font = `800 ${Math.round(w * 0.56)}px "Bricolage Grotesque Variable", sans-serif`
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillText(initials[0], w * 0.34, h * 0.5)
    g.fillText(initials[1], w * 0.68, h * 0.74)
  }
  return g.getImageData(0, 0, c.width, c.height)
}

// Separate the source into a blue plate (shadows) and a pink plate
// (warm midtones), each on its own screen angle like a real riso job.
function separate(data, w, h) {
  const sample = (x, y) => {
    const ix = Math.min(data.width - 1, Math.max(0, Math.round(x)))
    const iy = Math.min(data.height - 1, Math.max(0, Math.round(y)))
    const i = (iy * data.width + ix) * 4
    return [data.data[i], data.data[i + 1], data.data[i + 2]]
  }
  const plate = (angle, toneOf) =>
    screen(w, h, CELL, angle)
      .map(([x, y]) => {
        const [r, g, b] = sample(x, y)
        return [x, y, toneOf(r, g, b)]
      })
      .filter((p) => p[2] > 0.04)

  const blue = plate(PASS_BLUE.angle, (r, g, b) => {
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    return Math.pow(1 - lum, 1.15) * (b > r + 30 ? 1.1 : 0.9)
  })
  const pink = plate(PASS_PINK.angle, (r, g, b) => {
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    const warmth = Math.max(0, (r - b) / 255)
    return (1 - lum) * 0.45 + warmth * 0.75
  })
  return { blue, pink }
}

export default function HalftonePortrait({ photo, initials, label }) {
  const inks = useInks()
  const reduce = useReducedMotion()
  const [img, setImg] = useState(null)
  const [fontReady, setFontReady] = useState(false)
  const state = useRef({
    plates: null,
    builtFor: '',
    start: null,
    lens: { x: -999, y: -999, tx: -999, ty: -999, r: 0, tr: 0 },
    dirty: true,
  })

  useEffect(() => {
    let alive = true
    document.fonts?.ready.then(() => alive && setFontReady(true))
    if (photo) loadImage(photo).then((i) => alive && setImg(i)).catch(() => alive && setImg(null))
    else setImg(null)
    return () => {
      alive = false
    }
  }, [photo])

  useEffect(() => {
    state.current.dirty = true
  }, [inks])

  const ref = useCanvas((ctx, size, t) => {
    const s = state.current
    const key = `${size.version}|${img ? 'img' : 'mono'}|${fontReady}`
    if (s.builtFor !== key && size.w > 0) {
      s.plates = separate(paintSource(size.w, size.h, img, initials), size.w, size.h)
      s.builtFor = key
      s.dirty = true
    }
    if (!s.plates) return
    if (s.start === null) s.start = t

    const L = s.lens
    L.x += (L.tx - L.x) * 0.2
    L.y += (L.ty - L.y) * 0.2
    L.r += (L.tr - L.r) * 0.18
    const lensMoving = Math.abs(L.tx - L.x) + Math.abs(L.ty - L.y) + Math.abs(L.tr - L.r) > 0.3
    const elapsed = reduce ? 99 : t - s.start
    const printing = elapsed < PASS_PINK.delay + PRINT_TIME + 0.1
    if (!s.dirty && !lensMoving && !printing) return
    s.dirty = false

    ctx.clearRect(0, 0, size.w, size.h)
    const drawPlate = (pts, color, pass, offset) => {
      const p = Math.min(1, Math.max(0, (elapsed - pass.delay) / PRINT_TIME))
      if (p <= 0) return
      // Ink roller sweep: dots print left to right with a soft leading edge.
      const edge = p * (size.w + 120) - 60
      ctx.fillStyle = color
      ctx.beginPath()
      for (let i = 0; i < pts.length; i++) {
        const [x0, y0, tone] = pts[i]
        const k = Math.min(1, Math.max(0, (edge - x0) / 60))
        if (k <= 0) continue
        const [x, y, sc] = L.r > 1 ? loupe(x0, y0, L.x, L.y, L.r) : [x0, y0, 1]
        const r = dotRadius(tone, CELL) * sc * k
        if (r < 0.35) continue
        ctx.moveTo(x + offset[0] + r, y + offset[1])
        ctx.arc(x + offset[0], y + offset[1], r, 0, Math.PI * 2)
      }
      ctx.fill()
    }

    ctx.globalAlpha = 0.95
    drawPlate(s.plates.blue, inks.blue, PASS_BLUE, [0, 0])
    ctx.globalCompositeOperation = inks.blend
    drawPlate(s.plates.pink, inks.pink, PASS_PINK, [2.5, -1.5])
    ctx.globalCompositeOperation = 'source-over'

    if (L.r > 2) {
      ctx.globalAlpha = Math.min(1, L.r / LENS)
      ctx.strokeStyle = inks.ink
      ctx.lineWidth = 1.25
      ctx.beginPath()
      ctx.arc(L.x, L.y, L.r * 1.25, 0, Math.PI * 2)
      ctx.stroke()
    }
  })

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const L = state.current.lens
    L.tx = e.clientX - r.left
    L.ty = e.clientY - r.top
    if (L.r < 1) {
      L.x = L.tx
      L.y = L.ty
    }
    L.tr = reduce ? 0 : LENS
  }
  const leave = () => {
    state.current.lens.tr = 0
  }

  return (
    <canvas
      ref={ref}
      className="portrait__canvas"
      role="img"
      aria-label={label}
      onPointerMove={move}
      onPointerDown={move}
      onPointerLeave={leave}
    />
  )
}
