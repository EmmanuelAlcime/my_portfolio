import React from 'react'

const ProjectCard = ({ image, name, link, skills = [] }) => {
  return (
    <div class="dev-card">
        <img src={image} alt={name}/>
        <div class="dev-info">
            <div class="dev-name">{name}</div>
            <div class="dev-link">{link}</div>
            <div class="dev-skills">
                {skills.map((skill, index) => (
                    <span class="skill-tag" key={index}>{skill}</span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProjectCard