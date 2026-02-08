import React from 'react'

const AboutMe = () => {
  return (
    <div className="about-container">
      <div className="container py-5">
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="about-title">About <span className="theme-name">Me</span></h1>
            <p className="about-intro">
              I'm Emmanuel Alcime, a Full Stack Developer with 6+ years of experience building 
              high-performance web and mobile applications. I specialize in creating user-centric 
              solutions that drive business success.
            </p>
            <p className="about-description">
              Currently, I work as a Senior Software Developer at Bahamas Local, where I architect 
              scalable applications and mentor junior developers. My passion lies in bridging the gap 
              between elegant design and robust backend systems, ensuring every project I touch delivers 
              real value to users and businesses alike.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="about-highlight">
              <h3>Key Expertise</h3>
              <div className="expertise-grid">
                <div className="expertise-item">
                  <h5>Frontend</h5>
                  <p>React, JavaScript, HTML5, CSS3, Responsive Design</p>
                </div>
                <div className="expertise-item">
                  <h5>Backend</h5>
                  <p>PHP, Laravel, RESTful APIs, Database Design</p>
                </div>
                <div className="expertise-item">
                  <h5>Mobile</h5>
                  <p>Kotlin, Android SDK, Play Store Publications</p>
                </div>
                <div className="expertise-item">
                  <h5>DevOps</h5>
                  <p>Apache2, Git, CI/CD, Performance Optimization</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <h2 className="section-title">Professional <span className="theme-name">Journey</span></h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Senior Software Developer</h4>
                  <p className="timeline-date">Bahamas Local | August 2025 - Present</p>
                  <p>Leading development initiatives with React and Laravel. Architecting RESTful APIs, optimizing application performance by 40% through CI/CD pipelines, and mentoring junior developers.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Software Developer</h4>
                  <p className="timeline-date">Bahamas Digital Transformation Unit | August 2024 - Present</p>
                  <p>Developing mission-critical government platforms serving thousands of citizens. Focus on security, compliance, and high-availability systems with 99%+ uptime.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Web Application Developer</h4>
                  <p className="timeline-date">Genesys Now | 2020 - 2022</p>
                  <p>Architected scalable web applications using PHP with custom MVC frameworks. Engineered robust database solutions and created responsive user interfaces.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Self-Employed Developer</h4>
                  <p className="timeline-date">Goal Noire Software | 2020 - Present</p>
                  <p>Delivered high-profile solutions for telecommunications and financial services companies. Built and maintained Android applications across diverse industries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <h2 className="section-title">What <span className="theme-name">Drives Me</span></h2>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="value-card">
                  <h5><i className="fas fa-bullseye"></i> User-Centric Design</h5>
                  <p>I believe great software starts with understanding user needs. Every line of code I write aims to create intuitive, delightful experiences.</p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="value-card">
                  <h5><i className="fas fa-bolt"></i> Performance Excellence</h5>
                  <p>Fast, responsive applications aren't just nice to have—they're essential. I've achieved 50% performance improvements through strategic optimization.</p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="value-card">
                  <h5><i className="fas fa-handshake"></i> Collaboration</h5>
                  <p>The best solutions come from diverse perspectives. I thrive in collaborative environments, working closely with designers, product teams, and fellow developers.</p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="value-card">
                  <h5><i className="fas fa-book"></i> Continuous Learning</h5>
                  <p>Technology evolves constantly. I'm committed to staying ahead of the curve and sharing knowledge with junior developers through mentorship.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe