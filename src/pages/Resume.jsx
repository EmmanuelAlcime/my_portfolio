import React from 'react'

const Resume = () => {
  const skills = [
    {
      category: "Programming Languages",
      items: ["Kotlin", "Java", "PHP", "JavaScript", "HTML5", "CSS3"]
    },
    {
      category: "Frameworks & Libraries",
      items: ["Android SDK", "React", "Laravel", "WordPress", "Elementor"]
    },
    {
      category: "Databases",
      items: ["MySQL", "PostgreSQL", "SQLite", "Stored Procedures", "Triggers", "Views"]
    },
    {
      category: "Development Tools",
      items: ["Android Studio", "Visual Studio Code", "Git", "Apache2"]
    },
    {
      category: "Web Technologies",
      items: ["RESTful APIs", "SOAP", "Responsive Design", "MVC Architecture", "CI/CD Pipelines"]
    },
    {
      category: "Project Management",
      items: ["Agile Methodology", "Scrum", "Project Estimation", "Planning"]
    }
  ]

  const experience = [
    {
      role: "Senior Software Developer",
      company: "Bahamas Local",
      location: "Nassau, N.P.",
      period: "August 2025 - Present",
      achievements: [
        "Develop and implement new features for existing web platforms using modern JavaScript frameworks and PHP",
        "Create new products from conception to deployment utilizing React for frontend and Laravel for backend development",
        "Lead the migration of legacy applications to more scalable and maintainable React-based architecture",
        "Manage and configure Apache2 servers, including virtual hosts, security configurations, and performance optimization",
        "Optimize application performance through efficient database queries, code refactoring, and modern caching techniques",
        "Collaborate with design and product teams to deliver intuitive user experiences that increase user engagement by 35%",
        "Implement CI/CD pipelines to streamline deployment processes, reducing release times by 40%",
        "Mentor junior developers through code reviews, pair programming, and knowledge-sharing sessions",
        "Architect RESTful APIs to facilitate seamless communication between frontend and backend systems"
      ]
    },
    {
      role: "Software Developer",
      company: "Bahamas Digital Transformation Unit",
      location: "Nassau, N.P.",
      period: "August 2024 - Present",
      achievements: [
        "Develop and implement software applications to modernize government digital infrastructure, serving thousands of citizens daily",
        "Analyze technical requirements and contribute to comprehensive design reviews for critical systems",
        "Collect and document user requirements, create detailed user stories, and provide accurate project estimates",
        "Maintain and support existing client websites and applications, ensuring 99%+ uptime",
        "Resolve complex bugs and optimize software performance across development, staging, and production environments",
        "Implement robust security measures including code scans, vulnerability assessments, and version control management",
        "Design, test, and deploy new features for internal and external tools used by government agencies",
        "Create and maintain RESTful APIs, perform database analysis, and develop stored procedures and triggers",
        "Collaborate in agile environments to plan, design, and deploy applications that meet strict governmental compliance standards"
      ]
    },
    {
      role: "Web Application Developer",
      company: "Genesys Now",
      location: "Nassau, N.P.",
      period: "2020 - 2022",
      achievements: [
        "Architected and developed scalable web applications using PHP with custom MVC frameworks",
        "Engineered robust database solutions utilizing MySQL, SQLite, and PostgreSQL to support high-traffic applications",
        "Created responsive, intuitive user interfaces in close collaboration with UX/UI design teams",
        "Developed and integrated APIs using RESTful and SOAP protocols for seamless third-party integrations",
        "Performed comprehensive debugging and optimization, achieving significant performance improvements",
        "Authored detailed technical documentation for web and mobile applications to ensure maintainability"
      ]
    },
    {
      role: "Self-Employed Developer",
      company: "Goal Noire Software",
      location: "Nassau, N.P.",
      period: "2020 - Present",
      achievements: [
        "Delivered high-profile web solutions for major clients including telecommunications and financial services companies",
        "Built and maintained Android applications across diverse industries including sanitation, technology, and finance",
        "Managed complete project lifecycles using Agile methodology, consistently meeting deadlines and exceeding client expectations",
        "Leveraged modern development tools including Kotlin, Android Studio, and Visual Studio Code",
        "Implemented comprehensive testing strategies and bug resolution processes to ensure application quality",
        "Collaborated directly with clients to gather requirements, define deliverables, and ensure alignment with business objectives"
      ]
    }
  ]

  const achievements = [
    {
      icon: "fas fa-rocket",
      title: "Mobile App Success",
      description: "Successfully developed and published mobile applications on Google Play Store with positive user ratings"
    },
    {
      icon: "fas fa-bolt",
      title: "Performance Excellence",
      description: "Improved web application performance by 50% through advanced caching techniques and optimization strategies"
    },
    {
      icon: "fas fa-dollar-sign",
      title: "Revenue Impact",
      description: "Co-developed and deployed web applications that have generated over $1,000,000 in total revenue"
    },
    {
      icon: "fas fa-trophy",
      title: "Client Success",
      description: "Delivered critical web solutions for high-profile clients across telecommunications, finance, and government sectors"
    },
    {
      icon: "fas fa-cog",
      title: "WordPress Expertise",
      description: "Built custom WordPress plugins and maintained major telecommunications websites using Elementor"
    },
    {
      icon: "fas fa-chart-line",
      title: "Scalability",
      description: "Architected solutions serving millions of users with 99%+ uptime and enterprise-grade reliability"
    }
  ]

  return (
    <div className="resume-container">
      <div className="container py-5">
        {/* Resume Header */}
        <div className="resume-header mb-5">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="resume-title">Emmanuel Alcime</h1>
              <p className="resume-subtitle">Full Stack Developer | Android Developer | PHP Specialist</p>
              <p className="resume-contact">
                <i className="fas fa-envelope"></i> emmanuelalcime54@gmail.com | <i className="fas fa-phone"></i> +1-242-458-5919
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <a href="/resume_10_16_2025.pdf" download className="btn btn-outline-success btn-lg">
                <i className="fas fa-download"></i> Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="summary-section mb-5">
          <h2 className="section-title">Professional Summary</h2>
          <div className="summary-card">
            <p>
              Accomplished Full Stack Developer with 6+ years of experience designing, developing, and 
              deploying high-performance web and mobile applications. Expert in Kotlin, PHP, JavaScript, 
              and WordPress development with proven success in creating user-centric solutions that generate 
              significant business value. Demonstrated ability to work collaboratively in agile environments 
              while delivering scalable applications that serve millions of users.
            </p>
          </div>
        </div>

        {/* Professional Experience */}
        <div className="experience-section mb-5">
          <h2 className="section-title">Professional Experience</h2>
          {experience.map((job, idx) => (
            <div key={idx} className="experience-item mb-4">
              <div className="row align-items-start">
                <div className="col-md-8">
                  <h4 className="job-title">{job.role}</h4>
                  <p className="job-company">{job.company} • {job.location}</p>
                </div>
                <div className="col-md-4 text-md-end">
                  <p className="job-period">{job.period}</p>
                </div>
              </div>
              <ul className="job-achievements">
                {job.achievements.map((achievement, aidx) => (
                  <li key={aidx}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="skills-section mb-5">
          <h2 className="section-title">Technical Skills</h2>
          <div className="row">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="col-md-6 col-lg-4 mb-4">
                <div className="skill-group">
                  <h5>{skillGroup.category}</h5>
                  <div className="skill-items">
                    {skillGroup.items.map((skill, sidx) => (
                      <span key={sidx} className="skill-item">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Achievements */}
        <div className="achievements-section mb-5">
          <h2 className="section-title">Key Achievements</h2>
          <div className="row">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="col-md-6 col-lg-4 mb-4">
                <div className="achievement-highlight">
                  <i className={achievement.icon}></i>
                  <h5>{achievement.title}</h5>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="education-section">
          <h2 className="section-title">Education</h2>
          <div className="education-item">
            <h4><i className="fas fa-graduation-cap"></i> Johns Hopkins University</h4>
            <p>Career Certificates • Baltimore, MD • 2015 - 2017</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume