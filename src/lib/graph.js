export const edgeKey = (a, b) => (a < b ? `${a}-${b}` : `${b}-${a}`)

// Dijkstra on an undirected weighted graph. `failed` is a Set of edgeKeys
// treated as cut. Returns { dist, path, order } where `order` is the
// sequence in which nodes were settled (used to animate the search).
export function dijkstra(nodes, edges, source, target, failed = new Set()) {
  const adj = new Map(nodes.map((n) => [n.id, []]))
  for (const e of edges) {
    if (failed.has(edgeKey(e.a, e.b))) continue
    adj.get(e.a).push([e.b, e.w])
    adj.get(e.b).push([e.a, e.w])
  }
  const dist = new Map(nodes.map((n) => [n.id, Infinity]))
  const prev = new Map()
  const done = new Set()
  const order = []
  dist.set(source, 0)

  while (done.size < nodes.length) {
    let u = null
    for (const [id, d] of dist) {
      if (!done.has(id) && d < Infinity && (u === null || d < dist.get(u))) u = id
    }
    if (u === null) break
    done.add(u)
    order.push(u)
    if (u === target) break
    for (const [v, w] of adj.get(u)) {
      const alt = dist.get(u) + w
      if (alt < dist.get(v)) {
        dist.set(v, alt)
        prev.set(v, u)
      }
    }
  }

  const total = dist.get(target)
  if (total === Infinity) return { dist: Infinity, path: [], order }
  const path = [target]
  while (path[0] !== source) path.unshift(prev.get(path[0]))
  return { dist: total, path, order }
}

// Wait-for graph cycle detection. `waits` maps process -> processes it waits on.
// Returns the first cycle found as an array of node ids, or [] if none.
export function findCycle(waits) {
  const state = new Map()
  const stack = []
  const visit = (u) => {
    state.set(u, 1)
    stack.push(u)
    for (const v of waits[u] ?? []) {
      if (state.get(v) === 1) return stack.slice(stack.indexOf(v))
      if (!state.has(v)) {
        const c = visit(v)
        if (c.length) return c
      }
    }
    stack.pop()
    state.set(u, 2)
    return []
  }
  for (const u of Object.keys(waits)) {
    if (!state.has(u)) {
      const c = visit(u)
      if (c.length) return c
    }
  }
  return []
}
