import { useEffect, useRef } from 'react'

const DOT_SPACING = 20
const DOT_RADIUS = 1
const DOT_OPACITY = 0.12
const WARP_RADIUS = 120
const WARP_STRENGTH = 14
const HERO_FADE_HEIGHT = 250 // px from page top where dots fade in

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas!.width = window.innerWidth * dpr
      canvas!.height = window.innerHeight * dpr
      canvas!.style.width = `${window.innerWidth}px`
      canvas!.style.height = `${window.innerHeight}px`
      ctx!.scale(dpr, dpr)
    }

    function draw(now: number) {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx!.clearRect(0, 0, w, h)

      const mx = mouse.current.x
      const my = mouse.current.y
      const scrollY = window.scrollY

      const cols = Math.ceil(w / DOT_SPACING) + 2
      const rows = Math.ceil(h / DOT_SPACING) + 2

      // Offset grid so dots tile seamlessly as the page scrolls
      const offsetX = (w - (cols - 1) * DOT_SPACING) / 2
      const offsetY = -(scrollY % DOT_SPACING)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let x = offsetX + c * DOT_SPACING
          let y = offsetY + r * DOT_SPACING

          // Page-space Y position of this dot
          const pageY = y + scrollY

          // Fade dots in below hero — fully hidden at top, fully visible past HERO_FADE_HEIGHT
          const heroAlpha = Math.min(1, Math.max(0, (pageY - HERO_FADE_HEIGHT * 0.5) / (HERO_FADE_HEIGHT * 0.5)))
          if (heroAlpha <= 0) continue

          const dx = x - mx
          const dy = y - my
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < WARP_RADIUS && dist > 0) {
            const force = (1 - dist / WARP_RADIUS) * WARP_STRENGTH
            x += (dx / dist) * force
            y += (dy / dist) * force
          }

          ctx!.fillStyle = `rgba(0, 0, 0, ${DOT_OPACITY * heroAlpha})`
          ctx!.beginPath()
          ctx!.arc(x, y, DOT_RADIUS, 0, Math.PI * 2)
          ctx!.fill()
        }
      }

      raf.current = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    resize()
    raf.current = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}

export default DotGrid
