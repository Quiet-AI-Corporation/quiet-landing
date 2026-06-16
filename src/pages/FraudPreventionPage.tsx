import { useState, useEffect, useRef, useCallback } from 'react'
import { ShieldAlert, Mail, Copy, FileWarning, Search, UserX, AlertTriangle, Ban, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import BusinessEmailCompromiseAnimation from '@/components/landing/BusinessEmailCompromiseAnimation'
import DuplicateDetectionAnimation from '@/components/landing/DuplicateDetectionAnimation'
import FakeInvoiceDeflectionAnimation from '@/components/landing/FakeInvoiceDeflectionAnimation'

const APP_URL = 'https://tryquiet.app'
const CYCLE_DURATION = 10 // seconds per cycle

const threats = [
  { icon: Mail, title: 'Business Email Compromise', desc: 'Fraudsters impersonate vendors and request payment detail changes. Quiet AI verifies sender identity against known contacts before any action is taken.' },
  { icon: Copy, title: 'Duplicate Invoices', desc: 'The same invoice submitted twice, sometimes months apart. Quiet AI matches invoice numbers, amounts, and line items to catch duplicates instantly.' },
  { icon: FileWarning, title: 'Fake Invoice Attacks', desc: 'Invoices from unknown vendors or spoofed domains. Quiet AI cross-references every sender against your onboarded vendor list and flags imposters.' },
]

const catches = [
  { icon: UserX, text: 'Unknown sender requesting payment detail changes' },
  { icon: AlertTriangle, text: 'Spoofed domains mimicking internal employees' },
  { icon: Copy, text: 'Duplicate invoices submitted weeks, months, or years apart' },
  { icon: Search, text: 'Invoices from vendors not in your system' },
  { icon: Ban, text: 'Payment requests with mismatched contact info' },
  { icon: ShieldAlert, text: 'Potential impersonation attacks on your AP inbox' },
]

function AnimationPlayer({ title, subtitle, children, height = 'h-[500px]', bg = '' }: {
  title: string
  subtitle: string
  children: React.ReactNode
  height?: string
  bg?: string
}) {
  const [looping, setLooping] = useState(true)
  const [animKey, setAnimKey] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loopingRef = useRef(looping)

  useEffect(() => {
    loopingRef.current = looping
  }, [looping])

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (loopingRef.current) {
        setAnimKey((k) => k + 1)
      }
    }, CYCLE_DURATION * 1000)

    return clearTimer
  }, [animKey, clearTimer])

  const handleToggle = () => {
    setLooping((l) => !l)
  }

  return (
    <section className={`py-16 px-6 ${bg}`}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h2>
        <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">{subtitle}</p>
        <div className="relative rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-10">
            <div
              key={animKey}
              className="h-full bg-blue-500"
              style={{
                width: '100%',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                animation: `progress-fill ${CYCLE_DURATION}s linear forwards`,
              }}
            />
          </div>

          {/* Pause / Play button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleToggle}
                className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/60 hover:bg-white/90 text-gray-400 hover:text-gray-700 transition-all backdrop-blur-sm"
              >
                {looping ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {looping ? 'Pause animation after one cycle' : 'Loop animation'}
            </TooltipContent>
          </Tooltip>

          <div className={`p-6 ${height}`} key={animKey}>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

function FraudPreventionPage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              Fraud & Duplicate Prevention
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Every invoice verified. Every threat stopped.
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              AI checks every invoice against your vendor records, contact lists, and payment history before anything gets paid.
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

        {/* The Problem */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">AP fraud is growing and manual review can't keep up</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                'Business email compromise cost companies $2.9 billion in 2023, and AP teams are the #1 target',
                'Duplicate invoices slip through when teams process hundreds of bills a month across email and portals',
                'Fake invoices from unknown senders look legitimate enough to fool a busy AP clerk',
              ].map((text, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Quiet AI Protects You */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Three layers of protection, fully automated</h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">Every invoice is checked for fraud, duplicates, and vendor legitimacy before it enters your workflow</p>
            <div className="space-y-6">
              {threats.map((threat, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <threat.icon className="w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{threat.title}</h3>
                    <p className="text-gray-600 text-sm">{threat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Animation: Business Email Compromise */}
        <AnimationPlayer
          title="Business Email Compromise Detection"
          subtitle="A vendor contact requests a payment info change. Quiet AI verifies the sender before acting"
          bg="bg-gray-50"
        >
          <BusinessEmailCompromiseAnimation />
        </AnimationPlayer>

        {/* Animation: Duplicate Detection */}
        <AnimationPlayer
          title="Duplicate Invoice Detection"
          subtitle="An invoice arrives that matches one already on file. Quiet AI catches it and drafts a clarification"
        >
          <DuplicateDetectionAnimation />
        </AnimationPlayer>

        {/* Animation: Fake Invoice Deflection */}
        <AnimationPlayer
          title="Fake Invoice Deflection"
          subtitle="A spoofed email tries to push a fraudulent invoice. Quiet AI identifies the impersonation attempt"
          height="h-[420px]"
          bg="bg-gray-50"
        >
          <FakeInvoiceDeflectionAnimation />
        </AnimationPlayer>

        {/* What Gets Caught */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Threats Quiet AI catches before you pay</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {catches.map((c, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-200 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                    <c.icon className="w-4 h-4" />
                  </div>
                  <p className="text-gray-700 text-sm pt-1">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">See how Quiet AI protects your AP process</h2>
            <p className="text-gray-400 mb-8">Watch fraud detection in action on real invoice scenarios.</p>
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <a href="https://quietai.fillout.com/book">Get a Demo</a>
            </Button>
          </div>
        </section>

        <Footer />

        <style>{`
          @keyframes progress-fill {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}</style>
      </div>
    </TooltipProvider>
  )
}

export default FraudPreventionPage
