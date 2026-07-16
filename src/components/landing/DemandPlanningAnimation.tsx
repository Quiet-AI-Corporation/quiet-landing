import { useEffect, useId, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import {
  AlertTriangle,
  Check,
  ClipboardList,
  Factory,
  FileSpreadsheet,
  FileText,
  Loader2,
  MousePointer2,
  Package,
} from 'lucide-react'
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
    id: 'import',
    label: 'Import history',
    caption: 'Quiet AI imports your sales history and inventory snapshot, then you pick a planning horizon.',
    duration: 9,
  },
  {
    id: 'plan',
    label: 'Plan computed',
    caption: 'Every SKU gets a forecast from three years of seasonality, netted against what you have on hand.',
    duration: 10.5,
  },
  {
    id: 'sku',
    label: 'SKU detail',
    caption: 'Drill into any SKU to see its demand history, the forecast, and the day it runs out.',
    duration: 11,
  },
  {
    id: 'orders',
    label: 'Suggested orders',
    caption: 'Purchasing recommendations grouped by the week you need to order, with lead times baked in.',
    duration: 9.5,
  },
  {
    id: 'act',
    label: 'Draft POs & builds',
    caption: 'Work orders for what you build, draft POs for what you buy, posted to your ERP for approval.',
    duration: 9,
  },
]

const units = new Intl.NumberFormat('en-US')

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

// Animated count-up integer value
function useCountUp(target: number, delay: number, prefix = '') {
  const mv = useMotionValue(0)
  const formatted = useTransform(mv, (v) => `${prefix}${units.format(Math.round(v))}`)
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

// ===== Status / type pills =====
const PILL_STYLES = {
  Deficit: 'bg-red-50 text-red-700 border-red-200',
  Surplus: 'bg-green-50 text-green-700 border-green-200',
  Balanced: 'bg-gray-50 text-gray-600 border-gray-200',
  Assembled: 'bg-blue-50 text-blue-700 border-blue-200',
  Purchased: 'bg-gray-50 text-gray-600 border-gray-200',
} as const

const PILL_DOTS = {
  Deficit: 'bg-red-500',
  Surplus: 'bg-green-500',
  Balanced: 'bg-gray-400',
} as const

function Pill({ kind, dot = false }: { kind: keyof typeof PILL_STYLES; dot?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-px rounded-full border text-[9px] font-medium whitespace-nowrap ${PILL_STYLES[kind]}`}
    >
      {dot && kind in PILL_DOTS && (
        <span className={`w-1 h-1 rounded-full ${PILL_DOTS[kind as keyof typeof PILL_DOTS]}`} />
      )}
      {kind}
    </span>
  )
}

// ===== Plan table data =====
type PlanLine = {
  sku: string
  name: string
  onHand: number
  forecast: number
  delta: number
  status: 'Deficit' | 'Surplus' | 'Balanced'
}

const PLAN_ROWS: PlanLine[] = [
  { sku: 'TP-1043', name: 'USB-C Hub 7-Port, Space Gray', onHand: 1240, forecast: 3120, delta: -1880, status: 'Deficit' },
  { sku: 'PWR-2210', name: 'GaN Charger 65W, White', onHand: 380, forecast: 2050, delta: -1670, status: 'Deficit' },
  { sku: 'MSE-1201', name: 'Wireless Mouse Pro, Black', onHand: 910, forecast: 1480, delta: -570, status: 'Deficit' },
  { sku: 'CBL-3355', name: 'USB-C Cable 2m, Braided', onHand: 4620, forecast: 4410, delta: 210, status: 'Balanced' },
  { sku: 'KBD-8804', name: 'Mechanical Keyboard RGB, White', onHand: 1105, forecast: 1090, delta: 15, status: 'Balanced' },
  { sku: 'ACC-4102', name: 'Laptop Stand, Aluminum', onHand: 2340, forecast: 1120, delta: 1220, status: 'Surplus' },
]

const PLAN_GRID = 'grid grid-cols-[72px_1fr_64px_88px_72px_84px] gap-2 items-center'

// ===== Suggested orders data =====
type OrderLine = {
  sku: string
  name: string
  qty: number
  orderBy: string
  neededBy: string
}

const ORDER_GROUPS: { heading: string; pastDue?: boolean; rows: OrderLine[] }[] = [
  {
    heading: 'Order now · already past due',
    pastDue: true,
    rows: [
      { sku: 'PWR-2210', name: 'GaN Charger 65W, White', qty: 1670, orderBy: 'Jul 11', neededBy: 'Aug 22' },
      { sku: 'MSE-1201', name: 'Wireless Mouse Pro, Black', qty: 570, orderBy: 'Jul 14', neededBy: 'Aug 11' },
    ],
  },
  {
    heading: 'Week of Jul 21',
    rows: [
      { sku: 'TP-1043', name: 'USB-C Hub 7-Port, Space Gray', qty: 1880, orderBy: 'Jul 25', neededBy: 'Sep 8' },
      { sku: 'HDM-3310', name: 'HDMI Cable 8K, 2m', qty: 640, orderBy: 'Jul 24', neededBy: 'Aug 28' },
    ],
  },
  {
    heading: 'Week of Jul 28',
    rows: [
      { sku: 'KVM-6620', name: 'KVM Switch 4-Port, Black', qty: 320, orderBy: 'Jul 30', neededBy: 'Sep 15' },
      { sku: 'WBC-9107', name: 'Webcam Gen 3, Black', qty: 410, orderBy: 'Jul 31', neededBy: 'Sep 18' },
    ],
  },
]

const ORDER_GRID = 'grid grid-cols-[68px_1fr_72px_64px_66px] gap-2 items-center'

// ===== Demand chart data =====
// 36 months of demand history, Jul 2022 - Jun 2025, with Q4 seasonal peaks
// and modest year-over-year growth.
const MONTHLY_DEMAND = [
  760, 740, 840, 1160, 1680, 1840, 960, 800, 840, 880, 860, 820,
  840, 820, 940, 1280, 1800, 1980, 1040, 880, 940, 960, 940, 900,
  940, 900, 1040, 1400, 1920, 2120, 1140, 960, 1020, 1060, 1020, 980,
]

// Monthly sales track demand with a small deterministic wobble
const MONTHLY_SALES = MONTHLY_DEMAND.map((v, i) => Math.round(v * (0.9 + ((i * 7) % 5) * 0.05)))

// Forecast for Jul - Oct 2025, continuing the seasonal shape
const FORECAST = [1000, 990, 1060, 1420]

const CHART_MONTHS = MONTHLY_DEMAND.length + FORECAST.length // 40
const LINE_MAX = 2400
const ON_HAND = 1240

const chartX = (i: number) => ((i + 0.5) / CHART_MONTHS) * 100
const chartY = (v: number) => 96 - (v / LINE_MAX) * 88

function seriesPath(values: number[], startIdx = 0): string {
  return (
    'M' +
    values.map((v, i) => `${chartX(startIdx + i).toFixed(2)},${chartY(v).toFixed(2)}`).join(' L')
  )
}

const HISTORY_PATH = seriesPath(MONTHLY_DEMAND)
const SALES_PATH = seriesPath(MONTHLY_SALES)
const FORECAST_PATH = seriesPath([MONTHLY_DEMAND[MONTHLY_DEMAND.length - 1], ...FORECAST], MONTHLY_DEMAND.length - 1)

const TODAY_PCT = (MONTHLY_DEMAND.length / CHART_MONTHS) * 100 // 90
const RUNOUT_PCT = 96 // early Sep 2025

const CHART_Y_LABELS = [
  { v: 2000, label: '2,000' },
  { v: 1000, label: '1,000' },
  { v: 0, label: '0' },
]

const CHART_X_LABELS = [
  { i: 0, label: "Jul '22" },
  { i: 6, label: "Jan '23" },
  { i: 12, label: "Jul '23" },
  { i: 18, label: "Jan '24" },
  { i: 24, label: "Jul '24" },
  { i: 30, label: "Jan '25" },
  { i: 36, label: "Jul '25" },
]

const COBALT = '#2b59c3'
const AMBER = '#daa43e'

function DemandChart({
  axesDelay,
  historyDelay,
  salesDelay,
  forecastDelay,
  onHandDelay,
  runoutDelay,
  heightClass,
}: {
  axesDelay: number
  historyDelay: number
  salesDelay: number
  forecastDelay: number
  onHandDelay: number
  runoutDelay: number
  heightClass: string
}) {
  const rawId = useId().replace(/:/g, 'c')
  const historyClip = `${rawId}-history`
  const salesClip = `${rawId}-sales`
  const forecastClip = `${rawId}-forecast`

  return (
    <div className={`relative ${heightClass}`}>
      {/* Y axis labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: axesDelay, duration: 0.4 }}
        className="absolute top-0 bottom-5 left-0 w-9"
      >
        {CHART_Y_LABELS.map((yl) => (
          <div
            key={yl.label}
            className="absolute right-1 -translate-y-1/2 text-[9px] text-gray-400 tabular-nums"
            style={{ top: `${chartY(yl.v)}%` }}
          >
            {yl.label}
          </div>
        ))}
      </motion.div>

      {/* Plot area */}
      <div className="absolute top-0 bottom-5 left-9 right-1">
        {/* Gridlines */}
        {CHART_Y_LABELS.map((yl) => (
          <motion.div
            key={yl.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: axesDelay, duration: 0.4 }}
            className={`absolute left-0 right-0 border-t ${yl.v === 0 ? 'border-gray-300' : 'border-dashed border-gray-200'}`}
            style={{ top: `${chartY(yl.v)}%` }}
          />
        ))}

        {/* X labels */}
        {CHART_X_LABELS.map((xl) => (
          <motion.div
            key={xl.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: axesDelay, duration: 0.4 }}
            className="absolute -bottom-4 -translate-x-1/2 text-[8px] text-gray-400 whitespace-nowrap"
            style={{ left: `${chartX(xl.i)}%` }}
          >
            {xl.label}
          </motion.div>
        ))}

        {/* Lines, revealed left to right via clip-path.
            (pathLength draw-on is unusable here: its stroke-dasharray breaks
            under non-scaling-stroke + preserveAspectRatio="none".) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <clipPath id={historyClip}>
            <motion.rect
              x={-2}
              y={-10}
              height={120}
              initial={{ width: 0 }}
              animate={{ width: TODAY_PCT + 2 }}
              transition={{ delay: historyDelay, duration: 1.4, ease: 'easeInOut' }}
            />
          </clipPath>
          <clipPath id={salesClip}>
            <motion.rect
              x={-2}
              y={-10}
              height={120}
              initial={{ width: 0 }}
              animate={{ width: TODAY_PCT + 2 }}
              transition={{ delay: salesDelay, duration: 1.0, ease: 'easeInOut' }}
            />
          </clipPath>
          <clipPath id={forecastClip}>
            <motion.rect
              x={chartX(MONTHLY_DEMAND.length - 1) - 1}
              y={-10}
              height={120}
              initial={{ width: 0 }}
              animate={{ width: 14 }}
              transition={{ delay: forecastDelay, duration: 0.8, ease: 'easeInOut' }}
            />
          </clipPath>
          <g clipPath={`url(#${salesClip})`}>
            <path
              d={SALES_PATH}
              fill="none"
              stroke={AMBER}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g clipPath={`url(#${historyClip})`}>
            <path
              d={HISTORY_PATH}
              fill="none"
              stroke={COBALT}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g clipPath={`url(#${forecastClip})`}>
            <path
              d={FORECAST_PATH}
              fill="none"
              stroke={COBALT}
              strokeWidth={2}
              strokeDasharray="1.6 1.3"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        {/* Today divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: forecastDelay - 0.3, duration: 0.4 }}
          className="absolute top-0 bottom-0 border-l border-dashed border-gray-300 pointer-events-none"
          style={{ left: `${TODAY_PCT}%` }}
        >
          <span className="absolute top-0 -left-8 px-1 rounded bg-white/90 text-[8px] text-gray-400 whitespace-nowrap">
            Today
          </span>
        </motion.div>

        {/* On hand reference line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: onHandDelay, duration: 0.6, ease: 'easeOut' }}
          className="absolute left-0 right-0 border-t-2 border-dashed border-gray-400 pointer-events-none"
          style={{ top: `${chartY(ON_HAND)}%`, transformOrigin: 'left' }}
        >
          <span className="absolute left-0 -top-4 px-1 rounded bg-white/90 text-[9px] font-medium text-gray-500 tabular-nums">
            On hand 1,240
          </span>
        </motion.div>

        {/* Runs-out marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: runoutDelay, duration: 0.5, ease: 'easeInOut' }}
          className="absolute pointer-events-none"
          style={{
            top: `${chartY(ON_HAND)}%`,
            left: `${RUNOUT_PCT}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-red-400 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-red-500 border-2 border-white shadow" />
          </div>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1 rounded bg-white/90 shadow-sm text-[9px] font-semibold text-red-600 whitespace-nowrap">
            Runs out Sep 8
          </span>
        </motion.div>
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
        <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: COBALT }} />
        Demand history
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: AMBER }} />
        Sales (monthly)
      </span>
      <span className="inline-flex items-center gap-1">
        <span
          className="w-3 border-t-2 border-dashed"
          style={{ borderColor: COBALT }}
        />
        Forecast
      </span>
    </motion.div>
  )
}

// ===== Scene 1: Import history =====
const S1_WINDOW = 0.3
const S1_FILE1 = S1_WINDOW + 0.5
const S1_FILE1_DONE = S1_FILE1 + 0.9
const S1_FILE2 = S1_FILE1_DONE + 0.4
const S1_FILE2_DONE = S1_FILE2 + 0.9
const S1_CONFIG = S1_FILE2_DONE + 0.6
const S1_CURSOR = S1_CONFIG + 0.8
const S1_CLICK = S1_CURSOR + 1.2
const S1_BTN = S1_CLICK + 0.5
const S1_COMPUTE = S1_BTN + 1.1
const S1_PILL = S1_COMPUTE + 0.4

const HORIZONS = ['Next 4 weeks', 'Next 8 weeks', 'Next 13 weeks']

function SceneImport() {
  const [horizon, setHorizon] = useState('Next 4 weeks')

  useEffect(() => {
    const t = setTimeout(() => setHorizon('Next 13 weeks'), S1_CLICK * 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-2xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: S1_WINDOW, duration: 0.5 }}
        >
          <AppWindow title="Quiet AI · Demand Planning">
            <div className="space-y-3">
              <div className="text-xs text-gray-500">
                Forecast demand from sales history and see what to manufacture.
              </div>

              {/* Import rows */}
              <div className="space-y-1.5">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: S1_FILE1, duration: 0.35 }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-600"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900 font-mono text-[11px]">
                    demand_history_2022-2025.csv
                  </span>
                  <SpinnerCheck checkDelay={S1_FILE1_DONE} />
                  <SwapText
                    before="Importing demand history"
                    after="36 months parsed · 812 SKUs"
                    delay={S1_FILE1_DONE}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: S1_FILE2, duration: 0.35 }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-600"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Package className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900 font-mono text-[11px]">
                    inventory_snapshot.xlsx
                  </span>
                  <SpinnerCheck checkDelay={S1_FILE2_DONE} />
                  <SwapText
                    before="Reading on-hand quantities"
                    after="On hand as of Jul 15 · 812 SKUs"
                    delay={S1_FILE2_DONE}
                  />
                </motion.div>
              </div>

              {/* Horizon + averaging config */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: S1_CONFIG, duration: 0.4 }}
                className="flex items-center justify-between gap-2 flex-wrap"
              >
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-gray-100">
                  {HORIZONS.map((h) => {
                    const isActive = h === horizon
                    const isTarget = h === 'Next 13 weeks'
                    return (
                      <div
                        key={h}
                        className={`relative px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors duration-300 ${
                          isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500'
                        }`}
                      >
                        {h}
                        {isTarget && (
                          <>
                            {/* Cursor */}
                            <motion.div
                              initial={{ x: 120, y: -60, opacity: 0 }}
                              animate={{
                                x: [120, 12, 0, 0],
                                y: [-60, -6, 0, 0],
                                opacity: [0, 1, 1, 0],
                              }}
                              transition={{
                                delay: S1_CURSOR,
                                duration: 1.7,
                                times: [0, 0.55, 0.72, 1],
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
                                animate={{ scale: [0, 1.4, 2], opacity: [0, 0.4, 0] }}
                                transition={{ delay: S1_CLICK, duration: 0.6, times: [0, 0.3, 1] }}
                                className="w-12 h-12 rounded-full border-2 border-blue-500"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="text-[10px] text-gray-500">
                  Averaging: <span className="font-medium text-gray-700">3 prior years</span>
                </div>
              </motion.div>

              {/* Compute button */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: S1_CONFIG + 0.2, duration: 0.4 }}
                className="flex justify-end"
              >
                <motion.div
                  animate={{ scale: [1, 1, 0.95, 1, 1] }}
                  transition={{ delay: S1_COMPUTE - 0.2, duration: 0.5, times: [0, 0.3, 0.5, 0.7, 1] }}
                  className="relative inline-flex"
                >
                  <div className="relative inline-flex items-center justify-center px-3.5 py-1.5 rounded-md bg-blue-600 text-white text-[11px] font-semibold">
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ delay: S1_COMPUTE, duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      Compute plan
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: S1_COMPUTE, duration: 0.25 }}
                      className="absolute inset-0 flex items-center justify-center gap-1.5"
                    >
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Computing
                    </motion.span>
                    <span className="opacity-0">Compute plan</span>

                    {/* Cursor */}
                    <motion.div
                      initial={{ x: -100, y: 40, opacity: 0 }}
                      animate={{
                        x: [-100, -10, 0, 0],
                        y: [40, 6, 0, 0],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        delay: S1_BTN,
                        duration: 1.5,
                        times: [0, 0.55, 0.73, 1],
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
                        animate={{ scale: [0, 1.4, 2], opacity: [0, 0.4, 0] }}
                        transition={{ delay: S1_COMPUTE, duration: 0.6, times: [0, 0.3, 1] }}
                        className="w-14 h-14 rounded-full border-2 border-blue-400"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </AppWindow>
        </motion.div>

        <StatusPill
          delay={S1_PILL}
          text="Averaging 3 years of seasonality per SKU and rolling up BOMs"
        />
      </div>
    </div>
  )
}

// ===== Scene 2: Plan computed =====
const S2_CARDS = 0.4
const S2_COUNT = S2_CARDS + 0.5
const S2_TABLE = S2_COUNT + 1.3
const S2_WEEKS = S2_TABLE + 0.3
const S2_ROWS = S2_TABLE + 0.6
const S2_ROW_STAGGER = 0.15
const S2_FOCUS = 7.4
const S2_PILL = 8.2
const S2_PILL_CHECK = S2_PILL + 1.4

function StatCard({
  label,
  value,
  tone,
  delay,
}: {
  label: string
  value: React.ReactNode
  tone?: 'red'
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
      <div
        className={`text-base font-semibold tabular-nums mt-0.5 ${tone === 'red' ? 'text-red-600' : 'text-gray-900'}`}
      >
        {value}
      </div>
    </motion.div>
  )
}

function PlanRowItem({ row, index }: { row: PlanLine; index: number }) {
  const rowDelay = S2_ROWS + index * S2_ROW_STAGGER
  const forecast = useCountUp(row.forecast, rowDelay + 0.2)
  const deltaDelay = rowDelay + 1.3
  const statusDelay = deltaDelay + 0.3
  const isFocus = row.sku === 'TP-1043'
  const focusFlash = flashBg(S2_FOCUS, 2.4)

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
        className={`${PLAN_GRID} px-2 py-1.5 rounded-md text-xs`}
      >
        <div className="font-mono text-[10px] text-gray-700">{row.sku}</div>
        <div className="font-medium text-gray-900 truncate">{row.name}</div>
        <div className="text-right text-gray-700 tabular-nums">{units.format(row.onHand)}</div>
        <div className="text-right font-medium text-gray-900 tabular-nums">
          <motion.span>{forecast}</motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: deltaDelay, duration: 0.3 }}
          className={`text-right font-medium tabular-nums ${row.delta < 0 ? 'text-red-600' : 'text-gray-500'}`}
        >
          {row.delta < 0 ? '' : '+'}
          {units.format(row.delta)}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: statusDelay, duration: 0.3, ease: 'backOut' }}
          className="flex justify-end"
        >
          <Pill kind={row.status} dot />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const WEEK_LABELS =
  'Jul 20 · Jul 27 · Aug 3 · Aug 10 · Aug 17 · Aug 24 · Aug 31 · Sep 7 · Sep 14 · Sep 21 · Sep 28 · Oct 5 · Oct 12'

function ScenePlan() {
  const skus = useCountUp(812, S2_COUNT)
  const deficits = useCountUp(46, S2_COUNT + 0.15)
  const surpluses = useCountUp(118, S2_COUNT + 0.3)
  const replenish = useCountUp(9340, S2_COUNT + 0.45)
  const orderNow = useCountUp(12, S2_COUNT + 0.6)

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AppWindow title="Quiet AI · Demand Planning">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: S2_CARDS, duration: 0.35 }}
                className="text-[10px] text-gray-500"
              >
                Next 13 weeks · Jul 15 to Oct 13 · averaging 3 prior years
              </motion.div>

              {/* Summary stat cards */}
              <div className="grid grid-cols-5 gap-2">
                <StatCard label="SKUs in Plan" value={<motion.span>{skus}</motion.span>} delay={S2_CARDS} />
                <StatCard label="Deficits" value={<motion.span>{deficits}</motion.span>} tone="red" delay={S2_CARDS + 0.1} />
                <StatCard label="Surpluses" value={<motion.span>{surpluses}</motion.span>} delay={S2_CARDS + 0.2} />
                <StatCard label="Units to Replenish" value={<motion.span>{replenish}</motion.span>} delay={S2_CARDS + 0.3} />
                <StatCard label="Order Now" value={<motion.span>{orderNow}</motion.span>} tone="red" delay={S2_CARDS + 0.4} />
              </div>

              {/* Weekly buckets strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: S2_WEEKS, duration: 0.4 }}
                className="relative overflow-hidden rounded-md bg-gray-50 border border-gray-100 px-2 py-1"
              >
                <div className="text-[9px] text-gray-500 tabular-nums truncate">
                  <span className="font-medium text-gray-600">13 weekly buckets</span> · {WEEK_LABELS}
                </div>
                {/* Shimmer sweep while forecasts compute */}
                <motion.div
                  initial={{ left: '-15%' }}
                  animate={{ left: '110%' }}
                  transition={{ delay: S2_WEEKS + 0.2, duration: 1.6, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-blue-100/80 to-transparent pointer-events-none"
                />
              </motion.div>

              {/* Plan table */}
              <div className="space-y-0.5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: S2_TABLE, duration: 0.35 }}
                  className={`${PLAN_GRID} px-2 text-[10px] font-medium text-gray-500`}
                >
                  <div>SKU</div>
                  <div>Name</div>
                  <div className="text-right">On Hand</div>
                  <div className="text-right">Forecast (13 wk)</div>
                  <div className="text-right">Delta</div>
                  <div className="text-right">Status</div>
                </motion.div>

                {PLAN_ROWS.map((row, i) => (
                  <PlanRowItem key={row.sku} row={row} index={i} />
                ))}
              </div>
            </div>
          </AppWindow>
        </motion.div>

        <StatusPill
          delay={S2_PILL}
          text="46 SKUs will run short inside the horizon. 12 need an order today"
          checkDelay={S2_PILL_CHECK}
        />
      </div>
    </div>
  )
}

// ===== Scene 3: SKU detail =====
const S3_ROW = 0.4
const S3_CURSOR = S3_ROW + 0.4
const S3_CLICK = S3_CURSOR + 1.2
const S3_DIALOG = S3_CLICK + 0.3
const S3_AXES = S3_DIALOG + 0.5
const S3_HISTORY = S3_AXES + 0.4
const S3_SALES = S3_HISTORY + 1.5
const S3_FORECAST = S3_SALES + 1.4
const S3_ONHAND = S3_FORECAST + 0.9
const S3_RUNOUT = S3_ONHAND + 0.5
const S3_CHIPS = S3_RUNOUT + 0.6
const S3_PILL = 9.0
const S3_PILL_CHECK = S3_PILL + 1.2

function SceneSkuDetail() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        {/* Clickable plan row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: S3_ROW, duration: 0.4 }}
        >
          <motion.div
            initial={{ backgroundColor: 'rgba(255,255,255,1)' }}
            animate={{ backgroundColor: ['rgba(255,255,255,1)', 'rgba(239,246,255,1)'] }}
            transition={{ delay: S3_CLICK, duration: 0.3 }}
            className="relative rounded-lg border border-gray-200 shadow-sm px-3 py-2"
          >
            <div className={`${PLAN_GRID} text-xs`}>
              <div className="font-mono text-[10px] text-gray-700">TP-1043</div>
              <div className="font-medium text-gray-900 truncate">USB-C Hub 7-Port, Space Gray</div>
              <div className="text-right text-gray-700 tabular-nums">1,240</div>
              <div className="text-right font-medium text-gray-900 tabular-nums">3,120</div>
              <div className="text-right font-medium text-red-600 tabular-nums">-1,880</div>
              <div className="flex justify-end">
                <Pill kind="Deficit" dot />
              </div>
            </div>

            {/* Cursor */}
            <motion.div
              initial={{ x: 180, y: 70, opacity: 0 }}
              animate={{
                x: [180, 20, 0, 0],
                y: [70, 8, 0, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                delay: S3_CURSOR,
                duration: 1.8,
                times: [0, 0.55, 0.72, 1],
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 pointer-events-none z-10"
            >
              <MousePointer2 className="w-5 h-5 text-gray-900" fill="white" strokeWidth={1.5} />
            </motion.div>
            {/* Click ripple */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.4, 2], opacity: [0, 0.35, 0] }}
                transition={{ delay: S3_CLICK, duration: 0.6, times: [0, 0.3, 1] }}
                className="w-16 h-16 rounded-full border-2 border-blue-500"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* SKU history dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: S3_DIALOG, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-xl border border-gray-200 shadow-xl p-4 space-y-3"
        >
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <span className="font-mono text-xs font-semibold text-gray-900">TP-1043</span>
              <span className="ml-2 text-xs text-gray-500">USB-C Hub 7-Port, Space Gray</span>
            </div>
            <div className="text-[10px] text-gray-400">
              1,240 on hand as of Jul 15 · demand history Jul 2022 to Jun 2025
            </div>
          </div>

          <DemandChart
            axesDelay={S3_AXES}
            historyDelay={S3_HISTORY}
            salesDelay={S3_SALES}
            forecastDelay={S3_FORECAST}
            onHandDelay={S3_ONHAND}
            runoutDelay={S3_RUNOUT}
            heightClass="h-44"
          />

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <ChartLegend delay={S3_SALES + 0.6} />
            <div className="flex items-center gap-1.5">
              {[
                { text: 'Forecast next 13 wks: 3,120', cls: 'bg-gray-50 border-gray-200 text-gray-700' },
                { text: 'Recommended qty: 1,880', cls: 'bg-blue-50 border-blue-200 text-blue-700' },
                { text: 'Order by Jul 25 · 45 day lead time', cls: 'bg-red-50 border-red-200 text-red-700' },
              ].map((chip, i) => (
                <motion.span
                  key={chip.text}
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: S3_CHIPS + i * 0.15, duration: 0.35, ease: 'backOut' }}
                  className={`inline-flex px-2 py-0.5 rounded-full border text-[9px] font-medium whitespace-nowrap tabular-nums ${chip.cls}`}
                >
                  {chip.text}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        <StatusPill
          delay={S3_PILL}
          text="Deficit of 1,880 units. Adding to suggested orders"
          checkDelay={S3_PILL_CHECK}
        />
      </div>
    </div>
  )
}

// ===== Scene 4: Suggested orders =====
const S4_TABS = 0.4
const S4_CURSOR = S4_TABS + 0.3
const S4_CLICK = S4_CURSOR + 0.9
const S4_GROUP1 = S4_CLICK + 0.3
const S4_GROUP2 = S4_GROUP1 + 1.4
const S4_GROUP3 = S4_GROUP2 + 1.4
const S4_SUM = S4_GROUP3 + 1.4
const S4_PILL = 7.1
const S4_PILL_CHECK = S4_PILL + 1.2

const VIEW_TABS = ['Plan', 'Suggested Orders', 'Suggested Work Orders']

function OrderGroupCard({
  group,
  delay,
}: {
  group: (typeof ORDER_GROUPS)[number]
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-lg border p-2.5 ${group.pastDue ? 'border-red-200 bg-red-50/40' : 'border-gray-200 bg-white'}`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        {group.pastDue && <AlertTriangle className="w-3 h-3 text-red-500" />}
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${group.pastDue ? 'text-red-600' : 'text-gray-600'}`}
        >
          {group.heading}
        </span>
      </div>
      <div className={`${ORDER_GRID} px-1 text-[9px] font-medium text-gray-400`}>
        <div>SKU</div>
        <div>Name</div>
        <div className="text-right">Order Qty</div>
        <div className="text-right">Order By</div>
        <div className="text-right">Needed By</div>
      </div>
      {group.rows.map((row, i) => {
        const isTp = row.sku === 'TP-1043'
        const rowFlash = flashBg(delay + 0.6, 1.6)
        return (
          <motion.div
            key={row.sku}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.2 + i * 0.15, duration: 0.3 }}
          >
            <motion.div
              initial={isTp ? rowFlash.initial : undefined}
              animate={isTp ? rowFlash.animate : undefined}
              transition={isTp ? rowFlash.transition : undefined}
              className={`${ORDER_GRID} px-1 py-1 rounded text-[11px]`}
            >
              <div className="font-mono text-[10px] text-gray-700">{row.sku}</div>
              <div className="font-medium text-gray-900 truncate">{row.name}</div>
              <div className="text-right font-semibold text-gray-900 tabular-nums">
                {units.format(row.qty)}
              </div>
              <div
                className={`text-right tabular-nums ${group.pastDue ? 'font-semibold text-red-600' : 'text-gray-700'}`}
              >
                {group.pastDue ? 'Now' : row.orderBy}
              </div>
              <div className="text-right text-gray-700 tabular-nums">{row.neededBy}</div>
            </motion.div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function SceneOrders() {
  const [view, setView] = useState('Plan')

  useEffect(() => {
    const t = setTimeout(() => setView('Suggested Orders'), S4_CLICK * 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AppWindow title="Quiet AI · Demand Planning">
            <div className="space-y-3">
              {/* View tabs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: S4_TABS, duration: 0.35 }}
                className="flex items-center gap-1 p-0.5 rounded-lg bg-gray-100 w-fit"
              >
                {VIEW_TABS.map((t) => {
                  const isActive = t === view
                  const isTarget = t === 'Suggested Orders'
                  return (
                    <div
                      key={t}
                      className={`relative px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors duration-300 ${
                        isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      {t}
                      {isTarget && (
                        <>
                          <motion.div
                            initial={{ x: 140, y: 60, opacity: 0 }}
                            animate={{
                              x: [140, 14, 0, 0],
                              y: [60, 6, 0, 0],
                              opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                              delay: S4_CURSOR,
                              duration: 1.4,
                              times: [0, 0.55, 0.72, 1],
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
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: [0, 1.4, 2], opacity: [0, 0.4, 0] }}
                              transition={{ delay: S4_CLICK, duration: 0.6, times: [0, 0.3, 1] }}
                              className="w-12 h-12 rounded-full border-2 border-blue-500"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </motion.div>

              {/* Week-grouped order cards */}
              <div className="space-y-2">
                <OrderGroupCard group={ORDER_GROUPS[0]} delay={S4_GROUP1} />
                <OrderGroupCard group={ORDER_GROUPS[1]} delay={S4_GROUP2} />
                <OrderGroupCard group={ORDER_GROUPS[2]} delay={S4_GROUP3} />
              </div>

              {/* Summary strip */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: S4_SUM, duration: 0.4 }}
                className="flex items-center gap-2 text-[10px] text-gray-600"
              >
                <ClipboardList className="w-3.5 h-3.5 text-gray-400" />
                12 suggestions · 9,340 units · grouped by order-by week
              </motion.div>
            </div>
          </AppWindow>
        </motion.div>

        <StatusPill
          delay={S4_PILL}
          text="Every suggestion is lead-time aware, so nothing lands late"
          checkDelay={S4_PILL_CHECK}
        />
      </div>
    </div>
  )
}

// ===== Scene 5: Draft POs & builds =====
const S5_WO = 0.4
const S5_WO_ROWS = S5_WO + 0.3
const S5_PO = 1.6
const S5_CURSOR = S5_PO + 0.8
const S5_CLICK = S5_CURSOR + 1.0
const S5_DONE = S5_CLICK + 0.5
const S5_DRAFTS = S5_DONE + 0.3
const S5_SYNC = S5_DRAFTS + 1.4
const S5_PILL = 6.6
const S5_PILL_CHECK = S5_PILL + 1.2

const WORK_ORDERS = [
  { sku: 'DCK-5501', name: 'Docking Station 100W, Graphite', qty: 480, startBy: 'Jul 24', neededBy: 'Aug 18' },
  { sku: 'HUB-7742', name: 'USB-C Hub 10-Port, Silver', qty: 260, startBy: 'Jul 29', neededBy: 'Aug 25' },
]

const DRAFT_POS = [
  { po: 'PO-2107', vendor: 'Shenzhen Cable Co', lines: '2 lines' },
  { po: 'PO-2108', vendor: 'Apex Components', lines: '1 line' },
]

function SceneAct() {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-3">
        <div className="grid grid-cols-2 gap-3 items-stretch">
          {/* Suggested work orders (build) */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: S5_WO, duration: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Factory className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                Suggested Work Orders
              </span>
            </div>
            <div className="space-y-2">
              {WORK_ORDERS.map((wo, i) => (
                <motion.div
                  key={wo.sku}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: S5_WO_ROWS + i * 0.2, duration: 0.3 }}
                  className="rounded-lg bg-gray-50 border border-gray-100 px-2.5 py-2"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-mono text-[10px] text-gray-700">{wo.sku}</span>
                    <span className="text-[11px] font-medium text-gray-900 truncate">
                      {wo.name}
                    </span>
                    <span className="ml-auto flex-shrink-0">
                      <Pill kind="Assembled" />
                    </span>
                  </div>
                  <div className="mt-1 text-[10px] text-gray-600 tabular-nums">
                    Build <span className="font-semibold text-gray-900">{units.format(wo.qty)}</span> ·
                    Start by <span className="font-medium text-gray-900">{wo.startBy}</span> ·
                    Needed <span className="font-medium text-gray-900">{wo.neededBy}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Draft POs (buy) */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: S5_PO, duration: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Order Now
                </span>
              </div>
              {/* Create draft POs button */}
              <motion.div
                animate={{ scale: [1, 1, 0.95, 1, 1] }}
                transition={{ delay: S5_CLICK - 0.2, duration: 0.5, times: [0, 0.3, 0.5, 0.7, 1] }}
                className="relative inline-flex"
              >
                <div className="relative inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] font-semibold">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: S5_CLICK, duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    Create draft POs
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                      delay: S5_CLICK,
                      duration: S5_DONE - S5_CLICK + 0.2,
                      times: [0, 0.25, 0.75, 1],
                    }}
                    className="absolute inset-0 flex items-center justify-center gap-1"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Creating
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: S5_DONE, duration: 0.25 }}
                    className="absolute inset-0 flex items-center justify-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    2 drafts
                  </motion.span>
                  <span className="opacity-0">Create draft POs</span>

                  {/* Cursor */}
                  <motion.div
                    initial={{ x: -110, y: 60, opacity: 0 }}
                    animate={{
                      x: [-110, -10, 0, 0],
                      y: [60, 8, 0, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      delay: S5_CURSOR,
                      duration: 1.5,
                      times: [0, 0.55, 0.73, 1],
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
                      animate={{ scale: [0, 1.4, 2], opacity: [0, 0.4, 0] }}
                      transition={{ delay: S5_CLICK, duration: 0.6, times: [0, 0.3, 1] }}
                      className="w-14 h-14 rounded-full border-2 border-blue-400"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-1 text-[11px]">
              {[
                { sku: 'PWR-2210', name: 'GaN Charger 65W, White', qty: 1670 },
                { sku: 'MSE-1201', name: 'Wireless Mouse Pro, Black', qty: 570 },
              ].map((row) => (
                <div key={row.sku} className="flex items-center gap-1.5 min-w-0">
                  <span className="font-mono text-[10px] text-gray-700">{row.sku}</span>
                  <span className="font-medium text-gray-900 truncate">{row.name}</span>
                  <span className="ml-auto font-semibold text-gray-900 tabular-nums flex-shrink-0">
                    {units.format(row.qty)}
                  </span>
                </div>
              ))}
            </div>

            {/* Draft PO chips */}
            <div className="mt-2.5 space-y-1.5">
              {DRAFT_POS.map((d, i) => (
                <motion.div
                  key={d.po}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: S5_DRAFTS + i * 0.3, duration: 0.35, ease: 'backOut' }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-blue-50/60 border border-blue-100 text-[10px]"
                >
                  <FileText className="w-3 h-3 text-blue-600 flex-shrink-0" />
                  <span className="font-mono font-semibold text-gray-900">{d.po}</span>
                  <span className="text-gray-600 truncate">
                    {d.vendor} · {d.lines}
                  </span>
                  <span className="ml-auto flex-shrink-0 inline-flex px-1.5 py-px rounded-full border bg-gray-50 border-gray-200 text-[9px] font-medium text-gray-600 whitespace-nowrap">
                    Awaiting approval
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ERP sync */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: S5_SYNC, duration: 0.35 }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-800">
            <img src={qboLogo} alt="QBO" className="w-3 h-3" />
            Draft POs posted to your ERP for approval
          </span>
        </motion.div>

        <StatusPill
          delay={S5_PILL}
          text="Demand covered through October. Nothing to rekey"
          checkDelay={S5_PILL_CHECK}
        />
      </div>
    </div>
  )
}

// ===== Main exported component =====
function DemandPlanningAnimation({ sceneIndex }: { sceneIndex: number }) {
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
          {sceneIndex === 0 && <SceneImport />}
          {sceneIndex === 1 && <ScenePlan />}
          {sceneIndex === 2 && <SceneSkuDetail />}
          {sceneIndex === 3 && <SceneOrders />}
          {sceneIndex === 4 && <SceneAct />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default DemandPlanningAnimation
