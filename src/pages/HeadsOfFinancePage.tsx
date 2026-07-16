import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { Keyboard, EyeOff, Users, FileText, ClipboardList, DollarSign, BarChart3 } from 'lucide-react'

const problems = [
  {
    icon: Keyboard,
    title: 'Processing crowds out planning',
    desc: 'A lean team spends the week on invoice entry and approval chasing. Margin analysis and forecasting happen in the hours left over, if any are.',
  },
  {
    icon: EyeOff,
    title: 'Committed spend is invisible',
    desc: 'POs live in email threads and spreadsheets, so spend against budget only shows up when the invoices arrive weeks later.',
  },
  {
    icon: Users,
    title: "Volume scales, headcount shouldn't",
    desc: 'Every jump in production volume means more transactions to process, and until now the only lever has been another hire.',
  },
]

const solutions = [
  {
    icon: FileText,
    title: 'Accounts Payable',
    desc: 'The transactional layer runs itself. Your team reviews exceptions instead of keying data, and the week goes to margins and forecasts.',
    href: '/accounts-payable',
  },
  {
    icon: ClipboardList,
    title: 'PO Lifecycle Management',
    desc: 'Committed spend is visible against budget the moment a PO is approved, not when the invoice finally lands.',
    href: '/po-lifecycle',
  },
  {
    icon: DollarSign,
    title: 'Cash Management',
    desc: 'Cash forecasts at 7 to 90 days, payment scheduling, and early-pay discounts captured automatically when cash allows.',
    href: '/cash-management',
  },
  {
    icon: BarChart3,
    title: 'Sales Analytics',
    desc: 'SKU trends, account movement, and rep performance on data Quiet already syncs from your ERP. The revenue side of your planning.',
    href: '/sales-analytics',
  },
]

function HeadsOfFinancePage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Heads of Finance
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Leverage for manufacturing finance teams
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Automate supplier invoices, POs, and payments so your team plans margins instead of keying data.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Button asChild size="lg">
              <a href="https://quietai.fillout.com/book">Get a Demo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your team is too smart to be keying invoices</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Manufacturing finance runs lean by design. The problem is that transaction volume grows with the business, and every hour spent processing paper is an hour not spent on the analysis the business actually needs from you.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {problems.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Quiet helps */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">How Quiet AI gives your team leverage</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            The modules finance leaders lean on most, working together on one source of truth.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {solutions.map(({ icon: Icon, title, desc, href }) => (
              <a key={title} href={href} className="h-full">
                <div className="group h-full flex flex-col gap-3 p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150 cursor-pointer">
                  <div className="h-9 w-9 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Icon className="h-[18px] w-[18px] text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Give your team leverage, not more keying</h2>
          <p className="text-gray-400 mb-8">See how Quiet AI turns transaction processing into a review step.</p>
          <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            <a href="https://quietai.fillout.com/book">Get a Demo</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HeadsOfFinancePage
