import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import gmailLogo from '@/assets/images/gmail_logo.webp'
import outlookLogo from '@/assets/images/outlook_logo.webp'
import netsuiteLogo from '@/assets/images/netsuite_logo.webp'
import qboLogo from '@/assets/images/qbo_logo.webp'
import sageLogo from '@/assets/images/sage_logo.webp'
import plaidLogo from '@/assets/images/plaid_logo.webp'
import xeroLogo from '@/assets/images/xero_logo.webp'
import freshbooksLogo from '@/assets/images/freshbooks_logo.webp'
import slackLogo from '@/assets/images/slack_logo.png'

const erpIntegrations = [
  { logo: qboLogo, name: 'QuickBooks Online', desc: 'Bi-directional sync. Bills, payments, and journal entries post automatically.' },
  { logo: netsuiteLogo, name: 'NetSuite', desc: 'Full SuiteQL integration. Multi-subsidiary support.' },
  { logo: xeroLogo, name: 'Xero', desc: 'Bills, contacts, and bank transactions sync in real time.' },
  { logo: sageLogo, name: 'Sage Intacct', desc: 'Dimensions, locations, and multi-entity support built in.' },
  { logo: freshbooksLogo, name: 'FreshBooks', desc: 'Expenses and bills sync automatically.' },
]

const emailIntegrations = [
  { logo: gmailLogo, name: 'Gmail', desc: 'OAuth connection. Reads vendor emails, drafts replies, routes approvals.', available: true },
  { logo: outlookLogo, name: 'Outlook', desc: 'Microsoft 365 integration on the roadmap.', available: false },
]

function IntegrationsPage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              Integrations
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Works with the tools you already use
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Quiet connects to your email, ERP, bank, and communication tools. Your systems stay the source of truth.
            </p>
          </div>
        </section>

        {/* ERP Integrations */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">ERP & Accounting</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {erpIntegrations.map((erp) => (
                <div key={erp.name} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-colors">
                  <img src={erp.logo} alt={erp.name} className="h-8 mb-4 object-contain" />
                  <h3 className="font-semibold text-gray-900 mb-1">{erp.name}</h3>
                  <p className="text-gray-600 text-sm">{erp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Email</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {emailIntegrations.map((email) => (
                <div key={email.name} className="bg-white rounded-xl p-6 border border-gray-200 relative">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={email.logo} alt={email.name} className="h-8 object-contain" />
                    <h3 className="font-semibold text-gray-900">{email.name}</h3>
                    {!email.available && (
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Coming soon</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{email.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Communication & Banking */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Communication</h2>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={slackLogo} alt="Slack" className="h-8 object-contain" />
                    <h3 className="font-semibold text-gray-900">Slack</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Approval notifications, status updates, and one-click approve/reject from any channel.</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Banking</h2>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={plaidLogo} alt="Plaid" className="h-8 object-contain" />
                    <h3 className="font-semibold text-gray-900">Plaid</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Real-time bank balance for cash management. Read-only, bank-grade security.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Don't see your tool? We're adding integrations fast.</h2>
            <p className="text-gray-400 mb-8">Tell us what you need and we'll prioritize it.</p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <a href="mailto:hello@tryquiet.ai">Request an Integration</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                <a href="https://quietai.fillout.com/book">Get a Demo</a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </TooltipProvider>
  )
}

export default IntegrationsPage
