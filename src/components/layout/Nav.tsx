import { useState, useRef } from 'react'
import { ChevronDown, FileText, ClipboardList, CheckSquare, DollarSign, ShieldAlert } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/logo.png'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import outlookLogo from '@/assets/images/outlook_logo.webp'
import netsuiteLogo from '@/assets/images/netsuite_logo.webp'
import qboLogo from '@/assets/images/qbo_logo.webp'
import sageLogo from '@/assets/images/sage_logo.webp'
import xeroLogo from '@/assets/images/xero_logo.webp'
import freshbooksLogo from '@/assets/images/freshbooks_logo.webp'
import slackLogo from '@/assets/images/slack_logo.png'

const APP_URL = 'https://tryquiet.app'

const capabilities = [
  { icon: FileText, title: 'Accounts Payable', caption: 'No humans needed until it\'s time to pay', href: '/accounts-payable' },
  { icon: ClipboardList, title: 'PO Lifecycle Management', caption: 'AI turns quotes into POs and gets them approved', href: '/po-lifecycle' },
  { icon: CheckSquare, title: '3 Way Match', caption: 'Touchless match between receipts, invoices, and purchase orders', href: '/three-way-match' },
  { icon: DollarSign, title: 'Cash Management', caption: 'A complete picture of money in and money out', href: '/cash-management' },
  { icon: ShieldAlert, title: 'Fraud & Duplicate Prevention', caption: 'Every invoice verified before it gets paid', href: '/fraud-prevention' },
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

function Nav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleDropdownEnter = (id: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setOpenDropdown(id)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 0)
  }

  return (
    <nav className="sticky top-0 z-50">
      <div className="bg-white/90 backdrop-blur border-b border-gray-100 relative z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="Quiet" className="h-8" />
            <span className="font-semibold text-lg text-gray-900">Quiet AI</span>
          </a>

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
            <a href="/#setup" className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors px-3 py-2 rounded-lg cursor-pointer">Setup</a>
            <a href="/pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors px-3 py-2 rounded-lg cursor-pointer">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => { window.location.href = APP_URL }}>
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
                      {capabilities.map(({ icon: Icon, title, caption, href }) => (
                        <a key={title} href={href}>
                          <div className="group flex flex-col gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150 cursor-pointer">
                            <div className="h-9 w-9 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                              <Icon className="h-[18px] w-[18px] text-gray-600 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{title}</p>
                              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{caption}</p>
                            </div>
                          </div>
                        </a>
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
                          <a
                            key={title}
                            href="/#integrations"
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
                          </a>
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
                          <a
                            key={title}
                            href="/#integrations"
                            className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150 cursor-pointer"
                          >
                            <img src={logoSrc} alt={title} className="h-8 w-8 object-contain" />
                            <p className="text-xs font-medium text-gray-700">{title}</p>
                          </a>
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
  )
}

export default Nav
