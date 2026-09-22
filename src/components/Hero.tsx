import React, { useState } from 'react';
import { 
  Camera, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  MessageSquare, 
  Clock, 
  SlidersHorizontal,
  ChevronDown,
  FileCheck
} from 'lucide-react';
import { CampaignCategory, ModelProfile } from '../types';

interface HeroProps {
  onSearch: (category: CampaignCategory, query: string) => void;
  onSelectModel: (model: ModelProfile) => void;
  onOpenChat: () => void;
  onOpenPayment: () => void;
  featuredModel: ModelProfile;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onSelectModel,
  onOpenChat,
  onOpenPayment,
  featuredModel,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const categories: CampaignCategory[] = [
    'All',
    'Brand Photoshoot',
    'Social UGC & Reels',
    'E-Commerce Lookbook',
    'Video Commercial',
    'Fashion & Editorial',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedCategory, searchQuery);
    const directoryEl = document.getElementById('browse-directory');
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden"
    >
      {/* Subtle warm decorative ambient glow inspired by studio lighting */}
      <div className="absolute top-10 right-10 w-[520px] h-[520px] bg-rose-200/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 left-1/3 w-[420px] h-[420px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: High Impact Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Trust Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-xs text-xs font-semibold text-stone-700">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Verified Talent for High-Growth Brands</span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-700 font-medium">3,800+ Commercial Models</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 font-display leading-[1.08]">
              Connect with elite models for your brand's next campaign.
            </h1>

            {/* Subheadline Value Proposition */}
            <p className="text-base sm:text-lg text-stone-700 font-normal leading-relaxed max-w-xl">
              Empower your small business with editorial lookbooks, viral social reels, and high-converting commercial photoshoots. Fully protected by verified badges and milestone escrow payments.
            </p>

            {/* Signature Pill Search/Action Bar (Matching reference style) */}
            <form 
              onSubmit={handleSubmit}
              className="relative max-w-xl p-1.5 sm:p-2 bg-white rounded-full border border-stone-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.08)] flex items-center gap-1.5 transition-all focus-within:border-stone-400 focus-within:shadow-[0_16px_44px_rgba(0,0,0,0.12)]"
            >
              {/* Category Dropdown Pill */}
              <div className="relative">
                <button
                  type="button"
                  id="hero-category-selector"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-full bg-stone-100/90 hover:bg-stone-200/80 text-xs font-semibold text-stone-800 transition-colors whitespace-nowrap"
                >
                  <Camera className="w-3.5 h-3.5 text-rose-600" />
                  <span className="hidden sm:inline">{selectedCategory}</span>
                  <span className="sm:hidden">{selectedCategory === 'All' ? 'Shoots' : selectedCategory.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-stone-500" />
                </button>

                {/* Dropdown Options */}
                {categoryDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl border border-stone-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                          selectedCategory === cat
                            ? 'bg-rose-50 text-rose-700 font-semibold'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <span>{cat}</span>
                        {selectedCategory === cat && <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div className="flex-1 min-w-0 px-2 sm:px-3">
                <input
                  type="text"
                  id="hero-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Skincare UGC, Autumn Lookbook, NYC or Remote"
                  className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder:text-stone-600 outline-hidden font-medium"
                />
              </div>

              {/* Submit Pill Arrow Button (Inspired by screenshot's vibrant pink/rose circle button) */}
              <button
                type="submit"
                id="hero-search-submit-btn"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md flex-shrink-0"
                title="Find Matching Models"
                aria-label="Search"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </form>

            {/* Trust Indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-600 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified ID & Agency Badges</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-stone-800" />
                <span>100% Escrow Protection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-stone-800" />
                <span>Commercial Usage Contracts</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D-Aesthetic Studio Showcase (Matching screenshot isometric composition) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Primary Isometric Card Container */}
              <div className="relative bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/90 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xs">
                
                {/* Top Status Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>Active Collaboration Suite</span>
                        <span className="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
                          Live Room #CM-412
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600">Lumina Botanicals & Elena Rostova</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={onOpenChat}
                    className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/70 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Chat</span>
                  </button>
                </div>

                {/* Model Visual Showcase + Details */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  
                  {/* Photo Frame */}
                  <div className="sm:col-span-5 relative group overflow-hidden rounded-2xl border border-stone-200 shadow-xs">
                    <img 
                      src={featuredModel.heroImage} 
                      alt={featuredModel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-full text-[10px] font-bold text-stone-900 flex items-center gap-1 shadow-xs">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Premier Model</span>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-stone-950/80 backdrop-blur-xs text-white p-2 rounded-xl text-left">
                      <div className="text-xs font-bold">{featuredModel.name}</div>
                      <div className="text-[10px] text-stone-300 flex items-center justify-between">
                        <span>{featuredModel.category}</span>
                        <span className="font-semibold text-rose-300">${featuredModel.hourlyRate}/hr</span>
                      </div>
                    </div>
                  </div>

                  {/* Campaign & Escrow Status Panel */}
                  <div className="sm:col-span-7 space-y-3 text-left">
                    <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-100">
                      <div className="flex items-center justify-between text-xs text-stone-600 mb-1 font-medium">
                        <span className="flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Escrow Milestone Protection</span>
                        </span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                          Funded ($840.00)
                        </span>
                      </div>

                      {/* Milestone Progress Bar */}
                      <div className="w-full bg-stone-200 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-2 rounded-full w-1/2 transition-all duration-700" />
                      </div>
                      
                      <div className="flex justify-between items-center text-[11px] text-stone-600 mt-2">
                        <span>Milestone 1: Deposit (Secured)</span>
                        <span className="font-bold text-stone-800">50% Locked</span>
                      </div>
                    </div>

                    {/* Live Message Snippet */}
                    <div className="bg-white border border-stone-200/80 rounded-2xl p-3 shadow-xs">
                      <div className="flex items-center gap-2 mb-1.5">
                        <img 
                          src={featuredModel.avatar} 
                          alt="" 
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full object-cover" 
                        />
                        <span className="text-xs font-bold text-stone-900">{featuredModel.name}</span>
                        <span className="text-[10px] text-stone-600">10:24 AM</span>
                      </div>
                      <p className="text-xs text-stone-700 leading-snug line-clamp-2 italic">
                        "Moodboard confirmed! Natural glass dropper shots with studio lighting scheduled for Thursday."
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onSelectModel(featuredModel)}
                        className="w-full py-2 px-3 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-colors text-center"
                      >
                        View Portfolio
                      </button>
                      <button
                        onClick={onOpenPayment}
                        className="w-full py-2 px-3 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span>Book Escrow</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Aesthetic Micro-Badges (Echoing the playful 3D perspective from image) */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white border border-stone-200/90 shadow-xl rounded-2xl p-3 flex items-center gap-2.5 z-20 animate-bounce-gentle">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left pr-1">
                  <div className="text-xs font-bold text-stone-900">100% ID Shield</div>
                  <div className="text-[10px] text-stone-600 font-medium">Biometric Verified</div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white border border-stone-200/90 shadow-xl rounded-2xl p-3 flex items-center gap-3 z-20">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                  <Star className="w-4 h-4 fill-rose-600 text-rose-600" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-stone-900">4.98 / 5 Rating</div>
                  <div className="text-[10px] text-stone-600">Over 14,250 Shoots Completed</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
