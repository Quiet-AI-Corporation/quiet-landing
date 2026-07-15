import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

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

      <Footer />
    </div>
  )
}

export default BusinessOwnersPage
