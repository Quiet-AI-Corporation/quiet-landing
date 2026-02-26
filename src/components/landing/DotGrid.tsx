import { useEffect, useRef } from 'react'

const DOT_SPACING = 20
const DOT_RADIUS = 1
const DOT_OPACITY = 0.12
const WARP_RADIUS = 120
const WARP_STRENGTH = 14
const HERO_FADE_HEIGHT = 250 // px from page top where dots fade in

// Twinkle settings
const TWINKLE_COUNT = 600       // max twinkles alive at once
const TWINKLE_DURATION = 1200   // ms for full lifecycle
const TWINKLE_INTERVAL = 3     // ms between spawning new twinkles
const CROSS_LENGTH = DOT_SPACING * 2  // px max length of each arm — reaches 2 dots out

interface Twinkle {
  x: number  // page-space x
  y: number  // page-space y
  start: number
}

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const raf = useRef<number>(0)
  const twinkles = useRef<Twinkle[]>([])
  const lastTwinkleSpawn = useRef<number>(0)

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

      // Spawn new twinkles at random grid-snapped positions
      if (now - lastTwinkleSpawn.current > TWINKLE_INTERVAL && twinkles.current.length < TWINKLE_COUNT) {
        const pageHeight = document.documentElement.scrollHeight
        // Snap to grid positions so twinkles appear on actual dots
        const col = Math.floor(Math.random() * cols)
        const offsetX = (w - (cols - 1) * DOT_SPACING) / 2
        const tx = offsetX + col * DOT_SPACING
        const totalRows = Math.ceil(pageHeight / DOT_SPACING)
        const row = Math.floor(Math.random() * totalRows)
        const ty = row * DOT_SPACING
        twinkles.current.push({ x: tx, y: ty, start: now })
        lastTwinkleSpawn.current = now
      }

      // Remove expired twinkles
      twinkles.current = twinkles.current.filter(t => now - t.start < TWINKLE_DURATION)

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

      // Draw twinkle crosses on top
      for (const t of twinkles.current) {
        // Convert page-space y to screen-space
        const screenY = t.y - scrollY
        const screenX = t.x

        // Skip if off screen
        if (screenY < -CROSS_LENGTH || screenY > h + CROSS_LENGTH) continue
        if (screenX < -CROSS_LENGTH || screenX > w + CROSS_LENGTH) continue

        // Hero fade
        const heroAlpha = Math.min(1, Math.max(0, (t.y - HERO_FADE_HEIGHT * 0.5) / (HERO_FADE_HEIGHT * 0.5)))
        if (heroAlpha <= 0) continue

        const progress = (now - t.start) / TWINKLE_DURATION

        // Arms grow outward: fast at first then slower (easeOut)
        const eased = 1 - Math.pow(1 - progress, 0.4)
        const armLen = CROSS_LENGTH * eased

        // Fade out as they grow
        const lineAlpha = (1 - progress) * 0.9 * heroAlpha

        // Blue dot at center — subtle
        ctx!.fillStyle = `rgba(59, 130, 246, ${lineAlpha * 0.5})`
        ctx!.beginPath()
        ctx!.arc(screenX, screenY, DOT_RADIUS, 0, Math.PI * 2)
        ctx!.fill()

        // Cross lines — thicker and bolder
        ctx!.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`
        ctx!.lineWidth = 1.5
        ctx!.beginPath()
        ctx!.moveTo(screenX, screenY - armLen)
        ctx!.lineTo(screenX, screenY + armLen)
        ctx!.moveTo(screenX - armLen, screenY)
        ctx!.lineTo(screenX + armLen, screenY)
        ctx!.stroke()
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
