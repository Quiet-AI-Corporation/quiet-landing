import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ModuleIncludes, { type IncludedFeature } from '@/components/landing/ModuleIncludes'

const included: IncludedFeature[] = [
  { text: 'Product and SKU-level sales trends' },
  { text: 'Account-level spend: who\'s growing, who\'s slipping' },
  { text: 'Performance by salesperson' },
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
            What's selling, which accounts are moving, and who's closing
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Quiet tracks the products that are selling, the accounts gaining or losing spend, and the salespeople behind every number, on data it already syncs from your ERP.
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
