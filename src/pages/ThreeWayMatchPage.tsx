import { Search, Layers, SlidersHorizontal, AlertCircle, Copy, TrendingUp, DollarSign, Calculator, FileWarning, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const steps = [
  { icon: Search, title: 'Auto-Match', desc: 'Invoice arrives. Quiet AI finds the PO and receiving record instantly by PO number, vendor, or line items.' },
  { icon: Layers, title: 'Line-Level Comparison', desc: 'Quantities, unit prices, tax, and totals compared line by line. Not just header amounts.' },
  { icon: SlidersHorizontal, title: 'Tolerance Rules', desc: 'You set the thresholds. $5 variance? Auto-approve. $500? Route to manager.' },
  { icon: AlertCircle, title: 'Exception Workflow', desc: 'Mismatches get flagged with the specific discrepancy. AI drafts a vendor inquiry email for you to send.' },
]

const catches = [
  { icon: Copy, text: 'Duplicate invoices for the same PO' },
  { icon: TrendingUp, text: 'Quantity billed > quantity received' },
  { icon: DollarSign, text: 'Unit price doesn\'t match the PO' },
  { icon: Calculator, text: 'Invoice total doesn\'t equal line item sum' },
  { icon: FileWarning, text: 'Tax calculated incorrectly' },
  { icon: Receipt, text: 'Vendor invoiced for items not on the PO' },
]

function ThreeWayMatchPage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              3 Way Match
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Touchless matching. Zero tolerance for overpayment.
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              AI matches invoices to purchase orders and receiving reports automatically, and flags what doesn't line up.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="https://quietai.fillout.com/book">Get a Demo</a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => { window.location.href = 'https://tryquiet.app' }}>
                Sign In
              </Button>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Manual matching is where AP hours go to die</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                'Your team spends hours cross-referencing invoices, POs, and receipts in spreadsheets',
                'Mismatches slip through and you overpay, or vendors escalate because you underpay',
                'Exceptions pile up with no clear workflow for resolution',
              ].map((text, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Quiet AI Matches */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Every invoice checked. Every discrepancy surfaced.</h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">Four-step matching from invoice arrival to resolution</p>
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

        {/* What Gets Caught */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Discrepancies Quiet AI catches that humans miss</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {catches.map((c, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 flex items-start gap-3">
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
            <h2 className="text-3xl font-bold mb-4">See how matching works on your invoices</h2>
            <p className="text-gray-400 mb-8">Watch Quiet AI match a real invoice in seconds.</p>
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

export default ThreeWayMatchPage
