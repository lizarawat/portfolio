import { ArrowUpRight, GithubLogo, Sparkle, ShieldCheck, ChartLineUp, Newspaper, GraduationCap } from '@phosphor-icons/react'
import CandleDemo from '../demos/CandleDemo.jsx'
import './tradecraft.css'

export default function TradeCraftShowcase({ project, onPreview }) {
  return (
    <article className="tc-showcase" id="tradecraft">
      <div className="wrap">
        {/* Header Tag & Section Title */}
        <div className="tc-showcase__head">
          <div className="tc-showcase__head-top">
            <div className="tc-showcase__tag mono">
              <span className="tag-num">01</span>
              <span className="tag-divider">•</span>
              <span className="tag-category">FEATURED PROJECT</span>
              <span className="tag-divider">•</span>
              <span className="tag-date">JUN 2026</span>
            </div>
          </div>

          <div className="tc-header-flex">
            <h2 className="tc-showcase__title">
              TradeCraft <span className="title-accent">— Real-Time Quant Equity Analytics & Paper Trading Desk</span>
            </h2>
          </div>
        </div>

        {/* Layman's Terms Hero Banner */}
        <div className="tc-layman-card">
          <div className="tc-layman-card__badge mono">
            <Sparkle size={14} weight="fill" className="badge-sparkle" />
            <span>IN LAYMAN'S TERMS</span>
          </div>
          <p className="tc-layman-card__text">
            <strong>TradeCraft</strong> is a risk-free stock market simulator built for retail investors. Practice trading real-time NSE equities with ₹10 Lakhs virtual cash, AI news sentiment analysis (FinBERT), technical indicators (RSI & MACD), interactive quizzes, and live market feeds.
          </p>
        </div>

        {/* Main 2-Column Full-Screen Balanced Layout */}
        <div className="tc-showcase__grid">
          {/* Left Column: Core Feature Grid, Tools, Metrics & CTAs */}
          <div className="tc-showcase__left">
            <h3 className="tc-subheading">Core Architecture & Capabilities</h3>

            {/* 2x2 Feature Grid */}
            <div className="tc-compact-feature-grid">
              <div className="tc-grid-card">
                <div className="tc-card-header">
                  <div className="tc-card-icon"><ChartLineUp size={20} weight="bold" /></div>
                  <h4 className="tc-card-title">Paper Simulator</h4>
                </div>
                <p className="tc-card-desc">
                  Real-time paper trading desk streaming NIFTY 50 tickers with ₹10 Lakhs virtual cash and zero risk.
                </p>
              </div>

              <div className="tc-grid-card">
                <div className="tc-card-header">
                  <div className="tc-card-icon"><ShieldCheck size={20} weight="bold" /></div>
                  <h4 className="tc-card-title">Portfolio Ledger</h4>
                </div>
                <p className="tc-card-desc">
                  Live P&L analytics (+33.88% net simulated return), cost basis tracking, and 2-step email authentication.
                </p>
              </div>

              <div className="tc-grid-card">
                <div className="tc-card-header">
                  <div className="tc-card-icon"><Newspaper size={20} weight="bold" /></div>
                  <h4 className="tc-card-title">FinBERT NLP Sentiment</h4>
                </div>
                <p className="tc-card-desc">
                  Live financial news automatically scored using FinBERT for Bullish, Bearish, or Neutral sentiment.
                </p>
              </div>

              <div className="tc-grid-card">
                <div className="tc-card-header">
                  <div className="tc-card-icon"><GraduationCap size={20} weight="bold" /></div>
                  <h4 className="tc-card-title">Interactive Quizzes</h4>
                </div>
                <p className="tc-card-desc">
                  Structured lessons and chart pattern quizzes with +150 XP rewards to master trading fundamentals.
                </p>
              </div>
            </div>

            {/* Data Science & Tech Stack */}
            <div className="tc-stack-box">
              <span className="tc-stack-label mono">DATA SCIENCE & ENGINEERING STACK</span>
              <div className="tc-stack-chips">
                <span className="chip chip--highlight">Python</span>
                <span className="chip chip--highlight">Pandas</span>
                <span className="chip chip--highlight">pandas-ta</span>
                <span className="chip chip--highlight">FinBERT NLP</span>
                <span className="chip chip--highlight">WebSockets</span>
                <span className="chip">React</span>
                <span className="chip">TypeScript</span>
                <span className="chip">PostgreSQL</span>
              </div>
            </div>

            {/* Performance Metrics & CTAs */}
            <div className="tc-bottom-row">
              <div className="tc-metrics-row">
                <div className="metric-card">
                  <span className="metric-value">&lt;200ms</span>
                  <span className="metric-label mono">WebSocket Latency</span>
                </div>
                <div className="metric-card">
                  <span className="metric-value">20+</span>
                  <span className="metric-label mono">Equities Streamed</span>
                </div>
                <div className="metric-card">
                  <span className="metric-value">+33.88%</span>
                  <span className="metric-label mono">Simulated Return</span>
                </div>
              </div>

              <div className="tc-actions-bar">
                <a
                  className="btn btn--glow"
                  href="https://tradecraft-rho-seven.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Launch App <ArrowUpRight size={16} weight="bold" />
                </a>
                <a
                  className="btn btn--ghost"
                  href="https://github.com/lizarawat/TradeCraft"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubLogo size={18} weight="bold" /> Code
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Height High-Realism Quantitative Trading Simulator */}
          <div className="tc-showcase__right">
            <CandleDemo />
          </div>
        </div>
      </div>
    </article>
  )
}
