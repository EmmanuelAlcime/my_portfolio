import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '@/styles/services.css'

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash?.slice(1)
    if (hash) {
      const el = document.getElementById(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    }
  }, [location.pathname, location.hash])

  const mainServices = [
    {
      id: 'web-development',
      icon: 'fas fa-globe',
      title: 'Full Stack Web Development',
      description: 'Complete web solutions from frontend to backend',
      shortDescription: 'End-to-end web applications using modern technologies',
      details: [
        'React.js frontend development with responsive design',
        'PHP & Laravel backend development',
        'RESTful API design and implementation',
        'Database design and optimization (MySQL, PostgreSQL, SQLite)',
        'Performance optimization and caching strategies',
        'CI/CD pipeline implementation for automated deployments',
        'Server management and Apache2 configuration'
      ],
      technologies: ['React', 'PHP', 'Laravel', 'MySQL', 'PostgreSQL', 'Git'],
      color: '#0066cc'
    },
    {
      id: 'mobile-development',
      icon: 'fas fa-mobile-alt',
      title: 'Mobile App Development',
      description: 'Native Android applications for your business',
      shortDescription: 'High-performance Android apps with Play Store publication',
      details: [
        'Kotlin & Java development for Android platform',
        'Google Play Store submission and optimization',
        'Material Design implementation',
        'Local database integration (SQLite)',
        'API integration and network communication',
        'User authentication and security',
        'App testing and quality assurance'
      ],
      technologies: ['Kotlin', 'Java', 'Android SDK', 'Android Studio'],
      color: '#3ddc84'
    },
    {
      id: 'wordpress-solutions',
      icon: 'fas fa-wordpress',
      title: 'WordPress Solutions',
      description: 'Custom WordPress sites and plugin development',
      shortDescription: 'Tailored WordPress platforms with custom functionality',
      details: [
        'Custom WordPress theme development',
        'WordPress plugin development and customization',
        'Elementor page builder expertise',
        'E-commerce integration (WooCommerce)',
        'Performance optimization for WordPress',
        'SEO optimization',
        'Security hardening and maintenance'
      ],
      technologies: ['WordPress', 'Elementor', 'PHP', 'WooCommerce', 'MySQL'],
      color: '#21759b'
    }
  ]

  const additionalServices = [
    {
      id: 'api-development',
      icon: 'fas fa-code',
      title: 'API Development & Integration',
      description: 'RESTful and SOAP API design, development, and integration',
      details: 'Expert in creating robust APIs and integrating third-party services',
      technologies: ['REST', 'SOAP', 'PHP', 'Laravel', 'JSON']
    },
    {
      id: 'performance-optimization',
      icon: 'fas fa-tachometer-alt',
      title: 'Performance Optimization',
      description: 'Speed up your applications with advanced optimization',
      details: 'Database query optimization, caching strategies, code refactoring, and scalability improvements',
      technologies: ['Caching', 'Database Optimization', 'Code Refactoring', 'Scalability']
    },
    {
      id: 'legacy-modernization',
      icon: 'fas fa-sync-alt',
      title: 'Legacy Code Modernization',
      description: 'Transform outdated applications into modern solutions',
      details: 'Migrate legacy systems to modern frameworks while maintaining functionality and stability',
      technologies: ['React', 'Laravel', 'PHP', 'JavaScript', 'Architecture Design']
    },
    {
      id: 'maintenance-support',
      icon: 'fas fa-wrench',
      title: 'Maintenance & Support',
      description: '99%+ uptime maintenance and ongoing support',
      details: 'Bug fixes, feature additions, security patches, and proactive monitoring',
      technologies: ['DevOps', 'Monitoring', 'Testing', 'Security']
    },
    {
      id: 'database-design',
      icon: 'fas fa-database',
      title: 'Database Design & Management',
      description: 'Robust database solutions and optimization',
      details: 'Schema design, query optimization, stored procedures, triggers, and performance tuning',
      technologies: ['MySQL', 'PostgreSQL', 'SQLite', 'SQL']
    },
    {
      id: 'consulting',
      icon: 'fas fa-lightbulb',
      title: 'Technical Consulting',
      description: 'Strategic guidance for your technology decisions',
      details: 'Architecture design, technology selection, scalability planning, and best practices',
      technologies: ['Architecture', 'Strategy', 'Best Practices', 'Planning']
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Requirements',
      description: 'We start by understanding your business goals, technical requirements, and project scope through detailed conversations and analysis.'
    },
    {
      number: '02',
      title: 'Design & Planning',
      description: 'Create detailed project plans, architecture designs, and technical specifications. Provide accurate estimates and timelines.'
    },
    {
      number: '03',
      title: 'Development',
      description: 'Build your solution using modern technologies and best practices. Regular updates and transparent communication throughout.'
    },
    {
      number: '04',
      title: 'Testing & Optimization',
      description: 'Comprehensive testing, performance optimization, and security validation to ensure quality and reliability.'
    },
    {
      number: '05',
      title: 'Deployment',
      description: 'Smooth deployment to production with CI/CD pipelines and zero-downtime deployment strategies where applicable.'
    },
    {
      number: '06',
      title: 'Support & Maintenance',
      description: 'Ongoing support, monitoring, updates, and maintenance to ensure your application stays secure and performant.'
    }
  ]

  const stats = [
    {
      number: '6+',
      label: 'Years of Experience',
      icon: 'fas fa-briefcase'
    },
    {
      number: '50+',
      label: 'Projects Delivered',
      icon: 'fas fa-project-diagram'
    },
    {
      number: '$1M+',
      label: 'Revenue Generated for Clients',
      icon: 'fas fa-dollar-sign'
    },
    {
      number: '99%+',
      label: 'Application Uptime',
      icon: 'fas fa-check-circle'
    }
  ]

  return (
    <div className="services-container">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1 className="hero-title">Services</h1>
          <p className="hero-subtitle">
            Comprehensive web and mobile development solutions tailored to your business needs
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <div className="container">
          <div className="row">
            {stats.map((stat, idx) => (
              <div key={idx} className="col-md-6 col-lg-3 mb-4">
                <div className="stat-card">
                  <i className={`${stat.icon} stat-icon`}></i>
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="main-services py-5">
        <div className="container">
          <div className="section-header mb-5">
            <h2 className="section-title">Core <span className="theme-name">Services</span></h2>
            <p className="section-subtitle">
              Specialized expertise in web and mobile development with proven track record
            </p>
          </div>

          <div className="row">
            {mainServices.map((service) => (
              <div key={service.id} id={service.id} className="col-lg-4 mb-4">
                <div className="service-card" style={{ borderTopColor: service.color }}>
                  <div className="service-icon" style={{ backgroundColor: service.color }}>
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.shortDescription}</p>
                  
                  <ul className="service-highlights">
                    {service.details.slice(0, 3).map((detail, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check-circle"></i>
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="btn btn-outline-primary mt-3 w-100"
                    onClick={() => setSelectedService(service.id === selectedService ? null : service.id)}
                  >
                    {service.id === selectedService ? 'Show Less' : 'Learn More'}
                  </button>

                  {service.id === selectedService && (
                    <div className="service-expanded mt-4">
                      <h5 className="mb-3">Complete Offerings:</h5>
                      <ul className="expanded-details">
                        {service.details.map((detail, idx) => (
                          <li key={idx}>
                            <i className="fas fa-arrow-right"></i>
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <div className="tech-stack mt-4">
                        <p className="tech-label">Technologies:</p>
                        <div className="tech-badges">
                          {service.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-badge">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="additional-services py-5 bg-light">
        <div className="container">
          <div className="section-header mb-5">
            <h2 className="section-title">Additional <span className="theme-name">Services</span></h2>
            <p className="section-subtitle">
              Specialized services to enhance and support your applications
            </p>
          </div>

          <div className="row">
            {additionalServices.map((service) => (
              <div key={service.id} id={service.id} className="col-md-6 col-lg-4 mb-4">
                <div className="additional-service-card">
                  <div className="add-service-icon">
                    <i className={service.icon}></i>
                  </div>
                  <h4 className="add-service-title">{service.title}</h4>
                  <p className="add-service-description">{service.description}</p>
                  <p className="add-service-details">{service.details}</p>
                  <div className="tech-badges-small">
                    {service.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge-small">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section py-5">
        <div className="container">
          <div className="section-header mb-5">
            <h2 className="section-title">My <span className="theme-name">Development Process</span></h2>
            <p className="section-subtitle">
              A structured approach to deliver quality solutions on time and within budget
            </p>
          </div>

          <div className="row">
            {processSteps.map((step, idx) => (
              <div key={idx} className="col-lg-6 mb-4">
                <div className="process-card">
                  <div className="process-number">{step.number}</div>
                  <div className="process-content">
                    <h4 className="process-title">{step.title}</h4>
                    <p className="process-description">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="cta-title mb-3">Ready to Start Your Project?</h2>
          <p className="cta-subtitle mb-4">
            Let's discuss how I can help bring your ideas to life
          </p>
          <Link to="/contact" className="btn btn-light btn-lg">
            <i className="fas fa-envelope"></i> Get In Touch
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Services