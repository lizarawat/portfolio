// Builds a rotated halftone screen over a w x h area. Each cell centre is
// returned in canvas space so a sampler can read the tone beneath it.
export function screen(w, h, cell, angleDeg) {
  const a = (angleDeg * Math.PI) / 180
  const cos = Math.cos(a)
  const sin = Math.sin(a)
  const r = Math.hypot(w, h) / 2
  const cx = w / 2
  const cy = h / 2
  const pts = []
  for (let y = -r; y <= r; y += cell) {
    for (let x = -r; x <= r; x += cell) {
      const px = cx + x * cos - y * sin
      const py = cy + x * sin + y * cos
      if (px >= -cell && px <= w + cell && py >= -cell && py <= h + cell) pts.push([px, py])
    }
  }
  return pts
}

// Tone (0 = paper, 1 = full ink) to dot radius. Area, not radius, should
// track tone, hence the square root.
export const dotRadius = (tone, cell) => Math.sqrt(Math.max(0, Math.min(1, tone))) * cell * 0.62

// Printer's loupe: points within `radius` of the lens are pushed outward and
// enlarged, as if seen through a magnifier. Returns [x, y, scale].
export function loupe(px, py, lx, ly, radius, power = 0.55) {
  const dx = px - lx
  const dy = py - ly
  const d = Math.hypot(dx, dy)
  if (d >= radius || radius <= 0) return [px, py, 1]
  const t = d / radius
  const k = 1 + power * (1 - t * t)
  return [lx + dx * k, ly + dy * k, 1 + (k - 1) * 1.6]
}
