import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './pages/LandingPage'
import WorkflowDemoPage from './pages/WorkflowDemoPage'
import PurchasingDemoPage from './pages/PurchasingDemoPage'
import './index.css'

function readRoute(): string {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return hash
}

function Root() {
  const [route, setRoute] = useState(readRoute())

  useEffect(() => {
    const onChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  if (route === 'demo') return <WorkflowDemoPage />
  if (route === 'purchasing-demo') return <PurchasingDemoPage />
  return <LandingPage />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
