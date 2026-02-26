import { useState } from 'react'
import { Button } from '@/components/ui/button'
import InvoiceProcessingAnimation from '@/components/landing/InvoiceProcessingAnimation'
import logo from '@/assets/images/logo.png'

const APP_URL = 'https://tryquiet.app'

const USE_CASES = [
  { label: 'Invoice Processing', imageAlt: 'Invoice processing screenshot' },
  { label: 'Vendor Onboarding', imageAlt: 'Vendor onboarding screenshot' },
  { label: 'Intelligent Coding', imageAlt: 'Intelligent coding screenshot' },
  { label: 'Inquiry Responses', imageAlt: 'Inquiry responses screenshot' },
  { label: 'Gathering Approvals', imageAlt: 'Gathering approvals screenshot' },
  { label: 'Fraud Prevention', imageAlt: 'Fraud prevention screenshot' },
  { label: 'Duplicate Prevention', imageAlt: 'Duplicate prevention screenshot' },
  { label: '3-Way Matching', imageAlt: '3-way matching screenshot', comingSoon: true },
]

function LandingPage() {
  const [selectedUseCase, setSelectedUseCase] = useState(0)

  const handleLogin = () => {
    window.location.href = APP_URL
  }

  const handleSignup = () => {
    window.location.href = APP_URL
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Quiet" className="h-8" />
            <span className="font-semibold text-lg text-gray-900">Quiet</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleLogin}>
              Sign In
            </Button>
            <Button onClick={handleSignup}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            Accounts payable
            <br />
            on autopilot
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Stop processing invoices. Start approving them. Quiet automates the grunt work of
            AP — you keep the controls.
          </p>
          {/* Hero graphic area — controlled by pills */}
          <div className="mt-12 max-w-4xl mx-auto">
            {selectedUseCase === 0 ? (
              <div className="aspect-[16/9] flex items-stretch overflow-hidden">
                <InvoiceProcessingAnimation key={`invoice-${Date.now()}`} />
              </div>
            ) : (
              <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center border border-gray-200">
                <span className="text-gray-400 text-sm">
                  {USE_CASES[selectedUseCase].imageAlt}
                </span>
              </div>
            )}
            {USE_CASES[selectedUseCase].comingSoon && (
              <p className="mt-4 text-sm text-gray-400 italic">Coming soon</p>
            )}
          </div>

          {/* Use-case pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {USE_CASES.map((uc, i) => (
              <button
                key={uc.label}
                onClick={() => setSelectedUseCase(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedUseCase === i
                    ? 'bg-gray-900 text-white'
                    : uc.comingSoon
                      ? 'bg-gray-50 text-gray-400 border border-dashed border-gray-300 hover:bg-gray-100'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {uc.label}{uc.comingSoon ? ' ✦' : ''}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-20 px-6 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            A review-and-approve workflow for everything AP.
          </h2>
          <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Quiet does the processing. You just check the work.
          </p>
          <div className="mb-16">
            <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center border border-gray-200">
              <span className="text-gray-400 text-sm text-center max-w-lg px-4">Review-and-approve animation placeholder — A trace mapping the journey of an email into Quiet AI which results in: a request for W-9 information, a clarification on the purchase order, and a request for remittance info. Consolidated into an email which is sent. GL coding is done.</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hands-free processing</h3>
              <p className="text-gray-600 leading-relaxed">
                Invoices are captured, matched, and coded automatically. Your team reviews the
                finished result, not the raw data.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Human-approved payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Payments are prepared and staged, never executed, until an authorized approver signs
                off.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Communications you control</h3>
              <p className="text-gray-600 leading-relaxed">
                Every email — to vendors, your team, and any third parties — is drafted for you.
                Nothing is sent until you hit send.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it connects */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Plugs into the tools you already use
          </h2>
          <p className="text-lg text-gray-500 text-center mb-16 max-w-2xl mx-auto">
            Quiet sits between your inbox, your bank, and your ERP — so your existing workflows
            don't change, they just get faster. Up and running in minutes, not months.
          </p>

          {/* Diagram */}
          <div className="flex flex-col items-center gap-4">
            {/* Top: Email Inbox */}
            <div className="group rounded-xl border border-gray-300 bg-white px-8 py-5 text-center transition-all duration-200 hover:scale-110 hover:border-blue-500 hover:shadow-lg cursor-default">
              <div className="font-bold text-gray-900">Your Email Inbox</div>
              <p className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2 transition-all duration-200 text-sm text-gray-600">
                Invoices are pulled automatically from your AP inbox. No scanning, no forwarding, no
                manual upload.
              </p>
            </div>

            {/* Arrow down + label */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-gray-400 uppercase tracking-widest">invoices arrive</span>
              <span className="text-gray-300 text-2xl">↓</span>
            </div>

            {/* Middle row: Bank ← Quiet → ERP */}
            <div className="flex items-start justify-center gap-6 md:gap-12 w-full">
              {/* Bank */}
              <div className="flex-1 max-w-[200px] text-center">
                <div className="group rounded-xl border border-gray-300 bg-white px-6 py-5 transition-all duration-200 hover:scale-110 hover:border-blue-500 hover:shadow-lg cursor-default">
                  <div className="font-bold text-gray-900">Your Bank Account</div>
                  <p className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2 transition-all duration-200 text-sm text-gray-600">
                    Payments are staged and ready to go. One click to approve, and the money moves.
                  </p>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Stages payments for approval
                </p>
              </div>

              {/* Arrows + Quiet */}
              <div className="flex items-center gap-3 pt-3">
                <span className="text-gray-300 text-xl">←</span>
                <div className="rounded-xl border-2 border-blue-500 bg-white px-8 py-5 text-center">
                  <div className="font-bold text-gray-900">Quiet</div>
                </div>
                <span className="text-gray-300 text-xl">→</span>
              </div>

              {/* ERP */}
              <div className="flex-1 max-w-[200px] text-center">
                <div className="group rounded-xl border border-gray-300 bg-white px-6 py-5 transition-all duration-200 hover:scale-110 hover:border-blue-500 hover:shadow-lg cursor-default">
                  <div className="font-bold text-gray-900">Your ERP</div>
                  <p className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2 transition-all duration-200 text-sm text-gray-600">
                    Vendors, GL codes, and payment records sync both ways. No double entry.
                  </p>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Syncs vendors, GL codes, and payment records
                </p>
              </div>
            </div>

            {/* Caption under Quiet */}
            <p className="text-sm text-gray-500 text-center -mt-1">
              Captures, matches, codes, and queues for review
            </p>

            {/* Arrow down from Quiet to Outbox */}
            <div className="flex flex-col items-center gap-1 mt-2">
              <span className="text-gray-300 text-2xl">↓</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">drafts messages</span>
            </div>

            {/* Email Outbox node */}
            <div className="group rounded-xl border border-gray-300 bg-white px-8 py-5 text-center transition-all duration-200 hover:scale-110 hover:border-blue-500 hover:shadow-lg cursor-default">
              <div className="font-bold text-gray-900">Email Outbox</div>
              <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-96 group-hover:opacity-100 group-hover:mt-3 transition-all duration-200 text-left">
                <div className="border-t border-gray-100 pt-3 space-y-3">
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">External — Vendor Communications</div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li><span className="font-medium">Remittance advice</span> — auto-generated with invoice numbers and amounts</li>
                      <li><span className="font-medium">Missing info requests</span> — W-9s, bank details, corrected invoices</li>
                      <li><span className="font-medium">Payment status updates</span> — let vendors know when to expect payment</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Internal — Team Notifications</div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li><span className="font-medium">Approval requests</span> — summary email with one-click approve</li>
                      <li><span className="font-medium">Coding review nudges</span> — flags the right person when AI is unsure</li>
                      <li><span className="font-medium">Exception alerts</span> — duplicates, unusual amounts, missing POs</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-400 text-center pt-1">
                    Every message is a draft until you approve it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Hard guardrails. Full paper trail.
          </h2>
          <p className="text-lg text-gray-500 text-center mb-16 max-w-2xl mx-auto">
            Quiet uses AI to process invoices and draft communications. But the AI operates inside
            hard boundaries — not guidelines, not best-effort policies, but structural rules it
            cannot override.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Data access is scoped, not trusted</h3>
              <p className="text-gray-600 leading-relaxed">
                The AI can only access data relevant to the recipient it's drafting for. A vendor
                asking about their invoice simply cannot surface another vendor's terms, your
                internal notes, or your banking details.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Outputs are traceable, not hallucinated</h3>
              <p className="text-gray-600 leading-relaxed">
                Every figure, date, and line item Quiet produces is tied to a source document in your
                system. If it doesn't have the answer, it says so — it never makes something up.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Everything is auditable</h3>
              <p className="text-gray-600 leading-relaxed">
                Every action has a paper trail. Who approved what, what the AI drafted, what changed,
                and when. If a question comes up six months from now, the answer is already logged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding callout */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Badge + headline */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-6">
              Under 30 minutes
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Set up once. Automate forever.
            </h2>
            <p className="text-lg text-gray-500">
              Five steps, no IT involvement, no vendor disruption.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-16">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Sign into your AP mailbox</h3>
                <p className="text-gray-600">All you need is your email login — like ap@company.com. Sign in, grant Quiet AI access, and you're connected. No forwarding rules, no migration, no IT involvement.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Connect your accounting system</h3>
                <p className="text-gray-600">Link QuickBooks, NetSuite, Sage, or whatever you use. Vendors, GL codes, and payment records stay in sync automatically.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Connect your bank account</h3>
                <p className="text-gray-600">Link the account you pay vendors from. Quiet prepares payments for you — nothing moves until you approve it.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Set your approval rules</h3>
                <p className="text-gray-600">Decide who can approve what — by amount, vendor, department, or however your team works.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">You're live</h3>
                <p className="text-gray-600">Quiet starts organizing vendor emails, capturing invoices, coding line items, and drafting responses — immediately.</p>
              </div>
            </div>
          </div>

          {/* Callout box */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <h3 className="font-bold text-gray-900 mb-4">Zero disruption for your vendors.</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                <span className="text-gray-600">They keep emailing the same address they always have</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                <span className="text-gray-600">Replies come from your inbox, in your name</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                <span className="text-gray-600">No portal, no login, no change to their workflow</span>
              </li>
            </ul>
          </div>

          {/* Read-only trial callout */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8 mt-6">
            <h3 className="font-bold text-gray-900 mb-2">Try it in read-only mode first.</h3>
            <p className="text-gray-600">
              Quiet can run in observation mode — reading your inbox and organizing invoices without
              sending emails, making payments, or touching your ERP. See exactly what it would do,
              with zero risk. Turn on automation when you're ready.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            We're just getting started
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            POs and 3-way matching are coming soon. Want to shape what comes after? We build with
            our customers.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6">
              Request a Feature
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Join the Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to automate your AP?</h2>
          <p className="text-lg text-gray-400 mb-8">
            Set up in minutes. No implementation fees. No long-term contracts.
          </p>
          <Button
            size="lg"
            onClick={handleSignup}
            className="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-100"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-500">&copy; 2026 Quiet AI</span>
          <div className="flex items-center gap-4">
            <a
              href="/privacy-policy.html"
              className="text-sm text-gray-500 hover:text-gray-900 underline"
            >
              Privacy Policy
            </a>
            <a
              href="/eula.html"
              className="text-sm text-gray-500 hover:text-gray-900 underline"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
