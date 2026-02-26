import { Paperclip } from 'lucide-react'

interface LogEntry {
  time: string
  text: React.ReactNode
  byAI?: boolean
  sub?: boolean
}

const entries: LogEntry[] = [
  {
    time: '9:01 AM',
    text: (
      <>
        Received email from <span className="font-medium text-gray-900">ar@acmecorp.com</span> with attachment{' '}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
          <Paperclip className="w-3 h-3" />
          INV-4821.pdf
        </span>
      </>
    ),
  },
  {
    time: '9:01 AM',
    text: 'Invoice created — vendor, invoice number, amount + 12 fields set',
    byAI: true,
  },
  {
    time: '9:01 AM',
    text: (
      <>
        Vendor not onboarded (missing W-9 and remittance details)
      </>
    ),
    sub: true,
  },
  {
    time: '9:01 AM',
    text: (
      <>
        Invoice status set to{' '}
        <span className="inline-flex px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
          Draft
        </span>
      </>
    ),
    byAI: true,
    sub: true,
  },
  {
    time: '9:01 AM',
    text: (
      <>
        Drafted email to <span className="font-medium text-gray-900">ar@acmecorp.com</span> with subject{' '}
        <span className="font-medium text-gray-900">"Request for W-9 and Remittance Info"</span>
      </>
    ),
    byAI: true,
  },
  {
    time: '9:14 AM',
    text: (
      <>
        Email sent <span className="text-gray-400">by <span className="font-medium">Mark S.</span></span>
      </>
    ),
    sub: true,
  },
  {
    time: '2:45 PM',
    text: (
      <>
        Received email from <span className="font-medium text-gray-900">ar@acmecorp.com</span> with subject{' '}
        <span className="font-medium text-gray-900">"Re: Request for W-9 and Remittance Info"</span> with attachments{' '}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
          <Paperclip className="w-3 h-3" />
          W-9.pdf
        </span>{' '}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
          <Paperclip className="w-3 h-3" />
          ACH-info.pdf
        </span>
      </>
    ),
  },
  {
    time: '2:45 PM',
    text: 'Vendor onboarded — W-9 and remittance details saved',
    byAI: true,
    sub: true,
  },
  {
    time: '2:46 PM',
    text: (
      <>
        Invoice status changed to{' '}
        <span className="inline-flex px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          Ready to Pay
        </span>
      </>
    ),
    byAI: true,
  },
  {
    time: '3:02 PM',
    text: (
      <>
        Payment initiated <span className="text-gray-400">by <span className="font-medium">Helly R.</span></span>
      </>
    ),
  },
]

function AuditLogAnimation() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-[44rem] mx-auto">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-gray-500">Activity log</span>
        </div>
        <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md">
          Invoice #4821 · Acme Co
        </span>
      </div>

      {/* Entries */}
      <div className="px-5 py-3">
        {entries.map((entry, i) => (
          <div
            key={i}
            className={`flex items-baseline gap-2 py-1.5 ${entry.sub ? 'pl-[4.5rem]' : ''}`}
          >
            {!entry.sub && (
              <span className="text-xs text-gray-400 flex-shrink-0 w-14 tabular-nums">{entry.time}</span>
            )}
            {entry.sub && (
              <span className="text-gray-300 flex-shrink-0 select-none">↳</span>
            )}
            <span className="text-sm text-gray-600 leading-relaxed">
              {entry.text}
              {entry.byAI && (
                <>
                  {'  '}
                  <span className="text-gray-400">by <span className="font-medium">Quiet AI</span></span>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuditLogAnimation
