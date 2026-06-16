import { useState } from 'react'
import { Check, ChevronDown, Package, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const tiers = [
  {
    label: 'Core Plan',
    name: 'Autonomous AP Inbox',
    desc: 'Everything you need to automate accounts payable.',
    features: [
      'Invoices processed & coded',
      'Guided onboarding',
      'Direct line to founder support',
      'Unlimited vendor onboarding',
      'Unlimited stakeholder comms',
      'Fraud intelligence',
      'Native ACH payments',
      'ERP sync included',
      '1099 data dump',
    ],
    cta: 'Get Pricing',
    ctaHref: 'https://quietai.fillout.com/book',
    highlight: false,
  },
  {
    label: 'Procurement Plan',
    name: 'AP Inbox + Purchase Orders',
    desc: 'Everything in Core, plus full purchasing automation.',
    badge: 'Most complete',
    features: [
      'Everything in Core',
      'Purchase orders',
      'Automatic matching of line items to PO items & PO sync to ERP',
      'Automated 1099 generation (full creation, not just the data dump)',
    ],
    cta: 'Get Pricing',
    ctaHref: 'https://quietai.fillout.com/book',
    highlight: true,
  },
]

const addons = [
  {
    icon: Package,
    name: 'Order Tracking Module',
    desc: 'Track orders from placement through delivery.',
  },
  {
    icon: MessageSquare,
    name: 'Slack Integration for PO Creation',
    desc: 'Create purchase orders directly from Slack.',
  },
]

const faqs = [
  { q: 'How does billing work?', a: 'Monthly subscription, billed at the start of each period. No long-term contracts required. Annual billing is also available.' },
  { q: 'What counts as an invoice?', a: 'Each unique invoice document processed through Quiet AI counts as one invoice, regardless of line items.' },
  { q: 'Can I change plans?', a: 'Upgrade or downgrade anytime. Changes take effect on your next billing cycle.' },
  { q: 'Is there a free trial?', a: 'Yes. No credit card required.' },
  { q: 'What if I exceed my volume?', a: 'We\'ll let you know and help you move to the right plan. We never stop processing your invoices.' },
]

function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Simple, flat pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Two plans. No per-invoice fees. Add what you need.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 border ${
                  tier.highlight
                    ? 'border-blue-600 ring-2 ring-blue-100 bg-white'
                    : 'border-gray-200 bg-white'
                } flex flex-col relative`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {tier.badge}
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{tier.label}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{tier.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={tier.highlight ? '' : 'bg-gray-900 hover:bg-gray-800'}
                  size="lg"
                >
                  <a href={tier.ctaHref}>{tier.cta}</a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Add-ons */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Add-ons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {addons.map((addon) => (
                <div key={addon.name} className="rounded-2xl border border-gray-200 p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <addon.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{addon.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-gray-900 text-sm">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 text-sm">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Not sure which plan? Let's talk.</h2>
            <p className="text-gray-400 mb-8">We'll help you find the right fit for your team.</p>
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <a href="https://quietai.fillout.com/book">Book a Call</a>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </TooltipProvider>
  )
}

export default PricingPage
