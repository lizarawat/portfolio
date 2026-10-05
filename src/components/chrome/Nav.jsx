import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'motion/react'
import { Moon, Sun, List, X, DownloadSimple } from '@phosphor-icons/react'
import { useTheme } from '../../hooks/useTheme.js'
import { profile } from '../../data/profile.js'
import './nav.css'

const LINKS = [
  ['Work', '#work'],
  ['Toolkit', '#toolkit'],
  ['Record', '#record'],
  ['Certificates', '#certificates'],
  ['Contact', '#contact'],
]

export default function Nav() {
  const { theme, toggle } = useTheme()
  const { scrollY, scrollYProgress } = useScroll()
  const [raised, setRaised] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setRaised(y > 24))

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav ${raised ? 'is-raised' : ''}`}>
      <div className="nav__inner wrap">
        <a href="#top" className="nav__mark" aria-label="Liza Rawat, back to top">
          <span className="nav__brand-badge">
            <span className="nav__brand-text">{profile.initials}</span>
          </span>
          <span className="nav__brand-name">{profile.name}</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="nav__link">
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__tools">
          <button
            className="nav__icon"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light paper' : 'Switch to black paper'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'grid' }}
              >
                {theme === 'dark' ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a className="btn btn--sm nav__cv" href={profile.cv} download>
            <DownloadSimple size={16} weight="bold" /> CV
          </a>
          <button
            className="nav__icon nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      <motion.div className="nav__progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="nav__sheet"
            aria-label="Sections"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          >
            {LINKS.map(([label, href], i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.05 }}
              >
                {label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
