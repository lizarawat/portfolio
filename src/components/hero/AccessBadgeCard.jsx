import { useState } from 'react'
import { profile } from '../../data/profile.js'
import './badgecard.css'

export default function AccessBadgeCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="badge-container">

      <div
        className="badge-card"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-label="Access Pass Badge Card. Hover or tap to flip for contact info"
      >
        <div className={`badge-card__inner ${isFlipped ? 'is-flipped' : ''}`}>
          {/* FRONT FACE */}
          <div className="badge-card__face badge-card__front">
            <div className="badge-header mono">
              <div className="badge-logo">
                <span className="logo-box">lr</span>
                <span className="logo-domain">lizarawat.dev</span>
              </div>
              <span className="pass-type">ACCESS PASS</span>
            </div>

            <div className="badge-photo-box">
              <img src={profile.photo || '/liza.jpg'} alt={profile.name} className="badge-photo" />
              <div className="work-status-tag mono">
                <span className="status-dot" /> open to work
              </div>
            </div>

            <div className="badge-identity">
              <h2 className="badge-name">{profile.name}</h2>
              <p className="badge-role">{profile.role}</p>
            </div>

            <div className="badge-grid mono">
              <div className="grid-cell">
                <span className="cell-lbl">DEPT</span>
                <span className="cell-val">Data & AI</span>
              </div>
              <div className="grid-cell">
                <span className="cell-lbl">BASE</span>
                <span className="cell-val">Phagwara, IN</span>
              </div>
              <div className="grid-cell">
                <span className="cell-lbl">EDU</span>
                <span className="cell-val">B.Tech CSE - LPU</span>
              </div>
              <div className="grid-cell">
                <span className="cell-lbl">CGPA</span>
                <span className="cell-val">8.85 / 10</span>
              </div>
              <div className="grid-cell">
                <span className="cell-lbl">DSA</span>
                <span className="cell-val">400+ Solved</span>
              </div>
              <div className="grid-cell">
                <span className="cell-lbl">RECORDS</span>
                <span className="cell-val">1.21B Processed</span>
              </div>
            </div>

            <div className="badge-footer mono">
              <span className="clearance-lbl">CLEARANCE</span>
              <div className="tech-icons">
                <span>PY</span>
                <span>SQL</span>
                <span>C++</span>
                <span>AI</span>
              </div>
            </div>

            <div className="badge-barcode mono">
              <div className="barcode-lines" aria-hidden="true" />
              <span className="barcode-text">ID • LIZARAWAT • SINCE 2024</span>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="badge-card__face badge-card__back">
            <div className="back-notice">
              <h3 className="notice-title">
                If found, please return to a <span className="highlight-text">hiring manager.</span>
              </h3>
            </div>

            <div className="back-contact-list mono">
              <div className="contact-row">
                <span className="row-lbl">EMAIL</span>
                <a href={`mailto:${profile.email}`} className="row-val">
                  {profile.email}
                </a>
              </div>
              <div className="contact-row">
                <span className="row-lbl">GITHUB</span>
                <a href={profile.github} target="_blank" rel="noreferrer" className="row-val">
                  github.com/lizarawat
                </a>
              </div>
              <div className="contact-row">
                <span className="row-lbl">LINKEDIN</span>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="row-val">
                  in/liza-rawat-912975352
                </a>
              </div>
            </div>

            <div className="back-certs mono">
              <span className="certs-lbl">VERIFIED CERTS</span>
              <div className="certs-badges">
                <span className="cert-pill">ORACLE</span>
                <span className="cert-pill">MONGODB</span>
                <span className="cert-pill">NASSCOM</span>
                <span className="cert-pill">UDEMY</span>
              </div>
            </div>

            <div className="back-signature-box">
              <span className="signature-font">Liza Rawat</span>
              <span className="signature-sub mono">AUTHORISED SIGNATURE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
