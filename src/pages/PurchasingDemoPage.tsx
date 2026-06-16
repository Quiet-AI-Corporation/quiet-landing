import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PurchasingWorkflowPlayer from '@/components/landing/PurchasingWorkflowPlayer'

function PurchasingDemoPage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <Nav />

        {/* Hero */}
        <section className="pt-12 pb-6 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
              Procure to pay · End to end
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Watch automated purchasing run.
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              From the moment a vendor quote arrives to the moment the bill is
              booked — Quiet AI drafts the PO, sends it, tracks the shipment,
              logs the receipt, and 3-way-matches the invoice. You just approve.
            </p>
          </div>
        </section>

        {/* Workflow player */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto">
            <PurchasingWorkflowPlayer />
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Want to see this on your own Purchases?
              </h2>
              <p className="mt-2 text-gray-600">
                We can have you live and ordering against real vendors in under
                an hour.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button size="lg" asChild>
                  <a href="mailto:hello@tryquiet.ai?subject=Interested%20in%20Quiet%20AI%20purchasing&body=Hi%20Quiet%20team%2C%0A%0AI%27d%20love%20a%20demo%20on%20our%20own%20purchases.%0A%0ABest%2C%0A%5BYour%20name%5D">
                    Get a demo
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/">Back to home</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </TooltipProvider>
  )
}

export default PurchasingDemoPage
