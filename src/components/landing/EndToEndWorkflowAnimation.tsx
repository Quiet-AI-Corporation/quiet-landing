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
  FileText,
  Check,
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
    duration: 9,
  },
  {
    id: 'extract',
    label: 'AI extracts',
    caption: 'Quiet pulls structured data straight from the PDF — no manual entry.',
    duration: 10,
  },
  {
    id: 'verify',
    label: 'Vendor outreach',
    caption:
      "Missing W-9 and remittance details — Quiet emails the vendor, parses the reply, updates your records.",
    duration: 10.5,
  },
  {
    id: 'code',
    label: 'GL coding',
    caption: 'Every line item is coded to the right account, following your rules.',
    duration: 10.5,
  },
  {
    id: 'approve',
    label: 'Approval routed',
    caption: 'Threshold rule triggers an approval request. Approver replies. Done.',
    duration: 9.5,
  },
  {
    id: 'stage',
    label: 'Payment staged',
    caption: 'Quiet drafts the transfer from your bank account — but nothing moves yet.',
    duration: 6.5,
  },
  {
    id: 'pay',
    label: 'You approve',
    caption: 'One click. The bank executes the transfer.',
    duration: 6.5,
  },
  {
    id: 'sync',
    label: 'ERP sync',
    caption: 'QuickBooks updated. Confirmation email sent. Loop closed.',
    duration: 8,
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
            {/* Placeholder row — gray pills */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-transparent flex-shrink-0" />
              <div className="w-28"><div className="h-2.5 w-12 rounded-full bg-gray-200" /></div>
              <div className="flex-1"><div className="h-2.5 w-24 rounded-full bg-gray-200" /></div>
              <div className="h-2.5 w-8 rounded-full bg-gray-200" />
            </div>
            {/* Placeholder row */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-transparent flex-shrink-0" />
              <div className="w-28"><div className="h-2.5 w-16 rounded-full bg-gray-200" /></div>
              <div className="flex-1"><div className="h-2.5 w-32 rounded-full bg-gray-200" /></div>
              <div className="h-2.5 w-8 rounded-full bg-gray-200" />
            </div>

            {/* New incoming email — row that expands into detail card on "click" */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: [1, 1, 1.02, 1],
                backgroundColor: [
                  'rgba(255,255,255,0)',
                  'rgba(255,255,255,0)',
                  'rgba(59,130,246,0.15)',
                  'rgba(59,130,246,0.15)',
                  'rgba(255,255,255,0)',
                ],
              }}
              transition={{
                opacity: { delay: 1.0, duration: 0.4 },
                y: { delay: 1.0, duration: 0.4 },
                scale: {
                  delay: 2.2,
                  duration: 0.5,
                  times: [0, 0, 0.4, 1],
                },
                backgroundColor: {
                  delay: 2.2,
                  duration: 0.8,
                  times: [0, 0.05, 0.2, 0.6, 1],
                },
              }}
              className="rounded-lg text-sm overflow-hidden"
            >
              {/* Collapsed email row — hides after click */}
              <motion.div
                initial={{ opacity: 1, height: 'auto' }}
                animate={{ opacity: 0, height: 0 }}
                transition={{
                  opacity: { delay: 2.7, duration: 0.25 },
                  height: { delay: 2.7, duration: 0.35 },
                }}
                className="flex items-center gap-3 px-3 py-2"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 1, 0] }}
                  transition={{
                    delay: 1.0,
                    duration: 1.8,
                    times: [0, 0.15, 0.65, 0.75],
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                />
                <span className="w-28 truncate font-semibold text-gray-900">
                  ar@acmecorp.com
                </span>
                <span className="flex-1 truncate text-gray-800">
                  Invoice #2026-0381 — February services
                </span>
                <Paperclip className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">9:42 AM</span>
              </motion.div>

              {/* Expanded email detail card — appears after click */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{
                  opacity: { delay: 2.85, duration: 0.4 },
                  height: { delay: 2.7, duration: 0.45 },
                }}
                className="border border-gray-200 rounded-lg bg-white shadow-sm"
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
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>INV-2026-0381.pdf</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quiet detected pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.0, duration: 0.4 }}
          className="mt-4 flex items-center justify-center gap-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <img src={logo} alt="Quiet" className="h-3.5" />
            <span className="text-xs font-medium text-blue-700">
              Invoice detected. Quiet AI is on it
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
  { label: 'Vendor', value: 'Acme Corp', delay: 1.0 },
  { label: 'Invoice #', value: '2026-0381', delay: 1.5 },
]
const EXTRACT_LINES = [
  { description: 'Strategy consulting — Feb 2026', amount: '$5,000.00', delay: 3.2 },
  { description: 'Process optimization review', amount: '$4,500.00', delay: 3.7 },
  { description: 'Travel & expenses', amount: '$2,500.00', delay: 4.2 },
]

function SceneExtract() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-5 px-6 py-2">
      <div className="w-full flex items-stretch gap-5">
        {/* Left — PDF being scanned */}
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <div className="relative w-full max-w-xs aspect-[8.5/11] bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 space-y-2">
              <div className="h-2 w-20 rounded-full bg-gray-200" />
              <div className="h-1.5 w-28 rounded-full bg-gray-100" />
              <div className="h-px bg-gray-100 my-2" />
              <div className="text-sm font-bold text-gray-900">
                Invoice #2026-0381
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-24 rounded-full bg-gray-200" />
                <div className="h-1.5 w-32 rounded-full bg-gray-200" />
              </div>
              <div className="h-px bg-gray-100 my-2" />
              <div className="space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-gray-200" />
                <div className="h-1.5 w-20 rounded-full bg-gray-100" />
                <div className="h-1.5 w-full rounded-full bg-gray-200" />
                <div className="h-1.5 w-16 rounded-full bg-gray-100" />
                <div className="h-1.5 w-3/4 rounded-full bg-gray-200" />
                <div className="h-1.5 w-12 rounded-full bg-gray-100" />
              </div>
              <div className="h-px bg-gray-100 my-2" />
              <div className="flex justify-between">
                <div className="h-2 w-10 rounded-full bg-gray-300" />
                <div className="h-2 w-14 rounded-full bg-gray-300" />
              </div>
            </div>

            {/* Scanning glow */}
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{
                delay: 0.4,
                duration: 4.4,
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
                duration: 4.4,
                times: [0, 0.5, 1],
                ease: 'easeInOut',
              }}
              className="absolute left-0 right-0 h-px bg-blue-500"
            />

            <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-900 text-white text-[10px] font-medium rounded">
              PDF
            </div>
          </div>
        </div>

        {/* Right — Invoice card with fields filling in */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex-[1.3] min-w-0"
        >
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col shadow-sm">
            <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2">
              <img src={logo} alt="Quiet" className="h-4" />
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Extracting invoice
              </span>
              <div className="ml-auto relative w-3 h-3">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 4.8, duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 4.8, duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Check className="w-3 h-3 text-blue-600" />
                </motion.div>
              </div>
            </div>

            <div className="p-3 space-y-2 flex-1">
              <div className="grid grid-cols-2 gap-1.5">
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

              <div>
                <div className="text-xs text-gray-500 mb-1 mt-1">Line items</div>
                <div className="space-y-1">
                  {EXTRACT_LINES.map((l) => (
                    <div key={l.description} className="relative h-6">
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: l.delay, duration: 0.15 }}
                        className="absolute inset-0 bg-gray-100 rounded"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: l.delay, duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-between text-sm gap-2 px-1"
                      >
                        <span className="text-gray-800 truncate flex-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-blue-600 flex-shrink-0" />
                          {l.description}
                        </span>
                        <span className="font-medium text-gray-900">{l.amount}</span>
                      </motion.div>
                    </div>
                  ))}
                </div>
                <div className="relative h-6 border-t border-gray-200 mt-1.5">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 4.8, duration: 0.15 }}
                    className="absolute inset-0 mt-1.5 bg-gray-100 rounded"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.8, duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-end text-sm font-semibold pt-1.5"
                  >
                    <span className="text-gray-900">$12,000.00</span>
                  </motion.div>
                </div>
              </div>

              {/* Quiet AI pill */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5.4, duration: 0.4 }}
                className="flex items-center justify-center gap-2 pt-1"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                  <img src={logo} alt="Quiet" className="h-3.5" />
                  <span className="text-xs font-medium text-blue-700">
                    Fields extracted — moving to verification
                  </span>
                  <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Scene 3: Vendor outreach — Quiet asks the vendor for missing tax/ACH details =====
function SceneVerify() {
  // Phase timing
  const GAP = 1.2
  const T_EMAIL_DRAFT = 0.5
  const T_REPLY = T_EMAIL_DRAFT + GAP
  const T_PARSE = T_REPLY + GAP
  const T_VENDOR_PANEL = T_PARSE + GAP
  const T_VENDOR_OK = T_VENDOR_PANEL + 0.4
  const T_DUPE_OK = T_VENDOR_OK + 0.4
  const T_W9_SAVED = T_DUPE_OK + 0.4
  const T_ACH_SAVED = T_W9_SAVED + 0.3
  const T_ERP_SYNC = T_ACH_SAVED + 0.4

  return (
    <div className="w-full h-full flex items-center justify-center px-6 py-2">
      <div className="w-full max-w-4xl grid grid-cols-2 gap-4">
        {/* Left — Email exchange */}
        <div className="flex flex-col gap-3">
          {/* Outgoing email */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: T_EMAIL_DRAFT, duration: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-3 py-2 flex items-center gap-2 border-b border-gray-100">
              <Send className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium text-gray-700">To: ar@acmecorp.com</span>
            </div>
            <div className="p-3">
              <div className="font-semibold text-sm text-gray-900 mb-1.5">
                W-9 and remittance details
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Hi! Before we process invoice #2026-0381, we need a current W-9 and your
                preferred ACH remittance details on file. Could you reply with both? Thanks!
              </p>
            </div>
          </motion.div>

          {/* Inbound reply */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: T_REPLY, duration: 0.4 }}
            className="bg-white rounded-xl border border-blue-200 overflow-hidden shadow-sm"
          >
            <div className="bg-blue-50 px-3 py-2 flex items-center gap-2 border-b border-blue-100">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">From: ar@acmecorp.com</span>
            </div>
            <div className="p-3">
              <div className="font-semibold text-sm text-gray-900 mb-1.5">
                Re: W-9 and remittance details
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                Of course, attached. Let me know if you need anything else.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-700">
                  <FileText className="w-2.5 h-2.5" />
                  W-9_AcmeCorp_2026.pdf
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-700">
                  <FileText className="w-2.5 h-2.5" />
                  ACH_remittance.pdf
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quiet AI parsed pill */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: T_PARSE, duration: 0.35 }}
            className="flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
              <img src={logo} alt="Quiet" className="h-3.5" />
              <span className="text-xs font-medium text-blue-700">
                Quiet AI pulled tax &amp; payment info from attachments
              </span>
              <div className="relative w-3 h-3">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: T_VENDOR_PANEL, duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: T_VENDOR_PANEL, duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Check className="w-3 h-3 text-blue-600" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — Vendor file panel */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: T_VENDOR_PANEL, duration: 0.4 }}
        >
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
              <img src={logo} alt="Quiet" className="h-4" />
              Vendor File Updated
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
                  <div className="text-xs text-gray-500">Acme Corp</div>
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
                  <div className="text-xs text-gray-500">Invoice number and contents are unique</div>
                </div>
              </motion.div>

              {/* W-9 saved */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: T_W9_SAVED, duration: 0.35 }}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-green-50 border border-green-200"
              >
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">W-9 / Tax ID</div>
                  <div className="text-xs text-green-700 font-medium">EIN 47-****1284 · Saved</div>
                </div>
              </motion.div>

              {/* ACH saved */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: T_ACH_SAVED, duration: 0.35 }}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-green-50 border border-green-200"
              >
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">Remittance · ACH</div>
                  <div className="text-xs text-green-700 font-medium">Chase ****6789 · Saved</div>
                </div>
              </motion.div>
            </div>

            {/* Bottom status */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: T_ERP_SYNC, duration: 0.35 }}
              className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-50 border border-green-100"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs text-green-800 font-medium">
                Synced to QuickBooks
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Scene 4: GL Coding =====
// Phase 1: Consulting GL
const INV_RULE1_FLASH = 0.6
const INV_LINE1_FLASH = INV_RULE1_FLASH + 0.6
const INV_GL1_ASSIGN = INV_LINE1_FLASH + 0.6
// Phase 2: Travel GL
const INV_RULE2_FLASH = INV_GL1_ASSIGN + 0.8
const INV_LINE2_FLASH = INV_RULE2_FLASH + 0.6
const INV_GL2_ASSIGN = INV_LINE2_FLASH + 0.6
// Phase 3: Department
const INV_RULE3_FLASH = INV_GL2_ASSIGN + 0.8
const INV_DEPT_LINE_FLASH = INV_RULE3_FLASH + 0.6
const INV_DEPT_ASSIGN = INV_DEPT_LINE_FLASH + 0.6
// Wrap-up
const INV_TOTAL_DELAY = INV_DEPT_ASSIGN + 0.5
const INV_PILL_DELAY = INV_TOTAL_DELAY + 0.5

const flashBgInv = (delay: number, duration = 1.6) => ({
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
    duration,
    times: [0, 0.08, 0.75, 1] as number[],
    ease: 'easeInOut' as const,
  },
})

const CODE_LINES = [
  {
    description: 'Strategy consulting — Feb 2026',
    amount: '$5,000.00',
    gl: '6200 — Professional Services',
    dept: 'Finance',
    lineFlashDelay: INV_LINE1_FLASH,
    glDelay: INV_GL1_ASSIGN,
    deptLineFlash: INV_DEPT_LINE_FLASH,
    deptDelay: INV_DEPT_ASSIGN,
  },
  {
    description: 'Process optimization review',
    amount: '$4,500.00',
    gl: '6200 — Professional Services',
    dept: 'Finance',
    lineFlashDelay: INV_LINE1_FLASH,
    glDelay: INV_GL1_ASSIGN + 0.15,
    deptLineFlash: INV_DEPT_LINE_FLASH,
    deptDelay: INV_DEPT_ASSIGN + 0.15,
  },
  {
    description: 'Travel & expenses',
    amount: '$2,500.00',
    gl: '6500 — Travel & Entertainment',
    dept: 'Operations',
    lineFlashDelay: INV_LINE2_FLASH,
    glDelay: INV_GL2_ASSIGN,
    deptLineFlash: INV_DEPT_LINE_FLASH,
    deptDelay: INV_DEPT_ASSIGN + 0.3,
  },
]

function SceneCode() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full flex items-stretch gap-4">
        {/* Left — Source + Coding rules */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-60 flex-shrink-0"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm h-full">
            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Your coding rules
            </div>
            <div className="space-y-1 text-xs">
              {(() => {
                const flash = flashBgInv(INV_RULE1_FLASH)
                return (
                  <motion.div
                    initial={flash.initial}
                    animate={flash.animate}
                    transition={flash.transition}
                    className="rounded-md p-1.5 -mx-1"
                  >
                    <p className="text-gray-700">
                      Code consulting &amp; advisory to{' '}
                      <span className="font-semibold text-blue-700">6200 — Professional Services</span>
                    </p>
                  </motion.div>
                )
              })()}

              {(() => {
                const flash = flashBgInv(INV_RULE2_FLASH)
                return (
                  <motion.div
                    initial={flash.initial}
                    animate={flash.animate}
                    transition={flash.transition}
                    className="rounded-md p-1.5 -mx-1"
                  >
                    <p className="text-gray-700">
                      Code travel to{' '}
                      <span className="font-semibold text-blue-700">6500 — Travel &amp; Entertainment</span>
                    </p>
                  </motion.div>
                )
              })()}

              {(() => {
                const flash = flashBgInv(INV_RULE3_FLASH)
                return (
                  <motion.div
                    initial={flash.initial}
                    animate={flash.animate}
                    transition={flash.transition}
                    className="rounded-md p-1.5 -mx-1"
                  >
                    <p className="text-gray-700">
                      Code consulting to{' '}
                      <span className="font-semibold text-blue-700">Finance</span>.
                      Travel to{' '}
                      <span className="font-semibold text-blue-700">Operations</span>
                    </p>
                  </motion.div>
                )
              })()}
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
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm h-full flex flex-col">
            <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="text-sm font-semibold text-gray-900"
                >
                  Invoice #2026-0381
                </motion.div>
              </div>
              <div className="relative w-3.5 h-3.5">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: INV_PILL_DELAY, duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: INV_PILL_DELAY, duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                </motion.div>
              </div>
            </div>

            <div className="p-3 space-y-2 flex-1 flex flex-col">
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
                <div className="col-span-4">Line item</div>
                <div className="col-span-3">GL Account</div>
                <div className="col-span-2">Dept</div>
                <div className="col-span-3 text-right">Amount</div>
              </div>
              {CODE_LINES.map((l) => {
                const lineFlash = flashBgInv(l.lineFlashDelay, 1.2)
                const deptCellFlash = flashBgInv(l.deptLineFlash, 1.2)
                return (
                  <div
                    key={l.description}
                    className="grid grid-cols-12 gap-2 items-center px-1 py-0.5 rounded"
                  >
                    {/* Description — flashes when rule highlights */}
                    <motion.div
                      initial={lineFlash.initial}
                      animate={lineFlash.animate}
                      transition={lineFlash.transition}
                      className="col-span-4 text-gray-900 truncate text-sm rounded px-0.5"
                    >
                      {l.description}
                    </motion.div>
                    {/* GL Account */}
                    <div className="col-span-3 relative h-4">
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: l.glDelay, duration: 0.15 }}
                        className="absolute inset-0 flex items-center text-xs text-gray-300"
                      >
                        —
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: l.glDelay, duration: 0.3 }}
                        className="absolute inset-0 flex items-center gap-1 text-xs"
                      >
                        <Sparkles className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        <span className="text-blue-700 font-medium">{l.gl}</span>
                      </motion.div>
                    </div>
                    {/* Dept — flashes during dept rule */}
                    <motion.div
                      initial={deptCellFlash.initial}
                      animate={deptCellFlash.animate}
                      transition={deptCellFlash.transition}
                      className="col-span-2 relative h-4 rounded"
                    >
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: l.deptDelay, duration: 0.15 }}
                        className="absolute inset-0 flex items-center text-xs text-gray-300"
                      >
                        —
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: l.deptDelay, duration: 0.3 }}
                        className="absolute inset-0 flex items-center gap-1 text-xs"
                      >
                        <Sparkles className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        <span className="text-blue-700 font-medium">{l.dept}</span>
                      </motion.div>
                    </motion.div>
                    <div className="col-span-3 text-right font-medium text-gray-900 text-sm">
                      {l.amount}
                    </div>
                  </div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: INV_PILL_DELAY, duration: 0.4 }}
                className="flex items-center justify-center gap-2 pt-4 mt-auto"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                  <img src={logo} alt="Quiet" className="h-3.5" />
                  <span className="text-xs font-medium text-blue-700">
                    All line items coded per your rules
                  </span>
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Scene 5: Approval =====
function SceneApprove() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        {/* Top: Invoice approval rules card */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
        >
          <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Invoice approval rules
          </div>
          <p className="text-sm text-gray-700">
            If total &gt; <span className="font-semibold text-gray-900">$10,000</span>,{' '}
            <span className="font-semibold text-blue-700">kendall@yourcompany.com</span> must approve
          </p>
        </motion.div>

        {/* Email exchange */}
        <div className="grid grid-cols-2 gap-3">
          {/* Outgoing */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="bg-gray-100 px-3 py-2 flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">To: kendall@yourcompany.com</span>
            </div>
            <div className="p-3 text-sm space-y-2.5">
              <div className="font-semibold text-gray-900">Approval needed — Acme Corp $12,000</div>
              <p className="text-gray-700 leading-relaxed">
                Kendall, the attached invoice requires your approval before we can schedule payment.
              </p>
              <div className="flex flex-wrap gap-1.5">
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
            transition={{ delay: 4.0, duration: 0.4 }}
            className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="bg-blue-50 px-3 py-2 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">From: kendall@yourcompany.com</span>
            </div>
            <div className="p-3 text-sm space-y-2.5">
              <div className="font-semibold text-gray-900">Re: Approval needed — Acme Corp $12,000</div>
              <p className="text-gray-700 leading-relaxed">
                Approved.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Quiet AI status pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.4, duration: 0.4 }}
          className="flex items-center justify-center gap-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <img src={logo} alt="Quiet" className="h-3.5" />
            <span className="text-xs font-medium text-blue-700">
              Approval recorded. Staging payment
            </span>
            <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
          </div>
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
                className="flex items-center justify-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                  <img src={logo} alt="Quiet" className="h-3.5" />
                  <span className="text-xs font-medium text-blue-700">
                    Nothing has moved yet. Your one-click approval sends the payment
                  </span>
                </div>
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
                    'rgb(255,255,255)',
                    'rgb(255,255,255)',
                  ],
                  color: [
                    'rgb(255,255,255)',
                    'rgb(255,255,255)',
                    'rgb(255,255,255)',
                    'rgb(37,99,235)',
                    'rgb(37,99,235)',
                  ],
                  borderColor: [
                    'rgba(37,99,235,0)',
                    'rgba(37,99,235,0)',
                    'rgba(37,99,235,0)',
                    'rgba(37,99,235,1)',
                    'rgba(37,99,235,1)',
                  ],
                }}
                transition={{
                  delay: 1.4,
                  duration: 1.0,
                  times: [0, 0.4, 0.6, 0.8, 1],
                }}
                className="relative inline-flex items-center gap-2 px-10 py-3.5 rounded-lg font-semibold shadow-lg border"
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

                {/* Cursor — positioned relative to button */}
                <motion.div
                  initial={{ x: 120, y: -50, opacity: 0 }}
                  animate={{
                    x: [120, 10, 0, 0],
                    y: [-50, -5, 0, 0],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    delay: 0.4,
                    duration: 2.5,
                    times: [0, 0.5, 0.7, 1],
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                >
                  <MousePointer2
                    className="w-6 h-6 text-gray-900"
                    fill="white"
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Click ripple — centered on button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.6, 2.2], opacity: [0, 0.4, 0] }}
                    transition={{ delay: 1.8, duration: 0.7, times: [0, 0.3, 1] }}
                    className="w-32 h-32 rounded-full border-2 border-blue-500"
                  />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    
  )
}

// ===== Scene 8: ERP + vendor sync =====
const SYNC_PILL_CHECK = 3.6

function SceneSync() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-4xl space-y-3">
        {/* Top: Quiet AI pill with spinner → checkmark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <img src={logo} alt="Quiet" className="h-3.5" />
            <span className="text-xs font-medium text-blue-700">
              Quiet AI is closing the loop
            </span>
            <div className="relative w-3 h-3">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: SYNC_PILL_CHECK, duration: 0.2 }}
                className="absolute inset-0"
              >
                <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: SYNC_PILL_CHECK, duration: 0.3 }}
                className="absolute inset-0"
              >
                <Check className="w-3 h-3 text-blue-600" />
              </motion.div>
            </div>
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
              <span className="text-sm font-medium text-gray-700">To: ar@acmecorp.com</span>
            </div>
            <div className="p-3 text-sm space-y-2">
              <div className="font-semibold text-gray-900">
                Payment confirmation — $12,000
              </div>
              <p className="text-gray-700 leading-relaxed">
                Hi there, invoice #2026-0381 has been paid in full via ACH. Funds should arrive within 1 business day.
              </p>
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
              <img src={logo} alt="Quiet" className="h-4" />
              <span className="text-sm font-semibold text-gray-700">ERP synced</span>
            </div>
            <div className="p-3 text-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Bill</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-800">
                  <img src={qboLogo} alt="QBO" className="w-3 h-3" />
                  #2026-0381
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-800">
                  <img src={qboLogo} alt="QBO" className="w-3 h-3" />
                  $12,000.00
                </span>
              </div>
            </div>
          </motion.div>

          {/* Audit trail */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Audit trail</span>
            </div>
            <div className="p-3 space-y-1 text-xs">
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
                  transition={{ delay: 1.8 + i * 0.08, duration: 0.2 }}
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
            Done at machine speed. The slowest part is waiting on human approvals.
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
