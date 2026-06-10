import logo from '@/assets/images/logo.png'

function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <a href="/">
          <img src={logo} alt="Quiet" className="h-10 mx-auto" />
        </a>
        <h1 className="mt-8 text-3xl font-bold text-gray-900">
          Thanks for booking!
        </h1>
        <p className="mt-6 text-gray-600 leading-relaxed text-left">
          We're looking forward to meeting you. If there's anything specific
          you'd like us to cover, feel free to reach us at{' '}
          <a href="mailto:hello@tryquiet.ai" className="text-gray-900 underline">
            hello@tryquiet.ai
          </a>
          .
        </p>
        <p className="mt-6 text-gray-600 leading-relaxed text-left">
          Talk soon,
        </p>
        <p className="mt-1 text-gray-900 font-medium text-left">
          Nishant &amp; Jackson
        </p>
        <p className="mt-0.5 text-sm text-gray-500 text-left">
          Founders, Quiet AI
        </p>
      </div>
    </div>
  )
}

export default ThankYouPage
