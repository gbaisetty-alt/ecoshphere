import { useEffect, useRef } from 'react'

export function LeafBurst() {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClick = (event) => {
      const layer = containerRef.current
      if (!layer) return

      const count = 10

      for (let index = 0; index < count; index += 1) {
        const leaf = document.createElement('span')
        leaf.className = 'leaf-particle'

        const offsetX = event.clientX
        const offsetY = event.clientY
        const driftX = (Math.random() - 0.5) * 140
        const driftY = -(Math.random() * 140 + 80)
        const rotate = Math.random() * 260 - 130

        leaf.style.left = `${offsetX}px`
        leaf.style.top = `${offsetY}px`
        leaf.style.setProperty('--drift-x', `${driftX}px`)
        leaf.style.setProperty('--drift-y', `${driftY}px`)
        leaf.style.setProperty('--rotate', `${rotate}deg`)
        leaf.style.setProperty('--scale', `${0.7 + Math.random() * 0.9}`)
        leaf.style.setProperty('--delay', `${index * 30}ms`)

        layer.appendChild(leaf)
        setTimeout(() => leaf.remove(), 1600)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return <div className="leaf-burst-layer" ref={containerRef} aria-hidden="true" />
}
