import { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle, ArrowRight, CalendarClock, CheckCircle2, Database, Factory,
  FileText, Package, Send,
} from 'lucide-react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import logo from '@/assets/images/logo.png'

// ---- Timing ----

const TYPE_MS = 32 // per character
const SEND_PAUSE = 0.35 // typed text sits in input before it "sends"
const THINK = 1.5 // thinking dots
const ANSWER_IN = 0.6 // answer card entrance
const HOLD = 3.8 // fully-answered dwell
const EXIT = 0.55 // Q + A fade out together
const GAP = 0.45 // empty chat before next question types

const typingDur = (q: string) => (q.length * TYPE_MS) / 1000
const SEG_TAIL = SEND_PAUSE + THINK + ANSWER_IN + HOLD + EXIT + GAP

// ---- Data ----

type QA = {
  id: string
  question: string
  sources: string[]
  Answer: () => JSX.Element
}

function Sparkline({ variant = 'recover' }: { variant?: 'recover' | 'dip' }) {
  const line = variant === 'recover'
    ? 'M0,8 L14,10 L28,14 L42,19 L56,15 L70,12 L84,10 L100,9'
    : 'M0,6 L14,9 L28,13 L42,17 L56,23 L70,19 L84,15 L100,13'
  return (
    <div className="relative mt-2">
      <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="h-10 w-full" aria-hidden>
        <path d={`${line} L100,28 L0,28 Z`} className="fill-blue-50" stroke="none" />
        <path d={line} fill="none" className="stroke-blue-400" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="21" x2="100" y2="21" strokeDasharray="3 3" className="stroke-amber-400" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="absolute left-0 -bottom-1.5 text-[9px] text-gray-400">next 8 wks</span>
      <span className="absolute right-0 top-1/2 text-[9px] text-amber-500">buffer</span>
    </div>
  )
}

function AnswerSources({ sources }: { sources: string[] }) {
  return (
    <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-1.5 text-[10px] text-gray-400">
      <Database className="w-3 h-3" />
      {sources.map((s, i) => (
        <span key={s} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-gray-300">×</span>}
          {s}
        </span>
      ))}
    </div>
  )
}

function DelayBillsAnswer() {
  return (
    <>
      <div className="flex items-center gap-2">
        <CalendarClock className="w-4 h-4 text-blue-600 shrink-0" />
        <p className="text-sm font-semibold text-gray-900">Yes — delay 2 bills to stay above your cash buffer</p>
      </div>
      <div className="mt-1.5 divide-y divide-gray-100">
        {[
          { vendor: 'Baxter Supply Co', amount: '$4,200', move: 'push to Aug 21' },
          { vendor: 'Meridian Freight', amount: '$1,850', move: 'push to Aug 28' },
        ].map(({ vendor, amount, move }) => (
          <div key={vendor} className="flex items-center justify-between gap-2 py-1.5 text-xs">
            <span className="text-gray-700">{vendor}</span>
            <span className="tabular-nums text-gray-900 ml-auto">{amount}</span>
            <span className="flex items-center gap-1 font-medium text-blue-600 w-28 justify-end">
              <ArrowRight className="w-3 h-3" />{move}
            </span>
          </div>
        ))}
      </div>
      <Sparkline variant="recover" />
    </>
  )
}

function DemandPlanAnswer() {
  const rows = [
    { sku: 'SKU-1042', onHand: '380', demand: '1,580', make: 'make 1,200', balanced: false },
    { sku: 'SKU-0217', onHand: '90', demand: '490', make: 'make 400', balanced: false },
    { sku: 'SKU-0883', onHand: '1,210', demand: '940', make: 'balanced', balanced: true },
  ]
  const cols = 'grid grid-cols-[1fr_64px_88px_88px] gap-x-3'
  return (
    <>
      <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
        <Factory className="w-4 h-4 text-blue-600 shrink-0" />Make 2 SKUs this cycle
      </p>
      <div className={`mt-2 ${cols} text-[10px] uppercase tracking-wider text-gray-400`}>
        <span>SKU</span>
        <span className="text-right">On hand</span>
        <span className="text-right">2-wk demand</span>
        <span className="text-right">Make</span>
      </div>
      <div className="mt-0.5 divide-y divide-gray-100">
        {rows.map(({ sku, onHand, demand, make, balanced }) => (
          <div key={sku} className={`${cols} py-1.5 text-xs items-center`}>
            <span className="text-gray-700">{sku}</span>
            <span className="tabular-nums text-gray-900 text-right">{onHand}</span>
            <span className="tabular-nums text-gray-900 text-right">{demand}</span>
            <span className={`text-right font-semibold ${balanced ? 'text-green-600 font-medium' : 'text-blue-600'}`}>{make}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function MaterialsAnswer() {
  const rows = [
    { name: 'Aluminum sheet 3mm', qty: '2,400 units', vendor: 'Apex Metals', lead: '10-day lead' },
    { name: 'Nylon fastener kit', qty: '8,000 units', vendor: 'Coreline Supply', lead: '4-day lead' },
    { name: 'Powder coat, matte black', qty: '60 kg', vendor: 'Duraflex Coatings', lead: '7-day lead' },
  ]
  return (
    <>
      <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
        <Package className="w-4 h-4 text-blue-600 shrink-0" />Order 3 materials to cover projected demand
      </p>
      <div className="mt-1.5">
        {rows.map(({ name, qty, vendor, lead }) => (
          <div key={name} className="flex items-center justify-between gap-2 py-1.5 border-b border-gray-100 last:border-0 text-xs">
            <span className="text-gray-700 truncate">{name} <span className="text-gray-400">· {qty}</span></span>
            <span className="flex items-center gap-1.5 shrink-0">
              <span className="text-gray-500">{vendor}</span>
              <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">{lead}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-green-50 border border-green-200 px-2.5 py-1.5 text-xs font-medium text-green-700">
        <FileText className="w-3.5 h-3.5 shrink-0" />3 draft POs ready for approval
      </div>
    </>
  )
}

function CashFlagAnswer() {
  return (
    <>
      <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs font-medium text-amber-800">
          Crunch week: Aug 12–18 <span className="text-amber-600">· lowest projected balance $8,900</span>
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-700">
        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
        <span><span className="font-semibold text-gray-900">Fix:</span> shift the Baxter bill one week — keeps you positive</span>
      </div>
      <Sparkline variant="dip" />
    </>
  )
}

const QUESTIONS: QA[] = [
  {
    id: 'delay-bills',
    question: 'Are there invoices I should delay paying based on my revenue forecast?',
    sources: ['revenue forecast', 'open payables'],
    Answer: DelayBillsAnswer,
  },
  {
    id: 'demand-plan',
    question: 'What do I need to manufacture in the next two weeks?',
    sources: ['demand projections', 'inventory'],
    Answer: DemandPlanAnswer,
  },
  {
    id: 'materials',
    question: 'What materials do I need to order to meet demand projections?',
    sources: ['demand projections', 'BOMs', 'vendor lead times'],
    Answer: MaterialsAnswer,
  },
  {
    id: 'cash-crunch',
    question: 'Will I run short on cash — and when?',
    sources: ['cash position', 'revenue forecast', 'payment schedule'],
    Answer: CashFlagAnswer,
  },
]

const SEG_STARTS = QUESTIONS.reduce<number[]>((acc, _, i) => {
  if (i === 0) return [0]
  const prev = QUESTIONS[i - 1]
  return [...acc, acc[i - 1] + typingDur(prev.question) + SEG_TAIL]
}, [])
const CYCLE_DURATION = QUESTIONS.reduce((s, qa) => s + typingDur(qa.question) + SEG_TAIL, 0)

// ---- Chat chrome ----

function ChatHeader() {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100">
      <img src={logo} alt="Quiet" className="h-4" />
      <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Ask Quiet</span>
      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 motion-safe:animate-pulse" />
    </div>
  )
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="self-end max-w-[85%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-2.5 text-sm text-white">
      {children}
    </div>
  )
}

function AnswerCard({ qa }: { qa: QA }) {
  return (
    <div className="self-start w-full rounded-xl border border-gray-200 bg-white shadow-sm p-3.5">
      <qa.Answer />
      <AnswerSources sources={qa.sources} />
    </div>
  )
}

function ThinkingDots() {
  return (
    <div className="self-start rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 flex gap-1">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray-400"
          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function InputBar({ typed, typing }: { typed: string; typing: boolean }) {
  return (
    <div className="flex items-center gap-3 border-t border-gray-100 bg-gray-50/60 px-4 py-3">
      <p className="flex-1 text-sm text-gray-800 truncate">
        {typed || <span className="text-gray-400">Ask Quiet anything…</span>}
        {typing && <span className="inline-block w-px h-4 bg-gray-600 align-middle ml-px" style={{ animation: 'aq-caret 1s steps(1) infinite' }} />}
      </p>
      <div className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center transition-colors ${typed ? 'bg-blue-600' : 'bg-gray-200'}`}>
        <Send className={`w-4 h-4 ${typed ? 'text-white' : 'text-gray-400'}`} />
      </div>
    </div>
  )
}

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

// ---- Static fallback ----

function AskQuietStatic() {
  const first = QUESTIONS[0]
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
        <ChatHeader />
        <div className="p-5 flex flex-col gap-3">
          <UserBubble>{first.question}</UserBubble>
          <AnswerCard qa={first} />
        </div>
        <InputBar typed="" typing={false} />
      </div>
      <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-widest text-gray-400">Also ask</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {QUESTIONS.slice(1).map(qa => (
          <span key={qa.id} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600">
            {qa.question}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---- Root ----

type Phase = 'typing' | 'sent' | 'thinking' | 'answered' | 'clearing'

function AskQuietAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const prefersReduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const reduced = !!prefersReduced || !isDesktop
  const active = !reduced && inView

  const [step, setStep] = useState<{ cycle: number; q: number; phase: Phase }>({ cycle: 0, q: 0, phase: 'typing' })
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (!active) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    const runCycle = (cycle: number) => {
      if (cancelled) return
      QUESTIONS.forEach((qa, q) => {
        const t0 = SEG_STARTS[q]
        const td = typingDur(qa.question)
        const at = (phase: Phase, s: number) =>
          timers.push(setTimeout(() => { if (!cancelled) setStep({ cycle, q, phase }) }, s * 1000))
        at('typing', t0)
        at('sent', t0 + td + SEND_PAUSE)
        at('thinking', t0 + td + SEND_PAUSE + 0.05)
        at('answered', t0 + td + SEND_PAUSE + THINK)
        at('clearing', t0 + td + SEND_PAUSE + THINK + ANSWER_IN + HOLD)
      })
      timers.push(setTimeout(() => runCycle(cycle + 1), CYCLE_DURATION * 1000))
    }

    runCycle(0)
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      setStep({ cycle: 0, q: 0, phase: 'typing' })
      setTyped('')
    }
  }, [active])

  useEffect(() => {
    if (step.phase !== 'typing') {
      setTyped('')
      return
    }
    const q = QUESTIONS[step.q].question
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(q.slice(0, i))
      if (i >= q.length) clearInterval(id)
    }, TYPE_MS)
    return () => clearInterval(id)
  }, [step])

  if (reduced) return <AskQuietStatic />

  const qa = QUESTIONS[step.q]
  const key = `${step.cycle}-${step.q}`
  const showBubble = step.phase === 'sent' || step.phase === 'thinking' || step.phase === 'answered'
  const showDots = step.phase === 'sent' || step.phase === 'thinking'
  const showAnswer = step.phase === 'answered'

  return (
    <div ref={ref}>
      <style>{'@keyframes aq-caret { 50% { opacity: 0 } }'}</style>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
        <ChatHeader />
        <div className="h-[360px] p-5 flex flex-col gap-3 overflow-hidden">
          <AnimatePresence>
            {showBubble && (
              <motion.div
                key={`bubble-${key}`}
                className="self-end max-w-[85%]"
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, transition: { duration: EXIT } }}
                transition={{ duration: 0.25 }}
              >
                <UserBubble>{qa.question}</UserBubble>
              </motion.div>
            )}
            {showDots && (
              <motion.div
                key={`dots-${key}`}
                className="self-start"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <ThinkingDots />
              </motion.div>
            )}
            {showAnswer && (
              <motion.div
                key={`answer-${key}`}
                className="self-start w-full"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: EXIT } }}
                transition={{ duration: ANSWER_IN, ease: [0.4, 0, 0.2, 1] }}
              >
                <AnswerCard qa={qa} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <InputBar typed={typed} typing={step.phase === 'typing'} />
      </div>
    </div>
  )
}

export default AskQuietAnimation
