import React from 'react'

/**
 * ContributionCard Component
 * 
 * Usage:
 * <ContributionCard 
 *   icon="fas fa-mobile-alt"
 *   title="BeAliv Website Updates"
 *   description="Aliv Mobile's main website."
 *   technologies={["WordPress", "Performance", "UX/UI"]}
 * />
 */
const ContributionCard = ({ icon, title, description, technologies = [] }) => {
  return (
    <div className="contribution-card">
      <div className="card-header">
        <i className={icon}></i>
        <h4>{title}</h4>
      </div>
      <p className="card-description">
        {description}
      </p>
      {technologies.length > 0 && (
        <div className="contribution-tags">
          {technologies.map((tech, idx) => (
            <span key={idx} className="contrib-tag">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default ContributionCard