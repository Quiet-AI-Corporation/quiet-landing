import { Landmark, ArrowDownRight, ArrowUpRight, TrendingUp, Percent, Clock, Layers } from 'lucide-react'
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

function CashManagementPage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              Cash Management
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              A complete picture of money in and money out
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time cash position, payment scheduling, and forecasting, powered by your actual AP and AR data.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You can't manage cash if you can't see it</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                'Cash position lives in a spreadsheet that\'s out of date the moment it\'s saved',
                'Upcoming payables and receivables aren\'t connected, so you\'re guessing at runway',
                'Payment timing decisions are made on gut feel, not data',
              ].map((text, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You See */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Your cash position, always current</h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">Everything you need to know, in one view</p>
            <div className="grid md:grid-cols-2 gap-6">
              {dashboard.map((d, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <d.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{d.title}</h3>
                    <p className="text-gray-600 text-sm">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Payment Timing */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Pay at the right time, every time</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {timing.map((t, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                    <t.icon className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700 text-sm">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">See your cash position in real time</h2>
            <p className="text-gray-400 mb-8">Know exactly where your money is and where it's going.</p>
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <a href="https://quietai.fillout.com/book">Get a Demo</a>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </TooltipProvider>
  )
}

export default CashManagementPage
