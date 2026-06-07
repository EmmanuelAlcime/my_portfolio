import React from 'react'

const ProjectCard = ({ image, name, link, skills = [] }) => {
  return (
    <div className="dev-card">
        <img src={image} alt={name}/>
        <div className="dev-info">
            <div className="dev-name">{name}</div>
            <div className="dev-link">{link}</div>
            <div className="dev-skills">
                {skills.map((skill, index) => (
                    <span className="skill-tag" key={index}>{skill}</span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProjectCard