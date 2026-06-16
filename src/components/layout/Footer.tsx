import logo from '@/assets/images/logo.png'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Accounts Payable', href: '/accounts-payable' },
      { label: 'PO Lifecycle', href: '/po-lifecycle' },
      { label: '3 Way Match', href: '/three-way-match' },
      { label: 'Cash Management', href: '/cash-management' },
      { label: 'Integrations', href: '/#integrations' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Setup', href: '/#setup' },
      { label: 'Contact', href: 'https://quietai.fillout.com/book' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy Policy', href: '/privacy-policy.html' },
      { label: 'Terms of Service', href: '/eula.html' },
    ],
  },
]

function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Quiet" className="h-8" />
              <span className="text-white font-semibold text-lg">Quiet AI</span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed">
              Agentic AI for financial operations. Don't make your human teammates do grunt work.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-xs text-gray-500">&copy; 2026 Quiet AI. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
