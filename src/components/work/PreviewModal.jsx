import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { ArrowUpRight, DesktopTower, DeviceMobile, X } from '@phosphor-icons/react'
import { getLenis } from '../../hooks/useLenis.js'
import './preview.css'

// A live, sandboxed window onto the deployed project, with the captured
// screenshot shown underneath until the real page has loaded.
export default function PreviewModal({ project, onClose }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [device, setDevice] = useState('desktop')
  const closeRef = useRef(null)
  const loadedRef = useRef(false)

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    getLenis()?.stop()
    const html = document.documentElement
    const overflow = html.style.overflow
    html.style.overflow = 'hidden'
    // Keep keyboard and screen-reader focus inside the dialog.
    const root = document.getElementById('root')
    root?.setAttribute('inert', '')
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    // Some hosts never fire load when framing is refused; give up gracefully.
    const t = setTimeout(() => setFailed((f) => f || !loadedRef.current), 12000)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
      html.style.overflow = overflow
      root?.removeAttribute('inert')
      getLenis()?.start()
      prev?.focus?.()
    }
  }, [onClose])

  const host = new URL(project.live).host

  return createPortal(
    <motion.div
      className="pv"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} live preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-lenis-prevent
    >
      <motion.div
        className="pv__win"
        initial={{ clipPath: 'inset(8% 8% 8% 8% round 14px)', y: 30 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 14px)', y: 0 }}
        exit={{ clipPath: 'inset(8% 8% 8% 8% round 14px)', y: 30, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="pv__bar">
          <span className="pv__name">{project.name}</span>
          <span className="pv__url mono">{host}</span>
          <div className="pv__tools">
            <div className="pv__seg" role="group" aria-label="Viewport">
              <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')} aria-label="Desktop width">
                <DesktopTower size={16} weight="bold" />
              </button>
              <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')} aria-label="Mobile width">
                <DeviceMobile size={16} weight="bold" />
              </button>
            </div>
            <a className="btn btn--sm btn--ghost" href={project.live} target="_blank" rel="noreferrer">
              New tab <ArrowUpRight size={14} weight="bold" />
            </a>
            <button type="button" ref={closeRef} className="pv__close" onClick={onClose} aria-label="Close preview">
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>

        <div className={`pv__stage is-${device}`}>
          <div className="pv__frame">
            {project.shot && !loaded && (
              <img className="pv__shot" src={project.shot} alt="" aria-hidden="true" />
            )}
            <div className="sr-only" role="status">
              {loaded ? `${project.name} loaded` : failed ? 'The live site is slow to load' : `Loading ${project.name}`}
            </div>
            {!loaded && !failed && (
              <div className="pv__loading mono" aria-hidden="true">
                <span className="pv__roller" /> Loading the live site
              </div>
            )}
            {failed && !loaded && (
              <div className="pv__loading mono" aria-hidden="true">
                This site is slow to load inside a frame. Try opening it in a new tab.
              </div>
            )}
            <iframe
              title={`${project.name} (live)`}
              src={project.live}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => {
                loadedRef.current = true
                setLoaded(true)
              }}
              style={{ opacity: loaded ? 1 : 0 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
