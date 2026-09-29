export function EcoWorld({ score }) {
  const ecosystemProgress = Math.min(100, score)
  const showPlants = ecosystemProgress >= 20
  const showTrees = ecosystemProgress >= 40
  const showRiver = ecosystemProgress >= 60
  const showWildlife = ecosystemProgress >= 80

  return (
    <div className="world-panel glass-panel">
      <div className="section-header compact">
        <div>
          <p className="eyebrow">Eco World</p>
          <h3>YOUR WORLD</h3>
        </div>
      </div>

      <div className="eco-world" aria-label="Your ecosystem progress">
        <div className="world-glow" />
        <div className="world-surface" />

        <div className={`plant plant-1 ${showPlants ? 'visible' : ''}`} />
        <div className={`plant plant-2 ${showPlants ? 'visible' : ''}`} />
        <div className={`plant plant-3 ${showPlants ? 'visible' : ''}`} />
        <div className={`tree tree-1 ${showTrees ? 'visible' : ''}`} />
        <div className={`tree tree-2 ${showTrees ? 'visible' : ''}`} />
        <div className={`tree tree-3 ${showTrees ? 'visible' : ''}`} />

        <div className={`river ${showRiver ? 'visible' : ''}`} />
        <div className={`bird bird-1 ${showWildlife ? 'visible' : ''}`} />
        <div className={`bird bird-2 ${showWildlife ? 'visible' : ''}`} />
      </div>

      <div className="world-message">
        <span>Your ecosystem is {ecosystemProgress}% restored.</span>
      </div>
    </div>
  )
}
