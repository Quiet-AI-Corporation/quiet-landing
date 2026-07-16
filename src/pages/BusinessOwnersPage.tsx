import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { Inbox, EyeOff, Clock, FileText, DollarSign, ShoppingCart, ShieldAlert } from 'lucide-react'

const problems = [
  {
    icon: Inbox,
    title: 'Invoices eat your best people',
    desc: 'Your office manager spends the day keying supplier invoices and chasing packing slips. Every step of growth seems to demand another admin hire.',
  },
  {
    icon: EyeOff,
    title: 'Big buys, blind cash',
    desc: "There's no clear view of cash before committing to a large material purchase. You find out what you owe when the bills land.",
  },
  {
    icon: Clock,
    title: 'You are the bottleneck',
    desc: "Every PO, invoice question, and payment run waits on the owner's inbox. The back office can't move unless you do.",
  },
]

const solutions = [
  {
    icon: FileText,
    title: 'Accounts Payable',
    desc: 'Supplier invoices captured, coded, and matched automatically. Hundreds of invoices a month become one person\'s part-time job, no new hires.',
    href: '/accounts-payable',
  },
  {
    icon: DollarSign,
    title: 'Cash Management',
    desc: 'Real-time cash position and 30, 60, and 90 day forecasts, so you know what a big material buy does to cash before you commit.',
    href: '/cash-management',
  },
  {
    icon: ShoppingCart,
    title: 'Purchasing',
    desc: 'Material request to booked bill on autopilot. You approve, Quiet does the rest, and nothing waits on your inbox.',
    href: '/purchasing',
  },
  {
    icon: ShieldAlert,
    title: 'Fraud & Duplicate Prevention',
    desc: 'Every supplier invoice verified before it gets paid, so you get protection without personally double-checking every payment.',
    href: '/fraud-prevention',
  },
]

function BusinessOwnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            For Owners & GMs of Manufacturing Companies
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Grow the business, not the back office
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Quiet AI handles purchasing, AP, and cash so you can stay focused on production and customers, not paperwork.
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The back office grows faster than the business</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            You started a manufacturing company to make things, not to push paper. But every new customer brings more POs, more supplier invoices, and more payments to run, and somehow all of it routes through you.
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">How Quiet AI takes it off your plate</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            The modules owners lean on most, working together on one source of truth.
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
          <h2 className="text-3xl font-bold mb-4">Run the plant, not the paperwork</h2>
          <p className="text-gray-400 mb-8">See how Quiet AI runs your back office so you don't have to.</p>
          <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            <a href="https://quietai.fillout.com/book">Get a Demo</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BusinessOwnersPage
