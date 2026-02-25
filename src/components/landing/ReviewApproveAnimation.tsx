import { motion } from 'framer-motion'
import { Building2, Loader2, Sparkles, User, Mail, Paperclip } from 'lucide-react'

// ── Timing constants (seconds) ──────────────────────────────────

const NOTIFICATION_START = 0.5
const CARD_START = NOTIFICATION_START + 1.0
const FIELD_START = CARD_START + 0.5
const FIELD_STAGGER = 0.45
const SPINNER_DURATION = 0.4

// Field load order:
// 0: Associated Vendor
// 1: Addressed To (Name, Email, Company, Address)
// 2: Invoice Number
// 3: Invoice Date, Payment Terms, Bill Due Date
// 4: Accounting Effective Date + Memo
// 5: Line Item 1
// 6: Line Item 2 (Tax) + Total
// 7: Purchase Owner
// 8: Approver

const TOTAL_FIELDS = 9
const LAST_FIELD_DONE = FIELD_START + (TOTAL_FIELDS - 1) * FIELD_STAGGER + SPINNER_DURATION
const STATUS_CHANGE = LAST_FIELD_DONE + 0.3
const BUTTON_START = STATUS_CHANGE + 0.4

function LoadingField({
  delay,
  value,
  className = '',
}: {
  delay: number
  value: React.ReactNode
  className?: string
}) {
  const resolveAt = delay + SPINNER_DURATION
  return (
    <span className={`inline-flex items-center relative ${className}`}>
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: resolveAt, duration: 0.15 }}
        className="absolute"
      >
        <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: resolveAt, duration: 0.2 }}
      >
        {value}
      </motion.span>
    </span>
  )
}

function ReviewApproveAnimation() {
  return (
    <div className="flex flex-col gap-3 w-full text-left h-full p-5">
      {/* Notification Banner */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: NOTIFICATION_START, duration: 0.5, ease: 'easeOut' }}
        className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700 self-start"
      >
        <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <span>
          Received{' '}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700">
            <Paperclip className="w-3 h-3" />
            INV-039-Dec2025.pdf
          </span>{' '}
          in AP mailbox
        </span>
      </motion.div>

      {/* Invoice Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: CARD_START, duration: 0.5, ease: 'easeOut' }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden flex-1 flex flex-col"
      >
        {/* Card Header — title + status badge */}
        <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between gap-2">
          <div className="text-sm font-semibold text-gray-900 truncate">
            Invoice dated Dec 25, 2025 from Nishant Consulting LLC
          </div>
          <div className="relative flex-shrink-0">
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: STATUS_CHANGE, duration: 0.2 }}
              className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full whitespace-nowrap"
            >
              Processing…
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: STATUS_CHANGE, duration: 0.3 }}
              className="absolute top-0 right-0 px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap"
            >
              Ready for Review
            </motion.span>
          </div>
        </div>

        <div className="px-4 py-2 space-y-3 flex-1 flex flex-col overflow-hidden">
          {/* ── Vendor Details ── */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Vendor Details</div>
            <div className="text-xs text-gray-400 mb-0.5">Associated Vendor</div>
            <LoadingField
              delay={FIELD_START + 0 * FIELD_STAGGER}
              value={
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900">
                  <Building2 className="w-3.5 h-3.5 text-green-600" />
                  Nishant Consulting LLC
                </span>
              }
            />
          </div>

          {/* ── Addressed To ── */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Addressed To</div>
            <LoadingField
              delay={FIELD_START + 1 * FIELD_STAGGER}
              value={
                <div className="grid grid-cols-4 gap-x-4">
                  <div>
                    <div className="text-xs text-gray-400">Name</div>
                    <div className="text-sm text-gray-900">Jackson Organa</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Email</div>
                    <div className="text-sm text-gray-900 truncate">jackson@star-infotech.com</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Company</div>
                    <div className="text-sm text-gray-900 truncate">Star Infotech Accounting</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Address</div>
                    <div className="text-sm text-gray-900 truncate">456 Corporate Dr</div>
                  </div>
                </div>
              }
              className="w-full"
            />
          </div>

          {/* ── Invoice Information ── */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Invoice Information</div>
            <div className="space-y-1.5">
              <div>
                <div className="text-xs text-gray-400">Invoice Number</div>
                <LoadingField
                  delay={FIELD_START + 2 * FIELD_STAGGER}
                  value={<span className="text-sm font-semibold text-gray-900">#39</span>}
                />
              </div>
              <LoadingField
                delay={FIELD_START + 3 * FIELD_STAGGER}
                value={
                  <div className="grid grid-cols-3 gap-x-4">
                    <div>
                      <div className="text-xs text-gray-400">Invoice Date</div>
                      <div className="text-sm text-gray-900">Dec 25, 2025</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Payment Terms</div>
                      <div className="text-sm text-gray-900">Net 30 Days</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Bill Due Date</div>
                      <div className="text-sm text-gray-900">Jan 24, 2026</div>
                    </div>
                  </div>
                }
                className="w-full"
              />
            </div>
          </div>

          {/* ── Accounting ── */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Accounting</div>
            <LoadingField
              delay={FIELD_START + 4 * FIELD_STAGGER}
              value={
                <div className="space-y-1">
                  <div>
                    <div className="text-xs text-gray-400">Accounting Effective Date</div>
                    <div className="text-sm text-gray-900">Dec 25, 2025</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Memo</div>
                    <div className="text-sm text-blue-600">Software development services - December 2025</div>
                  </div>
                </div>
              }
              className="w-full"
            />
          </div>

          {/* ── Line Items ── */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-3 py-1.5 text-xs font-medium text-gray-500 border-b border-gray-100">
              <div className="col-span-5">Line Item</div>
              <div className="col-span-3 text-right">Amount</div>
              <div className="col-span-4 text-right">GL Account</div>
            </div>
            {/* Line Item 1 */}
            <div className="px-3 py-1.5 border-b border-gray-50">
              <LoadingField
                delay={FIELD_START + 5 * FIELD_STAGGER}
                value={
                  <div className="w-full">
                    <div className="grid grid-cols-12 gap-2 text-sm">
                      <div className="col-span-5 text-gray-900">Software Development Services</div>
                      <div className="col-span-3 text-right font-medium text-gray-900">$6,000.00</div>
                      <div className="col-span-4 text-right flex items-center justify-end gap-1 text-xs">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-600">Legal & Professional Fees</span>
                      </div>
                    </div>
                  </div>
                }
                className="w-full"
              />
            </div>
            {/* Line Item 2 — Tax */}
            <div className="px-3 py-1.5 border-b border-gray-100">
              <LoadingField
                delay={FIELD_START + 6 * FIELD_STAGGER}
                value={
                  <div className="w-full">
                    <div className="grid grid-cols-12 gap-2 text-sm">
                      <div className="col-span-5 text-gray-900">Tax (8.75%)</div>
                      <div className="col-span-3 text-right font-medium text-gray-900">$525.00</div>
                      <div className="col-span-4 text-right flex items-center justify-end gap-1 text-xs">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-600">Taxes & Licenses</span>
                      </div>
                    </div>
                  </div>
                }
                className="w-full"
              />
            </div>
            {/* Total */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: FIELD_START + 6 * FIELD_STAGGER + SPINNER_DURATION,
                duration: 0.3,
              }}
              className="grid grid-cols-12 gap-2 px-3 py-1.5"
            >
              <div className="col-span-5 text-right text-sm font-medium text-gray-500">Total</div>
              <div className="col-span-3 text-right text-sm font-semibold text-gray-900">$6,525.00</div>
              <div className="col-span-4" />
            </motion.div>
          </div>

          {/* ── Approvals Waterfall ── */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Approvals Waterfall</div>
            <div className="space-y-1">
              <div>
                <div className="text-xs text-gray-400">Purchase Owner</div>
                <LoadingField
                  delay={FIELD_START + 7 * FIELD_STAGGER}
                  value={
                    <span className="text-sm font-medium text-gray-900">jackson@star-infotech.com</span>
                  }
                />
              </div>
              <div>
                <div className="text-xs text-gray-400">Approvers</div>
                <LoadingField
                  delay={FIELD_START + 8 * FIELD_STAGGER}
                  value={
                    <span className="inline-flex items-center gap-1 text-sm text-gray-900">
                      <User className="w-3 h-3 text-gray-400" />
                      jackson@star-infotech.com
                    </span>
                  }
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BUTTON_START, duration: 0.3 }}
            className="flex justify-start mt-auto"
          >
            <div className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-md">
              Submit to Approvers for Review
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default ReviewApproveAnimation
