import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, MagnifyingGlassPlus } from '@phosphor-icons/react'
import Stamp from './Stamp.jsx'

const host = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function Proof({ cert, onEnlarge }) {
  if (cert.preview) {
    return (
      <button type="button" className="lt__print" onClick={onEnlarge} aria-label={`Enlarge ${cert.title} certificate`}>
        <img src={cert.preview} alt={`${cert.title} certificate, issued by ${cert.issuer}`} loading="lazy" />
        <span className="lt__zoom mono">
          <MagnifyingGlassPlus size={14} weight="bold" /> Enlarge
        </span>
      </button>
    )
  }
  return (
    <div className="lt__blank">
      <Stamp cert={cert} size={86} />
      <p className="lt__blank-title">{cert.issuer}</p>
      <p className="lt__blank-text">
        {cert.link
          ? 'No public image for this one. The issuer’s page confirms it.'
          : 'Certificate on file. A copy is available on request.'}
      </p>
    </div>
  )
}

// The "light table": the selected certificate lies on a lit surface, taped
// down at a slight angle. Switching certificates slides the old print away.
export default function CertViewer({ cert, index, total, onStep, onEnlarge, compact = false, id }) {
  const reduce = useReducedMotion()
  const tilt = ((index % 3) - 1) * 1.2
  return (
    <div className={`lt ${compact ? 'lt--compact' : ''}`} id={id} role="region" aria-label="Certificate preview">
      <div className="lt__table">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={cert.id}
            className="lt__sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, rotate: tilt + 4 }}
            animate={{ opacity: 1, y: 0, rotate: tilt }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -60, rotate: tilt - 5 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <span className="lt__tape lt__tape--l" aria-hidden="true" />
            <span className="lt__tape lt__tape--r" aria-hidden="true" />
            <Proof cert={cert} onEnlarge={onEnlarge} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="lt__info">
        <div className="lt__head">
          <div>
            <h3 className="lt__title">{cert.title}</h3>
            <p className="lt__meta">
              {cert.issuer}, {cert.date}
            </p>
          </div>
          {!compact && (
            <div className="lt__steps">
              <button type="button" className="nav__icon" onClick={() => onStep(-1)} aria-label="Previous certificate" disabled={index === 0}>
                <ArrowLeft size={16} weight="bold" />
              </button>
              <button type="button" className="nav__icon" onClick={() => onStep(1)} aria-label="Next certificate" disabled={index === total - 1}>
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          )}
        </div>
        <div className="lt__actions">
          {cert.link ? (
            <a className="btn btn--sm lt__verify" href={cert.link} target="_blank" rel="noreferrer">
              Verify credential <ArrowUpRight size={14} weight="bold" />
            </a>
          ) : (
            <span className="lt__nolink mono">No public verification link</span>
          )}
          {cert.link && <span className="lt__host mono">{host(cert.link)}</span>}
        </div>
      </div>
    </div>
  )
}
