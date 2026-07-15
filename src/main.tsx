import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './pages/LandingPage'
import PurchasingPage from './pages/PurchasingPage'
import DemandPlanningPage from './pages/DemandPlanningPage'
import SalesAnalyticsPage from './pages/SalesAnalyticsPage'
import BusinessOwnersPage from './pages/BusinessOwnersPage'
import HeadsOfFinancePage from './pages/HeadsOfFinancePage'
import ControllersPage from './pages/ControllersPage'
import ProcurementLeadersPage from './pages/ProcurementLeadersPage'
import SetupPage from './pages/SetupPage'
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
    title: 'Quiet Software | Agentic AI for Your Back Office',
    description: 'Pre-built AI software, adapted to your back office. Quiet AI runs AP, purchasing, and cash management for small and medium businesses — it learns how you already work.',
  },
  '/purchasing': {
    title: 'Quiet Software | Purchasing on Autopilot',
    description: 'Quiet AI automates accounts payable from vendor quote to booked bill. AI-powered purchasing automation that handles invoices, POs, GL coding, and payments — you just approve.',
  },
  '/demand-planning': {
    title: 'Quiet Software | Demand Planning',
    description: 'AI-driven demand forecasting that turns sales history and open orders into purchasing recommendations from Quiet AI.',
  },
  '/sales-analytics': {
    title: 'Quiet Software | Sales Analytics',
    description: 'AI-powered revenue and margin analytics on top of the data Quiet AI already syncs from your ERP.',
  },
  '/business-owners': {
    title: 'Quiet Software | For Business Owners',
    description: 'Run your back office without hiring for it. Quiet AI handles purchasing, AP, and cash management so you can stay focused on the business.',
  },
  '/heads-of-finance': {
    title: 'Quiet Software | For Heads of Finance',
    description: 'Leverage for your finance team. Automate the transactional work so your team can focus on planning, not processing.',
  },
  '/controllers': {
    title: 'Quiet Software | For Controllers',
    description: 'Close faster with cleaner books. Every invoice coded, matched, and audit-trailed automatically.',
  },
  '/procurement-leaders': {
    title: 'Quiet Software | For Procurement Leaders',
    description: 'Every purchase, on process. From request to PO to receipt, Quiet AI keeps purchasing compliant and visible.',
  },
  '/setup': {
    title: 'Quiet Software | Setup',
    description: 'We learn how your back office works, adapt our modules to your exact operations, and have you live in under 2 business days. No implementation project.',
  },
  '/accounts-payable': {
    title: 'Quiet Software | Accounts Payable Automation',
    description: 'End-to-end AP automation — from invoice intake to payment. Quiet AI handles GL coding, approvals, and vendor communication so no humans are needed until it\'s time to pay.',
  },
  '/po-lifecycle': {
    title: 'Quiet Software | PO Lifecycle Management',
    description: 'AI turns vendor quotes into purchase orders, routes them for approval, and tracks fulfillment. Fully automated PO lifecycle management.',
  },
  '/three-way-match': {
    title: 'Quiet Software | 3 Way Match Automation',
    description: 'Touchless three-way matching between purchase orders, receipts, and invoices. Catch discrepancies before they become problems.',
  },
  '/cash-management': {
    title: 'Quiet Software | Cash Management',
    description: 'A complete picture of money in and money out. AI-powered cash flow tracking and payment scheduling.',
  },
  '/fraud-prevention': {
    title: 'Quiet Software | Fraud & Duplicate Prevention',
    description: 'Every invoice verified before it gets paid. AI catches duplicates, anomalies, and suspicious invoices automatically.',
  },
  '/pricing': {
    title: 'Quiet Software | Pricing',
    description: 'Simple, transparent pricing for AI-powered accounts payable automation. Get started with Quiet AI.',
  },
  '/about': {
    title: 'Quiet Software | About',
    description: 'Learn about Quiet AI — the team building agentic AI for financial operations.',
  },
  '/demo': {
    title: 'Quiet Software | Workflow Demo',
    description: 'See how Quiet AI automates accounts payable workflows from end to end.',
  },
  '/purchasing-demo': {
    title: 'Quiet Software | Purchasing Demo',
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

  switch (route) {
    case '/purchasing': return <PurchasingPage />
    case '/demand-planning': return <DemandPlanningPage />
    case '/sales-analytics': return <SalesAnalyticsPage />
    case '/business-owners': return <BusinessOwnersPage />
    case '/heads-of-finance': return <HeadsOfFinancePage />
    case '/controllers': return <ControllersPage />
    case '/procurement-leaders': return <ProcurementLeadersPage />
    case '/setup': return <SetupPage />
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
