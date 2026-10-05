import { useState } from 'react'
import { motion } from 'motion/react'
import { Sparkle, ArrowClockwise, Quotes } from '@phosphor-icons/react'
import { profile } from '../../data/profile.js'
import './flipcard.css'

export default function HeroFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="flip-card-wrapper"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label="Interactive developer card, hover or tap to flip for photo"
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsFlipped((prev) => !prev)}
    >
      <motion.div
        className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* FRONT FACE: Quote & Tech Badges */}
        <div className="flip-card-face flip-card-front">
          <div className="face-header">
            <span className="face-badge mono">
              <Sparkle size={13} weight="fill" className="badge-sparkle" />
              <span>DATA & AI ENGINEER</span>
            </span>
            <span className="flip-hint mono">
              <ArrowClockwise size={13} weight="bold" /> Hover to flip
            </span>
          </div>

          <div className="face-content">
            <Quotes size={32} weight="fill" className="quote-icon" />
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

        {/* BACK FACE: Clean Photo Slot & Details */}
        <div className="flip-card-face flip-card-back">
          <div className="back-photo-wrapper">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} className="back-photo-img" />
            ) : (
              <div className="back-photo-placeholder">
                <div className="avatar-ring">
                  <span className="avatar-initials">{profile.initials}</span>
                </div>
                <span className="photo-slot-label mono">Photo Slot</span>
              </div>
            )}
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
