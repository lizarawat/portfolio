import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Sparkle, Quotes, ArrowClockwise } from '@phosphor-icons/react'
import { profile } from '../../data/profile.js'
import './block3d.css'

export default function Hero3DBlock() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Track mouse coordinates for interactive 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig)
  const rotateYBase = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    setIsFlipped(false)
  }

  return (
    <div
      className="block3d-stage"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label="3D Rotating Block. Hover to tilt in 3D, click or hover to turn 180 degrees"
    >
      <motion.div
        className="block3d-cube"
        style={{
          rotateX: isHovered ? rotateX : 8,
          rotateY: isFlipped ? 180 : isHovered ? rotateYBase : -15,
        }}
        animate={{
          rotateY: isFlipped ? 180 : isHovered ? undefined : [-15, 15, -15],
        }}
        transition={{
          rotateY: isHovered
            ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            : { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {/* FRONT FACE (Quote & Stats) */}
        <div className="block3d-face block3d-front">
          <div className="face-header">
            <span className="face-badge mono">
              <Sparkle size={13} weight="fill" className="badge-sparkle" />
              <span>DATA & AI ENGINEER</span>
            </span>
            <span className="flip-hint mono">
              <ArrowClockwise size={13} weight="bold" /> 3D Block
            </span>
          </div>

          <div className="face-content">
            <Quotes size={30} weight="fill" className="quote-icon" />
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

        {/* BACK FACE (Real Photo & Details) */}
        <div className="block3d-face block3d-back">
          <div className="back-photo-wrapper">
            <img src={profile.photo || '/liza.jpg'} alt={profile.name} className="back-photo-img" />
          </div>

          <div className="back-meta">
            <h3 className="back-name">{profile.name}</h3>
            <p className="back-role">{profile.role}</p>
            <p className="back-school mono">B.Tech CSE • Lovely Professional University</p>
          </div>
        </div>

        {/* 3D SIDE EDGES (gives real 3D solid thickness like a 3D block!) */}
        <div className="block3d-side block3d-right" />
        <div className="block3d-side block3d-left" />
        <div className="block3d-side block3d-top" />
        <div className="block3d-side block3d-bottom" />
      </motion.div>
    </div>
  )
}
