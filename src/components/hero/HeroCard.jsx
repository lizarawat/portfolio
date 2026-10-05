import { useState } from 'react'
import { motion } from 'motion/react'
import { Sparkle, Code, Trophy, Cpu, User, ArrowUpRight } from '@phosphor-icons/react'
import { profile } from '../../data/profile.js'
import './herocard.css'

export default function HeroCard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`hero-card ${hovered ? 'is-unfolded' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      {/* Sleek Header & Tab Switcher */}
      <div className="hero-card__header">
        <div className="hero-card__badge">
          <Sparkle size={14} weight="fill" className="badge-icon" />
          <span>DEVELOPER STUDIO</span>
        </div>
        <div className="hero-card__tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'profile' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('profile')}
            aria-label="Profile tab"
          >
            <User size={14} weight="bold" /> Photo & Bio
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'pipeline' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('pipeline')}
            aria-label="Pipeline tab"
          >
            <Cpu size={14} weight="bold" /> Pipeline Stream
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'dsa' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('dsa')}
            aria-label="DSA Stats tab"
          >
            <Trophy size={14} weight="bold" /> 400+ DSA
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="hero-card__body">
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            className="hero-card__pane"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="photo-slot">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="photo-img" />
              ) : (
                <div className="photo-placeholder">
                  <div className="photo-avatar-ring">
                    <span className="avatar-initials">{profile.initials}</span>
                  </div>
                  <span className="photo-hint mono">Photo Slot • Drop liza.jpg</span>
                </div>
              )}
            </div>

            <div className="profile-details">
              <h3 className="profile-name">{profile.name}</h3>
              <p className="profile-title">{profile.role}</p>
              <div className="profile-pills">
                <span className="pill-item mono">8.85 CGPA • B.Tech CSE</span>
                <span className="pill-item mono">LPU • Phagwara</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'pipeline' && (
          <motion.div
            key="pipeline"
            className="hero-card__pane"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pipeline-demo">
              <div className="pipeline-header mono">
                <Code size={14} weight="bold" />
                <span>TradeCraft & FinBERT Stream</span>
                <span className="live-tag">LIVE WebSocket</span>
              </div>
              <div className="pipeline-stats">
                <div className="metric-box">
                  <span className="metric-val">&lt;200ms</span>
                  <span className="metric-lbl mono">Latency</span>
                </div>
                <div className="metric-box">
                  <span className="metric-val">20+</span>
                  <span className="metric-lbl mono">NSE Equities</span>
                </div>
                <div className="metric-box">
                  <span className="metric-val">+37.29%</span>
                  <span className="metric-lbl mono">Simulated P&L</span>
                </div>
              </div>
              <div className="pipeline-bar-wrapper">
                <div className="pipeline-bar-fill" />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'dsa' && (
          <motion.div
            key="dsa"
            className="hero-card__pane"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="dsa-card">
              <div className="dsa-highlight">
                <span className="dsa-num">400+</span>
                <span className="dsa-lbl">DSA Problems Solved</span>
              </div>
              <p className="dsa-sub mono">LeetCode & GeeksforGeeks • Dynamic Programming & Graph Algorithms</p>
              <div className="dsa-tags">
                <span className="chip">AlgoArena Pre-Finalist</span>
                <span className="chip">Cryptic Clues Hackathon</span>
                <span className="chip">Ensemble Event Operations</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer & Hover Indicator */}
      <div className="hero-card__footer">
        <span className="hover-hint mono">
          {hovered ? '✦ Studio Unfolded • Click tabs to explore' : '✦ Hover or tap to unfold studio card'}
        </span>
        <a href="#work" className="explore-link">
          Explore Work <ArrowUpRight size={14} weight="bold" />
        </a>
      </div>
    </motion.div>
  )
}
