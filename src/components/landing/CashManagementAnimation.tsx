import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import {
  AlertTriangle,
  CalendarClock,
  Check,
  CheckCircle2,
  Landmark,
  Layers,
  Loader2,
  MousePointer2,
  Sparkles,
} from 'lucide-react'
import plaidLogo from '@/assets/images/plaid_logo.webp'
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
    id: 'sync',
    label: 'Live position',
    caption: 'Quiet AI connects your bank accounts and builds a live cash position. No spreadsheet required.',
    duration: 9,
  },
  {
    id: 'forecast',
    label: 'Forecast',
    caption: 'Committed outflows and expected inflows roll into a weekly forecast at 7 to 90 day horizons.',
    duration: 10.5,
  },
  {
    id: 'warning',
    label: 'Threshold warning',
    caption: 'Quiet AI warns you before cash dips below your buffer, and suggests a fix you can apply in one click.',
    duration: 11,
  },
  {
    id: 'discount',
    label: 'Discount capture',
    caption: 'An early-pay discount window opens. Quiet AI confirms cash allows it and schedules the payment early.',
    duration: 9.5,
  },
  {
    id: 'batch',
    label: 'Schedule & batch',
    caption: 'Payments are grouped into batches by day to cut transaction costs, and posted to your ERP.',
    duration: 8.5,
  },
]

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

// ===== Shared app window chrome =====
function AppWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
      {/* Title bar */}
      <div className="bg-gray-100 px-3 py-2 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <img src={logo} alt="Quiet AI" className="h-3.5" />
          <span className="text-xs font-medium text-gray-600">{title}</span>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

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

const flashBg = (delay: number, duration = 1.6) => ({
  initial: { backgroundColor: 'rgba(59,130,246,0)' },
  animate: {
    backgroundColor: [
      'rgba(59,130,246,0)',
      'rgba(59,130,246,0.15)',
      'rgba(59,130,246,0.15)',
      'rgba(59,130,246,0)',
    ],
  },
  transition: {
    delay,
    duration,
    times: [0, 0.08, 0.75, 1],
    ease: 'easeInOut' as const,
  },
})

// Animated count-up currency value
function useCountUp(target: number, delay: number) {
  const mv = useMotionValue(0)
  const formatted = useTransform(mv, (v) => currency.format(Math.round(v)))
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(mv, target, { duration: 1.1, ease: 'easeOut' })
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [target, delay, mv])
  return formatted
}

/**
 * Morph a path's `d` between variants via a MotionValue written straight to the
 * attribute. Framer's own SVG `d` handling emits a one-frame `d="undefined"` on
 * unmount/re-render; writing interpolated strings ourselves avoids that.
 */
function useMorphPath(target: string) {
  const ref = useRef<SVGPathElement>(null)
  const mv = useMotionValue(target)
  useEffect(() => {
    ref.current?.setAttribute('d', mv.get())
    return mv.on('change', (v) => ref.current?.setAttribute('d', v))
  }, [mv])
  useEffect(() => {
    const controls = animate(mv, target, { duration: 0.9, ease: 'easeInOut' })
    return () => controls.stop()
  }, [target, mv])
  return ref
}

// ===== Forecast chart data =====
type WeekBucket = {
  label: string
  inflows: [number, number] // confirmed payouts, projected sales
  outflows: [number, number] // payables due, loan & other
  balance: number // projected end-of-week balance
}

const BUCKETS: WeekBucket[] = [
  { label: 'Jul 14', inflows: [4600, 2900], outflows: [4300, 1500], balance: 42900 },
  { label: 'Jul 21', inflows: [3400, 2200], outflows: [5600, 1700], balance: 41200 },
  { label: 'Jul 28', inflows: [2800, 2400], outflows: [6200, 1600], balance: 38600 },
  { label: 'Aug 4', inflows: [2200, 1900], outflows: [12400, 2900], balance: 27400 },
  { label: 'Aug 11', inflows: [2600, 1800], outflows: [12100, 2800], balance: 16900 },
  { label: 'Aug 18', inflows: [2400, 1600], outflows: [10300, 2200], balance: 8400 },
  { label: 'Aug 25', inflows: [6900, 3100], outflows: [3200, 1000], balance: 14200 },
  { label: 'Sep 1', inflows: [6400, 2800], outflows: [2700, 900], balance: 19800 },
  { label: 'Sep 8', inflows: [5800, 2600], outflows: [2600, 1000], balance: 25400 },
  { label: 'Sep 15', inflows: [5200, 2500], outflows: [2400, 1000], balance: 31200 },
  { label: 'Sep 22', inflows: [5500, 2400], outflows: [2300, 1000], balance: 36900 },
  { label: 'Sep 29', inflows: [5600, 2500], outflows: [2400, 1000], balance: 42300 },
  { label: 'Oct 6', inflows: [6100, 2700], outflows: [2400, 1000], balance: 47650 },
]

// After applying the fix: Pacific Packaging's $6,800 moves from the Aug 4 week
// to the Aug 25 week, lifting the low point above the buffer.
const BUCKETS_HEALED: WeekBucket[] = BUCKETS.map((b, i) => {
  if (i === 3) return { ...b, outflows: [5600, 2900], balance: 34200 }
  if (i === 4) return { ...b, balance: 23700 }
  if (i === 5) return { ...b, balance: 15200 }
  if (i === 6) return { ...b, outflows: [10000, 1000] }
  return b
})

const IN_COLORS = ['#0f8b5f', '#47c293']
const OUT_COLORS = ['#b83a30', '#c1861f']
const LINE_COLOR = '#1e3a5f'

const BASELINE = 62 // % from top where the zero line sits
const LINE_MAX = 50000 // dollars at the top of the chart
const BAR_FULL = 16000 // dollars that fill the outflow region (38% of chart)

const yPct = (v: number) => BASELINE - (v / LINE_MAX) * BASELINE
const upBarPct = (v: number) => ((v / BAR_FULL) * 38 * 100) / BASELINE
const downBarPct = (v: number) => (v / BAR_FULL) * 100

function balancePath(buckets: WeekBucket[], count: number): string {
  const pts: string[] = []
  for (let i = 0; i < buckets.length; i++) {
    const j = Math.min(i, count - 1)
    const x = ((j + 0.5) / count) * 100
    const y = yPct(buckets[j].balance)
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return 'M' + pts.join(' L')
}

const Y_LABELS = [
  { v: 40000, label: '$40k' },
  { v: 20000, label: '$20k' },
  { v: 0, label: '$0' },
]

function ForecastChart({
  buckets,
  count,
  animateIn,
  barDelay = 0,
  lineDelay = 0,
  buffer,
  bufferDelay = 0,
  dipIndex,
  dipDelay = 0,
  applied = false,
  heightClass,
}: {
  buckets: WeekBucket[]
  count: number
  animateIn: boolean
  barDelay?: number
  lineDelay?: number
  buffer?: number
  bufferDelay?: number
  dipIndex?: number
  dipDelay?: number
  applied?: boolean
  heightClass: string
}) {
  const lineRef = useMorphPath(balancePath(buckets, count))
  const clipId = useId().replace(/:/g, 'c')
  const dip = dipIndex !== undefined ? buckets[dipIndex] : undefined

  return (
    <div className={`relative ${heightClass}`}>
      {/* Y axis labels */}
      <div className="absolute top-0 bottom-5 left-0 w-8">
        {Y_LABELS.map((yl) => (
          <div
            key={yl.label}
            className="absolute right-1 -translate-y-1/2 text-[9px] text-gray-400 tabular-nums"
            style={{ top: `${yPct(yl.v)}%` }}
          >
            {yl.label}
          </div>
        ))}
      </div>

      {/* Plot area */}
      <div className="absolute top-0 bottom-5 left-8 right-1">
        {/* Gridlines + zero line */}
        {Y_LABELS.map((yl) => (
          <div
            key={yl.label}
            className={`absolute left-0 right-0 border-t ${yl.v === 0 ? 'border-gray-300' : 'border-dashed border-gray-100'}`}
            style={{ top: `${yPct(yl.v)}%` }}
          />
        ))}

        {/* Bars */}
        <div className="absolute inset-0 flex">
          {buckets.map((b, i) => {
            const visible = i < count
            const colDelay = animateIn ? barDelay + i * 0.06 : 0
            const dur = animateIn ? 0.5 : 0.6
            return (
              <motion.div
                key={b.label}
                initial={false}
                animate={{ opacity: visible ? 1 : 0, flexGrow: visible ? 1 : 0.0001 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="relative min-w-0"
                style={{ flexBasis: 0 }}
              >
                {/* Inflows stack up from the baseline */}
                <div
                  className="absolute inset-x-0 top-0 flex flex-col justify-end items-center"
                  style={{ bottom: `${100 - BASELINE}%` }}
                >
                  {[1, 0].map((si, ri) => (
                    <motion.div
                      key={si}
                      initial={{ height: '0%' }}
                      animate={{ height: `${visible ? upBarPct(b.inflows[si]) : 0}%` }}
                      transition={{ delay: colDelay, duration: dur, ease: 'easeInOut' }}
                      className={`w-full max-w-[26px] ${ri === 0 ? 'rounded-t-[3px]' : ''}`}
                      style={{ backgroundColor: IN_COLORS[si] }}
                    />
                  ))}
                </div>
                {/* Outflows stack down from the baseline */}
                <div
                  className="absolute inset-x-0 bottom-0 flex flex-col justify-start items-center"
                  style={{ top: `${BASELINE}%` }}
                >
                  {[0, 1].map((si, ri) => (
                    <motion.div
                      key={si}
                      initial={{ height: '0%' }}
                      animate={{ height: `${visible ? downBarPct(b.outflows[si]) : 0}%` }}
                      transition={{ delay: colDelay, duration: dur, ease: 'easeInOut' }}
                      className={`w-full max-w-[26px] ${ri === 1 ? 'rounded-b-[3px]' : ''}`}
                      style={{ backgroundColor: OUT_COLORS[si] }}
                    />
                  ))}
                </div>
                {/* X label */}
                {visible && (count <= 9 || i % 2 === 0) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: colDelay, duration: 0.3 }}
                    className="absolute -bottom-4 inset-x-0 text-center text-[8px] text-gray-400 truncate"
                  >
                    {b.label}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* This week marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, left: `${(0.5 / count) * 100}%` }}
          transition={{ delay: animateIn ? barDelay : 0, duration: 0.5 }}
          className="absolute top-0 bottom-0 border-l border-dashed border-gray-300 pointer-events-none"
        >
          <span className="absolute top-0 left-1 text-[8px] text-gray-400 whitespace-nowrap">
            This week
          </span>
        </motion.div>

        {/* Projected balance line, revealed left to right via clip-path.
            (pathLength draw-on is unusable here: its stroke-dasharray breaks
            under non-scaling-stroke + preserveAspectRatio="none".) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <clipPath id={clipId}>
            <motion.rect
              x={-5}
              y={-10}
              height={120}
              initial={{ width: 0 }}
              animate={{ width: 115 }}
              transition={{ delay: lineDelay, duration: 1.2, ease: 'easeInOut' }}
            />
          </clipPath>
          <g clipPath={`url(#${clipId})`}>
            <path
              ref={lineRef}
              fill="none"
              stroke={LINE_COLOR}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        {/* Buffer line */}
        {buffer !== undefined && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: bufferDelay, duration: 0.6, ease: 'easeOut' }}
            className="absolute left-0 right-0 border-t-2 border-dashed border-red-400 pointer-events-none"
            style={{ top: `${yPct(buffer)}%`, transformOrigin: 'left' }}
          >
            <span className="absolute right-0 -top-4 px-1 rounded bg-white/90 text-[9px] font-medium text-red-500 tabular-nums">
              Buffer {currency.format(buffer)}
            </span>
          </motion.div>
        )}

        {/* Low point marker */}
        {dip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              top: `${yPct(dip.balance)}%`,
              left: `${((dipIndex! + 0.5) / count) * 100}%`,
            }}
            transition={{ delay: dipDelay, duration: 0.5, ease: 'easeInOut' }}
            className="absolute pointer-events-none"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative w-2.5 h-2.5">
              {!applied && <span className="absolute inset-0 rounded-full bg-red-400 animate-ping" />}
              <motion.span
                animate={{ backgroundColor: applied ? '#0f8b5f' : '#b83a30' }}
                className="absolute inset-0 rounded-full border-2 border-white shadow"
              />
            </div>
            <motion.span
              key={applied ? 'healed' : 'low'}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`absolute left-1/2 -translate-x-1/2 top-3 px-1 rounded bg-white/90 shadow-sm text-[9px] font-semibold tabular-nums whitespace-nowrap ${applied ? 'text-green-700' : 'text-red-600'}`}
            >
              {currency.format(dip.balance)}
            </motion.span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ChartLegend({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 text-[9px] text-gray-500"
    >
      <span className="inline-flex items-center gap-1">
        <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: IN_COLORS[0] }} />
        Money in
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: OUT_COLORS[0] }} />
        Money out
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: LINE_COLOR }} />
        Projected balance
      </span>
    </motion.div>
  )
}

// ===== Scene 1: Live position =====
const S1_WINDOW = 0.3
const S1_PLAID = S1_WINDOW + 0.5
const S1_ACCT1 = S1_PLAID + 1.0
const S1_ACCT2 = S1_ACCT1 + 0.5
const S1_LINKED = S1_ACCT2 + 0.7
const S1_KPIS = S1_LINKED + 0.6
const S1_COUNT = S1_KPIS + 0.3
const S1_PILL = S1_COUNT + 1.9

function KpiCard({
  label,
  value,
  sub,
  delay,
}: {
  label: string
  value: React.ReactNode
  sub: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-gray-50 rounded-lg border border-gray-200 p-3"
    >
      <div className="text-[10px] font-medium uppercase tracking-wider text-gray-500 truncate">
        {label}
      </div>
      <div className="text-lg font-semibold text-gray-900 tabular-nums mt-0.5">{value}</div>
      <div className="text-[10px] text-gray-400 mt-0.5 truncate">{sub}</div>
    </motion.div>
  )
}

function SceneLivePosition() {
  const cashOnHand = useCountUp(41230, S1_COUNT)
  const outflows = useCountUp(27480, S1_COUNT + 0.15)
  const inflows = useCountUp(33900, S1_COUNT + 0.3)
  const netPosition = useCountUp(47650, S1_COUNT + 0.45)

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-2xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: S1_WINDOW, duration: 0.5 }}
        >
          <AppWindow title="Quiet AI · Cash">
            <div className="space-y-3">
              {/* Plaid connect row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: S1_PLAID, duration: 0.35 }}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-600"
              >
                <img src={plaidLogo} alt="Plaid" className="h-3.5 object-contain" />
                <div className="relative w-3 h-3 flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: S1_LINKED, duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: S1_LINKED, duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Check className="w-3 h-3 text-green-600" />
                  </motion.div>
                </div>
                <div className="relative">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: S1_LINKED, duration: 0.2 }}
                    className="absolute inset-0 whitespace-nowrap"
                  >
                    Connecting your bank accounts via Plaid
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: S1_LINKED, duration: 0.3 }}
                    className="absolute inset-0 whitespace-nowrap"
                  >
                    2 accounts linked · balances synced
                  </motion.span>
                  {/* Invisible sizer keeps the pill wide enough for both strings */}
                  <span className="opacity-0 whitespace-nowrap">
                    Connecting your bank accounts via Plaid
                  </span>
                </div>
              </motion.div>

              {/* Account rows */}
              <div className="space-y-1.5">
                {[
                  { name: 'Operating Checking ••4821', balance: '$32,410.00', delay: S1_ACCT1 },
                  { name: 'Reserve Savings ••7702', balance: '$8,820.00', delay: S1_ACCT2 },
                ].map((a) => (
                  <motion.div
                    key={a.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: a.delay, duration: 0.35 }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Landmark className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{a.name}</span>
                    <span className="ml-auto text-sm font-semibold text-gray-900 tabular-nums">
                      {a.balance}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <KpiCard
                  label="Cash on hand"
                  value={<motion.span>{cashOnHand}</motion.span>}
                  sub="2 accounts · live via Plaid"
                  delay={S1_KPIS}
                />
                <KpiCard
                  label="Committed outflows"
                  value={<motion.span>{outflows}</motion.span>}
                  sub="12 approved invoices"
                  delay={S1_KPIS + 0.12}
                />
                <KpiCard
                  label="Expected inflows"
                  value={<motion.span>{inflows}</motion.span>}
                  sub="9 open receivables"
                  delay={S1_KPIS + 0.24}
                />
                <KpiCard
                  label="Net position"
                  value={<motion.span>{netPosition}</motion.span>}
                  sub="projected, 90 days"
                  delay={S1_KPIS + 0.36}
                />
              </div>
            </div>
          </AppWindow>
        </motion.div>

        <StatusPill delay={S1_PILL} text="Live position ready. Building your forecast" />
      </div>
    </div>
  )
}

// ===== Scene 2: Forecast =====
const S2_TABS = 0.5
const S2_BARS = 1.0
const S2_LINE = S2_BARS + 0.9
const S2_H60 = S2_LINE + 2.3
const S2_H90 = S2_H60 + 2.2
const S2_PILL = S2_H90 + 1.6

const HORIZON_TABS = [
  { key: '7', label: '7d' },
  { key: '14', label: '14d' },
  { key: '30', label: '30d' },
  { key: '60', label: '60d' },
  { key: '90', label: '90d' },
]

function SceneForecast() {
  const [horizon, setHorizon] = useState<'30' | '60' | '90'>('30')

  useEffect(() => {
    const t1 = setTimeout(() => setHorizon('60'), S2_H60 * 1000)
    const t2 = setTimeout(() => setHorizon('90'), S2_H90 * 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const count = horizon === '30' ? 5 : horizon === '60' ? 9 : 13

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AppWindow title="Projected cash">
            <div className="space-y-3">
              {/* Heading + horizon tabs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: S2_TABS, duration: 0.35 }}
                className="flex items-center justify-between gap-2"
              >
                <div className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                  Next {horizon} days from Jul 15, 2026
                </div>
                <div className="flex items-center gap-1">
                  {HORIZON_TABS.map((t) => {
                    const isActive = t.key === horizon
                    return (
                      <div key={t.key} className="relative px-2.5 py-1">
                        {isActive && (
                          <motion.span
                            layoutId="horizon-active"
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="absolute inset-0 rounded-full bg-gray-900"
                          />
                        )}
                        <span
                          className={`relative z-10 text-[10px] font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}
                        >
                          {t.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              <ForecastChart
                buckets={BUCKETS}
                count={count}
                animateIn={horizon === '30'}
                barDelay={S2_BARS}
                lineDelay={S2_LINE}
                heightClass="h-48"
              />

              <ChartLegend delay={S2_LINE + 0.6} />
            </div>
          </AppWindow>
        </motion.div>

        <StatusPill delay={S2_PILL} text="Forecast grounded in real due dates, not guesses" />
      </div>
    </div>
  )
}

// ===== Scene 3: Threshold warning =====
const S3_CHART = 0.4
const S3_BUFFER = S3_CHART + 1.0
const S3_DIP = S3_BUFFER + 0.7
const S3_FLAG = S3_DIP + 0.7
const S3_REC = S3_FLAG + 0.9
const S3_CURSOR = S3_REC + 1.2
const S3_CLICK = S3_CURSOR + 1.4
const S3_APPLIED = S3_CLICK + 0.2
const S3_HEAL = S3_APPLIED + 0.3
const S3_PILL = S3_HEAL + 1.5

function SceneThresholdWarning() {
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setApplied(true), S3_HEAL * 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-4xl space-y-3">
        <div className="flex items-stretch gap-4">
          {/* Left · Forecast chart */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: S3_CHART, duration: 0.4 }}
            className="flex-1 min-w-0"
          >
            <AppWindow title="Projected cash · 90 days">
              <ForecastChart
                buckets={applied ? BUCKETS_HEALED : BUCKETS}
                count={13}
                animateIn={!applied}
                barDelay={S3_CHART + 0.2}
                lineDelay={S3_CHART + 0.5}
                buffer={12000}
                bufferDelay={S3_BUFFER}
                dipIndex={5}
                dipDelay={S3_DIP}
                applied={applied}
                heightClass="h-44"
              />
            </AppWindow>
          </motion.div>

          {/* Right · Cash flags panel */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: S3_CHART + 0.2, duration: 0.4 }}
            className="w-72 flex-shrink-0"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Cash flags
                </span>
              </div>

              {/* Flag card */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  borderColor: applied ? 'rgb(134,239,172)' : 'rgb(252,165,165)',
                }}
                transition={{ delay: S3_FLAG, duration: 0.4 }}
                className="border-l-2 pl-2.5 py-1 space-y-2"
              >
                <div className="flex items-start gap-1.5">
                  <div className="relative w-3.5 h-3.5 flex-shrink-0 mt-0.5">
                    <motion.span animate={{ opacity: applied ? 0 : 1 }} className="absolute inset-0">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    </motion.span>
                    <motion.span animate={{ opacity: applied ? 1 : 0 }} className="absolute inset-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    </motion.span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-gray-900">
                        Cash dips below your buffer
                      </p>
                      {applied && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, ease: 'backOut' }}
                          className="inline-flex px-1.5 py-px bg-green-50 border border-green-200 rounded-full text-[9px] font-medium text-green-700 whitespace-nowrap"
                        >
                          Resolved
                        </motion.span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">
                      Wk of Aug 18 · falls to $8,400.00, below your $12,000.00 buffer
                    </p>
                  </div>
                </div>

                {/* Recommendation */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: S3_REC, duration: 0.35 }}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-2 space-y-1.5"
                >
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-700">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    Verified fix
                  </div>
                  <p className="text-[10px] text-gray-700 leading-relaxed">
                    Delay Pacific Packaging Co. (INV-40231) · $6,800.00 from Aug 5 to Aug 26
                  </p>
                  <p className="text-[10px] text-green-700 font-medium">
                    Low point becomes $15,200.00 · stays above your buffer
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1, 0.95, 1, 1] }}
                    transition={{
                      delay: S3_CLICK - 0.2,
                      duration: 0.5,
                      times: [0, 0.3, 0.5, 0.7, 1],
                    }}
                    className="relative inline-flex"
                  >
                    <div className="relative inline-flex items-center justify-center px-3 py-1 rounded-md bg-gray-900 text-white text-[10px] font-semibold min-w-[64px]">
                      <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: S3_APPLIED, duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        Apply
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: S3_APPLIED, duration: 0.25 }}
                        className="absolute inset-0 flex items-center justify-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Applied
                      </motion.span>
                      <span className="opacity-0">Applied</span>

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
                          className="w-16 h-16 rounded-full border-2 border-green-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <StatusPill delay={S3_PILL} text="Buffer protected. Payment moved to Aug 26" />
      </div>
    </div>
  )
}

// ===== Scene 4: Discount capture =====
const S4_TABLE = 0.4
const S4_FLAG = S4_TABLE + 1.4
const S4_CHECK = S4_FLAG + 0.9
const S4_OK = S4_CHECK + 1.7
const S4_ROW = S4_OK + 0.6
const S4_SAVED = S4_ROW + 0.6
const S4_PILL = S4_SAVED + 1.0

const PAYABLES = [
  {
    vendor: 'Pacific Packaging Co.',
    invoice: 'INV-40231',
    due: 'Aug 5',
    planned: 'Aug 26',
    amount: '$6,800.00',
    status: 'Scheduled' as const,
  },
  {
    vendor: 'Brightline Freight',
    invoice: 'INV-1187',
    due: 'Jul 25',
    planned: 'Jul 25',
    amount: '$3,240.00',
    status: 'Open' as const,
  },
  {
    vendor: 'Northstar 3PL',
    invoice: 'INV-5521',
    due: 'Jul 31',
    planned: 'Jul 31',
    amount: '$4,150.00',
    status: 'Open' as const,
  },
  {
    vendor: 'Ironwood Manufacturing',
    invoice: 'INV-2098',
    due: 'Aug 14',
    planned: 'Aug 14',
    amount: '$9,600.00',
    status: 'Open' as const,
  },
  {
    vendor: 'Redwood Legal LLP',
    invoice: 'INV-889',
    due: 'Jul 25',
    planned: 'Jul 25',
    amount: '$2,400.00',
    status: 'Open' as const,
  },
]

const STATUS_STYLES = {
  Open: 'bg-gray-50 text-gray-600 border-gray-200',
  Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
} as const

function StatusBadge({ status }: { status: keyof typeof STATUS_STYLES }) {
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  )
}

function SceneDiscountCapture() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AppWindow title="Payables">
            <div className="space-y-1.5">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 text-[10px] font-medium text-gray-500 px-1">
                <div className="col-span-3">Vendor</div>
                <div className="col-span-2">Invoice #</div>
                <div className="col-span-1">Due</div>
                <div className="col-span-2">Planned pay</div>
                <div className="col-span-2 text-right">Amount</div>
                <div className="col-span-2 text-right">Status</div>
              </div>

              {PAYABLES.map((p, i) => {
                const isIronwood = p.vendor === 'Ironwood Manufacturing'
                const rowFlash = flashBg(S4_FLAG - 0.2, 1.4)
                return (
                  <motion.div
                    key={p.invoice}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: S4_TABLE + i * 0.1, duration: 0.35 }}
                  >
                    <motion.div
                      initial={isIronwood ? rowFlash.initial : undefined}
                      animate={isIronwood ? rowFlash.animate : undefined}
                      transition={isIronwood ? rowFlash.transition : undefined}
                      className="grid grid-cols-12 gap-2 items-start px-1 py-1.5 rounded-md text-xs"
                    >
                      <div className="col-span-3 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{p.vendor}</div>
                        {isIronwood && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            transition={{ delay: S4_FLAG, duration: 0.35 }}
                            className="overflow-hidden"
                          >
                            <span className="inline-flex mt-1 px-1.5 py-px bg-amber-50 border border-amber-200 rounded-full text-[9px] font-medium text-amber-700 whitespace-nowrap">
                              2/10 net 30 · window ends Jul 24
                            </span>
                          </motion.div>
                        )}
                      </div>
                      <div className="col-span-2 text-gray-500 tabular-nums truncate">
                        {p.invoice}
                      </div>
                      <div className="col-span-1 text-gray-700 whitespace-nowrap">{p.due}</div>
                      <div className="col-span-2 text-gray-700">
                        {isIronwood ? (
                          <span className="relative inline-block">
                            <motion.span
                              initial={{ opacity: 1 }}
                              animate={{ opacity: 0 }}
                              transition={{ delay: S4_ROW, duration: 0.2 }}
                              className="absolute inset-0"
                            >
                              Aug 14
                            </motion.span>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: S4_ROW, duration: 0.3 }}
                              className="absolute inset-0 text-blue-700 font-medium"
                            >
                              Jul 23
                            </motion.span>
                            <span className="opacity-0">Aug 14</span>
                          </span>
                        ) : (
                          p.planned
                        )}
                      </div>
                      <div className="col-span-2 text-right font-medium text-gray-900 tabular-nums">
                        {isIronwood ? (
                          <>
                            <span className="relative inline-block">
                              <motion.span
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{ delay: S4_ROW, duration: 0.2 }}
                                className="absolute inset-0"
                              >
                                $9,600.00
                              </motion.span>
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: S4_ROW, duration: 0.3 }}
                                className="absolute inset-0"
                              >
                                $9,408.00
                              </motion.span>
                              <span className="opacity-0">$9,600.00</span>
                            </span>
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              transition={{ delay: S4_SAVED, duration: 0.35, ease: 'backOut' }}
                              className="overflow-hidden"
                            >
                              <span className="inline-flex mt-1 px-1.5 py-px bg-green-50 border border-green-200 rounded-full text-[9px] font-semibold text-green-700 whitespace-nowrap">
                                +$192.00 saved
                              </span>
                            </motion.div>
                          </>
                        ) : (
                          p.amount
                        )}
                      </div>
                      <div className="col-span-2 flex justify-end">
                        {isIronwood ? (
                          <span className="relative inline-block">
                            <motion.span
                              initial={{ opacity: 1 }}
                              animate={{ opacity: 0 }}
                              transition={{ delay: S4_ROW, duration: 0.2 }}
                              className="absolute inset-0 flex justify-end"
                            >
                              <StatusBadge status="Open" />
                            </motion.span>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: S4_ROW, duration: 0.3 }}
                              className="absolute inset-0 flex justify-end"
                            >
                              <StatusBadge status="Scheduled" />
                            </motion.span>
                            <span className="opacity-0">
                              <StatusBadge status="Scheduled" />
                            </span>
                          </span>
                        ) : (
                          <StatusBadge status={p.status} />
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}

              {/* AI check row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: S4_CHECK, duration: 0.35 }}
                className="!mt-3 inline-flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-600"
              >
                <div className="relative w-3 h-3 flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: S4_OK, duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: S4_OK, duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Check className="w-3 h-3 text-green-600" />
                  </motion.div>
                </div>
                <div className="relative">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: S4_OK, duration: 0.2 }}
                    className="absolute inset-0 whitespace-nowrap"
                  >
                    Checking your forecast: does paying early keep you above your buffer?
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: S4_OK, duration: 0.3 }}
                    className="absolute inset-0 whitespace-nowrap"
                  >
                    Cash allows it. Scheduling payment for Jul 23
                  </motion.span>
                  <span className="opacity-0 whitespace-nowrap">
                    Checking your forecast: does paying early keep you above your buffer?
                  </span>
                </div>
              </motion.div>
            </div>
          </AppWindow>
        </motion.div>

        <StatusPill delay={S4_PILL} text="Discount captured. $192.00 back in your pocket" />
      </div>
    </div>
  )
}

// ===== Scene 5: Schedule & batch =====
const S5_HEAD = 0.4
const S5_BATCH1 = S5_HEAD + 0.6
const S5_BATCH2 = S5_BATCH1 + 0.5
const S5_BATCH2_SUM = S5_BATCH2 + 0.8
const S5_BATCH3 = S5_BATCH2_SUM + 0.5
const S5_LINE = S5_BATCH3 + 0.9
const S5_SYNC = S5_LINE + 0.8
const S5_PILL = S5_SYNC + 0.9
const S5_PILL_CHECK = S5_PILL + 1.3

function SceneScheduleBatch() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: S5_HEAD, duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-900"
        >
          <CalendarClock className="w-4 h-4 text-gray-400" />
          Upcoming payment runs
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {/* Batch 1: Jul 23 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: S5_BATCH1, duration: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm"
          >
            <div className="text-xs font-bold text-gray-900 mb-2">Wed Jul 23</div>
            <div className="flex items-center justify-between text-[11px] text-gray-700">
              <span className="truncate">Ironwood Manufacturing</span>
              <span className="font-medium tabular-nums ml-2">$9,408.00</span>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: S5_BATCH1 + 0.4, duration: 0.3, ease: 'backOut' }}
              className="inline-flex mt-2 px-1.5 py-px bg-green-50 border border-green-200 rounded-full text-[9px] font-medium text-green-700"
            >
              1 payment · discount captured
            </motion.span>
          </motion.div>

          {/* Batch 2: Jul 25 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: S5_BATCH2, duration: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm"
          >
            <div className="text-xs font-bold text-gray-900 mb-2">Fri Jul 25</div>
            <div className="space-y-1">
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: S5_BATCH2 + 0.2, duration: 0.3 }}
                className="flex items-center justify-between text-[11px] text-gray-700"
              >
                <span className="truncate">Brightline Freight</span>
                <span className="font-medium tabular-nums ml-2">$3,240.00</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: S5_BATCH2 + 0.4, duration: 0.3 }}
                className="flex items-center justify-between text-[11px] text-gray-700"
              >
                <span className="truncate">Redwood Legal LLP</span>
                <span className="font-medium tabular-nums ml-2">$2,400.00</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: S5_BATCH2_SUM, duration: 0.35 }}
                className="flex items-center justify-between text-[11px] font-semibold text-gray-900 pt-1 border-t border-gray-100"
              >
                <span>2 payments</span>
                <span className="tabular-nums">$5,640.00</span>
              </motion.div>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: S5_BATCH2_SUM + 0.2, duration: 0.3, ease: 'backOut' }}
              className="inline-flex mt-2 px-1.5 py-px bg-blue-50 border border-blue-200 rounded-full text-[9px] font-medium text-blue-700"
            >
              1 transfer instead of 2
            </motion.span>
          </motion.div>

          {/* Batch 3: Aug 26 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: S5_BATCH3, duration: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm"
          >
            <div className="text-xs font-bold text-gray-900 mb-2">Tue Aug 26</div>
            <div className="flex items-center justify-between text-[11px] text-gray-700">
              <span className="truncate">Pacific Packaging Co.</span>
              <span className="font-medium tabular-nums ml-2">$6,800.00</span>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: S5_BATCH3 + 0.4, duration: 0.3, ease: 'backOut' }}
              className="inline-flex mt-2 px-1.5 py-px bg-gray-50 border border-gray-200 rounded-full text-[9px] font-medium text-gray-600"
            >
              deferred to protect buffer
            </motion.span>
          </motion.div>
        </div>

        {/* Batching payoff line */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: S5_LINE, duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-xs text-gray-700"
        >
          <Layers className="w-3.5 h-3.5 text-gray-400" />
          3 payment runs instead of 5 separate payments
        </motion.div>

        {/* ERP sync */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: S5_SYNC, duration: 0.35 }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-800">
            <img src={qboLogo} alt="QBO" className="w-3 h-3" />
            Scheduled payments posted to QuickBooks
          </span>
        </motion.div>

        <StatusPill
          delay={S5_PILL}
          text="Cash position updates the moment each payment goes out"
          checkDelay={S5_PILL_CHECK}
        />
      </div>
    </div>
  )
}

// ===== Main exported component =====
function CashManagementAnimation({ sceneIndex }: { sceneIndex: number }) {
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
          {sceneIndex === 0 && <SceneLivePosition />}
          {sceneIndex === 1 && <SceneForecast />}
          {sceneIndex === 2 && <SceneThresholdWarning />}
          {sceneIndex === 3 && <SceneDiscountCapture />}
          {sceneIndex === 4 && <SceneScheduleBatch />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CashManagementAnimation
