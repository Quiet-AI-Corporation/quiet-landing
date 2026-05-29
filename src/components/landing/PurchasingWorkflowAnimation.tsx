import { useEffect } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion'
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
  ScrollText,
  Stamp,
  BookOpen,
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
    id: 'ap',
    label: 'Automated AP',
    caption:
      'Vendor invoice arrives. Quiet verifies the vendor, scans the PDF, matches to the PO and receipt, and codes the bill — hands-free.',
    duration: 8,
  },
  {
    id: 'match',
    label: '3-way match',
    caption:
      'Invoice lines up perfectly with the PO and receipt — no humans needed.',
    duration: 9.5,
  },
  {
    id: 'close',
    label: 'Payment & ERP synced',
    caption:
      'Payment sent. Bill booked in QuickBooks.',
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

// ===== Scene 8: Automated AP =====
const AP_CHECK_ITEMS = [
  'Northwind Mfg: vendor on file, ACH verified',
  'Invoice PDF scanned & parsed',
  'Matched to PO-2026-0042 and receipt IR-0381',
]

const AP_DRAFT_ITEM = 'GL coding applied — bill ready'

const AP_CHECK_START = 1.0
const AP_CHECK_STAGGER = 0.7
const AP_DRAFT_START = AP_CHECK_START + AP_CHECK_ITEMS.length * AP_CHECK_STAGGER // 3.1
const AP_DRAFT_DONE = AP_DRAFT_START + 1.4 // 4.5
const AP_INVOICE_START = AP_DRAFT_DONE + 0.8 // 5.3
const AP_FIELD_STAGGER = 0.12

const AP_LINE_ITEMS = [
  { description: 'SS-304 mounting bracket (250)', amount: '$22,125.00', gl: '6700 — Raw Materials' },
  { description: 'Powder-coat finish, gray (250)', amount: '$1,050.00', gl: '6700 — Raw Materials' },
  { description: 'Custom crating & freight', amount: '$850.00', gl: '6800 — Freight & Shipping' },
]

function SceneAP() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-4xl grid grid-cols-5 gap-4 items-start">
        {/* Left — Invoice email + AI Review checklist */}
        <div className="col-span-2 flex flex-col gap-3">
          {/* Invoice email card */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium text-gray-700">Vendor invoice</span>
              <span className="ml-auto text-[10px] text-gray-500">Mar 9</span>
            </div>
            <div className="p-3 text-xs space-y-2.5">
              <div>
                <span className="text-gray-500">From: </span>
                <span className="text-gray-900 font-medium">sales@northwind.co</span>
              </div>
              <div className="font-semibold text-gray-900">
                Invoice INV-NW-99412 — PO-2026-0042
              </div>
              <p className="text-gray-700 leading-relaxed">
                Please find attached our invoice for the SS-304 mounting bracket order per PO-2026-0042. Net-30 terms apply.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-[10px] text-gray-600">
                  <Paperclip className="w-2.5 h-2.5" />
                  INV-NW-99412.pdf
                </span>
              </div>
            </div>
          </motion.div>

          {/* AI Review checklist */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
            className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">
              <img src={logo} alt="Quiet" className="h-4" />
              Quiet AI Review
            </div>
            <div className="flex flex-col gap-2">
              {AP_CHECK_ITEMS.map((title, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: AP_CHECK_START + i * AP_CHECK_STAGGER,
                    duration: 0.4,
                  }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: AP_CHECK_START + i * AP_CHECK_STAGGER + 0.3,
                      duration: 0.2,
                    }}
                    className="text-green-500 font-bold text-[13px]"
                  >
                    ✓
                  </motion.span>
                  <span className="text-[13px] font-medium text-gray-900">
                    {title}
                  </span>
                </motion.div>
              ))}

              {/* Drafting item — spinner that turns into checkmark */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: AP_DRAFT_START,
                  duration: 0.4,
                }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center relative">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: AP_DRAFT_DONE, duration: 0.15 }}
                    className="absolute"
                  >
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: AP_DRAFT_DONE, duration: 0.15 }}
                    className="text-green-500 font-bold text-[13px]"
                  >
                    ✓
                  </motion.span>
                </span>
                <span className="text-[13px] font-medium text-gray-900">
                  {AP_DRAFT_ITEM}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right — Invoice card + status pill */}
        <div className="col-span-3 flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: AP_INVOICE_START, duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
          >
            {/* Header */}
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: AP_INVOICE_START + 0.1, duration: 0.3 }}
                  className="text-base font-semibold text-gray-900 truncate"
                >
                  INV-NW-99412
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: AP_INVOICE_START + 0.2, duration: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700 flex-shrink-0"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  Northwind Mfg.
                </motion.span>
              </div>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: AP_INVOICE_START + 1.8, duration: 0.3 }}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex-shrink-0"
              >
                Ready to Pay
              </motion.span>
            </div>

            <div className="px-5 py-3 space-y-5">
              {/* Invoice info grid */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: AP_INVOICE_START + AP_FIELD_STAGGER, duration: 0.3 }}
              >
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-xs text-gray-500">Invoice #</div>
                    <div className="text-sm font-semibold text-gray-900">INV-NW-99412</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">PO Ref</div>
                    <div className="text-sm font-semibold text-gray-900">PO-2026-0042</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Due Date</div>
                    <div className="text-sm text-gray-900">Apr 8, 2026</div>
                  </div>
                </div>
              </motion.div>

              {/* Line items */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: AP_INVOICE_START + AP_FIELD_STAGGER * 2, duration: 0.3 }}
              >
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-3 text-xs font-medium text-gray-500">
                    <div className="col-span-9">Line Item</div>
                    <div className="col-span-3 text-right">Amount</div>
                  </div>
                  {AP_LINE_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.description}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: AP_INVOICE_START + AP_FIELD_STAGGER * 3 + i * AP_FIELD_STAGGER, duration: 0.3 }}
                    >
                      <div className="grid grid-cols-12 gap-3 text-sm">
                        <div className="col-span-9 text-gray-900 truncate">{item.description}</div>
                        <div className="col-span-3 text-right font-medium text-gray-900">{item.amount}</div>
                      </div>
                      <div className="pl-3 mt-1 flex items-center gap-1 text-xs">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-600">{item.gl}</span>
                      </div>
                    </motion.div>
                  ))}
                  {/* Total */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: AP_INVOICE_START + AP_FIELD_STAGGER * 6 + 0.2, duration: 0.3 }}
                    className="grid grid-cols-12 gap-3 pt-2 mt-2 border-t border-gray-200"
                  >
                    <div className="col-span-9 text-right text-sm font-medium text-gray-700">Total</div>
                    <div className="col-span-3 text-right text-sm font-semibold text-gray-900">$24,025.00</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: AP_INVOICE_START + 1.8, duration: 0.4 }}
            className="flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
              <img src={logo} alt="Quiet" className="h-3.5" />
              <span className="text-xs font-medium text-blue-700">
                Quiet AI coded bill — ready for 3-way match
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ===== Scene 9: 3-way match =====
type MatchLineItem = { name: string; qty: number; unit: number }
const MATCH_PO_LINES: MatchLineItem[] = [
  { name: 'SS-304 mounting bracket', qty: 250, unit: 88.5 },
  { name: 'Powder-coat finish (gray)', qty: 250, unit: 4.2 },
  { name: 'Custom crating & freight', qty: 1, unit: 850 },
]
const MATCH_PO_TOTAL = MATCH_PO_LINES.reduce((sum, l) => sum + l.qty * l.unit, 0)
const MATCH_PO_ID = 'PO-2026-0042'
const MATCH_INV_ID = 'INV-NW-99412'
const MATCH_GR_ID = 'IR-0381'

const matchCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const MATCH_HL_TIMES = [0, 0.15, 0.85, 1] as const
const MATCH_HL_COLORS = [
  'rgba(191, 219, 254, 0)',
  'rgba(191, 219, 254, 1)',
  'rgba(191, 219, 254, 1)',
  'rgba(191, 219, 254, 0)',
]

function MatchCountUp({
  to,
  delay,
  duration,
  format,
}: {
  to: number
  delay: number
  duration: number
  format: (n: number) => string
}) {
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) => format(Math.round(latest)))

  useEffect(() => {
    const controls = animate(count, to, { delay, duration, ease: 'easeOut' })
    return controls.stop
  }, [count, to, delay, duration])

  return <motion.span>{display}</motion.span>
}

function MatchHealthBar({
  label,
  to,
  max,
  fillDelay,
  fillDuration,
  format,
  fillColor,
}: {
  label: string
  to: number
  max: number
  fillDelay: number
  fillDuration: number
  format: (n: number) => string
  fillColor: string
}) {
  const pct = max === 0 ? 0 : (to / max) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between mb-0.5">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs font-medium text-gray-700 tabular-nums">
          <MatchCountUp to={to} delay={fillDelay} duration={fillDuration} format={format} />
          {' / '}
          {format(max)}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: fillDelay, duration: fillDuration, ease: 'easeOut' }}
          className={`h-full ${fillColor}`}
        />
      </div>
    </div>
  )
}

function MatchHighlightSpan({
  delay,
  duration,
  className,
  children,
}: {
  delay: number
  duration: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.span
      initial={{ backgroundColor: MATCH_HL_COLORS[0] }}
      animate={{ backgroundColor: MATCH_HL_COLORS }}
      transition={{ delay, duration, times: [...MATCH_HL_TIMES] }}
      className={`rounded px-0.5 -mx-0.5 ${className ?? ''}`}
    >
      {children}
    </motion.span>
  )
}

// Timing constants
const M_CARD_DUR = 0.5
const M_INV_START = 0.8
const M_GR_START = 1.2

const M_PO_REF_DELAY = 1.8
const M_PO_REF_DUR = 1.2
const M_INV_MATCHED = 3.0

const M_LINE_HL_DELAY = 3.2
const M_LINE_HL_DUR = 1.0
const M_GR_MATCHED = 4.2

const M_PAY_PRESS = 4.5
const M_PAY_PRESS_DUR = 0.3
const M_INV_STATUS_FLIP = M_PAY_PRESS + M_PAY_PRESS_DUR
const M_PAID_BAR_FILL = M_INV_STATUS_FLIP + 0.05
const M_PAID_BAR_DUR = 0.8

const M_MARK_PRESS = M_PAID_BAR_FILL + M_PAID_BAR_DUR + 0.3 // ~5.95
const M_MARK_PRESS_DUR = 0.3
const M_GR_STATUS_FLIP = M_MARK_PRESS + M_MARK_PRESS_DUR
const M_RECV_BAR_START = M_GR_STATUS_FLIP + 0.05
const M_RECV_BAR_DUR = 0.6
const M_RECV_BAR_GAP = 0.5

const M_FIELD_FADE = 0.35

function SceneMatch() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="flex gap-5 w-full max-w-5xl text-left items-start">
        {/* Left — Purchase Order */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: M_CARD_DUR, ease: 'easeOut' }}
          className="flex-1 min-w-0"
        >
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full">
            {/* Header */}
            <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                Purchase Order{' '}
                <MatchHighlightSpan delay={M_PO_REF_DELAY} duration={M_PO_REF_DUR}>
                  #{MATCH_PO_ID}
                </MatchHighlightSpan>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0">
                <Building2 className="w-3 h-3" />
                Northwind Mfg.
              </span>
            </div>

            {/* Body */}
            <div className="px-4 py-3 space-y-3">
              {/* Total Paid bar */}
              <MatchHealthBar
                label="Total Paid"
                to={MATCH_PO_TOTAL}
                max={MATCH_PO_TOTAL}
                fillDelay={M_PAID_BAR_FILL}
                fillDuration={M_PAID_BAR_DUR}
                format={(n) => matchCurrency.format(n)}
                fillColor="bg-blue-500"
              />

              {/* Line items */}
              <div className="border-t border-gray-100 pt-3 space-y-3">
                <div className="grid grid-cols-12 gap-3 text-xs font-medium text-gray-500">
                  <div className="col-span-5">Line Item</div>
                  <div className="col-span-2 text-right">Qty</div>
                  <div className="col-span-2 text-right">Unit</div>
                  <div className="col-span-3 text-right">Amount</div>
                </div>
                {MATCH_PO_LINES.map((line, idx) => {
                  const isFirst = idx === 0
                  const rowChildren = (
                    <>
                      <div className="col-span-5 text-gray-900 truncate">{line.name}</div>
                      <div className="col-span-2 text-right text-gray-900 tabular-nums">
                        {line.qty}
                      </div>
                      <div className="col-span-2 text-right text-gray-700 tabular-nums">
                        {matchCurrency.format(line.unit)}
                      </div>
                      <div className="col-span-3 text-right font-medium text-gray-900 tabular-nums">
                        {matchCurrency.format(line.qty * line.unit)}
                      </div>
                    </>
                  )
                  return (
                    <div key={line.name} className="space-y-1.5">
                      {isFirst ? (
                        <motion.div
                          initial={{ backgroundColor: MATCH_HL_COLORS[0] }}
                          animate={{ backgroundColor: MATCH_HL_COLORS }}
                          transition={{
                            delay: M_LINE_HL_DELAY,
                            duration: M_LINE_HL_DUR,
                            times: [...MATCH_HL_TIMES],
                          }}
                          className="grid grid-cols-12 gap-3 text-sm rounded -mx-2 px-2 -my-0.5 py-0.5"
                        >
                          {rowChildren}
                        </motion.div>
                      ) : (
                        <div className="grid grid-cols-12 gap-3 text-sm">{rowChildren}</div>
                      )}
                      <MatchHealthBar
                        label="Received"
                        to={line.qty}
                        max={line.qty}
                        fillDelay={M_RECV_BAR_START + idx * M_RECV_BAR_GAP}
                        fillDuration={M_RECV_BAR_DUR}
                        format={(n) => `${n}`}
                        fillColor="bg-blue-500"
                      />
                    </div>
                  )
                })}
              </div>

              {/* Total */}
              <div className="grid grid-cols-12 gap-3 pt-2 border-t border-gray-200">
                <div className="col-span-9 text-right text-sm font-medium text-gray-700">Total</div>
                <div className="col-span-3 text-right text-sm font-semibold text-gray-900 tabular-nums">
                  {matchCurrency.format(MATCH_PO_TOTAL)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Invoice + Goods Receipt */}
        <div className="flex-1 min-w-0 flex flex-col gap-3 overflow-hidden">
          {/* Invoice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: M_INV_START, duration: M_CARD_DUR, ease: 'easeOut' }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  Invoice #{MATCH_INV_ID}
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0">
                  <Building2 className="w-3 h-3" />
                  Northwind Mfg.
                </span>
              </div>
              {/* Status pill */}
              <div className="relative flex-shrink-0 h-5">
                <span className="invisible inline-block px-2.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap">
                  Ready to Pay
                </span>
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: M_INV_STATUS_FLIP, duration: M_FIELD_FADE }}
                  className="absolute right-0 top-0 inline-flex px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full whitespace-nowrap"
                >
                  Ready to Pay
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: M_INV_STATUS_FLIP, duration: M_FIELD_FADE }}
                  className="absolute right-0 top-0 inline-flex px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap"
                >
                  Paid
                </motion.span>
              </div>
            </div>

            <div className="px-4 py-2 space-y-3">
              {/* PO Reference + Due Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">PO Reference</div>
                  <div className="text-sm font-medium text-gray-900">
                    <MatchHighlightSpan delay={M_PO_REF_DELAY} duration={M_PO_REF_DUR}>
                      {MATCH_PO_ID}
                    </MatchHighlightSpan>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Due Date</div>
                  <div className="text-sm text-gray-900">Apr 15, 2026</div>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-1.5">
                <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500">
                  <div className="col-span-5">Line Item</div>
                  <div className="col-span-2 text-right">Qty</div>
                  <div className="col-span-2 text-right">Unit</div>
                  <div className="col-span-3 text-right">Amount</div>
                </div>
                {MATCH_PO_LINES.map((line) => (
                  <div key={line.name} className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-5 text-gray-900 truncate">{line.name}</div>
                    <div className="col-span-2 text-right text-gray-900 tabular-nums">{line.qty}</div>
                    <div className="col-span-2 text-right text-gray-700 tabular-nums">
                      {matchCurrency.format(line.unit)}
                    </div>
                    <div className="col-span-3 text-right font-medium text-gray-900 tabular-nums">
                      {matchCurrency.format(line.qty * line.unit)}
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-12 gap-2 pt-1.5 mt-1 border-t border-gray-200">
                  <div className="col-span-9 text-right text-sm font-medium text-gray-700">Total</div>
                  <div className="col-span-3 text-right text-sm font-semibold text-gray-900 tabular-nums">
                    {matchCurrency.format(MATCH_PO_TOTAL)}
                  </div>
                </div>
              </div>

              {/* Matched + Pay → Paid */}
              <div className="relative h-9">
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: M_INV_MATCHED, duration: M_FIELD_FADE }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs"
                >
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span className="text-blue-600">Matched to {MATCH_PO_ID}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: M_INV_STATUS_FLIP, duration: M_FIELD_FADE }}
                  className="absolute right-0 top-0"
                >
                  <motion.div
                    animate={{ scale: [1, 0.95, 1] }}
                    transition={{
                      delay: M_PAY_PRESS,
                      duration: M_PAY_PRESS_DUR,
                      times: [0, 0.5, 1],
                    }}
                    className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-md shadow-sm"
                  >
                    Pay
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: M_INV_STATUS_FLIP + 0.05, duration: M_FIELD_FADE }}
                  className="absolute right-0 top-0 inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-sm font-medium px-6 py-2 rounded-md"
                >
                  <span className="text-green-600">✓</span>
                  Paid
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Goods Receipt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: M_GR_START, duration: M_CARD_DUR, ease: 'easeOut' }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 truncate">
                  <Package className="w-3.5 h-3.5 text-gray-500" />
                  Goods Receipt #{MATCH_GR_ID}
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0">
                  <Building2 className="w-3 h-3" />
                  Northwind Mfg.
                </span>
              </div>
              {/* Status pill */}
              <div className="relative flex-shrink-0 h-5">
                <span className="invisible inline-block px-2.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap">
                  Pending
                </span>
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: M_GR_STATUS_FLIP, duration: M_FIELD_FADE }}
                  className="absolute right-0 top-0 inline-flex px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full whitespace-nowrap"
                >
                  Pending
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: M_GR_STATUS_FLIP, duration: M_FIELD_FADE }}
                  className="absolute right-0 top-0 inline-flex px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap"
                >
                  Received
                </motion.span>
              </div>
            </div>

            <div className="px-4 py-2 space-y-2.5">
              {/* Line items */}
              <div className="grid grid-cols-12 gap-2 text-sm">
                <div className="col-span-7 text-gray-900">
                  <MatchHighlightSpan delay={M_LINE_HL_DELAY} duration={M_LINE_HL_DUR}>
                    SS-304 mounting bracket
                  </MatchHighlightSpan>
                </div>
                <div className="col-span-2 text-right text-gray-500">Qty</div>
                <div className="col-span-3 text-right font-medium text-gray-900 tabular-nums">250</div>
              </div>
              <div className="grid grid-cols-12 gap-2 text-sm">
                <div className="col-span-7 text-gray-900">Powder-coat finish (gray)</div>
                <div className="col-span-2 text-right text-gray-500">Qty</div>
                <div className="col-span-3 text-right font-medium text-gray-900 tabular-nums">250</div>
              </div>
              <div className="grid grid-cols-12 gap-2 text-sm">
                <div className="col-span-7 text-gray-900">Custom crating &amp; freight</div>
                <div className="col-span-2 text-right text-gray-500">Qty</div>
                <div className="col-span-3 text-right font-medium text-gray-900 tabular-nums">1</div>
              </div>

              {/* Matched + Mark Received → Received */}
              <div className="relative h-9">
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: M_GR_MATCHED, duration: M_FIELD_FADE }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs"
                >
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span className="text-blue-600">Matched to {MATCH_PO_ID}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: M_GR_STATUS_FLIP, duration: M_FIELD_FADE }}
                  className="absolute right-0 top-0"
                >
                  <motion.div
                    animate={{ scale: [1, 0.95, 1] }}
                    transition={{
                      delay: M_MARK_PRESS,
                      duration: M_MARK_PRESS_DUR,
                      times: [0, 0.5, 1],
                    }}
                    className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-md shadow-sm"
                  >
                    Mark Received
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: M_GR_STATUS_FLIP + 0.05, duration: M_FIELD_FADE }}
                  className="absolute right-0 top-0 inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-sm font-medium px-6 py-2 rounded-md"
                >
                  <span className="text-green-600">✓</span>
                  Received
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ===== Scene 10: Payment scheduled + ERP synced =====
function SceneClose() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-4xl space-y-3">
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
                Payment Sent
              </span>
            </div>
            <div className="p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Vendor</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  <Building2 className="w-3 h-3" />
                  Northwind Mfg.
                </span>
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
                  Apr 5
                </span>
              </div>
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
              <BookOpen className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">
                ERP synced
              </span>
            </div>
            <div className="p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">PO</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-800">
                  <img src={qboLogo} alt="QBO" className="w-3 h-3" />
                  2026-0042
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Bill</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-800">
                  <img src={qboLogo} alt="QBO" className="w-3 h-3" />
                  INV-NW-99412
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Payment</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-800">
                  <img src={qboLogo} alt="QBO" className="w-3 h-3" />
                  $24,025.00
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.3 }}
                className="mt-1 flex justify-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                  <img src={logo} alt="Quiet" className="h-3.5" />
                  <span className="text-[10px] font-medium text-blue-700">
                    Quiet AI synced to QuickBooks
                  </span>
                </div>
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
                'Mar 9 · Invoice received & AP processed',
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
          {sceneIndex === 7 && <SceneAP />}
          {sceneIndex === 8 && <SceneMatch />}
          {sceneIndex === 9 && <SceneClose />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PurchasingWorkflowAnimation
