import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', setTheme: () => {} })

const STORAGE_KEY = 'portfolio-theme'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem(STORAGE_KEY) || 'light'
  })

  useEffect(() => {
    const root = document.documentElement

    // Add transition class before changing theme
    root.classList.add('theme-transitioning')

    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
      root.setAttribute('data-bs-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
      root.setAttribute('data-bs-theme', 'light')
    }

    // Update meta theme-color for mobile status bar
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#f0f2f5' : '#050505')
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch (_) {}

    // Remove transition class after animation completes
    setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 300)
  }, [theme])

  const setTheme = (next) => {
    setThemeState(typeof next === 'function' ? next(theme) : next)
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
