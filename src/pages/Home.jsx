import React, { useCallback, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import particlesConfig from '@/assets/particles.json'
import profileImage from '@/assets/me.jpeg'
import aliv_business_image from '@/assets/aliv_business_website.png'
import inspire_her_image from '@/assets/inspire_her_website.png'
import cash_n_go_image from '@/assets/cash_n_go_website.png'
import lacouperetrouvailles_image from '@/assets/lacouperetrouvailles_website.png'
import TechParallax from "@/components/TechParallax"
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { submitContactForm } from '@/services/contactForm'


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


const AUTO_SCROLL_SPEED = 0.4

const HOME_DUPLICATE_FACTOR = 3 // Duplicate items 3x for smoother infinite scroll

/** Ensures image src is an absolute URL - fixes broken images after client-side navigation */
const toAbsoluteAssetUrl = (url) => {
    if (!url || typeof url !== 'string') return url
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    const base = window.location.origin + (import.meta.env.BASE_URL || '/')
    return new URL(url, base).href
}

const Home = () => {
    const projectsRef = useScrollReveal()
    const contributionsRef = useScrollReveal()
    const contactRef = useScrollReveal()
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [formStatus, setFormStatus] = useState({ submitted: false, loading: false, error: null })
    const sliderRef = useRef(null)
    const rafRef = useRef(null)
    const resumeTimeoutRef = useRef(null)
    const isSnappingRef = useRef(false)
    const [isAutoScrolling, setIsAutoScrolling] = useState(true)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [showContactModal, setShowContactModal] = useState(false)

    const getItemWidth = useCallback(() => {
        const slider = sliderRef.current
        if (!slider) return 0
        const firstItem = slider.querySelector('.project-slide-card')
        if (!firstItem) return 0
        const gap = parseFloat(getComputedStyle(slider).gap) || 0
        return firstItem.getBoundingClientRect().width + gap
    }, [])

    const oneSetWidth = useCallback(() => {
        return getItemWidth() * recentProjects.length
    }, [getItemWidth])

    const resetScrollPosition = useCallback(() => {
        const slider = sliderRef.current
        if (!slider || isSnappingRef.current) return
        const setW = oneSetWidth()
        if (setW <= 0) return
        // When we scroll past one full set (the first copy), jump back seamlessly
        if (slider.scrollLeft >= setW * 2) {
            slider.scrollLeft -= setW
        }
    }, [oneSetWidth])

    const smoothSnapTo = useCallback((targetLeft) => {
        const slider = sliderRef.current
        if (!slider) return
        isSnappingRef.current = true
        slider.classList.add('snap-active')
        slider.scrollTo({ left: targetLeft, behavior: 'smooth' })
        const onScrollEnd = () => {
            slider.classList.remove('snap-active')
            isSnappingRef.current = false
            slider.removeEventListener('scroll', onScrollEnd)
        }
        // Use a one-shot scroll listener + fallback timeout
        slider.addEventListener('scroll', onScrollEnd, { once: true })
        setTimeout(onScrollEnd, 400)
    }, [])

    const snapToElement = useCallback((direction) => {
        const slider = sliderRef.current
        if (!slider) return
        const allItems = slider.querySelectorAll('.project-slide-card')
        if (!allItems.length) return
        const itemW = getItemWidth()
        if (itemW <= 0) return

        let currentIndex = Math.round(slider.scrollLeft / itemW)
        let nextIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1

        const maxIndex = allItems.length - 1
        // Clamp and wrap within the visible range (first 2 sets for smooth wrapping)
        if (nextIndex < 0) nextIndex = 0
        if (nextIndex > maxIndex) nextIndex = maxIndex

        const targetLeft = nextIndex * itemW
        smoothSnapTo(targetLeft)
    }, [getItemWidth, smoothSnapTo])

    const isAutoRef = useRef(false)

    const tick = useCallback(() => {
        const slider = sliderRef.current
        if (!slider || !isAutoRef.current) return
        slider.scrollLeft += AUTO_SCROLL_SPEED
        resetScrollPosition()
    }, [resetScrollPosition])

    const startAutoScroll = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
        setIsAutoScrolling(true)
        isAutoRef.current = true
        const loop = () => {
            tick()
            if (isAutoRef.current) {
                rafRef.current = requestAnimationFrame(loop)
            }
        }
        rafRef.current = requestAnimationFrame(loop)
    }, [tick])

    const beginAutoScrollLoop = useCallback(() => {
        isAutoRef.current = true
        const loop = () => {
            tick()
            if (isAutoRef.current) {
                rafRef.current = requestAnimationFrame(loop)
            }
        }
        rafRef.current = requestAnimationFrame(loop)
    }, [tick])

    const stopAutoScroll = useCallback(() => {
        setIsAutoScrolling(false)
        isAutoRef.current = false
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current)
            resumeTimeoutRef.current = null
        }
    }, [])

    const handleScrollButton = useCallback((direction) => {
        stopAutoScroll()
        snapToElement(direction)
        // Resume auto-scroll after 4s of inactivity
        resumeTimeoutRef.current = setTimeout(() => {
            startAutoScroll()
        }, 4000)
    }, [stopAutoScroll, snapToElement, startAutoScroll])

    // Start auto-scroll loop on mount, stop on unmount
    useEffect(() => {
        beginAutoScrollLoop()
        return () => {
            stopAutoScroll()
        }
    }, [beginAutoScrollLoop, stopAutoScroll])

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
        el.addEventListener('scroll', updateProgress, { passive: true })
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

        try {
            await submitContactForm(formData)
            setFormStatus({ submitted: true, loading: false, error: null })
            setFormData({ name: '', email: '', subject: '', message: '' })
            setTimeout(() => setFormStatus(prev => ({ ...prev, submitted: false })), 5000)
        } catch (err) {
            setFormStatus({ submitted: false, loading: false, error: err.message })
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
                <div className="hero-content">
                    <div className="hero-content-inner">
                        <div className="hero-profile-image-wrapper">
                            <img src={profileImage} alt="Emmanuel Alcime" className="hero-profile-image" />
                        </div>
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
            <section ref={projectsRef} className="home-section recent-projects-section dev-slider fade-in" style={carouselStyle}>
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
                        <Link to="/my_portfolio/projects" className="btn btn-outline-primary px-4 py-2 fw-semibold">
                            View All Projects <i className="fas fa-arrow-right ms-2"></i>
                        </Link>
                    </div>
                </div>
            </section>

       

            {/* My Contributions Section – Proxify-style layout */}
            <section ref={contributionsRef} id="my-contributions" className="home-section contributions-section contributions-proxify fade-in" style={contributionsStyle}>
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
                            <a href="https://www.bealiv.com/" target="_blank" rel="noopener noreferrer" className="contribution-proxify-card theme-primary-subtle">
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
                            <a href="https://www.rev.bs/" target="_blank" rel="noopener noreferrer" className="contribution-proxify-card theme-primary">
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
            <section ref={contactRef} id="contact-form" className="home-section home-contact-section fade-in">
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
                                        {formStatus.loading ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" /> Sending...</> : <><i className="fas fa-paper-plane me-2" /> Send Message</>}
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
    background: 'var(--gradient-subtle)',
}


export default Home