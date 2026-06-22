import { Landmark, ArrowDownRight, ArrowUpRight, TrendingUp, Percent, Clock, Layers, BrainCircuit, Eye, CalendarClock, ShieldAlert, BadgePercent, ReceiptText, Zap, Lightbulb, Unplug } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const APP_URL = 'https://tryquiet.app'

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
  { icon: ReceiptText, title: 'Tactical credit application', desc: 'Apply vendor credits strategically to optimize your net cash position across payables.' },
  { icon: Zap, title: 'Just-in-time funding', desc: 'Maximize yield by transferring funds to your operating account only when payments are due, not a day earlier.' },
  { icon: Lightbulb, title: 'Optimal timing recommendations', desc: 'See data-driven suggestions for when to pay each bill based on your cash forecast, discount terms, and vendor priority.' },
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
              A complete picture of money in and money out
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
              You can't manage cash if you can't see it
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                'Cash position lives in a spreadsheet that\'s out of date the moment it\'s saved',
                'Upcoming payables and receivables aren\'t connected, so you\'re guessing at runway',
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
