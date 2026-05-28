import { AnimatePresence, motion } from 'framer-motion'
import {
  Paperclip,
  Sparkles,
  Building2,
  Loader2,
  ShieldCheck,
  Send,
  Check,
  CheckCircle2,
  Landmark,
  Mail,
  Clock,
  Package,
  Truck,
  ClipboardCheck,
  Boxes,
  Receipt,
  ScrollText,
  Stamp,
} from 'lucide-react'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import qboLogo from '@/assets/images/qbo_logo.webp'
import logo from '@/assets/images/logo.png'

export interface Scene {
  id: string
  label: string
  caption: string
  duration: number
}

export const SCENES: Scene[] = [
  {
    id: 'quote',
    label: 'Quote arrives',
    caption:
      '8:14 AM — A vendor quote lands in your purchasing inbox.',
    duration: 8,
  },
  {
    id: 'extract',
    label: 'AI extracts quote',
    caption:
      'Quiet pulls vendor, line items, prices, and validity straight from the PDF.',
    duration: 9,
  },
  {
    id: 'po',
    label: 'PO drafted',
    caption:
      'Quote becomes a Purchase Order — GL-coded, department-tagged, ready for review.',
    duration: 9,
  },
  {
    id: 'approve',
    label: 'PO is approved',
    caption:
      'PO total exceeds the purchasing threshold — routed to Maria for approval.',
    duration: 9,
  },
  {
    id: 'send',
    label: 'PO sent to vendor',
    caption:
      'Approval check passes. PO emails out. Vendor acknowledges the order.',
    duration: 7,
  },
  {
    id: 'ship',
    label: 'Vendor ships',
    caption:
      'Shipping notification parsed — tracking number and ETA captured automatically.',
    duration: 7,
  },
  {
    id: 'receive',
    label: 'Items received',
    caption:
      'Packing slip arrives. Receipt is logged and line items match the PO.',
    duration: 6,
  },
  {
    id: 'match',
    label: '3-way match',
    caption:
      'Invoice lines up perfectly with the PO and receipt — no humans needed.',
    duration: 6.5,
  },
  {
    id: 'close',
    label: 'Payment & ERP synced',
    caption:
      'Payment scheduled. Bill booked in QuickBooks. Procure-to-pay loop closed.',
    duration: 5.5,
  },
]

// ===== Scene 1: Quote arrives =====
function SceneQuote() {
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
                <span className="text-xs text-gray-700 truncate">
                  purchasing@yourcompany.com
                </span>
              </div>
            </div>
          </div>

          {/* Inbox list */}
          <div className="p-3 space-y-1.5">
            {[
              { from: 'Slack', subject: 'Weekly digest', time: 'Tue' },
              { from: 'Pied Piper', subject: 'PO #88141 update', time: 'Mon' },
            ].map((m) => (
              <div
                key={m.subject}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-xs text-gray-500"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-transparent flex-shrink-0" />
                <span className="w-28 truncate">{m.from}</span>
                <span className="flex-1 truncate">{m.subject}</span>
                <span>{m.time}</span>
              </div>
            ))}

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
                  sales@northwind.co
                </span>
                <span className="flex-1 truncate text-gray-800">
                  Quote Q-2026-1284 — Stainless brackets, 250 units
                </span>
                <Paperclip className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">8:14 AM</span>
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
                      NW
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          sales@northwind.co
                        </span>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          8:14 AM
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">
                        Quote Q-2026-1284 — Stainless brackets, 250 units
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        Hi! Per your RFQ — attached is our quote for 250 SS-304
                        mounting brackets plus crating. Pricing valid 30 days. Lead
                        time 7 business days from PO.
                      </p>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>Quote_Q-2026-1284.pdf</span>
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
              Quote detected. Quiet AI is on it
            </span>
            <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Scene 2: AI extracts quote =====
const QUOTE_FIELDS = [
  { label: 'Vendor', value: 'Northwind Mfg.', delay: 1.0 },
  { label: 'Quote #', value: 'Q-2026-1284', delay: 1.5 },
  { label: 'Valid until', value: 'Mar 28, 2026', delay: 2.0 },
  { label: 'Lead time', value: '7 business days', delay: 2.5 },
]
const QUOTE_LINES = [
  {
    description: 'SS-304 mounting bracket',
    qty: '250',
    unit: '$88.50',
    amount: '$22,125.00',
    delay: 3.2,
  },
  {
    description: 'Powder-coat finish (gray)',
    qty: '250',
    unit: '$4.20',
    amount: '$1,050.00',
    delay: 3.7,
  },
  {
    description: 'Custom crating & freight',
    qty: '1',
    unit: '$850.00',
    amount: '$850.00',
    delay: 4.2,
  },
]

function SceneExtract() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-5 px-6 py-2">
      <div className="w-full flex items-stretch gap-5">
      {/* Left — Quote PDF being scanned */}
      <div className="flex-1 min-w-0 flex items-center justify-center">
        <div className="relative w-full max-w-xs aspect-[8.5/11] bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              NORTHWIND MFG.
            </div>
            <div className="text-[8px] text-gray-400">
              4400 Industrial Pkwy, Akron OH
            </div>
            <div className="h-px bg-gray-100 my-2" />
            <div className="text-xs font-bold text-gray-900">
              Quote Q-2026-1284
            </div>
            <div className="space-y-0.5">
              <div className="text-[8px] text-gray-400">
                Issued: Feb 26, 2026
              </div>
              <div className="text-[8px] text-gray-400">
                Valid: 30 days · Lead time 7 bus. days
              </div>
            </div>
            <div className="h-px bg-gray-100 my-2" />
            <div className="space-y-1">
              <div className="text-[8px] text-gray-700">
                SS-304 mounting bracket · 250
              </div>
              <div className="text-[8px] text-gray-400">
                @ $88.50 = $22,125.00
              </div>
              <div className="text-[8px] text-gray-700">
                Powder-coat finish (gray) · 250
              </div>
              <div className="text-[8px] text-gray-400">
                @ $4.20 = $1,050.00
              </div>
              <div className="text-[8px] text-gray-700">
                Custom crating & freight
              </div>
              <div className="text-[8px] text-gray-400">$850.00</div>
            </div>
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex justify-between text-[8px] font-bold text-gray-900">
              <span>TOTAL</span>
              <span>$24,025.00</span>
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

          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-gray-900 text-white text-[8px] font-medium rounded">
            QUOTE · PDF
          </div>
        </div>
      </div>

      {/* Right — Structured quote card */}
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
              Extracting quote
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
              {QUOTE_FIELDS.map((f) => (
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
              <div className="text-xs text-gray-500 mb-1 mt-1">
                Line items
              </div>
              <div className="grid grid-cols-12 gap-2 text-[10px] font-medium text-gray-400 px-1 pb-1">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-right">Qty</div>
                <div className="col-span-2 text-right">Unit</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              <div className="space-y-1">
                {QUOTE_LINES.map((l) => (
                  <motion.div
                    key={l.description}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: l.delay, duration: 0.3 }}
                    className="grid grid-cols-12 gap-2 text-xs items-center px-1 py-0.5"
                  >
                    <span className="col-span-6 text-gray-800 truncate flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-600 flex-shrink-0" />
                      {l.description}
                    </span>
                    <span className="col-span-2 text-right text-gray-700">
                      {l.qty}
                    </span>
                    <span className="col-span-2 text-right text-gray-500">
                      {l.unit}
                    </span>
                    <span className="col-span-2 text-right font-medium text-gray-900">
                      {l.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.8, duration: 0.3 }}
                className="flex items-center justify-between text-sm font-semibold border-t border-gray-200 pt-1.5 mt-1.5"
              >
                <span className="text-gray-700">Quote total</span>
                <span className="text-gray-900">$24,025.00</span>
              </motion.div>
            </div>

            {/* Quiet AI pill */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.8, duration: 0.4 }}
              className="flex items-center justify-center gap-2 pt-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                <img src={logo} alt="Quiet" className="h-3.5" />
                <span className="text-xs font-medium text-blue-700">
                  Quiet AI is ready to draft a Purchase Order
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

// ===== Scene 3: PO drafted from quote =====

// Timing: rule flash → line item names flash → GL populates → unhighlight → next
// Phase 1: Raw materials GL
const RULE1_FLASH = 0.6
const LINE1_FLASH = RULE1_FLASH + 0.6   // 1.2 — line item descriptions highlight
const GL1_ASSIGN = LINE1_FLASH + 0.6    // 1.8 — GL values populate
// Phase 2: Freight GL
const RULE2_FLASH = GL1_ASSIGN + 0.8    // 2.6
const LINE2_FLASH = RULE2_FLASH + 0.6   // 3.2
const GL2_ASSIGN = LINE2_FLASH + 0.6    // 3.8
// Phase 3: Department
const RULE3_FLASH = GL2_ASSIGN + 0.8    // 4.6
const DEPT_LINE_FLASH = RULE3_FLASH + 0.6 // 5.2
const DEPT_ASSIGN = DEPT_LINE_FLASH + 0.6 // 5.8
// Wrap-up
const PO_TOTAL_DELAY = DEPT_ASSIGN + 0.5 // 6.3
const PO_PILL_DELAY = PO_TOTAL_DELAY + 0.5 // 6.8

const flashBgPO = (delay: number, duration = 1.6) => ({
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
    times: [0, 0.08, 0.75, 1],
    ease: 'easeInOut' as const,
  },
})

const PO_LINES = [
  {
    description: 'SS-304 mounting bracket · 250 × $88.50',
    gl: '1300 — Raw Materials',
    dept: 'Production',
    amount: '$22,125.00',
    lineFlashDelay: LINE1_FLASH,
    glDelay: GL1_ASSIGN,
    deptLineFlash: DEPT_LINE_FLASH,
    deptDelay: DEPT_ASSIGN,
    ruleGroup: 'mat' as const,
  },
  {
    description: 'Powder-coat finish (gray) · 250 × $4.20',
    gl: '1300 — Raw Materials',
    dept: 'Production',
    amount: '$1,050.00',
    lineFlashDelay: LINE1_FLASH,
    glDelay: GL1_ASSIGN + 0.15,
    deptLineFlash: DEPT_LINE_FLASH,
    deptDelay: DEPT_ASSIGN + 0.15,
    ruleGroup: 'mat' as const,
  },
  {
    description: 'Custom crating & freight',
    gl: '6700 — Freight In',
    dept: 'Operations',
    amount: '$850.00',
    lineFlashDelay: LINE2_FLASH,
    glDelay: GL2_ASSIGN,
    deptLineFlash: DEPT_LINE_FLASH,
    deptDelay: DEPT_ASSIGN + 0.3,
    ruleGroup: 'freight' as const,
  },
]

function ScenePO() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full flex items-stretch gap-4">
      {/* Left — Source quote + Coding rules */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-60 flex-shrink-0 flex flex-col gap-2"
      >
        {/* Card 1 — Source */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
          <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Source
          </div>
          <div className="flex items-center gap-1.5">
            <ScrollText className="w-3 h-3 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">Q-2026-1284</span>
          </div>
          <div className="pl-4 mt-1.5 space-y-1">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-gray-500">From:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full font-medium text-gray-700">
                <Building2 className="w-3 h-3" />
                Northwind Mfg.
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 text-xs">
              <span className="text-gray-500">Total:</span>
              <span className="text-sm font-semibold text-gray-900">$24,025.00</span>
            </div>
            <div className="flex items-baseline gap-1.5 text-xs">
              <span className="text-gray-500">Line items:</span>
              <span className="text-gray-900">3</span>
            </div>
          </div>
        </div>

        {/* Card 2 — Coding Rules */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
          <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Your coding rules
          </div>

          <div className="space-y-1 text-xs">
            {(() => {
              const flash = flashBgPO(RULE1_FLASH)
              return (
                <motion.div
                  initial={flash.initial}
                  animate={flash.animate}
                  transition={flash.transition}
                  className="rounded-md p-1.5 -mx-1"
                >
                  <p className="text-gray-700">
                    Raw material items should be coded to{' '}
                    <span className="font-semibold text-blue-700">1300 — Raw Materials</span>
                  </p>
                </motion.div>
              )
            })()}

            {(() => {
              const flash = flashBgPO(RULE2_FLASH)
              return (
                <motion.div
                  initial={flash.initial}
                  animate={flash.animate}
                  transition={flash.transition}
                  className="rounded-md p-1.5 -mx-1"
                >
                  <p className="text-gray-700">
                    Freight charges should be coded to{' '}
                    <span className="font-semibold text-blue-700">6700 — Freight In</span>
                  </p>
                </motion.div>
              )
            })()}

            {(() => {
              const flash = flashBgPO(RULE3_FLASH)
              return (
                <motion.div
                  initial={flash.initial}
                  animate={flash.animate}
                  transition={flash.transition}
                  className="rounded-md p-1.5 -mx-1"
                >
                  <p className="text-gray-700">
                    Manufacturing materials belong to{' '}
                    <span className="font-semibold text-blue-700">Production</span> dept.
                    Everything else to{' '}
                    <span className="font-semibold text-blue-700">Operations</span>.
                  </p>
                </motion.div>
              )
            })()}
          </div>
        </div>
      </motion.div>

      {/* Right — Generated PO */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 min-w-0"
      >
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm h-full flex flex-col">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ScrollText className="w-4 h-4 text-gray-500" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-sm font-semibold text-gray-900"
              >
                Purchase Order PO-2026-0042
              </motion.div>
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
              >
                <Building2 className="w-3 h-3" />
                Northwind Mfg.
              </motion.span>
            </div>
            <div className="relative w-3.5 h-3.5">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: PO_PILL_DELAY, duration: 0.2 }}
                className="absolute inset-0"
              >
                <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: PO_PILL_DELAY, duration: 0.3 }}
                className="absolute inset-0"
              >
                <Check className="w-3.5 h-3.5 text-blue-600" />
              </motion.div>
            </div>
          </div>

          <div className="p-3 space-y-2">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
              <div className="col-span-4">Line item</div>
              <div className="col-span-3">GL Account</div>
              <div className="col-span-2">Dept</div>
              <div className="col-span-3 text-right">Amount</div>
            </div>
            {PO_LINES.map((l) => {
              const lineFlash = flashBgPO(l.lineFlashDelay, 1.2)
              const deptCellFlash = flashBgPO(l.deptLineFlash, 1.2)
              return (
                <div
                  key={l.description}
                  className="grid grid-cols-12 gap-2 items-center px-1 py-0.5 rounded"
                >
                  {/* Description — flashes when rule highlights the line items */}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: PO_TOTAL_DELAY, duration: 0.3 }}
              className="grid grid-cols-12 gap-2 pt-2 border-t border-gray-200 px-1"
            >
              <div className="col-span-9 text-right text-sm font-medium text-gray-700">
                PO total
              </div>
              <div className="col-span-3 text-right text-sm font-semibold text-gray-900">
                $24,025.00
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PO_PILL_DELAY, duration: 0.4 }}
              className="flex items-center justify-center gap-2 pt-0.5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                <img src={logo} alt="Quiet" className="h-3.5" />
                <span className="text-xs font-medium text-blue-700">
                  Quiet AI will send this PO for approvals
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

// Shared email card for the approval scene
function ApprovalEmailCard({
  delay,
  direction,
  variant,
  icon,
  title,
  badge,
  addressLabel,
  address,
  subject,
  body,
  footer,
}: {
  delay: number
  direction: 'left' | 'right'
  variant: 'outgoing' | 'incoming'
  icon: React.ReactNode
  title: string
  badge: React.ReactNode
  addressLabel: string
  address: string
  subject: string
  body: string
  footer?: React.ReactNode
}) {
  const isIncoming = variant === 'incoming'
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -10 : 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`bg-white border ${isIncoming ? 'border-blue-200' : 'border-gray-200'} rounded-xl overflow-hidden shadow-sm`}
    >
      <div className={`${isIncoming ? 'bg-blue-50' : 'bg-gray-100'} px-3 h-8 flex items-center gap-2`}>
        {icon}
        <span className={`text-xs font-medium ${isIncoming ? 'text-blue-800' : 'text-gray-700'}`}>
          {title}
        </span>
        {badge}
      </div>
      <div className="p-3 text-xs space-y-2.5">
        <div>
          <span className="text-gray-500">{addressLabel}: </span>
          <span className="text-gray-900 font-medium">{address}</span>
        </div>
        <div className="font-semibold text-gray-900">{subject}</div>
        <p className="text-gray-700 leading-relaxed">{body}</p>
        {footer}
      </div>
    </motion.div>
  )
}

// ===== Scene 4: PO is approved =====
function SceneApproval() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        {/* Top: PO approval rules card */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
        >
          <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            PO approval rules
          </div>
          <p className="text-xs text-gray-700">
            PO total{' '}
            <span className="font-semibold text-gray-900">$24,025</span> exceeds
            the{' '}
            <span className="font-semibold text-gray-900">$10,000</span>{' '}
            purchasing threshold — routing to{' '}
            <span className="font-semibold text-blue-700">
              maria@yourcompany.com
            </span>
          </p>
        </motion.div>

        {/* Email exchange */}
        <div className="grid grid-cols-2 gap-3">
          <ApprovalEmailCard
            delay={2.2}
            direction="left"
            variant="outgoing"
            icon={<Send className="w-3.5 h-3.5 text-gray-500" />}
            title="Approval Request"
            badge={
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.0, duration: 0.3 }}
                className="ml-auto px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full"
              >
                Sent
              </motion.span>
            }
            addressLabel="To"
            address="maria@yourcompany.com"
            subject="PO-2026-0042 — Approval required, $24,025"
            body="Hi Maria — PO #2026-0042 for $24,025 from Northwind Supply exceeds the $10k threshold and requires your approval before we can send it to the vendor."
            footer={
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-[10px] text-gray-600">
                  <Paperclip className="w-2.5 h-2.5" />
                  PO-2026-0042.pdf
                </span>
              </div>
            }
          />
          <ApprovalEmailCard
            delay={4.0}
            direction="right"
            variant="incoming"
            icon={<Mail className="w-3.5 h-3.5 text-blue-600" />}
            title="Approver reply"
            badge={
              <span className="ml-auto text-[10px] text-blue-600">1 min</span>
            }
            addressLabel="From"
            address="maria@yourcompany.com"
            subject="Re: PO-2026-0042 — Approved"
            body="Approved. Go ahead and send to the vendor."
            footer={
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4.8, duration: 0.3 }}
                className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-100 rounded-md"
              >
                <img src={logo} alt="Quiet" className="h-3" />
                <span className="text-[10px] font-medium text-blue-800">
                  Quiet AI noted Maria's approval
                </span>
              </motion.div>
            }
          />
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
              PO internally approved. Routing to vendor for authorization
            </span>
            <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Scene 5: PO sent to vendor =====
function SceneSend() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        {/* Email exchange */}
        <div className="grid grid-cols-2 gap-3">
          {/* Outgoing PO email */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="bg-gray-100 px-3 h-8 flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium text-gray-700">
                Outgoing PO
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.3 }}
                className="ml-auto px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full"
              >
                Sent
              </motion.span>
            </div>
            <div className="p-3 text-xs space-y-2.5">
              <div>
                <span className="text-gray-500">To: </span>
                <span className="text-gray-900 font-medium">
                  sales@northwind.co
                </span>
              </div>
              <div className="font-semibold text-gray-900">
                PO-2026-0042 — Confirming order, $24,025
              </div>
              <p className="text-gray-700 leading-relaxed">
                Hi team — please find PO #2026-0042 attached. Ship to our
                Akron-3 dock, attn. Receiving. Confirm ETA at your earliest.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-[10px] text-gray-600">
                  <Paperclip className="w-2.5 h-2.5" />
                  PO-2026-0042.pdf
                </span>
              </div>
            </div>
          </motion.div>

          {/* Vendor acknowledgement */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.4 }}
            className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="bg-blue-50 px-3 h-8 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">
                Vendor reply
              </span>
              <span className="ml-auto text-[10px] text-blue-600">14 min</span>
            </div>
            <div className="p-3 text-xs space-y-2.5">
              <div>
                <span className="text-gray-500">From: </span>
                <span className="text-gray-900 font-medium">
                  sales@northwind.co
                </span>
              </div>
              <div className="font-semibold text-gray-900">
                Re: PO-2026-0042 — Order acknowledged
              </div>
              <p className="text-gray-700 leading-relaxed">
                Order received. Expected ship date Mar 6. Tracking to follow.
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.0, duration: 0.3 }}
                className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-100 rounded-md"
              >
                <img src={logo} alt="Quiet" className="h-3" />
                <span className="text-[10px] font-medium text-blue-800">
                  Quiet AI noted order acknowledgement
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.4 }}
          className="flex items-center justify-center gap-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <img src={logo} alt="Quiet" className="h-3.5" />
            <span className="text-xs font-medium text-blue-700">
              Quiet AI confirmed open PO #2026-0042
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Scene 6: Vendor ships =====
function SceneShip() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-5 gap-4 items-stretch">
          {/* Left — Shipping notification email */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium text-gray-700">
                Shipping notification
              </span>
              <span className="ml-auto text-[10px] text-gray-500">Mar 6</span>
            </div>
            <div className="p-3 text-xs space-y-2.5">
              <div>
                <span className="text-gray-500">From: </span>
                <span className="text-gray-900 font-medium">
                  sales@northwind.co
                </span>
              </div>
              <div className="font-semibold text-gray-900">
                Your order has shipped
              </div>
              <p className="text-gray-700 leading-relaxed">
                250 units of the SS-304 mounting brackets on PO-2026-0042 have
                shipped via FedEx Freight. Attached is a shipping confirmation
                document.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-[10px] text-gray-600">
                  <Paperclip className="w-2.5 h-2.5" />
                  ShipConfirm-558129.pdf
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.3 }}
                className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-100 rounded-md"
              >
                <img src={logo} alt="Quiet" className="h-3" />
                <span className="text-[10px] font-medium text-blue-800">
                  Quiet parsed: tracking + ETA captured
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — In-transit visual */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="col-span-2 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col"
          >
            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Shipment in transit
            </div>
            <div className="text-[10px] text-gray-500 mb-3">
              Tracking: <span className="text-blue-600 underline">7831 4429 0188</span>
            </div>

            {/* Route */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                <span>Northwind</span>
                <span>Akron-3 dock</span>
              </div>
              <div className="relative h-6">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: ['0%', '70%'] }}
                    transition={{ delay: 1.2, duration: 2.4, ease: 'easeOut' }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  />
                </div>
                {/* Truck icon riding the route */}
                <motion.div
                  initial={{ left: '0%' }}
                  animate={{ left: ['0%', '66%'] }}
                  transition={{ delay: 1.2, duration: 2.4, ease: 'easeOut' }}
                  className="absolute top-1/2 -translate-y-1/2"
                >
                  <div className="w-6 h-6 rounded-full bg-white border border-blue-200 shadow flex items-center justify-center">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                </motion.div>
              </div>

              {/* Status chips */}
              <div className="mt-4 space-y-1.5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.3 }}
                  className="flex items-center gap-2 text-[11px] text-gray-700"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Picked up · Mar 6 11:42 AM
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.3 }}
                  className="flex items-center gap-2 text-[11px] text-gray-700"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  In transit · ETA Mar 7 EOD
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.4 }}
              className="mt-3 flex items-center gap-1.5 px-2 py-1 bg-amber-50 border border-amber-100 rounded-md"
            >
              <Clock className="w-3 h-3 text-amber-700" />
              <span className="text-[10px] font-medium text-amber-800">
                Waiting on receiving dock
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.4 }}
          className="mt-4 flex items-center justify-center gap-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <img src={logo} alt="Quiet" className="h-3.5" />
            <span className="text-xs font-medium text-blue-700">
              Quiet AI will begin matching when a receipt is provided
            </span>
            <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Scene 7: Items received =====
const RECEIPT_LINES = [
  {
    description: 'SS-304 mounting bracket',
    ordered: 250,
    received: 250,
    delay: 2.0,
  },
  {
    description: 'Powder-coat finish (gray)',
    ordered: 250,
    received: 250,
    delay: 2.6,
  },
  {
    description: 'Crating & freight',
    ordered: 1,
    received: 1,
    delay: 3.2,
  },
]

function SceneReceive() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-4xl grid grid-cols-5 gap-4">
        {/* Left — packing slip / dock photo card */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col"
        >
          <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
            <Boxes className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-semibold text-gray-700">
              Akron-3 receiving dock
            </span>
            <span className="ml-auto text-[10px] text-gray-500">Mar 7</span>
          </div>

          {/* Stylized packing slip */}
          <div className="p-4 flex-1 flex items-center justify-center">
            <div className="relative w-44 aspect-[8.5/11] bg-white rounded-md border border-gray-200 shadow-md overflow-hidden">
              <div className="p-3 space-y-1.5">
                <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                  Packing slip
                </div>
                <div className="text-[10px] font-bold text-gray-900">
                  PS-558129
                </div>
                <div className="text-[8px] text-gray-400">
                  Ref PO-2026-0042
                </div>
                <div className="h-px bg-gray-100 my-1" />
                <div className="space-y-0.5">
                  <div className="text-[8px] text-gray-700">
                    Brackets SS-304 · 250
                  </div>
                  <div className="text-[8px] text-gray-700">
                    Powder coat · 250
                  </div>
                  <div className="text-[8px] text-gray-700">Crate · 1</div>
                </div>
                <div className="h-px bg-gray-100 my-1" />
                <div className="text-[8px] text-gray-500">
                  Carrier: FedEx Freight
                </div>
                <div className="text-[8px] text-gray-500">
                  Received by: J. Patel
                </div>
              </div>

              {/* Stamp */}
              <motion.div
                initial={{ opacity: 0, scale: 1.4, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{
                  delay: 1.2,
                  duration: 0.4,
                  ease: 'backOut',
                }}
                className="absolute bottom-3 right-2 inline-flex items-center gap-1 px-1.5 py-0.5 border-2 border-gray-400 rounded text-[8px] font-bold text-gray-600 tracking-wider"
              >
                <Stamp className="w-2.5 h-2.5" />
                RECEIVED
              </motion.div>
            </div>
          </div>

          <div className="px-3 pb-3">
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-100 rounded-full"
            >
              <img src={logo} alt="Quiet" className="h-3" />
              <span className="text-[10px] font-medium text-blue-700">
                Quiet AI matched receipt to PO-2026-0042
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right — Item receipt panel */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col"
        >
          <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-900">
              Item receipt IR-0381
            </span>
            <span className="text-xs text-gray-500">for</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
              <ScrollText className="w-3 h-3" />
              PO-2026-0042
            </span>
            <div className="relative w-3.5 h-3.5 ml-auto">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 4.0, duration: 0.2 }}
                className="absolute inset-0"
              >
                <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4.0, duration: 0.3 }}
                className="absolute inset-0"
              >
                <Check className="w-3.5 h-3.5 text-blue-600" />
              </motion.div>
            </div>
          </div>

          <div className="p-4 flex-1 space-y-2">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
              <div className="col-span-7">Line</div>
              <div className="col-span-2 text-right">Ordered</div>
              <div className="col-span-2 text-right">Received</div>
              <div className="col-span-1" />
            </div>
            {RECEIPT_LINES.map((l) => (
              <motion.div
                key={l.description}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: l.delay, duration: 0.3 }}
                className="grid grid-cols-12 gap-2 text-sm items-center px-1 py-1 rounded"
              >
                <div className="col-span-7 text-gray-900 truncate">
                  {l.description}
                </div>
                <div className="col-span-2 text-right text-gray-700">
                  {l.ordered}
                </div>
                <div className="col-span-2 text-right font-medium text-gray-900">
                  {l.received}
                </div>
                <div className="col-span-1 flex justify-end">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: l.delay + 0.1,
                      duration: 0.25,
                      ease: 'backOut',
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </motion.div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.0, duration: 0.4 }}
              className="pt-2 flex justify-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                <img src={logo} alt="Quiet" className="h-3.5" />
                <span className="text-xs font-medium text-blue-700">
                  Quiet AI logged receipt. Awaiting vendor invoice.
                </span>
                <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Scene 8: 3-way match =====
const MATCH_LINES = [
  {
    description: 'SS-304 mounting bracket',
    po: '250 × $88.50',
    received: '250',
    invoice: '$22,125.00',
  },
  {
    description: 'Powder-coat finish (gray)',
    po: '250 × $4.20',
    received: '250',
    invoice: '$1,050.00',
  },
  {
    description: 'Custom crating & freight',
    po: '1 × $850.00',
    received: '1',
    invoice: '$850.00',
  },
]

function SceneMatch() {
  // Timing
  const T_INVOICE_IN = 0.4
  const T_HEADERS = 1.0
  const T_LINES_START = 1.4
  const T_LINES_GAP = 0.5
  const T_VERDICT = T_LINES_START + MATCH_LINES.length * T_LINES_GAP + 0.4 // ~3.3

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-5xl space-y-3">
        {/* Top banner: invoice arrived */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: T_INVOICE_IN, duration: 0.4 }}
          className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm"
        >
          <Mail className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-700">
            Vendor invoice{' '}
            <span className="font-semibold text-gray-900">INV-NW-99412</span>{' '}
            from{' '}
            <span className="font-semibold text-gray-900">Northwind Mfg.</span>{' '}
            — running 3-way match against PO and receipt
          </span>
          <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin ml-auto" />
        </motion.div>

        {/* Match table: 3 columns of evidence */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {/* Column headers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: T_HEADERS, duration: 0.3 }}
            className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500"
          >
            <div className="col-span-4">Line</div>
            <div className="col-span-2 flex items-center gap-1">
              <ScrollText className="w-3 h-3" />
              PO
            </div>
            <div className="col-span-2 flex items-center gap-1">
              <ClipboardCheck className="w-3 h-3" />
              Receipt
            </div>
            <div className="col-span-3 flex items-center gap-1">
              <Receipt className="w-3 h-3" />
              Invoice
            </div>
            <div className="col-span-1 text-right">Match</div>
          </motion.div>

          {/* Match rows */}
          <div className="divide-y divide-gray-100">
            {MATCH_LINES.map((l, i) => {
              const rowDelay = T_LINES_START + i * T_LINES_GAP
              return (
                <motion.div
                  key={l.description}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: rowDelay, duration: 0.3 }}
                  className="grid grid-cols-12 gap-2 items-center px-4 py-2.5 text-sm"
                >
                  <div className="col-span-4 text-gray-900 truncate">
                    {l.description}
                  </div>
                  <div className="col-span-2 text-gray-700">{l.po}</div>
                  <div className="col-span-2 text-gray-700">{l.received}</div>
                  <div className="col-span-3 text-gray-700">{l.invoice}</div>
                  <div className="col-span-1 flex justify-end">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: rowDelay + 0.2,
                        duration: 0.3,
                        ease: 'backOut',
                      }}
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Total row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: T_VERDICT - 0.4, duration: 0.3 }}
            className="grid grid-cols-12 gap-2 items-center px-4 py-2 bg-gray-50 border-t border-gray-100 text-sm font-medium"
          >
            <div className="col-span-4 text-gray-700">Totals</div>
            <div className="col-span-2 text-gray-900">$24,025.00</div>
            <div className="col-span-2 text-gray-900">501 / 501</div>
            <div className="col-span-3 text-gray-900">$24,025.00</div>
            <div className="col-span-1" />
          </motion.div>
        </div>

        {/* Verdict + auto-approval */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: T_VERDICT, duration: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="px-4 py-2.5 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-700 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-green-900">
                3-way match passed
              </div>
              <div className="text-xs text-green-800">
                PO, receipt and invoice all agree to the penny.
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: T_VERDICT + 0.3, duration: 0.4 }}
            className="px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-blue-700 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-blue-900">
                Auto-approved for payment
              </div>
              <div className="text-xs text-blue-800">
                Matches policy — no human touch required.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Scene 9: Payment scheduled + ERP synced =====
function SceneClose() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-4xl space-y-3">
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
              Procure-to-pay loop closed
            </span>
          </div>
        </motion.div>

        {/* Three result cards */}
        <div className="grid grid-cols-3 gap-3">
          {/* Payment scheduled */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
              <Landmark className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">
                Payment scheduled
              </span>
            </div>
            <div className="p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Vendor</span>
                <span className="font-medium text-gray-900">Northwind</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Method</span>
                <span className="font-medium text-gray-900">ACH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium text-gray-900">$24,025.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Send date</span>
                <span className="font-medium text-gray-900">
                  Apr 5 · net 30
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.3 }}
                className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded-full"
              >
                <Clock className="w-2.5 h-2.5" /> Queued · 29 days
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
              <span className="text-xs font-semibold text-gray-700">
                ERP synced
              </span>
            </div>
            <div className="p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">PO</span>
                <span className="font-medium text-gray-900">2026-0042</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Bill</span>
                <span className="font-medium text-gray-900">INV-NW-99412</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">GL</span>
                <span className="font-medium text-gray-900">1300 / 6700</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-gray-900">Open · queued</span>
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

          {/* Audit trail */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">
                Audit trail
              </span>
            </div>
            <div className="p-3 space-y-1 text-[10px]">
              {[
                'Feb 26 · Quote received',
                'Feb 26 · Quote parsed',
                'Feb 26 · PO drafted',
                'Feb 26 · Maria approved',
                'Feb 26 · PO sent to vendor',
                'Mar 6 · Shipment parsed',
                'Mar 7 · Items received',
                'Mar 9 · Invoice 3-way matched',
                'Mar 9 · Booked + payment scheduled',
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
          transition={{ delay: 4.0, duration: 0.5 }}
          className="flex items-center justify-center gap-2 text-sm text-gray-700 pt-2"
        >
          <Package className="w-4 h-4 text-gray-400" />
          <span>
            Quote to booked bill in{' '}
            <span className="font-semibold text-gray-900">11 days</span> —{' '}
            <span className="font-semibold text-gray-900">one click</span> from
            your team, the rest from Quiet.
          </span>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Main exported component =====
function PurchasingWorkflowAnimation({ sceneIndex }: { sceneIndex: number }) {
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
          {sceneIndex === 0 && <SceneQuote />}
          {sceneIndex === 1 && <SceneExtract />}
          {sceneIndex === 2 && <ScenePO />}
          {sceneIndex === 3 && <SceneApproval />}
          {sceneIndex === 4 && <SceneSend />}
          {sceneIndex === 5 && <SceneShip />}
          {sceneIndex === 6 && <SceneReceive />}
          {sceneIndex === 7 && <SceneMatch />}
          {sceneIndex === 8 && <SceneClose />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PurchasingWorkflowAnimation
