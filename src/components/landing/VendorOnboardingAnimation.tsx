import { motion } from 'framer-motion'
import { Paperclip, AlertTriangle, Building2, Loader2, User, Mail, Send } from 'lucide-react'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import logo from '@/assets/images/logo.png'

const WARNING_ITEMS = [
  'No prior correspondence with michael@bluthcompany.com',
  'No prior invoices from Bluth Company',
]

const DRAFT_PROFILE_ITEM = 'Drafted profile for Bluth Company (missing information)'
const DRAFT_EMAIL_ITEM = 'Drafted information request to Bluth Company'

const CHECK_START_DELAY = 1.0
const CHECK_STAGGER = 0.7
// When the "Drafted vendor profile" step appears (3rd item — spinner)
const PROFILE_CHECK_START = CHECK_START_DELAY + WARNING_ITEMS.length * CHECK_STAGGER
// When the spinner turns into a warning icon
const PROFILE_CHECK_DONE = PROFILE_CHECK_START + 1.4
// Vendor profile card appears after 3rd check completes
const PROFILE_START_DELAY = PROFILE_CHECK_DONE + 0.5
const FIELD_STAGGER = 0.15
// 4th check item: "Drafted information request"
const DRAFT_EMAIL_CHECK_START = PROFILE_START_DELAY + FIELD_STAGGER * 5 + 0.5
const DRAFT_EMAIL_CHECK_DONE = DRAFT_EMAIL_CHECK_START + 1.4
// Draft reply appears in browser
const BROWSER_SWAP_DELAY = DRAFT_EMAIL_CHECK_DONE + 0.3

function VendorOnboardingAnimation() {
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

            {/* Email content area — incoming email collapses when draft appears */}
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
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
                      MB
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">michael@bluthcompany.com</span>
                        <span className="text-xs text-gray-400 flex-shrink-0">Feb 20, 10:15 AM</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">
                        Invoice — Bluth Company
                      </div>
                      {/* Full body + attachment — hides on collapse */}
                      <motion.div
                        initial={{ maxHeight: 200, opacity: 1 }}
                        animate={{ maxHeight: 0, opacity: 0 }}
                        transition={{ delay: BROWSER_SWAP_DELAY, duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">
                          Hi, here's our Feb invoice. Thanks!
                        </p>
                        <div className="mt-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
                            <Paperclip className="w-3.5 h-3.5" />
                            <span>INV-001-Feb2026.pdf</span>
                          </span>
                        </div>
                      </motion.div>
                      {/* Collapsed single-line preview — same font size, gray, truncated */}
                      <motion.p
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 24, opacity: 1 }}
                        transition={{ delay: BROWSER_SWAP_DELAY + 0.3, duration: 0.4, ease: 'easeInOut' }}
                        className="text-sm text-gray-400 mt-1 truncate overflow-hidden"
                      >
                        Hi, please find attached our invoice for construction consulting services...
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
                        <span className="text-sm font-medium text-gray-900 truncate">To: michael@bluthcompany.com</span>
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
                        Re: Invoice — Bluth Company
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        Hi Michael,
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        Before we can process your invoice, we'll need:
                      </p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">
                        1. Remittance details (bank account & routing){'\n'}2. A completed Form W-9
                      </p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">Thanks,{'\n'}Company AP Team</p>
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

      {/* Right — AI Review + Vendor Profile */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* AI Review checks — no shrinkage, items stay at full size */}
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
            <div className="flex flex-col gap-3">
              {/* Warning items — amber icons */}
              {WARNING_ITEMS.map((title, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: CHECK_START_DELAY + i * CHECK_STAGGER,
                    duration: 0.4,
                  }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: CHECK_START_DELAY + i * CHECK_STAGGER + 0.3, duration: 0.2 }}
                    className="flex items-center"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  </motion.span>
                  <span className="text-sm text-gray-900">{title}</span>
                </motion.div>
              ))}

              {/* 3rd item: "Drafted vendor profile" — spinner then green check */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: PROFILE_CHECK_START, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center relative">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: PROFILE_CHECK_DONE, duration: 0.15 }}
                    className="absolute"
                  >
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: PROFILE_CHECK_DONE, duration: 0.15 }}
                    className="text-green-500 font-bold text-sm"
                  >
                    ✓
                  </motion.span>
                </span>
                <span className="text-sm text-gray-900">{DRAFT_PROFILE_ITEM}</span>
              </motion.div>

              {/* 4th item: "Drafted information request" — spinner then green check */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: DRAFT_EMAIL_CHECK_START, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center relative">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: DRAFT_EMAIL_CHECK_DONE, duration: 0.15 }}
                    className="absolute"
                  >
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: DRAFT_EMAIL_CHECK_DONE, duration: 0.15 }}
                    className="text-green-500 font-bold text-sm"
                  >
                    ✓
                  </motion.span>
                </span>
                <span className="text-sm text-gray-900">{DRAFT_EMAIL_ITEM}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Vendor profile card — slides up after 3rd check completes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: PROFILE_START_DELAY, duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden flex-1 flex flex-col"
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: PROFILE_START_DELAY + 0.1, duration: 0.3 }}
                className="text-sm font-semibold text-gray-900 truncate"
              >
                Bluth Company
              </motion.div>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: PROFILE_START_DELAY + 0.2, duration: 0.3 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0"
              >
                <Building2 className="w-3 h-3" />
                Vendor
              </motion.span>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: PROFILE_START_DELAY + 0.3, duration: 0.3 }}
              className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full flex-shrink-0"
            >
              Draft
            </motion.span>
          </div>

          <div className="px-4 py-3 space-y-4 flex-1 flex flex-col">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PROFILE_START_DELAY + FIELD_STAGGER, duration: 0.3 }}
            >
              <div>
                <div className="text-xs text-gray-500 mb-1">Points of Contact</div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                  <User className="w-3 h-3" />
                  Michael Bluth (michael@bluthcompany.com)
                </span>
              </div>
            </motion.div>

            {/* Domain */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PROFILE_START_DELAY + FIELD_STAGGER * 1.5, duration: 0.3 }}
            >
              <div>
                <div className="text-xs text-gray-500">Domain</div>
                <div className="text-sm text-gray-900">bluthcompany.com</div>
              </div>
            </motion.div>

            {/* Missing fields */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PROFILE_START_DELAY + FIELD_STAGGER * 2, duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">Remittance Info</div>
                  <div className="text-sm text-gray-400">—</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Tax Info / W-9</div>
                  <div className="text-sm text-gray-400">—</div>
                </div>
              </div>
            </motion.div>

            {/* Missing info banner */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PROFILE_START_DELAY + FIELD_STAGGER * 3, duration: 0.3 }}
              className="mt-auto"
            >
              <div className="flex items-center gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-700">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                Missing remittance details and W-9 — cannot process payment
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default VendorOnboardingAnimation
