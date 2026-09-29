import { Check, Droplets, Leaf, Recycle, Sparkles, Trees, Trophy, Zap } from 'lucide-react'
import { useState } from 'react'

import { AchievementBadge } from '../components/AchievementBadge'
import { profileAchievements } from '../data/mockData'
import { getProfile, saveProfile } from '../utils/profile'

export function ProfilePage() {
  const [name, setName] = useState(() => getProfile().name)
  const [saved, setSaved] = useState(false)

  const updateName = (event) => {
    event.preventDefault()
    const cleanName = name.trim() || 'Alex'
    setName(cleanName)
    saveProfile({ name: cleanName })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div className="profile-page">
      <div className="profile-card glass-panel">
        <div className="profile-header">
          <div className="avatar-ring">
            <span>{name.slice(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <p className="eyebrow">Profile</p>
            <h2>{name}</h2>
          </div>
        </div>

        <div className="profile-stats">
          <div>
            <span>Eco Score</span>
            <strong>78</strong>
          </div>
          <div>
            <span>Current streak</span>
            <strong>12 days</strong>
          </div>
          <div>
            <span>Total CO₂ saved</span>
            <strong>124 kg</strong>
          </div>
        </div>
      </div>

      <form className="profile-card glass-panel profile-edit" onSubmit={updateName}>
        <div>
          <p className="eyebrow">Personalize your Earth</p>
          <h3>What should we call you?</h3>
        </div>
        <div className="profile-edit-row">
          <input aria-label="Your name" value={name} onChange={(event) => setName(event.target.value)} maxLength={28} />
          <button type="submit" className="primary-btn"><Check size={16} /> {saved ? 'Saved' : 'Save name'}</button>
        </div>
      </form>

      <div className="achievement-grid">
        {profileAchievements.map(({ title, icon: Icon }) => (
          <AchievementBadge key={title} title={title} Icon={Icon} />
        ))}
      </div>

      <div className="profile-summary glass-panel">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">Milestones</p>
            <h3>Achievements unlocked</h3>
          </div>
          <Trophy size={18} />
        </div>

        <div className="summary-grid">
          <div>
            <Leaf size={18} />
            <span>First Step</span>
          </div>
          <div>
            <Recycle size={18} />
            <span>Recycling Hero</span>
          </div>
          <div>
            <Zap size={18} />
            <span>Green Commuter</span>
          </div>
          <div>
            <Droplets size={18} />
            <span>Water Saver</span>
          </div>
          <div>
            <Trees size={18} />
            <span>Planet Protector</span>
          </div>
          <div>
            <Sparkles size={18} />
            <span>Eco Visionary</span>
          </div>
        </div>
      </div>
    </div>
  )
}
