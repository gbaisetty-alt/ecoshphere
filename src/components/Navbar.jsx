import { MapPinned, MoonStar, Sparkles, SunMedium } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { useTheme } from '../context/ThemeContext'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'My Impact', to: '/dashboard' },
  { label: 'Habits', to: '/dashboard' },
  { label: 'Challenges', to: '/dashboard' },
  { label: 'Eco World', to: '/dashboard' },
  { label: 'Profile', to: '/profile' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="topbar glass-panel">
      <div className="brand-wrap">
        <div className="brand-mark">
          <Sparkles size={16} />
        </div>
        <div>
          <p className="brand-label">ECOTRACK</p>
        </div>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-actions">
        <button className="ghost-btn small" type="button">
          <MapPinned size={15} />
          Local map
        </button>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
        </button>
      </div>
    </header>
  )
}
