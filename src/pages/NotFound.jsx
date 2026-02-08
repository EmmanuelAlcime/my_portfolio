import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-message">
          Oops! Looks like you've ventured into uncharted territory. 
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="notfound-animation">
          <div className="floating-icon">
            <i className="fas fa-map"></i>
          </div>
        </div>

        <div className="notfound-actions">
          <button 
            className="btn btn-outline-success btn-lg"
            onClick={() => navigate('/')}
          >
            <i className="fas fa-home"></i> Back to Home
          </button>
          <button 
            className="btn btn-outline-secondary btn-lg ms-2"
            onClick={() => navigate('/projects')}
          >
            <i className="fas fa-folder-open"></i> View Projects
          </button>
        </div>

        <div className="notfound-suggestions">
          <h3>What would you like to do?</h3>
          <div className="suggestion-links">
            <a href="/" className="suggestion-item">
              <span className="suggestion-icon">
                <i className="fas fa-house-user"></i>
              </span>
              <span className="suggestion-text">Home</span>
            </a>
            <a href="/about" className="suggestion-item">
              <span className="suggestion-icon">
                <i className="fas fa-user-circle"></i>
              </span>
              <span className="suggestion-text">About Me</span>
            </a>
            <a href="/projects" className="suggestion-item">
              <span className="suggestion-icon">
                <i className="fas fa-briefcase"></i>
              </span>
              <span className="suggestion-text">Projects</span>
            </a>
            <a href="/services" className="suggestion-item">
              <span className="suggestion-icon">
                <i className="fas fa-concierge-bell"></i>
              </span>
              <span className="suggestion-text">Services</span>
            </a>
            <a href="/resume" className="suggestion-item">
              <span className="suggestion-icon">
                <i className="fas fa-file-pdf"></i>
              </span>
              <span className="suggestion-text">Resume</span>
            </a>
            <a href="/contact" className="suggestion-item">
              <span className="suggestion-icon">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="suggestion-text">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound