export function ChallengeCard({ challenge, isSelected, onSelect }) {
  const progress = (challenge.current / challenge.total) * 100

  return (
    <button
      type="button"
      className={isSelected ? 'challenge-card glass-panel selected' : 'challenge-card glass-panel'}
      onClick={() => onSelect(challenge.title)}
    >
      <div className="challenge-head">
        <div>
          <p className="challenge-title">{challenge.title}</p>
          <span>{challenge.duration}</span>
        </div>
        <span className="ghost-btn small compact challenge-status">{challenge.status}</span>
      </div>

      <div className="challenge-progress">
        <div className="challenge-copy">
          <strong>
            {challenge.current} / {challenge.total} completed
          </strong>
          <span>Reward: {challenge.reward} pts</span>
        </div>
        <div className="progress-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </button>
  )
}
