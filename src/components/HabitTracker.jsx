import { Check, Flame, Minus } from 'lucide-react'

export function HabitTracker({ habits, selectedDay, onSelectDay, onToggleAction }) {
  const selectedHabit = habits[selectedDay]
  const selectedCompleted = selectedHabit.actions.filter((action) => action.completed).length
  const activeDays = habits.filter((habit) => habit.actions.some((action) => action.completed)).length
  const completedMissions = habits.reduce((sum, habit) => sum + habit.actions.filter((action) => action.completed).length, 0)
  const totalMissions = habits.length * selectedHabit.actions.length
  const progress = totalMissions ? Math.round((completedMissions / totalMissions) * 100) : 0
  const expectedDays = selectedDay + 1
  const onTrack = activeDays >= Math.max(1, Math.ceil(expectedDays * 0.7))
  const habitsToImprove = selectedHabit.actions.filter((action) => !action.completed).slice(0, 3)

  return (
    <div className="stack-card glass-panel">
      <div className="section-header compact">
        <div>
          <p className="eyebrow">Habits</p>
          <h3>{selectedCompleted}/5 {selectedHabit.day.toUpperCase()} <span className="accent">🔥</span></h3>
        </div>
      </div>

      <div className="habit-week">
        {habits.map((habit, index) => (
          <button
            type="button"
            key={`${habit.day}-${index}`}
            className={`habit-day ${habit.actions.some((action) => action.completed) ? 'done' : ''} ${selectedDay === index ? 'selected' : ''}`}
            onClick={() => onSelectDay(index)}
            aria-pressed={selectedDay === index}
          >
            <span>{habit.day}</span>
            {habit.actions.some((action) => action.completed) ? <Check size={14} /> : <Minus size={14} />}
            <small>{habit.actions.filter((action) => action.completed).length}/5</small>
          </button>
        ))}
      </div>

      <div className="habit-meta">
        <Flame size={16} />
        <span>{activeDays}-day momentum · {selectedHabit.day} selected</span>
      </div>

      <div className="habit-progress-copy">
        <span>{completedMissions}/{totalMissions} missions this week</span>
        <strong className={onTrack ? 'on-track' : 'needs-attention'}>{onTrack ? 'On track' : 'Needs attention'}</strong>
      </div>
      <div className="habit-progress-bar"><span style={{ width: `${progress}%` }} /></div>

      <div className="habit-improve">
        <div className="habit-improve-heading">
          <span className="eyebrow">Next best habits</span>
          <small>{habitsToImprove.length ? 'Build today\'s momentum' : 'All habits complete'}</small>
        </div>
        {habitsToImprove.length ? habitsToImprove.map((action) => {
          const Icon = action.icon
          return (
            <button type="button" className="habit-suggestion" key={action.id} onClick={() => onToggleAction(action.id)}>
              <span className="habit-suggestion-icon"><Icon size={14} /></span>
              <span>{action.label}</span>
              <strong>+{action.points}</strong>
            </button>
          )
        }) : <div className="habit-complete-note"><Check size={15} /> Great work. Keep the streak alive.</div>}
      </div>
    </div>
  )
}
