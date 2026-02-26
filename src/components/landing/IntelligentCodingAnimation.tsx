import { motion } from 'framer-motion'
import { Sparkles, Building2, BookOpen } from 'lucide-react'
import logo from '@/assets/images/logo.png'

const LINE_ITEMS = [
  { description: 'Patent filing — US utility', amount: '$3,200.00', type: 'ip' as const },
  { description: 'Patent prosecution — prior art search', amount: '$4,800.00', type: 'ip' as const },
  { description: 'Corporate governance advisory', amount: '$2,500.00', type: 'legal' as const },
]

const GL_IP = '1800 — IP (Asset)'
const GL_LEGAL = '6300 — Legal'
const DEPT_HQ = 'HQ'

// Invoice fades in
const INVOICE_START = 1.0

// Phase 1: flash IP guidance + IP line items + their GL field; assign GL during flash
const FLASH_IP_START = INVOICE_START + 1.5
const GL_IP_ASSIGN = FLASH_IP_START + 0.8  // assigned mid-flash

// Phase 2: flash Legal guidance + legal line item + its GL field; assign GL during flash
const FLASH_LEGAL_START = FLASH_IP_START + 2.8
const GL_LEGAL_ASSIGN = FLASH_LEGAL_START + 0.8

// Phase 3: flash Dept guidance + all line items + their Dept field; assign during flash
const FLASH_DEPT_START = FLASH_LEGAL_START + 2.8
const DEPT_ASSIGN = FLASH_DEPT_START + 0.8

// Summary checkmark + status change (simultaneous)
const SUMMARY_START = FLASH_DEPT_START + 3.0
const STATUS_CHANGE = SUMMARY_START

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

function IntelligentCodingAnimation() {
  return (
    <div className="flex gap-5 w-full text-left items-stretch h-full">
      {/* Left — Coding guidance */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-600 uppercase tracking-widest mb-4">
              <img src={logo} alt="Quiet" className="h-5" />
              Quiet AI Coding Assistant
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3">
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm font-medium text-gray-500">Your guidelines</div>
              </div>

              {/* Rule 1 — IP */}
              {(() => {
                const flash = flashBg(FLASH_IP_START)
                return (
                  <motion.div
                    initial={flash.initial}
                    animate={flash.animate}
                    transition={flash.transition}
                    className="rounded-md p-2 -mx-1"
                  >
                    <p className="text-sm text-gray-700">
                      Intellectual property line items should be coded to{' '}
                      <span className="font-semibold text-blue-700">IP (Asset)</span>{' '}
                      since they can be depreciated.
                    </p>
                  </motion.div>
                )
              })()}

              {/* Rule 2 — Legal */}
              {(() => {
                const flash = flashBg(FLASH_LEGAL_START)
                return (
                  <motion.div
                    initial={flash.initial}
                    animate={flash.animate}
                    transition={flash.transition}
                    className="rounded-md p-2 -mx-1"
                  >
                    <p className="text-sm text-gray-700">
                      Other legal expenses should be categorized under the{' '}
                      <span className="font-semibold text-blue-700">Legal</span> account.
                    </p>
                  </motion.div>
                )
              })()}

              {/* Rule 3 — Department */}
              {(() => {
                const flash = flashBg(FLASH_DEPT_START)
                return (
                  <motion.div
                    initial={flash.initial}
                    animate={flash.animate}
                    transition={flash.transition}
                    className="rounded-md p-2 -mx-1"
                  >
                    <p className="text-sm text-gray-700">
                      Any invoices billed to New York HQ should have their Department set to{' '}
                      <span className="font-semibold text-blue-700">"HQ"</span>, otherwise set to{' '}
                      <span className="font-semibold text-blue-700">"Satellite"</span>.
                    </p>
                  </motion.div>
                )
              })()}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: SUMMARY_START, duration: 0.4 }}
              className="mt-4 flex items-center gap-2 text-sm text-gray-700"
            >
              <span className="text-green-500 font-bold">✓</span>
              All line items coded per your rules
            </motion.div>
          </div>
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
                Invoice #112
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0">
                <Building2 className="w-3 h-3" />
                Pearson Hardman
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
                className="absolute top-0 right-0 px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full whitespace-nowrap"
              >
                Ready to Pay
              </motion.span>
            </div>
          </div>

          <div className="px-4 py-4 space-y-6 flex-1 flex flex-col">
            {/* Invoice info */}
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-gray-500">Invoice #</div>
                  <div className="text-sm font-semibold text-gray-900">112</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Due Date</div>
                  <div className="text-sm text-gray-900">Mar 15, 2026</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-1">Addressed to</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-gray-400">Company</div>
                    <div className="text-sm text-gray-900">Waystar Royco</div>
                  </div>
                  <motion.div
                    initial={{ backgroundColor: 'rgba(59,130,246,0)' }}
                    animate={{
                      backgroundColor: [
                        'rgba(59,130,246,0)',
                        'rgba(59,130,246,0.15)',
                        'rgba(59,130,246,0.15)',
                        'rgba(59,130,246,0)',
                      ],
                    }}
                    transition={{
                      delay: FLASH_DEPT_START,
                      duration: 2.4,
                      times: [0, 0.08, 0.8, 1],
                      ease: 'easeInOut',
                    }}
                    className="rounded px-1 -mx-1 py-0.5"
                  >
                    <div className="text-xs text-gray-400">Address</div>
                    <div className="text-sm text-gray-900">28 Liberty St, Manhattan, NY</div>
                  </motion.div>
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
                {LINE_ITEMS.map((item) => {
                  const isIp = item.type === 'ip'
                  const glFlashDelay = isIp ? FLASH_IP_START : FLASH_LEGAL_START
                  const glAssignDelay = isIp ? GL_IP_ASSIGN : GL_LEGAL_ASSIGN
                  const gl = isIp ? GL_IP : GL_LEGAL
                  const glFlash = flashBg(glFlashDelay)
                  const deptFlash = flashBg(FLASH_DEPT_START)

                  return (
                    <div key={item.description} className="py-0.5">
                      {/* Line item row — flashes during GL phase */}
                      <motion.div
                        initial={glFlash.initial}
                        animate={glFlash.animate}
                        transition={glFlash.transition}
                        className="grid grid-cols-12 gap-2 text-sm rounded px-1 -mx-1 py-0.5"
                      >
                        <div className="col-span-9 text-gray-900 truncate">{item.description}</div>
                        <div className="col-span-3 text-right font-medium text-gray-900">{item.amount}</div>
                      </motion.div>
                      <div className="pl-3 mt-1 grid grid-cols-2 gap-2">
                        {/* GL Account — flashes during GL phase, value appears mid-flash */}
                        <motion.div
                          initial={glFlash.initial}
                          animate={glFlash.animate}
                          transition={glFlash.transition}
                          className="rounded px-1 -mx-1 py-0.5"
                        >
                          <div className="text-xs text-gray-400">GL Account</div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: glAssignDelay, duration: 0.3 }}
                            className="flex items-center gap-1 text-xs"
                          >
                            <Sparkles className="w-3 h-3 text-blue-600" />
                            <span className="text-blue-600">{gl}</span>
                          </motion.div>
                        </motion.div>
                        {/* Department — flashes during Dept phase, value appears mid-flash */}
                        <motion.div
                          initial={deptFlash.initial}
                          animate={deptFlash.animate}
                          transition={deptFlash.transition}
                          className="rounded px-1 -mx-1 py-0.5"
                        >
                          <div className="text-xs text-gray-400">Department</div>
                          <div className="relative">
                            <motion.div
                              initial={{ opacity: 1 }}
                              animate={{ opacity: 0 }}
                              transition={{ delay: DEPT_ASSIGN, duration: 0.15 }}
                              className="text-xs text-gray-400"
                            >
                              —
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: DEPT_ASSIGN, duration: 0.3 }}
                              className="absolute top-0 left-0 flex items-center gap-1 text-xs"
                            >
                              <Sparkles className="w-3 h-3 text-blue-600" />
                              <span className="text-blue-600">{DEPT_HQ}</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )
                })}
                {/* Total */}
                <div className="grid grid-cols-12 gap-2 pt-1.5 mt-1 border-t border-gray-200">
                  <div className="col-span-9 text-right text-sm font-medium text-gray-700">Total</div>
                  <div className="col-span-3 text-right text-sm font-semibold text-gray-900">$10,500.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default IntelligentCodingAnimation
