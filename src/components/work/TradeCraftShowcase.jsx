import { useState, lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, GithubLogo, Play, Image, Sparkle, ShieldCheck, ChartLineUp, BookOpen, Newspaper, LockKey } from '@phosphor-icons/react'
import CandleDemo from '../demos/CandleDemo.jsx'
import './tradecraft.css'

export default function TradeCraftShowcase({ project, onPreview }) {
  const [viewMode, setViewMode] = useState('sim') // 'sim' | 'shot'

  return (
    <article className="tc-showcase" id="tradecraft">
      <div className="wrap">
        {/* Header Tag & Section Title */}
        <div className="tc-showcase__head">
          <div className="tc-showcase__tag mono">
            <span className="tag-num">01</span>
            <span className="tag-divider">•</span>
            <span className="tag-category">FEATURED PROJECT</span>
            <span className="tag-divider">•</span>
            <span className="tag-date">JUN 2026</span>
          </div>

          <h2 className="tc-showcase__title">
            TradeCraft <span className="title-accent">— Real-Time Quant Equity Analytics & Paper Trading Platform</span>
          </h2>
        </div>

        {/* Layman's Explanation Card */}
        <div className="tc-layman-card">
          <div className="tc-layman-card__badge mono">
            <Sparkle size={14} weight="fill" className="badge-sparkle" />
            <span>IN LAYMAN'S TERMS</span>
          </div>
          <p className="tc-layman-card__text">
            Think of <strong>TradeCraft</strong> as a risk-free stock market simulator built for retail investors. It lets you practice trading real-time NSE equities using ₹10 Lakhs in virtual cash — complete with AI-powered news sentiment analysis (FinBERT), technical indicators (RSI & MACD), interactive quizzes, and live market feeds so you learn and test strategies without risking real money.
          </p>
        </div>

        {/* Main Grid: Left Side Copy & Modules, Right Side Interactive Studio */}
        <div className="tc-showcase__grid">
          {/* Left Column: Feature Arsenal & Data Science Tools */}
          <div className="tc-showcase__left">
            <h3 className="tc-subheading">Core Modules & Architecture</h3>

            <div className="tc-modules-grid">
              <div className="module-item">
                <div className="module-icon"><ChartLineUp size={18} weight="bold" /></div>
                <div>
                  <h4 className="module-name">Trading Dashboard</h4>
                  <p className="module-desc">NIFTY 50/Bank tickers, Available Margin (₹4.34L+), Investment tracking & +33.88% Net P&L analytics.</p>
                </div>
              </div>

              <div className="module-item">
                <div className="module-icon"><Play size={18} weight="bold" /></div>
                <div>
                  <h4 className="module-name">Paper Trading Simulator</h4>
                  <p className="module-desc">Simulated order execution desk across 20+ NSE blue-chips (Reliance, TCS, M&M, INFY) with zero financial risk.</p>
                </div>
              </div>

              <div className="module-item">
                <div className="module-icon"><ShieldCheck size={18} weight="bold" /></div>
                <div>
                  <h4 className="module-name">Portfolio & Ledger</h4>
                  <p className="module-desc">Real-time position tracking, total return calculations, and simulated capital management across ₹10 Lakhs+.</p>
                </div>
              </div>

              <div className="module-item">
                <div className="module-icon"><BookOpen size={18} weight="bold" /></div>
                <div>
                  <h4 className="module-name">Lessons & Quizzes</h4>
                  <p className="module-desc">Structured learning path with XP rewards (+150 XP per module) to master technical analysis and chart patterns.</p>
                </div>
              </div>

              <div className="module-item">
                <div className="module-icon"><Newspaper size={18} weight="bold" /></div>
                <div>
                  <h4 className="module-name">News Room & NLP</h4>
                  <p className="module-desc">Live market news feed automatically scored using FinBERT NLP to classify Bullish (+), Bearish (-), or Neutral sentiment.</p>
                </div>
              </div>

              <div className="module-item">
                <div className="module-icon"><LockKey size={18} weight="bold" /></div>
                <div>
                  <h4 className="module-name">Email Authentication</h4>
                  <p className="module-desc">Secure 2-step email authentication guaranteeing individual virtual ledgers and portfolio isolation.</p>
                </div>
              </div>
            </div>

            {/* Data Science & Engineering Stack */}
            <div className="tc-stack-box">
              <span className="tc-stack-label mono">DATA SCIENCE & ENGINEERING TOOLS</span>
              <div className="tc-stack-chips">
                <span className="chip chip--highlight">Python</span>
                <span className="chip chip--highlight">Pandas</span>
                <span className="chip chip--highlight">pandas-ta</span>
                <span className="chip chip--highlight">FinBERT (NLP)</span>
                <span className="chip chip--highlight">WebSockets</span>
                <span className="chip">React</span>
                <span className="chip">TypeScript</span>
                <span className="chip">PostgreSQL</span>
                <span className="chip">Tailwind CSS</span>
              </div>
            </div>

            {/* Key Performance Metrics */}
            <div className="tc-metrics-row">
              <div className="metric-card">
                <span className="metric-value">&lt;200ms</span>
                <span className="metric-label mono">WebSocket Latency</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">20+</span>
                <span className="metric-label mono">NSE Equities Streamed</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">+33.88%</span>
                <span className="metric-label mono">Simulated Net Return</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="tc-actions-bar">
              <a
                className="btn btn--glow"
                href="https://tradecraft-rho-seven.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Launch TradeCraft App <ArrowUpRight size={16} weight="bold" />
              </a>
              <a
                className="btn btn--ghost"
                href="https://github.com/lizarawat/TradeCraft"
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogo size={18} weight="bold" /> Source Code
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Chart Simulation + Real App Screenshot Studio */}
          <div className="tc-showcase__right">
            <div className="tc-studio-card">
              <div className="tc-studio-card__head">
                <div className="tc-studio-card__toggle">
                  <button
                    type="button"
                    className={`toggle-btn ${viewMode === 'sim' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('sim')}
                  >
                    <Play size={13} weight="fill" /> Interactive Simulation
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${viewMode === 'shot' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('shot')}
                  >
                    <Image size={13} weight="bold" /> Real App Screenshot
                  </button>
                </div>
                <span className="tc-studio-card__hint mono">
                  {viewMode === 'sim' ? '✦ Hover chart to stream prices' : '✦ Real TradeCraft Dashboard'}
                </span>
              </div>

              <div className="tc-studio-card__body">
                {viewMode === 'sim' ? (
                  <div className="sim-wrapper">
                    <CandleDemo />
                  </div>
                ) : (
                  <button
                    type="button"
                    className="shot-wrapper"
                    onClick={() => onPreview(project)}
                    aria-label="Open TradeCraft full resolution preview"
                  >
                    <img src="/previews/tradecraft.jpg" alt="Real TradeCraft Trading Desk Dashboard" className="shot-img" />
                    <div className="shot-overlay">
                      <span>Click to view full-resolution preview 🔍</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
