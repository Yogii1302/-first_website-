import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ArrowRight, X, ChevronUp, Lock } from 'lucide-react';

interface StickyCTAProps {
  onExploreClick: () => void;
  onOpenChat: () => void;
  onOpenPayment: () => void;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({
  onExploreClick,
  onOpenChat,
  onOpenPayment,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setCollapsed(false)}
          className="bg-stone-900 hover:bg-black text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold transition-all border border-stone-700 hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Post Campaign & Hire Models</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div 
      id="sticky-cta-banner"
      className="fixed bottom-3 sm:bottom-5 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto bg-stone-900/95 backdrop-blur-md border border-stone-800 shadow-[0_16px_50px_rgba(0,0,0,0.3)] rounded-full py-2.5 px-4 sm:px-6 flex items-center justify-between pointer-events-auto gap-4">
        
        {/* Left Value Message */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-rose-600/20 text-rose-400 hidden sm:flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="text-xs sm:text-sm font-bold text-white truncate flex items-center gap-2">
              <span>Ready to shoot your brand campaign?</span>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800">
                <ShieldCheck className="w-3 h-3" />
                <span>Zero Upfront Risk</span>
              </span>
            </div>
            <p className="text-[11px] text-stone-400 truncate hidden sm:block">
              Connect directly with verified models. Funds held in milestone escrow until photo approval.
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onExploreClick}
            className="px-4 py-2 rounded-full bg-white hover:bg-stone-100 text-stone-900 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Browse Models</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
          </button>

          <button
            onClick={() => setCollapsed(true)}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors ml-1"
            title="Minimize bar"
            aria-label="Minimize"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
