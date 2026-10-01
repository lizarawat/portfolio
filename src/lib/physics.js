// Minimal circle physics: semi-implicit Euler, spatial-hash broad phase and
// impulse-based collision response. Bodies are mutated in place because this
// runs every animation frame; nothing outside the simulation holds them.

export function makeBody(id, x, y, r, label) {
  return { id, x, y, vx: 0, vy: 0, r, m: r * r, label, held: false }
}

export function buildHash(bodies, size) {
  const grid = new Map()
  for (const b of bodies) {
    const x0 = Math.floor((b.x - b.r) / size)
    const x1 = Math.floor((b.x + b.r) / size)
    const y0 = Math.floor((b.y - b.r) / size)
    const y1 = Math.floor((b.y + b.r) / size)
    for (let gx = x0; gx <= x1; gx++) {
      for (let gy = y0; gy <= y1; gy++) {
        const k = gx * 73856093 ^ gy * 19349663
        const cell = grid.get(k)
        if (cell) cell.push(b)
        else grid.set(k, [b])
      }
    }
  }
  return grid
}

export function candidatePairs(bodies, size) {
  const seen = new Set()
  const pairs = []
  for (const cell of buildHash(bodies, size).values()) {
    for (let i = 0; i < cell.length; i++) {
      for (let j = i + 1; j < cell.length; j++) {
        const a = cell[i]
        const b = cell[j]
        const key = a.id < b.id ? a.id * 10007 + b.id : b.id * 10007 + a.id
        if (seen.has(key)) continue
        seen.add(key)
        pairs.push([a, b])
      }
    }
  }
  return pairs
}

function resolve(a, b, restitution) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dist = Math.hypot(dx, dy)
  const overlap = a.r + b.r - dist
  if (overlap <= 0 || dist === 0) return false
  const nx = dx / dist
  const ny = dy / dist
  const ia = a.held ? 0 : 1 / a.m
  const ib = b.held ? 0 : 1 / b.m
  const inv = ia + ib
  if (inv === 0) return true
  // Positional correction so bodies do not sink into each other.
  const corr = (overlap / inv) * 0.8
  a.x -= nx * corr * ia
  a.y -= ny * corr * ia
  b.x += nx * corr * ib
  b.y += ny * corr * ib
  const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny
  if (rv > 0) return true
  const j = (-(1 + restitution) * rv) / inv
  a.vx -= j * nx * ia
  a.vy -= j * ny * ia
  b.vx += j * nx * ib
  b.vy += j * ny * ib
  return true
}

export function step(bodies, { w, h, dt = 1 / 60, gravity = 1400, restitution = 0.35, iterations = 3 }) {
  for (const b of bodies) {
    if (b.held) continue
    b.vy += gravity * dt
    b.vx *= 0.999
    b.x += b.vx * dt
    b.y += b.vy * dt
  }
  const size = Math.max(8, Math.max(...bodies.map((b) => b.r)) * 2)
  for (let k = 0; k < iterations; k++) {
    for (const [a, b] of candidatePairs(bodies, size)) resolve(a, b, restitution)
    for (const b of bodies) {
      if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * restitution }
      if (b.x > w - b.r) { b.x = w - b.r; b.vx = -Math.abs(b.vx) * restitution }
      if (b.y > h - b.r) { b.y = h - b.r; b.vy = -Math.abs(b.vy) * restitution; b.vx *= 0.96 }
      if (b.y < b.r - h) { b.y = b.r - h; b.vy = 0 }
    }
  }
}
