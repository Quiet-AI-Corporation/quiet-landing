import { MessagesSquare, Wrench, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const steps = [
  {
    icon: MessagesSquare,
    title: 'We learn your process',
    desc: 'Walk us through how purchasing, AP, and approvals work today: your purchasing inbox, your ERP, your receiving process. No process documentation required; a conversation is enough.',
  },
  {
    icon: Wrench,
    title: 'We mold our modules to it',
    desc: 'We adapt our ready-made modules to your exact operations: your approval matrix, your GL coding conventions, your supplier quirks.',
  },
  {
    icon: Rocket,
    title: 'You\'re live',
    desc: 'Quiet AI starts handling the work, exactly the way you would. Start in read-only mode if you want to watch it first.',
  },
]

function SetupPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="py-24 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Setup
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            We learn how your shop works, then get to work
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            No implementation project, no consultants. We adapt Quiet AI to how you already buy and pay, and have you up and running.
          </p>
          <span className="mt-6 inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
            Live in under 2 business days
          </span>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <step.icon className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Step {i + 1}</span>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 flex items-center justify-center">
          <Button asChild size="lg">
            <a href="https://quietai.fillout.com/book">Get a Demo</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default SetupPage
