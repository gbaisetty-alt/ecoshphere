import { CalendarDays, Check, ChevronDown, Leaf, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export function ActionCard({ action, onToggle, history }) {
  const Icon = action.icon
  const [expanded, setExpanded] = useState(false)
  const completedDays = history.filter((day) => day.completed).length
  const weeklyPoints = completedDays * action.points
  const latestStreak = history.reduce((streak, day) => (day.completed ? streak + 1 : 0), 0)
  const impactItems = [
    ['CO₂', action.impact?.co2 || 0, 'kg'],
    ['Water', action.impact?.water || 0, 'L'],
    ['Energy', action.impact?.energy || 0, 'kWh'],
    ['Waste', action.impact?.waste || 0, 'kg'],
  ].filter(([, value]) => value > 0)

  return (
    <div className={action.completed ? 'action-card completed' : 'action-card'}>
      <button type="button" className="action-trigger" onClick={() => onToggle(action.id)} aria-pressed={action.completed}>
        <div className="action-main">
          <div className={`action-icon ${action.completed ? 'done' : ''}`}>
            <Icon size={18} />
          </div>
          <div className="action-copy">
            <span className="action-label">{action.label}</span>
            <span className="action-points">
              {action.completed ? `Earned ${action.points} Eco Points · click to remove` : `Earn ${action.points} Eco Points today`}
            </span>
          </div>
        </div>
        <div className="check-wrap">
          {action.completed ? <Check size={18} /> : <Leaf size={18} />}
        </div>
      </button>

      <button type="button" className="action-expand" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
        <span><CalendarDays size={14} /> {expanded ? 'Hide progress' : 'View 7-day progress'}</span>
        <ChevronDown size={15} className={expanded ? 'rotated' : ''} />
      </button>

      {expanded && (
        <div className="action-details">
          <div className="action-detail-grid">
            <div><span>Days active</span><strong>{completedDays}/7</strong></div>
            <div><span>Current streak</span><strong>{latestStreak} days</strong></div>
            <div><span>Weekly points</span><strong>{weeklyPoints} pts</strong></div>
          </div>
          <div className="action-week-row">
            {history.map((day) => <span key={day.label} className={day.completed ? 'active' : ''} title={`${day.label}: ${day.completed ? 'complete' : 'not complete'}`}>{day.label}</span>)}
          </div>
          <div className="action-impact-row">
            <TrendingUp size={14} />
            <span>Each completion saves {impactItems.map(([label, value, unit]) => `${value}${unit} ${label}`).join(' · ')}</span>
          </div>
        </div>
      )}
    </div>
  )
}
