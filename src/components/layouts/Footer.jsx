import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navigationLinks = [
  { to: '/my_portfolio/', label: 'Home' },
  { to: '/my_portfolio/about', label: 'About Me' },
  { to: '/my_portfolio/projects', label: 'Projects' },
  { to: '/my_portfolio/resume', label: 'Resume' },
  { to: '/my_portfolio/contact', label: 'Contact' },
]

const serviceLinks = [
  { to: '/my_portfolio/services#web-development', label: 'Web Development' },
  { to: '/my_portfolio/services#mobile-development', label: 'Mobile Apps' },
  { to: '/my_portfolio/services#wordpress-solutions', label: 'WordPress Solutions' },
  { to: '/my_portfolio/services#consulting', label: 'Consultation' },
]

const socialLinks = [
  { href: 'https://www.linkedin.com/in/emmanuel-alcime-564178209/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  { href: 'https://github.com/EmmanuelAlcime', icon: 'fab fa-github', label: 'GitHub' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const location = useLocation()

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      window.location.href = `/my_portfolio/contact?subject=Newsletter%20Signup&body=I%27d%20like%20to%20subscribe%3A%20${encodeURIComponent(email)}`
    }
  }

  return (
    <footer className="footer-section">
      <div className="footer-gradient-bar" />

      <div className="container">
        <div className="footer-grid">
          {/* Brand & Description */}
          <div className="footer-col footer-brand">
            <Link to="/my_portfolio/" className="footer-logo">
              {'<'}
              <span className="theme-name">EA</span>
              {' />'}
            </Link>
            <p className="footer-description">
              Full Stack Developer passionate about building high-performance web and mobile applications.
            </p>
            <div className="footer-contact-list">
              <a href="mailto:emmanuelalcime54@gmail.com" className="footer-contact-item">
                <span className="footer-contact-icon"><i className="fas fa-envelope" /></span>
                <span>emmanuelalcime54@gmail.com</span>
              </a>
              <a href="tel:+1-242-458-5919" className="footer-contact-item">
                <span className="footer-contact-icon"><i className="fas fa-phone" /></span>
                <span>+1-242-458-5919</span>
              </a>
              <span className="footer-contact-item">
                <span className="footer-contact-icon"><i className="fas fa-map-marker-alt" /></span>
                <span>Nassau, Bahamas</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={location.pathname === link.to ? 'active' : ''}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h5 className="footer-title">Services</h5>
            <ul className="footer-links">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Newsletter */}
          <div className="footer-col footer-connect">
            <h5 className="footer-title">Connect</h5>
            <div className="footer-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="footer-social-icon"
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
            <p className="footer-newsletter-label">Get in touch</p>
            <form className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="footer-newsletter-input"
                placeholder="Your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-newsletter-btn" aria-label="Send">
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom-wrapper">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {currentYear} Emmanuel Alcime. All rights reserved.
            </p>
            <p className="footer-built-with">
              Built with <i className="fas fa-heart" /> using React
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
