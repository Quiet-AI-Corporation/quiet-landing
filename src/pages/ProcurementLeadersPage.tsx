import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { AlertCircle, Repeat, PackageX, ClipboardList, ShoppingCart, CheckSquare, TrendingUp } from 'lucide-react'

const problems = [
  {
    icon: AlertCircle,
    title: 'Maverick spend',
    desc: 'Urgent buys skip the PO process because the process is slower than the need, and you find out when the invoice shows up.',
  },
  {
    icon: Repeat,
    title: 'Quote-to-PO rekeying',
    desc: 'Supplier quotes get re-typed into the ERP, approvals get chased over email, and supplier lead time is lost to admin time.',
  },
  {
    icon: PackageX,
    title: 'Receiving is a black box',
    desc: 'Nobody is sure what arrived at the dock versus what is still on order, so shortages and overbilling surface weeks late.',
  },
]

const solutions = [
  {
    icon: ClipboardList,
    title: 'PO Lifecycle Management',
    desc: 'Quote intake to draft PO to approval routing to supplier send, one flow with no rekeying and full visibility into committed spend.',
    href: '/po-lifecycle',
  },
  {
    icon: ShoppingCart,
    title: 'Purchasing',
    desc: 'Material request to booked bill on autopilot. Every buy goes through the process because the process is the easy path.',
    href: '/purchasing',
  },
  {
    icon: CheckSquare,
    title: '3 Way Match',
    desc: 'Receipts checked against POs and invoices automatically, catching short shipments and price creep before payment.',
    href: '/three-way-match',
  },
  {
    icon: TrendingUp,
    title: 'Demand Planning',
    desc: 'Lead-time-aware buy suggestions and draft POs from sales history, so buys happen on plan instead of in a panic.',
    href: '/demand-planning',
  },
]

function ProcurementLeadersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Procurement Leaders
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Every buy on process, from raw materials to MRO
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            From requisition to PO to receiving, Quiet AI keeps your purchasing compliant and visible.
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">A purchasing process only works if people follow it</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            You've built the process: requisitions, approvals, receiving. But when following it means emails, spreadsheets, and rekeying, the plant floor routes around it, and every workaround costs you visibility.
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">How Quiet AI makes the process the easy path</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            The modules procurement leaders lean on most, working together on one source of truth.
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
          <h2 className="text-3xl font-bold mb-4">Put every buy on process</h2>
          <p className="text-gray-400 mb-8">See how Quiet AI keeps purchasing compliant without the chasing.</p>
          <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            <a href="https://quietai.fillout.com/book">Get a Demo</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ProcurementLeadersPage
