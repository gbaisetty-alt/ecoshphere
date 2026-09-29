export function AchievementBadge({ title, Icon }) {
  return (
    <div className="achievement-badge glass-panel">
      <div className="badge-icon">
        <Icon size={18} />
      </div>
      <span>{title}</span>
    </div>
  )
}
