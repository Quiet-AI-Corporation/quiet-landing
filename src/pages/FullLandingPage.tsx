// Archived: the previous multi-section landing page. Not routed; kept for future use.
import { Button } from '@/components/ui/button'
import DotGrid from '@/components/landing/DotGrid'
import LivingDashboardAnimation from '@/components/landing/LivingDashboardAnimation'
import SystemDiagram from '@/components/landing/SystemDiagram'
import AskQuietAnimation from '@/components/landing/AskQuietAnimation'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

function FullLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <DotGrid />
    <div className="relative z-10">
      <Nav />

      {/* Hero */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Agentic AI for Manufacturers
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto">
            The finance and planning layer your ERP is missing
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Quiet handles purchasing, payables, and production planning, grounded in your data and shaped to your operation
          </p>
        </div>
        {/* Living dashboard */}
        <div className="mt-8 md:mt-12 max-w-6xl mx-auto relative z-10">
          <LivingDashboardAnimation />
        </div>
      </section>

      {/* System diagram */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 tracking-tight">
            Everything flows through Quiet
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Email it, Slack it, or drop in a packing slip. Quiet runs it through the right module, grounded in your own data.
          </p>
        </div>
        <div className="mt-8 max-w-6xl mx-auto relative z-10">
          <SystemDiagram />
        </div>
      </section>

      {/* Ask Quiet */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Ask anything
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 tracking-tight">
            The questions your spreadsheets can't answer
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Quiet cross-references your open POs, inventory, and payables and answers in plain English.
          </p>
        </div>
        <div className="mt-8 max-w-2xl mx-auto relative z-10">
          <AskQuietAnimation />
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            We're just getting started
          </h2>
          <p className="mt-3 text-lg text-gray-600 mb-8">
            Want to shape what comes next? We build alongside our manufacturing customers.
          </p>
          <div className="flex items-center justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <a href="https://quietai.fillout.com/book">Build with Us</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
    </div>
  )
}

export default FullLandingPage
