import BrandMark from '../ui/BrandMark.jsx'

// A rubber-stamp roundel for the issuer: logo where one exists, letters otherwise.
// The tilt is derived from the id so each stamp lands a little differently.
export default function Stamp({ cert, size = 44 }) {
  const tilt = ([...cert.id].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 17) - 8
  return (
    <span className="stamp" style={{ '--s': `${size}px`, '--tilt': `${tilt}deg` }} aria-hidden="true">
      {cert.mark ? (
        <BrandMark name={cert.mark} className="stamp__logo" />
      ) : (
        <span className={`stamp__mono ${cert.mono.length > 2 ? 'is-long' : ''}`}>{cert.mono}</span>
      )}
    </span>
  )
}
