import { Check } from 'lucide-react'

export interface IncludedFeature {
  text: string
  detail?: string
}

function ModuleIncludes({ features, className = '' }: { features: IncludedFeature[]; className?: string }) {
  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10 bg-white rounded-xl py-2 px-4 w-fit mx-auto">
          What's included in this module
        </h2>
        <div className="rounded-2xl border border-gray-200 bg-white p-8">
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span>{f.text}</span>
                  {f.detail && (
                    <p className="text-xs text-gray-400 mt-0.5">{f.detail}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ModuleIncludes
