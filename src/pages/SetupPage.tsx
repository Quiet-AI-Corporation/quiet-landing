import { Mail, Database, Settings, Shield, Lock, Eye, UserCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const APP_URL = 'https://tryquiet.app'

const setupSteps = [
  {
    time: '2 min',
    icon: Mail,
    title: 'Connect Your Inbox',
    desc: 'Sign in with Google or Microsoft. Quiet connects to your existing purchasing email — purchasing@yourcompany.com or wherever vendors send invoices.',
    detail: 'No forwarding rules. No new email addresses. Vendors don\'t change a thing.',
  },
  {
    time: '5 min',
    icon: Database,
    title: 'Connect Your ERP',
    desc: 'Authenticate with QuickBooks, NetSuite, Xero, Sage, or FreshBooks. Quiet pulls your chart of accounts, vendor list, and recent history.',
    detail: 'Zero configuration spreadsheets. No field mapping. It just reads your books.',
  },
  {
    time: '8 min',
    icon: Settings,
    title: 'Set Your Rules',
    desc: 'Tell Quiet who approves what: dollar thresholds, departments, categories. Or start with a simple rule and refine later.',
    detail: 'Quiet studies your last 6 months of GL coding to learn your patterns. First invoices start processing immediately.',
  },
]

const security = [
  { icon: Shield, text: 'SOC 2 Type II compliant' },
  { icon: Lock, text: 'Bank-grade encryption at rest and in transit' },
  { icon: Eye, text: 'No data used for model training' },
  { icon: UserCog, text: 'Role-based access controls' },
]

function SetupPage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              Setup
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Live in 15 minutes. Not 15 weeks.
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Connect your email and ERP. Quiet learns your GL codes and approval rules. Start processing invoices the same day.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="https://quietai.fillout.com/book">Get Started</a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => { window.location.href = APP_URL }}>
                Sign In
              </Button>
            </div>
          </div>
        </section>

        {/* Three-Step Setup */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {setupSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-blue-600 mt-2">{step.time}</span>
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase">Step {i + 1}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{step.desc}</p>
                    <p className="text-gray-500 text-sm italic">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Happens Next */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Your first invoice, processed in under a minute</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                'Quiet reads every invoice that hits your inbox',
                'GL codes are suggested based on your history',
                'Approvals route automatically',
                'You review and approve — nothing happens without you',
              ].map((text, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Enterprise security from day one</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {security.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700 text-sm">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Set up in 15 minutes. See the difference in 15 seconds.</h2>
            <p className="text-gray-400 mb-8">No implementation team required.</p>
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <a href="https://quietai.fillout.com/book">Get Started Free</a>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </TooltipProvider>
  )
}

export default SetupPage
