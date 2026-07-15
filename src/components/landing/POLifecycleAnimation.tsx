import { AnimatePresence, motion } from 'framer-motion'
import {
  Paperclip,
  Sparkles,
  Loader2,
  ShieldCheck,
  Send,
  CheckCircle2,
  MousePointer2,
  Mail,
  Clock,
  FileText,
  Check,
  ScrollText,
  BookOpen,
} from 'lucide-react'
import slackLogo from '@/assets/images/slack_logo.png'
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
    id: 'slack',
    label: 'Slack request',
    caption: '9:14 AM · A teammate drops a supplier quote in Slack and asks for a PO.',
    duration: 9,
  },
  {
    id: 'draft',
    label: 'Draft PO',
    caption: 'Quiet AI turns the quote into a draft purchase order, GL coded and ready for review.',
    duration: 10,
  },
  {
    id: 'approve',
    label: 'Manager approval',
    caption: 'The PO routes to the right manager. One click in Slack to approve.',
    duration: 9,
  },
  {
    id: 'send',
    label: 'Sent to vendor',
    caption: 'The approved PO emails out to the vendor with a request to authorize.',
    duration: 8,
  },
  {
    id: 'sync',
    label: 'Authorized & synced',
    caption: 'Vendor authorizes the order. Quiet AI posts the open PO to your ERP.',
    duration: 9.5,
  },
]

// ===== Shared Slack window chrome =====
function SlackWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
      {/* Title bar */}
      <div className="bg-[#3F0E40] px-3 py-2 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <img src={slackLogo} alt="Slack" className="h-3.5 w-3.5 object-contain" />
          <span className="text-xs font-medium text-white/90"># purchasing</span>
        </div>
      </div>
      {/* Message pane */}
      <div className="flex">
        {/* Sidebar strip */}
        <div className="w-10 bg-[#3F0E40]/95 py-3 px-2 space-y-2 hidden sm:block">
          <div className="h-1.5 w-full rounded-full bg-white/20" />
          <div className="h-1.5 w-full rounded-full bg-white/10" />
          <div className="h-1.5 w-4 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 p-4 space-y-3">{children}</div>
      </div>
    </div>
  )
}

function SlackMessage({
  avatar,
  name,
  time,
  isBot,
  children,
}: {
  avatar: React.ReactNode
  name: string
  time: string
  isBot?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-8 h-8 rounded-md flex-shrink-0 overflow-hidden">{avatar}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-gray-900">{name}</span>
          {isBot && (
            <span className="text-[9px] font-semibold bg-gray-100 text-gray-500 rounded px-1 py-px uppercase">
              App
            </span>
          )}
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <div className="text-sm text-gray-800 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

const quietAvatar = (
  <div className="w-full h-full bg-blue-50 border border-blue-100 rounded-md flex items-center justify-center">
    <img src={logo} alt="Quiet AI" className="h-4" />
  </div>
)

// Quiet AI status pill with optional spinner → check swap
function StatusPill({
  delay,
  text,
  checkDelay,
}: {
  delay: number
  text: string
  checkDelay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-center justify-center"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
        <img src={logo} alt="Quiet" className="h-3.5" />
        <span className="text-xs font-medium text-blue-700">{text}</span>
        {checkDelay !== undefined ? (
          <div className="relative w-3 h-3">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: checkDelay, duration: 0.2 }}
              className="absolute inset-0"
            >
              <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: checkDelay, duration: 0.3 }}
              className="absolute inset-0"
            >
              <Check className="w-3 h-3 text-blue-600" />
            </motion.div>
          </div>
        ) : (
          <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
        )}
      </div>
    </motion.div>
  )
}

// ===== Scene 1: Slack request =====
const S1_MSG = 1.0
const S1_ATTACH = S1_MSG + 0.6
const S1_BOT = S1_ATTACH + 1.6
const S1_SCAN = S1_BOT + 1.0
const S1_DONE = S1_SCAN + 2.2
const S1_PILL = S1_DONE + 0.6

function SceneSlackRequest() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-2xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <SlackWindow>
            {/* Placeholder prior message */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-md bg-gray-200 flex-shrink-0" />
              <div className="flex-1 space-y-1.5 pt-1">
                <div className="h-2.5 w-24 rounded-full bg-gray-200" />
                <div className="h-2.5 w-48 rounded-full bg-gray-100" />
              </div>
            </div>

            {/* Jordan's request */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: S1_MSG, duration: 0.4 }}
            >
              <SlackMessage
                avatar={
                  <div className="w-full h-full bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center">
                    JT
                  </div>
                }
                name="Jordan Tran"
                time="9:14 AM"
              >
                <p>Can we get a PO for this quote from Acme Steel? Need it approved this week.</p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: S1_ATTACH, duration: 0.3 }}
                  className="mt-1.5"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-700">
                    <FileText className="w-3 h-3 text-red-500" />
                    Acme-Steel-Quote-Q2214.pdf
                  </span>
                </motion.div>
              </SlackMessage>
            </motion.div>

            {/* Quiet AI bot reply */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: S1_BOT, duration: 0.4 }}
            >
              <SlackMessage avatar={quietAvatar} name="Quiet AI" time="9:14 AM" isBot>
                <p>On it. Reading the quote and drafting a purchase order now.</p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: S1_SCAN, duration: 0.3 }}
                  className="mt-1.5 inline-flex items-center gap-2 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-600"
                >
                  <div className="relative w-3 h-3 flex-shrink-0">
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ delay: S1_DONE, duration: 0.2 }}
                      className="absolute inset-0"
                    >
                      <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: S1_DONE, duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Check className="w-3 h-3 text-green-600" />
                    </motion.div>
                  </div>
                  <div className="relative">
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ delay: S1_DONE, duration: 0.2 }}
                      className="absolute inset-0 whitespace-nowrap"
                    >
                      Extracting line items from Acme-Steel-Quote-Q2214.pdf
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: S1_DONE, duration: 0.3 }}
                      className="absolute inset-0 whitespace-nowrap"
                    >
                      Quote parsed · 3 line items · $18,450.00
                    </motion.span>
                    {/* Invisible sizer: the longer of the two strings keeps the pill wide enough for both */}
                    <span className="opacity-0 whitespace-nowrap">
                      Extracting line items from Acme-Steel-Quote-Q2214.pdf
                    </span>
                  </div>
                </motion.div>
              </SlackMessage>
            </motion.div>
          </SlackWindow>
        </motion.div>

        <StatusPill delay={S1_PILL} text="Quote captured from Slack. Drafting PO" />
      </div>
    </div>
  )
}

// ===== Scene 2: Draft PO =====
const S2_RULE1 = 0.6
const S2_LINE1 = S2_RULE1 + 0.6
const S2_GL1 = S2_LINE1 + 0.6
const S2_RULE2 = S2_GL1 + 0.8
const S2_LINE2 = S2_RULE2 + 0.6
const S2_GL2 = S2_LINE2 + 0.6
const S2_TOTAL = S2_GL2 + 0.7
const S2_RULE3 = S2_TOTAL + 0.8
const S2_ROUTE = S2_RULE3 + 0.7
const S2_PILL = S2_ROUTE + 0.8

const flashBg = (delay: number, duration = 1.6) => ({
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

const S2_LINES = [
  {
    description: 'A36 steel plate · 40 × $310.00',
    gl: '1300 · Raw Materials',
    amount: '$12,400.00',
    lineFlashDelay: S2_LINE1,
    glDelay: S2_GL1,
  },
  {
    description: 'Laser cutting · 40 × $95.00',
    gl: '1300 · Raw Materials',
    amount: '$3,800.00',
    lineFlashDelay: S2_LINE1,
    glDelay: S2_GL1 + 0.15,
  },
  {
    description: 'Freight & crating',
    gl: '6700 · Freight In',
    amount: '$2,250.00',
    lineFlashDelay: S2_LINE2,
    glDelay: S2_GL2,
  },
]

function SceneDraftPO() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-4xl flex items-stretch gap-4">
        {/* Left · Source + coding rules */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-60 flex-shrink-0 flex flex-col gap-2"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Source
            </div>
            <p className="text-xs text-gray-700">
              Drafting PO from the quote Jordan shared in{' '}
              <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
                <img src={slackLogo} alt="Slack" className="w-3 h-3 object-contain" />
                # purchasing
              </span>
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Your coding rules
            </div>
            <div className="space-y-1 text-xs">
              {(() => {
                const flash = flashBg(S2_RULE1)
                return (
                  <motion.div
                    initial={flash.initial}
                    animate={flash.animate}
                    transition={flash.transition}
                    className="rounded-md p-1.5 -mx-1"
                  >
                    <p className="text-gray-700">
                      Code steel and fabrication to{' '}
                      <span className="font-semibold text-blue-700">1300 · Raw Materials</span>
                    </p>
                  </motion.div>
                )
              })()}
              {(() => {
                const flash = flashBg(S2_RULE2)
                return (
                  <motion.div
                    initial={flash.initial}
                    animate={flash.animate}
                    transition={flash.transition}
                    className="rounded-md p-1.5 -mx-1"
                  >
                    <p className="text-gray-700">
                      Code freight to{' '}
                      <span className="font-semibold text-blue-700">6700 · Freight In</span>
                    </p>
                  </motion.div>
                )
              })()}
              {(() => {
                const flash = flashBg(S2_RULE3)
                return (
                  <motion.div
                    initial={flash.initial}
                    animate={flash.animate}
                    transition={flash.transition}
                    className="rounded-md p-1.5 -mx-1"
                  >
                    <p className="text-gray-700">
                      Route POs over $10,000 to{' '}
                      <span className="font-semibold text-blue-700">Dana Whitfield</span>
                    </p>
                  </motion.div>
                )
              })()}
            </div>
          </div>
        </motion.div>

        {/* Right · Generated PO */}
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
                  Purchase Order PO-2026-0147 · Acme Steel
                </motion.div>
              </div>
              <div className="relative w-3.5 h-3.5">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: S2_PILL, duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: S2_PILL, duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                </motion.div>
              </div>
            </div>

            <div className="p-3 space-y-2 flex-1 flex flex-col">
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
                <div className="col-span-5">Line item</div>
                <div className="col-span-4">GL Account</div>
                <div className="col-span-3 text-right">Amount</div>
              </div>
              {S2_LINES.map((l) => {
                const lineFlash = flashBg(l.lineFlashDelay, 1.2)
                return (
                  <div
                    key={l.description}
                    className="grid grid-cols-12 gap-2 items-center px-1 py-0.5 rounded"
                  >
                    <motion.div
                      initial={lineFlash.initial}
                      animate={lineFlash.animate}
                      transition={lineFlash.transition}
                      className="col-span-5 text-gray-900 truncate text-sm rounded px-0.5"
                    >
                      {l.description}
                    </motion.div>
                    <div className="col-span-4 relative h-4">
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: l.glDelay, duration: 0.15 }}
                        className="absolute inset-0 flex items-center text-xs text-gray-300"
                      >
                        ·
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
                    <div className="col-span-3 text-right font-medium text-gray-900 text-sm">
                      {l.amount}
                    </div>
                  </div>
                )
              })}

              {/* Total */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: S2_TOTAL, duration: 0.35 }}
                className="grid grid-cols-12 gap-2 items-center px-1 pt-2 border-t border-gray-100"
              >
                <div className="col-span-9 text-sm font-semibold text-gray-900">Total</div>
                <div className="col-span-3 text-right text-sm font-bold text-gray-900">
                  $18,450.00
                </div>
              </motion.div>

              {/* Routing row */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: S2_ROUTE, duration: 0.35 }}
                className="flex items-center gap-1.5 px-1 text-xs"
              >
                <Sparkles className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <span className="text-gray-500">Routing:</span>
                <span className="text-blue-700 font-medium">Dana Whitfield (over $10,000)</span>
              </motion.div>

              <div className="pt-3 mt-auto">
                <StatusPill delay={S2_PILL} text="Draft PO ready. Requesting approval in Slack" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Scene 3: Manager approval in Slack =====
const S3_BOT = 0.8
const S3_CARD = S3_BOT + 0.7
const S3_BUTTONS = S3_CARD + 0.9
const S3_CURSOR = S3_BUTTONS + 1.0
const S3_CLICK = S3_CURSOR + 1.4
const S3_APPROVED = S3_CLICK + 0.2
const S3_SYSLINE = S3_APPROVED + 0.6
const S3_PILL = S3_SYSLINE + 1.0

function SceneApproval() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-2xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <SlackWindow>
            {/* Condensed recap of Jordan's message */}
            <SlackMessage
              avatar={
                <div className="w-full h-full bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center">
                  JT
                </div>
              }
              name="Jordan Tran"
              time="9:14 AM"
            >
              <p className="text-gray-500">Can we get a PO for this quote from Acme Steel?</p>
            </SlackMessage>

            {/* Quiet AI approval request */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: S3_BOT, duration: 0.4 }}
            >
              <SlackMessage avatar={quietAvatar} name="Quiet AI" time="9:20 AM" isBot>
                <p>
                  <span className="text-blue-600 font-medium bg-blue-50 rounded px-0.5">
                    @Dana Whitfield
                  </span>{' '}
                  PO-2026-0147 for Acme Steel needs your approval. Total is $18,450.00, over your
                  $10,000 threshold.
                </p>

                {/* Summary block */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: S3_CARD, duration: 0.35 }}
                  className="mt-2 border-l-2 border-blue-400 pl-3 space-y-1 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-14">Vendor</span>
                    <span className="font-medium text-gray-900">Acme Steel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-14">PO</span>
                    <span className="font-medium text-gray-900">PO-2026-0147</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-14">Total</span>
                    <span className="font-medium text-gray-900">$18,450.00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-14">Budget</span>
                    <span className="inline-flex items-center gap-1 font-medium text-green-700">
                      <CheckCircle2 className="w-3 h-3" />
                      Within Q3 materials budget
                    </span>
                  </div>
                </motion.div>

                {/* Approve / View PO buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: S3_BUTTONS, duration: 0.35 }}
                  className="mt-2.5 flex items-center gap-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1, 0.95, 1, 1] }}
                    transition={{ delay: S3_CLICK - 0.2, duration: 0.5, times: [0, 0.3, 0.5, 0.7, 1] }}
                    className="relative"
                  >
                    <div className="relative inline-flex items-center justify-center px-4 py-1.5 rounded-md bg-[#007a5a] text-white text-xs font-semibold shadow-sm min-w-[92px]">
                      <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: S3_APPROVED, duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        Approve
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: S3_APPROVED, duration: 0.25 }}
                        className="absolute inset-0 flex items-center justify-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Approved
                      </motion.span>
                      <span className="opacity-0">Approve</span>

                      {/* Cursor */}
                      <motion.div
                        initial={{ x: 110, y: -46, opacity: 0 }}
                        animate={{
                          x: [110, 10, 0, 0],
                          y: [-46, -5, 0, 0],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          delay: S3_CURSOR,
                          duration: 2.0,
                          times: [0, 0.5, 0.7, 1],
                          ease: 'easeInOut',
                        }}
                        className="absolute top-1/2 left-1/2 pointer-events-none z-10"
                      >
                        <MousePointer2
                          className="w-5 h-5 text-gray-900"
                          fill="white"
                          strokeWidth={1.5}
                        />
                      </motion.div>

                      {/* Click ripple */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.6, 2.2], opacity: [0, 0.4, 0] }}
                          transition={{ delay: S3_CLICK, duration: 0.7, times: [0, 0.3, 1] }}
                          className="w-20 h-20 rounded-full border-2 border-green-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: S3_APPROVED, duration: 0.3 }}
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-md bg-white border border-gray-300 text-gray-700 text-xs font-semibold"
                  >
                    View PO
                  </motion.div>
                </motion.div>
              </SlackMessage>
            </motion.div>

            {/* System line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: S3_SYSLINE, duration: 0.35 }}
              className="flex items-center gap-1.5 pl-10 text-xs text-gray-500"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              Dana Whitfield approved · 9:21 AM
            </motion.div>
          </SlackWindow>
        </motion.div>

        <StatusPill delay={S3_PILL} text="Approval recorded. Sending PO to Acme Steel" />
      </div>
    </div>
  )
}

// ===== Scene 4: Sent to vendor =====
const S4_EMAIL = 0.4
const S4_SENT = S4_EMAIL + 1.4
const S4_DELIVERED = S4_SENT + 1.2
const S4_OPENED = S4_DELIVERED + 0.6
const S4_WAIT = S4_OPENED + 1.0
const S4_PILL = S4_WAIT + 1.2

function SceneSendVendor() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-3">
        {/* Outgoing email */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: S4_EMAIL, duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <div className="bg-gray-100 px-3 py-2 flex items-center gap-2">
            <Send className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">To: orders@acmesteel.com</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: S4_SENT, duration: 0.3 }}
              className="ml-auto px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full"
            >
              Sent
            </motion.span>
          </div>
          <div className="p-3 text-sm space-y-2">
            <div className="font-semibold text-gray-900">
              Purchase Order PO-2026-0147 · Authorization requested
            </div>
            <p className="text-gray-700 leading-relaxed">
              Hi, please find our purchase order attached. Reply to authorize and confirm pricing
              and lead time. Thank you!
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
                <Paperclip className="w-2.5 h-2.5" />
                PO-2026-0147.pdf
              </span>
            </div>
          </div>
        </motion.div>

        {/* Delivery status rows */}
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: S4_DELIVERED, duration: 0.35 }}
            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100"
          >
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">Delivered</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: S4_OPENED, duration: 0.35 }}
            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100"
          >
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">Opened by vendor</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: S4_WAIT, duration: 0.35 }}
            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-amber-50 border border-amber-200"
          >
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-sm font-medium text-amber-800">Awaiting vendor authorization</div>
          </motion.div>
        </div>

        <StatusPill delay={S4_PILL} text="PO delivered. Watching the thread for the vendor's reply" />
      </div>
    </div>
  )
}

// ===== Scene 5: Authorized & synced =====
const S5_EMAIL = 0.4
const S5_PARSE = S5_EMAIL + 1.4
const S5_CARDS = S5_PARSE + 0.8
const S5_SYNCED = S5_CARDS + 1.0
const S5_AUDIT = S5_CARDS + 1.6
const S5_CLOSE = S5_AUDIT + 1.4

function SceneAuthorizedSync() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        {/* Inbound authorization email */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: S5_EMAIL, duration: 0.4 }}
          className="max-w-xl mx-auto bg-white border border-blue-200 rounded-xl overflow-hidden shadow-sm"
        >
          <div className="bg-blue-50 px-3 py-2 flex items-center gap-2 border-b border-blue-100">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">From: orders@acmesteel.com</span>
          </div>
          <div className="p-3 text-sm space-y-1.5">
            <div className="font-semibold text-gray-900">Re: Purchase Order PO-2026-0147</div>
            <p className="text-gray-700 leading-relaxed">
              Authorized. Pricing and lead time confirmed, target ship date Aug 12. Thanks for the
              order!
            </p>
          </div>
        </motion.div>

        <StatusPill
          delay={S5_PARSE}
          text="Vendor authorization parsed. Syncing to your ERP"
          checkDelay={S5_SYNCED}
        />

        {/* Result cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* ERP synced */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: S5_CARDS, duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">ERP synced</span>
            </div>
            <div className="p-3 text-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">PO</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-800">
                  <img src={qboLogo} alt="QBO" className="w-3 h-3" />
                  PO-2026-0147
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Vendor</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-800">
                  <img src={qboLogo} alt="QBO" className="w-3 h-3" />
                  Acme Steel
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Committed</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-800">
                  <img src={qboLogo} alt="QBO" className="w-3 h-3" />
                  $18,450.00
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: S5_SYNCED, duration: 0.3 }}
                className="!mt-3 pt-1 flex justify-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                  <img src={logo} alt="Quiet" className="h-3.5" />
                  <span className="text-xs font-medium text-blue-700">
                    Open PO posted to QuickBooks
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Audit trail */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: S5_CARDS + 0.4, duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Audit trail</span>
            </div>
            <div className="p-3 space-y-1 text-xs">
              {[
                '9:14 AM · Quote shared in Slack',
                '9:15 AM · Draft PO created',
                '9:21 AM · Dana approved',
                '9:22 AM · PO sent to Acme Steel',
                '11:05 AM · Vendor authorized',
                '11:05 AM · Synced to QuickBooks',
              ].map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: S5_AUDIT + i * 0.1, duration: 0.2 }}
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
          transition={{ delay: S5_CLOSE, duration: 0.5 }}
          className="flex items-center justify-center gap-2 text-sm text-gray-700"
        >
          <Clock className="w-4 h-4 text-gray-400" />
          <span>From Slack message to booked PO, with one human click.</span>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Main exported component =====
function POLifecycleAnimation({ sceneIndex }: { sceneIndex: number }) {
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
          {sceneIndex === 0 && <SceneSlackRequest />}
          {sceneIndex === 1 && <SceneDraftPO />}
          {sceneIndex === 2 && <SceneApproval />}
          {sceneIndex === 3 && <SceneSendVendor />}
          {sceneIndex === 4 && <SceneAuthorizedSync />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default POLifecycleAnimation
