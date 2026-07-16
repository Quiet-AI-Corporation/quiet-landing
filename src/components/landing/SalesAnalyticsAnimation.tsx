import { useEffect, useId, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import {
  Check,
  FileSpreadsheet,
  Loader2,
  MousePointer2,
  TrendingUp,
  UserMinus,
  UserPlus,
} from 'lucide-react'
import logo from '@/assets/images/logo.png'

export interface Scene {
  id: string
  label: string
  caption: string
  duration: number
}

export const SCENES: Scene[] = [
  {
    id: 'upload',
    label: 'Upload workbook',
    caption: 'Drop in a quarterly sales workbook and Quiet AI maps accounts, reps, and quarters automatically.',
    duration: 9,
  },
  {
    id: 'accounts',
    label: 'Account trends',
    caption: 'Every account gets a quarter by quarter view, so growth and slippage show up immediately.',
    duration: 11,
  },
  {
    id: 'reps',
    label: 'Rep performance',
    caption: 'Revenue and account counts by salesperson, with a drill down into any quarter to see what moved.',
    duration: 10.5,
  },
  {
    id: 'changes',
    label: 'Account changes',
    caption: 'New wins and churned accounts are called out the quarter they happen.',
    duration: 9,
  },
  {
    id: 'skus',
    label: 'SKU trends',
    caption: 'Product level trends show what is selling and what is fading across the same data.',
    duration: 10.5,
  },
]

const COBALT = '#2b59c3'

const moneyK = (v: number) => `$${v.toFixed(1)}K`
const deltaK = (d: number) => `${d > 0 ? '+' : ''}${d.toFixed(1)}`

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

// Animated count-up value with a custom formatter
function useCountUp(target: number, delay: number, format: (v: number) => string) {
  const mv = useMotionValue(0)
  const formatted = useTransform(mv, format)
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(mv, target, { duration: 1.1, ease: 'easeOut' })
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [target, delay, mv])
  return formatted
}

// Spinner → check swap on a fixed-size box
function SpinnerCheck({ checkDelay, checkClass = 'text-green-600' }: { checkDelay: number; checkClass?: string }) {
  return (
    <div className="relative w-3 h-3 flex-shrink-0">
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
        <Check className={`w-3 h-3 ${checkClass}`} />
      </motion.div>
    </div>
  )
}

// Text that swaps at a delay, sized to the longer string
function SwapText({ before, after, delay }: { before: string; after: string; delay: number }) {
  const sizer = before.length >= after.length ? before : after
  return (
    <div className="relative">
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay, duration: 0.2 }}
        className="absolute inset-0 whitespace-nowrap"
      >
        {before}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.3 }}
        className="absolute inset-0 whitespace-nowrap"
      >
        {after}
      </motion.span>
      {/* Invisible sizer keeps the row wide enough for both strings */}
      <span className="opacity-0 whitespace-nowrap">{sizer}</span>
    </div>
  )
}

// Cursor fly-in + click ripple, positioned inside a relative parent.
// The cursor lands as the ripple fires at clickDelay.
function CursorClick({
  cursorDelay,
  clickDelay,
  fromX,
  fromY,
  ringClass = 'w-12 h-12 border-blue-500',
}: {
  cursorDelay: number
  clickDelay: number
  fromX: number
  fromY: number
  ringClass?: string
}) {
  const duration = (clickDelay - cursorDelay) / 0.72 + 0.4
  return (
    <>
      <motion.div
        initial={{ x: fromX, y: fromY, opacity: 0 }}
        animate={{
          x: [fromX, fromX > 0 ? 12 : -12, 0, 0],
          y: [fromY, fromY > 0 ? 6 : -6, 0, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          delay: cursorDelay,
          duration,
          times: [0, 0.55, 0.72, 1],
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 pointer-events-none z-10"
      >
        <MousePointer2 className="w-5 h-5 text-gray-900" fill="white" strokeWidth={1.5} />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 2], opacity: [0, 0.4, 0] }}
          transition={{ delay: clickDelay, duration: 0.6, times: [0, 0.3, 1] }}
          className={`rounded-full border-2 ${ringClass}`}
        />
      </div>
    </>
  )
}

// ===== Tab strip shared by the pivot scenes =====
const PAGE_TABS = ['By account', 'By salesperson', 'Account changes']

function TabStrip({
  active,
  delay,
  cursorTarget,
  cursorDelay,
  clickDelay,
}: {
  active: string
  delay: number
  cursorTarget?: string
  cursorDelay?: number
  clickDelay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-center gap-1 p-0.5 rounded-lg bg-gray-100 w-fit"
    >
      {PAGE_TABS.map((t) => {
        const isActive = t === active
        const isTarget = t === cursorTarget
        return (
          <div
            key={t}
            className={`relative px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors duration-300 ${
              isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500'
            }`}
          >
            {t}
            {isTarget && cursorDelay !== undefined && clickDelay !== undefined && (
              <CursorClick cursorDelay={cursorDelay} clickDelay={clickDelay} fromX={140} fromY={60} />
            )}
          </div>
        )
      })}
    </motion.div>
  )
}

// ===== Dataset =====
const QUARTERS = ['Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025']

type AccountRow = {
  name: string
  trailing: number
  rep: string
  // [revenue in $K, delta vs prior quarter in $K | null] per quarter
  cells: [number, number | null][]
}

const ACCOUNT_ROWS: AccountRow[] = [
  { name: 'Lakeshore Distributing', trailing: 612, rep: 'Maya', cells: [[138.4, null], [152.1, 13.7], [158.9, 6.8], [162.7, 3.8]] },
  { name: 'Summit Beverage Co', trailing: 448, rep: 'Dan', cells: [[110.2, null], [114.6, 4.4], [109.8, -4.8], [113.5, 3.7]] },
  { name: 'Cascade Market Group', trailing: 391, rep: 'Priya', cells: [[88.7, null], [96.3, 7.6], [101.2, 4.9], [104.6, 3.4]] },
  { name: 'Prairie Foods Wholesale', trailing: 296, rep: 'Tom', cells: [[91.2, null], [84.5, -6.7], [71.3, -13.2], [49.4, -21.9]] },
  { name: 'Harbor Supply Co', trailing: 246, rep: 'Leah', cells: [[60.9, null], [61.4, 0.5], [61.3, -0.1], [62.1, 0.8]] },
]

const PIVOT_GRID = 'grid grid-cols-[minmax(0,1fr)_58px_44px_repeat(4,74px)] gap-1.5 items-center'

type RepRow = {
  name: string
  revenue: number[] // $K per quarter
  accounts: number[] // account count per quarter
  gained: number
  lost: number
  unassigned?: boolean
}

const REP_ROWS: RepRow[] = [
  { name: 'Maya', revenue: [312.6, 348.9, 361.2, 374.8], accounts: [21, 22, 23, 24], gained: 3, lost: 0 },
  { name: 'Dan', revenue: [268.4, 275.2, 262.1, 271.9], accounts: [20, 21, 21, 21], gained: 1, lost: 1 },
  { name: 'Priya', revenue: [231.5, 244.8, 252.6, 259.3], accounts: [16, 17, 17, 19], gained: 2, lost: 0 },
  { name: 'Leah', revenue: [204.2, 208.7, 206.9, 211.4], accounts: [18, 18, 18, 17], gained: 0, lost: 1 },
  { name: 'Tom', revenue: [187.3, 172.6, 158.4, 131.2], accounts: [17, 17, 17, 14], gained: 0, lost: 3 },
  { name: 'Unassigned', revenue: [42.1, 39.8, 44.2, 41.6], accounts: [6, 5, 5, 5], gained: 0, lost: 0, unassigned: true },
]

const REP_GRID = 'grid grid-cols-[minmax(0,1fr)_repeat(4,92px)] gap-1.5 items-center'

type ModalRow = {
  name: string
  revenue: number | null // null when the account was lost this quarter
  prior: number
  delta: number | null
}

const TOM_MODAL_ROWS: ModalRow[] = [
  { name: 'Prairie Foods Wholesale', revenue: 49.4, prior: 71.3, delta: -21.9 },
  { name: 'Crestline Hardware', revenue: 31.8, prior: 30.2, delta: 1.6 },
  { name: 'Bluegrass Grocers', revenue: null, prior: 18.2, delta: null },
  { name: 'Old Mill Trading Co', revenue: null, prior: 12.6, delta: null },
  { name: 'Cedar Point Cafes', revenue: null, prior: 7.9, delta: null },
]

const MODAL_GRID = 'grid grid-cols-[minmax(0,1fr)_72px_84px_72px] gap-1.5 items-center'

const CHURNED_ROWS = [
  { name: 'Bluegrass Grocers', lastLive: 'Q1 2025', rep: 'Tom', revenue: '$18.2K' },
  { name: 'Old Mill Trading Co', lastLive: 'Q1 2025', rep: 'Tom', revenue: '$12.6K' },
  { name: 'Pinehurst Mercantile', lastLive: 'Q4 2024', rep: 'Leah', revenue: '$9.8K' },
]

const NEW_ROWS = [
  { name: 'Ridgeline Retail Partners', rep: 'Maya', revenue: '$31.5K' },
  { name: 'Northgate Provisions', rep: 'Priya', revenue: '$22.8K' },
]

type SkuRow = {
  sku: string
  name: string
  trailing: number // $K trailing 12 months
  yoy: number // percent
  spark: number[]
}

const SKU_ROWS: SkuRow[] = [
  { sku: 'CB-32', name: 'Cold Brew Concentrate 32oz', trailing: 412, yoy: 38, spark: [22, 24, 27, 26, 30, 33, 38, 41, 44, 47, 52, 58] },
  { sku: 'RST-5LB', name: 'Classic Roast 5lb Bag', trailing: 388, yoy: -9, spark: [40, 39, 41, 38, 37, 38, 36, 35, 36, 34, 33, 32] },
  { sku: 'VAN-CS', name: 'Vanilla Syrup Case', trailing: 271, yoy: 12, spark: [20, 21, 20, 22, 23, 22, 24, 25, 24, 26, 27, 28] },
  { sku: 'DCF-2LB', name: 'Decaf Blend 2lb', trailing: 164, yoy: 3, spark: [14, 14, 15, 13, 14, 15, 14, 15, 14, 15, 15, 15] },
  { sku: 'SEA-LTD', name: 'Seasonal Blend Limited', trailing: 148, yoy: 21, spark: [8, 6, 5, 7, 18, 26, 12, 6, 5, 8, 20, 28] },
]

const SKU_GRID = 'grid grid-cols-[64px_minmax(0,1fr)_64px_92px_58px] gap-1.5 items-center'

// CB-32 monthly revenue, Jul 2024 - Jun 2025, sums to $412K
const CB32_MONTHS = [25.4, 26.2, 27.8, 28.6, 30.4, 32.8, 34.2, 35.6, 37.4, 40.2, 44.6, 48.8]
const CB32_MAX = 52
const MONTH_LABELS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

// ===== Prairie Foods quarterly trend chart =====
// 6 quarters of revenue, Q1 2024 - Q2 2025
const TREND_SERIES = [96.8, 102.4, 91.2, 84.5, 71.3, 49.4]
const TREND_MAX = 120

const trendX = (i: number) => ((i + 0.5) / TREND_SERIES.length) * 100
const trendY = (v: number) => 94 - (v / TREND_MAX) * 86

const TREND_PATH =
  'M' + TREND_SERIES.map((v, i) => `${trendX(i).toFixed(2)},${trendY(v).toFixed(2)}`).join(' L')

const TREND_Y_LABELS = [
  { v: 100, label: '$100K' },
  { v: 50, label: '$50K' },
  { v: 0, label: '0' },
]

const TREND_X_LABELS = ["Q1 '24", "Q2 '24", "Q3 '24", "Q4 '24", "Q1 '25", "Q2 '25"]

function QuarterTrendChart({
  axesDelay,
  lineDelay,
  peakDelay,
  dropDelay,
}: {
  axesDelay: number
  lineDelay: number
  peakDelay: number
  dropDelay: number
}) {
  const clipId = `${useId().replace(/:/g, 'c')}-trend`

  return (
    <div className="relative h-28">
      {/* Y axis labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: axesDelay, duration: 0.4 }}
        className="absolute top-0 bottom-5 left-0 w-9"
      >
        {TREND_Y_LABELS.map((yl) => (
          <div
            key={yl.label}
            className="absolute right-1 -translate-y-1/2 text-[9px] text-gray-400 tabular-nums"
            style={{ top: `${trendY(yl.v)}%` }}
          >
            {yl.label}
          </div>
        ))}
      </motion.div>

      {/* Plot area */}
      <div className="absolute top-0 bottom-5 left-9 right-1">
        {/* Gridlines */}
        {TREND_Y_LABELS.map((yl) => (
          <motion.div
            key={yl.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: axesDelay, duration: 0.4 }}
            className={`absolute left-0 right-0 border-t ${yl.v === 0 ? 'border-gray-300' : 'border-dashed border-gray-200'}`}
            style={{ top: `${trendY(yl.v)}%` }}
          />
        ))}

        {/* X labels */}
        {TREND_X_LABELS.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: axesDelay, duration: 0.4 }}
            className="absolute -bottom-4 -translate-x-1/2 text-[8px] text-gray-400 whitespace-nowrap"
            style={{ left: `${trendX(i)}%` }}
          >
            {label}
          </motion.div>
        ))}

        {/* Revenue line, revealed left to right via clip-path.
            (pathLength draw-on breaks under non-scaling-stroke +
            preserveAspectRatio="none".) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <clipPath id={clipId}>
            <motion.rect
              x={-2}
              y={-10}
              height={120}
              initial={{ width: 0 }}
              animate={{ width: 104 }}
              transition={{ delay: lineDelay, duration: 1.2, ease: 'easeInOut' }}
            />
          </clipPath>
          <g clipPath={`url(#${clipId})`}>
            <path
              d={TREND_PATH}
              fill="none"
              stroke={COBALT}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        {/* Quarter dots, popping in as the line sweeps past */}
        {TREND_SERIES.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: lineDelay + (i / (TREND_SERIES.length - 1)) * 1.2, duration: 0.25, ease: 'backOut' }}
            className="absolute w-1.5 h-1.5 rounded-full border border-white shadow-sm pointer-events-none"
            style={{
              top: `${trendY(v)}%`,
              left: `${trendX(i)}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: COBALT,
            }}
          />
        ))}

        {/* Peak marker */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: peakDelay, duration: 0.4 }}
          className="absolute -translate-x-1/2 px-1 rounded bg-white/90 text-[9px] font-medium text-gray-500 whitespace-nowrap pointer-events-none"
          style={{ top: `${trendY(TREND_SERIES[1]) - 14}%`, left: `${trendX(1)}%` }}
        >
          Peak $102.4K
        </motion.div>

        {/* Drop marker on the latest quarter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: dropDelay, duration: 0.5, ease: 'easeInOut' }}
          className="absolute pointer-events-none"
          style={{
            top: `${trendY(TREND_SERIES[5])}%`,
            left: `${trendX(5)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-red-400 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-red-500 border-2 border-white shadow" />
          </div>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1 rounded bg-white/90 shadow-sm text-[9px] font-semibold text-red-600 whitespace-nowrap">
            Down 52% from peak
          </span>
        </motion.div>
      </div>
    </div>
  )
}

// ===== Inline sparkline for SKU rows =====
function Sparkline({ values, delay, stroke }: { values: number[]; delay: number; stroke: string }) {
  const clipId = `${useId().replace(/:/g, 'c')}-spark`
  const max = Math.max(...values)
  const points = values
    .map((v, i) => `${((i / (values.length - 1)) * 100).toFixed(1)},${(26 - (v / max) * 24).toFixed(1)}`)
    .join(' ')

  return (
    <svg className="w-full h-4" viewBox="0 0 100 28" preserveAspectRatio="none">
      <clipPath id={clipId}>
        <motion.rect
          x={0}
          y={0}
          height={28}
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ delay, duration: 0.8, ease: 'easeInOut' }}
        />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <polyline
          points={points}
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}

// ===== Scene 1: Upload workbook =====
const S1_WINDOW = 0.3
const S1_FILE = S1_WINDOW + 0.5
const S1_FILE_DONE = S1_FILE + 1.2
const S1_SHEETS = S1_FILE_DONE + 0.4
const S1_KPIS = S1_SHEETS + 1.8
const S1_MATCH = S1_KPIS + 1.6
const S1_PILL = S1_MATCH + 1.0
const S1_PILL_CHECK = S1_PILL + 1.2

const SHEET_TABS = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025']

function UploadStatCard({
  label,
  value,
  delay,
}: {
  label: string
  value: React.ReactNode
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-gray-50 rounded-lg border border-gray-200 px-2.5 py-2"
    >
      <div className="text-[9px] font-medium uppercase tracking-wider text-gray-500 truncate">
        {label}
      </div>
      <div className="text-base font-semibold tabular-nums mt-0.5 text-gray-900">{value}</div>
    </motion.div>
  )
}

function SceneUpload() {
  const accounts = useCountUp(142, S1_KPIS, (v) => `${Math.round(v)}`)
  const reps = useCountUp(8, S1_KPIS + 0.15, (v) => `${Math.round(v)}`)
  const quarters = useCountUp(6, S1_KPIS + 0.3, (v) => `${Math.round(v)}`)
  const trailing = useCountUp(6.2, S1_KPIS + 0.45, (v) => `$${v.toFixed(1)}M`)

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-2xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: S1_WINDOW, duration: 0.5 }}
        >
          <AppWindow title="Quiet AI · Sales Analytics">
            <div className="space-y-3">
              <div className="text-xs text-gray-500">
                Upload quarterly sales and see accounts, reps, and churn in one view.
              </div>

              {/* Workbook row */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: S1_FILE, duration: 0.35 }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-600"
              >
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900 font-mono text-[11px]">
                  sales_by_quarter_2024-2025.xlsx
                </span>
                <SpinnerCheck checkDelay={S1_FILE_DONE} />
                <SwapText
                  before="Reading 6 quarterly sheets"
                  after="6 quarters parsed · Q1 2024 to Q2 2025"
                  delay={S1_FILE_DONE}
                />
              </motion.div>

              {/* Sheet tab chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {SHEET_TABS.map((tab, i) => (
                  <motion.span
                    key={tab}
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: S1_SHEETS + i * 0.15, duration: 0.3, ease: 'backOut' }}
                    className="inline-flex px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[10px] font-medium text-blue-700 tabular-nums"
                  >
                    {tab}
                  </motion.span>
                ))}
              </div>

              {/* Parsed KPIs */}
              <div className="grid grid-cols-4 gap-2">
                <UploadStatCard label="Accounts" value={<motion.span>{accounts}</motion.span>} delay={S1_KPIS} />
                <UploadStatCard label="Salespeople" value={<motion.span>{reps}</motion.span>} delay={S1_KPIS + 0.1} />
                <UploadStatCard label="Quarters" value={<motion.span>{quarters}</motion.span>} delay={S1_KPIS + 0.2} />
                <UploadStatCard label="Trailing annual" value={<motion.span>{trailing}</motion.span>} delay={S1_KPIS + 0.3} />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: S1_MATCH, duration: 0.4 }}
                className="text-[10px] text-gray-500"
              >
                Account names matched across quarters · blank reps pooled into Unassigned
              </motion.div>
            </div>
          </AppWindow>
        </motion.div>

        <StatusPill
          delay={S1_PILL}
          text="Mapping accounts and salespeople across 6 quarters"
          checkDelay={S1_PILL_CHECK}
        />
      </div>
    </div>
  )
}

// ===== Scene 2: Account trends =====
const S2_TABS = 0.3
const S2_HEADER = S2_TABS + 0.3
const S2_ROWS = S2_HEADER + 0.3
const S2_ROW_STAGGER = 0.15
const S2_FOCUS = 4.4
const S2_CURSOR = S2_FOCUS + 0.3
const S2_CLICK = S2_CURSOR + 1.2
const S2_CARD = S2_CLICK + 0.3
const S2_AXES = S2_CARD + 0.5
const S2_LINE = S2_AXES + 0.4
const S2_PEAK = S2_LINE + 1.4
const S2_DROP = S2_PEAK + 0.4
const S2_PILL = 9.6
const S2_PILL_CHECK = S2_PILL + 1.0

function AccountRowItem({ row, index }: { row: AccountRow; index: number }) {
  const rowDelay = S2_ROWS + index * S2_ROW_STAGGER
  const isFocus = row.name === 'Prairie Foods Wholesale'
  const focusFlash = flashBg(S2_FOCUS, 2.0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rowDelay, duration: 0.35 }}
    >
      <motion.div
        initial={isFocus ? focusFlash.initial : undefined}
        animate={isFocus ? focusFlash.animate : undefined}
        transition={isFocus ? focusFlash.transition : undefined}
        className={`relative ${PIVOT_GRID} px-2 py-1 rounded-md`}
      >
        <div className="text-[11px] font-medium text-gray-900 truncate">{row.name}</div>
        <div className="text-right text-[10px] font-semibold text-gray-900 tabular-nums">
          ${row.trailing}K
        </div>
        <div className="text-[10px] text-gray-600">{row.rep}</div>
        {row.cells.map(([revenue, delta], q) => (
          <div key={q} className="flex flex-col items-end gap-px">
            <span className="text-[10px] text-gray-900 tabular-nums">{moneyK(revenue)}</span>
            {delta !== null ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowDelay + 0.8, duration: 0.3 }}
                className={`text-[9px] font-medium tabular-nums ${delta < 0 ? 'text-red-600' : 'text-green-600'}`}
              >
                {deltaK(delta)}
              </motion.span>
            ) : (
              <span className="text-[9px] text-gray-300">·</span>
            )}
          </div>
        ))}
        {isFocus && (
          <CursorClick cursorDelay={S2_CURSOR} clickDelay={S2_CLICK} fromX={180} fromY={70} ringClass="w-16 h-16 border-blue-500" />
        )}
      </motion.div>
    </motion.div>
  )
}

function SceneAccounts() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AppWindow title="Quiet AI · Sales Analytics">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <TabStrip active="By account" delay={S2_TABS} />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: S2_TABS + 0.2, duration: 0.35 }}
                  className="text-[10px] text-gray-500"
                >
                  Sorted by <span className="font-medium text-gray-700">trailing annual ↓</span>
                </motion.span>
              </div>

              {/* Pivot table */}
              <div className="space-y-0.5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: S2_HEADER, duration: 0.35 }}
                  className={`${PIVOT_GRID} px-2 text-[10px] font-medium text-gray-500`}
                >
                  <div>Account</div>
                  <div className="text-right">Trailing</div>
                  <div>Rep</div>
                  {QUARTERS.map((q) => (
                    <div key={q} className="text-right tabular-nums">
                      {q}
                    </div>
                  ))}
                </motion.div>

                {ACCOUNT_ROWS.map((row, i) => (
                  <AccountRowItem key={row.name} row={row} index={i} />
                ))}
              </div>
            </div>
          </AppWindow>
        </motion.div>

        {/* Account trend dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: S2_CARD, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-xl border border-gray-200 shadow-xl p-4 space-y-3"
        >
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <span className="text-xs font-semibold text-gray-900">Prairie Foods Wholesale</span>
              <span className="ml-2 text-xs text-gray-500">Rep: Tom</span>
            </div>
            <div className="text-[10px] text-gray-400">
              $296K trailing annual · quarterly revenue Q1 2024 to Q2 2025
            </div>
          </div>

          <QuarterTrendChart
            axesDelay={S2_AXES}
            lineDelay={S2_LINE}
            peakDelay={S2_PEAK}
            dropDelay={S2_DROP}
          />
        </motion.div>

        <StatusPill
          delay={S2_PILL}
          text="Prairie Foods has slipped three straight quarters"
          checkDelay={S2_PILL_CHECK}
        />
      </div>
    </div>
  )
}

// ===== Scene 3: Rep performance =====
const S3_TABS = 0.3
const S3_CURSOR = S3_TABS + 0.3
const S3_CLICK = S3_CURSOR + 0.9
const S3_ROWS = S3_CLICK + 0.4
const S3_ROW_STAGGER = 0.12
const S3_TOG_CURSOR = 3.4
const S3_TOG_CLICK = S3_TOG_CURSOR + 0.8
const S3_BADGES = S3_TOG_CLICK + 0.4
const S3_CELL_FLASH = 5.4
const S3_CELL_CURSOR = 5.6
const S3_CELL_CLICK = S3_CELL_CURSOR + 1.0
const S3_MODAL = S3_CELL_CLICK + 0.3
const S3_MODAL_ROWS = S3_MODAL + 0.3
const S3_PILL = 9.2
const S3_PILL_CHECK = S3_PILL + 1.0

const BASES = ['Revenue', 'Accounts']

function RepRowItem({ row, index }: { row: RepRow; index: number }) {
  const rowDelay = S3_ROWS + index * S3_ROW_STAGGER
  const isTom = row.name === 'Tom'
  const cellFlash = flashBg(S3_CELL_FLASH, 1.8)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rowDelay, duration: 0.35 }}
      className={`${REP_GRID} px-2 py-1 rounded-md`}
    >
      <div className={`text-[11px] truncate ${row.unassigned ? 'italic text-gray-400' : 'font-medium text-gray-900'}`}>
        {row.name}
      </div>
      {QUARTERS.map((_, q) => {
        const isLast = q === QUARTERS.length - 1
        const showBadges = isLast && (row.gained > 0 || row.lost > 0)
        const flashCell = isTom && isLast
        return (
          <motion.div
            key={q}
            initial={flashCell ? cellFlash.initial : undefined}
            animate={flashCell ? cellFlash.animate : undefined}
            transition={flashCell ? cellFlash.transition : undefined}
            className="relative flex items-center justify-end gap-1 rounded px-1 py-0.5"
          >
            {showBadges && (
              <span className="flex items-center gap-0.5">
                {row.gained > 0 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: S3_BADGES + index * 0.1, duration: 0.3, ease: 'backOut' }}
                    className="inline-flex px-1 py-px rounded-full border bg-green-50 border-green-200 text-[9px] font-medium text-green-700 tabular-nums"
                  >
                    +{row.gained}
                  </motion.span>
                )}
                {row.lost > 0 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: S3_BADGES + index * 0.1 + 0.1, duration: 0.3, ease: 'backOut' }}
                    className="inline-flex px-1 py-px rounded-full border bg-red-50 border-red-200 text-[9px] font-medium text-red-700 tabular-nums"
                  >
                    -{row.lost}
                  </motion.span>
                )}
              </span>
            )}
            <span className="text-[10px] text-gray-900 tabular-nums text-right">
              <SwapText
                before={moneyK(row.revenue[q])}
                after={`${row.accounts[q]}`}
                delay={S3_TOG_CLICK + 0.2}
              />
            </span>
            {flashCell && (
              <CursorClick cursorDelay={S3_CELL_CURSOR} clickDelay={S3_CELL_CLICK} fromX={120} fromY={-60} />
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function SceneReps() {
  const [tab, setTab] = useState('By account')
  const [basis, setBasis] = useState('Revenue')

  useEffect(() => {
    const t1 = setTimeout(() => setTab('By salesperson'), S3_CLICK * 1000)
    const t2 = setTimeout(() => setBasis('Accounts'), S3_TOG_CLICK * 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AppWindow title="Quiet AI · Sales Analytics">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <TabStrip
                  active={tab}
                  delay={S3_TABS}
                  cursorTarget="By salesperson"
                  cursorDelay={S3_CURSOR}
                  clickDelay={S3_CLICK}
                />
                {/* Revenue / Accounts basis toggle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: S3_TABS + 0.2, duration: 0.35 }}
                  className="flex items-center gap-1 p-0.5 rounded-lg bg-gray-100"
                >
                  {BASES.map((b) => {
                    const isActive = b === basis
                    const isTarget = b === 'Accounts'
                    return (
                      <div
                        key={b}
                        className={`relative px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors duration-300 ${
                          isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500'
                        }`}
                      >
                        {b}
                        {isTarget && (
                          <CursorClick cursorDelay={S3_TOG_CURSOR} clickDelay={S3_TOG_CLICK} fromX={-120} fromY={70} />
                        )}
                      </div>
                    )
                  })}
                </motion.div>
              </div>

              {/* Salesperson pivot */}
              <div className="space-y-0.5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: S3_CLICK + 0.2, duration: 0.35 }}
                  className={`${REP_GRID} px-2 text-[10px] font-medium text-gray-500`}
                >
                  <div>Salesperson</div>
                  {QUARTERS.map((q) => (
                    <div key={q} className="text-right tabular-nums">
                      {q}
                    </div>
                  ))}
                </motion.div>

                {REP_ROWS.map((row, i) => (
                  <RepRowItem key={row.name} row={row} index={i} />
                ))}
              </div>
            </div>
          </AppWindow>
        </motion.div>

        {/* Salesperson-quarter drill-down */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: S3_MODAL, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-xl border border-gray-200 shadow-xl p-4 space-y-2"
        >
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <span className="text-xs font-semibold text-gray-900">Tom · Q2 2025</span>
            <span className="text-[10px] text-gray-400">14 accounts · $131.2K attributed revenue</span>
          </div>

          <div className={`${MODAL_GRID} px-1 text-[9px] font-medium text-gray-400`}>
            <div>Account</div>
            <div className="text-right">Revenue</div>
            <div className="text-right">Prior quarter</div>
            <div className="text-right">Change</div>
          </div>

          {TOM_MODAL_ROWS.map((row, i) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: S3_MODAL_ROWS + i * 0.15, duration: 0.3 }}
              className={`${MODAL_GRID} px-1 py-0.5 text-[11px]`}
            >
              <div className="font-medium text-gray-900 truncate">{row.name}</div>
              <div className="text-right text-gray-900 tabular-nums">
                {row.revenue !== null ? moneyK(row.revenue) : <span className="text-gray-300">·</span>}
              </div>
              <div className="text-right text-gray-500 tabular-nums">{moneyK(row.prior)}</div>
              <div className="flex justify-end">
                {row.delta !== null ? (
                  <span className={`font-medium tabular-nums ${row.delta < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {deltaK(row.delta)}
                  </span>
                ) : (
                  <span className="inline-flex px-1.5 py-px rounded-full border bg-red-50 border-red-200 text-[9px] font-medium text-red-700">
                    Lost
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: S3_MODAL_ROWS + TOM_MODAL_ROWS.length * 0.15, duration: 0.3 }}
            className="px-1 text-[10px] text-gray-400 italic"
          >
            and 9 more accounts
          </motion.div>
        </motion.div>

        <StatusPill
          delay={S3_PILL}
          text="Tom lost three accounts this quarter, two churned outright"
          checkDelay={S3_PILL_CHECK}
        />
      </div>
    </div>
  )
}

// ===== Scene 4: Account changes =====
const S4_HEAD = 0.3
const S4_CHURN = S4_HEAD + 0.6
const S4_CHURN_ROWS = S4_CHURN + 0.3
const S4_NEW = 2.6
const S4_NEW_ROWS = S4_NEW + 0.3
const S4_SUM = 4.6
const S4_FLASH = 5.4
const S4_PILL = 6.6
const S4_PILL_CHECK = S4_PILL + 1.3

const CHURN_GRID = 'grid grid-cols-[minmax(0,1fr)_56px_38px_50px] gap-1.5 items-center'
const NEW_GRID = 'grid grid-cols-[minmax(0,1fr)_46px_50px] gap-1.5 items-center'

const QUARTER_PILLS = ['Q4 2024', 'Q1 2025', 'Q2 2025']

function SceneChanges() {
  const net = useCountUp(13.7, S4_SUM + 0.2, (v) => `+$${v.toFixed(1)}K`)

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        {/* Header with quarter selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: S4_HEAD, duration: 0.4 }}
          className="flex items-center justify-between gap-2"
        >
          <span className="text-xs font-semibold text-gray-900">Account changes</span>
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-gray-100">
            {QUARTER_PILLS.map((q) => (
              <span
                key={q}
                className={`px-2.5 py-1 rounded-md text-[10px] font-medium tabular-nums ${
                  q === 'Q2 2025' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500'
                }`}
              >
                {q}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 items-stretch">
          {/* Churned accounts */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: S4_CHURN, duration: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <UserMinus className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                Churned accounts · 3
              </span>
            </div>
            <div className={`${CHURN_GRID} px-1 text-[9px] font-medium text-gray-400`}>
              <div>Account</div>
              <div className="text-right">Last live</div>
              <div className="text-right">Rep</div>
              <div className="text-right">Revenue</div>
            </div>
            {CHURNED_ROWS.map((row, i) => {
              const isTom = row.rep === 'Tom'
              const rowFlash = flashBg(S4_FLASH, 1.6)
              return (
                <motion.div
                  key={row.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: S4_CHURN_ROWS + i * 0.15, duration: 0.3 }}
                >
                  <motion.div
                    initial={isTom ? rowFlash.initial : undefined}
                    animate={isTom ? rowFlash.animate : undefined}
                    transition={isTom ? rowFlash.transition : undefined}
                    className={`${CHURN_GRID} px-1 py-1 rounded text-[11px]`}
                  >
                    <div className="font-medium text-gray-900 truncate">{row.name}</div>
                    <div className="text-right text-gray-500 tabular-nums text-[10px]">{row.lastLive}</div>
                    <div className="text-right text-gray-600 text-[10px]">{row.rep}</div>
                    <div className="text-right text-gray-900 tabular-nums">{row.revenue}</div>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* New accounts */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: S4_NEW, duration: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <UserPlus className="w-3.5 h-3.5 text-green-600" />
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">
                New accounts · 2
              </span>
            </div>
            <div className={`${NEW_GRID} px-1 text-[9px] font-medium text-gray-400`}>
              <div>Account</div>
              <div className="text-right">Rep</div>
              <div className="text-right">Revenue</div>
            </div>
            {NEW_ROWS.map((row, i) => (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: S4_NEW_ROWS + i * 0.15, duration: 0.3 }}
                className={`${NEW_GRID} px-1 py-1 rounded text-[11px]`}
              >
                <div className="font-medium text-gray-900 truncate">{row.name}</div>
                <div className="text-right text-gray-600 text-[10px]">{row.rep}</div>
                <div className="text-right text-gray-900 tabular-nums">{row.revenue}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Net summary */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: S4_SUM, duration: 0.4 }}
          className="flex items-center justify-center gap-1.5 text-[10px] text-gray-600 tabular-nums"
        >
          3 churned ($40.6K) · 2 new ($54.3K) · net{' '}
          <motion.span className="font-semibold text-green-600">{net}</motion.span> this quarter
        </motion.div>

        <StatusPill
          delay={S4_PILL}
          text="Churn gets flagged the quarter it happens, not at year end"
          checkDelay={S4_PILL_CHECK}
        />
      </div>
    </div>
  )
}

// ===== Scene 5: SKU trends =====
const S5_HEAD = 0.3
const S5_ROWS = S5_HEAD + 0.4
const S5_ROW_STAGGER = 0.15
const S5_FOCUS = 3.2
const S5_CURSOR = S5_FOCUS + 0.2
const S5_CLICK = S5_CURSOR + 1.0
const S5_CARD = S5_CLICK + 0.3
const S5_BARS = S5_CARD + 0.5
const S5_CALLOUT = 7.6
const S5_PILL = 8.6
const S5_PILL_CHECK = S5_PILL + 1.0

function SkuRowItem({ row, index }: { row: SkuRow; index: number }) {
  const rowDelay = S5_ROWS + index * S5_ROW_STAGGER
  const isFocus = row.sku === 'CB-32'
  const focusFlash = flashBg(S5_FOCUS, 1.8)
  const up = row.yoy >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rowDelay, duration: 0.35 }}
    >
      <motion.div
        initial={isFocus ? focusFlash.initial : undefined}
        animate={isFocus ? focusFlash.animate : undefined}
        transition={isFocus ? focusFlash.transition : undefined}
        className={`relative ${SKU_GRID} px-2 py-1.5 rounded-md`}
      >
        <div className="font-mono text-[10px] text-gray-700">{row.sku}</div>
        <div className="text-[11px] font-medium text-gray-900 truncate">{row.name}</div>
        <div className="text-right text-[10px] font-semibold text-gray-900 tabular-nums">
          ${row.trailing}K
        </div>
        <Sparkline values={row.spark} delay={rowDelay + 0.3} stroke={up ? COBALT : '#9ba5b0'} />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: rowDelay + 0.9, duration: 0.3, ease: 'backOut' }}
          className="flex justify-end"
        >
          <span
            className={`inline-flex px-1.5 py-px rounded-full border text-[9px] font-medium tabular-nums whitespace-nowrap ${
              up ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {up ? '+' : ''}
            {row.yoy}% YoY
          </span>
        </motion.div>
        {isFocus && (
          <CursorClick cursorDelay={S5_CURSOR} clickDelay={S5_CLICK} fromX={180} fromY={70} ringClass="w-16 h-16 border-blue-500" />
        )}
      </motion.div>
    </motion.div>
  )
}

function SceneSkus() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AppWindow title="Quiet AI · Sales Analytics">
            <div className="space-y-2.5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: S5_HEAD, duration: 0.35 }}
                className="flex items-center justify-between gap-2 flex-wrap"
              >
                <span className="text-xs font-semibold text-gray-900">Product trends</span>
                <span className="inline-flex px-2 py-0.5 rounded-full border bg-blue-50 border-blue-100 text-[10px] font-medium text-blue-700">
                  By SKU · trailing 12 months
                </span>
              </motion.div>

              <div className="space-y-0.5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: S5_HEAD + 0.2, duration: 0.35 }}
                  className={`${SKU_GRID} px-2 text-[10px] font-medium text-gray-500`}
                >
                  <div>SKU</div>
                  <div>Name</div>
                  <div className="text-right">Revenue</div>
                  <div>Trend</div>
                  <div className="text-right">vs last year</div>
                </motion.div>

                {SKU_ROWS.map((row, i) => (
                  <SkuRowItem key={row.sku} row={row} index={i} />
                ))}
              </div>
            </div>
          </AppWindow>
        </motion.div>

        {/* SKU detail with monthly bars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: S5_CARD, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-xl border border-gray-200 shadow-xl p-4 space-y-2"
        >
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <span className="font-mono text-xs font-semibold text-gray-900">CB-32</span>
              <span className="ml-2 text-xs text-gray-500">Cold Brew Concentrate 32oz</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: S5_CALLOUT, duration: 0.35, ease: 'backOut' }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border bg-green-50 border-green-200 text-[9px] font-semibold text-green-700"
              >
                <TrendingUp className="w-2.5 h-2.5" />
                Up 38% on last year
              </motion.span>
              <span className="text-[10px] text-gray-400">$412K trailing 12 months</span>
            </div>
          </div>

          {/* Monthly revenue bars */}
          <div className="flex items-end gap-1 h-24">
            {CB32_MONTHS.map((v, i) => {
              const isLast = i === CB32_MONTHS.length - 1
              return (
                <div key={i} className="relative flex-1 h-full flex flex-col justify-end">
                  {isLast && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: S5_CALLOUT, duration: 0.4 }}
                      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                      style={{ bottom: `${(v / CB32_MAX) * 100}%` }}
                    >
                      <div className="relative w-2.5 h-2.5 -translate-y-2">
                        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
                        <span className="absolute inset-0 rounded-full bg-green-500 border-2 border-white shadow" />
                      </div>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ height: '0%' }}
                    animate={{ height: `${(v / CB32_MAX) * 100}%` }}
                    transition={{ delay: S5_BARS + i * 0.06, duration: 0.7, ease: 'easeOut' }}
                    className={`w-full rounded-t-[3px] ${isLast ? 'bg-blue-600' : 'bg-blue-500/70'}`}
                  />
                </div>
              )
            })}
          </div>
          <div className="flex gap-1">
            {MONTH_LABELS.map((m, i) => (
              <motion.div
                key={m}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: S5_BARS + 0.4, duration: 0.4 }}
                className="flex-1 text-center text-[8px] text-gray-400"
              >
                {i % 2 === 0 ? m : ''}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <StatusPill
          delay={S5_PILL}
          text="Cold brew concentrate is driving growth, up 38% year over year"
          checkDelay={S5_PILL_CHECK}
        />
      </div>
    </div>
  )
}

// ===== Main exported component =====
function SalesAnalyticsAnimation({ sceneIndex }: { sceneIndex: number }) {
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
          {sceneIndex === 0 && <SceneUpload />}
          {sceneIndex === 1 && <SceneAccounts />}
          {sceneIndex === 2 && <SceneReps />}
          {sceneIndex === 3 && <SceneChanges />}
          {sceneIndex === 4 && <SceneSkus />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SalesAnalyticsAnimation
