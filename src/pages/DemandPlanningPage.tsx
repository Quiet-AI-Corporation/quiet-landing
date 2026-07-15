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
            Know what to buy before the line needs it
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            AI-driven forecasting that turns sales history and open orders into purchasing recommendations for materials and components.
          </p>
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
