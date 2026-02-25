import { useState, useEffect, useRef, useCallback } from 'react'
import { Link2, BookOpen, Inbox, Landmark, Mail, Sparkles, UserCheck, ArrowRight, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import InvoiceProcessingAnimation from '@/components/landing/InvoiceProcessingAnimation'
import VendorOnboardingAnimation from '@/components/landing/VendorOnboardingAnimation'
import IntelligentCodingAnimation from '@/components/landing/IntelligentCodingAnimation'
import InquiryResponsesAnimation from '@/components/landing/InquiryResponsesAnimation'
import GatheringApprovalsAnimation from '@/components/landing/GatheringApprovalsAnimation'
import FakeInvoiceDeflectionAnimation from '@/components/landing/FakeInvoiceDeflectionAnimation'
import BusinessEmailCompromiseAnimation from '@/components/landing/BusinessEmailCompromiseAnimation'
import DuplicateDetectionAnimation from '@/components/landing/DuplicateDetectionAnimation'
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

const APP_URL = 'https://tryquiet.app'

const USE_CASES = [
  { label: 'Invoice Processing', imageAlt: 'Invoice processing screenshot', duration: 10 },
  { label: 'Vendor Onboarding', imageAlt: 'Vendor onboarding screenshot', duration: 8 },
  { label: 'Intelligent Coding', imageAlt: 'Intelligent coding screenshot', duration: 10 },
  { label: 'Inquiry Responses', imageAlt: 'Inquiry responses screenshot', duration: 8 },
  { label: 'Gathering Approvals', imageAlt: 'Gathering approvals screenshot', duration: 9 },
  { label: 'Business Email Compromise Prevention', imageAlt: 'Business email compromise prevention screenshot', duration: 8 },
  { label: 'Fake Invoice Deflection', imageAlt: 'Fake invoice deflection screenshot', duration: 8 },
  { label: 'Duplicate Prevention', imageAlt: 'Duplicate prevention screenshot', duration: 8 },
  { label: '3-Way Matching', imageAlt: '3-way matching screenshot', comingSoon: true },
]

const PLAYABLE_COUNT = USE_CASES.filter(uc => !uc.comingSoon).length
const DWELL_SECONDS = 7

function LandingPage() {
  const [selectedUseCase, setSelectedUseCase] = useState(0)
  const [selectedItem, setSelectedItem] = useState<string>('mailbox')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const diagramTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleNext = useCallback((index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const uc = USE_CASES[index]
    if (!uc.duration) return
    timerRef.current = setTimeout(() => {
      const next = (index + 1) % PLAYABLE_COUNT
      setSelectedUseCase(next)
    }, (uc.duration + DWELL_SECONDS) * 1000)
  }, [])

  // Schedule auto-advance whenever selectedUseCase changes
  useEffect(() => {
    scheduleNext(selectedUseCase)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [selectedUseCase, scheduleNext])

  const handlePillClick = (index: number) => {
    setSelectedUseCase(index)
  }

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
      title: 'Your AP Mailbox',
      subtitle: 'Where invoices and vendor correspondence land',
      body: [
        'Existing inbox — Hooks up to ap@yourcompany.com or wherever vendors send invoices today',
        'Full visibility — Sees invoices, payment inquiries, W-9s, updated remit-to info, and everything else your vendors (and your employees) send',
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
        'Workflow orchestration — Orchestrates key workflows for invoice intake, vendor onboarding, line item coding, inquiry responses, and approvals',
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
      title: 'Your AP Bank Account',
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
        'Pushes back — Coded invoices and payment records sync automatically',
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

  const handleLogin = () => {
    window.location.href = APP_URL
  }

  const handleSignup = () => {
    window.location.href = APP_URL
  }

  return (
    <div className="min-h-screen bg-white">
      <DotGrid />
    <div className="relative z-10">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Quiet" className="h-8" />
            <span className="font-semibold text-lg text-gray-900">Quiet AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleLogin}>
              Sign In
            </Button>
            <Button onClick={handleSignup}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-fit mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              AP on Autopilot
            </h1>
            <p className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              Quiet AI runs your AP mailbox — from invoice to payment.
              <br />
              You just review and approve.
            </p>
          </div>
          {/* Hero graphic area — controlled by pills */}
          <div className="mt-12 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedUseCase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {selectedUseCase === 0 ? (
                  <div className="aspect-[16/9] flex items-stretch overflow-hidden">
                    <InvoiceProcessingAnimation />
                  </div>
                ) : selectedUseCase === 1 ? (
                  <div className="aspect-[16/9] flex items-stretch overflow-hidden">
                    <VendorOnboardingAnimation />
                  </div>
                ) : selectedUseCase === 2 ? (
                  <div className="aspect-[16/9] flex items-stretch overflow-hidden">
                    <IntelligentCodingAnimation />
                  </div>
                ) : selectedUseCase === 3 ? (
                  <div className="aspect-[16/9] flex items-stretch overflow-hidden">
                    <InquiryResponsesAnimation />
                  </div>
                ) : selectedUseCase === 4 ? (
                  <div className="aspect-[16/9] flex items-stretch overflow-hidden">
                    <GatheringApprovalsAnimation />
                  </div>
                ) : selectedUseCase === 5 ? (
                  <div className="aspect-[16/9] flex items-stretch overflow-hidden">
                    <BusinessEmailCompromiseAnimation />
                  </div>
                ) : selectedUseCase === 6 ? (
                  <div className="aspect-[16/9] flex items-stretch overflow-hidden">
                    <FakeInvoiceDeflectionAnimation />
                  </div>
                ) : selectedUseCase === 7 ? (
                  <div className="aspect-[16/9] flex items-stretch overflow-hidden">
                    <DuplicateDetectionAnimation />
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center border border-gray-200">
                    <span className="text-gray-400 text-sm">
                      {USE_CASES[selectedUseCase].imageAlt}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Use-case pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 bg-white rounded-full px-3 py-1">
            {USE_CASES.map((uc, i) =>
              uc.comingSoon ? (
                <TooltipProvider key={uc.label} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className="px-4 py-2 rounded-full text-sm font-medium bg-gray-50 text-gray-400 border border-dashed border-gray-300 cursor-default"
                      >
                        {uc.label} ✦
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Coming soon</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <button
                  key={uc.label}
                  onClick={() => handlePillClick(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedUseCase === i
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {uc.label}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* How it connects */}
      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              Plugs into the tools you already use
            </h2>
            <p className="mt-3 text-lg text-gray-500 text-center max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              Quiet sits between your inbox, your bank, and your ERP — so your existing workflows
              don't change, they just get faster. Up and running in minutes, not months.
            </p>
          </div>

          {/* Diagram + Caption — side by side */}
          <div className="flex gap-8 items-stretch">
            {/* Diagram column */}
            <div className="w-96 shrink-0 flex flex-col items-center" onMouseLeave={handleDiagramLeave}>
              {/* Mailbox */}
              <div className="w-full bg-white rounded-xl p-1">
              <div
                className={`w-full rounded-xl px-6 py-4 text-center cursor-pointer transition-colors border ${selectedItem === 'mailbox' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                onMouseEnter={() => handleItemHover('mailbox')}
              >
                <div className="text-sm font-bold text-gray-900">Your AP Mailbox</div>
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
                  <div className="text-sm font-bold text-gray-900">Your AP Bank Account</div>
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
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14 w-fit mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              How it works
            </h2>
            <p className="mt-3 text-lg text-gray-500 text-center max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              A review-and-approve workflow for everything AP.
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
                An invoice or vendor message lands in your AP mailbox.
              </p>
            </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center px-3">
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
                Extracts data, codes GL, drafts replies, asks vendors for missing info, flags issues, and escalates to your team when something needs a human call.
              </p>
            </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center px-3">
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
      <section className="pt-4 pb-14 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Badge + headline */}
          <div className="text-center mb-8 w-fit mx-auto">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
              <Clock className="w-3.5 h-3.5 inline -mt-0.5" /> Under 30 minutes
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              Set up once. Automate forever.
            </h2>
            <p className="mt-3 text-lg text-gray-500 bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              No implementation fees. No long-term contracts. No IT involvement. No vendor disruption.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-2 mb-16">
            <div className="flex gap-4 bg-white rounded-xl p-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Sign into your AP mailbox</h3>
                <p className="text-gray-600">All you need is your email login — like ap@company.com. Sign in, grant Quiet AI access, and you're connected. No forwarding rules, no migration, no IT involvement.</p>
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
                Quiet can run in observation mode — reading your inbox and organizing invoices without
                sending emails, making payments, or touching your ERP. See exactly what it would do,
                with zero risk. Turn on automation when you're ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 w-fit mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center bg-white rounded-xl py-2 px-4 w-fit mx-auto">
              Hard guardrails. Full paper trail.
            </h2>
            <p className="mt-3 text-lg text-gray-500 text-center max-w-2xl mx-auto bg-white rounded-xl py-2 px-4 w-fit">
              Quiet AI processes invoices and drafts communications. But the AI operates inside
              hard boundaries — not guidelines, not best-effort policies, but structural rules it
              cannot override.
            </p>
          </div>
          <div className="mb-10 bg-white rounded-2xl p-1 w-fit mx-auto">
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
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 bg-white rounded-xl py-2 px-4 w-fit mx-auto">
            We're just getting started
          </h2>
          <p className="mt-3 text-lg text-gray-600 bg-white rounded-xl py-1 px-4 w-fit mx-auto">
            POs and 3-way matching are coming soon.
          </p>
          <p className="mt-1 text-lg text-gray-600 mb-8 bg-white rounded-xl py-1 px-4 w-fit mx-auto">
            Want to shape what comes after? We build with our customers.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6">
              Request a Feature
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Join the Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to automate your AP?</h2>
          <p className="text-lg text-gray-400 mb-8">
            Set up in minutes. No implementation fees. No long-term contracts.
          </p>
          <Button
            size="lg"
            onClick={handleSignup}
            className="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-100"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-500">&copy; 2026 Quiet AI</span>
          <div className="flex items-center gap-4">
            <a
              href="/privacy-policy.html"
              className="text-sm text-gray-500 hover:text-gray-900 underline"
            >
              Privacy Policy
            </a>
            <a
              href="/eula.html"
              className="text-sm text-gray-500 hover:text-gray-900 underline"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
    </div>
  )
}

export default LandingPage
