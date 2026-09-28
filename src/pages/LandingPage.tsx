import DotGrid from '@/components/landing/DotGrid'

const APP_URL = 'https://tryquiet.app'
const ACCESS_MAILTO = 'mailto:hello@tryquiet.ai?subject=Quiet%20AI%20access%20request'

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <DotGrid />
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top-right links */}
        <div className="flex items-center justify-end gap-6 px-6 py-6">
          <a
            href={APP_URL}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign in
          </a>
          <a
            href={ACCESS_MAILTO}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Get access
          </a>
        </div>

        {/* Hero */}
        <section className="flex-1 flex items-center justify-center px-6 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Agentic AI for Manufacturing
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              The Agentic ERP and MES
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Quiet AI handles the back office so your team can focus on building
            </p>
          </div>
        </section>

        {/* Legal links */}
        <div className="flex items-center justify-center gap-6 px-6 py-6">
          <a
            href="/privacy-policy.html"
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/eula.html"
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
