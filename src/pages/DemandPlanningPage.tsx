import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

function DemandPlanningPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Demand Planning
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Know what to buy before you need it
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            AI-driven demand forecasting that turns sales history and open orders into purchasing recommendations.
          </p>
          <span className="mt-6 inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
            Coming soon
          </span>
          <div className="mt-8 flex items-center justify-center">
            <Button asChild size="lg">
              <a href="https://quietai.fillout.com/book">Get a Demo</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default DemandPlanningPage
