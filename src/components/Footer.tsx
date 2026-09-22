import React from 'react';
import { Sparkles, ShieldCheck, Lock, Heart } from 'lucide-react';

interface FooterProps {
  onOpenVerification: () => void;
  onOpenPayment: () => void;
  onExploreClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVerification,
  onOpenPayment,
  onExploreClick,
}) => {
  return (
    <footer className="bg-white border-t border-stone-200 pt-16 pb-24 sm:pb-16 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-200">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-rose-400" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-stone-950">
                collab<span className="text-rose-600 font-bold">.mode</span>
              </span>
            </div>
            <p className="text-stone-700 leading-relaxed font-normal">
              The premier business-connect marketplace uniting verified commercial models and small businesses for lookbooks, advertising shoots, and viral social media campaigns.
            </p>
            <div className="flex items-center gap-4 text-stone-600">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-stone-800">100% ID Verified</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-stone-800" />
                <span className="font-semibold text-stone-800">Escrow Protected</span>
              </div>
            </div>
          </div>

          {/* Col 2: For Businesses */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-stone-950 uppercase tracking-wider text-xs">For Small Businesses</h4>
            <ul className="space-y-2 text-stone-700 font-medium">
              <li>
                <button onClick={onExploreClick} className="hover:text-stone-950 transition-colors">
                  Browse Editorial Models
                </button>
              </li>
              <li>
                <button onClick={onExploreClick} className="hover:text-stone-950 transition-colors">
                  TikTok & UGC Creators
                </button>
              </li>
              <li>
                <button onClick={onOpenPayment} className="hover:text-stone-950 transition-colors">
                  Milestone Escrow Vault
                </button>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-stone-950 transition-colors">
                  Brand Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: For Models */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-stone-950 uppercase tracking-wider text-xs">For Professional Models</h4>
            <ul className="space-y-2 text-stone-700 font-medium">
              <li>
                <button onClick={onOpenVerification} className="hover:text-stone-950 transition-colors">
                  Get Verified ID Badge
                </button>
              </li>
              <li>
                <a href="#features" className="hover:text-stone-950 transition-colors">
                  Guild & Agency Standards
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-stone-950 transition-colors">
                  Guaranteed Escrow Payouts
                </a>
              </li>
              <li>
                <button onClick={onOpenVerification} className="hover:text-stone-950 transition-colors">
                  Model Safety & Rights Protocol
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Security */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-stone-950 uppercase tracking-wider text-xs">Trust & Legal</h4>
            <ul className="space-y-2 text-stone-700 font-medium">
              <li>
                <button onClick={onOpenVerification} className="hover:text-stone-950 transition-colors">
                  Biometric Verification
                </button>
              </li>
              <li>
                <button onClick={onOpenPayment} className="hover:text-stone-950 transition-colors">
                  Escrow Terms of Service
                </button>
              </li>
              <li>
                <a href="#features" className="hover:text-stone-950 transition-colors">
                  Commercial Rights Licenses
                </a>
              </li>
              <li>
                <a href="#hero-section" className="hover:text-stone-950 transition-colors">
                  Privacy & Data Shield
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-600 text-xs">
          <p>© 2026 CollabMode Platform, Inc. All rights reserved. Powered by CollabShield™ Escrow Vault.</p>
          <div className="flex items-center gap-1 font-medium">
            <span>Built for creative commerce and model safety</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
