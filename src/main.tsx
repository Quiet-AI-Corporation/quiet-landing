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
import AboutPage from './pages/AboutPage'
import FraudPreventionPage from './pages/FraudPreventionPage'
import './index.css'

/** SEO metadata per route */
const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Purchasing on Autopilot | Quiet AI',
    description: 'Quiet AI automates accounts payable from vendor quote to booked bill. AI-powered purchasing automation that handles invoices, POs, GL coding, and payments — you just approve.',
  },
  '/accounts-payable': {
    title: 'Accounts Payable Automation | Quiet AI',
    description: 'End-to-end AP automation — from invoice intake to payment. Quiet AI handles GL coding, approvals, and vendor communication so no humans are needed until it\'s time to pay.',
  },
  '/po-lifecycle': {
    title: 'PO Lifecycle Management | Quiet AI',
    description: 'AI turns vendor quotes into purchase orders, routes them for approval, and tracks fulfillment. Fully automated PO lifecycle management.',
  },
  '/three-way-match': {
    title: '3 Way Match Automation | Quiet AI',
    description: 'Touchless three-way matching between purchase orders, receipts, and invoices. Catch discrepancies before they become problems.',
  },
  '/cash-management': {
    title: 'Cash Management | Quiet AI',
    description: 'A complete picture of money in and money out. AI-powered cash flow tracking and payment scheduling.',
  },
  '/fraud-prevention': {
    title: 'Fraud & Duplicate Prevention | Quiet AI',
    description: 'Every invoice verified before it gets paid. AI catches duplicates, anomalies, and suspicious invoices automatically.',
  },
  '/pricing': {
    title: 'Pricing | Quiet AI',
    description: 'Simple, transparent pricing for AI-powered accounts payable automation. Get started with Quiet AI.',
  },
  '/about': {
    title: 'About | Quiet AI',
    description: 'Learn about Quiet AI — the team building agentic AI for financial operations.',
  },
  '/demo': {
    title: 'Workflow Demo | Quiet AI',
    description: 'See how Quiet AI automates accounts payable workflows from end to end.',
  },
  '/purchasing-demo': {
    title: 'Purchasing Demo | Quiet AI',
    description: 'Interactive demo of Quiet AI\'s purchasing automation capabilities.',
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
      // Handle hash-only links on the current page (e.g. /#integrations)
      if (href.startsWith('/#')) {
        e.preventDefault()
        const id = href.slice(2)
        if (route !== '/') {
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

  switch (route) {
    case '/demo': return <WorkflowDemoPage />
    case '/purchasing-demo': return <PurchasingDemoPage />
    case '/accounts-payable': return <AccountsPayablePage />
    case '/po-lifecycle': return <POLifecyclePage />
    case '/three-way-match': return <ThreeWayMatchPage />
    case '/cash-management': return <CashManagementPage />
    case '/fraud-prevention': return <FraudPreventionPage />
    case '/pricing': return <PricingPage />
    case '/about': return <AboutPage />
    default: return <LandingPage />
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
