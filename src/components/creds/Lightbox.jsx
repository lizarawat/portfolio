import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { ArrowUpRight, X } from '@phosphor-icons/react'
import { getLenis } from '../../hooks/useLenis.js'

// Full-size view of one certificate image.
export default function Lightbox({ cert, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const prev = document.activeElement
    const root = document.getElementById('root')
    const html = document.documentElement
    const overflow = html.style.overflow
    root?.setAttribute('inert', '')
    html.style.overflow = 'hidden'
    getLenis()?.stop()
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      root?.removeAttribute('inert')
      html.style.overflow = overflow
      getLenis()?.start()
      prev?.focus?.()
    }
  }, [onClose])

  return createPortal(
    <motion.div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title}, full size`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.figure
        className="lb__fig"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        <img src={cert.preview} alt={`${cert.title} certificate, issued by ${cert.issuer}`} />
        <figcaption>
          <span>
            <strong>{cert.title}</strong>
            <span className="mono">{cert.issuer}, {cert.date}</span>
          </span>
          <span className="lb__tools">
            {cert.link && (
              <a className="btn btn--sm" href={cert.link} target="_blank" rel="noreferrer">
                Verify <ArrowUpRight size={14} weight="bold" />
              </a>
            )}
            <button type="button" ref={closeRef} className="pv__close" onClick={onClose} aria-label="Close">
              <X size={18} weight="bold" />
            </button>
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>,
    document.body,
  )
}
