import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import '@/styles/navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={`header-navbar navbar navbar-expand-lg bg-body-tertiary ${isOpen ? 'show' : ''}`}>
      <div className="container">
        <Link to="/my_portfolio/" className="navbar-brand d-flex justify-content-start">
          <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 100 100">
            <path fillRule="evenodd" d="M59.45 14.043c2.7.9 4.05 3.15 4.05 5.85l-17.1 63c-.9 1.8-2.7 3.15-4.5 3.15h-1.35c-2.7-.9-4.05-3.15-3.6-5.85l17.1-63c.45-2.25 3.15-3.6 5.4-3.15zm16.2 14.85l18 18c1.8 1.8 1.8 4.5 0 6.3l-18 18c-.9.9-2.25 1.35-3.15 1.35-.9 0-2.25-.45-3.15-1.35-1.8-1.8-1.8-4.5 0-6.3l14.85-14.85-14.85-14.85c-1.8-1.8-1.8-4.5 0-6.3 1.8-1.8 4.5-1.8 6.3 0zm-45 0c1.8 1.8 1.8 4.5 0 6.3L15.8 50.043l14.85 14.85c1.8 1.8 1.8 4.5 0 6.3-.9.9-1.8 1.35-3.15 1.35-1.35 0-2.25-.45-3.15-1.35l-18-18c-1.8-1.8-1.8-4.5 0-6.3l18-18c1.8-1.8 4.5-1.8 6.3 0z" clipRule="evenodd" />
          </svg>
          <span className="name_line--first">Emmanuel</span>
          <span className="name_line--last">Alcime</span>
        </Link>

        <button
          className="navbar-toggler"
          onClick={toggleNavbar}
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/my_portfolio/" className={`nav-link ${isActive('/my_portfolio/')}`}>
                <i className="fa-solid fa-house nav-link-icon" aria-hidden="true" />
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/my_portfolio/about" className={`nav-link ${isActive('/my_portfolio/about')}`}>
                <i className="fa-solid fa-user nav-link-icon" aria-hidden="true" />
                About Me
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/my_portfolio/projects" className={`nav-link ${isActive('/my_portfolio/projects')}`}>
                <i className="fa-solid fa-folder-open nav-link-icon" aria-hidden="true" />
                Projects
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/my_portfolio/services" className={`nav-link ${isActive('/my_portfolio/services')}`}>
                <i className="fa-solid fa-briefcase nav-link-icon" aria-hidden="true" />
                Services
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/my_portfolio/contact" className={`nav-link ${isActive('/my_portfolio/contact')}`}>
                <i className="fa-solid fa-envelope nav-link-icon" aria-hidden="true" />
                Contact Me
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/my_portfolio/resume" className={`contact_me_round btn btn-outline-success mt-1 ${isActive('/resume')}`}>
                <span className="contact_me_round__text">Resume</span>
              </Link>
            </li>

            <li className="nav-item d-flex align-items-center">
              <button
                type="button"
                className="theme-toggle btn btn-link p-2 me-2"
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
      </div>
    </nav>
  )
}

export default Navbar
