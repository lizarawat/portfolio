import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const KEY = 'lr-theme'

function readStored() {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

export const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

export function useThemeState() {
  // Light paper is the default; dark only when the visitor switches.
  const [stored, setStored] = useState(readStored)
  const theme = stored ?? 'light'

  useEffect(() => {
    if (stored) document.documentElement.dataset.theme = stored
    else delete document.documentElement.dataset.theme
  }, [stored])

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    // Set before re-render: useInks reads the CSS variables during render.
    document.documentElement.dataset.theme = next
    setStored(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* storage blocked: theme still switches for this visit */
    }
  }, [theme])

  return useMemo(() => ({ theme, toggle }), [theme, toggle])
}

export const useTheme = () => useContext(ThemeContext)

// Resolved ink colours for canvas drawing; re-read whenever the theme flips.
export function useInks() {
  const { theme } = useTheme()
  return useMemo(() => {
    const cs = getComputedStyle(document.documentElement)
    const v = (n) => cs.getPropertyValue(n).trim()
    return {
      theme,
      paper: v('--paper'),
      paper2: v('--paper-2'),
      ink: v('--ink'),
      ink2: v('--ink-2'),
      ink3: v('--ink-3'),
      rule: v('--rule'),
      pink: v('--pink'),
      blue: v('--blue'),
      blend: theme === 'dark' ? 'screen' : 'multiply',
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])
}
