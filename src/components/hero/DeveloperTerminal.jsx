import { useState } from 'react'
import { motion } from 'motion/react'
import { TerminalWindow, Play, Sparkle, Code, Coffee } from '@phosphor-icons/react'
import { profile } from '../../data/profile.js'
import './terminal.css'

const COMMANDS = {
  status: [
    '● System Health: 100% Operational',
    '● CGPA: 8.85 / 10.0 (Lovely Professional University)',
    '● DSA Solved: 400+ (LeetCode & GeeksforGeeks)',
    '● Certifications: 16 Verified Credentials',
    '● Status: Open to Data Engineering & AI roles',
  ],
  stack: [
    '⚡ Core: Python, C++, SQL, TypeScript, Java',
    '📊 Data & ML: Pandas, NumPy, Scikit-learn, FinBERT, Gemini 2.5 Flash',
    '🛠️ Databases & Tools: PostgreSQL, MongoDB, WebSockets, Streamlit, Plotly',
  ],
  joke: [
    '☕ Dev Humor #42:',
    '"There are 10 types of people in the world: those who understand binary, and those who don\'t."',
    '"Why did the Data Engineer leave the party early? Too many unindexed joins!"',
  ],
  hire: [
    '🚀 Initializing recruitment protocol...',
    `Opening direct channel to ${profile.email}`,
    'Let\'s build something legendary together!',
  ],
}

export default function DeveloperTerminal() {
  const [activeCmd, setActiveCmd] = useState('status')
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([
    { cmd: 'liza --version', output: ['Liza Rawat v2026 • Data Engineering & AI/ML Specialist'] },
    { cmd: 'git status', output: ['On branch main. 400+ DSA problems solved. 0 null pointers in prod.'] },
  ])

  const runCommand = (cmdKey) => {
    setActiveCmd(cmdKey)
    const key = cmdKey.toLowerCase().trim()
    const result = COMMANDS[key] || [
      `Command not found: "${cmdKey}". Try: status, stack, joke, hire`,
    ]
    setHistory((prev) => [...prev.slice(-3), { cmd: cmdKey, output: result }])

    if (key === 'hire') {
      setTimeout(() => {
        window.location.href = `mailto:${profile.email}?subject=Interested%20in%20hiring%20Liza%20Rawat`
      }, 1000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputVal.trim()) return
    runCommand(inputVal)
    setInputVal('')
  }

  return (
    <motion.div
      className="dev-term"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <div className="dev-term__head">
        <div className="dev-term__dots">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="dev-term__title mono">
          <TerminalWindow size={14} weight="bold" />
          <span>liza@dev-station:~</span>
        </div>
        <span className="dev-term__live-pill mono">
          <span className="live-dot" /> LIVE
        </span>
      </div>

      <div className="dev-term__body mono">
        {history.map((h, i) => (
          <div key={i} className="dev-term__group">
            <div className="dev-term__prompt">
              <span className="prompt-sym">$</span>
              <span className="prompt-cmd">{h.cmd}</span>
            </div>
            <div className="dev-term__output">
              {h.output.map((line, j) => (
                <div key={j} className="output-line">
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="dev-term__input-line">
          <span className="prompt-sym">$</span>
          <input
            type="text"
            className="dev-term__input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'status', 'stack', 'joke', 'hire'..."
            aria-label="Interactive Terminal Input"
          />
          <button type="submit" className="dev-term__run-btn" aria-label="Run command">
            <Play size={12} weight="fill" />
          </button>
        </form>
      </div>

      <div className="dev-term__quick-actions">
        <span className="quick-label mono">Quick Run:</span>
        <button
          type="button"
          className={`quick-chip ${activeCmd === 'status' ? 'is-active' : ''}`}
          onClick={() => runCommand('status')}
        >
          <Sparkle size={12} weight="bold" /> status
        </button>
        <button
          type="button"
          className={`quick-chip ${activeCmd === 'stack' ? 'is-active' : ''}`}
          onClick={() => runCommand('stack')}
        >
          <Code size={12} weight="bold" /> stack
        </button>
        <button
          type="button"
          className={`quick-chip ${activeCmd === 'joke' ? 'is-active' : ''}`}
          onClick={() => runCommand('joke')}
        >
          <Coffee size={12} weight="bold" /> joke
        </button>
        <button
          type="button"
          className={`quick-chip quick-chip--highlight ${activeCmd === 'hire' ? 'is-active' : ''}`}
          onClick={() => runCommand('hire')}
        >
          🚀 hire
        </button>
      </div>
    </motion.div>
  )
}
