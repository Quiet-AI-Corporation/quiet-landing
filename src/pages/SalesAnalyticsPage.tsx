import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ModuleIncludes, { type IncludedFeature } from '@/components/landing/ModuleIncludes'

const included: IncludedFeature[] = [
  { text: 'Revenue and margin analytics' },
  { text: 'SKU-level sales breakdowns' },
  { text: 'Trends built on data already synced from your ERP' },
  { text: 'Plain-English answers to sales questions' },
]

function SalesAnalyticsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Sales Analytics
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            See what's selling, and what it's costing you
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered revenue and margin analytics on top of the data Quiet AI already syncs from your ERP.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Button asChild size="lg">
              <a href="https://quietai.fillout.com/book">Get a Demo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What's included */}
      <ModuleIncludes features={included} />

      <Footer />
    </div>
  )
}

export default SalesAnalyticsPage
