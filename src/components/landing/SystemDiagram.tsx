import { useEffect, useRef, useState } from 'react'
import {
  Mail, MessageSquare, MousePointerClick, FileStack, ShoppingCart, FileText,
  ClipboardList, CheckSquare, DollarSign, ShieldAlert, TrendingUp, BarChart3,
  Database, ChevronDown,
} from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import logo from '@/assets/images/logo.png'

// ---- Data ----

const INPUTS = [
  { icon: Mail, title: 'Email', caption: 'Forward anything' },
  { icon: MessageSquare, title: 'Slack', caption: 'Just ask' },
  { icon: MousePointerClick, title: 'In-product', caption: 'Commands & clicks' },
  { icon: FileStack, title: 'Any file', caption: 'PDF · XLSX · CSV' },
]

// Mirrors the "What we do" set in layout/Nav.tsx
const MODULES = [
  { icon: ShoppingCart, title: 'Purchasing', href: '/purchasing' },
  { icon: FileText, title: 'Accounts Payable', href: '/accounts-payable' },
  { icon: ClipboardList, title: 'PO Lifecycle Management', href: '/po-lifecycle' },
  { icon: CheckSquare, title: '3 Way Match', href: '/three-way-match' },
  { icon: DollarSign, title: 'Cash Management', href: '/cash-management', beta: true },
  { icon: ShieldAlert, title: 'Fraud & Duplicate Prevention', href: '/fraud-prevention' },
  { icon: TrendingUp, title: 'Demand Planning', href: '/demand-planning', comingSoon: true },
  { icon: BarChart3, title: 'Sales Analytics', href: '/sales-analytics', comingSoon: true },
]

const DATA_SOURCES = [
  'ERP', 'Emails', 'Inventory', 'Sales history',
  'PO history', 'Invoices', 'Receipts', 'Bank statements',
]

// ---- Desktop connector geometry (all endpoints known statically) ----

const INPUT_CARD_H = 56 // h-14
const INPUT_GAP = 12 // gap-3
const MODULE_CARD_H = 48 // h-12
const MODULE_GAP = 8 // gap-2
const N_MOD = MODULES.length
const DIAGRAM_H = N_MOD * MODULE_CARD_H + (N_MOD - 1) * MODULE_GAP // 440
const GUTTER_W = 64
const HUB_Y = DIAGRAM_H / 2

const INPUTS_TOP = (DIAGRAM_H - (INPUTS.length * INPUT_CARD_H + (INPUTS.length - 1) * INPUT_GAP)) / 2
const inputY = (i: number) => INPUTS_TOP + INPUT_CARD_H / 2 + i * (INPUT_CARD_H + INPUT_GAP)
const moduleY = (j: number) => MODULE_CARD_H / 2 + j * (MODULE_CARD_H + MODULE_GAP)

const leftPath = (i: number) => `M 0 ${inputY(i)} C 28 ${inputY(i)}, 36 ${HUB_Y}, ${GUTTER_W} ${HUB_Y}`
const rightPath = (j: number) => `M 0 ${HUB_Y} C 28 ${HUB_Y}, 36 ${moduleY(j)}, ${GUTTER_W} ${moduleY(j)}`

const DASHED_H = 'h-px [background:repeating-linear-gradient(90deg,#d1d5db_0_4px,transparent_4px_8px)]'
const DASHED_V = 'w-px [background:repeating-linear-gradient(180deg,#d1d5db_0_4px,transparent_4px_8px)]'

// ---- Subcomponents ----

function ConnectorGutter({ paths, animate }: { paths: string[]; animate: boolean }) {
  return (
    <svg
      width={GUTTER_W}
      height={DIAGRAM_H}
      viewBox={`0 0 ${GUTTER_W} ${DIAGRAM_H}`}
      className="block overflow-visible"
      aria-hidden
    >
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#e5e7eb" strokeWidth={1.5} />
          {animate && (
            <path
              d={d}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="10 100"
              opacity={0.8}
              style={{ animation: 'sd-pulse 2.8s linear infinite', animationDelay: `${i * 0.35}s` }}
            />
          )}
        </g>
      ))}
    </svg>
  )
}

function InputCard({ icon: Icon, title, caption }: (typeof INPUTS)[number]) {
  return (
    <div className="h-14 flex items-center gap-3 px-3 rounded-xl border border-gray-100 bg-white">
      <div className="h-9 w-9 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
        <Icon className="h-[18px] w-[18px] text-gray-600" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 truncate">{caption}</p>
      </div>
    </div>
  )
}

function ModuleCard({ icon: Icon, title, href, beta, comingSoon }: (typeof MODULES)[number]) {
  return (
    <a
      href={href}
      className="group h-12 flex items-center gap-2.5 px-3 rounded-xl border border-gray-100 bg-white hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150"
    >
      <div className="h-7 w-7 shrink-0 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
        <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
      </div>
      <p className="text-xs font-semibold text-gray-900 truncate">{title}</p>
      {beta && <span className="ml-auto shrink-0 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-semibold uppercase rounded">Beta</span>}
      {comingSoon && <span className="ml-auto shrink-0 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-semibold uppercase rounded">Soon</span>}
    </a>
  )
}

function HubCard() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white shadow-lg px-8 py-5">
      <img src={logo} alt="Quiet" className="h-10" />
      <span className="font-semibold text-gray-900">Quiet</span>
    </div>
  )
}

function DataBar() {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/80 px-5 py-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {DATA_SOURCES.map(s => (
          <span key={s} className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-xs text-gray-600">{s}</span>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-widest text-gray-400 flex items-center justify-center gap-1.5">
        <Database className="h-3 w-3" /> Your data
      </p>
    </div>
  )
}

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 text-center">{children}</p>
  )
}

// ---- Hooks ----

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isDesktop
}

// ---- Root ----

function SystemDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const prefersReduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const showMotion = !prefersReduced && isDesktop && inView

  const entrance = (order: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.4, delay: order * 0.08 },
        }

  return (
    <div ref={ref}>
      <style>{'@keyframes sd-pulse { from { stroke-dashoffset: 0 } to { stroke-dashoffset: -110 } }'}</style>

      {/* Desktop: hub-and-spoke */}
      <div className="hidden lg:block rounded-2xl border border-gray-200 bg-white shadow-xl p-6">
        <div className="grid grid-cols-[240px_64px_1fr_64px_240px] mb-3">
          <ColumnLabel>Any input</ColumnLabel>
          <div />
          <div />
          <div />
          <ColumnLabel>Modules</ColumnLabel>
        </div>

        <div className="grid grid-cols-[240px_64px_1fr_64px_240px] items-center">
          <motion.div className="flex flex-col gap-3" {...entrance(0)}>
            {INPUTS.map(input => <InputCard key={input.title} {...input} />)}
          </motion.div>

          <ConnectorGutter paths={INPUTS.map((_, i) => leftPath(i))} animate={showMotion} />

          <motion.div className="flex items-center h-full" {...entrance(1)}>
            <div className={`flex-1 ${DASHED_H}`} />
            <HubCard />
            <div className={`flex-1 ${DASHED_H}`} />
          </motion.div>

          <ConnectorGutter paths={MODULES.map((_, j) => rightPath(j))} animate={showMotion} />

          <motion.div className="flex flex-col gap-2" {...entrance(2)}>
            {MODULES.map(mod => <ModuleCard key={mod.title} {...mod} />)}
          </motion.div>
        </div>

        <motion.div {...entrance(3)}>
          <div className="flex items-center justify-center gap-2 my-1">
            <div className={`h-10 ${DASHED_V}`} />
            <p className="text-[11px] text-gray-400">draws on</p>
          </div>
          <DataBar />
        </motion.div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="lg:hidden rounded-2xl border border-gray-200 bg-white shadow-xl p-4">
        <ColumnLabel>Any input</ColumnLabel>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {INPUTS.map(({ icon: Icon, title }) => (
            <div key={title} className="h-12 flex items-center gap-2.5 px-3 rounded-xl border border-gray-100 bg-white">
              <div className="h-7 w-7 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icon className="h-4 w-4 text-gray-600" />
              </div>
              <p className="text-xs font-semibold text-gray-900 truncate">{title}</p>
            </div>
          ))}
        </div>

        <ChevronDown className="h-5 w-5 text-gray-300 mx-auto my-2" />

        <div className="w-fit mx-auto">
          <HubCard />
        </div>

        <ChevronDown className="h-5 w-5 text-gray-300 mx-auto my-2" />

        <ColumnLabel>Modules</ColumnLabel>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {MODULES.map(mod => <ModuleCard key={mod.title} {...mod} />)}
        </div>

        <p className="mt-4 mb-1 text-[11px] text-gray-400 text-center">Quiet draws on</p>
        <DataBar />
      </div>
    </div>
  )
}

export default SystemDiagram
