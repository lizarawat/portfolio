import { lazy, Suspense, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react'
import { featured, more } from '../../data/projects.js'
import Overprint from '../ui/Overprint.jsx'
import ProjectSpread from './ProjectSpread.jsx'
import PreviewModal from './PreviewModal.jsx'
import './work.css'

const MINI = {
  deadlock: lazy(() => import('../demos/DeadlockDemo.jsx')),
  physics: lazy(() => import('../demos/HashDemo.jsx')),
}
const LAYOUTS = ['stack', 'split', 'split-rev', 'stack']

function MiniCard({ project, i }) {
  const Demo = MINI[project.demo]
  return (
    <motion.article
      className={`mini mini--${i % 2 ? 'b' : 'a'}`}
      initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
    >
      <div className="mini__demo">
        <Suspense fallback={<div className="plate-skel plate-skel--sm" aria-hidden="true" />}>
          <Demo />
        </Suspense>
      </div>
      <div className="mini__meta mono">
        <span>{project.kicker}</span>
        <span>{project.date}</span>
      </div>
      <h3 className="mini__name">{project.name}</h3>
      <p className="mini__text">{project.summary}</p>
      <div className="mini__foot">
        <div className="mini__stack">
          {project.stack.map((s) => (
            <span className="chip" key={s}>{s}</span>
          ))}
        </div>
        <div className="mini__links">
          {project.live && (
            <a className="link" href={project.live} target="_blank" rel="noreferrer">
              {project.liveLabel} <ArrowUpRight size={14} weight="bold" />
            </a>
          )}
          <a className="link" href={project.github} target="_blank" rel="noreferrer">
            <GithubLogo size={16} weight="bold" /> Source
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  const [preview, setPreview] = useState(null)
  const close = useCallback(() => setPreview(null), [])

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <header className="work__head">
          <Overprint id="work-title" className="work__title">Selected work</Overprint>
          <p className="work__intro">
            Every project below ships with a working plate built from the same logic. Poke at them.
          </p>
        </header>

        {featured.map((p, i) => (
          <ProjectSpread key={p.id} project={p} layout={LAYOUTS[i]} onPreview={setPreview} />
        ))}

        <h3 className="work__more">More projects</h3>
        <div className="work__minis">
          {more.map((p, i) => (
            <MiniCard key={p.id} project={p} i={i} />
          ))}
        </div>
      </div>

      <AnimatePresence>{preview && <PreviewModal key={preview.id} project={preview} onClose={close} />}</AnimatePresence>
    </section>
  )
}
