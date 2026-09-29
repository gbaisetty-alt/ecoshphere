import { useEffect, useState } from 'react'

export function EcoScore({ score, label = 'Excellent progress', delta = '+12 points this week' }) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 700
    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      setAnimatedScore(Math.round(score * progress))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    const frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [score])

  const circumference = 2 * Math.PI * 54
  const dashOffset = circumference - (animatedScore / 100) * circumference

  return (
    <div className="score-panel glass-panel">
      <div className="score-ring-wrap">
        <svg className="score-ring" viewBox="0 0 140 140" aria-label="Eco score">
          <circle cx="70" cy="70" r="54" className="ring-bg" />
          <circle
            cx="70"
            cy="70"
            r="54"
            className="ring-progress"
            style={{ strokeDasharray: circumference, strokeDashoffset: dashOffset }}
          />
        </svg>
        <div className="score-center">
          <strong>{animatedScore}</strong>
          <span>/ 100</span>
        </div>
      </div>

      <div className="score-copy">
        <h3>{label}</h3>
        <p>{delta}</p>
      </div>
    </div>
  )
}
