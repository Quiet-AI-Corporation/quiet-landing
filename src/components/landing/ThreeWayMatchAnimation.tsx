import { motion } from 'framer-motion'
import { Building2, Package, Sparkles } from 'lucide-react'

const CARD_APPEAR_DURATION = 0.6
const FIELD_FADE_DURATION = 0.4

// Step 1: Goods receipt appears and matches to PO
const GR_START_DELAY = 1.0
const GR_MATCHED_DELAY = 2.2

// Step 2: Mark received, bars fill light blue
const MARK_PRESS_DELAY = 3.2
const MARK_PRESS_DURATION = 0.3
const RECEIVED_STATUS_FLIP_DELAY = MARK_PRESS_DELAY + MARK_PRESS_DURATION
const RECV_BAR_FILL_DELAY = RECEIVED_STATUS_FLIP_DELAY + 0.05
const RECV_BAR_FILL_DURATION = 0.8

// Step 3: Invoice appears and matches to PO
const INVOICE_START_DELAY = RECV_BAR_FILL_DELAY + RECV_BAR_FILL_DURATION + 0.6
const INVOICE_MATCHED_DELAY = INVOICE_START_DELAY + 1.2

// Step 4: Pay pressed, bars fill dark blue
const PAY_PRESS_DELAY = INVOICE_MATCHED_DELAY + 1.0
const PAY_PRESS_DURATION = 0.3
const PAY_STATUS_FLIP_DELAY = PAY_PRESS_DELAY + PAY_PRESS_DURATION
const PAID_BAR_FILL_DELAY = PAY_STATUS_FLIP_DELAY + 0.05
const PAID_BAR_FILL_DURATION = 0.8

const HIGHLIGHT_TIMES = [0, 0.15, 0.85, 1] as const
const HIGHLIGHT_COLORS = [
  'rgba(191, 219, 254, 0)',
  'rgba(191, 219, 254, 1)',
  'rgba(191, 219, 254, 1)',
  'rgba(191, 219, 254, 0)',
]

type LineItem = { name: string; qty: number; unit: number }
const PO_LINES: LineItem[] = [
  { name: 'Arc Reactor', qty: 7, unit: 1000 },
  { name: 'Repulsor Gauntlet', qty: 2, unit: 2500 },
  { name: 'Mark XLII Helmet', qty: 1, unit: 5000 },
]
const PO_TOTAL = PO_LINES.reduce((sum, l) => sum + l.qty * l.unit, 0)
const PO_ID = 'PO-7842'

// Receipt is for a subquantity: 3 of 7 Arc Reactors
const RECEIPT_QTY = 3
const INVOICE_AMOUNT = RECEIPT_QTY * 1000

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function MatchHealthBar({
  to,
  max,
  fillDelay,
  fillDuration,
  fillColor,
  secondFillDelay,
  secondFillDuration,
  secondFillColor,
}: {
  to: number
  max: number
  fillDelay: number
  fillDuration: number
  fillColor: string
  secondFillDelay?: number
  secondFillDuration?: number
  secondFillColor?: string
}) {
  const pct = max === 0 ? 0 : (to / max) * 100
  return (
    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden relative">
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: `${pct}%` }}
        transition={{ delay: fillDelay, duration: fillDuration, ease: 'easeOut' }}
        className={`absolute inset-y-0 left-0 ${fillColor}`}
      />
      {secondFillColor && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: secondFillDelay, duration: secondFillDuration, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 ${secondFillColor}`}
        />
      )}
    </div>
  )
}

function HighlightSpan({
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
      initial={{ backgroundColor: HIGHLIGHT_COLORS[0] }}
      animate={{ backgroundColor: HIGHLIGHT_COLORS }}
      transition={{ delay, duration, times: [...HIGHLIGHT_TIMES] }}
      className={`rounded px-1 -mx-1 ${className ?? ''}`}
    >
      {children}
    </motion.span>
  )
}

function ThreeWayMatchAnimation() {
  return (
    <div className="flex gap-5 w-full text-left items-start h-full pt-4">
      {/* Left — Purchase Order */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: CARD_APPEAR_DURATION, ease: 'easeOut' }}
        className="flex-1 min-w-0"
      >
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full">
          {/* Header */}
          <div className="px-5 py-2.5 border-b border-gray-100 flex items-center gap-2 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              Purchase Order{' '}
              <HighlightSpan delay={INVOICE_MATCHED_DELAY} duration={1.2}>
                #{PO_ID}
              </HighlightSpan>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0">
              <Building2 className="w-3 h-3" />
              Stark Industries
            </span>
          </div>

          {/* Body */}
          <div className="px-5 py-4 space-y-4">
            {/* Line items */}
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500">
                <div className="col-span-4">Line Item</div>
                <div className="col-span-2 text-right">Qty</div>
                <div className="col-span-3 text-right">Unit</div>
                <div className="col-span-3 text-right">Amount</div>
              </div>
              {PO_LINES.map((line) => {
                const isArcReactor = line.name === 'Arc Reactor'
                const rowChildren = (
                  <>
                    <div className="col-span-4 text-gray-900">{line.name}</div>
                    <div className="col-span-2 text-right text-gray-900 tabular-nums">
                      {line.qty}
                    </div>
                    <div className="col-span-3 text-right text-gray-700 tabular-nums">
                      {currency.format(line.unit)}
                    </div>
                    <div className="col-span-3 text-right font-medium text-gray-900 tabular-nums">
                      {currency.format(line.qty * line.unit)}
                    </div>
                  </>
                )
                return (
                  <div key={line.name} className="space-y-2">
                    {isArcReactor ? (
                      <motion.div
                        initial={{ backgroundColor: HIGHLIGHT_COLORS[0] }}
                        animate={{ backgroundColor: HIGHLIGHT_COLORS }}
                        transition={{
                          delay: GR_MATCHED_DELAY,
                          duration: 1.2,
                          times: [...HIGHLIGHT_TIMES],
                        }}
                        className="grid grid-cols-12 gap-4 text-sm rounded -mx-2 px-2 -my-1 py-1"
                      >
                        {rowChildren}
                      </motion.div>
                    ) : (
                      <div className="grid grid-cols-12 gap-4 text-sm">
                        {rowChildren}
                      </div>
                    )}
                    <MatchHealthBar
                      to={isArcReactor ? RECEIPT_QTY : 0}
                      max={line.qty}
                      fillDelay={isArcReactor ? RECV_BAR_FILL_DELAY : 0}
                      fillDuration={isArcReactor ? RECV_BAR_FILL_DURATION : 0}
                      fillColor="bg-blue-300"
                      secondFillDelay={isArcReactor ? PAID_BAR_FILL_DELAY : undefined}
                      secondFillDuration={isArcReactor ? PAID_BAR_FILL_DURATION : undefined}
                      secondFillColor={isArcReactor ? 'bg-blue-600' : undefined}
                    />
                  </div>
                )
              })}
            </div>

            {/* Total */}
            <div className="grid grid-cols-12 gap-4 pt-2 border-t border-gray-200">
              <div className="col-span-9 text-right text-sm font-medium text-gray-700">Total</div>
              <div className="col-span-3 text-right text-sm font-semibold text-gray-900 tabular-nums">
                {currency.format(PO_TOTAL)}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                Received
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Paid
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right — Goods Receipt (first) + Invoice (second) */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 overflow-hidden">
        {/* Goods Receipt — appears first */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: GR_START_DELAY, duration: CARD_APPEAR_DURATION, ease: 'easeOut' }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-2.5 border-b border-gray-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 truncate">
                <Package className="w-3.5 h-3.5 text-gray-500" />
                Receipt
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: GR_MATCHED_DELAY, duration: FIELD_FADE_DURATION }}
                className="inline-flex items-center gap-1 text-xs text-blue-600"
              >
                <Sparkles className="w-3 h-3" />
                Matched to PO
              </motion.span>
            </div>
          </div>

          <div className="px-5 py-3 space-y-3">
            {/* Line item */}
            <div className="grid grid-cols-12 gap-2 text-sm">
              <div className="col-span-7 text-gray-900">
                <HighlightSpan delay={GR_MATCHED_DELAY} duration={1.2}>
                  Arc Reactor
                </HighlightSpan>
              </div>
              <div className="col-span-2 text-right text-gray-500">Qty</div>
              <div className="col-span-3 text-right font-medium text-gray-900 tabular-nums">{RECEIPT_QTY}</div>
            </div>

            {/* Mark Received → Received */}
            <div className="relative h-9">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: RECEIVED_STATUS_FLIP_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0"
              >
                <motion.div
                  animate={{ scale: [1, 0.95, 1] }}
                  transition={{
                    delay: MARK_PRESS_DELAY,
                    duration: MARK_PRESS_DURATION,
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
                transition={{ delay: RECEIVED_STATUS_FLIP_DELAY + 0.05, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0 inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-sm font-medium px-6 py-2 rounded-md"
              >
                <span className="text-green-600">✓</span>
                Received
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Invoice — appears after receipt is marked */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INVOICE_START_DELAY, duration: CARD_APPEAR_DURATION, ease: 'easeOut' }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-2.5 border-b border-gray-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                Invoice
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0">
                <Building2 className="w-3 h-3" />
                Stark Industries
              </span>
            </div>
            {/* Status pill: "Ready to Pay" → "Paid" */}
            <div className="relative flex-shrink-0 h-5">
              <span className="invisible inline-block px-2.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap">
                Ready to Pay
              </span>
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: PAY_STATUS_FLIP_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0 inline-flex px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full whitespace-nowrap"
              >
                Ready to Pay
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: PAY_STATUS_FLIP_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0 inline-flex px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap"
              >
                Paid
              </motion.span>
            </div>
          </div>

          <div className="px-5 py-3 space-y-3">
            {/* PO Reference */}
            <div>
              <div className="text-xs text-gray-500">PO Reference</div>
              <div className="text-sm font-medium text-gray-900">
                <HighlightSpan delay={INVOICE_MATCHED_DELAY} duration={1.2}>
                  {PO_ID}
                </HighlightSpan>
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
              <div className="grid grid-cols-12 gap-2 text-sm">
                <div className="col-span-5 text-gray-900">Arc Reactor</div>
                <div className="col-span-2 text-right text-gray-900 tabular-nums">{RECEIPT_QTY}</div>
                <div className="col-span-2 text-right text-gray-700 tabular-nums">
                  {currency.format(1000)}
                </div>
                <div className="col-span-3 text-right font-medium text-gray-900 tabular-nums">
                  {currency.format(INVOICE_AMOUNT)}
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2 pt-1.5 mt-1 border-t border-gray-200">
                <div className="col-span-9 text-right text-sm font-medium text-gray-700">
                  Total
                </div>
                <div className="col-span-3 text-right text-sm font-semibold text-gray-900 tabular-nums">
                  {currency.format(INVOICE_AMOUNT)}
                </div>
              </div>
            </div>

            {/* Matched + Pay → Paid */}
            <div className="relative h-9">
              {/* Matched to PO */}
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: INVOICE_MATCHED_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs"
              >
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span className="text-blue-600">Matched to {PO_ID}</span>
              </motion.div>

              {/* Pay button → Paid */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: PAY_STATUS_FLIP_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0"
              >
                <motion.div
                  animate={{ scale: [1, 0.95, 1] }}
                  transition={{
                    delay: PAY_PRESS_DELAY,
                    duration: PAY_PRESS_DURATION,
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
                transition={{ delay: PAY_STATUS_FLIP_DELAY + 0.05, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0 inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-sm font-medium px-6 py-2 rounded-md"
              >
                <span className="text-green-600">✓</span>
                Paid
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ThreeWayMatchAnimation
