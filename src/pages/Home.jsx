import React, { useCallback, useRef, useState, useEffect } from 'react'
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
        subtitle: "Telecommunications",
        link: "https://alivbusiness.com/",
        image: aliv_business_image,
        technologies: ["HTML5", "Bootstrap 5", "JavaScript", "PHP"]
    },
    {
        id: 2,
        title: "Inspire Her Conference",
        subtitle: "Event platform",
        link: "https://inspireher.cablebahamas.com/#become-a-sponsor-form",
        image: inspire_her_image,
        technologies: ["HTML5", "Bootstrap 5", "JavaScript", "PHP"]
    },
    {
        id: 3,
        title: "Cash N' Go Website",
        subtitle: "Financial services",
        link: "https://cashngobahamas.com/",
        image: cash_n_go_image,
        technologies: ["HTML5", "Bootstrap 5", "JavaScript", "PHP"]
    },
    {
        id: 4,
        title: "L'a Coupe Retrouvaille",
        subtitle: "Non-profit",
        link: "https://lacouperetrouvailles.org/",
        image: lacouperetrouvailles_image,
        technologies: ["React", "Laravel", "MySQL"]
    }
]

const SCROLL_SPEED = 4
const SCROLL_INTERVAL_MS = 16
const AUTO_SCROLL_SPEED = 1
const AUTO_SCROLL_INTERVAL_MS = 50

const HOME_DUPLICATE_FACTOR = 3 // Duplicate items 3x for smoother infinite scroll

/** Ensures image src is an absolute URL - fixes broken images after client-side navigation */
const toAbsoluteAssetUrl = (url) => {
    if (!url || typeof url !== 'string') return url
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    const base = window.location.origin + (import.meta.env.BASE_URL || '/')
    return new URL(url, base).href
}

const Home = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [formStatus, setFormStatus] = useState({ submitted: false, loading: false, error: null })
    const sliderRef = useRef(null)
    const scrollIntervalRef = useRef(null)
    const autoScrollIntervalRef = useRef(null)
    const [isAutoScrolling, setIsAutoScrolling] = useState(false)
    const [userInteracting, setUserInteracting] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [showContactModal, setShowContactModal] = useState(false)

    const getItemWidth = useCallback(() => {
        if (sliderRef.current) {
            const firstItem = sliderRef.current.querySelector('.project-slide-card')
            if (firstItem) {
                const itemWidth = firstItem.offsetWidth
                const itemMargin = parseInt(window.getComputedStyle(firstItem).marginRight) || 0
                const itemGap = parseInt(window.getComputedStyle(sliderRef.current).gap) || 0
                return itemWidth + itemMargin + itemGap
            }
        }
        return 0
    }, [])

    const stopAllScroll = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current)
            scrollIntervalRef.current = null
        }
    }

    const stopAutoScroll = () => {
        if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current)
            autoScrollIntervalRef.current = null
            setIsAutoScrolling(false)
        }
    }

    const resetScrollPosition = useCallback(() => {
        if (sliderRef.current) {
            const slider = sliderRef.current
            const itemTotalWidth = getItemWidth()
            if (itemTotalWidth > 0) {
                const firstSetWidth = itemTotalWidth * recentProjects.length
                // Seamless loop: when we pass one full set, jump back to maintain position
                if (slider.scrollLeft >= firstSetWidth) {
                    slider.scrollLeft -= firstSetWidth
                }
            }
        }
    }, [getItemWidth])

    const snapToElement = useCallback((direction) => {
        if (sliderRef.current) {
            const slider = sliderRef.current
            const allItems = slider.querySelectorAll('.project-slide-card')

            if (allItems.length === 0) return

            const itemTotalWidth = getItemWidth()
            if (itemTotalWidth === 0) return

            // Find current visible item index
            let currentIndex = Math.round(slider.scrollLeft / itemTotalWidth)

            // Calculate next index based on direction
            let nextIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1

            // Ensure we don't go out of bounds (wrap around for infinite scroll)
            const maxIndex = allItems.length - 1
            if (nextIndex > maxIndex) {
                nextIndex = 0
                slider.scrollLeft = 0
            } else if (nextIndex < 0) {
                nextIndex = maxIndex
            }

            const nextElement = allItems[nextIndex]

            if (nextElement) {
                // Use scrollIntoView for precise positioning
                nextElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                })

                setTimeout(() => resetScrollPosition(), 500)
            }
        }
    }, [getItemWidth, resetScrollPosition])

    const startAutoScroll = useCallback(() => {
        stopAutoScroll()
        setIsAutoScrolling(true)
        autoScrollIntervalRef.current = setInterval(() => {
            if (sliderRef.current) {
                const slider = sliderRef.current
                slider.scrollLeft += AUTO_SCROLL_SPEED
                resetScrollPosition()
            }
        }, AUTO_SCROLL_INTERVAL_MS)
    }, [resetScrollPosition])

    const resumeAutoScroll = useCallback(() => {
        const timeoutId = setTimeout(() => {
            setUserInteracting(false)
            startAutoScroll()
        }, 3000)
        return () => clearTimeout(timeoutId)
    }, [startAutoScroll])

    const handleScrollButton = useCallback((direction) => {
        stopAutoScroll()
        stopAllScroll()
        setUserInteracting(true)
        snapToElement(direction)
        resumeAutoScroll()
    }, [snapToElement, resumeAutoScroll])

    useEffect(() => {
        return () => {
            stopAutoScroll()
            stopAllScroll()
        }
    }, [])

    // Scroll progress for progress bar
    useEffect(() => {
        const el = sliderRef.current
        if (!el) return
        const updateProgress = () => {
            const { scrollLeft, scrollWidth, clientWidth } = el
            const maxScroll = scrollWidth - clientWidth
            setScrollProgress(maxScroll <= 0 ? 100 : (scrollLeft / maxScroll) * 100)
        }
        updateProgress()
        el.addEventListener('scroll', updateProgress)
        window.addEventListener('resize', updateProgress)
        return () => {
            el.removeEventListener('scroll', updateProgress)
            window.removeEventListener('resize', updateProgress)
        }
    }, [])

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine)
    }, [])

    const particlesLoaded = useCallback(async () => {}, [])

    const scrollToContact = () => {
        setShowContactModal(false)
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (!showContactModal) return
        const onKeyDown = (e) => { if (e.key === 'Escape') setShowContactModal(false) }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [showContactModal])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormStatus({ submitted: false, loading: true, error: null })

        // Mock sending message with 1.5 second delay
        setTimeout(() => {
            setFormStatus({ submitted: true, loading: false, error: null })
            setFormData({ name: '', email: '', subject: '', message: '' })
            setTimeout(() => setFormStatus(prev => ({ ...prev, submitted: false })), 5000)
        }, 1500)
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
                <div className="hero-content">
                    <div className="hero-content-inner">
                        <p className="hero-tagline">Full-stack developer &amp; mobile app builder</p>
                        <h1 className="hero-title">
                            Hey, I'm <span className="hero-name">Emmanuel Alcime.</span>
                        </h1>
                        <h2 className="hero-headline">I build <span className="theme-name">Android apps</span> and <span className="theme-name">websites</span> that deliver.</h2>
                        <p className="hero-subtitle">
                            I'm a software developer focused on front-end and back-end web development,
                            cross-platform apps, and native Android. Let's build something together.
                        </p>
                        <div className="hero-cta-row">
                            <button type="button" className="hero-btn hero-btn-primary" onClick={() => setShowContactModal(true)}>
                                Get In Touch
                            </button>
                            <Link to="/my_portfolio/projects" className="hero-btn hero-btn-outline">
                                View My Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Get In Touch modal */}
            {showContactModal && (
                <div className="contact-modal-overlay" onClick={() => setShowContactModal(false)} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
                    <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="contact-modal-close" onClick={() => setShowContactModal(false)} aria-label="Close">
                            <i className="fas fa-times" />
                        </button>
                        <h3 id="contact-modal-title" className="contact-modal-title">Get In Touch</h3>
                        <p className="contact-modal-subtitle">Choose how you&apos;d like to reach out</p>
                        <div className="contact-modal-options">
                            <a href="tel:+12424585919" className="contact-modal-option" onClick={() => setShowContactModal(false)}>
                                <i className="fas fa-phone" />
                                <span>Call +1 (242) 458-5919</span>
                            </a>
                            <button type="button" className="contact-modal-option" onClick={scrollToContact}>
                                <i className="fas fa-envelope" />
                                <span>Send a Message</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Projects – reference-style slider with overlay cards */}
            <section className="home-section recent-projects-section dev-slider" style={carouselStyle}>
                <div className="container py-5 control-slider">
                    <h2 className="home-section-heading">Recent <span className="theme-name">Projects</span></h2>
                    <div className="slide-wrapper scrollbar-hidden" ref={sliderRef}>
                        {Array.from({ length: HOME_DUPLICATE_FACTOR }).map((_, setIndex) =>
                            recentProjects.map((proj) => (
                                <a
                                    key={`${proj.id}-${setIndex}`}
                                    href={proj.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-slide-card"
                                >
                                    <div className="project-slide-card-image-wrap">
                                        <img src={toAbsoluteAssetUrl(proj.image)} alt={proj.title} className="project-slide-card-img" loading="lazy" />
                                    </div>
                                    <div className="project-slide-card-overlay">
                                        <div className="project-slide-card-gradient" />
                                        <div className="project-slide-card-info">
                                            <p className="project-slide-card-title">{proj.title}</p>
                                            <p className="project-slide-card-subtitle">{proj.subtitle}</p>
                                            <ul className="project-slide-card-tags">
                                                {proj.technologies.map((tech, i) => (
                                                    <li key={i}><span>{tech}</span></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                    <div className="slide-controls">
                        <div className="slide-progress-track">
                            <div className="slide-progress-fill" style={{ width: `${scrollProgress}%` }} />
                        </div>
                        <div className="slide-controls-buttons">
                            <button
                                type="button"
                                className="slide-control-btn"
                                aria-label={isAutoScrolling ? 'Pause' : 'Play'}
                                onClick={() => (isAutoScrolling ? stopAutoScroll() : startAutoScroll())}
                            >
                                <i className={`fas fa-${isAutoScrolling ? 'pause' : 'play'}`} />
                            </button>
                            <button
                                type="button"
                                className="slide-control-btn"
                                aria-label="Previous slide"
                                onClick={() => handleScrollButton('left')}
                            >
                                <i className="fas fa-chevron-left" />
                            </button>
                            <button
                                type="button"
                                className="slide-control-btn"
                                aria-label="Next slide"
                                onClick={() => handleScrollButton('right')}
                            >
                                <i className="fas fa-chevron-right" />
                            </button>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/projects" className="btn btn-outline-primary">View All Projects</Link>
                    </div>
                </div>
            </section>

            {/* My Contributions Section – Proxify-style layout */}
            <section className="home-section contributions-section contributions-proxify" style={contributionsStyle}>
                <div className="container py-5">
                    <div className="contributions-proxify-header">
                        <h2 className="home-section-heading">My <span className="theme-name">Contributions</span></h2>
                        <p className="contributions-proxify-subtitle">
                            From government digital transformation to private sector product development.
                            Building high-quality software that delivers real impact.
                        </p>
                    </div>
                    <div className="contributions-proxify-cards">
                        <div className="contributions-proxify-row contributions-proxify-row-3">
                            <a href="https://qa-dev.certifiedpros.gov.bs/" target="_blank" rel="noopener noreferrer" className="contribution-proxify-card theme-primary">
                                <div className="contribution-proxify-text">
                                    <div>
                                        <h3>CertifiedPros</h3>
                                        <p className="mt-4">Professional certification and credential verification platform for government professionals. Built secure authentication and role-based access systems.</p>
                                    </div>
                                    <div className="contribution-proxify-tags">
                                        <span>React</span><span>Laravel</span><span>InertiaJS</span>
                                    </div>
                                </div>
                                <div className="contribution-proxify-image">
                                    <i className="fas fa-certificate" aria-hidden />
                                </div>
                            </a>
                            <a href="https://policyregistry.gov.bs/index.php" target="_blank" rel="noopener noreferrer" className="contribution-proxify-card theme-primary-muted">
                                <div className="contribution-proxify-text">
                                    <div>
                                        <h3>Policy Registry</h3>
                                        <p className="mt-4">Comprehensive government insurance policies registration and management system. Implemented advanced search, versioning, and approval workflows.</p>
                                    </div>
                                    <div className="contribution-proxify-tags">
                                        <span>HTML5</span><span>MySQL</span><span>PHP</span>
                                    </div>
                                </div>
                                <div className="contribution-proxify-image">
                                    <i className="fas fa-book" aria-hidden />
                                </div>
                            </a>
                            <a href="https://btag.gov.bs/" target="_blank" rel="noopener noreferrer" className="contribution-proxify-card theme-primary-subtle">
                                <div className="contribution-proxify-text">
                                    <div>
                                        <h3>B.T.A.G Website</h3>
                                        <p className="mt-4">Government agency website with public information portal. Developed responsive design with government compliance standards and accessibility features.</p>
                                    </div>
                                    <div className="contribution-proxify-tags">
                                        <span>React</span><span>Laravel</span>
                                    </div>
                                </div>
                                <div className="contribution-proxify-image">
                                    <i className="fas fa-landmark" aria-hidden />
                                </div>
                            </a>
                        </div>
                        <div className="contributions-proxify-row contributions-proxify-row-2">
                            <a href="https://www.bealiv.com/" target="_blank" rel="noopener noreferrer" className="contribution-proxify-card theme-primary-subtle wide">
                                <div className="contribution-proxify-text">
                                    <div>
                                        <h3>Be aliv Website Updates</h3>
                                        <p className="mt-4">Aliv Mobile's main website. Product updates and enhancements for the telecommunications provider.</p>
                                    </div>
                                    <div className="contribution-proxify-tags">
                                        <span>WordPress</span>
                                    </div>
                                </div>
                                <div className="contribution-proxify-image">
                                    <i className="fas fa-mobile-alt" aria-hidden />
                                </div>
                            </a>
                            <a href="https://www.rev.bs/" target="_blank" rel="noopener noreferrer" className="contribution-proxify-card theme-primary wide">
                                <div className="contribution-proxify-text">
                                    <div>
                                        <h3>Rev.bs Website Updates</h3>
                                        <p className="mt-4">Cable Bahamas main website. Ongoing maintenance and feature improvements.</p>
                                    </div>
                                    <div className="contribution-proxify-tags">
                                        <span>WordPress</span>
                                    </div>
                                </div>
                                <div className="contribution-proxify-image">
                                    <i className="fas fa-sync-alt" aria-hidden />
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="contributions-summary">
                        <div className="summary-card">
                            <div className="summary-icon"><i className="fas fa-code-branch" /></div>
                            <h5>Collaborative Development</h5>
                            <p>Worked with cross-functional teams on mission-critical government and enterprise projects</p>
                        </div>
                        <div className="summary-card">
                            <div className="summary-icon"><i className="fas fa-tasks" /></div>
                            <h5>Quality Assurance</h5>
                            <p>Implemented rigorous testing, code reviews, and deployment pipelines for production systems</p>
                        </div>
                        <div className="summary-card">
                            <div className="summary-icon"><i className="fas fa-lightbulb" /></div>
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

const contributionsStyle = {
    background: 'linear-gradient(135deg, rgba(60, 60, 60, 0.18) 0%, rgba(110, 110, 110, 0.12) 50%, rgba(80, 80, 80, 0.16) 100%)',
}


export default Home