import { useState, useEffect, useRef } from 'react'
import '@/styles/skillbar.css'

const SkillBar = ({ skill, level, icon }) => {
  const [width, setWidth] = useState(0)
  const skillRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setWidth(level)
            }, 100)
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (skillRef.current) {
      observer.observe(skillRef.current)
    }

    return () => {
      if (skillRef.current) {
        observer.unobserve(skillRef.current)
      }
    }
  }, [level, hasAnimated])

  return (
    <div className="skill-bar-container" ref={skillRef}>
      <div className="skill-bar-header">
        <div className="skill-bar-title">
          {icon && <i className={icon}></i>}
          <span>{skill}</span>
        </div>
        <span className="skill-bar-percentage">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%` }}
        >
          <span className="skill-bar-shine"></span>
        </div>
      </div>
    </div>
  )
}

export default SkillBar
