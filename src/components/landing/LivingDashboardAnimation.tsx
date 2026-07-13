import { memo, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, animate, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'
import { Wallet, Inbox, TrendingUp, BarChart3, FileText, Sheet, Pencil } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import outlookLogo from '@/assets/images/outlook_logo.webp'
import slackLogo from '@/assets/images/slack_logo.png'

// ---- Timing ----
const FLIGHT_DURATION = 3.0 // chip spawn → impact, seconds (includes ~1s mid-flight dwell)
const CYCLE_DURATION = 33.0 // full choreography loop, seconds

// Tile highlight flash (blue-200 wash, on → hold → off)
const HIGHLIGHT_TIMES = [0, 0.15, 0.85, 1]
const HIGHLIGHT_COLORS = [
  'rgba(191, 219, 254, 0)',
  'rgba(191, 219, 254, 0.5)',
  'rgba(191, 219, 254, 0.5)',
  'rgba(191, 219, 254, 0)',
]

const CASH_BASE = 128400
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

// ---- Types ----
type TileId = 'cash' | 'ap' | 'forecast' | 'sales'
type Pt = { left: string; top: string }
type ChipSpec = { img?: string; icon?: 'pdf' | 'sheet' | 'doc' | 'note'; label: string; note?: boolean }
type Payload = {
  delta?: number
  row?: { vendor: string; amount: number }
  net30?: boolean
  variant?: number
  bars?: number[]
  label?: string
}
type DashEvent = {
  id: string
  at: number // seconds from cycle start (chip spawn time; impact = at + flight)
  target: TileId
  chip?: ChipSpec
  path?: { spawn: Pt; mid: Pt }
  payload: Payload
}
type Impact = Payload & { seq: number }
type Impacts = Record<TileId, Impact | null>

// Where chips land, as percentages of the card
const TILE_TARGETS: Record<TileId, Pt> = {
  cash: { left: '30%', top: '30%' },
  ap: { left: '78%', top: '30%' },
  forecast: { left: '22%', top: '72%' },
  sales: { left: '70%', top: '72%' },
}

// ---- Choreography: one ~33s cycle. Cash deltas sum to zero so the loop is seamless. ----
const EVENTS: DashEvent[] = [
  {
    id: 'inv-arrives', at: 0.0, target: 'ap',
    chip: { img: gmailLogo, label: 'INV-2214.pdf' },
    path: { spawn: { left: '15%', top: '-8%' }, mid: { left: '42%', top: '14%' } },
    payload: { row: { vendor: 'Acme Corp', amount: 1240 } },
  },
  // Chipless follow-on: the invoice above reaches "Paid", so cash reacts
  { id: 'inv-paid', at: 6.0, target: 'cash', payload: { delta: -1240 } },
  {
    id: 'slack-sales', at: 6.5, target: 'sales',
    chip: { img: slackLogo, label: 'west region is up' },
    path: { spawn: { left: '-6%', top: '62%' }, mid: { left: '32%', top: '86%' } },
    payload: { bars: [5], label: '+18%' },
  },
  {
    id: 'xls-orders', at: 10.5, target: 'forecast',
    chip: { icon: 'sheet', label: 'orders_q3.xlsx' },
    path: { spawn: { left: '106%', top: '34%' }, mid: { left: '58%', top: '58%' } },
    payload: { variant: 1 },
  },
  {
    id: 'note-net30', at: 14.5, target: 'ap',
    chip: { icon: 'note', label: '“pay this net-30”', note: true },
    path: { spawn: { left: '38%', top: '108%' }, mid: { left: '64%', top: '62%' } },
    payload: { net30: true },
  },
  {
    id: 'remit-pdf', at: 18.5, target: 'cash',
    chip: { img: outlookLogo, label: 'remittance_advice.pdf' },
    path: { spawn: { left: '72%', top: '-8%' }, mid: { left: '48%', top: '12%' } },
    payload: { delta: 4320 },
  },
  {
    id: 'csv-pos', at: 22.5, target: 'sales',
    chip: { icon: 'sheet', label: 'pos_export.csv' },
    path: { spawn: { left: '106%', top: '78%' }, mid: { left: '86%', top: '60%' } },
    payload: { bars: [2, 6], label: '+11%' },
  },
  {
    id: 'slack-forecast', at: 24.5, target: 'forecast',
    chip: { img: slackLogo, label: 'forecast the holiday spike' },
    path: { spawn: { left: '-6%', top: '22%' }, mid: { left: '10%', top: '52%' } },
    payload: { variant: 2 },
  },
  {
    id: 'note-payroll', at: 28.5, target: 'cash',
    chip: { icon: 'note', label: '“schedule payroll run”', note: true },
    path: { spawn: { left: '68%', top: '108%' }, mid: { left: '46%', top: '68%' } },
    payload: { delta: -3080 },
  },
]

// ---- Chart data (all variants share identical path command structure so framer can morph `d`) ----
const SPARK_LINE = [
  'M0,22 L12,20 L24,21 L36,17 L48,18 L60,14 L72,15 L84,11 L100,12',
  'M0,22 L12,19 L24,20 L36,16 L48,17 L60,12 L72,14 L84,9 L100,7',
  'M0,23 L12,21 L24,19 L36,18 L48,15 L60,15 L72,12 L84,12 L100,10',
]
const SPARK_AREA = SPARK_LINE.map(d => `${d} L100,28 L0,28 Z`)

const FORECAST_STATES = [
  {
    hist: 'M0,32 L10,30 L20,31 L30,27 L40,28 L50,25 L60,23',
    proj: 'M60,23 L70,22 L80,21 L90,19 L100,18',
    band: 'M60,23 L70,19 L80,17 L90,15 L100,13 L100,23 L90,24 L80,25 L70,25 Z',
  },
  {
    hist: 'M0,32 L10,30 L20,31 L30,26 L40,27 L50,23 L60,20',
    proj: 'M60,20 L70,18 L80,15 L90,12 L100,9',
    band: 'M60,20 L70,14 L80,10 L90,7 L100,4 L100,14 L90,17 L80,19 L70,22 Z',
  },
  {
    hist: 'M0,32 L10,30 L20,30 L30,26 L40,26 L50,22 L60,18',
    proj: 'M60,18 L70,16 L80,11 L90,7 L100,3',
    band: 'M60,18 L70,11 L80,6 L90,3 L100,1 L100,12 L90,14 L80,17 L70,21 Z',
  },
]

const BASE_BARS = [38, 52, 44, 60, 50, 66, 58, 74]

const TILE_CHROME = 'relative rounded-xl border border-gray-200 bg-white p-3.5 flex flex-col overflow-hidden min-h-[110px] md:min-h-0'

// ---- Shared bits ----

/**
 * Morph a path's `d` between variants via a MotionValue written straight to the
 * attribute. Framer's own SVG `d` handling emits a one-frame `d="undefined"` on
 * unmount/re-render; writing interpolated strings ourselves avoids that.
 */
function useMorphPath(target: string) {
  const ref = useRef<SVGPathElement>(null)
  const mv = useMotionValue(target)
  useEffect(() => mv.on('change', v => ref.current?.setAttribute('d', v)), [mv])
  useEffect(() => {
    const controls = animate(mv, target, { duration: 0.9, ease: 'easeInOut' })
    return () => controls.stop()
  }, [target, mv])
  return ref
}

function TileHeader({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5 text-gray-400" />
      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">{label}</span>
      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 motion-safe:animate-pulse" />
    </div>
  )
}

function TileFlash({ seq }: { seq: number | undefined }) {
  if (!seq) return null
  return (
    <motion.div
      key={seq}
      className="pointer-events-none absolute inset-0 rounded-xl"
      initial={{ backgroundColor: HIGHLIGHT_COLORS[0] }}
      animate={{ backgroundColor: HIGHLIGHT_COLORS }}
      transition={{ duration: 1.2, times: HIGHLIGHT_TIMES }}
    />
  )
}

function ChipIcon({ chip }: { chip: ChipSpec }) {
  if (chip.img) return <img src={chip.img} alt="" className="w-4 h-4 object-contain" />
  switch (chip.icon) {
    case 'pdf': return <FileText className="w-4 h-4 text-red-500" />
    case 'sheet': return <Sheet className="w-4 h-4 text-green-600" />
    case 'doc': return <FileText className="w-4 h-4 text-blue-500" />
    default: return <Pencil className="w-3.5 h-3.5 text-amber-500" />
  }
}

function InputChip({ ev }: { ev: DashEvent }) {
  const { spawn, mid } = ev.path!
  const target = TILE_TARGETS[ev.target]
  const note = ev.chip!.note
  return (
    <motion.div
      className={`absolute z-20 flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium shadow-lg whitespace-nowrap ${
        note ? 'bg-amber-50/90 border-amber-200 text-gray-600 italic' : 'bg-white border-gray-200 text-gray-700'
      }`}
      style={{ x: '-50%', y: '-50%' }}
      initial={{ left: spawn.left, top: spawn.top, opacity: 0, scale: 0.6, rotate: -4 }}
      animate={{
        left: [spawn.left, mid.left, mid.left, target.left],
        top: [spawn.top, mid.top, mid.top, target.top],
        opacity: [0, 1, 1, 1],
        scale: [0.6, 1, 1, 0.9],
        rotate: [-4, 2, 2, 0],
      }}
      exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.25 } }}
      transition={{
        duration: FLIGHT_DURATION,
        times: [0, 0.3, 0.65, 1],
        ease: ['easeOut', 'linear', 'easeIn'],
        opacity: { duration: FLIGHT_DURATION, times: [0, 0.15, 0.65, 1], ease: 'linear' },
      }}
    >
      <ChipIcon chip={ev.chip!} />
      <span>{ev.chip!.label}</span>
    </motion.div>
  )
}

// ---- Tiles ----

const CashTile = memo(function CashTile({ impact, reduced }: { impact: Impact | null; reduced: boolean }) {
  const mv = useMotionValue(CASH_BASE)
  const formatted = useTransform(mv, v => currency.format(Math.round(v)))
  const sparkVariant = impact ? impact.seq % SPARK_LINE.length : 0
  const areaRef = useMorphPath(SPARK_AREA[sparkVariant])
  const lineRef = useMorphPath(SPARK_LINE[sparkVariant])
  const ambientRef = useRef<SVGPathElement>(null)
  const ambientMv = useMotionValue(SPARK_LINE[1])

  useEffect(() => {
    if (!impact || impact.delta === undefined) return
    const controls = animate(mv, mv.get() + impact.delta, { duration: 0.9, ease: 'easeOut' })
    return () => controls.stop()
  }, [impact, mv])

  useEffect(() => {
    if (reduced) return
    const unsub = ambientMv.on('change', v => ambientRef.current?.setAttribute('d', v))
    const controls = animate(ambientMv, [SPARK_LINE[1], SPARK_LINE[2], SPARK_LINE[1]], {
      duration: 9,
      repeat: Infinity,
      ease: 'easeInOut',
    })
    return () => { controls.stop(); unsub() }
  }, [reduced, ambientMv])

  const delta = impact?.delta
  return (
    <div className={`${TILE_CHROME} col-span-2 md:col-span-7`}>
      <TileHeader icon={Wallet} label="Cash position" />
      <div className="mt-3 flex items-start gap-3">
        <motion.span className="text-3xl md:text-4xl font-bold text-gray-900 tabular-nums leading-none">
          {formatted}
        </motion.span>
        {delta !== undefined && (
          <motion.span
            key={impact!.seq}
            className={`text-sm font-semibold rounded-full px-2 py-0.5 ${
              delta >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
            }`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -6] }}
            transition={{ duration: 3.2, times: [0, 0.1, 0.8, 1] }}
          >
            {delta >= 0 ? '+' : '−'}{currency.format(Math.abs(delta))}
          </motion.span>
        )}
      </div>
      <div className="mt-auto pt-3">
        <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-full h-10 md:h-14 block">
          {!reduced && (
            <path
              ref={ambientRef}
              d={SPARK_LINE[1]}
              fill="none"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              className="stroke-blue-200"
              opacity={0.7}
            />
          )}
          <path ref={areaRef} d={SPARK_AREA[0]} className="fill-blue-50" />
          <path
            ref={lineRef}
            d={SPARK_LINE[0]}
            fill="none"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            className="stroke-blue-400"
          />
        </svg>
      </div>
      <TileFlash seq={impact?.seq} />
    </div>
  )
})

function StatusPill({ animated }: { animated: boolean }) {
  const base = 'text-[11px] font-semibold rounded-full px-1.5 py-0.5'
  if (!animated) {
    return <span className={`${base} bg-green-100 text-green-700`}>Paid</span>
  }
  const times = [0, 0.35, 0.38, 0.78, 0.81, 1]
  return (
    <span className={`relative inline-flex items-center justify-center ${base}`}>
      <span className="invisible">Approved</span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0, 0, 0, 0] }}
        transition={{ duration: 3.2, times }}
      >
        Draft
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={{ duration: 3.2, times }}
      >
        Approved
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center rounded-full bg-green-100 text-green-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0, 1, 1] }}
        transition={{ duration: 3.2, times }}
      >
        Paid
      </motion.span>
    </span>
  )
}

type ApRow = { key: number; vendor: string; amount: number; due?: string; animated: boolean }

const INITIAL_ROWS: ApRow[] = [
  { key: -1, vendor: 'Northwind Traders', amount: 2860, animated: false },
  { key: -2, vendor: 'Globex Logistics', amount: 940, animated: false },
  { key: -3, vendor: 'Initech Supplies', amount: 1575, animated: false },
]

const ApTile = memo(function ApTile({ impact }: { impact: Impact | null; reduced: boolean }) {
  const [count, setCount] = useState(12)
  const [rows, setRows] = useState<ApRow[]>(INITIAL_ROWS)

  useEffect(() => {
    if (!impact) return
    if (impact.row) {
      setCount(c => c + 1)
      setRows(rs => [
        { key: impact.seq, vendor: impact.row!.vendor, amount: impact.row!.amount, due: 'Due Jun 12', animated: true },
        ...rs,
      ].slice(0, 3))
    }
    if (impact.net30) {
      setRows(rs => rs.map((r, i) => (i === 0 ? { ...r, due: 'Net-30' } : r)))
    }
  }, [impact])

  return (
    <div className={`${TILE_CHROME} col-span-2 md:col-span-5`}>
      <TileHeader icon={Inbox} label="Accounts payable" />
      <p className="mt-2 text-xs text-gray-500">
        <motion.span
          key={count}
          className="inline-block font-bold text-gray-900 tabular-nums"
          initial={{ scale: 1.35, color: '#2563eb' }}
          animate={{ scale: 1, color: '#111827' }}
          transition={{ duration: 0.5 }}
        >
          {count}
        </motion.span>{' '}
        invoices processed today
      </p>
      <div className="mt-2 flex-1">
        <AnimatePresence mode="popLayout" initial={false}>
          {rows.map(r => (
            <motion.div
              key={r.key}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="flex items-center justify-between gap-2 py-1.5 border-b border-gray-100 last:border-0"
            >
              <div className="min-w-0 flex items-baseline gap-1.5">
                <span className="text-xs text-gray-700 truncate">{r.vendor}</span>
                {r.due && (
                  <motion.span
                    key={r.due}
                    className="text-[11px] text-gray-400 rounded px-0.5 whitespace-nowrap"
                    initial={{ backgroundColor: 'rgba(191, 219, 254, 0.8)' }}
                    animate={{ backgroundColor: 'rgba(191, 219, 254, 0)' }}
                    transition={{ duration: 2.0 }}
                  >
                    {r.due}
                  </motion.span>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs tabular-nums text-gray-900">{currency.format(r.amount)}</span>
                <StatusPill animated={r.animated} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <TileFlash seq={impact?.seq} />
    </div>
  )
})

const ForecastTile = memo(function ForecastTile({ impact, reduced }: { impact: Impact | null; reduced: boolean }) {
  const state = FORECAST_STATES[impact?.variant ?? 0]
  const bandRef = useMorphPath(state.band)
  const histRef = useMorphPath(state.hist)
  const projRef = useMorphPath(state.proj)
  return (
    <div className={`${TILE_CHROME} col-span-1 md:col-span-5`}>
      <TileHeader icon={TrendingUp} label="Demand forecast" />
      <div className="relative mt-2 flex-1 min-h-0">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full block">
          <defs>
            <clipPath id="lda-fc-clip">
              <motion.rect
                key={impact?.seq ?? 'init'}
                x="60"
                y="0"
                height="40"
                initial={{ width: impact ? 0 : 40 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </clipPath>
          </defs>
          <path ref={bandRef} d={FORECAST_STATES[0].band} className="fill-blue-100/60" />
          <path
            ref={histRef}
            d={FORECAST_STATES[0].hist}
            fill="none"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            className="stroke-blue-500"
          />
          <g clipPath="url(#lda-fc-clip)">
            <path
              ref={projRef}
              d={FORECAST_STATES[0].proj}
              fill="none"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
              className="stroke-blue-400"
              style={reduced ? undefined : { animation: 'lda-dash-march 1.5s linear infinite' }}
            />
          </g>
        </svg>
        <span className="absolute top-0 right-0 text-[9px] text-gray-400">next 30d</span>
      </div>
      <TileFlash seq={impact?.seq} />
    </div>
  )
})

const SalesTile = memo(function SalesTile({ impact }: { impact: Impact | null; reduced: boolean }) {
  const boosted = impact?.bars ?? []
  const heights = BASE_BARS.map((h, i) => (boosted.includes(i) ? Math.min(h + 14, 95) : h))
  const labelBar = boosted.length ? Math.min(...boosted) : null

  return (
    <div className={`${TILE_CHROME} col-span-1 md:col-span-7`}>
      <TileHeader icon={BarChart3} label="Sales analytics" />
      <div className="relative mt-3 flex-1 min-h-0 flex items-end gap-1.5">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            initial={{ height: 0, backgroundColor: '#bfdbfe' }}
            animate={{
              height: `${h}%`,
              backgroundColor: boosted.includes(i) || i === BASE_BARS.length - 1 ? '#3b82f6' : '#bfdbfe',
            }}
            transition={{
              height: { type: 'spring', stiffness: 300, damping: 20, delay: i * 0.05 },
              backgroundColor: { duration: 0.4 },
            }}
          />
        ))}
        {impact?.label && labelBar !== null && (
          <motion.span
            key={impact.seq}
            className="absolute top-0 -translate-x-1/2 text-xs font-semibold text-blue-600"
            style={{ left: `${((labelBar + 0.5) / BASE_BARS.length) * 100}%` }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -8] }}
            transition={{ duration: 3.0, times: [0, 0.15, 0.75, 1] }}
          >
            {impact.label}
          </motion.span>
        )}
      </div>
      <TileFlash seq={impact?.seq} />
    </div>
  )
})

// ---- Hooks ----

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isDesktop
}

// ---- Root ----

function LivingDashboardAnimation() {
  const isDesktop = useIsDesktop()
  const prefersReduced = useReducedMotion()
  const reduced = !!prefersReduced || !isDesktop

  const [activeChips, setActiveChips] = useState<{ key: string; ev: DashEvent }[]>([])
  const [impacts, setImpacts] = useState<Impacts>({ cash: null, ap: null, forecast: null, sales: null })
  const seqRef = useRef(0)

  useEffect(() => {
    if (reduced) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    const runCycle = (cycle: number) => {
      if (cancelled) return
      for (const ev of EVENTS) {
        const chipKey = `${cycle}-${ev.id}`
        if (ev.chip) {
          timers.push(setTimeout(() => {
            if (!cancelled) setActiveChips(cs => [...cs, { key: chipKey, ev }])
          }, ev.at * 1000))
        }
        timers.push(setTimeout(() => {
          if (cancelled) return
          setActiveChips(cs => cs.filter(c => c.key !== chipKey))
          seqRef.current += 1
          const seq = seqRef.current
          setImpacts(prev => ({ ...prev, [ev.target]: { seq, ...ev.payload } }))
        }, (ev.at + (ev.chip ? FLIGHT_DURATION : 0)) * 1000))
      }
      timers.push(setTimeout(() => runCycle(cycle + 1), CYCLE_DURATION * 1000))
    }

    runCycle(0)
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      setActiveChips([])
    }
  }, [reduced])

  return (
    <div className="relative w-full rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden md:aspect-[2/1]">
      <style>{'@keyframes lda-dash-march { to { stroke-dashoffset: -6; } }'}</style>
      <div className="grid grid-cols-2 md:grid-cols-12 md:grid-rows-2 gap-3 md:gap-4 h-full p-4 md:p-5">
        <CashTile impact={impacts.cash} reduced={reduced} />
        <ApTile impact={impacts.ap} reduced={reduced} />
        <ForecastTile impact={impacts.forecast} reduced={reduced} />
        <SalesTile impact={impacts.sales} reduced={reduced} />
      </div>
      <AnimatePresence>
        {activeChips.map(c => (
          <InputChip key={c.key} ev={c.ev} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default LivingDashboardAnimation
