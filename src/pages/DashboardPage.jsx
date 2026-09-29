import { ArrowUpRight, Droplets, Leaf, Lightbulb, Recycle, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { ActionCard } from '../components/ActionCard'
import { ChallengeCard } from '../components/ChallengeCard'
import { EcoScore } from '../components/EcoScore'
import { EcoWorld } from '../components/EcoWorld'
import { HabitTracker } from '../components/HabitTracker'
import { ImpactCard } from '../components/ImpactCard'
import { challenges, habitWeek, initialActions } from '../data/mockData'
import { getProfile } from '../utils/profile'

const impactSeed = [
  { key: 'co2', label: 'CO₂ Saved', value: '24.8 kg', detail: 'Lower emissions', accent: 'emerald', icon: Leaf, unit: 'kg' },
  { key: 'water', label: 'Water Saved', value: '1,240 L', detail: 'Everyday efficiency', accent: 'cyan', icon: Droplets, unit: 'L' },
  { key: 'energy', label: 'Energy Saved', value: '18.4 kWh', detail: 'Smarter usage', accent: 'amber', icon: Lightbulb, unit: 'kWh' },
  { key: 'waste', label: 'Waste Reduced', value: '6.2 kg', detail: 'Less landfill', accent: 'lime', icon: Recycle, unit: 'kg' },
]

function getWeeklyActions() {
  const fallback = habitWeek.map((habit, dayIndex) => ({
    ...habit,
    actions: initialActions.map((action) => ({
      ...action,
      completed: dayIndex < 5 ? action.completed : false,
    })),
  }))

  try {
    const saved = JSON.parse(localStorage.getItem('ecotrack-weekly-actions'))
    if (!Array.isArray(saved)) return fallback

    return saved.map((day, dayIndex) => ({
      ...fallback[dayIndex],
      ...day,
      actions: initialActions.map((action) => ({
        ...action,
        ...(day.actions?.find((savedAction) => savedAction.id === action.id) || {}),
      })),
    }))
  } catch {
    return fallback
  }
}

export function DashboardPage() {
  const [profile, setProfile] = useState(getProfile)
  const [selectedDay, setSelectedDay] = useState(4)
  const [weeklyActions, setWeeklyActions] = useState(getWeeklyActions)
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0].title)
  const [selectedImpact, setSelectedImpact] = useState('co2')
  const [syncLabel, setSyncLabel] = useState('Sync impact')

  const selectedDayData = weeklyActions[selectedDay]
  const actions = selectedDayData.actions
  const completedCount = actions.filter((action) => action.completed).length
  const weekCompletedCount = weeklyActions.reduce(
    (sum, day) => sum + day.actions.filter((action) => action.completed).length,
    0,
  )
  const totalPoints = actions.reduce((sum, action) => sum + (action.completed ? action.points : 0), 0)
  const weekPoints = weeklyActions.reduce(
    (sum, day) => sum + day.actions.reduce((daySum, action) => daySum + (action.completed ? action.points : 0), 0),
    0,
  )
  const weeklyMissionCount = weeklyActions.length * actions.length
  const weeklyCompletionRate = weeklyMissionCount ? weekCompletedCount / weeklyMissionCount : 0
  const score = Math.min(100, 40 + Math.round(weeklyCompletionRate * 60))

  const impactStats = useMemo(() => {
    const earnedImpact = weeklyActions.flatMap((day) => day.actions)
      .filter((action) => action.completed)
      .reduce((totals, action) => ({
        co2: totals.co2 + (action.impact?.co2 || 0),
        water: totals.water + (action.impact?.water || 0),
        energy: totals.energy + (action.impact?.energy || 0),
        waste: totals.waste + (action.impact?.waste || 0),
      }), { co2: 0, water: 0, energy: 0, waste: 0 })

    return impactSeed.map((item, index) => {
      const base = Number.parseFloat(item.value)
      const updatedValue = index === 0 ? (base + earnedImpact.co2).toFixed(1) : index === 1 ? (base + earnedImpact.water).toFixed(0) : index === 2 ? (base + earnedImpact.energy).toFixed(1) : (base + earnedImpact.waste).toFixed(1)
      const weeklyValue = earnedImpact[item.key]

      const suffix = index === 1 ? ' L' : index === 2 ? ' kWh' : index === 3 ? ' kg' : ' kg'
      return {
        ...item,
        value: `${updatedValue}${suffix}`,
        detail: weeklyValue > 0 ? `+${weeklyValue.toFixed(index === 1 ? 0 : 1)}${item.unit} this week` : 'No missions logged yet',
      }
    })
  }, [weeklyActions])

  const toggleAction = (id) => {
    setWeeklyActions((prev) => prev.map((day, dayIndex) => (
      dayIndex === selectedDay
        ? {
            ...day,
            done: day.actions.some((action) => action.id === id && !action.completed)
              ? true
              : day.actions.some((action) => action.id !== id && action.completed),
            actions: day.actions.map((action) =>
              action.id === id ? { ...action, completed: !action.completed } : action,
            ),
          }
        : day
    )))
  }

  const selectDay = (dayIndex) => {
    setSelectedDay(dayIndex)
  }

  const syncImpact = () => {
    setSyncLabel('Impact synced')
    window.setTimeout(() => setSyncLabel('Sync impact'), 1800)
  }

  const selectedDayLabel = selectedDayData.day === 'Fri' ? 'Today' : selectedDayData.day

  useEffect(() => {
    localStorage.setItem('ecotrack-weekly-actions', JSON.stringify(weeklyActions))
  }, [weeklyActions])

  useEffect(() => {
    const handleProfileUpdate = (event) => setProfile(event.detail)
    window.addEventListener('ecotrack-profile-updated', handleProfileUpdate)
    return () => window.removeEventListener('ecotrack-profile-updated', handleProfileUpdate)
  }, [])

  const actionSummary = `${completedCount}/${actions.length} missions complete`
  const weeklyTarget = weeklyActions.length * actions.length
  const weeklyProgress = Math.round((weekCompletedCount / weeklyTarget) * 100)

  const trendData = weeklyActions.map((day) => ({
    label: day.day,
    points: day.actions.reduce((sum, action) => sum + (action.completed ? (selectedImpact === 'points' ? action.points : action.impact?.[selectedImpact] || 0) : 0), 0),
  }))
  const trendMax = Math.max(...trendData.map((item) => item.points), 1)

  const challengeProgress = challenges.map((challenge) => {
    const completedDays = weeklyActions.filter((day) => day.actions.some((action) => action.id === challenge.actionId && action.completed)).length
    const cycleCount = Math.floor(completedDays / challenge.total)
    const current = completedDays % challenge.total
    const status = cycleCount > 0 ? `Cycle ${cycleCount} complete` : current > 0 ? `${challenge.total - current} days left` : 'Ready to start'
    return { ...challenge, current, status }
  })

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Welcome back, {profile.name} 👋</p>
          <h2>
            Your planet is getting healthier.
            <span className="live-status">{selectedDayLabel}: {actionSummary} · {weekPoints} points this week</span>
          </h2>
        </div>

        <div className="points-badge glass-panel">
          <span>{selectedDayLabel} points</span>
          <strong>{totalPoints}</strong>
        </div>

        <button type="button" className="ghost-btn" onClick={syncImpact}>
          {syncLabel} <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="dashboard-grid">
        <section className="main-panel glass-panel large-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Eco Score</p>
              <h3>{score} / 100</h3>
            </div>
            <Sparkles size={18} className="section-icon" />
          </div>

          <EcoScore score={score} label={score >= 80 ? 'Excellent progress' : score >= 60 ? 'Growing steadily' : 'Ready for a reset'} delta={`${totalPoints} eco points earned today`} />
        </section>

        <section className="panel-stack">
          <div className="stack-card glass-panel">
            <div className="section-header compact">
              <div>
                <p className="eyebrow">Today's Actions</p>
                <h3>{selectedDayLabel}'s eco missions</h3>
              </div>
            </div>
            <div className="action-list">
              {actions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onToggle={toggleAction}
                  history={weeklyActions.map((day) => ({ label: day.day, completed: day.actions.some((item) => item.id === action.id && item.completed) }))}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="impact-section-wrap">
        <div className="impact-overview glass-panel">
          <div>
            <p className="eyebrow">This week's impact</p>
            <h3>{weekCompletedCount} of {weeklyTarget} missions completed</h3>
          </div>
          <div className="impact-overview-stat"><span>Eco points</span><strong>{weekPoints}</strong></div>
          <div className="impact-overview-stat"><span>Weekly health</span><strong>{weeklyProgress}%</strong></div>
          <div className="impact-overview-progress"><span style={{ width: `${weeklyProgress}%` }} /></div>
        </div>
        <div className="impact-section">
        {impactStats.map((item) => (
          <ImpactCard
            key={item.label}
            label={item.label}
            value={item.value}
            detail={item.detail}
            accent={item.accent}
            icon={item.icon}
            selected={selectedImpact === item.key}
            onSelect={() => setSelectedImpact(item.key)}
          />
        ))}
        </div>
      </section>

      <section className="lower-grid">
        <EcoWorld score={score} />
        <HabitTracker habits={weeklyActions} selectedDay={selectedDay} onSelectDay={selectDay} onToggleAction={toggleAction} />
      </section>

      <section className="challenge-section">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">Challenges</p>
            <h3>Momentum goals</h3>
          </div>
        </div>

        <div className="challenge-list">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.title}
              challenge={challengeProgress.find((item) => item.title === challenge.title)}
              isSelected={selectedChallenge === challenge.title}
              onSelect={setSelectedChallenge}
            />
          ))}
        </div>
      </section>

      <section className="analytics-section">
        <div className="analytics-grid">
          <div className="chart-card glass-panel">
            <div className="section-header compact">
              <div>
                <p className="eyebrow">Analytics</p>
                <h3>{impactSeed.find((item) => item.key === selectedImpact)?.label} · 7 days</h3>
              </div>
            </div>
            <div className="trend-chart" aria-label={`${selectedImpact} impact for each day this week`}>
              {trendData.map((item) => (
                <div className="trend-column" key={item.label}>
                  <span className="trend-value">{item.points}</span>
                  <div className="trend-track"><span style={{ height: `${Math.max(8, (item.points / trendMax) * 100)}%` }} /></div>
                  <small>{item.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-stats glass-panel">
            <div className="meta-block">
              <Leaf size={18} />
              <div>
                <span>Eco Score</span>
                <strong>{score}</strong>
              </div>
            </div>
            <div className="meta-block">
              <Droplets size={18} />
              <div>
                <span>Water saved</span>
                <strong>{impactStats[1].value}</strong>
              </div>
            </div>
            <div className="meta-block">
              <Lightbulb size={18} />
              <div>
                <span>Energy saved</span>
                <strong>{impactStats[2].value}</strong>
              </div>
            </div>
            <div className="meta-block">
              <Recycle size={18} />
              <div>
                <span>Waste reduced</span>
                <strong>{impactStats[3].value}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
