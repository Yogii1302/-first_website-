import React from 'react';
import { X, ShieldCheck, Check, Sparkles, Building2, UserCheck, Lock, Award } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-sm animate-in fade-in">
      <div 
        id="verification-modal"
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/70 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-950 font-display">
                CollabShield™ Verification Protocol
              </h3>
              <p className="text-xs text-stone-500">
                How we protect businesses and models against fraud, spam, and unfulfilled shoots.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-left">
          
          {/* 4-Tier Badges Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Badge 1 */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <UserCheck className="w-4 h-4" />
                <span>Tier 1: Biometric ID Shield</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Mandatory government passport or driver’s license scan paired with 3D liveness facial biometrics to eliminate fake accounts and impersonation.
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" />
                <span>100% of Active Models Verified</span>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                <Award className="w-4 h-4" />
                <span>Tier 2: Premier Agency Endorsement</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Verified agency representation or proven SAG-AFTRA commercial credentials with cross-referenced past brand campaign deliverables.
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] text-rose-800 font-semibold bg-rose-100/70 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" />
                <span>Industry Vetted</span>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-xs">
                <Building2 className="w-4 h-4 text-stone-700" />
                <span>Business Authenticity & Tax ID (EIN)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Small businesses must link a valid corporate EIN / TIN or registered brand domain before messaging talent, ensuring zero spam or illicit requests.
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] text-stone-700 font-semibold bg-stone-200/70 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" />
                <span>Safe Commercial Clients</span>
              </div>
            </div>

            {/* Badge 4 */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
                <Lock className="w-4 h-4" />
                <span>100% Escrow Vault Bond</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every booking requires funds to be deposited in third-party escrow prior to the shoot date. Models never work without guaranteed pay.
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] text-amber-800 font-semibold bg-amber-100/70 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" />
                <span>Guaranteed Payment</span>
              </div>
            </div>

          </div>

          {/* Model Safety Pledge */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>CollabMode Creator Safety Standards</span>
            </div>
            <p className="leading-relaxed">
              All communications and call sheets are archived securely in the encrypted portal. Models retain complete control over shoot locations, wardrobe guidelines, and commercial usage rights duration.
            </p>
          </div>

          <div className="text-right pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-bold transition-colors"
            >
              Got It, Continue
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
