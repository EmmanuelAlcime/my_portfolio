import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import '@/styles/navbar.css'

const navItems = [
  { to: '/my_portfolio/', icon: 'fa-solid fa-house', label: 'Home' },
  { to: '/my_portfolio/about', icon: 'fa-solid fa-user', label: 'About Me' },
  { to: '/my_portfolio/projects', icon: 'fa-solid fa-folder-open', label: 'Projects' },
  { to: '/my_portfolio/services', icon: 'fa-solid fa-briefcase', label: 'Services' },
  { to: '/my_portfolio/contact', icon: 'fa-solid fa-envelope', label: 'Contact Me' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close overlay on browser back/forward navigation
  useEffect(() => {
    const onPopState = () => setIsOpen(false)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const isActive = (path) => location.pathname === path

  const closeNavbar = useCallback(() => setIsOpen(false), [])
  const toggleNavbar = useCallback(() => setIsOpen(prev => !prev), [])

  return (
    <>
      <nav className={`header-navbar navbar navbar-expand-lg bg-body-tertiary ${isSticky ? 'sticky' : ''}`}>
        <div className="container">
          <Link to="/my_portfolio/" className="navbar-brand d-flex justify-content-start" onClick={closeNavbar}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 100 100">
              <path fillRule="evenodd" d="M59.45 14.043c2.7.9 4.05 3.15 4.05 5.85l-17.1 63c-.9 1.8-2.7 3.15-4.5 3.15h-1.35c-2.7-.9-4.05-3.15-3.6-5.85l17.1-63c.45-2.25 3.15-3.6 5.4-3.15zm16.2 14.85l18 18c1.8 1.8 1.8 4.5 0 6.3l-18 18c-.9.9-2.25 1.35-3.15 1.35-.9 0-2.25-.45-3.15-1.35-1.8-1.8-1.8-4.5 0-6.3l14.85-14.85-14.85-14.85c-1.8-1.8-1.8-4.5 0-6.3 1.8-1.8 4.5-1.8 6.3 0zm-45 0c1.8 1.8 1.8 4.5 0 6.3L15.8 50.043l14.85 14.85c1.8 1.8 1.8 4.5 0 6.3-.9.9-1.8 1.35-3.15 1.35-1.35 0-2.25-.45-3.15-1.35l-18-18c-1.8-1.8-1.8-4.5 0-6.3l18-18c1.8-1.8 4.5-1.8 6.3 0z" clipRule="evenodd" />
            </svg>
            <span className="name_line--first">Emmanuel</span>
            <span className="name_line--last">Alcime</span>
          </Link>

          {/* Desktop nav */}
          <div className="desktop-nav collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li key={item.to} className="nav-item">
                  <Link
                    to={item.to}
                    className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
                    onClick={closeNavbar}
                  >
                    <i className={`${item.icon} nav-link-icon`} aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                <Link to="/my_portfolio/resume" className="contact_me_round btn btn-outline-success mt-1" onClick={closeNavbar}>
                  <span className="contact_me_round__text">Resume</span>
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center ms-3">
                <button
                  type="button"
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                >
                  {theme === 'dark' ? (
                    <i className="fa-solid fa-sun" aria-hidden="true" />
                  ) : (
                    <i className="fa-solid fa-moon" aria-hidden="true" />
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`navbar-toggler hamburger ${isOpen ? 'open' : ''}`}
            onClick={toggleNavbar}
            type="button"
            aria-controls="mobileNavOverlay"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-line hamburger-line--top" />
            <span className="hamburger-line hamburger-line--middle" />
            <span className="hamburger-line hamburger-line--bottom" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu (outside nav to avoid fixed-in-fixed issues) */}
      <div className={`nav-overlay ${isOpen ? 'nav-overlay--open' : ''}`} id="mobileNavOverlay">
        <div className="nav-overlay-backdrop" onClick={closeNavbar} />
        <div className="nav-overlay-panel">
          <div className="nav-overlay-header">
            <button
              type="button"
              className="nav-overlay-close"
              onClick={closeNavbar}
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <ul className="nav-overlay-links">
            {navItems.map((item, i) => (
              <li key={item.to} className="nav-overlay-item" style={{ '--i': i }}>
                <Link
                  to={item.to}
                  className={`nav-overlay-link ${isActive(item.to) ? 'active' : ''}`}
                  onClick={closeNavbar}
                >
                  <i className={item.icon} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li className="nav-overlay-item" style={{ '--i': navItems.length }}>
              <Link
                to="/my_portfolio/resume"
                className="nav-overlay-link nav-overlay-link--resume"
                onClick={closeNavbar}
              >
                <i className="fa-solid fa-file-lines" aria-hidden="true" />
                <span>Resume</span>
              </Link>
            </li>
          </ul>
          <div className="nav-overlay-footer">
            <button
              type="button"
              className="nav-overlay-theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <><i className="fa-solid fa-sun" /> Light Mode</>
              ) : (
                <><i className="fa-solid fa-moon" /> Dark Mode</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
