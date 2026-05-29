import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Building2, Package, Sparkles } from 'lucide-react'

const CARD_APPEAR_DURATION = 0.6
const FIELD_FADE_DURATION = 0.4

const INVOICE_START_DELAY = 2.2

// Step 1: invoice ↔ PO match
const PO_REF_MATCH_DELAY = 3.4
const PO_REF_MATCH_DURATION = 1.6
const INVOICE_MATCHED_DELAY = PO_REF_MATCH_DELAY + PO_REF_MATCH_DURATION

const PAY_PRESS_DELAY = 6.0
const PAY_PRESS_DURATION = 0.35
const STATUS_FLIP_DELAY = PAY_PRESS_DELAY + PAY_PRESS_DURATION
const PAID_BAR_FILL_DELAY = STATUS_FLIP_DELAY + 0.05
const PAID_BAR_FILL_DURATION = 1.1

const GOODS_RECEIPT_START_DELAY = 8.2

// Step 2: goods receipt ↔ PO Arc Reactor match
const ARC_MATCH_DELAY = 9.3
const ARC_MATCH_DURATION = 1.6
const RECEIPT_MATCHED_DELAY = ARC_MATCH_DELAY + ARC_MATCH_DURATION

const MARK_PRESS_DELAY = 11.9
const MARK_PRESS_DURATION = 0.35
const RECEIVED_STATUS_FLIP_DELAY = MARK_PRESS_DELAY + MARK_PRESS_DURATION
const RECEIVED_BAR_FILL_DELAY = RECEIVED_STATUS_FLIP_DELAY + 0.05
const RECEIVED_BAR_FILL_DURATION = 1.0

const HIGHLIGHT_TIMES = [0, 0.15, 0.85, 1] as const
const HIGHLIGHT_COLORS = [
  'rgba(191, 219, 254, 0)',
  'rgba(191, 219, 254, 1)',
  'rgba(191, 219, 254, 1)',
  'rgba(191, 219, 254, 0)',
]

type LineItem = { name: string; qty: number; unit: number; received: number }
const PO_LINES: LineItem[] = [
  { name: 'Arc Reactor', qty: 7, unit: 1000, received: 3 },
  { name: 'Repulsor Gauntlet', qty: 2, unit: 2500, received: 0 },
  { name: 'Mark XLII Helmet', qty: 1, unit: 5000, received: 0 },
]
const PO_TOTAL = PO_LINES.reduce((sum, l) => sum + l.qty * l.unit, 0)
const PO_ID = 'PO-7842'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

type Formatter = (n: number) => string

function CountUp({
  to,
  delay,
  duration,
  format,
}: {
  to: number
  delay: number
  duration: number
  format: Formatter
}) {
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) => format(Math.round(latest)))

  useEffect(() => {
    const controls = animate(count, to, { delay, duration, ease: 'easeOut' })
    return controls.stop
  }, [count, to, delay, duration])

  return <motion.span>{display}</motion.span>
}

function HealthBar({
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
  format: Formatter
  fillColor: string
}) {
  const pct = max === 0 ? 0 : (to / max) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs font-medium text-gray-700 tabular-nums">
          <CountUp to={to} delay={fillDelay} duration={fillDuration} format={format} />
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
    <div className="flex gap-5 w-full text-left items-stretch h-full">
      {/* Left — Purchase Order (whole card fades in together) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: CARD_APPEAR_DURATION, ease: 'easeOut' }}
        className="flex-1 min-w-0 flex"
      >
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              Purchase Order{' '}
              <HighlightSpan delay={PO_REF_MATCH_DELAY} duration={PO_REF_MATCH_DURATION}>
                #{PO_ID}
              </HighlightSpan>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0">
              <Building2 className="w-3 h-3" />
              Stark Industries
            </span>
          </div>

          {/* Body */}
          <div className="px-4 py-3 flex-1 flex flex-col gap-3">
            {/* Total Paid bar — above line items */}
            <HealthBar
              label="Total Paid"
              to={3000}
              max={PO_TOTAL}
              fillDelay={PAID_BAR_FILL_DELAY}
              fillDuration={PAID_BAR_FILL_DURATION}
              format={(n) => currency.format(n)}
              fillColor="bg-blue-500"
            />

            {/* Line items */}
            <div className="border-t border-gray-100 pt-5 space-y-5">
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
                          delay: ARC_MATCH_DELAY,
                          duration: ARC_MATCH_DURATION,
                          times: [...HIGHLIGHT_TIMES],
                        }}
                        className="grid grid-cols-12 gap-4 text-sm rounded -mx-2 px-2 -my-1 py-1"
                      >
                        {rowChildren}
                      </motion.div>
                    ) : (
                      <div className="grid grid-cols-12 gap-4 text-sm">{rowChildren}</div>
                    )}
                    <HealthBar
                      label="Received"
                      to={isArcReactor ? line.received : 0}
                      max={line.qty}
                      fillDelay={isArcReactor ? RECEIVED_BAR_FILL_DELAY : 0}
                      fillDuration={isArcReactor ? RECEIVED_BAR_FILL_DURATION : 0}
                      format={(n) => `${n}`}
                      fillColor="bg-blue-500"
                    />
                  </div>
                )
              })}
            </div>

            {/* Total */}
            <div className="grid grid-cols-12 gap-4 pt-2 mt-auto border-t border-gray-200">
              <div className="col-span-9 text-right text-sm font-medium text-gray-700">Total</div>
              <div className="col-span-3 text-right text-sm font-semibold text-gray-900 tabular-nums">
                {currency.format(PO_TOTAL)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right — Invoice (top) + Goods Receipt (bottom) */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 overflow-hidden">
        {/* Invoice */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INVOICE_START_DELAY, duration: CARD_APPEAR_DURATION, ease: 'easeOut' }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                Invoice #INV-2231
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
                transition={{ delay: STATUS_FLIP_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0 inline-flex px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full whitespace-nowrap"
              >
                Ready to Pay
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: STATUS_FLIP_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0 inline-flex px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap"
              >
                Paid
              </motion.span>
            </div>
          </div>

          <div className="px-4 py-2 space-y-3">
            {/* PO Reference + due date */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-gray-500">PO Reference</div>
                <div className="text-sm font-medium text-gray-900">
                  <HighlightSpan
                    delay={PO_REF_MATCH_DELAY}
                    duration={PO_REF_MATCH_DURATION}
                  >
                    {PO_ID}
                  </HighlightSpan>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Due Date</div>
                <div className="text-sm text-gray-900">Jun 15, 2026</div>
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
                <div className="col-span-2 text-right text-gray-900 tabular-nums">3</div>
                <div className="col-span-2 text-right text-gray-700 tabular-nums">
                  {currency.format(1000)}
                </div>
                <div className="col-span-3 text-right font-medium text-gray-900 tabular-nums">
                  {currency.format(3000)}
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2 pt-1.5 mt-1 border-t border-gray-200">
                <div className="col-span-9 text-right text-sm font-medium text-gray-700">
                  Total
                </div>
                <div className="col-span-3 text-right text-sm font-semibold text-gray-900 tabular-nums">
                  {currency.format(3000)}
                </div>
              </div>
            </div>

            {/* Matched + Pay → Paid */}
            <div className="relative h-9">
              {/* Matched to PO — bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: INVOICE_MATCHED_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs"
              >
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span className="text-blue-600">Matched to {PO_ID}</span>
              </motion.div>

              {/* Pay (depresses, then fades out as Paid fades in) */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: STATUS_FLIP_DELAY, duration: FIELD_FADE_DURATION }}
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
                transition={{ delay: STATUS_FLIP_DELAY + 0.05, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0 inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-sm font-medium px-6 py-2 rounded-md"
              >
                <span className="text-green-600">✓</span>
                Paid
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Goods Receipt — slides in after payment */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: GOODS_RECEIPT_START_DELAY, duration: CARD_APPEAR_DURATION, ease: 'easeOut' }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 truncate">
                <Package className="w-3.5 h-3.5 text-gray-500" />
                Goods Receipt #GR-014
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 flex-shrink-0">
                <Building2 className="w-3 h-3" />
                Stark Industries
              </span>
            </div>
            {/* Status pill: "Pending" → "Received" */}
            <div className="relative flex-shrink-0 h-5">
              <span className="invisible inline-block px-2.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap">
                Pending
              </span>
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: RECEIVED_STATUS_FLIP_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0 inline-flex px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full whitespace-nowrap"
              >
                Pending
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: RECEIVED_STATUS_FLIP_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute right-0 top-0 inline-flex px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap"
              >
                Received
              </motion.span>
            </div>
          </div>

          <div className="px-4 py-2 space-y-3">
            {/* Line item */}
            <div className="grid grid-cols-12 gap-2 text-sm">
              <div className="col-span-7 text-gray-900">
                <HighlightSpan delay={ARC_MATCH_DELAY} duration={ARC_MATCH_DURATION}>
                  Arc Reactor
                </HighlightSpan>
              </div>
              <div className="col-span-2 text-right text-gray-500">Qty</div>
              <div className="col-span-3 text-right font-medium text-gray-900 tabular-nums">3</div>
            </div>

            {/* Matched + Mark Received → Received */}
            <div className="relative h-9">
              {/* Matched to PO — bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: RECEIPT_MATCHED_DELAY, duration: FIELD_FADE_DURATION }}
                className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs"
              >
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span className="text-blue-600">Matched to {PO_ID}</span>
              </motion.div>

              {/* Mark Received (depresses, then fades out) */}
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
      </div>
    </div>
  )
}

export default ThreeWayMatchAnimation
