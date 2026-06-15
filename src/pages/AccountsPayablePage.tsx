import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import logo from '@/assets/images/logo.png'

const APP_URL = 'https://tryquiet.app'

function AccountsPayablePage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 group">
              <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
              <img src={logo} alt="Quiet" className="h-8" />
              <span className="font-semibold text-lg text-gray-900">Quiet AI</span>
            </a>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => { window.location.href = APP_URL }}>
                Sign In
              </Button>
              <Button asChild>
                <a href="https://quietai.fillout.com/book">Get Access</a>
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              Accounts Payable
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Never hire another AP clerk
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              From purchase orders to payments, AI handles the busywork end to end.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="https://quietai.fillout.com/book">Get a Demo</a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => { window.location.href = APP_URL }}>
                Sign In
              </Button>
            </div>
          </div>
        </section>

        {/* Placeholder content */}
        <section className="py-16 px-6 border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center text-gray-400">
            <p className="text-sm">More details coming soon.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-10 px-6 mt-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Quiet" className="h-6 brightness-200" />
              <span className="text-white font-semibold">Quiet AI</span>
            </div>
            <div className="flex gap-6">
              <a href="/privacy-policy.html" className="hover:text-white transition-colors">Privacy</a>
              <a href="/eula.html" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

export default AccountsPayablePage
