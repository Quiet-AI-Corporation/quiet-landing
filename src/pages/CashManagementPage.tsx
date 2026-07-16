import { useState, useEffect, useRef, useCallback } from 'react'
import { Landmark, ArrowDownRight, ArrowUpRight, TrendingUp, Percent, Clock, Layers, BrainCircuit, Eye, CalendarClock, ShieldAlert, BadgePercent, ReceiptText, Zap, Lightbulb, Unplug, Play, Pause, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ModuleIncludes, { type IncludedFeature } from '@/components/landing/ModuleIncludes'
import CashManagementAnimation, { SCENES } from '@/components/landing/CashManagementAnimation'
import logo from '@/assets/images/logo.png'

const APP_URL = 'https://tryquiet.app'

const included: IncludedFeature[] = [
  { text: 'Real-time cash position via bank sync' },
  { text: 'Committed outflows and expected inflows in one view' },
  { text: 'Cash forecasting at 7, 14, 30, 60, and 90 days' },
  { text: 'Payment scheduling and batching' },
  { text: 'Cash threshold warnings' },
  { text: 'Early-pay discount capture' },
]

const dashboard = [
  { icon: Landmark, title: 'Cash on hand', desc: 'Real-time bank balance via Plaid' },
  { icon: ArrowDownRight, title: 'Committed outflows', desc: 'Approved invoices and scheduled payments' },
  { icon: ArrowUpRight, title: 'Expected inflows', desc: 'Outstanding receivables and their aging' },
  { icon: TrendingUp, title: 'Net position', desc: 'Where you\'ll be in 7, 14, 30, 60, 90 days' },
]

const timing = [
  { icon: Percent, text: 'Capture early-pay discounts automatically when cash allows' },
  { icon: Clock, text: 'Defer payments to preserve runway when cash is tight' },
  { icon: Layers, text: 'Batch payments by day to minimize transaction costs' },
]

const advantages = [
  { icon: BrainCircuit, title: 'Learn from billing patterns', desc: 'Quiet AI studies your invoice history to better anticipate future cash outflows before they hit.' },
  { icon: Eye, title: 'Real-time cash visibility', desc: 'Outgoing payments automatically update your cash position. No waiting for bank feeds to sync.' },
  { icon: CalendarClock, title: 'Due-date-driven forecasting', desc: 'Every invoice due date feeds directly into your forward cash picture, so projections are always grounded in real obligations.' },
  { icon: ShieldAlert, title: 'Cash threshold warnings', desc: 'Get alerts before a payment would push you below your desired cash floor, so you can act before it\'s a problem.' },
  { icon: BadgePercent, title: 'Capture early-pay discounts', desc: 'Quiet AI flags discount windows and lets you capture them at the moments when your cash position allows it.' },
  { icon: ReceiptText, title: 'Tactical credit application', desc: 'Apply supplier credits strategically to optimize your net cash position across payables.' },
  { icon: Zap, title: 'Just-in-time funding', desc: 'Maximize yield by transferring funds to your operating account only when payments are due, not a day earlier.' },
  { icon: Lightbulb, title: 'Optimal timing recommendations', desc: 'See data-driven suggestions for when to pay each bill based on your cash forecast, discount terms, and supplier priority.' },
  { icon: Unplug, title: 'No rekeying, no file exports', desc: 'Payments flow straight from approval to execution. No toggling between an AP tool and a banking portal, and no uploading payment files.' },
]

// Animation timing constants
const SECTION_DURATION = 0.5
const CARD_DURATION = 0.4
const CARD_STAGGER = 0.1
const HERO_STAGGER = 0.15
const HOVER_DURATION = 0.2
const SECTION_Y = 32
const CARD_Y = 24
const VIEWPORT_ONCE = { once: true, margin: '-80px' }

function CashManagementPage() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [isFinished, setIsFinished] = useState(false)
  const [sceneComplete, setSceneComplete] = useState(false)
  const [sceneKey, setSceneKey] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoAdvanceRef = useRef(autoAdvance)

  useEffect(() => {
    autoAdvanceRef.current = autoAdvance
  }, [autoAdvance])

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isFinished) return
    setSceneComplete(false)
    const durationMs = SCENES[sceneIndex].duration * 1000

    timeoutRef.current = setTimeout(() => {
      setSceneComplete(true)
      if (autoAdvanceRef.current) {
        if (sceneIndex < SCENES.length - 1) {
          setSceneIndex((i) => i + 1)
          setSceneKey((k) => k + 1)
        } else {
          setIsFinished(true)
        }
      }
    }, durationMs)

    return clearTimers
  }, [sceneIndex, isFinished, clearTimers])

  const handleRestart = () => {
    clearTimers()
    setSceneIndex(0)
    setSceneKey((k) => k + 1)
    setIsFinished(false)
    setAutoAdvance(true)
    setSceneComplete(false)
  }

  const handlePauseToggle = () => {
    if (isFinished) {
      handleRestart()
      return
    }
    if (autoAdvance) {
      setAutoAdvance(false)
    } else {
      setAutoAdvance(true)
      if (sceneComplete && sceneIndex < SCENES.length - 1) {
        setSceneComplete(false)
        setSceneIndex((i) => i + 1)
        setSceneKey((k) => k + 1)
      }
    }
  }

  const handleStageClick = (i: number) => {
    clearTimers()
    setSceneIndex(i)
    setSceneKey((k) => k + 1)
    setIsFinished(false)
    setSceneComplete(false)
  }

  const sceneDuration = SCENES[sceneIndex].duration

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: CARD_DURATION }}
            >
              Cash Management
            </motion.p>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: CARD_DURATION, delay: HERO_STAGGER }}
            >
              See your cash before the next big material buy
            </motion.h1>
            <motion.p
              className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: CARD_DURATION, delay: HERO_STAGGER * 2 }}
            >
              Real-time cash position, payment scheduling, and forecasting, powered by your actual AP and AR data.
            </motion.p>
            <motion.div
              className="mt-8 flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: CARD_DURATION, delay: HERO_STAGGER * 3 }}
            >
              <Button asChild size="lg">
                <a href="https://quietai.fillout.com/book">Get a Demo</a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => { window.location.href = APP_URL }}>
                Sign In
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Cash Management Animation */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Stage indicator */}
            <div className="relative mb-8">
              <div className="absolute top-4 left-0 right-0 h-px bg-gray-200" />
              <div
                className="absolute top-4 left-0 h-px bg-blue-500"
                style={{ width: `${((sceneIndex + 0.5) / SCENES.length) * 100}%` }}
              />
              <div className="relative grid grid-cols-5 gap-0">
                {SCENES.map((scene, i) => {
                  const isActive = i === sceneIndex && !isFinished
                  const isComplete = i < sceneIndex || isFinished
                  return (
                    <button
                      key={scene.id}
                      onClick={() => handleStageClick(i)}
                      className="flex flex-col items-center text-center px-1 group"
                    >
                      <div
                        className={`relative w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all
                          ${
                            isActive
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                              : isComplete
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-400 border border-gray-300 group-hover:border-gray-400'
                          }
                        `}
                      >
                        {isComplete && !isActive ? (
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.704 5.296a1 1 0 010 1.408l-7.5 7.5a1 1 0 01-1.408 0l-3.5-3.5a1 1 0 011.408-1.408L8.5 12.092l6.796-6.796a1 1 0 011.408 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          i + 1
                        )}
                        {isActive && (
                          <span className="absolute inset-0 rounded-full bg-blue-400 opacity-40 animate-ping" />
                        )}
                      </div>
                      <div
                        className={`mt-2 text-xs font-medium leading-tight transition-colors
                          ${
                            isActive
                              ? 'text-gray-900'
                              : isComplete
                                ? 'text-gray-600'
                                : 'text-gray-400 group-hover:text-gray-600'
                          }
                        `}
                      >
                        {scene.label}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Animation canvas */}
            <div className="relative rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
              {/* Top progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-10">
                <div
                  key={sceneKey}
                  className="h-full bg-blue-500"
                  style={{
                    width: '100%',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    animation: `progress-fill ${sceneDuration}s linear forwards`,
                  }}
                />
                <style>{`
                  @keyframes progress-fill {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                  }
                `}</style>
              </div>

              {/* Pause / Resume button */}
              {!isFinished && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handlePauseToggle}
                      className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/60 hover:bg-white/90 text-gray-400 hover:text-gray-700 transition-all backdrop-blur-sm"
                    >
                      {autoAdvance ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    {autoAdvance
                      ? 'Progress through animations manually'
                      : 'Auto-play animations'}
                  </TooltipContent>
                </Tooltip>
              )}

              <div className="aspect-[16/9]">
                <CashManagementAnimation sceneIndex={sceneIndex} />
              </div>

              {/* Finished overlay */}
              <AnimatePresence>
                {isFinished && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/30 flex items-center justify-center"
                  >
                    <div className="text-center max-w-md px-6">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4, ease: 'backOut' }}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 border border-blue-100 mb-4"
                      >
                        <img src={logo} alt="Quiet" className="h-7" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="text-2xl font-bold text-gray-900"
                      >
                        That's cash management on autopilot.
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.4 }}
                        className="mt-2 text-gray-600"
                      >
                        A live position, a forecast you can trust, and every payment timed to protect your cash.
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                        className="mt-6 flex items-center justify-center gap-3"
                      >
                        <Button onClick={handleRestart} className="gap-2">
                          <RotateCcw className="w-4 h-4" />
                          Watch again
                        </Button>
                        <Button asChild variant="outline" className="gap-2">
                          <a href="https://quietai.fillout.com/book">Get a Demo</a>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: SECTION_Y }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: SECTION_DURATION }}
            >
              You can't manage cash when it's sitting in inventory
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                'Cash position lives in a spreadsheet that\'s out of date the moment it\'s saved',
                'Material buys commit cash weeks before revenue lands, and payables and receivables aren\'t connected',
                'Payment timing decisions are made on gut feel, not data',
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-gray-200"
                  initial={{ opacity: 0, y: CARD_Y }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: CARD_DURATION, delay: i * CARD_STAGGER }}
                >
                  <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What You See */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: SECTION_Y }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: SECTION_DURATION }}
            >
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Your cash position, always current</h2>
              <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">Everything you need to know, in one view</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {dashboard.map((d, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex items-start gap-4"
                  initial={{ opacity: 0, y: CARD_Y }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: CARD_DURATION, delay: i * CARD_STAGGER }}
                  whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transition: { duration: HOVER_DURATION } }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <d.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{d.title}</h3>
                    <p className="text-gray-600 text-sm">{d.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Payment Timing */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-gray-900 text-center mb-10"
              initial={{ opacity: 0, y: SECTION_Y }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: SECTION_DURATION }}
            >
              Pay at the right time, every time
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {timing.map((t, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                  initial={{ opacity: 0, y: CARD_Y }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: CARD_DURATION, delay: i * CARD_STAGGER }}
                  whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transition: { duration: HOVER_DURATION } }}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                    <t.icon className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700 text-sm">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why AP + Cash Management Together */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: SECTION_Y }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: SECTION_DURATION }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 text-center mb-3">
                Why Quiet AI
              </p>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Cash management that&rsquo;s smarter because it&rsquo;s connected to your payables
              </h2>
              <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
                Standalone treasury tools only see bank balances. Because Quiet AI runs your AP and procurement end-to-end, your cash position is informed by every invoice, credit, and payment decision.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {advantages.map((item, i) => (
                <motion.div
                  key={i}
                  className="group bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-colors duration-200"
                  initial={{ opacity: 0, y: CARD_Y }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: CARD_DURATION, delay: i * CARD_STAGGER }}
                  whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', transition: { duration: HOVER_DURATION } }}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 text-blue-600 flex items-center justify-center mb-4 transition-colors duration-200">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <ModuleIncludes features={included} />

        {/* CTA */}
        <section className="py-16 px-6 bg-gray-900 text-white">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: SECTION_Y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">See your cash position in real time</h2>
            <p className="text-gray-400 mb-8">Know exactly where your money is and where it's going.</p>
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <a href="https://quietai.fillout.com/book">Get a Demo</a>
            </Button>
          </motion.div>
        </section>

        <Footer />
      </div>
    </TooltipProvider>
  )
}

export default CashManagementPage
