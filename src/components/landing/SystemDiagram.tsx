import { useEffect, useRef, useState } from 'react'
import {
  Pencil, FileStack, ShoppingCart, FileText,
  ClipboardList, CheckSquare, DollarSign, ShieldAlert, TrendingUp, BarChart3,
  Database, ChevronDown, FileUp, Landmark, Mail, Layers,
} from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import logo from '@/assets/images/logo.png'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import outlookLogo from '@/assets/images/outlook_logo.webp'
import slackLogo from '@/assets/images/slack_logo.png'
import qboLogo from '@/assets/images/qbo_logo.webp'
import netsuiteLogo from '@/assets/images/netsuite_logo.webp'
import xeroLogo from '@/assets/images/xero_logo.webp'
import sageLogo from '@/assets/images/sage_logo.webp'
import freshbooksLogo from '@/assets/images/freshbooks_logo.webp'

// ---- Brand icons (repo image assets) ----

function EmailIcon({ className }: { className?: string }) {
  return (
    <span className={`relative block ${className ?? ''}`} aria-hidden>
      <img src={gmailLogo} alt="" className="absolute left-0 top-0 w-[62%]" />
      <img src={outlookLogo} alt="" className="absolute right-0 bottom-0 w-[62%]" />
    </span>
  )
}

function SlackIcon({ className }: { className?: string }) {
  return <img src={slackLogo} alt="" className={className} aria-hidden />
}

// ---- Data ----

const INPUTS = [
  { icon: EmailIcon, title: 'Email', caption: 'Forward emails & attachments' },
  { icon: SlackIcon, title: 'Slack', caption: 'Messages & attachments' },
  { icon: Pencil, title: 'In-product', caption: 'File uploads & typed commands' },
  { icon: FileStack, title: 'Files & Reports', caption: 'PDF · XLSX · CSV · DOCX' },
]

// Mirrors the "What we do" set in layout/Nav.tsx
const MODULES = [
  { icon: ShoppingCart, title: 'Purchasing', href: '/purchasing' },
  { icon: FileText, title: 'Accounts Payable', href: '/accounts-payable' },
  { icon: ClipboardList, title: 'PO Lifecycle Management', href: '/po-lifecycle' },
  { icon: CheckSquare, title: '3 Way Match', href: '/three-way-match' },
  { icon: DollarSign, title: 'Cash Management', href: '/cash-management' },
  { icon: ShieldAlert, title: 'Fraud & Duplicate Prevention', href: '/fraud-prevention' },
  { icon: TrendingUp, title: 'Demand Planning', href: '/demand-planning' },
  { icon: BarChart3, title: 'Sales Analytics', href: '/sales-analytics' },
]

type DataConnection = {
  title: string
  icon: React.ComponentType<{ className?: string }>
  items: string[]
  connections?: { src: string; name: string }[]
}

const DATA_CONNECTIONS: DataConnection[] = [
  {
    title: 'Uploads',
    icon: FileUp,
    items: ['Sales reports', 'Inventory reports', 'Bank statements', 'Expense reports'],
  },
  {
    title: 'Emails & Slack',
    icon: Mail,
    items: ['Historical emails', 'Attachments', 'Messages'],
    connections: [
      { src: gmailLogo, name: 'Gmail' },
      { src: outlookLogo, name: 'Outlook' },
      { src: slackLogo, name: 'Slack' },
    ],
  },
  {
    title: 'ERP',
    icon: Layers,
    items: ['Purchase Orders', 'Invoices', 'Vendors', 'Customers', 'Inventory'],
    connections: [
      { src: qboLogo, name: 'QuickBooks' },
      { src: netsuiteLogo, name: 'NetSuite' },
      { src: xeroLogo, name: 'Xero' },
      { src: sageLogo, name: 'Sage' },
      { src: freshbooksLogo, name: 'FreshBooks' },
    ],
  },
  {
    title: 'Bank',
    icon: Landmark,
    items: ['Bank Transactions', 'Account Balances'],
  },
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

// The pulse is a comet: stacked dash layers of increasing length and decreasing
// opacity, all sharing the 110-unit pattern period and centered on the same
// moving point. Enough layers with round caps blend into one continuous
// bright-center-fading-ends streak rather than reading as discrete bands.
// A layer of dash length L stays centered when its offset runs L/2-5 → L/2-115.
const PULSE_DASHES = [
  { len: 4, opacity: 0.5 },
  { len: 6, opacity: 0.35 },
  { len: 8, opacity: 0.25 },
  { len: 10, opacity: 0.18 },
  { len: 13, opacity: 0.12 },
  { len: 16, opacity: 0.07 },
]
const PULSE_KEYFRAMES = PULSE_DASHES.map(({ len }) =>
  `@keyframes sd-pulse-${len} { from { stroke-dashoffset: ${len / 2 - 5} } to { stroke-dashoffset: ${len / 2 - 115} } }`
).join('\n')

const DASHED_H = 'h-px [background:repeating-linear-gradient(90deg,#d3d9df_0_4px,transparent_4px_8px)]'
const DASHED_V = 'w-px [background:repeating-linear-gradient(180deg,#d3d9df_0_4px,transparent_4px_8px)]'

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
          <path d={d} fill="none" stroke="#e4e8ec" strokeWidth={1.5} />
          {animate && PULSE_DASHES.map(({ len, opacity }) => (
            <path
              key={len}
              d={d}
              fill="none"
              stroke="#2b59c3"
              strokeWidth={2}
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={`${len} ${110 - len}`}
              opacity={opacity}
              style={{ animation: `sd-pulse-${len} 2.8s linear infinite`, animationDelay: `${i * 0.35}s` }}
            />
          ))}
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

function ModuleCard({ icon: Icon, title, href }: (typeof MODULES)[number]) {
  return (
    <a
      href={href}
      className="group h-12 flex items-center gap-2.5 px-3 rounded-xl border border-gray-100 bg-white hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150"
    >
      <div className="h-7 w-7 shrink-0 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
        <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
      </div>
      <p className="text-xs font-semibold text-gray-900 truncate">{title}</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DATA_CONNECTIONS.map(({ title, icon: Icon, items, connections }) => (
          <div key={title} className="flex flex-col rounded-lg border border-gray-200 bg-white p-3">
            <div className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-gray-500 shrink-0" />
              <span className="text-xs font-semibold text-gray-900 truncate">{title}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {items.map(item => (
                <span key={item} className="px-1.5 py-0.5 rounded bg-gray-50 border border-gray-100 text-[10px] text-gray-500">{item}</span>
              ))}
            </div>
            {connections && (
              <div className="mt-auto pt-2">
                <div className="mt-1 pt-2 border-t border-gray-100">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">Supported connections</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    {connections.map(({ src, name }) => (
                      <img key={name} src={src} alt={name} title={name} className="h-4 w-4 object-contain shrink-0" />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
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
      <style>{PULSE_KEYFRAMES}</style>

      {/* Desktop: hub-and-spoke */}
      <div className="hidden lg:block rounded-2xl border border-gray-200 bg-white shadow-xl p-6">
        <div className="grid grid-cols-[280px_64px_1fr_64px_280px] mb-3">
          <ColumnLabel>Any input</ColumnLabel>
          <div />
          <div />
          <div />
          <ColumnLabel>Modules</ColumnLabel>
        </div>

        <div className="grid grid-cols-[280px_64px_1fr_64px_280px] items-center">
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
          <div className="relative my-1">
            <div className={`h-10 mx-auto ${DASHED_V}`} />
            <p className="absolute top-1/2 -translate-y-1/2 left-[calc(50%+10px)] text-[11px] text-gray-400">draws on</p>
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
