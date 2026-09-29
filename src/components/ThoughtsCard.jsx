import { Send } from 'lucide-react'

export function ThoughtsCard() {
  return (
    <div className="thoughts-panel glass-panel">
      <div className="thoughts-header">
        <div>
          <p className="eyebrow-row small">My thoughts</p>
        </div>
      </div>

      <label className="thoughts-label" htmlFor="thoughts">
        What inspired your eco choice today?
      </label>

      <textarea
        id="thoughts"
        className="thoughts-input"
        placeholder="Write a short reflection..."
        rows={5}
      />

      <button type="button" className="primary-btn thoughts-btn">
        Share
        <Send size={15} />
      </button>
    </div>
  )
}
