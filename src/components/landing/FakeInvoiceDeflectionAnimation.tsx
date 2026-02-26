import { motion } from 'framer-motion'
import { Paperclip, AlertTriangle, ShieldAlert, Loader2 } from 'lucide-react'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import logo from '@/assets/images/logo.png'

const WARNING_ITEMS = [
  'Email logan@waystarr0yco.ru is not a known address for internal employee Logan Roy',
  'Vendor Fabrica Technologies has not been onboarded',
]

const CHECK_START_DELAY = 1.0
const CHECK_STAGGER = 0.7

// Item 2: "Potential impersonation attack" — spinner then red icon
const IMPERSONATION_CHECK_START = CHECK_START_DELAY + WARNING_ITEMS.length * CHECK_STAGGER
const IMPERSONATION_CHECK_DONE = IMPERSONATION_CHECK_START + 1.4

// Shrink all check items
const SHRINK_DELAY = IMPERSONATION_CHECK_DONE + 0.3

// Clarification card appears
const CARD_START = SHRINK_DELAY + 0.5

function FakeInvoiceDeflectionAnimation() {
  return (
    <div className="flex gap-5 w-full text-left items-stretch h-full">
      {/* Left — Browser window */}
      <div className="flex-1 min-w-0">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.7 }}
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
                  <span className="text-xs text-gray-700 truncate">ap@waystarroyco.com</span>
                </div>
              </div>
            </div>

            {/* Email content */}
            <div className="p-4 overflow-hidden flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-lg bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
                      LR
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">logan@waystarr0yco.ru</span>
                        <span className="text-xs text-gray-400 flex-shrink-0">Feb 23, 9:12 AM</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">
                        Urgent — Invoice from Fabrica Technologies
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">
                        Hi, please process the attached invoice from Fabrica Technologies as soon as possible. This needs to go out today.
                      </p>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>fabricatech-invoice.pdf</span>
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

      {/* Right — AI Review → shrinks → Clarification card */}
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
            <div className="flex flex-col">
              {/* Warning items — amber icons, with shrink */}
              {WARNING_ITEMS.map((title, i) => (
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
                    className="flex items-center"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
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

              {/* Impersonation item — spinner then red icon, with shrink */}
              <motion.div
                initial={{ opacity: 0, x: -20, marginTop: 16 }}
                animate={{ opacity: 1, x: 0, marginTop: 2 }}
                transition={{
                  opacity: { delay: IMPERSONATION_CHECK_START, duration: 0.4 },
                  x: { delay: IMPERSONATION_CHECK_START, duration: 0.4 },
                  marginTop: { delay: SHRINK_DELAY, duration: 0.5, ease: 'easeInOut' },
                }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center relative">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: IMPERSONATION_CHECK_DONE, duration: 0.15 }}
                    className="absolute"
                  >
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, fontSize: 14 }}
                    animate={{ opacity: 1, fontSize: 11 }}
                    transition={{
                      opacity: { delay: IMPERSONATION_CHECK_DONE, duration: 0.15 },
                      fontSize: { delay: SHRINK_DELAY, duration: 0.5, ease: 'easeInOut' },
                    }}
                    className="flex items-center"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                  </motion.span>
                </span>
                <motion.span
                  initial={{ fontSize: 14, fontWeight: 500 }}
                  animate={{ fontSize: 11, fontWeight: 400 }}
                  transition={{ delay: SHRINK_DELAY, duration: 0.5, ease: 'easeInOut' }}
                  className="text-red-700 font-medium"
                >
                  Potential impersonation attack
                </motion.span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Clarification card — slides up after shrink */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: CARD_START, duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-lg border border-amber-200 overflow-hidden flex-1 flex flex-col"
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-amber-100 bg-amber-50 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="text-sm font-semibold text-gray-900">Quiet AI is asking for clarification</span>
          </div>

          <div className="px-4 py-3 flex-1 flex flex-col">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: CARD_START + 0.15, duration: 0.3 }}
              className="text-sm text-gray-700 leading-relaxed"
            >
              We received an email from a sender resembling employee Logan Roy. However, the email address is different than Logan typically uses. Further, the vendor has not been onboarded. Is this a legitimate invoice?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: CARD_START + 0.4, duration: 0.3 }}
              className="flex flex-wrap gap-2 mt-4"
            >
              <div className="bg-red-50 text-red-700 border border-red-200 text-sm font-medium px-4 py-2 rounded-md cursor-default">
                No, it's fraudulent
              </div>
              <div className="bg-green-50 text-green-700 border border-green-200 text-sm font-medium px-4 py-2 rounded-md cursor-default">
                Yes, it's real
              </div>
              <div className="bg-gray-50 border border-gray-200 text-gray-500 text-sm px-4 py-2 rounded-md cursor-default">
                Type something…
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FakeInvoiceDeflectionAnimation
