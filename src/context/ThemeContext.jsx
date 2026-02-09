import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'dark', setTheme: () => {} })

const STORAGE_KEY = 'portfolio-theme'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem(STORAGE_KEY) || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement

    // Add transition class before changing theme
    root.classList.add('theme-transitioning')

    if (theme === 'light') {
      root.setAttribute('data-theme', 'light')
      root.setAttribute('data-bs-theme', 'light')
    } else {
      root.removeAttribute('data-theme')
      root.setAttribute('data-bs-theme', 'dark')
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
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
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
