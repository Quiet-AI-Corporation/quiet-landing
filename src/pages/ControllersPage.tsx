import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { FileWarning, AlertTriangle, FolderOpen, FileText, CheckSquare, ShieldAlert, ClipboardList } from 'lucide-react'

const problems = [
  {
    icon: FileWarning,
    title: 'Uncoded invoices stall the close',
    desc: 'Month-end waits on supplier invoices that still need GL coding, and the accrual for whatever hasn\'t arrived yet is guesswork.',
  },
  {
    icon: AlertTriangle,
    title: 'Match exceptions pile up',
    desc: 'Packing slips at the dock, invoices in email, POs in the ERP. Reconciling the three is manual detective work, at volume, every month.',
  },
  {
    icon: FolderOpen,
    title: 'The audit trail lives in inboxes',
    desc: 'Approvals are scattered across email threads, and at hundreds of invoices a month, duplicate payments slip through.',
  },
]

const solutions = [
  {
    icon: FileText,
    title: 'Accounts Payable',
    desc: 'Every supplier invoice coded to the right GL account on arrival, so the close starts clean instead of starting with a backlog.',
    href: '/accounts-payable',
  },
  {
    icon: CheckSquare,
    title: '3 Way Match',
    desc: 'Touchless matching between packing slips, invoices, and POs. Only true exceptions reach your desk.',
    href: '/three-way-match',
  },
  {
    icon: ShieldAlert,
    title: 'Fraud & Duplicate Prevention',
    desc: 'Duplicates and anomalies caught before payment, with an audit trail built in rather than reconstructed from inboxes.',
    href: '/fraud-prevention',
  },
  {
    icon: ClipboardList,
    title: 'PO Lifecycle Management',
    desc: 'Open POs and receipts tracked in one place, so accruals come from data instead of estimates.',
    href: '/po-lifecycle',
  },
]

function ControllersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Controllers
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Close the month, even when production doesn't slow down
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Every supplier invoice coded, matched to its PO and receipt, and audit-trailed automatically.
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The close shouldn't depend on hunting paperwork</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Production doesn't pause for month-end. Invoices, receipts, and POs keep arriving through the close, and in most manufacturers the controller is the one chasing them down and stitching them together.
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">How Quiet AI keeps the books clean as you go</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            The modules controllers lean on most, working together on one source of truth.
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
          <h2 className="text-3xl font-bold mb-4">Close faster, with the paper trail built in</h2>
          <p className="text-gray-400 mb-8">See how Quiet AI keeps every invoice coded, matched, and audit-ready.</p>
          <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            <a href="https://quietai.fillout.com/book">Get a Demo</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ControllersPage
