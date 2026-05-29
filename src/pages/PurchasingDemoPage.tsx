import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, RotateCcw, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import PurchasingWorkflowAnimation, {
  SCENES,
} from '@/components/landing/PurchasingWorkflowAnimation'
import logo from '@/assets/images/logo.png'

function readInitialScene(): number {
  const params = new URLSearchParams(window.location.search)
  const raw = params.get('scene')
  if (raw === null) return 0
  const n = parseInt(raw, 10)
  if (Number.isNaN(n)) return 0
  return Math.max(0, Math.min(SCENES.length - 1, n))
}

function readInitialPlay(): boolean {
  const params = new URLSearchParams(window.location.search)
  return params.get('paused') !== '1'
}

function PurchasingDemoPage() {
  const [sceneIndex, setSceneIndex] = useState(readInitialScene)
  const [autoAdvance, setAutoAdvance] = useState(readInitialPlay)
  const [isFinished, setIsFinished] = useState(false)
  const [sceneComplete, setSceneComplete] = useState(false)
  // Monotonically increasing key to force CSS animation restart
  const [sceneKey, setSceneKey] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoAdvanceRef = useRef(autoAdvance)

  // Keep ref in sync with state
  useEffect(() => {
    autoAdvanceRef.current = autoAdvance
  }, [autoAdvance])

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Drive scene progression — always plays current scene to completion
  // The per-scene progress bar is driven by CSS animation (no state updates).
  // We still use RAF for the overall stage-indicator progress.
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
      // Pause: just stop auto-advance, let current scene finish
      setAutoAdvance(false)
    } else {
      // Resume: enable auto-advance
      setAutoAdvance(true)
      // If current scene already finished, advance now
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 group">
              <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
              <img src={logo} alt="Quiet" className="h-8" />
              <span className="font-semibold text-lg text-gray-900">Quiet AI</span>
            </a>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Live demo · Purchasing
            </span>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-12 pb-6 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
              Procure to pay · End to end
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Watch automated purchasing run.
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              From the moment a vendor quote arrives to the moment the bill is
              booked — Quiet AI drafts the PO, sends it, tracks the shipment,
              logs the receipt, and 3-way-matches the invoice. You just approve.
            </p>
          </div>
        </section>

        {/* Stage indicator */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Track */}
              <div className="absolute top-4 left-0 right-0 h-px bg-gray-200" />
              <div
                className="absolute top-4 left-0 h-px bg-blue-500"
                style={{ width: `${((sceneIndex + 0.5) / SCENES.length) * 100}%` }}
              />

              {/* Stages */}
              <div className="relative grid grid-cols-10 gap-0">
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
          </div>
        </section>

        {/* Animation canvas */}
        <section className="px-6 mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
              {/* Top progress bar — pure CSS animation for smoothness */}
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
                <PurchasingWorkflowAnimation sceneIndex={sceneIndex} />
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
                        Quote to booked bill — fully closed loop.
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.4 }}
                        className="mt-2 text-gray-600"
                      >
                        Ten steps, one human approval, zero spreadsheets.
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
                          <a href="mailto:hello@tryquiet.ai?subject=Interested%20in%20Quiet%20AI%20purchasing">
                            Talk to us
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Caption */}
            <div className="mt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sceneIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                    Step {sceneIndex + 1} of {SCENES.length} ·{' '}
                    {SCENES[sceneIndex].label}
                  </div>
                  <div className="mt-1 text-base text-gray-700">
                    {SCENES[sceneIndex].caption}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Story strip */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-white border border-gray-200 p-5">
                <div className="text-3xl font-bold text-gray-900">~11 days</div>
                <div className="mt-1 text-sm text-gray-600">
                  Quote to booked bill, including shipping and net-30 schedule
                </div>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-5">
                <div className="text-3xl font-bold text-gray-900">1 click</div>
                <div className="mt-1 text-sm text-gray-600">
                  The PO approval — everything before and after is hands-off
                </div>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-5">
                <div className="text-3xl font-bold text-gray-900">3-way</div>
                <div className="mt-1 text-sm text-gray-600">
                  PO, receipt and invoice reconciled automatically before payment
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Want to see this on your own POs?
              </h2>
              <p className="mt-2 text-gray-600">
                We can have you live and ordering against real vendors in under
                an hour.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button size="lg" asChild>
                  <a href="mailto:hello@tryquiet.ai?subject=Interested%20in%20Quiet%20AI%20purchasing&body=Hi%20Quiet%20team%2C%0A%0AI%27d%20love%20a%20demo%20on%20our%20own%20POs.%0A%0ABest%2C%0A%5BYour%20name%5D">
                    Get a demo
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#">Back to home</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-8 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="text-sm text-gray-400">&copy; 2026 Quiet AI</span>
            <div className="flex items-center gap-4">
              <a
                href="/privacy-policy.html"
                className="text-sm text-gray-400 hover:text-gray-700 underline"
              >
                Privacy Policy
              </a>
              <a
                href="/eula.html"
                className="text-sm text-gray-400 hover:text-gray-700 underline"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

export default PurchasingDemoPage
