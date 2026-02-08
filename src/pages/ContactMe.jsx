import React, { useState } from 'react'

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
    error: null
  })

  const [openFaqId, setOpenFaqId] = useState('faq1')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ submitted: false, loading: true, error: null })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setFormStatus({ submitted: true, loading: false, error: null })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => {
          setFormStatus({ submitted: false, loading: false, error: null })
        }, 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setFormStatus({
        submitted: false,
        loading: false,
        error: 'Failed to send message. Please try again or contact me directly.'
      })
    }
  }

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId)
  }

  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'emmanuelalcime54@gmail.com',
      link: 'mailto:emmanuelalcime54@gmail.com',
      description: 'Send me an email and I\'ll respond within 24 hours'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+1-242-458-5919',
      link: 'tel:+1-242-458-5919',
      description: 'Call or text me for urgent matters'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'Nassau, Bahamas',
      description: 'Based in Nassau with flexibility for remote opportunities'
    }
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      url: 'https://www.linkedin.com/in/emmanuel-alcime-564178209/'
    },
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      url: 'https://github.com/EmmanuelAlcime'
    },
  ]

  const faqItems = [
    {
      id: 'faq1',
      question: 'What services do you offer?',
      answer: 'I specialize in full-stack web development (React + PHP/Laravel), mobile app development (Kotlin/Android), and WordPress solutions. I also offer consultation on performance optimization, architecture design, and technology selection.'
    },
    {
      id: 'faq2',
      question: 'What\'s your typical project timeline?',
      answer: 'Timeline varies based on project scope. Small projects (landing pages, simple apps) typically take 2-4 weeks. Medium projects (web applications, complex features) take 1-3 months. I\'ll provide detailed estimates after understanding your requirements.'
    },
    {
      id: 'faq3',
      question: 'Do you work with startups or established companies?',
      answer: 'Yes! I work with both startups and established enterprises. I have experience scaling applications from MVP to production, and I understand the unique challenges of each stage. I\'m flexible with engagement models to fit your needs.'
    },
    {
      id: 'faq4',
      question: 'Can you maintain and support existing applications?',
      answer: 'Absolutely. I provide ongoing maintenance, bug fixes, feature additions, and performance optimization for existing applications. I\'m experienced with legacy code and can help modernize applications while ensuring stability.'
    },
    {
      id: 'faq5',
      question: 'How do you handle project communication?',
      answer: 'I believe in transparent, regular communication. I provide weekly updates, maintain detailed documentation, and am available for questions. I use tools like Git for version control and prefer Agile methodologies with regular check-ins.'
    }
  ]

  return (
    <div className="contact-container">
      <div className="container py-5">
        {/* Contact Header */}
        <div className="contact-header mb-5">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            I'm always interested in hearing about new projects and opportunities. 
            Whether you want to collaborate, have a question, or just want to say hi, feel free to reach out!
          </p>
        </div>

        <div className="row">
          {/* Contact Form */}
          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className="contact-form-wrapper">
              <h2 className="form-title">Send Me a Message</h2>
              
              {formStatus.submitted && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="fas fa-check-circle"></i> Thank you for your message! I'll get back to you soon.
                </div>
              )}

              {formStatus.error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="fas fa-exclamation-circle"></i> {formStatus.error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="mb-4">
                  <label htmlFor="name" className="form-label"><i className="fas fa-user"></i> Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="form-label"><i className="fas fa-envelope"></i> Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="form-label"><i className="fas fa-heading"></i> Subject</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label"><i className="fas fa-comment"></i> Message</label>
                  <textarea
                    className="form-control form-control-lg"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me more about your inquiry..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-outline-success btn-lg w-100"
                  disabled={formStatus.loading}
                >
                  <i className="fas fa-paper-plane"></i> {formStatus.loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-lg-4">
            {/* Direct Contact Methods */}
            <div className="contact-methods mb-5">
              <h3 className="section-title">Contact Information</h3>
              {contactMethods.map((method, idx) => (
                <div key={idx} className="contact-method-item mb-4">
                  <div className="method-icon">
                    <i className={method.icon}></i>
                  </div>
                  <h5>{method.title}</h5>
                  {method.link ? (
                    <a href={method.link} className="method-link">
                      {method.value}
                    </a>
                  ) : (
                    <p className="method-value">{method.value}</p>
                  )}
                  <p className="method-description">{method.description}</p>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="social-section">
              <h3 className="section-title">Connect With Me</h3>
              <p className="social-description">
                Follow me on social media to stay updated with my latest projects and insights.
              </p>
              <div className="social-links">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="social-link"
                    title={social.name}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="response-time-card mt-5">
              <h5><i className="fas fa-clock"></i> Response Time</h5>
              <p>
                I typically respond to messages within <strong>24 hours</strong>. 
                For urgent matters, please call me directly.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="accordion" id="faqAccordion">
              {faqItems.map((item) => (
                <div key={item.id} className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${openFaqId !== item.id ? 'collapsed' : ''}`}
                      type="button"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={openFaqId === item.id}
                    >
                      <i className="fas fa-question-circle"></i> &nbsp;{item.question}
                    </button>
                  </h2>
                  <div
                    id={item.id}
                    className={`accordion-collapse collapse ${openFaqId === item.id ? 'show' : ''}`}
                  >
                    <div className="accordion-body">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactMe