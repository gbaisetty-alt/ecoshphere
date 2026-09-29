import { Route, Routes } from 'react-router-dom'

import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'
import { ProfilePage } from './pages/ProfilePage'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <div className="background-glow glow-one" />
        <div className="background-glow glow-two" />
        <div className="background-glow glow-three" />
        <div className="noise-overlay" />

        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
