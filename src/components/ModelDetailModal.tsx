import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  Lock, 
  Camera, 
  Check, 
  Instagram, 
  Sparkles,
  Award,
  Clock
} from 'lucide-react';
import { ModelProfile } from '../types';

interface ModelDetailModalProps {
  model: ModelProfile | null;
  onClose: () => void;
  onOpenChat: (model: ModelProfile) => void;
  onBookEscrow: (model: ModelProfile) => void;
  onOpenVerification: () => void;
}

export const ModelDetailModal: React.FC<ModelDetailModalProps> = ({
  model,
  onClose,
  onOpenChat,
  onBookEscrow,
  onOpenVerification,
}) => {
  if (!model) return null;

  const [activePhoto, setActivePhoto] = useState<string>(model.heroImage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
      <div 
        id="model-detail-modal"
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left: Gallery Showcase */}
        <div className="md:w-1/2 p-6 bg-stone-50 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col justify-between">
          <div>
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden border border-stone-200 shadow-sm mb-4">
              <img
                src={activePhoto}
                alt={model.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-900 flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Talent</span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {[model.heroImage, ...model.galleryImages].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activePhoto === img ? 'border-rose-600 scale-95' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Social / Portfolio Stats */}
          <div className="pt-4 mt-4 border-t border-stone-200/80 grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-2.5 rounded-xl border border-stone-200/80">
              <div className="text-xs font-bold text-stone-900">{model.portfolioStats.instagramFollowers || '100K+'}</div>
              <div className="text-[10px] text-stone-500">Reach</div>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-stone-200/80">
              <div className="text-xs font-bold text-stone-900">{model.portfolioStats.avgEngagement || '5.2%'}</div>
              <div className="text-[10px] text-stone-500">Avg. Eng.</div>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-stone-200/80">
              <div className="text-xs font-bold text-stone-900">{model.completedShoots}</div>
              <div className="text-[10px] text-stone-500">Shoots Done</div>
            </div>
          </div>
        </div>

        {/* Right: Profile Details & Booking Action */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left">
          
          <div>
            {/* Header with Close */}
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 text-xs font-bold px-2.5 py-0.5 rounded-full mb-1.5">
                  <span>{model.category}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 font-display">
                  {model.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                  <span>{model.handle}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{model.location}</span>
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rating & Availability */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-800">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{model.rating} Rating</span>
                <span className="text-stone-400">({model.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                <Clock className="w-3.5 h-3.5" />
                <span>{model.availability}</span>
              </div>
            </div>

            {/* Rates Card */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 mb-4">
              <div>
                <div className="text-[10px] text-stone-500 font-semibold uppercase">Hourly Studio Rate</div>
                <div className="text-lg font-extrabold text-stone-900 font-display">${model.hourlyRate}<span className="text-xs font-normal text-stone-500">/hr</span></div>
              </div>
              <div>
                <div className="text-[10px] text-stone-500 font-semibold uppercase">Full Day Campaign Rate</div>
                <div className="text-lg font-extrabold text-stone-900 font-display">${model.dayRate}<span className="text-xs font-normal text-stone-500">/day</span></div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">Editorial Experience</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {model.bio}
              </p>
            </div>

            {/* Badges */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Verification Credentials</h4>
                <button 
                  onClick={onOpenVerification}
                  className="text-[11px] text-emerald-700 hover:underline font-semibold"
                >
                  View Details
                </button>
              </div>

              <div className="space-y-1.5">
                {model.verifiedBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-white p-2 rounded-xl border border-stone-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-stone-900">{badge.title}</span>
                    <span className="text-[10px] text-stone-400 ml-auto">{badge.verifiedDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Actions */}
          <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenChat(model);
              }}
              className="flex-1 py-3 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-800 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-stone-600" />
              <span>Start Secure Chat</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBookEscrow(model);
              }}
              className="flex-1 py-3 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Book with Escrow</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
