import { FileText, FilePlus, Route, Send, PackageCheck, BarChart3, Eye, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const APP_URL = 'https://tryquiet.app'

const steps = [
  { icon: FileText, title: 'Quote Intake', desc: 'Forward a vendor quote to your purchasing inbox. Quiet extracts line items, pricing, and terms.' },
  { icon: FilePlus, title: 'Draft PO', desc: 'AI generates a purchase order pre-filled with vendor info, GL codes, and your approval matrix.' },
  { icon: Route, title: 'Approval Routing', desc: 'PO routes to the right manager based on amount, department, or category. Approve from Slack or email.' },
  { icon: Send, title: 'Send to Vendor', desc: 'Approved PO goes out to the vendor automatically. No copy-paste, no PDF exports.' },
  { icon: PackageCheck, title: 'Receipt & Close', desc: 'When goods arrive, mark received. Quiet updates the PO status and adjusts committed spend.' },
]

const visibility = [
  { icon: Eye, text: 'See open POs by vendor, department, or GL account' },
  { icon: BarChart3, text: 'Budget vs. committed vs. spent — in real time' },
  { icon: AlertTriangle, text: 'Flag POs that exceed thresholds before they\'re approved' },
]

function POLifecyclePage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              PO Lifecycle Management
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              From quote to closed PO — without the spreadsheet
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              AI turns vendor quotes into purchase orders, routes them for approval, and tracks every dollar against budget.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Purchase orders shouldn't take longer than the purchase</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                'Teams email quotes back and forth, manually re-key data into the ERP, and lose track of what\'s been approved',
                'Open POs pile up — nobody knows what\'s been received vs. what\'s still outstanding',
                'Budget overruns happen because there\'s no real-time visibility into committed spend',
              ].map((text, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">How it works</h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">Five steps from vendor quote to closed PO</p>
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

        {/* Real-Time Spend Visibility */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Know what you've committed before the invoice arrives</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {visibility.map((v, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700 text-sm">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stop managing POs in spreadsheets</h2>
            <p className="text-gray-400 mb-8">See how Quiet automates your entire PO lifecycle.</p>
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

export default POLifecyclePage
