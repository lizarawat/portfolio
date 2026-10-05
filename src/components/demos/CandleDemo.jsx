import { useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Pause, Play } from '@phosphor-icons/react'
import { useCanvas } from '../../hooks/useCanvas.js'
import { useInks } from '../../hooks/useTheme.js'
import { rng } from '../../lib/random.js'
import { nextCandle, series, rsi, signal } from '../../lib/market.js'
import Plate, { PlateButton } from './Plate.jsx'

const VISIBLE = 46

// Simulated intraday candlestick feed with 1m, 2m, 5m timeframe intervals and trendlines
export default function CandleDemo() {
  const inks = useInks()
  const reduce = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [timeframe, setTimeframe] = useState('1m') // '1m' | '2m' | '5m'
  const [showTrendlines, setShowTrendlines] = useState(true)

  const candleIntervals = { '1m': 350, '2m': 700, '5m': 1200 }
  const currentInterval = candleIntervals[timeframe] || 500

  const sim = useRef(null)
  if (!sim.current) {
    const rand = rng(20260601)
    const candles = series(VISIBLE + 16, 2462, rand)
    sim.current = { rand, candles, live: null, acc: 0, shock: 0, drift: 0.0002, tickAcc: 0 }
  }

  const [read, setRead] = useState(() => {
    const closes = sim.current.candles.map((c) => c.close)
    const r = rsi(closes).at(-1)
    return { price: closes.at(-1), rsi: r, sig: signal(r) }
  })

  const ref = useCanvas((ctx, { w, h }, _t, dt) => {
    const s = sim.current
    if (!paused && !reduce) {
      s.acc += dt * 1000
      s.tickAcc += dt * 1000
      const last = s.candles.at(-1)
      if (!s.live) s.live = { open: last.close, high: last.close, low: last.close, close: last.close }

      if (s.tickAcc > 80) {
        s.tickAcc = 0
        const step = nextCandle(s.live.close, s.rand, { drift: s.drift, vol: 0.0035, ticks: 2 })
        s.live = {
          open: s.live.open,
          close: step.close,
          high: Math.max(s.live.high, step.high),
          low: Math.min(s.live.low, step.low),
        }
      }

      if (s.acc > currentInterval) {
        s.acc = 0
        s.candles = [...s.candles.slice(-(VISIBLE + 40)), s.live]
        s.live = null
        const closes = s.candles.map((c) => c.close)
        const r = rsi(closes).at(-1)
        setRead({
          price: closes.at(-1),
          rsi: r,
          sig: signal(r),
        })
      }
    }

    const all = s.live ? [...s.candles, s.live] : s.candles
    const view = all.slice(-VISIBLE)
    const closes = all.map((c) => c.close)
    const rs = rsi(closes).slice(-VISIBLE)

    const priceH = h * 0.65
    const rsiTop = priceH + 16
    const rsiH = h - rsiTop - 8
    const pad = 12

    const hi = Math.max(...view.map((c) => c.high))
    const lo = Math.min(...view.map((c) => c.low))
    const span = hi - lo || 1
    const y = (p) => pad + (1 - (p - lo) / span) * (priceH - pad * 2)
    const cw = (w - pad * 2) / VISIBLE
    const ry = (v) => rsiTop + (1 - v / 100) * rsiH

    ctx.clearRect(0, 0, w, h)

    // RSI Bounds
    ctx.strokeStyle = inks.rule
    ctx.lineWidth = 1
    ctx.setLineDash([3, 4])
    for (const v of [30, 70]) {
      ctx.beginPath()
      ctx.moveTo(pad, ry(v))
      ctx.lineTo(w - pad, ry(v))
      ctx.stroke()
    }
    ctx.setLineDash([])
    ctx.fillStyle = inks.ink3
    ctx.font = '500 9px "IBM Plex Mono", monospace'
    ctx.fillText('RSI 70', pad + 2, ry(70) - 3)
    ctx.fillText('30', pad + 2, ry(30) - 3)

    // Trendlines (Support & Resistance)
    if (showTrendlines && view.length > 5) {
      const firstX = pad + cw / 2
      const lastX = pad + (view.length - 1) * cw + cw / 2

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.45)' // Blue trendline
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 4])

      // Resistance line (Connecting highs)
      ctx.beginPath()
      ctx.moveTo(firstX, y(view[0].high))
      ctx.lineTo(lastX, y(view[view.length - 1].high))
      ctx.stroke()

      // Support line (Connecting lows)
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.45)' // Pink trendline
      ctx.beginPath()
      ctx.moveTo(firstX, y(view[0].low))
      ctx.lineTo(lastX, y(view[view.length - 1].low))
      ctx.stroke()

      ctx.setLineDash([])
    }

    ctx.globalCompositeOperation = inks.blend
    view.forEach((c, i) => {
      const x = pad + i * cw + cw / 2
      const up = c.close >= c.open
      ctx.strokeStyle = up ? inks.blue : inks.pink
      ctx.fillStyle = up ? inks.blue : inks.pink
      ctx.beginPath()
      ctx.moveTo(x, y(c.high))
      ctx.lineTo(x, y(c.low))
      ctx.stroke()
      const top = y(Math.max(c.open, c.close))
      const bh = Math.max(1.5, Math.abs(y(c.open) - y(c.close)))
      ctx.fillRect(x - cw * 0.32, top, cw * 0.64, bh)

      const r = rs[i]
      const prev = rs[i - 1]
      if (r != null && prev != null) {
        ctx.strokeStyle = inks.ink
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x - cw, ry(prev))
        ctx.lineTo(x, ry(r))
        ctx.stroke()
        ctx.lineWidth = 1
      }
    })
    ctx.globalCompositeOperation = 'source-over'

    const last = view.at(-1)
    ctx.strokeStyle = inks.ink
    ctx.setLineDash([2, 3])
    ctx.beginPath()
    ctx.moveTo(pad, y(last.close))
    ctx.lineTo(w - pad, y(last.close))
    ctx.stroke()
    ctx.setLineDash([])
  })

  const sigLabel = { buy: 'BUY', sell: 'SELL', hold: 'HOLD' }[read.sig]

  return (
    <Plate
      title="NSE PAPER FEED"
      note={`Candles (${timeframe})`}
      tools={
        <>
          <PlateButton active={timeframe === '1m'} onClick={() => setTimeframe('1m')}>1m</PlateButton>
          <PlateButton active={timeframe === '2m'} onClick={() => setTimeframe('2m')}>2m</PlateButton>
          <PlateButton active={timeframe === '5m'} onClick={() => setTimeframe('5m')}>5m</PlateButton>
          <PlateButton active={showTrendlines} onClick={() => setShowTrendlines((v) => !v)}>Trendlines</PlateButton>
          <PlateButton onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Resume feed' : 'Pause feed'}>
            {paused ? <Play size={11} weight="fill" /> : <Pause size={11} weight="fill" />}
          </PlateButton>
        </>
      }
      readout={
        <>
          <span>NSE <b>₹{read.price ? read.price.toFixed(2) : '...'}</b></span>
          <span>RSI(14) <b>{read.rsi == null ? '...' : read.rsi.toFixed(1)}</b></span>
          <span>Signal <b className={`sig sig--${read.sig}`}>{sigLabel}</b></span>
        </>
      }
    >
      <canvas ref={ref} className="demo-canvas demo-canvas--candles" role="img" aria-label="Live candlestick chart with 1m, 2m, 5m timeframes and trendlines" />
    </Plate>
  )
}
