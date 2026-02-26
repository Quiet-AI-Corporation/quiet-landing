import { motion } from 'framer-motion'
import { Loader2, Send, FileText } from 'lucide-react'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import logo from '@/assets/images/logo.png'

const CHECK_START_DELAY = 1.0
const CHECK_STAGGER = 0.7

// Item 0: "13 prior threads" — instant green check
const ITEM_0_DELAY = CHECK_START_DELAY

// Item 1: "Looked up status of invoice" — spinner then check
const LOOKUP_CHECK_START = CHECK_START_DELAY + CHECK_STAGGER
const LOOKUP_CHECK_DONE = LOOKUP_CHECK_START + 1.4

// Invoice card appears after lookup completes
const INVOICE_START_DELAY = LOOKUP_CHECK_DONE + 0.5
const FIELD_STAGGER = 0.15

// Item 2: "Drafted response" — spinner then check
const DRAFT_CHECK_START = INVOICE_START_DELAY + FIELD_STAGGER * 3 + 0.5
const DRAFT_CHECK_DONE = DRAFT_CHECK_START + 1.4

// Draft reply appears in browser
const BROWSER_SWAP_DELAY = DRAFT_CHECK_DONE + 0.3

function InquiryResponsesAnimation() {
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
              {/* Incoming email — collapses and grays out when draft reply appears */}
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
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
                      KE
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">kier@lumonindustries.com</span>
                        <span className="text-xs text-gray-400 flex-shrink-0">Feb 21, 2:30 PM</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">
                        Invoice Status — Lumon Industries
                      </div>
                      {/* Full body — hides on collapse */}
                      <motion.div
                        initial={{ maxHeight: 200, opacity: 1 }}
                        animate={{ maxHeight: 0, opacity: 0 }}
                        transition={{ delay: BROWSER_SWAP_DELAY, duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">
                          Hi, could you provide an update on the status of invoice INV-4821? We'd like to confirm it's being processed.{'\n\n'}Thanks,{'\n'}Kier
                        </p>
                      </motion.div>
                      {/* Collapsed single-line preview */}
                      <motion.p
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 24, opacity: 1 }}
                        transition={{ delay: BROWSER_SWAP_DELAY + 0.3, duration: 0.4, ease: 'easeInOut' }}
                        className="text-sm text-gray-400 mt-1 truncate overflow-hidden"
                      >
                        Hi, could you provide an update on the status of invoice INV-4821...
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
                <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">To: kier@lumonindustries.com</span>
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
                        Re: Invoice Status — Lumon Industries
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">Hi Kier,{'\n\n'}Payment for INV-4821 was initiated a couple of days ago. The ACH should clear in the next couple of business days.{'\n\n'}Thanks,{'\n'}Company AP Team</p>
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: BROWSER_SWAP_DELAY + 1.0, duration: 0.3 }}
                        className="flex justify-end mt-2"
                      >
                        <div className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-md">
                          Send
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — AI Review + Invoice Card */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* AI Review checks */}
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
              {/* Item 0: "13 prior threads" — instant green check */}
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
                <span className="text-sm text-gray-900">13 prior threads with kier@lumonindustries.com</span>
              </motion.div>

              {/* Item 1: "Looked up status" — spinner then green check */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: LOOKUP_CHECK_START, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center relative">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: LOOKUP_CHECK_DONE, duration: 0.15 }}
                    className="absolute"
                  >
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: LOOKUP_CHECK_DONE, duration: 0.15 }}
                    className="text-green-500 font-bold text-sm"
                  >
                    ✓
                  </motion.span>
                </span>
                <span className="text-sm text-gray-900">Looked up status of invoice INV-4821</span>
              </motion.div>

              {/* Item 2: "Drafted response" — spinner then green check */}
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
                <span className="text-sm text-gray-900">Drafted response to inquiry from Lumon Industries</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Invoice card — slides up after lookup completes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INVOICE_START_DELAY, duration: 0.5, ease: 'easeOut' }}
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
                INV-4821
              </motion.div>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: INVOICE_START_DELAY + 0.2, duration: 0.3 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0"
              >
                <FileText className="w-3 h-3" />
                Lumon Industries
              </motion.span>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: INVOICE_START_DELAY + 0.3, duration: 0.3 }}
              className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full flex-shrink-0"
            >
              Payment Processing
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
                  <div className="text-sm text-gray-900">$14,250.00</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Invoice Date</div>
                  <div className="text-sm text-gray-900">Feb 10, 2026</div>
                </div>
              </div>
            </motion.div>

            {/* Payment Initiated + Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: INVOICE_START_DELAY + FIELD_STAGGER * 2, duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">Payment Initiated</div>
                  <div className="text-sm text-gray-900">Feb 19, 2026</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Payment Method</div>
                  <div className="text-sm text-gray-900">ACH</div>
                </div>
              </div>
            </motion.div>

            {/* Status banner */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: INVOICE_START_DELAY + FIELD_STAGGER * 3, duration: 0.3 }}
              className="mt-auto"
            >
              <div className="flex items-center gap-2 px-3 py-2.5 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
                <FileText className="w-4 h-4 flex-shrink-0" />
                ACH initiated by john@company.com
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default InquiryResponsesAnimation
