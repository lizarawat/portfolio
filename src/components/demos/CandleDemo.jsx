import { useRef, useState, useEffect } from 'react'
import { useReducedMotion } from 'motion/react'
import { Pause, Play, TrendUp, TrendDown, Lightning, ShoppingCart } from '@phosphor-icons/react'
import { useCanvas } from '../../hooks/useCanvas.js'
import { useInks } from '../../hooks/useTheme.js'
import { rng } from '../../lib/random.js'
import { nextCandle, series, rsi, signal } from '../../lib/market.js'
import Plate, { PlateButton } from './Plate.jsx'

const VISIBLE = 50

const TICKERS = {
  'RELIANCE': { name: 'Reliance Industries', base: 2642.80, drift: 0.0003 },
  'NIFTY 50': { name: 'NIFTY 50 Index', base: 23512.40, drift: 0.0002 },
  'TCS': { name: 'Tata Consultancy Svcs', base: 4120.50, drift: -0.0001 },
  'INFY': { name: 'Infosys Limited', base: 1845.20, drift: 0.0004 },
}

export default function CandleDemo() {
  const inks = useInks()
  const reduce = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [timeframe, setTimeframe] = useState('1m')
  const [selectedTicker, setSelectedTicker] = useState('RELIANCE')
  const [showTrendlines, setShowTrendlines] = useState(true)
  const [showSMA, setShowSMA] = useState(true)
  const [hoverData, setHoverData] = useState(null)
  const [orderToast, setOrderToast] = useState(null)

  // Live real-time clock state
  const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleTimeString('en-IN', { hour12: false }))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour12: false }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const candleIntervals = { '1m': 350, '2m': 700, '5m': 1200 }
  const currentInterval = candleIntervals[timeframe] || 500

  const tickerInfo = TICKERS[selectedTicker] || TICKERS['RELIANCE']

  const sim = useRef(null)
  if (!sim.current || sim.current.ticker !== selectedTicker) {
    const rand = rng(20260601 + selectedTicker.charCodeAt(0))
    const candles = series(VISIBLE + 20, tickerInfo.base, rand)
    // Generate simulated volumes
    candles.forEach((c) => {
      c.vol = Math.floor(80000 + (rand() * 120000))
    })
    sim.current = { ticker: selectedTicker, rand, candles, live: null, acc: 0, tickAcc: 0 }
  }

  const [read, setRead] = useState(() => {
    const closes = sim.current.candles.map((c) => c.close)
    const r = rsi(closes).at(-1)
    const firstClose = sim.current.candles[0].close
    const lastClose = closes.at(-1)
    const diff = lastClose - firstClose
    const pct = (diff / firstClose) * 100
    return { price: lastClose, diff, pct, rsi: r, sig: signal(r) }
  })

  // Simulated order placement handler
  const handleOrder = (type) => {
    const priceStr = read.price ? read.price.toFixed(2) : '2,642.80'
    setOrderToast({ type, msg: `SIMULATED ORDER EXECUTED: ${type} 50 shares @ ₹${priceStr}` })
    setTimeout(() => setOrderToast(null), 3500)
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const w = rect.width
    const pad = 12
    const cw = (w - pad * 2) / VISIBLE

    const idx = Math.floor((x - pad) / cw)
    const s = sim.current
    if (s) {
      const view = s.candles.slice(-VISIBLE)
      if (idx >= 0 && idx < view.length) {
        setHoverData(view[idx])
        return
      }
    }
    setHoverData(null)
  }

  const handleMouseLeave = () => {
    setHoverData(null)
  }

  const ref = useCanvas((ctx, { w, h }, _t, dt) => {
    const s = sim.current
    if (!paused && !reduce) {
      s.acc += dt * 1000
      s.tickAcc += dt * 1000
      const last = s.candles.at(-1)
      if (!s.live) {
        s.live = {
          open: last.close,
          high: last.close,
          low: last.close,
          close: last.close,
          vol: Math.floor(5000 + s.rand() * 15000),
        }
      }

      if (s.tickAcc > 70) {
        s.tickAcc = 0
        const step = nextCandle(s.live.close, s.rand, { drift: tickerInfo.drift, vol: 0.003, ticks: 2 })
        s.live = {
          open: s.live.open,
          close: step.close,
          high: Math.max(s.live.high, step.high),
          low: Math.min(s.live.low, step.low),
          vol: s.live.vol + Math.floor(s.rand() * 4000),
        }
      }

      if (s.acc > currentInterval) {
        s.acc = 0
        s.candles = [...s.candles.slice(-(VISIBLE + 40)), s.live]
        s.live = null
        const closes = s.candles.map((c) => c.close)
        const r = rsi(closes).at(-1)
        const firstClose = s.candles[Math.max(0, s.candles.length - VISIBLE)].close
        const lastClose = closes.at(-1)
        const diff = lastClose - firstClose
        const pct = (diff / firstClose) * 100

        setRead({
          price: lastClose,
          diff,
          pct,
          rsi: r,
          sig: signal(r),
        })
      }
    }

    const all = s.live ? [...s.candles, s.live] : s.candles
    const view = all.slice(-VISIBLE)
    const closes = all.map((c) => c.close)
    const rs = rsi(closes).slice(-VISIBLE)

    // SMA(20) calculation
    const sma20 = view.map((_, i) => {
      const slice = closes.slice(Math.max(0, closes.length - VISIBLE + i - 19), closes.length - VISIBLE + i + 1)
      if (slice.length < 5) return null
      return slice.reduce((a, b) => a + b, 0) / slice.length
    })

    const priceH = h * 0.58
    const volH = h * 0.15
    const volTop = priceH + 8
    const rsiTop = volTop + volH + 12
    const rsiH = h - rsiTop - 8
    const pad = 12

    const hi = Math.max(...view.map((c) => c.high))
    const lo = Math.min(...view.map((c) => c.low))
    const maxVol = Math.max(...view.map((c) => c.vol || 10000))
    const span = hi - lo || 1
    const y = (p) => pad + (1 - (p - lo) / span) * (priceH - pad * 2)
    const vy = (v) => volTop + volH - (v / maxVol) * volH
    const cw = (w - pad * 2) / VISIBLE
    const ry = (v) => rsiTop + (1 - v / 100) * rsiH

    ctx.clearRect(0, 0, w, h)

    // Background Gridlines
    ctx.strokeStyle = inks.rule
    ctx.lineWidth = 0.5
    ctx.setLineDash([2, 4])
    for (let p = 0.25; p <= 0.75; p += 0.25) {
      const gy = pad + p * (priceH - pad * 2)
      ctx.beginPath()
      ctx.moveTo(pad, gy)
      ctx.lineTo(w - pad, gy)
      ctx.stroke()
    }

    // RSI Bounds
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
    ctx.fillText('VOL', pad + 2, volTop + 10)

    // Trendlines (Support & Resistance)
    if (showTrendlines && view.length > 5) {
      const firstX = pad + cw / 2
      const lastX = pad + (view.length - 1) * cw + cw / 2

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.45)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(firstX, y(view[0].high))
      ctx.lineTo(lastX, y(view[view.length - 1].high))
      ctx.stroke()

      ctx.strokeStyle = 'rgba(236, 72, 153, 0.45)'
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

      // Volume Bars
      ctx.fillStyle = up ? 'rgba(59, 130, 246, 0.3)' : 'rgba(236, 72, 153, 0.3)'
      const vHeight = volH - (vy(c.vol || 10000) - volTop)
      ctx.fillRect(x - cw * 0.35, vy(c.vol || 10000), cw * 0.7, Math.max(1, vHeight))

      // Candlesticks
      ctx.strokeStyle = up ? inks.blue : inks.pink
      ctx.fillStyle = up ? inks.blue : inks.pink
      ctx.beginPath()
      ctx.moveTo(x, y(c.high))
      ctx.lineTo(x, y(c.low))
      ctx.stroke()
      const top = y(Math.max(c.open, c.close))
      const bh = Math.max(1.5, Math.abs(y(c.open) - y(c.close)))
      ctx.fillRect(x - cw * 0.32, top, cw * 0.64, bh)

      // RSI Line
      const r = rs[i]
      const prev = rs[i - 1]
      if (r != null && prev != null) {
        ctx.strokeStyle = inks.ink
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(x - cw, ry(prev))
        ctx.lineTo(x, ry(r))
        ctx.stroke()
        ctx.lineWidth = 1
      }
    })

    // SMA (20) Cyan Line
    if (showSMA && sma20.length > 0) {
      ctx.strokeStyle = '#06b6d4'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      let started = false
      view.forEach((_, i) => {
        const val = sma20[i]
        if (val != null) {
          const x = pad + i * cw + cw / 2
          if (!started) {
            ctx.moveTo(x, y(val))
            started = true
          } else {
            ctx.lineTo(x, y(val))
          }
        }
      })
      ctx.stroke()
    }

    ctx.globalCompositeOperation = 'source-over'

    // Last Price Dotted Reference Line
    const last = view.at(-1)
    ctx.strokeStyle = inks.ink
    ctx.setLineDash([2, 3])
    ctx.beginPath()
    ctx.moveTo(pad, y(last.close))
    ctx.lineTo(w - pad, y(last.close))
    ctx.stroke()
    ctx.setLineDash([])
  })

  const isUp = read.diff >= 0

  return (
    <div className="tc-desk-terminal">
      {/* Top Header Plate with Live Time */}
      <Plate
        title="TRADECRAFT DESK"
        tools={
          <>
            <span className="live-clock mono">{currentTime} IST</span>
            <PlateButton active={timeframe === '1m'} onClick={() => setTimeframe('1m')}>1m</PlateButton>
            <PlateButton active={timeframe === '2m'} onClick={() => setTimeframe('2m')}>2m</PlateButton>
            <PlateButton active={timeframe === '5m'} onClick={() => setTimeframe('5m')}>5m</PlateButton>
            <PlateButton active={showTrendlines} onClick={() => setShowTrendlines((v) => !v)}>Trendlines</PlateButton>
            <PlateButton active={showSMA} onClick={() => setShowSMA((v) => !v)}>SMA(20)</PlateButton>
            <PlateButton onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Resume feed' : 'Pause feed'}>
              {paused ? <Play size={11} weight="fill" /> : <Pause size={11} weight="fill" />}
            </PlateButton>
          </>
        }
      >
        {/* Ticker & Interactive Trade Execution Bar */}
        <div className="tc-ticker-strip">
          <div className="ticker-select-group">
            {Object.keys(TICKERS).map((tk) => (
              <button
                key={tk}
                type="button"
                className={`tk-pill ${selectedTicker === tk ? 'is-active' : ''}`}
                onClick={() => setSelectedTicker(tk)}
              >
                {tk}
              </button>
            ))}
          </div>

          <div className="ticker-price-group">
            <span className="tk-price mono">
              ₹{read.price ? read.price.toFixed(2) : '...'}
            </span>
            <span className={`tk-change mono ${isUp ? 'is-up' : 'is-down'}`}>
              {isUp ? <TrendUp size={13} weight="bold" /> : <TrendDown size={13} weight="bold" />}
              {isUp ? '+' : ''}{read.diff ? read.diff.toFixed(2) : '0.00'} ({isUp ? '+' : ''}{read.pct ? read.pct.toFixed(2) : '0.00'}%)
            </span>
          </div>

          <div className="ticker-actions-group">
            <button type="button" className="trade-btn trade-btn--buy" onClick={() => handleOrder('BUY')}>
              <Lightning size={12} weight="fill" /> BUY 50
            </button>
            <button type="button" className="trade-btn trade-btn--sell" onClick={() => handleOrder('SELL')}>
              <ShoppingCart size={12} weight="fill" /> SELL 50
            </button>
          </div>
        </div>

        {/* Order Execution Toast Notification */}
        {orderToast && (
          <div className={`order-toast mono ${orderToast.type === 'BUY' ? 'toast-buy' : 'toast-sell'}`}>
            {orderToast.msg}
          </div>
        )}

        {/* Dynamic Hover OHLC Tooltip Banner */}
        <div className="tc-ohlc-banner mono">
          {hoverData ? (
            <span>
              O: <b>₹{hoverData.open.toFixed(2)}</b> H: <b>₹{hoverData.high.toFixed(2)}</b> L: <b>₹{hoverData.low.toFixed(2)}</b> C: <b>₹{hoverData.close.toFixed(2)}</b> Vol: <b>{(hoverData.vol / 1000).toFixed(0)}k</b>
            </span>
          ) : (
            <span>✦ Hover chart for real-time OHLC & Volume breakdown</span>
          )}
        </div>

        {/* Canvas Surface */}
        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ position: 'relative' }}>
          <canvas ref={ref} className="demo-canvas demo-canvas--candles" role="img" aria-label="Interactive candlestick trading desk canvas" />
        </div>
      </Plate>
    </div>
  )
}
