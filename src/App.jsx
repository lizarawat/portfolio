import { MotionConfig, useReducedMotion } from 'motion/react'
import { ThemeContext, useThemeState } from './hooks/useTheme.js'
import { useLenis } from './hooks/useLenis.js'
import Nav from './components/chrome/Nav.jsx'
import Hero from './components/hero/Hero.jsx'
import Ticker from './components/stats/Ticker.jsx'
import Stats from './components/stats/Stats.jsx'
import Work from './components/work/Work.jsx'
import TypeCase from './components/skills/TypeCase.jsx'
import Record from './components/record/Record.jsx'
import Credentials from './components/creds/Credentials.jsx'
import Contact from './components/contact/Contact.jsx'
import Footer from './components/contact/Footer.jsx'

export default function App() {
  const themeState = useThemeState()
  const reduce = useReducedMotion()
  useLenis(!reduce)

  return (
    <ThemeContext.Provider value={themeState}>
      <MotionConfig reducedMotion="user">
        <a className="skip" href="#work">Skip to work</a>
        <Nav />
        <main>
          <Hero />
          <Ticker />
          <Stats />
          <Work />
          <TypeCase />
          <Record />
          <Credentials />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </ThemeContext.Provider>
  )
}
