import './plate.css'

// Frame for every interactive demo: a title strip, the live surface, and an
// optional footer line for readouts.
export default function Plate({ title, note, tools, children, readout, className = '' }) {
  return (
    <div className={`plate ${className}`}>
      <div className="plate__bar">
        <span className="plate__title mono">{title}</span>
        {note && <span className="plate__note mono">{note}</span>}
        {tools && <div className="plate__tools">{tools}</div>}
      </div>
      <div className="plate__body">{children}</div>
      {readout && <div className="plate__readout mono">{readout}</div>}
    </div>
  )
}

export function PlateButton({ active, children, ...rest }) {
  return (
    <button type="button" className={`pbtn ${active ? 'is-on' : ''}`} aria-pressed={active} {...rest}>
      {children}
    </button>
  )
}
