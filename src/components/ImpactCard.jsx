export function ImpactCard({ label, value, detail, accent, icon: Icon, selected, onSelect }) {
  return (
    <button type="button" className={`impact-card glass-panel ${selected ? 'selected' : ''}`} onClick={onSelect} aria-pressed={selected}>
      <div className={`impact-icon accent-${accent}`}>
        <Icon size={18} />
      </div>
      <div>
        <p>{label}</p>
        <h4>{value}</h4>
        <span>{detail}</span>
      </div>
    </button>
  )
}
