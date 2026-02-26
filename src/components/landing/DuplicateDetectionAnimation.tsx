import { motion } from 'framer-motion'
import { AlertTriangle, Loader2, Send, Paperclip, FileText } from 'lucide-react'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import logo from '@/assets/images/logo.png'

const CHECK_START_DELAY = 1.0
const CHECK_STAGGER = 0.7

// Item 0: "ACH and tax info on file" — instant green check
const ITEM_0_DELAY = CHECK_START_DELAY

// Item 1: "Scanned invoice PDF" — instant green check
const ITEM_1_DELAY = CHECK_START_DELAY + CHECK_STAGGER

// Item 2: "Found existing invoice" — spinner then amber warning
const DUPLICATE_CHECK_START = CHECK_START_DELAY + 2 * CHECK_STAGGER
const DUPLICATE_CHECK_DONE = DUPLICATE_CHECK_START + 1.4

// Invoice card appears after duplicate detected
const INVOICE_START_DELAY = DUPLICATE_CHECK_DONE + 0.5
const FIELD_STAGGER = 0.15

// Item 3: "Drafted clarification" — spinner then green check
const DRAFT_CHECK_START = INVOICE_START_DELAY + FIELD_STAGGER * 3 + 0.5
const DRAFT_CHECK_DONE = DRAFT_CHECK_START + 1.4

// Draft reply appears in browser
const BROWSER_SWAP_DELAY = DRAFT_CHECK_DONE + 0.3

function DuplicateDetectionAnimation() {
  return (
    <div className="flex gap-5 w-full text-left items-stretch h-full">
      {/* Left — Browser window */}
      <div className="flex-1 min-w-0">
        <div className="h-full">
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

            {/* Email content area */}
            <div className="p-4 overflow-hidden flex-1 flex flex-col">
              {/* Incoming email — collapses when draft reply appears */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
              <motion.div
                animate={{ opacity: 0.4 }}
                transition={{ delay: BROWSER_SWAP_DELAY, duration: 0.4 }}
              >
                <div className="rounded-lg bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
                      LR
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">lydia@madrigalelectromotive.com</span>
                        <span className="text-xs text-gray-400 flex-shrink-0">Feb 24, 9:15 AM</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">
                        Invoice #302 — February 2026
                      </div>
                      {/* Full body — hides on collapse */}
                      <motion.div
                        initial={{ maxHeight: 200, opacity: 1 }}
                        animate={{ maxHeight: 0, opacity: 0 }}
                        transition={{ delay: BROWSER_SWAP_DELAY, duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">
                          Hi, please find attached our invoice for chemical distribution services for February 2026.{'\n\n'}Best,{'\n'}Lydia
                        </p>
                        <div className="mt-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
                            <Paperclip className="w-3.5 h-3.5" />
                            <span>INV-302-Feb2026.pdf</span>
                          </span>
                        </div>
                      </motion.div>
                      {/* Collapsed single-line preview */}
                      <motion.p
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 24, opacity: 1 }}
                        transition={{ delay: BROWSER_SWAP_DELAY + 0.3, duration: 0.4, ease: 'easeInOut' }}
                        className="text-sm text-gray-400 mt-1 truncate overflow-hidden"
                      >
                        Hi, please find attached our invoice for chemical distribution...
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
              </motion.div>

              {/* Draft reply — appears below the collapsed incoming email */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: BROWSER_SWAP_DELAY + 0.3, duration: 0.5 }}
                className="mt-3 flex-1"
              >
                <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">To: lydia@madrigalelectromotive.com</span>
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: BROWSER_SWAP_DELAY + 0.6, duration: 0.3 }}
                          className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full flex-shrink-0"
                        >
                          Draft
                        </motion.span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mt-2">
                        Re: Invoice #302 — February 2026
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">Hi Lydia,{'\n\n'}We noted that your invoice matches an invoice we already have on file (#302, dated Feb 3 2026, in the amount of $25,000) from Madrigal Electromotive. Could you please clarify?{'\n\n'}Thanks,</p>
                      <div className="flex items-center justify-between mt-0">
                        <p className="text-sm text-gray-700">Company AP Team</p>
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: BROWSER_SWAP_DELAY + 1.0, duration: 0.3 }}
                        >
                          <div className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-md">
                            Send
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — AI Review */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
        >
          <div className="p-4 bg-white rounded-xl">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-600 uppercase tracking-widest mb-3">
              <img src={logo} alt="Quiet" className="h-5" />
              Quiet AI Review
            </div>
            <div className="flex flex-col gap-3">
              {/* Item 0: ACH and tax info on file — instant green check */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ITEM_0_DELAY, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: ITEM_0_DELAY + 0.3, duration: 0.2 }}
                  className="text-green-500 font-bold text-sm"
                >
                  ✓
                </motion.span>
                <span className="text-sm text-gray-900">Madrigal Electromotive: ACH and tax info on file</span>
              </motion.div>

              {/* Item 1: Scanned invoice PDF — instant green check */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ITEM_1_DELAY, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: ITEM_1_DELAY + 0.3, duration: 0.2 }}
                  className="text-green-500 font-bold text-sm"
                >
                  ✓
                </motion.span>
                <span className="text-sm text-gray-900">Scanned invoice PDF</span>
              </motion.div>

              {/* Item 2: Duplicate detected — spinner then amber warning */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: DUPLICATE_CHECK_START, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center relative">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: DUPLICATE_CHECK_DONE, duration: 0.15 }}
                    className="absolute"
                  >
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: DUPLICATE_CHECK_DONE, duration: 0.15 }}
                    className="flex items-center"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  </motion.span>
                </span>
                <span className="text-sm text-gray-900">Found existing invoice from Madrigal Electromotive with the same invoice number (#302) and amount ($25,000)</span>
              </motion.div>

              {/* Item 3: Drafted clarification — spinner then green check */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: DRAFT_CHECK_START, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center relative">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: DRAFT_CHECK_DONE, duration: 0.15 }}
                    className="absolute"
                  >
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: DRAFT_CHECK_DONE, duration: 0.15 }}
                    className="text-green-500 font-bold text-sm"
                  >
                    ✓
                  </motion.span>
                </span>
                <span className="text-sm text-gray-900">Drafted clarification request to Madrigal Electromotive</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Invoice card — slides up after duplicate detected, dims when draft is created */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INVOICE_START_DELAY, duration: 0.5, ease: 'easeOut' }}
          className="flex-1 flex flex-col"
        >
        <motion.div
          animate={{ opacity: 0.4 }}
          transition={{ delay: BROWSER_SWAP_DELAY, duration: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden flex-1 flex flex-col"
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: INVOICE_START_DELAY + 0.1, duration: 0.3 }}
                className="text-sm font-semibold text-gray-900 truncate"
              >
                INV-302
              </motion.div>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: INVOICE_START_DELAY + 0.2, duration: 0.3 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0"
              >
                <FileText className="w-3 h-3" />
                Madrigal Electromotive
              </motion.span>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: INVOICE_START_DELAY + 0.3, duration: 0.3 }}
              className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full flex-shrink-0"
            >
              Pending Approval
            </motion.span>
          </div>

          <div className="px-4 py-3 space-y-4 flex-1 flex flex-col">
            {/* Amount + Date row */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: INVOICE_START_DELAY + FIELD_STAGGER, duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">Amount</div>
                  <div className="text-sm text-gray-900">$25,000.00</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Invoice Date</div>
                  <div className="text-sm text-gray-900">Feb 3, 2026</div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: INVOICE_START_DELAY + FIELD_STAGGER * 2, duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">Description</div>
                  <div className="text-sm text-gray-900">Chemical distribution services</div>
                </div>
              </div>
            </motion.div>

            {/* Potential duplicate banner */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: INVOICE_START_DELAY + FIELD_STAGGER * 3, duration: 0.3 }}
              className="mt-auto"
            >
              <div className="flex items-center gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-700">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                Potential duplicate of incoming invoice #302
              </div>
            </motion.div>
          </div>
        </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default DuplicateDetectionAnimation
