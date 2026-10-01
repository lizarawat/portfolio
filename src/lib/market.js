import { gauss } from './random.js'

// One OHLC candle from a geometric random walk of `ticks` sub-steps.
export function nextCandle(prevClose, rand, { drift = 0.0002, vol = 0.006, ticks = 12 } = {}) {
  const open = prevClose
  let price = open
  let high = open
  let low = open
  for (let i = 0; i < ticks; i++) {
    price *= Math.exp(drift / ticks + (vol / Math.sqrt(ticks)) * gauss(rand))
    high = Math.max(high, price)
    low = Math.min(low, price)
  }
  return Object.freeze({ open, high, low, close: price })
}

export function series(n, start, rand, opts) {
  const out = []
  let close = start
  for (let i = 0; i < n; i++) {
    const c = nextCandle(close, rand, opts)
    out.push(c)
    close = c.close
  }
  return out
}

// Wilder's RSI over closing prices. Returns an array aligned with `closes`
// (null until enough data exists).
export function rsi(closes, period = 14) {
  const out = closes.map(() => null)
  if (closes.length <= period) return out
  let gain = 0
  let loss = 0
  for (let i = 1; i <= period; i++) {
    const d = closes[i] - closes[i - 1]
    gain += Math.max(d, 0)
    loss += Math.max(-d, 0)
  }
  gain /= period
  loss /= period
  out[period] = loss === 0 ? 100 : 100 - 100 / (1 + gain / loss)
  for (let i = period + 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1]
    gain = (gain * (period - 1) + Math.max(d, 0)) / period
    loss = (loss * (period - 1) + Math.max(-d, 0)) / period
    out[i] = loss === 0 ? 100 : 100 - 100 / (1 + gain / loss)
  }
  return out
}

export function signal(value, { low = 30, high = 70 } = {}) {
  if (value == null) return 'hold'
  if (value <= low) return 'buy'
  if (value >= high) return 'sell'
  return 'hold'
}
