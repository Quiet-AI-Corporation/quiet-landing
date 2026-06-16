import { useState, useEffect, useRef, useCallback } from 'react'
import { Link2, BookOpen, Inbox, Landmark, UserCheck, ArrowRight, Clock, MessageSquare, Lock, Eye, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import PurchasingWorkflowPlayer from '@/components/landing/PurchasingWorkflowPlayer'
import PurchasingWorkflowStatic from '@/components/landing/PurchasingWorkflowStatic'
import AuditLogAnimation from '@/components/landing/AuditLogAnimation'
import DotGrid from '@/components/landing/DotGrid'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import logo from '@/assets/images/logo.png'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import outlookLogo from '@/assets/images/outlook_logo.webp'
import netsuiteLogo from '@/assets/images/netsuite_logo.webp'
import qboLogo from '@/assets/images/qbo_logo.webp'
import sageLogo from '@/assets/images/sage_logo.webp'
import plaidLogo from '@/assets/images/plaid_logo.webp'
import xeroLogo from '@/assets/images/xero_logo.webp'
import freshbooksLogo from '@/assets/images/freshbooks_logo.webp'
import slackLogo from '@/assets/images/slack_logo.png'

function LandingPage() {
  const [selectedItem, setSelectedItem] = useState<string>('mailbox')
  const diagramTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const DIAGRAM_CYCLE = ['mailbox', 'slack', 'mailbox-dot', 'slack-dot', 'quiet', 'bank-dot', 'bank', 'erp-dot', 'erp'] as const

  const scheduleDiagramNext = useCallback((current: string) => {
    if (diagramTimerRef.current) clearTimeout(diagramTimerRef.current)
    if (diagramHoveredRef.current) return
    diagramTimerRef.current = setTimeout(() => {
      const idx = DIAGRAM_CYCLE.indexOf(current as typeof DIAGRAM_CYCLE[number])
      const next = DIAGRAM_CYCLE[(idx + 1) % DIAGRAM_CYCLE.length]
      setSelectedItem(next)
    }, 3000)
  }, [])

  useEffect(() => {
    scheduleDiagramNext(selectedItem)
    return () => {
      if (diagramTimerRef.current) clearTimeout(diagramTimerRef.current)
    }
  }, [selectedItem, scheduleDiagramNext])

  const diagramHoveredRef = useRef(false)

  const handleItemHover = (id: string) => {
    diagramHoveredRef.current = true
    if (diagramTimerRef.current) clearTimeout(diagramTimerRef.current)
    setSelectedItem(id)
  }

  const handleDiagramLeave = () => {
    diagramHoveredRef.current = false
    scheduleDiagramNext(selectedItem)
  }

  const diagramCaptions: Record<string, { title: string; subtitle: string; body: string[] }> = {
    'mailbox': {
      title: 'Purchasing / AP Mailboxes',
      subtitle: 'Where purchase orders, invoices, and vendor correspondence land',
      body: [
        'Existing inbox — Hooks up to purchasing@yourcompany.com or wherever vendors send quotes and invoices today',
        'Full visibility — Sees quotes, purchase orders, invoices, payment inquiries, W-9s, and everything else your vendors and team send',
        'No change for vendors — No new portals for them, no manual file uploading for you',
        'Gmail and Outlook — Both fully supported',
      ],
    },
    'mailbox-dot': {
      title: 'API Connection',
      subtitle: 'Vendor emails in. Email drafts, approval requests, and confirmations back out',
      body: [
        'Inbound — All emails and attachments flow into Quiet AI automatically',
        'Outbound — Drafts flow back: vendor replies, clarification requests, payment confirmations',
        'Approvals — Approval requests and responses route through the same mailbox connection',
        'Your control — Nothing sends until you approve it inside Quiet AI',
      ],
    },
    'quiet': {
      title: 'Quiet AI',
      subtitle: 'Intelligent AP orchestration engine',
      body: [
        'Workflow orchestration — for quote intake, PO drafting, invoice processing, vendor onboarding, line item coding, approval orchestration, and fuzzy edge cases where deterministic logic fails',
        'Duplicate invoices & fraud attempts — Caught and flagged for your inspection',
        'Intelligent clarification — When something\'s ambiguous, Quiet AI asks you instead of guessing',
        'Your configuration — You can set approval workflows, GL coding guidelines, and validation rules',
      ],
    },
    'slack-dot': {
      title: 'API Connection',
      subtitle: 'A conversational interface to your purchasing workflows',
      body: [
        'Direct channel — Talk to the Quiet AI agent right from Slack',
        'Push & pull — Submit documents, ask questions, and get notified all in one place',
        'Approvals in-thread — Approve or reject requests without leaving Slack',
      ],
    },
    'slack': {
      title: 'Slack',
      subtitle: 'Talk to the agent over Slack',
      body: [
        'Submit documents — Send quotes, POs, and invoices directly to the Quiet AI agent',
        'Approval requests — Handle approval requests and respond without switching apps',
        'Clarifying asks — When the AI agent needs more info, it asks you in Slack and you reply in-thread',
        'Full visibility — Check status, ask questions, and get updates on any purchase',
      ],
    },
    'bank-dot': {
      title: 'Connected to your bank via Plaid',
      subtitle: 'Payments staged but never auto-sent',
      body: [
        'Review first — Quiet AI prepares each payment and presents it for your review',
        'You approve — Quiet AI moves the money from your bank account to the vendor',
        'Auto-sync — Payment status syncs back so your records stay current automatically',
      ],
    },
    'bank': {
      title: 'Your Bank Account',
      subtitle: 'The same operating account you already use',
      body: [
        'Broad support — Quiet AI works with most major financial institutions via Plaid',
        'Staged drafts — Payments are always staged as drafts, nothing is sent until you give final approval',
        'Auto-sync — Once payments clear, status syncs back automatically',
      ],
    },
    'erp-dot': {
      title: 'API Connection',
      subtitle: 'Two-way sync keeps everything current',
      body: [
        'Pulls in — Your vendor list, GL accounts, POs, and other accounting categories stay current',
        'Pushes back — New POs, coded invoices, and payment records sync automatically',
        'No drift — No duplicate entry, no divergence between systems',
      ],
    },
    'erp': {
      title: 'Your ERP',
      subtitle: 'Your accounting source of truth',
      body: [
        'Your data — GL, chart of accounts, vendor master list, POs, and payment history in QuickBooks, Netsuite, Xero, Sage, or many others',
        'Source of truth — Your books stay here, Quiet AI doesn\'t replace them',
        'Zero config — No remapping, no configuration spreadsheets',
      ],
    },
  }

  return (
    <TooltipProvider>
    <div className="min-h-screen bg-white">
      <DotGrid />
    <div className="relative z-10">
      <Nav />

      {/* Hero */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-fit mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 bg-white rounded-xl py-1.5 px-3 w-fit mx-auto">
              Agentic AI for Financial Operations
            </p>
            <h1 className="mt-1 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              Your last back-office hire
            </h1>
            <p className="mt-1 text-xl text-gray-600 max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              AP, purchasing, matching, and cash management in 10 human minutes per week.
            </p>
          </div>
        </div>
        {/* Purchasing workflow player */}
        <div className="mt-2 md:mt-12 max-w-6xl mx-auto relative z-10 bg-white rounded-2xl p-4">
          <div className="hidden md:block">
            <PurchasingWorkflowPlayer />
          </div>
          <div className="block md:hidden">
            <PurchasingWorkflowStatic />
          </div>
        </div>
        {/* How it works */}
        <div className="mt-12 max-w-5xl mx-auto relative z-10">
          <div className="mb-8 w-fit mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              How it works
            </h2>
            <p className="mt-1 text-lg text-gray-500 text-center max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              Zero-touch until you're needed. Full control, always.
            </p>
          </div>

          {/* 3-box diagram — CSS grid aligns icon/heading/paragraph rows across all 3 boxes */}
          <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] items-start">
            {/* Box 1 */}
            <div className="bg-white rounded-xl p-1 h-full">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center h-full grid grid-rows-[40px_auto_1fr] gap-y-1">
              <div className="flex items-center justify-center gap-2 mx-auto">
                <img src={gmailLogo} alt="Gmail" className="h-6 w-6 object-contain" />
                <img src={outlookLogo} alt="Outlook" className="h-6 w-6 object-contain" />
                <img src={slackLogo} alt="Slack" className="h-6 w-6 object-contain" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Message arrives</h3>
              <p className="text-sm text-gray-500 leading-relaxed pt-2">
                A purchase request from your team in Slack, an inbound invoice from a vendor, a pricing inquiry, a W-9. Anything that touches your purchasing workflow.
              </p>
            </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center px-3 py-2 self-center">
              <ArrowRight className="w-5 h-5 text-gray-300" />
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-xl p-1 h-full">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center h-full grid grid-rows-[40px_auto_1fr] gap-y-1">
              <div className="flex items-center justify-center mx-auto">
                <img src={logo} alt="Quiet AI" className="h-8" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Quiet AI handles it</h3>
              <p className="text-sm text-gray-500 leading-relaxed pt-2">
                Reads the message, figures out what it is, and takes the next step: drafting a PO, coding an invoice, responding to a vendor, requesting approval, or flagging something that needs your attention.
              </p>
            </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center px-3 py-2 self-center">
              <ArrowRight className="w-5 h-5 text-gray-300" />
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-xl p-1 h-full">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center h-full grid grid-rows-[40px_auto_1fr] gap-y-1">
              <div className="flex items-center justify-center mx-auto">
                <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-900">You stay in control</h3>
              <p className="text-sm text-gray-500 leading-relaxed pt-2">
                Most workflows run start to finish without you. When there's a payment to approve, a PO to sign off on, or an exception that needs judgment, the AI brings it to you. You can step in and course-correct at any point, but you only have to when it matters.
              </p>
            </div>
            </div>
          </div>

          {/* Mobile stacked layout */}
          <div className="flex flex-col gap-4 md:hidden">
            <div className="bg-white rounded-xl p-1">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <div className="h-10 flex items-center justify-center gap-2 mx-auto mb-3">
                <img src={gmailLogo} alt="Gmail" className="h-6 w-6 object-contain" />
                <img src={outlookLogo} alt="Outlook" className="h-6 w-6 object-contain" />
                <img src={slackLogo} alt="Slack" className="h-6 w-6 object-contain" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Message arrives</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                A purchase request from your team in Slack, an inbound invoice from a vendor, a pricing inquiry, a W-9. Anything that touches your purchasing workflow.
              </p>
            </div>
            </div>
            <div className="bg-white rounded-xl p-1">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <div className="h-10 flex items-center justify-center mx-auto mb-3">
                <img src={logo} alt="Quiet AI" className="h-8" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Quiet AI handles it</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Reads the message, figures out what it is, and takes the next step: drafting a PO, coding an invoice, responding to a vendor, requesting approval, or flagging something that needs your attention.
              </p>
            </div>
            </div>
            <div className="bg-white rounded-xl p-1">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <div className="h-10 flex items-center justify-center mx-auto mb-3">
                <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">You stay in control</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Most workflows run start to finish without you. When there's a payment to approve, a PO to sign off on, or an exception that needs judgment, the AI brings it to you. You can step in and course-correct at any point, but you only have to when it matters.
              </p>
            </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center relative z-10 bg-white rounded-2xl py-8 px-4 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Want to see this on your own purchases?
          </h2>
          <p className="mt-1 text-lg text-gray-500 text-center max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
            Live in &lt; 1 hour. Or start in Observation Mode to see what Quiet AI <em>would</em> do.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button size="lg" asChild>
              <a href="https://quietai.fillout.com/book">
                Get a demo
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* How it connects */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div id="integrations" className="mb-6 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              Plugs into the tools you already use
            </h2>
            <p className="mt-1 text-lg text-gray-500 text-center max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              Quiet AI sits between your inbox, your bank, and your ERP so your existing workflows
              don't change, they just get faster.
            </p>
          </div>

          {/* Diagram + Caption — side by side */}
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Diagram column */}
            <div className="w-full md:w-96 md:shrink-0 flex flex-col items-center" onMouseLeave={handleDiagramLeave}>
              {/* Mailbox + Slack */}
              <div className="w-full flex gap-3 items-stretch">
                <div className="flex-1 bg-white rounded-xl p-1">
                <div
                  className={`h-full rounded-xl px-4 py-4 text-center cursor-pointer transition-colors border flex flex-col items-center ${selectedItem === 'mailbox' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                  onMouseEnter={() => handleItemHover('mailbox')}
                >
                  <div className="text-sm font-bold text-gray-900">Purchasing / AP Mailboxes</div>
                  <div className="flex-1 flex items-end justify-center gap-3 mt-1.5">
                    <img src={gmailLogo} alt="Gmail" className="h-6 w-6 object-contain" />
                    <img src={outlookLogo} alt="Outlook" className="h-6 w-6 object-contain" />
                  </div>
                </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-1">
                <div
                  className={`h-full rounded-xl px-4 py-4 text-center cursor-pointer transition-colors border flex flex-col items-center ${selectedItem === 'slack' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                  onMouseEnter={() => handleItemHover('slack')}
                >
                  <div className="text-sm font-bold text-gray-900">Slack</div>
                  <div className="flex-1 flex items-end justify-center mt-1.5">
                    <img src={slackLogo} alt="Slack" className="h-6 w-6 object-contain" />
                  </div>
                </div>
                </div>
              </div>

              {/* Top arrows — two side by side: Mailbox ↔ Quiet, Slack ↔ Quiet */}
              <div className="w-full flex">
                <div className="flex-1 flex justify-center">
                  <div className="relative flex justify-center" style={{ height: 56 }}>
                    <svg width="24" height="56" className="overflow-visible shrink-0">
                      <defs>
                        <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
                        </marker>
                      </defs>
                      <line x1="12" y1="2" x2="12" y2="54" stroke="#9ca3af" strokeWidth="1.5" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
                    </svg>
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer transition-colors ${selectedItem === 'mailbox-dot' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-300'}`}
                      onMouseEnter={() => handleItemHover('mailbox-dot')}
                    >
                      <Link2 className={`w-3.5 h-3.5 ${selectedItem === 'mailbox-dot' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative flex justify-center" style={{ height: 56 }}>
                    <svg width="24" height="56" className="overflow-visible shrink-0">
                      <line x1="12" y1="2" x2="12" y2="54" stroke="#9ca3af" strokeWidth="1.5" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
                    </svg>
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer transition-colors ${selectedItem === 'slack-dot' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-300'}`}
                      onMouseEnter={() => handleItemHover('slack-dot')}
                    >
                      <Link2 className={`w-3.5 h-3.5 ${selectedItem === 'slack-dot' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quiet AI */}
              <div className="w-full bg-white rounded-xl p-1">
              <div
                className={`w-full rounded-xl px-6 py-4 flex items-center justify-center gap-2 cursor-pointer transition-colors border ${selectedItem === 'quiet' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                onMouseEnter={() => handleItemHover('quiet')}
              >
                <img src={logo} alt="Quiet AI" className="h-6" />
                <div className="text-sm font-bold text-gray-900">Quiet AI</div>
              </div>
              </div>

              {/* Bottom arrows — two side by side */}
              <div className="w-full flex">
                <div className="flex-1 flex justify-center">
                  <div className="relative flex justify-center" style={{ height: 56 }}>
                    <svg width="24" height="56" className="overflow-visible shrink-0">
                      <line x1="12" y1="2" x2="12" y2="54" stroke="#9ca3af" strokeWidth="1.5" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
                    </svg>
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer transition-colors ${selectedItem === 'bank-dot' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-300'}`}
                      onMouseEnter={() => handleItemHover('bank-dot')}
                    >
                      <img src={plaidLogo} alt="Plaid" className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative flex justify-center" style={{ height: 56 }}>
                    <svg width="24" height="56" className="overflow-visible shrink-0">
                      <line x1="12" y1="2" x2="12" y2="54" stroke="#9ca3af" strokeWidth="1.5" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
                    </svg>
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer transition-colors ${selectedItem === 'erp-dot' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-300'}`}
                      onMouseEnter={() => handleItemHover('erp-dot')}
                    >
                      <Link2 className={`w-3.5 h-3.5 ${selectedItem === 'erp-dot' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank + ERP */}
              <div className="w-full flex gap-3 items-stretch">
                <div className="flex-1 bg-white rounded-xl p-1">
                <div
                  className={`h-full rounded-xl px-4 py-4 text-center cursor-pointer transition-colors border ${selectedItem === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                  onMouseEnter={() => handleItemHover('bank')}
                >
                  <div className="text-sm font-bold text-gray-900">Your Bank Account</div>
                  <p className="text-xs text-gray-400 italic mt-1">Most financial institutions supported</p>
                </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-1">
                <div
                  className={`rounded-xl px-4 py-4 text-center cursor-pointer transition-colors border ${selectedItem === 'erp' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                  onMouseEnter={() => handleItemHover('erp')}
                >
                  <div className="text-sm font-bold text-gray-900">Your ERP</div>
                  <div className="flex flex-col items-center mt-1.5 -mb-1">
                    <div className="flex items-center justify-center gap-2">
                      <img src={netsuiteLogo} alt="NetSuite" className="h-6" />
                      <img src={qboLogo} alt="QuickBooks Online" className="h-6" />
                      <img src={sageLogo} alt="Sage" className="h-6" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-0.5">
                      <img src={xeroLogo} alt="Xero" className="h-7" />
                      <img src={freshbooksLogo} alt="FreshBooks" className="h-5" />
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Caption box — fixed size to prevent layout shifts */}
            <div className="flex-1">
              <div className="rounded-xl border border-gray-200 bg-white p-5 h-full overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedItem}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {selectedItem === 'quiet' ? (
                        <img src={logo} alt="Quiet AI" className="w-4 h-4 shrink-0" />
                      ) : selectedItem === 'mailbox' ? (
                        <Inbox className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      ) : selectedItem === 'slack' ? (
                        <MessageSquare className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      ) : selectedItem === 'bank-dot' ? (
                        <img src={plaidLogo} alt="Plaid" className="w-4 h-4 shrink-0" />
                      ) : selectedItem === 'erp' ? (
                        <BookOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      ) : selectedItem === 'bank' ? (
                        <Landmark className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      ) : selectedItem.endsWith('-dot') ? (
                        <Link2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      )}
                      <h4 className="text-sm font-bold text-gray-900">{diagramCaptions[selectedItem].title}</h4>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{diagramCaptions[selectedItem].subtitle}</p>
                    <div className="border-t border-gray-100 pt-3">
                      <ul className="text-sm text-gray-700 leading-relaxed space-y-1.5 list-disc list-outside pl-4">
                        {diagramCaptions[selectedItem].body.map((item, i) => (
                          <li key={i}>
                            {item.includes(' — ') ? (
                              <><span className="font-semibold">{item.split(' — ')[0]}</span> — {item.split(' — ').slice(1).join(' — ')}</>
                            ) : item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Security */}
      <section className="py-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center bg-white rounded-xl py-2 px-4 w-fit mx-auto mb-10">Your data, locked down</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: 'Encrypted end-to-end', text: 'AES-256 at rest, HTTPS-only in transit, with full HSTS and security headers' },
              { icon: Eye, title: 'Your data stays yours', text: 'Commercial API terms mean your data is never used for model training' },
              { icon: Shield, title: 'Isolated by design', text: 'Every query is scoped to your organization. No cross-tenant data access, ever' },
              { icon: BookOpen, title: 'Full audit trail', text: 'Every action is logged: who did what, when, and what changed' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5" />
                </div>
                <p className="text-gray-900 text-sm font-semibold">{s.title}</p>
                <p className="text-gray-500 text-sm mt-1">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding callout */}
      <section className="pt-4 pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Badge + headline */}
          <div id="setup" className="text-center mb-8 w-fit mx-auto scroll-mt-20">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
              <Clock className="w-3.5 h-3.5 inline -mt-0.5" /> Under 30 minutes
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              Set up once. Automate forever.
            </h2>
            <p className="mt-1 text-lg text-gray-500 bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              No implementation fees. No long-term contracts. No IT involvement. No vendor disruption.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-2 mb-10">
            <div className="flex gap-4 bg-white rounded-xl p-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Sign into your purchasing mailbox</h3>
                <p className="text-gray-600">All you need is your email login, like purchasing@company.com. Sign in, grant Quiet AI access, and you're connected. No forwarding rules, no migration, no IT involvement.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-xl p-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Connect your accounting system</h3>
                <p className="text-gray-600">Link QuickBooks, NetSuite, Sage, or whatever you use. Vendors, GL codes, and payment records stay in sync automatically.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-xl p-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Connect your bank account</h3>
                <p className="text-gray-600">Link the account you pay vendors from. Quiet AI prepares payments for you. Nothing moves until you approve it.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-xl p-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Set your approval rules</h3>
                <p className="text-gray-600">Decide who can approve what: by amount, vendor, department, or however your team works.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-xl p-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">You're live</h3>
                <p className="text-gray-600">Quiet AI starts organizing vendor emails, capturing invoices, coding line items, and drafting responses. Immediately.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Callout box */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-bold text-gray-900 mb-4">Zero disruption for your vendors.</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-600">They keep emailing the same address they always have</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-600">Replies come from your inbox, in your name</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-600">No portal, no login, no change to their workflow</span>
                </li>
              </ul>
            </div>

            {/* Read-only trial callout */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8">
              <h3 className="font-bold text-gray-900 mb-2">Try it in read-only mode first.</h3>
              <p className="text-gray-600">
                Quiet AI can run in observation mode: reading your inbox and organizing quotes, POs, and invoices without
                sending emails, making payments, or touching your ERP. See exactly what it would do,
                with zero risk. Turn on automation when you're ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 w-fit mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              Hard guardrails. Full paper trail.
            </h2>
            <p className="mt-1 text-lg text-gray-500 text-center max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              Quiet AI processes invoices and drafts communications. But the AI operates inside
              hard boundaries. Not guidelines, not best-effort policies, but structural rules it
              cannot override.
            </p>
          </div>
          <div className="mb-6 bg-white rounded-2xl p-1 w-fit mx-auto">
            <AuditLogAnimation />
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-base font-bold text-gray-900 bg-white rounded-xl py-2 px-3 w-fit">Data access is scoped, not trusted</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed bg-white rounded-xl py-2 px-3 w-fit">
                The AI can only access data relevant to the recipient it's drafting for. A vendor
                asking about their invoice simply cannot surface another vendor's terms, your
                internal notes, or your banking details.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 bg-white rounded-xl py-2 px-3 w-fit">Traceable, not hallucinated</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed bg-white rounded-xl py-2 px-3 w-fit">
                Every figure, date, and line item Quiet AI produces is tied to a source document in your
                system. If it doesn't have the answer, it says so. It never makes something up.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 bg-white rounded-xl py-2 px-3 w-fit">Everything is auditable</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed bg-white rounded-xl py-2 px-3 w-fit">
                Every action has a paper trail. Who approved what, what the AI drafted, what changed,
                and when. If a question comes up six months from now, the answer is already logged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 bg-white rounded-xl py-2 px-4 w-fit mx-auto">
            We're just getting started
          </h2>
          <p className="mt-1 text-lg text-gray-600 mb-8 bg-white rounded-xl py-1 px-4 w-fit mx-auto">
            Want to shape what comes next? We build with our customers.
          </p>
          <div className="flex items-center justify-center bg-white rounded-xl w-fit mx-auto">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <a href="https://quietai.fillout.com/book">Build with Us</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
    </div>
    </TooltipProvider>
  )
}

export default LandingPage
