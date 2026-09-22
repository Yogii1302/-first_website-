import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  DollarSign, 
  FileText, 
  ArrowRight, 
  Sparkles,
  Clock,
  Download,
  AlertCircle
} from 'lucide-react';
import { ModelProfile } from '../types';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: ModelProfile;
  initialAmount?: number;
  onPaymentSuccess?: (amount: number) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  selectedModel,
  initialAmount = 840,
  onPaymentSuccess,
}) => {
  const [step, setStep] = useState<'checkout' | 'processing' | 'in_escrow' | 'released'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'ach'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9821');
  const [expiry, setExpiry] = useState('08/28');
  const [cvc, setCvc] = useState('892');
  const [campaignTitle, setCampaignTitle] = useState('Autumn Lookbook & Social Assets');
  const [bookingHours, setBookingHours] = useState(6);
  
  if (!isOpen) return null;

  const totalAmount = initialAmount || bookingHours * selectedModel.hourlyRate;
  const depositAmount = totalAmount * 0.5;
  const completionAmount = totalAmount * 0.5;
  const platformFee = totalAmount * 0.05; // 5% escrow protection
  const totalCharged = depositAmount + platformFee;

  const handleAuthorizeDeposit = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('in_escrow');
      if (onPaymentSuccess) {
        onPaymentSuccess(totalAmount);
      }
    }, 1200);
  };

  const handleSimulateDeliveryAndRelease = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('released');
    }, 1000);
  };

  const handleReset = () => {
    setStep('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/65 backdrop-blur-sm animate-in fade-in">
      <div 
        id="payment-gateway-modal"
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-stone-900 font-display">
                  CollabShield™ Escrow Gateway
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Verified Vault
                </span>
              </div>
              <p className="text-xs text-stone-500">
                100% protected milestone funding for commercial shoots
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* STEP: PROCESSING */}
          {step === 'processing' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto" />
              <h4 className="text-lg font-bold text-stone-900 font-display">Securing Vault Escrow...</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Authorizing 256-bit bank encrypted transaction and binding commercial rights contract to escrow block #CM-9941.
              </p>
            </div>
          )}

          {/* STEP: IN ESCROW */}
          {step === 'in_escrow' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-emerald-950 font-display">
                  Escrow Funds Secured!
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  ${depositAmount.toFixed(2)} is now locked safely in your CollabMode Escrow Vault for <span className="font-bold">{selectedModel.name}</span>. Funds are never released until you review and approve deliverable assets.
                </p>
              </div>

              {/* Live Escrow Progress Tracker */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                  <span>Milestone Progression</span>
                  <span className="text-emerald-700">Milestone 1 Active</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-stone-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</div>
                      <div>
                        <div className="font-bold text-stone-900">Milestone 1: Booking Deposit Held</div>
                        <div className="text-[11px] text-stone-500">Held in neutral escrow until shoot day</div>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900">${depositAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-stone-200 opacity-90">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center text-[10px] font-bold">2</div>
                      <div>
                        <div className="font-bold text-stone-900">Milestone 2: Final High-Res Deliverables</div>
                        <div className="text-[11px] text-stone-500">Released upon client sign-off</div>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900">${completionAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Simulation Actions */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left text-xs text-amber-900">
                  <span className="font-bold block">Interactive Simulation Mode:</span>
                  <span>Test asset delivery approval and simulate releasing Milestone 2 to the model.</span>
                </div>
                <button
                  onClick={handleSimulateDeliveryAndRelease}
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors whitespace-nowrap shadow-xs"
                >
                  Approve Photos & Release Funds
                </button>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  ← Back to Booking Details
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* STEP: RELEASED */}
          {step === 'released' && (
            <div className="space-y-6 animate-in fade-in text-center">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-emerald-950 font-display">
                  Collaboration Complete!
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  All milestones have been disbursed to <span className="font-bold">{selectedModel.name}</span>. Full high-resolution raw files, color-graded assets, and signed commercial copyright release licenses have been issued to your account.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => alert("Simulated: Downloading full campaign receipt & commercial copyright certificate (PDF).")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-emerald-300 text-emerald-800 text-xs font-bold shadow-xs hover:bg-emerald-100/50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Commercial License & Tax Invoice</span>
                  </button>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-black transition-colors"
              >
                Close & Return to Dashboard
              </button>
            </div>
          )}

          {/* STEP: CHECKOUT (Default) */}
          {step === 'checkout' && (
            <div className="space-y-6">
              
              {/* Model & Campaign Summary Card */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedModel.avatar}
                    alt={selectedModel.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-stone-900">{selectedModel.name}</h4>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-1.5 py-0.2 rounded-full">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">{selectedModel.category} • ${selectedModel.hourlyRate}/hr</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-stone-500">Estimated Shoot Total</div>
                  <div className="text-lg font-extrabold text-stone-950 font-display">${totalAmount.toFixed(2)}</div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-rose-600 bg-rose-50/50 text-rose-900'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-stone-700" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'border-rose-600 bg-rose-50/50 text-rose-900'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-lg font-black leading-none">Pay</span>
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ach')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'ach'
                        ? 'border-rose-600 bg-rose-50/50 text-rose-900'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Bank ACH</span>
                  </button>
                </div>
              </div>

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 bg-stone-50/60 p-4 rounded-2xl border border-stone-200">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-stone-200 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Expiration</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">CVC</label>
                      <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Milestone Breakdown Summary */}
              <div className="bg-stone-100/70 p-4 rounded-2xl space-y-2 text-xs text-stone-700">
                <div className="flex justify-between font-medium">
                  <span>Milestone 1 (Deposit held in Escrow today):</span>
                  <span className="font-bold text-stone-900">${depositAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-stone-500">
                  <span>Milestone 2 (Released only upon photo sign-off):</span>
                  <span>${completionAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-stone-500">
                  <span>CollabShield 5% Escrow Protection Fee:</span>
                  <span>${platformFee.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-950">
                  <span>Total Deposit Charged Now:</span>
                  <span className="text-emerald-700 font-display">${totalCharged.toFixed(2)}</span>
                </div>
              </div>

              {/* Guarantee Pill */}
              <div className="flex items-start gap-2.5 text-[11px] text-stone-600 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-900">Zero Risk Escrow Guarantee:</strong> Your deposit remains in an insured third-party vault. If the model cancels or deliverables fail creative standards, you receive a full 100% refund.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                id="authorize-escrow-deposit-btn"
                type="button"
                onClick={handleAuthorizeDeposit}
                className="w-full py-3.5 px-6 rounded-full bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Authorize Escrow Deposit (${totalCharged.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
