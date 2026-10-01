import { describe, it, expect } from 'vitest'
import { rng } from './random.js'
import { nextCandle, series, rsi, signal } from './market.js'
import { dijkstra, findCycle, edgeKey } from './graph.js'
import { score, verdict, PARTS } from './toulmin.js'
import { screen, dotRadius, loupe } from './halftone.js'
import { makeBody, step, candidatePairs } from './physics.js'
import { validate } from './contact.js'

describe('random', () => {
  it('is deterministic per seed and stays in [0, 1)', () => {
    const a = rng(7)
    const b = rng(7)
    for (let i = 0; i < 100; i++) {
      const v = a()
      expect(v).toBe(b())
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe('market', () => {
  it('produces internally consistent candles', () => {
    const rand = rng(3)
    for (const c of series(200, 100, rand)) {
      expect(c.high).toBeGreaterThanOrEqual(Math.max(c.open, c.close))
      expect(c.low).toBeLessThanOrEqual(Math.min(c.open, c.close))
    }
    expect(nextCandle(50, rng(1)).open).toBe(50)
  })

  it('computes RSI at the extremes and nulls before the period', () => {
    const up = Array.from({ length: 30 }, (_, i) => 100 + i)
    const down = Array.from({ length: 30 }, (_, i) => 100 - i)
    expect(rsi(up)[13]).toBeNull()
    expect(rsi(up).at(-1)).toBe(100)
    expect(rsi(down).at(-1)).toBeCloseTo(0, 5)
    expect(rsi([1, 2, 3])).toEqual([null, null, null])
  })

  it('maps RSI to signals', () => {
    expect(signal(25)).toBe('buy')
    expect(signal(75)).toBe('sell')
    expect(signal(50)).toBe('hold')
    expect(signal(null)).toBe('hold')
  })
})

describe('graph', () => {
  const nodes = ['A', 'B', 'C', 'D'].map((id) => ({ id }))
  const edges = [
    { a: 'A', b: 'B', w: 1 },
    { a: 'B', b: 'D', w: 1 },
    { a: 'A', b: 'C', w: 2 },
    { a: 'C', b: 'D', w: 5 },
  ]

  it('finds the shortest path', () => {
    const r = dijkstra(nodes, edges, 'A', 'D')
    expect(r.path).toEqual(['A', 'B', 'D'])
    expect(r.dist).toBe(2)
    expect(r.order[0]).toBe('A')
  })

  it('reroutes around failed links and reports unreachable', () => {
    const r = dijkstra(nodes, edges, 'A', 'D', new Set([edgeKey('D', 'B')]))
    expect(r.path).toEqual(['A', 'C', 'D'])
    expect(r.dist).toBe(7)
    const cut = dijkstra(nodes, edges, 'A', 'D', new Set([edgeKey('B', 'D'), edgeKey('C', 'D')]))
    expect(cut.path).toEqual([])
    expect(cut.dist).toBe(Infinity)
  })

  it('detects wait-for cycles', () => {
    expect(findCycle({ P1: ['P2'], P2: ['P3'], P3: ['P1'] })).toEqual(['P1', 'P2', 'P3'])
    expect(findCycle({ P1: ['P2'], P2: ['P3'], P3: [] })).toEqual([])
    expect(findCycle({ P0: ['P1'], P1: ['P2'], P2: ['P1'] })).toEqual(['P1', 'P2'])
  })
})

describe('toulmin', () => {
  it('sums weights to 100 and caps claimless arguments', () => {
    const all = new Set(PARTS.map((p) => p.id))
    expect(score(all)).toBe(100)
    expect(score(new Set(['data', 'warrant', 'backing']))).toBe(25)
    expect(score(new Set(['claim']))).toBe(20)
    expect(verdict(100)).toBe('Airtight')
    expect(verdict(20)).toBe('Assertion only')
  })
})

describe('halftone', () => {
  it('covers the area with a rotated screen', () => {
    const pts = screen(100, 100, 10, 15)
    expect(pts.length).toBeGreaterThan(80)
    for (const [x, y] of pts) {
      expect(x).toBeGreaterThanOrEqual(-10)
      expect(y).toBeLessThanOrEqual(110)
    }
  })

  it('maps tone to radius monotonically and clamps', () => {
    expect(dotRadius(0, 10)).toBe(0)
    expect(dotRadius(0.25, 10)).toBeLessThan(dotRadius(0.5, 10))
    expect(dotRadius(2, 10)).toBe(dotRadius(1, 10))
  })

  it('only magnifies inside the loupe', () => {
    expect(loupe(100, 100, 0, 0, 50)).toEqual([100, 100, 1])
    const [x, , s] = loupe(10, 0, 0, 0, 50)
    expect(x).toBeGreaterThan(10)
    expect(s).toBeGreaterThan(1)
  })
})

describe('physics', () => {
  it('pairs only nearby bodies', () => {
    const bodies = [makeBody(1, 10, 10, 5), makeBody(2, 18, 10, 5), makeBody(3, 300, 300, 5)]
    const ids = candidatePairs(bodies, 10).map(([a, b]) => [a.id, b.id].sort().join())
    expect(ids).toContain('1,2')
    expect(ids.some((p) => p.includes('3'))).toBe(false)
  })

  it('separates overlapping bodies and keeps them in bounds', () => {
    const a = makeBody(1, 50, 90, 10)
    const b = makeBody(2, 55, 90, 10)
    for (let i = 0; i < 120; i++) step([a, b], { w: 100, h: 100 })
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeGreaterThan(18)
    for (const body of [a, b]) {
      expect(body.x).toBeGreaterThanOrEqual(body.r - 0.01)
      expect(body.y).toBeLessThanOrEqual(100 - body.r + 0.01)
    }
  })
})

describe('contact validation', () => {
  it('accepts a good message and flags bad fields', () => {
    expect(validate({ name: 'Asha', email: 'asha@example.com', message: 'Hello, I have a role for you.' })).toEqual({})
    const e = validate({ name: ' ', email: 'nope', message: 'hi' })
    expect(Object.keys(e).sort()).toEqual(['email', 'message', 'name'])
  })
})
