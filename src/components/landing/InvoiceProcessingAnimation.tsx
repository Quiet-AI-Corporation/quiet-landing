import { motion } from 'framer-motion'
import { Paperclip, Sparkles, Building2, Loader2 } from 'lucide-react'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import logo from '@/assets/images/logo.png'

const CHECK_ITEMS = [
  'Acme Corp: ACH and tax info on file',
  'Scanned invoice PDF',
  'Purchase owner identified',
]

const DRAFT_ITEM = 'Preparing bill for payment'

const CHECK_START_DELAY = 1.0
const CHECK_STAGGER = 0.7
// When the "Drafting" step appears (4th item)
const DRAFT_CHECK_START = CHECK_START_DELAY + CHECK_ITEMS.length * CHECK_STAGGER
// When the spinner turns into a checkmark
const DRAFT_CHECK_DONE = DRAFT_CHECK_START + 1.4
// Shrink all check items after drafting completes
const SHRINK_DELAY = DRAFT_CHECK_DONE + 0.3
// Invoice appears after shrink
const INVOICE_START_DELAY = SHRINK_DELAY + 0.5
const FIELD_STAGGER = 0.12

const LINE_ITEMS = [
  { description: 'Strategy consulting — Feb 2026', amount: '$5,000.00', gl: '6200 — Professional Services' },
  { description: 'Process optimization review', amount: '$4,500.00', gl: '6200 — Professional Services' },
  { description: 'Travel & expenses', amount: '$2,500.00', gl: '6500 — Travel & Entertainment' },
]

function InvoiceProcessingAnimation() {
  return (
    <div className="flex gap-5 w-full text-left items-stretch h-full">
      {/* Left — Browser window */}
      <div className="flex-1 min-w-0">
        {/* Fake browser window — dims when AI review completes */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: SHRINK_DELAY, duration: 0.8, ease: 'easeOut' }}
          className="h-full"
        >
          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white h-full flex flex-col">
            {/* Title bar */}
            <div className="bg-gray-100 border-b border-gray-200 px-3 pt-3 pb-0">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex">
                <div className="flex items-center gap-2 bg-white rounded-t-lg px-4 py-2 border border-gray-200 border-b-0 -mb-px relative z-10">
                  <img src={gmailLogo} alt="Gmail" className="w-4 h-4" />
                  <span className="text-xs text-gray-700 truncate">ap@company.com</span>
                </div>
              </div>
            </div>

            {/* Email content — animates in */}
            <div className="p-4 overflow-hidden flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-lg bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
                      AR
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">ar@acmecorp.com</span>
                        <span className="text-xs text-gray-400 flex-shrink-0">Feb 18, 2:34 PM</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">
                        Invoice #45 — February 2026
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">
                        Hi, please find attached our invoice for manufacturing consulting services for February 2026.
                      </p>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>INV-045-Feb2026.pdf</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right — AI Review → shrinks → Invoice */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* AI Review checks — fades in after pause, then shrinks after all checks complete */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
        >
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-600 uppercase tracking-widest mb-3">
            <img src={logo} alt="Quiet" className="h-5" />
            Quiet AI Review
          </div>
          <div className="flex flex-col">
            {/* Regular check items */}
            {CHECK_ITEMS.map((title, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20, marginTop: i === 0 ? 0 : 16 }}
                animate={{ opacity: 1, x: 0, marginTop: i === 0 ? 0 : 2 }}
                transition={{
                  opacity: { delay: CHECK_START_DELAY + i * CHECK_STAGGER, duration: 0.4 },
                  x: { delay: CHECK_START_DELAY + i * CHECK_STAGGER, duration: 0.4 },
                  marginTop: { delay: SHRINK_DELAY, duration: 0.5, ease: 'easeInOut' },
                }}
                className="flex items-center gap-2"
              >
                <motion.span
                  initial={{ scale: 0, fontSize: 14 }}
                  animate={{ scale: 1, fontSize: 11 }}
                  transition={{
                    scale: { delay: CHECK_START_DELAY + i * CHECK_STAGGER + 0.3, duration: 0.2 },
                    fontSize: { delay: SHRINK_DELAY, duration: 0.5, ease: 'easeInOut' },
                  }}
                  className="text-green-500 font-bold"
                >
                  ✓
                </motion.span>
                <motion.span
                  initial={{ fontSize: 14, fontWeight: 500 }}
                  animate={{ fontSize: 11, fontWeight: 400 }}
                  transition={{ delay: SHRINK_DELAY, duration: 0.5, ease: 'easeInOut' }}
                  className="text-gray-900"
                >
                  {title}
                </motion.span>
              </motion.div>
            ))}

            {/* Drafting item — spinner that turns into checkmark */}
            <motion.div
              initial={{ opacity: 0, x: -20, marginTop: 16 }}
              animate={{ opacity: 1, x: 0, marginTop: 2 }}
              transition={{
                opacity: { delay: DRAFT_CHECK_START, duration: 0.4 },
                x: { delay: DRAFT_CHECK_START, duration: 0.4 },
                marginTop: { delay: SHRINK_DELAY, duration: 0.5, ease: 'easeInOut' },
              }}
              className="flex items-center gap-2"
            >
              <span className="inline-flex items-center justify-center relative">
                {/* Spinner — overlays the checkmark, fades out */}
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: DRAFT_CHECK_DONE, duration: 0.15 }}
                  className="absolute"
                >
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                </motion.span>
                {/* Checkmark — hidden with opacity 0, fades in when spinner fades out */}
                <motion.span
                  initial={{ opacity: 0, fontSize: 14 }}
                  animate={{ opacity: 1, fontSize: 11 }}
                  transition={{
                    opacity: { delay: DRAFT_CHECK_DONE, duration: 0.15 },
                    fontSize: { delay: SHRINK_DELAY, duration: 0.5, ease: 'easeInOut' },
                  }}
                  className="text-green-500 font-bold"
                >
                  ✓
                </motion.span>
              </span>
              <motion.span
                initial={{ fontSize: 14, fontWeight: 500 }}
                animate={{ fontSize: 11, fontWeight: 400 }}
                transition={{ delay: SHRINK_DELAY, duration: 0.5, ease: 'easeInOut' }}
                className="text-gray-900"
              >
                {DRAFT_ITEM}
              </motion.span>
            </motion.div>
          </div>
        </div>
        </motion.div>

        {/* Invoice card — slides up after drafting check completes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INVOICE_START_DELAY, duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden flex-1 flex flex-col"
        >
          {/* Header with vendor pill and status */}
          <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: INVOICE_START_DELAY + 0.1, duration: 0.3 }}
                className="text-sm font-semibold text-gray-900 truncate"
              >
                Invoice #45
              </motion.div>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: INVOICE_START_DELAY + 0.2, duration: 0.3 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0"
              >
                <Building2 className="w-3 h-3" />
                Acme Corp
              </motion.span>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: INVOICE_START_DELAY + 2.0, duration: 0.3 }}
              className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex-shrink-0"
            >
              Ready to Pay
            </motion.span>
          </div>

          <div className="px-4 py-2 space-y-4 flex-1 flex flex-col">
            {/* Invoice info — compact grid */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: INVOICE_START_DELAY + FIELD_STAGGER, duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-gray-500">Invoice #</div>
                  <div className="text-sm font-semibold text-gray-900">45</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Due Date</div>
                  <div className="text-sm text-gray-900">Mar 20, 2026</div>
                </div>
              </div>
            </motion.div>

            {/* Line items */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: INVOICE_START_DELAY + FIELD_STAGGER * 2, duration: 0.3 }}
            >
              <div className="space-y-1.5">
                {/* Header */}
                <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500">
                  <div className="col-span-9">Line Item</div>
                  <div className="col-span-3 text-right">Amount</div>
                </div>
                {/* Items */}
                {LINE_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.description}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: INVOICE_START_DELAY + FIELD_STAGGER * 3 + i * FIELD_STAGGER, duration: 0.3 }}
                  >
                    <div className="grid grid-cols-12 gap-2 text-sm">
                      <div className="col-span-9 text-gray-900 truncate">{item.description}</div>
                      <div className="col-span-3 text-right font-medium text-gray-900">{item.amount}</div>
                    </div>
                    <div className="pl-3 mt-0.5 flex items-center gap-1 text-xs">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span className="text-blue-600">{item.gl}</span>
                    </div>
                  </motion.div>
                ))}
                {/* Total */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: INVOICE_START_DELAY + FIELD_STAGGER * 6 + 0.2, duration: 0.3 }}
                  className="grid grid-cols-12 gap-2 pt-1.5 mt-1 border-t border-gray-200"
                >
                  <div className="col-span-9 text-right text-sm font-medium text-gray-700">Total</div>
                  <div className="col-span-3 text-right text-sm font-semibold text-gray-900">$12,000.00</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Pay button */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: INVOICE_START_DELAY + 2.0, duration: 0.3 }}
              className="flex justify-end"
            >
              <div className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-md">
                Pay
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default InvoiceProcessingAnimation
