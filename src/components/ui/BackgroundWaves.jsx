import { useEffect, useRef } from 'react'

export default function BackgroundWaves() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // Code snippets floating subtly in background
    const CODES = [
      'def pipeline(data): return data.transform()',
      'SELECT * FROM nse_equities WHERE rsi > 70;',
      'model = FinBERT.from_pretrained("sentiment")',
      'dijkstra(graph, src, dst) -> min_cost',
      'df.groupby("state")["literacy"].mean()',
      'const ws = new WebSocket("wss://ticker");',
      '01001100 01001001 01011010 01000001',
      'tf.keras.layers.Dense(units=128, activation="relu")',
    ]

    const items = Array.from({ length: 18 }, (_, i) => ({
      text: CODES[i % CODES.length],
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.3 + Math.random() * 0.4,
      size: 11 + Math.random() * 3,
      alpha: 0.04 + Math.random() * 0.08,
    }))

    let phase = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      phase += 0.008

      // Draw subtle sine wave lines
      ctx.beginPath()
      ctx.lineWidth = 1.2
      for (let x = 0; x < width; x += 8) {
        const y1 = height * 0.3 + Math.sin(x * 0.003 + phase) * 40 + Math.cos(x * 0.001) * 20
        const y2 = height * 0.7 + Math.cos(x * 0.002 - phase * 0.8) * 45
        if (x === 0) {
          ctx.moveTo(x, y1)
        } else {
          ctx.lineTo(x, y1)
        }
      }
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.07)'
      ctx.stroke()

      // Draw floating code snippets
      ctx.font = '12px "IBM Plex Mono", monospace'
      items.forEach((item) => {
        item.y -= item.speed
        if (item.y < -30) {
          item.y = height + 30
          item.x = Math.random() * width
        }
        ctx.fillStyle = `rgba(148, 163, 184, ${item.alpha})`
        ctx.fillText(item.text, item.x, item.y)
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  )
}
