import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const tiers = [
  {
    name: 'Starter',
    desc: 'For small teams getting started with AP automation',
    features: [
      'Up to 100 invoices/month',
      '1 ERP connection',
      'Email intake (Gmail)',
      'GL auto-coding',
      'Approval routing',
      'Slack notifications',
      'Email support',
    ],
    cta: 'Get Started',
    ctaHref: 'https://quietai.fillout.com/book',
    highlight: false,
  },
  {
    name: 'Growth',
    desc: 'For growing companies with increasing AP volume',
    badge: 'Most popular',
    features: [
      'Up to 500 invoices/month',
      'Unlimited ERP connections',
      '3-way matching',
      'PO lifecycle management',
      'Custom approval workflows',
      'Cash position dashboard',
      'Priority support',
    ],
    cta: 'Get a Demo',
    ctaHref: 'https://quietai.fillout.com/book',
    highlight: true,
  },
  {
    name: 'Enterprise',
    desc: 'For teams that need advanced controls and volume',
    features: [
      'Unlimited invoices',
      'Multi-entity support',
      'Custom integrations',
      'SSO / SAML',
      'Dedicated account manager',
      'SLA guarantees',
      'Custom training',
    ],
    cta: 'Contact Us',
    ctaHref: 'https://quietai.fillout.com/book',
    highlight: false,
  },
]

const faqs = [
  { q: 'How does billing work?', a: 'Monthly subscription, billed at the start of each period. No long-term contracts required.' },
  { q: 'What counts as an invoice?', a: 'Each unique invoice document processed through Quiet counts as one invoice, regardless of line items.' },
  { q: 'Can I change plans?', a: 'Upgrade or downgrade anytime. Changes take effect on your next billing cycle.' },
  { q: 'Is there a free trial?', a: 'We offer a 14-day free trial on Starter and Growth plans. No credit card required.' },
  { q: 'What if I exceed my invoice limit?', a: 'We\'ll let you know and help you move to the right plan. We never stop processing your invoices.' },
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
              Simple pricing. No per-invoice fees.
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              One flat monthly price. Process as many invoices as you need.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="pb-20 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
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
