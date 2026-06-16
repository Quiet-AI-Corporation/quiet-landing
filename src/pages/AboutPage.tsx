import { Bot, Database, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const beliefs = [
  { icon: Bot, title: 'AI should do work, not create it', desc: 'If adopting AI means more configuration, more portals, and more training, it\'s not automation.' },
  { icon: Database, title: 'Your systems are the source of truth', desc: 'We connect to your ERP and email. We don\'t replace them or ask you to migrate.' },
  { icon: UserCheck, title: 'Humans approve, AI executes', desc: 'Nothing sends, posts, or pays without your OK. Full audit trail on every action.' },
]

function AboutPage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              About
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              We're building the finance team of the future
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Quiet AI automates the work that keeps finance teams stuck in spreadsheets, so they can focus on decisions that matter.
            </p>
          </div>
        </section>

        {/* The Problem We're Solving */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The problem we're solving</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Every company buys things. Almost none of them have a good system for it.
              </p>
              <p>
                Vendor quotes arrive by email and get re-keyed into spreadsheets. Purchase orders are drafted manually, routed for approval over Slack DMs, and tracked in someone's head. Invoices pile up, nobody matches them to what was actually received, and payments only go out because someone remembered to log into the bank. It's 2026 and this is still how most companies run procurement.
              </p>
              <p>
                We started Quiet AI because we believe AI is finally good enough to handle this end to end. Not as a tool that helps humans do the same work faster, but as a teammate that owns the entire flow from quote to payment.
              </p>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">What we believe</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {beliefs.map((b, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-600 text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our team</h2>
            <p className="text-gray-700 leading-relaxed text-center">
              Our team's experience spans data research at Stanford, building financial tooling for small businesses, enterprise-grade cybersecurity product development, and being heads of finance at small businesses. We've seen the problem from both sides of the table and built Quiet AI to solve it.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Want to see what we're building?</h2>
            <p className="text-gray-400 mb-8">We'd love to show you.</p>
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

export default AboutPage
