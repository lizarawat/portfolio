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
      'tf.keras.layers.Dense(units=128, activation="relu")',
    ]

    const items = Array.from({ length: 16 }, (_, i) => ({
      text: CODES[i % CODES.length],
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.25 + Math.random() * 0.35,
      alpha: 0.12 + Math.random() * 0.1,
    }))

    // Small red numbers floating left to right periodically
    const RED_NUMS = ['0101', '400+', '10101', '01', '10010', '8.85', '1.21B', '1101', '0010']
    const redParticles = Array.from({ length: 14 }, (_, i) => ({
      text: RED_NUMS[i % RED_NUMS.length],
      x: Math.random() * width,
      y: (height * 0.1) + Math.random() * (height * 0.8),
      speed: 0.6 + Math.random() * 0.8,
      size: 11 + Math.random() * 2,
      alpha: 0.35 + Math.random() * 0.3,
    }))

    let phase = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      phase += 0.008

      // Draw high-visibility sine wave lines
      ctx.beginPath()
      ctx.lineWidth = 1.4
      for (let x = 0; x < width; x += 6) {
        const y1 = height * 0.3 + Math.sin(x * 0.003 + phase) * 45 + Math.cos(x * 0.001) * 20
        if (x === 0) {
          ctx.moveTo(x, y1)
        } else {
          ctx.lineTo(x, y1)
        }
      }
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.25)'
      ctx.stroke()

      ctx.beginPath()
      ctx.lineWidth = 1.2
      for (let x = 0; x < width; x += 6) {
        const y2 = height * 0.68 + Math.cos(x * 0.002 - phase * 0.8) * 50
        if (x === 0) {
          ctx.moveTo(x, y2)
        } else {
          ctx.lineTo(x, y2)
        }
      }
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)'
      ctx.stroke()

      // Draw floating code snippets
      ctx.font = '12px "IBM Plex Mono", monospace'
      items.forEach((item) => {
        item.y -= item.speed
        if (item.y < -30) {
          item.y = height + 30
          item.x = Math.random() * width
        }
        ctx.fillStyle = `rgba(100, 116, 139, ${item.alpha})`
        ctx.fillText(item.text, item.x, item.y)
      })

      // Draw floating small RED NUMBERS moving left to right
      redParticles.forEach((p) => {
        p.x += p.speed
        if (p.x > width + 40) {
          p.x = -50
          p.y = (height * 0.1) + Math.random() * (height * 0.8)
        }
        ctx.font = `600 ${p.size}px "IBM Plex Mono", monospace`
        ctx.fillStyle = `rgba(239, 68, 68, ${p.alpha})`
        ctx.fillText(p.text, p.x, p.y)
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
        opacity: 0.9,
      }}
      aria-hidden="true"
    />
  )
}
