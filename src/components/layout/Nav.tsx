import { useState, useRef } from 'react'
import { ChevronDown, FileText, ClipboardList, CheckSquare, DollarSign, ShieldAlert, ShoppingCart, TrendingUp, BarChart3, Briefcase, LineChart, Calculator, Handshake } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/logo.png'

const APP_URL = 'https://tryquiet.app'

const capabilities = [
  { icon: ShoppingCart, title: 'Purchasing', caption: 'From material request to booked bill, on autopilot', href: '/purchasing' },
  { icon: FileText, title: 'Accounts Payable', caption: 'Supplier invoices handled. No humans until it\'s time to pay', href: '/accounts-payable' },
  { icon: ClipboardList, title: 'PO Lifecycle Management', caption: 'AI turns supplier quotes into POs and gets them approved', href: '/po-lifecycle' },
  { icon: CheckSquare, title: '3 Way Match', caption: 'Touchless match between packing slips, invoices, and POs', href: '/three-way-match' },
  { icon: DollarSign, title: 'Cash Management', caption: 'Money in, money out, and what\'s already committed', href: '/cash-management' },
  { icon: ShieldAlert, title: 'Fraud & Duplicate Prevention', caption: 'Every supplier invoice verified before it gets paid', href: '/fraud-prevention' },
  { icon: TrendingUp, title: 'Demand Planning', caption: 'Know what to buy before the line needs it', href: '/demand-planning' },
  { icon: BarChart3, title: 'Sales Analytics', caption: 'See what\'s selling, and what it\'s costing you', href: '/sales-analytics' },
]

const audiences = [
  { icon: Briefcase, title: 'Business Owners', caption: 'Your back office, off your plate', href: '/business-owners' },
  { icon: LineChart, title: 'Heads of Finance', caption: 'Leverage for a lean manufacturing finance team', href: '/heads-of-finance' },
  { icon: Calculator, title: 'Controllers', caption: 'Clean books and a faster close, even at volume', href: '/controllers' },
  { icon: Handshake, title: 'Procurement Leaders', caption: 'Compliant purchasing without the chasing', href: '/procurement-leaders' },
]

const NAV_LABELS = {
  capabilities: 'What we do',
  audiences: 'Who we serve',
} as const

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
            <span className="font-semibold text-lg text-gray-900">Quiet Software</span>
          </a>

          {/* Center nav triggers */}
          <div className="hidden md:flex items-center gap-1">
            {(['capabilities', 'audiences'] as const).map((id) => (
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
                {NAV_LABELS[id]}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openDropdown === id ? 'rotate-180' : ''}`} />
              </button>
            ))}
            <a href="/setup" className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors px-3 py-2 rounded-lg cursor-pointer">Setup</a>
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
                      Mix and match modules for how you buy and pay. Automate the pieces you need, keep the rest.
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {capabilities.map(({ icon: Icon, title, caption, href }) => (
                        <a key={title} href={href} className="h-full">
                          <div className="group h-full flex flex-col gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150 cursor-pointer">
                            <div className="h-9 w-9 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                              <Icon className="h-[18px] w-[18px] text-gray-600 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{caption}</p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {openDropdown === 'audiences' && (
                  <div>
                    <p className="text-sm text-gray-500 mb-5">
                      Built for the people who run a manufacturer's back office.
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {audiences.map(({ icon: Icon, title, caption, href }) => (
                        <a key={title} href={href} className="h-full">
                          <div className="group h-full flex flex-col gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150 cursor-pointer">
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

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Nav
