import { useState } from 'react'
import { motion } from 'motion/react'
import { Sparkle, Quotes } from '@phosphor-icons/react'
import { profile } from '../../data/profile.js'
import './block3d.css'

export default function Hero3DBlock() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className="earth-spin-stage"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => setIsPaused((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label="3D Square Card spinning continuously 360 degrees like Earth. Hover or tap to pause spin."
    >
      <motion.div
        className="earth-spin-cube"
        animate={{
          rotateY: isPaused ? undefined : [0, 360],
        }}
        transition={{
          rotateY: {
            repeat: Infinity,
            duration: 12,
            ease: 'linear',
          },
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT FACE (0 deg): Quote & Stat Chips at bottom */}
        <div className="earth-face earth-front">
          <div className="face-header">
            <span className="face-badge mono">
              <Sparkle size={13} weight="fill" className="badge-sparkle" />
              <span>DATA & AI ENGINEER</span>
            </span>
          </div>

          <div className="face-content">
            <Quotes size={28} weight="fill" className="quote-icon" />
            <blockquote className="quote-text">
              "Data is messy. Pipelines don't have to be. I build systems that scale under pressure."
            </blockquote>
          </div>

          <div className="face-footer">
            <div className="stat-chip mono">400+ DSA Solved</div>
            <div className="stat-chip mono">8.85 CGPA</div>
            <div className="stat-chip mono">1.21B Records</div>
          </div>
        </div>

        {/* BACK FACE (180 deg): Liza's Photo & Details */}
        <div className="earth-face earth-back">
          <div className="back-photo-wrapper">
            <img src={profile.photo || '/liza.jpg'} alt={profile.name} className="back-photo-img" />
          </div>

          <div className="back-meta">
            <h3 className="back-name">{profile.name}</h3>
            <p className="back-role">{profile.role}</p>
            <p className="back-school mono">B.Tech CSE • Lovely Professional University</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
