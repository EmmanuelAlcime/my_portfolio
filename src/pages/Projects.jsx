import React, { useState } from 'react'
import aliv_business_image from '@/assets/aliv_business_website.png'
import inspire_her_image from '@/assets/inspire_her_website.png'
import cash_n_go_image from '@/assets/cash_n_go_website.png'
import lacouperetrouvailles_image from '@/assets/lacouperetrouvailles_website.png'
import baf_financial_services_image from '@/assets/baf_website.png'

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All')

  const projects = [
    {
      id: 1,
      title: "Aliv Business Website",
      company: "CBL Limited",
      description: "Comprehensive business telecommunications platform with modern design and advanced functionality. Developed using modern web technologies with focus on user experience and performance.",
      link: "https://alivbusiness.com/",
      image: aliv_business_image,
      technologies: ["React", "PHP", "Laravel", "MySQL"],
      category: "Web Development",
      icon: "fas fa-mobile-alt",
      highlights: [
        "Built responsive business portal",
        "Implemented secure transaction handling",
        "Optimized performance for high traffic"
      ]
    },
    {
      id: 2,
      title: "Inspire Her Conference Website",
      company: "CBL Limited",
      description: "Custom event management platform with integrated sign-up forms and sponsor management. Designed to facilitate networking and sponsor engagement.",
      link: "https://iherbahamas.com/",
      image: inspire_her_image,
      technologies: ["HTML", "Bootstrap 5","CSS3", "PHP", "Javascript"],
      category: "Bootstrap 5",
      icon: "fas fa-microphone",
      highlights: [
        "Custom event management system",
        "Dynamic sponsor management portal",
        "Integrated email notifications"
      ]
    },
    {
      id: 3,
      title: "Cash N' Go Website",
      company: "Financial Services",
      description: "Modern financial services platform with secure transaction capabilities. Built with enterprise-grade security and reliability standards.",
      link: "https://cashngobahamas.com/",
      image: cash_n_go_image,
      technologies: ["PHP", "Laravel", "PostgreSQL", "RESTful API"],
      category: "Web Development",
      icon: "fas fa-credit-card",
      highlights: [
        "Secure payment processing",
        "Real-time transaction tracking",
        "Advanced fraud detection"
      ]
    },
    {
      id: 4,
      title: "L'a Coupe Retrouvaille",
      company: "Non-Profit Organization",
      description: "Comprehensive online ticket sales platform serving the Bahamian entertainment industry. Handles thousands of transactions and manages event inventory.",
      link: "https://lacouperetrouvailles.org/",
      image: lacouperetrouvailles_image,
      technologies: ["React", "Laravel", "MySQL", "Payment Integration"],
      category: "Web Development",
      icon: "fas fa-handshake",
      highlights: [
        "Website for a non-profit organization",
        "Customized website for a non-profit organization"
      ]
    },
    {
      id: 5,
      title: "BAF Financial Services Website",
      company: "BAF Financial Services",
      description: "Comprehensive financial services platform with modern design and advanced functionality. Developed using modern web technologies with focus on user experience and performance.",
      link: "https://bahamas.mybafsolutions.com/",
      image: baf_financial_services_image,
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      category: "Web Development",
      icon: "fas fa-money-bill",
      highlights: [
        "Built responsive financial services portal",
        "Customized website for a financial services company"
      ]
    }
  ]

  const featuredProjects = [
    {
      id: 1,
      title: "Mobile App Ecosystem",
      description: "Successfully developed and published multiple mobile applications on Google Play Store with positive user ratings and 10K+ downloads.",
      technologies: ["Kotlin", "Android SDK", "Firebase"],
      achievement: "10K+ Downloads",
      icon: "fas fa-download"
    },
    {
      id: 2,
      title: "WordPress Expertise",
      description: "Built custom WordPress plugins and maintained major telecommunications websites using Elementor. Specialized in performance optimization and custom functionality.",
      technologies: ["WordPress", "PHP", "Elementor", "Custom Plugins"],
      achievement: "$1M+ Revenue Impact",
      icon: "fas fa-chart-line"
    },
    {
      id: 3,
      title: "Performance Optimization",
      description: "Implemented advanced caching techniques and optimization strategies that reduced application load times by up to 50%, improving SEO and user satisfaction.",
      technologies: ["Advanced Caching", "Database Optimization", "CDN"],
      achievement: "50% Performance Boost",
      icon: "fas fa-tachometer-alt"
    }
  ]

  const categories = ['All', 'Web Development', 'WordPress']
  const allTechnologies = [...new Set(projects.flatMap(p => p.technologies))]

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter(project =>
        project.category === selectedFilter ||
        project.technologies.includes(selectedFilter)
      )

  return (
    <div className="projects-container">
      <div className="container py-5">
        {/* Hero Section */}
        <div className="projects-hero mb-5">
          <h1 className="projects-title">My Projects</h1>
          <p className="projects-subtitle">
            Here's a selection of projects I've built that showcase my expertise in web development,
            mobile apps, and enterprise solutions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="project-filters mb-4">
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedFilter === category ? 'active' : ''}`}
                onClick={() => setSelectedFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="filter-tech-tags">
            {allTechnologies.slice(0, 8).map((tech) => (
              <button
                key={tech}
                className={`filter-tech-tag ${selectedFilter === tech ? 'active' : ''}`}
                onClick={() => setSelectedFilter(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-5">
          <h2 className="section-title mb-4">Client Projects ({filteredProjects.length})</h2>
          <div className="row">
            {filteredProjects.map((project) => (
              <div key={project.id} className="col-lg-6 mb-4">
                <div className="project-card">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-image-link">
                    <img src={project.image} alt={project.title} className="project-card-image" loading="lazy" />
                  </a>
                  <div className="project-content">
                    <div className="project-icon">
                      <i className={project.icon}></i>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-company">{project.company}</p>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-highlights">
                      {project.highlights.map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">
                          <i className="fas fa-check"></i> {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="project-technologies">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-badge">{tech}</span>
                      ))}
                    </div>

                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Live Project <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Achievements */}
        <div className="mb-5">
          <h2 className="section-title mb-4">Key Achievements</h2>
          <div className="row">
            {featuredProjects.map((proj) => (
              <div key={proj.id} className="col-md-6 col-lg-4 mb-4">
                <div className="achievement-card">
                  <i className={`achievement-icon ${proj.icon}`}></i>
                  <h4>{proj.title}</h4>
                  <p>{proj.description}</p>
                  <div className="achievement-technologies">
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="achievement-badge">{proj.achievement}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Used */}
        <div className="skills-section">
          <h2 className="section-title mb-4">Technical Stack</h2>
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="skill-category">
                <h5><i className="fas fa-paint-brush"></i> Frontend</h5>
                <ul>
                  <li>React</li>
                  <li>JavaScript</li>
                  <li>HTML5 & CSS3</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="skill-category">
                <h5><i className="fas fa-server"></i> Backend</h5>
                <ul>
                  <li>PHP</li>
                  <li>Laravel</li>
                  <li>RESTful APIs</li>
                  <li>MVC Architecture</li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="skill-category">
                <h5><i className="fas fa-database"></i> Databases</h5>
                <ul>
                  <li>MySQL</li>
                  <li>PostgreSQL</li>
                  <li>SQLite</li>
                  <li>Advanced Queries</li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="skill-category">
                <h5><i className="fas fa-mobile-alt"></i> Mobile & Tools</h5>
                <ul>
                  <li>Kotlin</li>
                  <li>Android SDK</li>
                  <li>Git</li>
                  <li>CI/CD Pipelines</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects