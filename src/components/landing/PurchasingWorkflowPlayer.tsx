import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import PurchasingWorkflowAnimation, {
  SCENES,
} from '@/components/landing/PurchasingWorkflowAnimation'
import logo from '@/assets/images/logo.png'

function PurchasingWorkflowPlayer() {
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
    <div className="text-left">
      {/* Stage indicator */}
      <div className="relative mb-8">
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

        <div className="aspect-[2/1]">
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
    </div>
  )
}

export default PurchasingWorkflowPlayer
