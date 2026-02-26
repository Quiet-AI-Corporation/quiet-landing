import { motion } from 'framer-motion'
import { Building2, BookOpen, Send, Loader2, Paperclip } from 'lucide-react'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import logo from '@/assets/images/logo.png'

const LINE_ITEMS = [
  { description: 'Acquisition celebration event', amount: '$16,800.00' },
  { description: 'Executive travel — due diligence', amount: '$8,200.00' },
]

// Invoice fades in
const INVOICE_START = 1.0

// Flash: threshold guideline + total row on invoice
const FLASH_THRESHOLD = INVOICE_START + 1.5

// Summary checkmark
const SUMMARY_START = FLASH_THRESHOLD + 3.0

// Browser draft window appears
const BROWSER_START = SUMMARY_START + 0.5

// Invoice status change: Draft → Pending Approval
const STATUS_CHANGE = BROWSER_START + 0.3

// Flash: bg highlight + text color shift, holds for 2.4s
const flashBg = (delay: number) => ({
  initial: { backgroundColor: 'rgba(59,130,246,0)' },
  animate: {
    backgroundColor: [
      'rgba(59,130,246,0)',
      'rgba(59,130,246,0.15)',
      'rgba(59,130,246,0.15)',
      'rgba(59,130,246,0)',
    ],
    color: [
      'rgb(55,65,81)',
      'rgb(29,78,216)',
      'rgb(29,78,216)',
      'rgb(55,65,81)',
    ],
  },
  transition: {
    delay,
    duration: 2.4,
    times: [0, 0.08, 0.8, 1],
    ease: 'easeInOut' as const,
  },
})

function GatheringApprovalsAnimation() {
  const thresholdFlash = flashBg(FLASH_THRESHOLD)

  return (
    <div className="flex flex-col gap-4 w-full text-left h-full">
      {/* Top row — Guidelines + Invoice side by side */}
      <div className="flex gap-5 flex-1 min-h-0">
        {/* Left — Guidelines */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-600 uppercase tracking-widest mb-4">
              <img src={logo} alt="Quiet" className="h-5" />
              Quiet AI Approvals Coordinator
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3">
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm font-medium text-gray-500">Your guidelines</div>
              </div>

              {/* Rule 1 — Threshold (flashes) */}
              <motion.div
                initial={thresholdFlash.initial}
                animate={thresholdFlash.animate}
                transition={thresholdFlash.transition}
                className="rounded-md p-2 -mx-1"
              >
                <p className="text-sm text-gray-700">
                  For invoices above{' '}
                  <span className="font-semibold text-blue-700">$10,000</span>, request approval
                  from{' '}
                  <span className="font-semibold text-blue-700">kendall@waystarroyco.com</span>.
                </p>
              </motion.div>

              {/* Rule 2 — No approval needed */}
              <div className="rounded-md p-2 -mx-1">
                <p className="text-sm text-gray-700">
                  For invoices under $10,000, no approval needed.
                </p>
              </div>
            </div>

            {/* Summary checkmark */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: SUMMARY_START, duration: 0.4 }}
              className="mt-4 flex items-center gap-2 text-sm text-gray-700"
            >
              <span className="inline-flex items-center justify-center relative">
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: BROWSER_START, duration: 0.15 }}
                  className="absolute"
                >
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: BROWSER_START, duration: 0.15 }}
                  className="text-green-500 font-bold text-sm"
                >
                  ✓
                </motion.span>
              </span>
              Sent approval request to kendall@waystarroyco.com
            </motion.div>
          </div>
        </div>

        {/* Right — Invoice */}
        <motion.div
          className="flex-1 min-w-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INVOICE_START, duration: 0.4, ease: 'easeOut' }}
        >
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  INV-7234
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0">
                  <Building2 className="w-3 h-3" />
                  Vaulter LLC
                </span>
              </div>
              <div className="relative flex-shrink-0">
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: STATUS_CHANGE, duration: 0.2 }}
                  className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full whitespace-nowrap"
                >
                  Draft
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: STATUS_CHANGE, duration: 0.3 }}
                  className="absolute top-0 right-0 px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full whitespace-nowrap"
                >
                  Pending Approval
                </motion.span>
              </div>
            </div>

            <div className="px-4 py-4 space-y-6 flex-1 flex flex-col">
              {/* Invoice info */}
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-gray-500">Invoice #</div>
                    <div className="text-sm font-semibold text-gray-900">7234</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Due Date</div>
                    <div className="text-sm text-gray-900">Mar 20, 2026</div>
                  </div>
                </div>
              </div>

              {/* Line items */}
              <div>
                <div className="space-y-1.5">
                  <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500">
                    <div className="col-span-9">Line Item</div>
                    <div className="col-span-3 text-right">Amount</div>
                  </div>
                  {LINE_ITEMS.map((item) => (
                    <div key={item.description} className="py-0.5">
                      <div className="grid grid-cols-12 gap-2 text-sm px-1 -mx-1 py-0.5">
                        <div className="col-span-9 text-gray-900 truncate">{item.description}</div>
                        <div className="col-span-3 text-right font-medium text-gray-900">{item.amount}</div>
                      </div>
                    </div>
                  ))}
                  {/* Total — flashes with threshold guideline */}
                  {(() => {
                    const totalFlash = flashBg(FLASH_THRESHOLD)
                    return (
                      <motion.div
                        initial={totalFlash.initial}
                        animate={totalFlash.animate}
                        transition={totalFlash.transition}
                        className="grid grid-cols-12 gap-2 pt-1.5 mt-1 border-t border-gray-200 rounded px-1 -mx-1 py-0.5"
                      >
                        <div className="col-span-9 text-right text-sm font-medium text-gray-700">Total</div>
                        <div className="col-span-3 text-right text-sm font-semibold text-gray-900">$25,000.00</div>
                      </motion.div>
                    )
                  })()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom — Browser window, full width */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: BROWSER_START, duration: 0.5 }}
        className="ml-4"
      >
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white flex flex-col">
          {/* Title bar */}
          <div className="bg-gray-100 border-b border-gray-200 px-3 pt-2 pb-0">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex">
              <div className="flex items-center gap-1.5 bg-white rounded-t-lg px-3 py-1.5 border border-gray-200 border-b-0 -mb-px relative z-10">
                <img src={gmailLogo} alt="Gmail" className="w-3.5 h-3.5" />
                <span className="text-xs text-gray-700 truncate">ap@company.com</span>
              </div>
            </div>
          </div>

          {/* Draft email content */}
          <div className="p-3">
            <div className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-gray-900 truncate">To: kendall@waystarroyco.com</span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: BROWSER_START + 0.6, duration: 0.3 }}
                      className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full flex-shrink-0"
                    >
                      Sent
                    </motion.span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mt-1.5">
                    Approval Needed — Vaulter LLC — $25,000.00
                  </div>
                  <p className="text-sm text-gray-700 mt-1.5">
                    Hi Kendall, an invoice from Vaulter LLC for $25,000.00 requires your approval before payment can be processed. Please review the invoice details included. If it looks okay to pay, please respond with your approval.
                  </p>
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
                      <Paperclip className="w-3 h-3" />
                      <span>INV-7234-VaulterLLC.pdf</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default GatheringApprovalsAnimation
