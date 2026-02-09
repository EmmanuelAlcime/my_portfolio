import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import particlesConfig from '@/assets/particles.json'
import aliv_business_image from '@/assets/aliv_business_website.png'
import inspire_her_image from '@/assets/inspire_her_website.png'
import cash_n_go_image from '@/assets/cash_n_go_website.png'
import lacouperetrouvailles_image from '@/assets/lacouperetrouvailles_website.png'
const recentProjects = [
  {
    id: 1,
    title: "Aliv Business Website",
    link: "https://alivbusiness.com/",
    image: aliv_business_image
  },
  {
    id: 2,
    title: "Inspire Her Conference",
    link: "https://inspireher.cablebahamas.com/#become-a-sponsor-form",
    image: inspire_her_image
  },
  {
    id: 3,
    title: "Cash N' Go Website",
    link: "https://cashngobahamas.com/",
    image: cash_n_go_image
  },
  {
    id: 4,
    title: "L'a Coupe Retrouvaille",
    link: "https://lacouperetrouvailles.org/",
    image: lacouperetrouvailles_image
  }
]

const SCROLL_SPEED = 4
const SCROLL_INTERVAL_MS = 16

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState({ submitted: false, loading: false, error: null })
  const sliderRef = useRef(null)
  const scrollIntervalRef = useRef(null)

  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }
  }

  const startScroll = (direction) => {
    stopScroll()
    scrollIntervalRef.current = setInterval(() => {
      if (sliderRef.current) {
        const delta = direction === 'left' ? -SCROLL_SPEED : SCROLL_SPEED
        sliderRef.current.scrollLeft += delta
      }
    }, SCROLL_INTERVAL_MS)
  }

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async () => {}, [])

  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ submitted: false, loading: true, error: null })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setFormStatus({ submitted: true, loading: false, error: null })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setFormStatus(prev => ({ ...prev, submitted: false })), 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch {
      setFormStatus({ submitted: false, loading: false, error: 'Failed to send. Please try again or contact me directly.' })
    }
  }

  return (
    <>
      {/* Hero: particles only inside this section */}
      <div className="hero-container">
        <div className="hero-particles-wrapper" aria-hidden="true">
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              ...particlesConfig,
              fullScreen: { enable: false }
            }}
            className="particles-background"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="col-md-8 hero-content">
          <h1>
            Hey, I'm <span className="hero-name">Emmanuel Alcime.</span>
          </h1>
          <h2 className="display-5">I Build Cool <span className="theme-name">Android Apps</span> and <span className="theme-name">Websites</span>.</h2>
          <p>
            I'm a software developer with a focus on front-end and back-end web
            development, cross platform app development, and native Android development.
          </p>
          <button type="button" className="contact_me_round btn btn-outline-success hero-button" onClick={scrollToContact}>
            <span className="contact_me_round__text">Get In Touch</span>
          </button>
        </div>
      </div>

      {/* Recent Projects – horizontal thumbnail slider */}
      <section className="home-section recent-projects-section" style={carouselStyle}>
        <div className="container py-5">
          <h2 className="home-section-heading">Recent <span className="theme-name">Projects</span>  </h2>
          <div className="recent-projects-slider-wrap">
            <button
              type="button"
              className="recent-projects-arrow recent-projects-arrow-left"
              aria-label="Scroll left"
              onMouseEnter={() => startScroll('left')}
              onMouseLeave={stopScroll}
            >
              <i className="fas fa-chevron-left" />
            </button>
            <div className="recent-projects-slider" ref={sliderRef}>
              {recentProjects.map((proj) => (
                <a
                  key={proj.id}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="recent-project-thumb"
                >
                  <img src={proj.image} alt={proj.title} className="recent-project-thumb-img" />
                  <span className="recent-project-thumb-title">{proj.title}</span>
                </a>
              ))}
            </div>
           
            <button
              type="button"
              className="recent-projects-arrow recent-projects-arrow-right"
              aria-label="Scroll right"
              onMouseEnter={() => startScroll('right')}
              onMouseLeave={stopScroll}
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
          <div className="text-center mt-4">
            <Link to="/my_portfolio/projects" className="btn btn-outline-primary">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* My Contributions Section */}
      <section className="home-section contributions-section">
        <div className="container py-5">
          <h2 className="home-section-heading">My <span className="theme-name">Contributions</span></h2>
          
          <div className="contributions-grid">
            {/* Government Projects */}
            <div className="contributions-category">
              <div className="category-header">
                <div className="category-icon">
                  <i className="fas fa-building"></i>
                </div>
                <h3>Government Digital Transformation Unit</h3>
                <p className="category-subtitle">Part of the DTU Dev Team</p>
              </div>
              
              <div className="contributions-cards">
                <div className="contribution-card">
                  <div className="card-header">
                    <i className="fas fa-certificate"></i>
                    <h4>CertifiedPros</h4>
                  </div>
                  <p className="card-description">
                    Professional certification and credential verification platform for government professionals. Built secure authentication and role-based access systems.
                  </p>
                  <div className="contribution-tags">
                    <span className="contrib-tag">React</span>
                    <span className="contrib-tag">Laravel</span>
                    <span className="contrib-tag">InertiaJS</span>       
                  </div>
                </div>

                <div className="contribution-card">
                  <div className="card-header">
                    <i className="fas fa-book"></i>
                    <h4>Policy Registry</h4>
                  </div>
                  <p className="card-description">
                    Comprehensive government insurance policies registration and management system. Implemented advanced search, versioning, and approval workflows.
                  </p>
                  <div className="contribution-tags">
                    <span className="contrib-tag">HTML5</span>
                    <span className="contrib-tag">MySQL</span>
                    <span className="contrib-tag">CSS3</span>
                    <span className="contrib-tag">JavaScript</span>
                    <span className="contrib-tag">PHP</span>
                  </div>
                </div>

                <div className="contribution-card">
                  <div className="card-header">
                    <i className="fas fa-landmark"></i>
                    <h4>B.T.A.G Website</h4>
                  </div>
                  <p className="card-description">
                    Government agency website with public information portal. Developed responsive design with government compliance standards and accessibility features.
                  </p>
                  <div className="contribution-tags">
                    <span className="contrib-tag">React</span>
                    <span className="contrib-tag">Laravel</span>
                    {/* <span className="contrib-tag">Accessibility</span> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Private Sector Updates */}
            <div className="contributions-category">
              <div className="category-header">
                <div className="category-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <h3>Private Sector Updates & Improvements</h3>
                <p className="category-subtitle">Product Development & Enhancement</p>
              </div>
              
              <div className="contributions-cards">
                <div className="contribution-card">
                  <div className="card-header">
                    <i className="fas fa-mobile-alt"></i>
                    <h4>Be aliv Website Updates</h4>
                  </div>
                  <p className="card-description">
                  Aliv Mobile's main website.
                  </p>
                  <div className="contribution-tags">
                    <span className="contrib-tag">WordPress</span>
                    {/* <span className="contrib-tag">Performance</span>
                    <span className="contrib-tag">UX/UI</span> */}
                  </div>
                </div>

                <div className="contribution-card">
                  <div className="card-header">
                    <i className="fas fa-sync-alt"></i>
                    <h4>Rev.bs Website Updates</h4>
                  </div>
                  <p className="card-description">
                  Cable Bahamas main website.
                  </p>
                  <div className="contribution-tags">
                    <span className="contrib-tag">WordPress</span>
                    {/* <span className="contrib-tag">API</span>
                    <span className="contrib-tag">DevOps</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contributions-summary">
            <div className="summary-card">
              <div className="summary-icon">
                <i className="fas fa-code-branch"></i>
              </div>
              <h5>Collaborative Development</h5>
              <p>Worked with cross-functional teams on mission-critical government and enterprise projects</p>
            </div>
            <div className="summary-card">
              <div className="summary-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <h5>Quality Assurance</h5>
              <p>Implemented rigorous testing, code reviews, and deployment pipelines for production systems</p>
            </div>
            <div className="summary-card">
              <div className="summary-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h5>Continuous Improvement</h5>
              <p>Contributed innovative solutions and technical improvements to existing platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="home-section home-contact-section">
        <div className="container py-5">
          <h2 className="home-section-heading">Get <span className="theme-name">In Touch</span></h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form-wrapper">
                <h3 className="form-title">Send Me a Message</h3>
                {formStatus.submitted && (
                  <div className="alert alert-success">
                    <i className="fas fa-check-circle" /> Thank you! I'll get back to you soon.
                  </div>
                )}
                {formStatus.error && (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-circle" /> {formStatus.error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="home-name" className="form-label"><i className="fas fa-user" /> Name</label>
                      <input type="text" className="form-control form-control-lg" id="home-name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="home-email" className="form-label"><i className="fas fa-envelope" /> Email</label>
                      <input type="email" className="form-control form-control-lg" id="home-email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="home-subject" className="form-label"><i className="fas fa-heading" /> Subject</label>
                    <input type="text" className="form-control form-control-lg" id="home-subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="home-message" className="form-label"><i className="fas fa-comment" /> Message</label>
                    <textarea className="form-control form-control-lg" id="home-message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message..." rows="5" required />
                  </div>
                  <button type="submit" className="btn btn-outline-success btn-lg w-100" disabled={formStatus.loading}>
                    <i className="fas fa-paper-plane" /> {formStatus.loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <p className="text-center mt-3">
            <Link to="/my_portfolio/contact">Go to full Contact page</Link> for more options.
          </p>
        </div>
      </section>
    </>
  )
}


const carouselStyle = {
  backgroundColor: 'var(--card-bg)',

}


export default Home