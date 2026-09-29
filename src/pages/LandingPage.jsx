import { ArrowRight, Globe2, Leaf, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ecoPlanetSvg from '../assets/eco-planet.svg'
import { EcoScore } from '../components/EcoScore'
import { LeafBurst } from '../components/LeafBurst'
import { ThoughtsCard } from '../components/ThoughtsCard'
import { getProfile } from '../utils/profile'

export function LandingPage() {
  const [profile, setProfile] = useState(getProfile)

  useEffect(() => {
    const handleProfileUpdate = (event) => setProfile(event.detail)
    window.addEventListener('ecotrack-profile-updated', handleProfileUpdate)
    return () => window.removeEventListener('ecotrack-profile-updated', handleProfileUpdate)
  }, [])

  return (
    <div className="page-shell">
      <LeafBurst />

      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow-row">
            <Sparkles size={14} />
            <span>Sustainable living, reimagined</span>
          </div>
          <h1>Your Actions.<br />Your Impact.<br />Your Earth.</h1>
          <p>
            Turn everyday sustainable choices into a healthier digital planet.
          </p>

          <div className="hero-actions">
            <Link to="/dashboard" className="primary-btn">
              Enter My Earth
              <ArrowRight size={16} />
            </Link>
            <button type="button" className="secondary-btn">
              Explore Your World
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>12k+</strong>
              <span>eco actions logged</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>planet impact score</span>
            </div>
            <div>
              <strong>87%</strong>
              <span>habit retention</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-stack">
          <div className="earth-panel glass-panel">
            <div className="earth-visual">
              <div className="planet-orbit" />
              <img src={ecoPlanetSvg} alt="EcoTrack planet illustration" className="planet-image" />
              <div className="light-pulse pulse-1" />
              <div className="light-pulse pulse-2" />
            </div>

            <div className="floating-score glass-panel">
              <div className="mini-row">
                <Leaf size={15} />
                <span>YOUR ECO SCORE</span>
              </div>
              <div className="mini-score-row">
                <strong>Welcome back, {profile.name} 🌱</strong>
                <div className="mini-progress">
                  <span style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </div>

          <ThoughtsCard />
        </div>
      </section>

      <section className="feature-strip">
        <div className="feature-pill glass-panel">
          <Globe2 size={18} />
          <span>Carbon-aware choices</span>
        </div>
        <div className="feature-pill glass-panel">
          <Leaf size={18} />
          <span>Energy conscious</span>
        </div>
        <div className="feature-pill glass-panel">
          <Sparkles size={18} />
          <span>Built for sustainable routines</span>
        </div>
      </section>

      <section className="hero-insight d-grid">
        <EcoScore score={78} label={`${profile.name}'s digital Earth`} delta="Your next action changes the world" />
      </section>
    </div>
  )
}
