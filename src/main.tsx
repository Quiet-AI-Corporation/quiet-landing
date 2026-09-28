import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './pages/LandingPage'
import './index.css'

/** SEO metadata per route */
const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Quiet AI | The Agentic ERP and MES',
    description: 'Quiet AI handles the back office so your team can focus on building.',
  },
}

function getRoute(): string {
  return window.location.pathname
}

/** Navigate without full page reload */
export function navigate(to: string) {
  window.history.pushState(null, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function Root() {
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onChange = () => setRoute(getRoute())
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  // Update document metadata and scroll position on route change
  useEffect(() => {
    const meta = routeMeta[route]
    if (meta) {
      document.title = meta.title
      const descTag = document.querySelector('meta[name="description"]')
      if (descTag) descTag.setAttribute('content', meta.description)
      const canonicalTag = document.querySelector('link[rel="canonical"]')
      if (canonicalTag) canonicalTag.setAttribute('href', `https://www.tryquiet.ai${route === '/' ? '/' : route}`)
    }

    // Handle hash scrolling (e.g. /#integrations)
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [route])

  // Intercept internal link clicks for SPA navigation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return
      // Skip external links, new-tab links, and non-left-clicks
      if (href.startsWith('http') || href.startsWith('mailto:') || anchor.target === '_blank') return
      if (e.metaKey || e.ctrlKey || e.shiftKey) return
      // Handle hash links (e.g. /#integrations, /purchasing#setup)
      if (href.startsWith('/') && href.includes('#') && !href.endsWith('.html')) {
        e.preventDefault()
        const [path, id] = href.split('#')
        const targetPath = path || '/'
        if (route !== targetPath) {
          window.history.pushState(null, '', href)
          window.dispatchEvent(new PopStateEvent('popstate'))
        } else {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
          window.history.replaceState(null, '', href)
        }
        return
      }
      // Handle internal path links
      if (href.startsWith('/') && !href.endsWith('.html')) {
        e.preventDefault()
        navigate(href)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [route])

  // Every path renders the minimal landing page. The routing machinery above is
  // kept for when additional pages come back.
  return <LandingPage />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
