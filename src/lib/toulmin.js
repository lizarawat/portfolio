// A toy, transparent version of a Toulmin rubric. DebateMind itself asks an
// LLM for structured scores; this one only checks which parts are present.
export const PARTS = Object.freeze([
  { id: 'claim', label: 'Claim', weight: 20, text: 'Cities should make buses free.' },
  { id: 'data', label: 'Data', weight: 20, text: 'Tallinn’s ridership rose after fares were dropped in 2013.' },
  { id: 'warrant', label: 'Warrant', weight: 20, text: 'Lower cost removes the main barrier to using transit.' },
  { id: 'backing', label: 'Backing', weight: 15, text: 'Price elasticity studies show fares suppress trips.' },
  { id: 'qualifier', label: 'Qualifier', weight: 10, text: 'In most dense cities,' },
  { id: 'rebuttal', label: 'Rebuttal', weight: 15, text: 'unless the lost fare revenue cuts service frequency.' },
])

export function score(active) {
  let total = 0
  for (const p of PARTS) if (active.has(p.id)) total += p.weight
  // An argument with no claim is not an argument.
  if (!active.has('claim')) total = Math.min(total, 25)
  return total
}

export function verdict(s) {
  if (s >= 85) return 'Airtight'
  if (s >= 60) return 'Persuasive'
  if (s >= 35) return 'Needs support'
  return 'Assertion only'
}
