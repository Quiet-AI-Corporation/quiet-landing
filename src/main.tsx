import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './pages/LandingPage'
import WorkflowDemoPage from './pages/WorkflowDemoPage'
import PurchasingDemoPage from './pages/PurchasingDemoPage'
import AccountsPayablePage from './pages/AccountsPayablePage'
import POLifecyclePage from './pages/POLifecyclePage'
import ThreeWayMatchPage from './pages/ThreeWayMatchPage'
import CashManagementPage from './pages/CashManagementPage'
import PricingPage from './pages/PricingPage'
import SetupPage from './pages/SetupPage'
import IntegrationsPage from './pages/IntegrationsPage'
import AboutPage from './pages/AboutPage'
import FraudPreventionPage from './pages/FraudPreventionPage'
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
  if (route === 'accounts-payable') return <AccountsPayablePage />
  if (route === 'po-lifecycle') return <POLifecyclePage />
  if (route === 'three-way-match') return <ThreeWayMatchPage />
  if (route === 'cash-management') return <CashManagementPage />
  if (route === 'fraud-prevention') return <FraudPreventionPage />
  if (route === 'pricing') return <PricingPage />
  if (route === 'setup') return <SetupPage />
  if (route === 'integrations') return <IntegrationsPage />
  if (route === 'about') return <AboutPage />
  return <LandingPage />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
