import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import EndToEndWorkflowAnimation, {
  SCENES,
} from '@/components/landing/EndToEndWorkflowAnimation'
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

function WorkflowDemoPage() {
  const [sceneIndex, setSceneIndex] = useState(readInitialScene)
  const [isPlaying, setIsPlaying] = useState(readInitialPlay)
  const [isFinished, setIsFinished] = useState(false)
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number>(0)
  const sceneStartRef = useRef<number>(0)

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [])

  // Drive scene progression
  useEffect(() => {
    if (!isPlaying || isFinished) return
    const durationMs = SCENES[sceneIndex].duration * 1000
    sceneStartRef.current = performance.now()
    setProgress(0)

    const tick = () => {
      const elapsed = performance.now() - sceneStartRef.current
      setProgress(Math.min(1, elapsed / durationMs))
      if (elapsed < durationMs) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    timeoutRef.current = setTimeout(() => {
      if (sceneIndex < SCENES.length - 1) {
        setSceneIndex((i) => i + 1)
      } else {
        setIsFinished(true)
        setIsPlaying(false)
        setProgress(1)
      }
    }, durationMs)

    return clearTimers
  }, [sceneIndex, isPlaying, isFinished, clearTimers])

  const handleRestart = () => {
    clearTimers()
    setSceneIndex(0)
    setIsFinished(false)
    setIsPlaying(true)
    setProgress(0)
  }

  const handlePauseToggle = () => {
    if (isFinished) {
      handleRestart()
      return
    }
    setIsPlaying((p) => !p)
  }

  const handleStageClick = (i: number) => {
    clearTimers()
    setSceneIndex(i)
    setIsFinished(false)
    setIsPlaying(true)
    setProgress(0)
  }

  const overallProgress = ((sceneIndex + progress) / SCENES.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Nav />

      {/* Hero */}
      <section className="pt-12 pb-6 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
            One invoice · End to end
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Watch automated AP run.
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            From the moment a vendor email lands to the moment the payment is booked —
            every step Quiet AI runs on autopilot, with you in the loop only where it
            matters.
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
              className="absolute top-4 left-0 h-px bg-blue-500 transition-[width] duration-100 ease-linear"
              style={{ width: `${overallProgress}%` }}
            />

            {/* Stages */}
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
        </div>
      </section>

      {/* Animation canvas */}
      <section className="px-6 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
            <div className="aspect-[16/9]">
              <EndToEndWorkflowAnimation sceneIndex={sceneIndex} />
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
              <div
                className="h-full bg-blue-500"
                style={{
                  width: `${progress * 100}%`,
                  transition: isPlaying
                    ? 'width 100ms linear'
                    : 'width 0ms',
                }}
              />
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
                        <a href="mailto:hello@tryquiet.ai?subject=Interested%20in%20Quiet%20AI">
                          Talk to us
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Caption + controls */}
          <div className="mt-5 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sceneIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                    Step {sceneIndex + 1} of {SCENES.length} · {SCENES[sceneIndex].label}
                  </div>
                  <div className="mt-1 text-base text-gray-700">
                    {SCENES[sceneIndex].caption}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={handlePauseToggle}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors flex-shrink-0"
            >
              {isFinished ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  Restart
                </>
              ) : isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Resume
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Story strip */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white border border-gray-200 p-5">
              <div className="text-3xl font-bold text-gray-900">~3 min</div>
              <div className="mt-1 text-sm text-gray-600">
                Start to finish, including approval wait time
              </div>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-5">
              <div className="text-3xl font-bold text-gray-900">2 clicks</div>
              <div className="mt-1 text-sm text-gray-600">
                One to approve, one to pay — everything else runs on autopilot
              </div>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-5">
              <div className="text-3xl font-bold text-gray-900">0 portals</div>
              <div className="mt-1 text-sm text-gray-600">
                Vendors keep emailing the same address they always have
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Want to see this on your own invoices?
            </h2>
            <p className="mt-2 text-gray-600">
              We can have you live and processing real invoices in under 30 minutes.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button size="lg" asChild>
                <a href="mailto:hello@tryquiet.ai?subject=Interested%20in%20Quiet%20AI&body=Hi%20Quiet%20team%2C%0A%0AI%27d%20love%20a%20demo%20on%20our%20own%20invoices.%0A%0ABest%2C%0A%5BYour%20name%5D">
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

      <Footer />
    </div>
  )
}

export default WorkflowDemoPage
