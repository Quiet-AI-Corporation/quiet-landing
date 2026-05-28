import { AnimatePresence, motion } from 'framer-motion'
import {
  Paperclip,
  Sparkles,
  Building2,
  Loader2,
  ShieldCheck,
  Send,
  CheckCircle2,
  Landmark,
  MousePointer2,
  Mail,
  Clock,
  ArrowRight,
  AlertCircle,
  FileText,
} from 'lucide-react'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import qboLogo from '@/assets/images/qbo_logo.webp'
import plaidLogo from '@/assets/images/plaid_logo.webp'
import logo from '@/assets/images/logo.png'

export interface Scene {
  id: string
  label: string
  caption: string
  duration: number
}

export const SCENES: Scene[] = [
  {
    id: 'email',
    label: 'Email arrives',
    caption: '9:42 AM — A vendor invoice lands in your AP mailbox.',
    duration: 5.5,
  },
  {
    id: 'extract',
    label: 'AI extracts',
    caption: 'Quiet pulls structured data straight from the PDF — no manual entry.',
    duration: 6,
  },
  {
    id: 'verify',
    label: 'Vendor outreach',
    caption:
      "Missing W-9 and remittance details — Quiet emails the vendor, parses the reply, updates your records.",
    duration: 8,
  },
  {
    id: 'code',
    label: 'GL coding',
    caption: 'Every line item is coded to the right account, following your rules.',
    duration: 5.5,
  },
  {
    id: 'approve',
    label: 'Approval routed',
    caption: 'Threshold rule triggers an approval request. Approver replies. Done.',
    duration: 6.5,
  },
  {
    id: 'stage',
    label: 'Payment staged',
    caption: 'Quiet drafts the transfer from your bank account — but nothing moves yet.',
    duration: 4.5,
  },
  {
    id: 'pay',
    label: 'You approve',
    caption: 'One click. The bank executes the transfer.',
    duration: 4.5,
  },
  {
    id: 'sync',
    label: 'ERP & vendor',
    caption: 'QuickBooks updated. Confirmation email sent. Loop closed.',
    duration: 5.5,
  },
]

// ===== Scene 1: Email arrives =====
function SceneEmail() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          {/* Browser window */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm"
          >
            <div className="bg-gray-100 border-b border-gray-200 px-3 pt-3 pb-0">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex">
                <div className="flex items-center gap-2 bg-white rounded-t-lg px-4 py-2 border border-gray-200 border-b-0 -mb-px relative z-10">
                  <img src={gmailLogo} alt="Gmail" className="w-4 h-4" />
                  <span className="text-xs text-gray-700 truncate">ap@yourcompany.com</span>
                </div>
              </div>
            </div>

            {/* Inbox list */}
            <div className="p-3 space-y-1.5">
              {/* Older read emails */}
              {[
                { from: 'CloudOps', subject: 'Monthly usage report', time: 'Wed' },
                { from: 'Stripe', subject: 'Payout completed', time: 'Wed' },
              ].map((m) => (
                <div
                  key={m.subject}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-xs text-gray-500"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-transparent flex-shrink-0" />
                  <span className="w-24 truncate">{m.from}</span>
                  <span className="flex-1 truncate">{m.subject}</span>
                  <span>{m.time}</span>
                </div>
              ))}

              {/* New incoming email */}
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  backgroundColor: [
                    'rgba(59,130,246,0.15)',
                    'rgba(59,130,246,0.15)',
                    'rgba(255,255,255,1)',
                  ],
                }}
                transition={{
                  opacity: { delay: 0.4, duration: 0.4 },
                  y: { delay: 0.4, duration: 0.4 },
                  scale: { delay: 0.4, duration: 0.4 },
                  backgroundColor: { delay: 0.4, duration: 1.6, times: [0, 0.5, 1] },
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm border border-gray-200"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 1, 0.85] }}
                  transition={{ delay: 0.4, duration: 1.6, times: [0, 0.2, 0.7, 1] }}
                  className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                />
                <span className="w-24 truncate font-semibold text-gray-900">ar@acmecorp.com</span>
                <span className="flex-1 truncate text-gray-800">
                  Invoice #2026-0381 — February services
                </span>
                <Paperclip className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">9:42 AM</span>
              </motion.div>
            </div>

            {/* Preview of opened email */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 2.0, duration: 0.5 }}
              className="border-t border-gray-100"
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
                    AR
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        ar@acmecorp.com
                      </span>
                      <span className="text-xs text-gray-400 flex-shrink-0">9:42 AM</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mt-1">
                      Invoice #2026-0381 — February services
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      Hi, please find attached our invoice for February. Net 30. Thanks!
                    </p>
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.6, duration: 0.4 }}
                      className="mt-3"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>INV-2026-0381.pdf</span>
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quiet detected pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.4 }}
            className="mt-4 flex items-center justify-center gap-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
              <img src={logo} alt="Quiet" className="h-3.5" />
              <span className="text-xs font-medium text-blue-700">
                Invoice detected — handing to Quiet AI
              </span>
              <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
            </div>
          </motion.div>
        </div>
      </div>
  )
}

// ===== Scene 2: AI extracts =====
const EXTRACT_FIELDS = [
  { label: 'Vendor', value: 'Acme Corp', delay: 0.6 },
  { label: 'Invoice #', value: '2026-0381', delay: 0.9 },
  { label: 'Issue Date', value: 'Feb 28, 2026', delay: 1.2 },
  { label: 'Due Date', value: 'Mar 30, 2026', delay: 1.5 },
]
const EXTRACT_LINES = [
  { description: 'Strategy consulting — Feb 2026', amount: '$5,000.00', delay: 2.1 },
  { description: 'Process optimization review', amount: '$4,500.00', delay: 2.4 },
  { description: 'Travel & expenses', amount: '$2,500.00', delay: 2.7 },
]

function SceneExtract() {
  return (
    <div className="w-full h-full flex items-stretch gap-5 px-6 py-2">
        {/* Left — PDF being scanned */}
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <div className="relative w-full max-w-xs aspect-[8.5/11] bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Mock PDF content */}
            <div className="p-4 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                ACME CORP
              </div>
              <div className="text-[8px] text-gray-400">123 Industry Way, Brooklyn, NY</div>
              <div className="h-px bg-gray-100 my-2" />
              <div className="text-xs font-bold text-gray-900">Invoice #2026-0381</div>
              <div className="space-y-0.5">
                <div className="text-[8px] text-gray-400">Date: Feb 28, 2026</div>
                <div className="text-[8px] text-gray-400">Due: Mar 30, 2026</div>
              </div>
              <div className="h-px bg-gray-100 my-2" />
              <div className="space-y-1">
                <div className="text-[8px] text-gray-700">Strategy consulting — Feb 2026</div>
                <div className="text-[8px] text-gray-400">$5,000.00</div>
                <div className="text-[8px] text-gray-700">Process optimization review</div>
                <div className="text-[8px] text-gray-400">$4,500.00</div>
                <div className="text-[8px] text-gray-700">Travel & expenses</div>
                <div className="text-[8px] text-gray-400">$2,500.00</div>
              </div>
              <div className="h-px bg-gray-100 my-2" />
              <div className="flex justify-between text-[8px] font-bold text-gray-900">
                <span>TOTAL</span>
                <span>$12,000.00</span>
              </div>
            </div>

            {/* Scanning line */}
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{
                delay: 0.4,
                duration: 3.0,
                times: [0, 0.5, 1],
                ease: 'easeInOut',
              }}
              className="absolute left-0 right-0 h-12 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.25) 50%, rgba(59,130,246,0) 100%)',
              }}
            />
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{
                delay: 0.4,
                duration: 3.0,
                times: [0, 0.5, 1],
                ease: 'easeInOut',
              }}
              className="absolute left-0 right-0 h-px bg-blue-500"
            />

            {/* PDF label */}
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-gray-900 text-white text-[8px] font-medium rounded">
              PDF
            </div>
          </div>
        </div>

        {/* Right — Invoice card with fields filling in */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex-1 min-w-0"
        >
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col shadow-sm">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
              <img src={logo} alt="Quiet" className="h-4" />
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Extracting fields
              </span>
              <Loader2 className="w-3 h-3 text-blue-600 animate-spin ml-auto" />
            </div>

            <div className="p-4 space-y-3 flex-1">
              {/* Header fields */}
              <div className="grid grid-cols-2 gap-2">
                {EXTRACT_FIELDS.map((f) => (
                  <div key={f.label}>
                    <div className="text-xs text-gray-500">{f.label}</div>
                    <div className="relative h-5">
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: f.delay, duration: 0.15 }}
                        className="absolute inset-0 bg-gray-100 rounded"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: f.delay, duration: 0.3 }}
                        className="text-sm font-medium text-gray-900 flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        {f.value}
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Line items */}
              <div>
                <div className="text-xs text-gray-500 mb-1.5 mt-2">Line items</div>
                <div className="space-y-1">
                  {EXTRACT_LINES.map((l) => (
                    <motion.div
                      key={l.description}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: l.delay, duration: 0.3 }}
                      className="flex items-center justify-between text-sm gap-2"
                    >
                      <span className="text-gray-700 truncate flex-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        {l.description}
                      </span>
                      <span className="font-medium text-gray-900">{l.amount}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.0, duration: 0.3 }}
                  className="flex items-center justify-between text-sm font-semibold border-t border-gray-200 pt-1.5 mt-1.5"
                >
                  <span className="text-gray-700">Total</span>
                  <span className="text-gray-900">$12,000.00</span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.6, duration: 0.4 }}
                className="flex items-center gap-2 pt-1"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-700">
                  Fields extracted — every value linked to its source PDF.
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    
  )
}

// ===== Scene 3: Vendor outreach — Quiet asks the vendor for missing tax/ACH details =====
function SceneVerify() {
  // Phase timing
  const T_VENDOR_OK = 0.5
  const T_DUPE_OK = 0.9
  const T_W9_MISSING = 1.4
  const T_ACH_MISSING = 1.8
  const T_REACH_OUT = 2.3
  const T_EMAIL_DRAFT = 2.6
  const T_EMAIL_SENT = 3.5
  const T_REPLY = 4.5
  const T_PARSE = 5.4
  const T_SAVED_W9 = 6.0
  const T_SAVED_ACH = 6.3
  const T_ERP_SYNC = 6.7

  return (
    <div className="w-full h-full flex items-center justify-center px-6 py-2">
      <div className="w-full max-w-4xl grid grid-cols-2 gap-4">
        {/* Left — Vendor file panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
            <img src={logo} alt="Quiet" className="h-4" />
            Vendor file · Acme Corp
            <Loader2 className="w-3 h-3 text-blue-600 animate-spin ml-auto" />
          </div>

          <div className="space-y-2 flex-1">
            {/* Vendor matched */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: T_VENDOR_OK, duration: 0.35 }}
              className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">Vendor matched</div>
                <div className="text-xs text-gray-500">Acme Corp · Vendor #1247</div>
              </div>
            </motion.div>

            {/* No duplicates */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: T_DUPE_OK, duration: 0.35 }}
              className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">No duplicates</div>
                <div className="text-xs text-gray-500">No matching invoice in 90 days</div>
              </div>
            </motion.div>

            {/* W-9 missing → saved */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: T_W9_MISSING, duration: 0.35 }}
              className="relative flex items-center gap-2.5 p-2.5 rounded-lg border"
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: T_SAVED_W9, duration: 0.3 }}
                className="absolute inset-0 rounded-lg bg-amber-50 border border-amber-200"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: T_SAVED_W9, duration: 0.3 }}
                className="absolute inset-0 rounded-lg bg-green-50 border border-green-200"
              />
              <div className="relative w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: T_SAVED_W9, duration: 0.3 }}
                  className="absolute inset-0 rounded-full bg-amber-100 flex items-center justify-center"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: T_SAVED_W9, duration: 0.3, ease: 'backOut' }}
                  className="absolute inset-0 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                </motion.div>
              </div>
              <div className="relative min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">W-9 / Tax ID</div>
                <div className="relative h-4">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: T_SAVED_W9, duration: 0.3 }}
                    className="absolute inset-0 text-xs text-amber-700"
                  >
                    Not on file — required for 1099
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: T_SAVED_W9, duration: 0.3 }}
                    className="absolute inset-0 text-xs text-green-700 font-medium"
                  >
                    EIN 47-****1284 · Saved
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ACH missing → saved */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: T_ACH_MISSING, duration: 0.35 }}
              className="relative flex items-center gap-2.5 p-2.5 rounded-lg border"
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: T_SAVED_ACH, duration: 0.3 }}
                className="absolute inset-0 rounded-lg bg-amber-50 border border-amber-200"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: T_SAVED_ACH, duration: 0.3 }}
                className="absolute inset-0 rounded-lg bg-green-50 border border-green-200"
              />
              <div className="relative w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: T_SAVED_ACH, duration: 0.3 }}
                  className="absolute inset-0 rounded-full bg-amber-100 flex items-center justify-center"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: T_SAVED_ACH, duration: 0.3, ease: 'backOut' }}
                  className="absolute inset-0 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                </motion.div>
              </div>
              <div className="relative min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">Remittance · ACH</div>
                <div className="relative h-4">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: T_SAVED_ACH, duration: 0.3 }}
                    className="absolute inset-0 text-xs text-amber-700"
                  >
                    No payment instructions on file
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: T_SAVED_ACH, duration: 0.3 }}
                    className="absolute inset-0 text-xs text-green-700 font-medium"
                  >
                    Chase ****6789 · Saved
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom action bar */}
          <div className="mt-3 relative h-7">
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, -4] }}
              transition={{
                delay: T_REACH_OUT,
                duration: T_ERP_SYNC - T_REACH_OUT,
                times: [0, 0.1, 0.85, 1],
              }}
              className="absolute inset-0 flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs text-blue-800">
                Reaching out to vendor for the missing details…
              </span>
              <Loader2 className="w-3 h-3 text-blue-600 animate-spin ml-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: T_ERP_SYNC, duration: 0.35 }}
              className="absolute inset-0 flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-50 border border-green-100"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs text-green-800 font-medium">
                Vendor record complete · synced to QuickBooks
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right — Email exchange */}
        <div className="flex flex-col gap-3">
          {/* Outgoing email */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: T_EMAIL_DRAFT, duration: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-3 py-1.5 flex items-center gap-2 border-b border-gray-100">
              <Send className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium text-gray-700">Outgoing draft</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: T_EMAIL_SENT, duration: 0.25 }}
                className="ml-auto px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full"
              >
                Sent
              </motion.span>
            </div>
            <div className="p-3 text-xs">
              <div className="text-gray-500 mb-1">
                To: <span className="text-gray-900 font-medium">ar@acmecorp.com</span>
              </div>
              <div className="font-semibold text-gray-900 mb-1.5">
                Quick request — W-9 and remittance details
              </div>
              <p className="text-gray-700 leading-relaxed">
                Hi! Before we process invoice #2026-0381, we need a current W-9 and your
                preferred ACH remittance details on file. Could you reply with both? Thanks!
              </p>
              <div className="mt-2 text-[10px] text-gray-400">
                — Sent from ap@yourcompany.com (drafted by Quiet AI)
              </div>
            </div>
          </motion.div>

          {/* Inbound reply */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: T_REPLY, duration: 0.4 }}
            className="bg-white rounded-xl border border-blue-200 overflow-hidden shadow-sm"
          >
            <div className="bg-blue-50 px-3 py-1.5 flex items-center gap-2 border-b border-blue-100">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">Reply from Acme Corp</span>
              <span className="ml-auto text-[10px] text-blue-600">8 min later</span>
            </div>
            <div className="p-3 text-xs">
              <div className="text-gray-500 mb-1">
                From: <span className="text-gray-900 font-medium">ar@acmecorp.com</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-2">
                Of course — attached. Routing to Chase ****6789. Let me know if you need
                anything else.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: T_REPLY + 0.3, duration: 0.25 }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-[10px] text-gray-700"
                >
                  <FileText className="w-2.5 h-2.5" />
                  W-9_AcmeCorp_2026.pdf
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: T_REPLY + 0.45, duration: 0.25 }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-[10px] text-gray-700"
                >
                  <FileText className="w-2.5 h-2.5" />
                  ACH_remittance.pdf
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Parsed pill */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: T_PARSE, duration: 0.35 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs text-blue-900">
              Parsed attachments — pulled EIN and bank routing automatically.
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ===== Scene 4: GL Coding =====
const CODE_LINES = [
  {
    description: 'Strategy consulting — Feb 2026',
    amount: '$5,000.00',
    gl: '6200 — Professional Services',
    dept: 'Operations',
    delay: 0.8,
  },
  {
    description: 'Process optimization review',
    amount: '$4,500.00',
    gl: '6200 — Professional Services',
    dept: 'Operations',
    delay: 1.6,
  },
  {
    description: 'Travel & expenses',
    amount: '$2,500.00',
    gl: '6500 — Travel & Entertainment',
    dept: 'Operations',
    delay: 2.4,
  },
]

function SceneCode() {
  return (
    <div className="w-full h-full flex items-stretch gap-5 px-6 py-2">
        {/* Left — Rules */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-72 flex-shrink-0"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-full">
            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
              Your coding rules
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-md bg-gray-50 border border-gray-100">
                <span className="text-gray-500">Consulting & advisory →</span>{' '}
                <span className="font-semibold text-blue-700">6200</span>
              </div>
              <div className="p-2 rounded-md bg-gray-50 border border-gray-100">
                <span className="text-gray-500">Travel-related →</span>{' '}
                <span className="font-semibold text-blue-700">6500</span>
              </div>
              <div className="p-2 rounded-md bg-gray-50 border border-gray-100">
                <span className="text-gray-500">All Acme Corp →</span>{' '}
                <span className="font-semibold text-blue-700">Operations</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Invoice with coded lines */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 min-w-0"
        >
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col shadow-sm">
            <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold text-gray-900">Invoice #2026-0381</div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  <Building2 className="w-3 h-3" />
                  Acme Corp
                </span>
              </div>
              <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            </div>

            <div className="p-4 space-y-3 flex-1">
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
                <div className="col-span-6">Line item</div>
                <div className="col-span-3">Code</div>
                <div className="col-span-3 text-right">Amount</div>
              </div>
              {CODE_LINES.map((l) => (
                <div key={l.description} className="space-y-1">
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
                      delay: l.delay - 0.2,
                      duration: 1.8,
                      times: [0, 0.1, 0.7, 1],
                    }}
                    className="grid grid-cols-12 gap-2 text-sm items-center px-1 py-1 rounded"
                  >
                    <div className="col-span-6 text-gray-900 truncate">{l.description}</div>
                    <div className="col-span-3 relative">
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: l.delay, duration: 0.15 }}
                        className="absolute inset-0 flex items-center"
                      >
                        <span className="text-xs text-gray-300">—</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: l.delay, duration: 0.3 }}
                        className="flex items-center gap-1 text-xs"
                      >
                        <Sparkles className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        <span className="text-blue-700 font-medium">{l.gl.split(' — ')[0]}</span>
                      </motion.div>
                    </div>
                    <div className="col-span-3 text-right font-medium text-gray-900">
                      {l.amount}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: l.delay + 0.15, duration: 0.3 }}
                    className="pl-1 text-xs text-gray-500"
                  >
                    {l.gl} · Dept: {l.dept}
                  </motion.div>
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.0, duration: 0.3 }}
                className="grid grid-cols-12 gap-2 pt-2 border-t border-gray-200 px-1"
              >
                <div className="col-span-9 text-right text-sm font-medium text-gray-700">
                  Total
                </div>
                <div className="col-span-3 text-right text-sm font-semibold text-gray-900">
                  $12,000.00
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.4, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-700">
                  All line items coded per your rules.
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    
  )
}

// ===== Scene 5: Approval =====
function SceneApprove() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
        <div className="w-full max-w-3xl space-y-3">
          {/* Top row: rule check */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <img src={logo} alt="Quiet" className="h-4" />
            <span className="text-sm text-gray-700">
              Invoice total{' '}
              <span className="font-semibold text-gray-900">$12,000</span> exceeds your{' '}
              <span className="font-semibold text-gray-900">$10,000</span> approval threshold —
              routing to{' '}
              <span className="font-semibold text-blue-700">kendall@yourcompany.com</span>
            </span>
            <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin ml-auto" />
          </motion.div>

          {/* Email exchange */}
          <div className="grid grid-cols-2 gap-3">
            {/* Sent email */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="bg-gray-100 px-3 py-1.5 flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs font-medium text-gray-700">Outgoing</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.0, duration: 0.3 }}
                  className="ml-auto px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full"
                >
                  Sent
                </motion.span>
              </div>
              <div className="p-3 text-xs">
                <div className="mb-1.5">
                  <span className="text-gray-500">To: </span>
                  <span className="text-gray-900 font-medium">kendall@yourcompany.com</span>
                </div>
                <div className="font-semibold text-gray-900 mb-1.5">
                  Approval needed — Acme Corp $12,000
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Hi Kendall, Acme Corp's February invoice (#2026-0381) is ready to pay at
                  $12,000. Total exceeds your $10,000 threshold — please review and approve.
                </p>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-[10px] text-gray-600">
                    <Paperclip className="w-2.5 h-2.5" />
                    INV-2026-0381.pdf
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Reply */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.2, duration: 0.4 }}
              className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="bg-blue-50 px-3 py-1.5 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-medium text-blue-800">Reply</span>
                <span className="ml-auto text-[10px] text-blue-600">2 min later</span>
              </div>
              <div className="p-3 text-xs">
                <div className="mb-1.5">
                  <span className="text-gray-500">From: </span>
                  <span className="text-gray-900 font-medium">kendall@yourcompany.com</span>
                </div>
                <div className="font-semibold text-gray-900 mb-1.5">
                  Re: Approval needed — Acme Corp $12,000
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Looks good. Approved.
                </p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 4.0, duration: 0.3 }}
                  className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-green-50 border border-green-200 rounded-md"
                >
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span className="text-[10px] font-medium text-green-800">
                    Quiet parsed: APPROVED
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.6, duration: 0.4 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-100"
          >
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800 font-medium">
              Approval recorded · Invoice moved to Ready to Pay
            </span>
          </motion.div>
        </div>
      </div>
    
  )
}

// ===== Scene 6: Payment staged =====
function SceneStage() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-900">Payment</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="ml-auto px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full"
              >
                Staged · Awaiting approval
              </motion.span>
            </div>

            <div className="p-5 space-y-4">
              {/* From / To */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="rounded-lg border border-gray-200 p-3"
                >
                  <div className="text-xs text-gray-500 mb-1">From</div>
                  <div className="flex items-center gap-2">
                    <img src={plaidLogo} alt="Plaid" className="w-4 h-4" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Chase ····6789
                      </div>
                      <div className="text-xs text-gray-500">Your operating account</div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="rounded-lg border border-gray-200 p-3"
                >
                  <div className="text-xs text-gray-500 mb-1">To</div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-200 flex items-center justify-center">
                      <Building2 className="w-3 h-3 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Acme Corp</div>
                      <div className="text-xs text-gray-500">ACH · vendor on file</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Animated arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="flex items-center justify-center"
              >
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="h-px w-16 bg-gray-200" />
                  <ArrowRight className="w-4 h-4" />
                  <div className="h-px w-16 bg-gray-200" />
                </div>
              </motion.div>

              {/* Amount */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                className="text-center"
              >
                <div className="text-xs text-gray-500 uppercase tracking-wider">Amount</div>
                <div className="text-3xl font-bold text-gray-900">$12,000.00</div>
                <div className="text-xs text-gray-500 mt-1">
                  Net 30 · Scheduled for next business day
                </div>
              </motion.div>

              {/* Notice */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.4 }}
                className="flex items-start gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-blue-900">
                  <span className="font-semibold">Nothing has moved yet.</span> Quiet drafted
                  this payment — your one-click approval is the only thing standing between
                  here and money out.
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    
  )
}

// ===== Scene 7: User approves (clicks Pay) =====
function ScenePay() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm relative overflow-hidden">
            <div className="text-center mb-2">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Send payment to Acme Corp
              </div>
              <div className="text-2xl font-bold text-gray-900">$12,000.00</div>
            </div>

            <div className="text-center text-xs text-gray-500 mb-6">
              From Chase ····6789 · ACH · arrives tomorrow
            </div>

            {/* Button + cursor */}
            <div className="relative flex justify-center">
              {/* Button */}
              <motion.div
                initial={{ scale: 1, backgroundColor: 'rgb(37,99,235)' }}
                animate={{
                  scale: [1, 1, 0.95, 1, 1],
                  backgroundColor: [
                    'rgb(37,99,235)',
                    'rgb(37,99,235)',
                    'rgb(29,78,216)',
                    'rgb(22,163,74)',
                    'rgb(22,163,74)',
                  ],
                }}
                transition={{
                  delay: 1.4,
                  duration: 1.0,
                  times: [0, 0.4, 0.6, 0.8, 1],
                }}
                className="relative inline-flex items-center gap-2 px-10 py-3.5 rounded-lg text-white font-semibold shadow-lg"
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 2.0, duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  Pay $12,000.00
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0, duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Sent
                </motion.span>
                <span className="opacity-0">Pay $12,000.00</span>
              </motion.div>

              {/* Cursor */}
              <motion.div
                initial={{ x: 140, y: -40, opacity: 0 }}
                animate={{
                  x: [140, 30, 0, 0],
                  y: [-40, -10, 4, 4],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  delay: 0.4,
                  duration: 2.5,
                  times: [0, 0.5, 0.7, 1],
                  ease: 'easeInOut',
                }}
                className="absolute pointer-events-none"
              >
                <MousePointer2
                  className="w-6 h-6 text-gray-900"
                  fill="white"
                  strokeWidth={1.5}
                />
              </motion.div>

              {/* Click ripple */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.6, 2.2], opacity: [0, 0.4, 0] }}
                transition={{ delay: 1.8, duration: 0.7, times: [0, 0.3, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-blue-500"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.4 }}
              className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600"
            >
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Approved in under a second.</span>
            </motion.div>
          </div>
        </div>
      </div>
    
  )
}

// ===== Scene 8: ERP + vendor sync =====
function SceneSync() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
        <div className="w-full max-w-3xl space-y-3">
          {/* Top: header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-medium text-green-800">
                Payment sent — closing the loop
              </span>
            </div>
          </motion.div>

          {/* Three result cards */}
          <div className="grid grid-cols-3 gap-3">
            {/* Vendor confirmation */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">Vendor notified</span>
              </div>
              <div className="p-3 text-xs">
                <div className="text-gray-500 mb-1">To: ar@acmecorp.com</div>
                <div className="font-semibold text-gray-900 mb-1.5">
                  Payment confirmation — $12,000
                </div>
                <p className="text-gray-700 leading-relaxed text-[11px]">
                  Hi — invoice #2026-0381 has been paid in full via ACH. Funds should arrive
                  within 1 business day.
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
                  className="mt-2 inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full"
                >
                  <CheckCircle2 className="w-2.5 h-2.5" /> Sent
                </motion.div>
              </div>
            </motion.div>

            {/* ERP sync */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
                <img src={qboLogo} alt="QuickBooks" className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold text-gray-700">ERP synced</span>
              </div>
              <div className="p-3 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Bill</span>
                  <span className="font-medium text-gray-900">#2026-0381</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-gray-900">Paid</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">GL</span>
                  <span className="font-medium text-gray-900">6200 / 6500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium text-gray-900">$12,000.00</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.3 }}
                  className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded-full"
                >
                  <CheckCircle2 className="w-2.5 h-2.5" /> Booked
                </motion.div>
              </div>
            </motion.div>

            {/* Audit log */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">Audit trail</span>
              </div>
              <div className="p-3 space-y-1 text-[10px]">
                {[
                  '9:42 AM · Email received',
                  '9:42 AM · Fields extracted',
                  '9:42 AM · Vendor verified',
                  '9:42 AM · GL coded',
                  '9:43 AM · Approval requested',
                  '9:45 AM · Kendall approved',
                  '9:45 AM · You sent payment',
                  '9:45 AM · ERP synced',
                ].map((line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8 + i * 0.1, duration: 0.2 }}
                    className="flex items-center gap-1.5 text-gray-700"
                  >
                    <div className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    {line}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Closing line */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-700"
          >
            <Clock className="w-4 h-4 text-gray-400" />
            <span>
              Start to finish in{' '}
              <span className="font-semibold text-gray-900">about 3 minutes</span> — most of
              that waiting on Kendall.
            </span>
          </motion.div>
        </div>
      </div>
    
  )
}

// ===== Main exported component =====
function EndToEndWorkflowAnimation({ sceneIndex }: { sceneIndex: number }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneIndex}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {sceneIndex === 0 && <SceneEmail />}
          {sceneIndex === 1 && <SceneExtract />}
          {sceneIndex === 2 && <SceneVerify />}
          {sceneIndex === 3 && <SceneCode />}
          {sceneIndex === 4 && <SceneApprove />}
          {sceneIndex === 5 && <SceneStage />}
          {sceneIndex === 6 && <ScenePay />}
          {sceneIndex === 7 && <SceneSync />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default EndToEndWorkflowAnimation
