import { useEffect, useRef } from 'react'

// Sizes a canvas to its box at device pixel ratio and runs `draw(ctx, size, t, dt)`
// on every frame while the canvas is on screen. `draw` is read through a ref,
// so callers can pass a fresh closure each render without restarting the loop.
export function useCanvas(draw, { animate = true } = {}) {
  const ref = useRef(null)
  const drawRef = useRef(draw)
  drawRef.current = draw

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const size = { w: 0, h: 0, dpr: 1 }
    let raf = 0
    let visible = false
    let last = performance.now()

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      size.dpr = Math.min(window.devicePixelRatio || 1, 2)
      size.w = r.width
      size.h = r.height
      canvas.width = Math.max(1, Math.round(r.width * size.dpr))
      canvas.height = Math.max(1, Math.round(r.height * size.dpr))
      ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0)
      size.version = (size.version ?? 0) + 1
      if (!animate || !visible) paint(performance.now())
    }

    const paint = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      // `draw` owns clearing, so it can skip idle frames entirely.
      ctx.save()
      drawRef.current(ctx, size, now / 1000, dt)
      ctx.restore()
    }

    const loop = (now) => {
      paint(now)
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && animate) {
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }
    })
    io.observe(canvas)
    resize()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [animate])

  return ref
}
