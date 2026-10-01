import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, GithubLogo, Browser } from '@phosphor-icons/react'
import Overprint from '../ui/Overprint.jsx'

const DEMOS = {
  candles: lazy(() => import('../demos/CandleDemo.jsx')),
  toulmin: lazy(() => import('../demos/ToulminDemo.jsx')),
  routes: lazy(() => import('../demos/RouteDemo.jsx')),
  census: lazy(() => import('../demos/CensusDemo.jsx')),
}

function PlateSkeleton() {
  return <div className="plate-skel" aria-hidden="true" />
}

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
}

// A proof print of the live site: duotone at rest, full colour on hover,
// and it opens the live preview.
function Proof({ project, onPreview }) {
  if (!project.shot) return null
  return (
    <button type="button" className="proof" onClick={() => onPreview(project)} aria-label={`Open ${project.name} live preview`}>
      <span className="proof__img">
        <img src={project.shot} alt={`${project.name} screenshot`} loading="lazy" width="1280" height="800" />
      </span>
      <span className="proof__cta">
        <Browser size={16} weight="bold" /> Live preview
      </span>
    </button>
  )
}

export default function ProjectSpread({ project, layout, onPreview }) {
  const Demo = DEMOS[project.demo]
  return (
    <article className={`spread spread--${layout} ${project.shot ? '' : 'spread--noproof'}`} id={project.id} aria-labelledby={`${project.id}-title`}>
      <motion.header className="spread__head" {...reveal}>
        <div className="spread__meta mono">
          <span>{project.kicker}</span>
          <span>{project.date}</span>
        </div>
        <Overprint as="h3" className="spread__title" settle={4} id={`${project.id}-title`}>
          {project.name}
        </Overprint>
      </motion.header>

      <motion.div className="spread__plate" {...reveal}>
        <Suspense fallback={<PlateSkeleton />}>
          <Demo />
        </Suspense>
      </motion.div>

      <motion.div className="spread__copy" {...reveal}>
        <p className="spread__summary">{project.summary}</p>
        <ul className="spread__points">
          {project.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <dl className="spread__metrics">
          {project.metrics.map((m) => (
            <div key={m.v}>
              <dt>{m.v}</dt>
              <dd>{m.k}</dd>
            </div>
          ))}
        </dl>
        <div className="spread__stack">
          {project.stack.map((s) => (
            <span className="chip" key={s}>{s}</span>
          ))}
        </div>
        <div className="spread__links">
          {project.live && (
            <a className="btn btn--sm" href={project.live} target="_blank" rel="noreferrer">
              {project.liveLabel ?? 'Visit site'} <ArrowUpRight size={14} weight="bold" />
            </a>
          )}
          <a className="link" href={project.github} target="_blank" rel="noreferrer">
            <GithubLogo size={16} weight="bold" /> Source
          </a>
        </div>
      </motion.div>

      {project.shot && (
        <motion.div className="spread__proof" {...reveal}>
          <Proof project={project} onPreview={onPreview} />
        </motion.div>
      )}
    </article>
  )
}
