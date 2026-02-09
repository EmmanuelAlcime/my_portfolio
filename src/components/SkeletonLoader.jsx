import '@/styles/skeleton.css'

export const ProjectCardSkeleton = () => (
  <div className="project-card skeleton-card">
    <div className="skeleton skeleton-image"></div>
    <div className="project-content">
      <div className="skeleton skeleton-icon"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-company"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton-tags">
        <div className="skeleton skeleton-tag"></div>
        <div className="skeleton skeleton-tag"></div>
        <div className="skeleton skeleton-tag"></div>
      </div>
    </div>
  </div>
)

export const SkillBarSkeleton = () => (
  <div className="skill-bar-skeleton">
    <div className="skeleton skeleton-skill-header"></div>
    <div className="skeleton skeleton-skill-bar"></div>
  </div>
)

export const ContentSkeleton = () => (
  <div className="content-skeleton">
    <div className="skeleton skeleton-heading"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text short"></div>
  </div>
)

export default { ProjectCardSkeleton, SkillBarSkeleton, ContentSkeleton }
