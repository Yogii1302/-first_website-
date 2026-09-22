import React from 'react';
import { Check, ShieldCheck, Lock, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onOpenPayment: () => void;
  onExploreClick: () => void;
  onOpenVerification: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenPayment,
  onExploreClick,
  onOpenVerification,
}) => {
  return (
    <section id="pricing" className="py-20 bg-stone-100/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-700 uppercase tracking-wider shadow-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Clear Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-display tracking-tight">
            No 20% agency markups. Just pure collaborative value.
          </h2>
          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            Traditional talent agencies take 20% from the brand and 20% from the model. On CollabMode, you get direct talent rates with insured escrow protection.
          </p>
        </div>

        {/* 2-Tier Pricing Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Small Businesses */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-xs uppercase mb-3">
                For Small Businesses & Brands
              </div>
              <h3 className="text-2xl font-bold text-stone-950 font-display mb-2">Pay Per Campaign</h3>
              <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                Ideal for e-commerce stores, indie skincare lines, fashion startups, and DTC brands needing editorial visuals without agency contracts.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-stone-950 font-display">$0</span>
                <span className="text-xs text-stone-500 font-medium">monthly subscription</span>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 mb-6 text-xs text-stone-700 font-medium">
                <span className="font-bold text-stone-900 block mb-1">Simple 5% CollabShield Protection:</span>
                Covers FDIC insured escrow vaulting, automatic standard commercial release contracts, and full dispute mediation guarantee.
              </div>

              <ul className="space-y-3 text-xs text-stone-700 font-medium mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Direct talent rates (set by individual models)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Milestone escrow releases only after photo approval</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Unlimited encrypted chat & direct call sheet sharing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Commercial digital copyright release included</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onExploreClick}
              className="w-full py-3 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Explore Verified Models</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Professional Models */}
          <div className="bg-stone-900 text-white rounded-3xl p-8 border border-stone-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-600/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-stone-800 text-rose-400 font-bold text-xs uppercase mb-3 border border-stone-700">
                For Professional Models & Creators
              </div>
              <h3 className="text-2xl font-bold font-display mb-2">Keep 100% of Your Rate</h3>
              <p className="text-xs text-stone-400 mb-6 leading-relaxed">
                Never chase clients for late payments again. You get paid automatically as soon as client milestones are fulfilled.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white font-display">100%</span>
                <span className="text-xs text-stone-400 font-medium">payout guarantee</span>
              </div>

              <div className="p-3.5 bg-stone-800/80 rounded-2xl border border-stone-700 mb-6 text-xs text-stone-300 font-medium">
                <span className="font-bold text-white block mb-1">Guaranteed Escrow Funding:</span>
                You never step onto set or ship a digital UGC deliverable without verified funds already locked in the platform vault.
              </div>

              <ul className="space-y-3 text-xs text-stone-300 font-medium mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Free verified profile & agency endorsement listing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Fast payouts direct to your bank or debit card</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Zero commission cut from model earnings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Complete control over booking calendar & day rates</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenVerification}
              className="w-full py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Apply for Verification Badge</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
