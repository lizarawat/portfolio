import { forwardRef } from 'react'
import { FileText, ImageSquare, SealCheck } from '@phosphor-icons/react'
import Stamp from './Stamp.jsx'

export function status(cert) {
  if (cert.preview) return { Icon: ImageSquare, label: 'Preview available' }
  if (cert.link) return { Icon: SealCheck, label: 'Verifiable online' }
  return { Icon: FileText, label: 'On file' }
}

// Compact ticket: issuer stamp, title, and a perforated stub with the date.
// Selecting it "punches" the stub.
const TicketStub = forwardRef(function TicketStub({ cert, selected, onSelect, onHover, controls }, ref) {
  const { Icon, label } = status(cert)
  return (
    <button
      ref={ref}
      type="button"
      className={`stub ${selected ? 'is-on' : ''} ${cert.major ? 'is-major' : ''}`}
      aria-pressed={selected}
      aria-controls={controls}
      onClick={onSelect}
      onPointerEnter={onHover}
      onFocus={onHover}
      data-id={cert.id}
    >
      <Stamp cert={cert} />
      <span className="stub__body">
        <span className="stub__title">{cert.title}</span>
        <span className="stub__issuer mono">{cert.issuer}</span>
      </span>
      <span className="stub__tear" aria-hidden="true" />
      <span className="stub__side">
        <span className="stub__date mono">{cert.date}</span>
        <span className="stub__status" title={label}>
          <Icon size={15} weight="bold" aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </span>
        <span className="stub__punch" aria-hidden="true" />
      </span>
    </button>
  )
})

export default TicketStub
