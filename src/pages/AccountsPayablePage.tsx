import { Mail, FileSearch, GitCompare, MessageSquare, CreditCard, RefreshCw, Brain, Inbox, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

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
              Never hire another AP clerk
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              From purchase orders to payments, AI handles the busywork end to end.
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
                <a href="#demo">Watch the Demo</a>
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
