import { useCallback, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CATEGORIES, credentials } from '../../data/credentials.js'
import { useMedia } from '../../hooks/useMedia.js'
import Overprint from '../ui/Overprint.jsx'
import TicketStub from './TicketStub.jsx'
import CertViewer from './CertViewer.jsx'
import Lightbox from './Lightbox.jsx'
import './creds.css'

const COUNTS = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.id === 'all' ? credentials.length : credentials.filter((x) => x.cat === c.id).length]),
)
const WITH_PREVIEW = credentials.filter((c) => c.preview).length
const VERIFIABLE = credentials.filter((c) => c.link).length
const VIEWER_ID = 'cert-viewer'

export default function Credentials() {
  const [cat, setCat] = useState('all')
  const [selectedId, setSelectedId] = useState(credentials[0].id)
  const [enlarged, setEnlarged] = useState(null)
  const hoverTimer = useRef(0)
  const listRef = useRef(null)
  const stacked = useMedia('(max-width: 900px)')
  const canHover = useMedia('(hover: hover) and (pointer: fine)')

  const list = useMemo(() => (cat === 'all' ? credentials : credentials.filter((c) => c.cat === cat)), [cat])
  const index = Math.max(0, list.findIndex((c) => c.id === selectedId))
  const current = list[index] ?? list[0]

  const pickCat = (id) => {
    setCat(id)
    const next = id === 'all' ? credentials : credentials.filter((c) => c.cat === id)
    if (!next.some((c) => c.id === selectedId)) setSelectedId(next[0].id)
  }

  const step = useCallback(
    (dir) => {
      const next = list[Math.min(list.length - 1, Math.max(0, index + dir))]
      if (!next) return
      setSelectedId(next.id)
      listRef.current?.querySelector(`[data-id="${next.id}"]`)?.focus({ preventScroll: stacked })
    },
    [list, index, stacked],
  )

  // Hover previews on desktop, with a short intent delay so sweeping the
  // pointer across the grid doesn't flicker through every certificate.
  const hover = (id) => {
    if (!canHover || stacked) return
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setSelectedId(id), 90)
  }

  const onKey = (e) => {
    const k = e.key
    if (k === 'ArrowDown' || k === 'ArrowRight') {
      e.preventDefault()
      step(1)
    } else if (k === 'ArrowUp' || k === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    }
  }

  const close = useCallback(() => setEnlarged(null), [])

  return (
    <section className="cr" id="certificates" aria-labelledby="certs-title">
      <div className="wrap">
        <div className="cr__head">
          <div>
            <Overprint id="certs-title">Certificates</Overprint>
            <p className="cr__sum mono">
              {credentials.length} certificates, {WITH_PREVIEW} with a preview, {VERIFIABLE} verifiable online
            </p>
          </div>
          <div className="cr__filters" role="group" aria-label="Filter certificates">
            {CATEGORIES.map((c) => (
              <button key={c.id} type="button" className="cr__filter" aria-pressed={cat === c.id} onClick={() => pickCat(c.id)}>
                {cat === c.id && <motion.span layoutId="cr-pill" className="cr__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="cr__flabel">{c.label}</span>
                <span className="cr__fcount mono">{COUNTS[c.id]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="cr__booth">
          <div className="cr__list" ref={listRef} onKeyDown={onKey} role="group" aria-label="Certificates, newest first. Use arrow keys to move.">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.flatMap((c, i) => {
                const on = stacked ? c.id === selectedId : c.id === current.id
                const cell = (
                  <motion.div
                    key={c.id}
                    layout
                    className="cr__cell"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30, delay: Math.min(i, 8) * 0.02 }}
                  >
                    <TicketStub
                      cert={c}
                      selected={on}
                      controls={VIEWER_ID}
                      onSelect={() => setSelectedId(stacked && on ? null : c.id)}
                      onHover={() => hover(c.id)}
                    />
                  </motion.div>
                )
                if (!(stacked && on)) return [cell]
                return [
                  cell,
                  <motion.div
                    key={`${c.id}-viewer`}
                    className="cr__inline"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <CertViewer compact id={VIEWER_ID} cert={c} index={i} total={list.length} onStep={step} onEnlarge={() => setEnlarged(c)} />
                  </motion.div>,
                ]
              })}
            </AnimatePresence>
          </div>

          {!stacked && (
            <div className="cr__viewer">
              <CertViewer id={VIEWER_ID} cert={current} index={index} total={list.length} onStep={step} onEnlarge={() => setEnlarged(current)} />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>{enlarged && <Lightbox key={enlarged.id} cert={enlarged} onClose={close} />}</AnimatePresence>
    </section>
  )
}
