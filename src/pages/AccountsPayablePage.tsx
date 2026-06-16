import { useState, useEffect, useRef, useCallback } from 'react'
import { Mail, FileSearch, GitCompare, MessageSquare, CreditCard, RefreshCw, Brain, Inbox, UserCheck, Play, Pause, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import EndToEndWorkflowAnimation, { SCENES } from '@/components/landing/EndToEndWorkflowAnimation'
import logo from '@/assets/images/logo.png'

const APP_URL = 'https://tryquiet.app'

const steps = [
  { icon: Mail, title: 'Intake', desc: 'Invoices arrive by email. Quiet reads every line, even handwritten ones.' },
  { icon: FileSearch, title: 'Extract & Code', desc: 'AI pulls header, line items, tax, and maps to the right GL codes automatically.' },
  { icon: GitCompare, title: 'Match', desc: '3-way match against PO and receipt. Discrepancies get flagged, not ignored.' },
  { icon: MessageSquare, title: 'Route for Approval', desc: 'The right approver gets a Slack message or email. One click to approve.' },
  { icon: CreditCard, title: 'Schedule Payment', desc: 'Approved invoices queue for payment on your terms — ACH, check, or card.' },
  { icon: RefreshCw, title: 'Sync to ERP', desc: 'Bill, payment, and journal entry post to QuickBooks, NetSuite, Xero, or Sage.' },
]

const differentiators = [
  { icon: Brain, title: 'Learns your GL', desc: 'Quiet studies your historical coding patterns and gets smarter every invoice.' },
  { icon: Inbox, title: 'Works in your inbox', desc: 'Vendors keep emailing you. No portal migration, no vendor onboarding.' },
  { icon: UserCheck, title: 'Human-in-the-loop', desc: 'AI does the work. You approve the results. Nothing sends without your OK.' },
]

const stats = [
  { value: '< 30s', label: 'Average invoice processing time' },
  { value: '95%+', label: 'Invoices processed without human touch' },
  { value: '0', label: 'New portals your vendors need to learn' },
]

function AccountsPayablePage() {
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
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              Accounts Payable
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              One AP clerk, forever
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              With AI handling the busywork, AP becomes a single staffer's part-time job.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="https://quietai.fillout.com/book">Get a Demo</a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => { window.location.href = APP_URL }}>
                Sign In
              </Button>
            </div>
          </div>
        </section>

        {/* AP Workflow Animation */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Stage indicator */}
            <div className="relative mb-8">
              <div className="absolute top-4 left-0 right-0 h-px bg-gray-200" />
              <div
                className="absolute top-4 left-0 h-px bg-blue-500"
                style={{ width: `${((sceneIndex + 0.5) / SCENES.length) * 100}%` }}
              />
              <div className="relative grid grid-cols-8 gap-0">
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
                <EndToEndWorkflowAnimation sceneIndex={sceneIndex} />
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
                        That's the whole workflow.
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.4 }}
                        className="mt-2 text-gray-600"
                      >
                        Eight steps, two human touches, one happy vendor.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Your AP team is drowning in paper</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                'Every invoice means data entry, coding, matching, chasing approvals, and cutting checks',
                'One AP clerk costs $55K+/year — and still can\'t keep up with volume spikes',
                'Late payments damage vendor relationships and cost you early-pay discounts',
              ].map((text, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Quiet Handles AP */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">End-to-end, no humans needed until it's time to pay</h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">Six steps from inbox to books — all handled by AI</p>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-semibold text-gray-400 uppercase">Step {i + 1}</span>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes Quiet Different */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Not another portal. An actual AI teammate.</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {differentiators.map((d, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                    <d.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{d.title}</h3>
                  <p className="text-gray-600 text-sm">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* By the Numbers */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">What AP looks like with Quiet</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-4xl font-bold text-blue-600 mb-2">{s.value}</p>
                  <p className="text-gray-600 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">See it handle your invoices</h2>
            <p className="text-gray-400 mb-8">Watch Quiet process a real invoice in under 30 seconds.</p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <a href="https://quietai.fillout.com/book">Get a Demo</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                <a href="/demo">Watch the Demo</a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </TooltipProvider>
  )
}

export default AccountsPayablePage
