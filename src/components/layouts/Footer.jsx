import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-section">
      <div className="container py-5">
        <div className="row mb-5">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="footer-title">Emmanuel Alcime</h5>
            <p className="footer-description">
              Full Stack Developer passionate about building high-performance web and mobile applications. 
              Specializing in React, PHP, and Kotlin development.
            </p>
            <p className="footer-contact">
              <strong><i className="fas fa-envelope"></i> Email:</strong> <a href="mailto:emmanuelalcime54@gmail.com">emmanuelalcime54@gmail.com</a>
              <br />
              <strong><i className="fas fa-phone"></i> Phone:</strong> <a href="tel:+1-242-458-5919">+1-242-458-5919</a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="footer-title"><i className="fas fa-link"></i> Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/my_portfolio/">Home</Link></li>
              <li><Link to="/my_portfolio/about">About Me</Link></li>
              <li><Link to="/my_portfolio/projects">Projects</Link></li>
              <li><Link to="/my_portfolio/resume">Resume</Link></li>
              <li><Link to="/my_portfolio/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="footer-title"><i className="fas fa-briefcase"></i> Services</h5>
            <ul className="footer-links">
              <li><Link to="/my_portfolio/services#web-development">Web Development</Link></li>
              <li><Link to="/my_portfolio/services#mobile-development">Mobile Apps</Link></li>
              <li><Link to="/my_portfolio/services#wordpress-solutions">WordPress Solutions</Link></li>
              <li><Link to="/my_portfolio/services#consulting">Consultation</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-lg-4 col-md-6">
            <h5 className="footer-title"><i className="fas fa-share-alt"></i> Connect With Me</h5>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/emmanuel-alcime-564178209/" className="footer-social-icon" title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/EmmanuelAlcime" className="footer-social-icon" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              {/* <a href="#twitter" className="footer-social-icon" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#instagram" className="footer-social-icon" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a> */}
            </div>
            <p className="footer-description mt-3">
              Let's connect! Feel free to reach out on any of my social platforms.
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Bottom Section */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="footer-bottom">
              © {currentYear} Emmanuel Alcime. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            {/* <ul className="footer-bottom-links">
              <li><a href="#privacy"><i className="fas fa-shield-alt"></i> Privacy Policy</a></li>
              <li><a href="#terms"><i className="fas fa-file-contract"></i> Terms of Service</a></li>
              <li><a href="#sitemap"><i className="fas fa-sitemap"></i> Sitemap</a></li>
            </ul> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer