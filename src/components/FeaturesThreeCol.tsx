import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Lock, 
  Check, 
  ArrowRight, 
  BadgeCheck, 
  CreditCard, 
  FileText, 
  Sparkles,
  Zap,
  DollarSign
} from 'lucide-react';

interface FeaturesThreeColProps {
  onOpenVerification: () => void;
  onOpenChat: () => void;
  onOpenPayment: () => void;
}

export const FeaturesThreeCol: React.FC<FeaturesThreeColProps> = ({
  onOpenVerification,
  onOpenChat,
  onOpenPayment,
}) => {
  const [activeTab, setActiveTab] = useState<'verification' | 'chat' | 'escrow'>('verification');

  return (
    <section id="features" className="py-20 bg-stone-50/70 border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Value Proposition First */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-xs text-xs font-bold text-stone-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Engineered for Safety & Scale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 font-display">
            Three built-in safeguards to run flawless brand campaigns.
          </h2>
          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            No agency middleman fees. No ghosting on Instagram DMs. Just transparent pricing, verified identities, and bank-grade escrow security.
          </p>
        </div>

        {/* 3-Column Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Verified User Badges */}
          <div 
            id="feature-card-badges"
            className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-stone-900 mb-3 font-display">
                1. Verified User Badges
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed mb-6 font-normal">
                Every model and small business undergoes multi-step verification before booking. We eliminate catfishing, fake follower fraud, and unvetted solicitations.
              </p>

              {/* Feature Points */}
              <ul className="space-y-2.5 text-xs text-stone-700 font-medium mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-emerald-700" />
                  </div>
                  <span>Government ID & Live Biometric Verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-emerald-700" />
                  </div>
                  <span>Guild & Agency Endorsement Verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-emerald-700" />
                  </div>
                  <span>Business Tax ID (EIN) & Corporate Authenticity</span>
                </li>
              </ul>
            </div>

            {/* Interactive Preview Widget */}
            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={onOpenVerification}
                className="w-full py-2.5 px-4 rounded-full bg-stone-100 hover:bg-emerald-50 text-stone-900 hover:text-emerald-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <span>Inspect Verification Shield</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Secure Encrypted Chat & Contracts */}
          <div 
            id="feature-card-chat"
            className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-stone-900 mb-3 font-display">
                2. Secure Encrypted Chat
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed mb-6 font-normal">
                Direct in-app collaboration room. Share high-res moodboards, exchange call sheets, sign digital commercial contracts, and finalize logistics with zero spam.
              </p>

              {/* Feature Points */}
              <ul className="space-y-2.5 text-xs text-stone-700 font-medium mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-rose-700" />
                  </div>
                  <span>End-to-End Encrypted Message Channels</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-rose-700" />
                  </div>
                  <span>Automated Model Release & Usage Rights Rights</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-rose-700" />
                  </div>
                  <span>One-Click Booking Proposal Attachments</span>
                </li>
              </ul>
            </div>

            {/* Interactive Preview Widget */}
            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={onOpenChat}
                className="w-full py-2.5 px-4 rounded-full bg-stone-100 hover:bg-rose-50 text-stone-900 hover:text-rose-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-rose-600" />
                <span>Launch Live Collaboration Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 3: Robust Escrow Payment Gateway */}
          <div 
            id="feature-card-escrow"
            className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-stone-900 mb-3 font-display">
                3. Robust Escrow Gateway
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed mb-6 font-normal">
                Never pay upfront into the void. Small businesses deposit project funds into an insured escrow vault; funds release in milestones once photo assets are approved.
              </p>

              {/* Feature Points */}
              <ul className="space-y-2.5 text-xs text-stone-700 font-medium mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-amber-700" />
                  </div>
                  <span>Milestone-Based Fund Disbursements</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-amber-700" />
                  </div>
                  <span>Instant Apple Pay, Cards & Bank Transfer</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-amber-700" />
                  </div>
                  <span>100% Refund Guarantee on Unfulfilled Shoots</span>
                </li>
              </ul>
            </div>

            {/* Interactive Preview Widget */}
            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={onOpenPayment}
                className="w-full py-2.5 px-4 rounded-full bg-stone-100 hover:bg-amber-50 text-stone-900 hover:text-amber-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>Test Escrow Payment Flow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
