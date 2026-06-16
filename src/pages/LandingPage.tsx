import { useState, useEffect, useRef, useCallback } from 'react'
import { Link2, BookOpen, Inbox, Landmark, Mail, Sparkles, UserCheck, ArrowRight, Clock, ChevronDown, FileText, ClipboardList, CheckSquare, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import PurchasingWorkflowPlayer from '@/components/landing/PurchasingWorkflowPlayer'
import PurchasingWorkflowStatic from '@/components/landing/PurchasingWorkflowStatic'
import AuditLogAnimation from '@/components/landing/AuditLogAnimation'
import DotGrid from '@/components/landing/DotGrid'
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

const APP_URL = 'https://tryquiet.app'

function LandingPage() {
  const [selectedItem, setSelectedItem] = useState<string>('mailbox')
  const diagramTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const DIAGRAM_CYCLE = ['mailbox', 'mailbox-dot', 'quiet', 'bank-dot', 'bank', 'erp-dot', 'erp'] as const

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
      title: 'Your Purchasing Mailbox',
      subtitle: 'Where purchase orders, invoices, and vendor correspondence land',
      body: [
        'Existing inbox — Hooks up to purchasing@yourcompany.com or wherever vendors send quotes and invoices today',
        'Full visibility — Sees quotes, purchase orders, invoices, payment inquiries, W-9s, and everything else your vendors and team send',
        'No change for vendors — No new portals for them, no manual file uploading for you',
        'Gmail today — Outlook on the way',
      ],
    },
    'mailbox-dot': {
      title: 'API Connection',
      subtitle: 'Vendor emails in. Email drafts, approval requests, and confirmations back out',
      body: [
        'Inbound — All emails and attachments flow into Quiet AI automatically',
        'Outbound — Drafts flow back: vendor replies, clarification requests, payment confirmations',
        'Approvals — Approval requests and responses route through the same mailbox connection',
        'Your control — Nothing sends until you approve it inside Quiet',
      ],
    },
    'quiet': {
      title: 'Quiet AI',
      subtitle: 'Intelligent AP orchestration engine',
      body: [
        'Workflow orchestration — for quote intake, PO drafting, invoice processing, vendor onboarding, line item coding, approval orchestration, and fuzzy edge cases where deterministic logic fails',
        'Duplicate invoices & fraud attempts — Caught and flagged for your inspection',
        'Intelligent clarification — When something\'s ambiguous, Quiet asks you instead of guessing',
        'Your configuration — You can set approval workflows, GL coding guidelines, and validation rules',
      ],
    },
    'bank-dot': {
      title: 'Connected to your bank via Plaid',
      subtitle: 'Payments staged but never auto-sent',
      body: [
        'Review first — Quiet prepares each payment and presents it for your review',
        'You approve — Quiet moves the money from your bank account to the vendor',
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
        'Pulls in — Your vendor list, GL accounts, and other accounting categories stay current',
        'Pushes back — POs, coded invoices, and payment records sync automatically',
        'No drift — No duplicate entry, no divergence between systems',
      ],
    },
    'erp': {
      title: 'Your ERP',
      subtitle: 'Your accounting source of truth',
      body: [
        'Your data — GL, chart of accounts, vendor master list, and payment history in QuickBooks, Netsuite, Xero, Sage, or many others',
        'Source of truth — Your books stay here, Quiet doesn\'t replace them',
        'Zero config — No remapping, no configuration spreadsheets',
      ],
    },
  }

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleDropdownEnter = (id: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setOpenDropdown(id)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 0)
  }

  const capabilities = [
    { icon: FileText, title: 'Accounts Payable', caption: 'No humans needed until it\'s time to pay' },
    { icon: ClipboardList, title: 'PO Lifecycle Management', caption: 'AI turns quotes into POs and gets them approved' },
    { icon: CheckSquare, title: '3 Way Match', caption: 'Touchless match between receipts, invoices, and purchase orders' },
    { icon: DollarSign, title: 'Cash Management', caption: 'A complete picture of money in and money out' },
  ]

  const integrations = {
    communication: [
      { title: 'Slack', caption: 'Get notifications and approve requests right from Slack', logoType: 'slack' as const },
      { title: 'Email', caption: 'Works with Gmail and Outlook. No new portals for vendors', logoType: 'email' as const },
    ],
    erp: [
      { logo: qboLogo, title: 'QuickBooks' },
      { logo: xeroLogo, title: 'Xero' },
      { logo: freshbooksLogo, title: 'FreshBooks' },
      { logo: netsuiteLogo, title: 'NetSuite' },
      { logo: sageLogo, title: 'Sage' },
    ],
  }

  const handleLogin = () => {
    window.location.href = APP_URL
  }


  return (
    <TooltipProvider>
    <div className="min-h-screen bg-white">
      <DotGrid />
    <div className="relative z-10">
      {/* Nav */}
      <nav
        className="sticky top-0 z-50"
      >
        <div className="bg-white/90 backdrop-blur border-b border-gray-100 relative z-10">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Quiet" className="h-8" />
              <span className="font-semibold text-lg text-gray-900">Quiet AI</span>
            </div>

            {/* Center nav triggers */}
            <div className="hidden md:flex items-center gap-1">
              {(['capabilities', 'integrations'] as const).map((id) => (
                <button
                  key={id}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                    openDropdown === id
                      ? 'text-gray-900 bg-gray-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onMouseEnter={() => handleDropdownEnter(id)}
                  onMouseLeave={handleDropdownLeave}
                  onClick={() => setOpenDropdown(prev => prev === id ? null : id)}
                >
                  {id === 'capabilities' ? 'AI Capabilities' : 'Integrations'}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openDropdown === id ? 'rotate-180' : ''}`} />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleLogin}>
                Sign In
              </Button>
              <Button asChild>
                <a href="https://quietai.fillout.com/book">Get Access</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating dropdown panel */}
        <AnimatePresence>
          {openDropdown && (
            <motion.div
              key={openDropdown}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-0 right-0 z-20"
              onMouseEnter={() => handleDropdownEnter(openDropdown)}
              onMouseLeave={handleDropdownLeave}
            >
              <div className="max-w-6xl mx-auto px-6 pt-2">
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
                  {openDropdown === 'capabilities' && (
                    <div>
                      <p className="text-sm text-gray-500 mb-5">
                        Mix and match product modules. Let AI automate the pieces you need and do the rest yourself.
                      </p>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {capabilities.map(({ icon: Icon, title, caption }) => (
                          <div
                            key={title}
                            className="group flex flex-col gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150 cursor-pointer"
                          >
                            <div className="h-9 w-9 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                              <Icon className="h-[18px] w-[18px] text-gray-600 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{title}</p>
                              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {openDropdown === 'integrations' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      {/* Communication */}
                      <div className="flex flex-col">
                        <div className="min-h-[3.5rem]">
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Communication</p>
                          <p className="text-xs text-gray-400">AI agents use your existing systems to communicate with you and your vendors.</p>
                        </div>
                        <div className="space-y-3 mt-4">
                          {integrations.communication.map(({ title, caption, logoType }) => (
                            <div
                              key={title}
                              className="group flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150 cursor-pointer"
                            >
                              <div className="mt-0.5 flex-shrink-0 h-9 w-9 rounded-lg bg-gray-50 flex items-center justify-center relative overflow-hidden">
                                {logoType === 'slack' && (
                                  <img src={slackLogo} alt="Slack" className="h-6 w-6 object-contain" />
                                )}
                                {logoType === 'email' && (
                                  <>
                                    <img src={gmailLogo} alt="Gmail" className="absolute top-0.5 left-0.5 h-4 w-4 object-contain" />
                                    <img src={outlookLogo} alt="Outlook" className="absolute bottom-0.5 right-0.5 h-4 w-4 object-contain" />
                                  </>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{title}</p>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{caption}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ERP */}
                      <div className="flex flex-col">
                        <div className="min-h-[3.5rem]">
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Bookkeeping, Accounting & ERP</p>
                          <p className="text-xs text-gray-400">AI plugs into whatever system you use to track your finances. Everything stays synced so your books remain the source of truth.</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mt-4">
                          {integrations.erp.map(({ logo: logoSrc, title }) => (
                            <div
                              key={title}
                              className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150 cursor-pointer"
                            >
                              <img src={logoSrc} alt={title} className="h-8 w-8 object-contain" />
                              <p className="text-xs font-medium text-gray-700">{title}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-fit mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 bg-white rounded-xl py-1.5 px-3 w-fit mx-auto">
              Agentic AI for Procurement
            </p>
            <h1 className="mt-1 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              Purchasing, without the noise
            </h1>
            <p className="mt-1 text-xl text-gray-600 max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              Quiet AI runs purchasing from vendor quote to booked bill.
              <br />
              You just approve.
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
        <div className="mt-12 text-center relative z-10 bg-white rounded-2xl py-8 px-4 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Want to see this on your own purchases?
          </h2>
          <p className="mt-2 text-gray-600">
            We can have you live and ordering against real vendors in under
            an hour.
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
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              Plugs into the tools you already use
            </h2>
            <p className="mt-1 text-lg text-gray-500 text-center max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              Quiet sits between your inbox, your bank, and your ERP — so your existing workflows
              don't change, they just get faster. Up and running in minutes, not months.
            </p>
          </div>

          {/* Diagram + Caption — side by side */}
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Diagram column */}
            <div className="w-full md:w-96 md:shrink-0 flex flex-col items-center" onMouseLeave={handleDiagramLeave}>
              {/* Mailbox */}
              <div className="w-full bg-white rounded-xl p-1">
              <div
                className={`w-full rounded-xl px-6 py-4 text-center cursor-pointer transition-colors border ${selectedItem === 'mailbox' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                onMouseEnter={() => handleItemHover('mailbox')}
              >
                <div className="text-sm font-bold text-gray-900">Your Purchasing Mailbox</div>
                <div className="flex items-center justify-center gap-3 mt-1.5">
                  <img src={gmailLogo} alt="Gmail" className="h-6" />
                  <img src={outlookLogo} alt="Outlook" className="h-6" />
                </div>
              </div>
              </div>

              {/* Arrow: Mailbox ↔ Quiet */}
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

              {/* Quiet AI */}
              <div className="w-full bg-white rounded-xl p-1">
              <div
                className={`w-full rounded-xl px-6 py-4 flex items-center justify-center gap-2 cursor-pointer transition-colors border ${selectedItem === 'quiet' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                onMouseEnter={() => handleItemHover('quiet')}
              >
                <img src={logo} alt="Quiet" className="h-6" />
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
              <div className="w-full flex gap-3">
                <div className="flex-1 bg-white rounded-xl p-1">
                <div
                  className={`rounded-xl px-4 py-4 text-center cursor-pointer transition-colors border ${selectedItem === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
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
                        <img src={logo} alt="Quiet" className="w-4 h-4 shrink-0" />
                      ) : selectedItem === 'mailbox' ? (
                        <Inbox className="w-3.5 h-3.5 text-blue-500 shrink-0" />
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

      {/* How it works */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 w-fit mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              How it works
            </h2>
            <p className="mt-1 text-lg text-gray-500 text-center max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              A review-and-approve workflow for every purchase.
            </p>
          </div>

          {/* 3-box diagram */}
          <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
            {/* Box 1 */}
            <div className="flex-1 bg-white rounded-xl p-1">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center h-full">
              <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Email arrives</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                A quote, invoice, or vendor message lands in your purchasing mailbox.
              </p>
            </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center px-3 bg-white rounded-lg py-2">
              <ArrowRight className="w-5 h-5 text-gray-300" />
            </div>

            {/* Box 2 */}
            <div className="flex-1 bg-white rounded-xl p-1">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center h-full">
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Quiet AI processes</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Extracts data, codes GL, generates POs, drafts replies, asks vendors for missing info, flags issues, and escalates when something needs a human call.
              </p>
            </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center px-3 bg-white rounded-lg py-2">
              <ArrowRight className="w-5 h-5 text-gray-300" />
            </div>

            {/* Box 3 */}
            <div className="flex-1 bg-white rounded-xl p-1">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center h-full">
              <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">You review & execute</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Course-correct the AI, send emails, and initiate payments with one click.
              </p>
            </div>
            </div>
          </div>

          <p className="text-lg text-gray-500 text-center mt-12 bg-white rounded-xl py-2 px-4 w-fit mx-auto">
            Quiet AI does the processing. You just check the work.
          </p>
        </div>
      </section>

      {/* Onboarding callout */}
      <section className="pt-4 pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Badge + headline */}
          <div className="text-center mb-8 w-fit mx-auto">
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
                <p className="text-gray-600">All you need is your email login — like purchasing@company.com. Sign in, grant Quiet AI access, and you're connected. No forwarding rules, no migration, no IT involvement.</p>
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
                <p className="text-gray-600">Link the account you pay vendors from. Quiet prepares payments for you — nothing moves until you approve it.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-xl p-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Set your approval rules</h3>
                <p className="text-gray-600">Decide who can approve what — by amount, vendor, department, or however your team works.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-xl p-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">You're live</h3>
                <p className="text-gray-600">Quiet starts organizing vendor emails, capturing invoices, coding line items, and drafting responses — immediately.</p>
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
                Quiet can run in observation mode — reading your inbox and organizing quotes, POs, and invoices without
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
              hard boundaries — not guidelines, not best-effort policies, but structural rules it
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
                Every figure, date, and line item Quiet produces is tied to a source document in your
                system. If it doesn't have the answer, it says so — it never makes something up.
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
      <footer className="border-t border-gray-800 py-8 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-400">&copy; 2026 Quiet AI</span>
          <div className="flex items-center gap-4">
            <a
              href="/privacy-policy.html"
              className="text-sm text-gray-400 hover:text-white underline"
            >
              Privacy Policy
            </a>
            <a
              href="/eula.html"
              className="text-sm text-gray-400 hover:text-white underline"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
    </div>
    </TooltipProvider>
  )
}

export default LandingPage
