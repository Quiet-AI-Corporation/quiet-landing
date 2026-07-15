import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

interface Feature {
  text: string
  detail?: string
  beta?: boolean
}

const tiers: {
  label: string
  name: string
  price: string
  priceDetail: string
  desc: string
  features: Feature[]
  cta: string
  ctaHref: string
  highlight: boolean
  badge?: string
}[] = [
  {
    label: 'Start',
    name: 'Your First Module',
    price: '$250',
    priceDetail: 'per month, flat',
    desc: 'Pick the module that hurts most. Purchasing, AP, cash management, demand planning, or any other.',
    features: [
      { text: 'Any one module of your choice' },
      { text: 'Guided onboarding' },
      { text: 'ERP sync included' },
      { text: 'Unlimited seats', detail: 'Users, approvers, and reviewers, no per-seat fees' },
      { text: 'Unlimited stakeholder comms' },
      { text: 'Fraud intelligence' },
      { text: 'Direct line to founder support' },
    ],
    cta: 'Get Started',
    ctaHref: 'https://quietai.fillout.com/book',
    highlight: false,
  },
  {
    label: 'Grow',
    name: 'Multiple Modules',
    price: 'Custom',
    priceDetail: 'priced for what they do together',
    desc: 'Modules multiply each other. Every one you add makes the rest smarter, because they share one source of truth.',
    badge: 'Best value',
    features: [
      { text: 'Everything in your first module' },
      { text: 'Any combination of modules' },
      { text: 'Compounding intelligence', detail: 'Purchasing data sharpens demand planning, receipts power 3-way match, invoices feed your cash forecast' },
      { text: 'Custom ERP & system integrations' },
      { text: 'Custom workflows & approval chains' },
      { text: 'Dedicated implementation support' },
    ],
    cta: 'Talk to Us',
    ctaHref: 'https://quietai.fillout.com/book',
    highlight: true,
  },
]

const faqs = [
  { q: 'How does billing work?', a: 'Monthly subscription, billed at the start of each period. No long-term contracts required. Annual billing is also available.' },
  { q: 'What counts as a module?', a: 'Any one of our capabilities: Purchasing, Accounts Payable, PO Lifecycle Management, 3 Way Match, Cash Management, Fraud & Duplicate Prevention, Demand Planning, or Sales Analytics.' },
  { q: 'Why is multi-module pricing custom?', a: 'Because modules compound. Purchasing data sharpens demand planning, receipts power 3-way matching, and invoices feed your cash forecast. We price the combination for the value it creates in your operation, not per seat or per document.' },
  { q: 'Can I change plans?', a: 'Add or remove modules anytime. Changes take effect on your next billing cycle.' },
  { q: 'Is there a free trial?', a: 'Yes. No credit card required.' },
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
              Simple, predictable pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Your first module is $250 a month, flat. Add more and we price the combination for what it does together.
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
                <div className="flex items-baseline gap-2 mt-3 mb-1">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-sm text-gray-500">{tier.priceDetail}</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">{tier.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span>
                          {f.text}
                          {f.beta && <span className="ml-1.5 inline-flex px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-semibold uppercase rounded">Beta</span>}
                        </span>
                        {f.detail && (
                          <p className="text-xs text-gray-400 mt-0.5">{f.detail}</p>
                        )}
                      </div>
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
