import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SCENES } from '@/components/landing/PurchasingWorkflowAnimation'

import quoteArrives from '@/assets/images/animation_static/quote_arrives.png'
import aiExtractsQuote from '@/assets/images/animation_static/ai_extracts_quote.png'
import poDrafted from '@/assets/images/animation_static/PO_drafted.png'
import poApproved from '@/assets/images/animation_static/po_approved.png'
import poSentToVendor from '@/assets/images/animation_static/po_sent_to_vendor.png'
import vendorShips from '@/assets/images/animation_static/vendor_ships.png'
import itemsReceived from '@/assets/images/animation_static/items_received.png'
import automatedAp from '@/assets/images/animation_static/automated_ap.png'
import threeWayMatch from '@/assets/images/animation_static/3_way_match.png'
import paymentErpSynced from '@/assets/images/animation_static/payment_erp_synced.png'

const IMAGES = [
  quoteArrives,
  aiExtractsQuote,
  poDrafted,
  poApproved,
  poSentToVendor,
  vendorShips,
  itemsReceived,
  automatedAp,
  threeWayMatch,
  paymentErpSynced,
]

function PurchasingWorkflowStatic() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : SCENES.length - 1))
  const next = () => setIndex((i) => (i < SCENES.length - 1 ? i + 1 : 0))

  const scene = SCENES[index]

  return (
    <div className="text-left">
      {/* Image */}
      <div className="relative rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '50%' }}>
          <img
            src={IMAGES[index]}
            alt={scene.label}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        </div>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-600 active:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-600 active:bg-gray-100"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Caption */}
      <div className="mt-3 px-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-bold text-gray-900">
            {index + 1}. {scene.label}
          </span>
          <span className="text-xs text-gray-400 tabular-nums">
            {index + 1} / {SCENES.length}
          </span>
        </div>
        <p className="text-sm text-gray-600">{scene.caption}</p>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {SCENES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default PurchasingWorkflowStatic
