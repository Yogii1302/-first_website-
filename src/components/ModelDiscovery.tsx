import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Filter, 
  MessageSquare, 
  Lock, 
  ArrowUpRight, 
  Check, 
  Clock, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { ModelProfile, CampaignCategory } from '../types';

interface ModelDiscoveryProps {
  models: ModelProfile[];
  onSelectModel: (model: ModelProfile) => void;
  onOpenChatWithModel: (model: ModelProfile) => void;
  onBookModelWithEscrow: (model: ModelProfile) => void;
  onOpenVerification: () => void;
  initialCategory?: CampaignCategory;
  initialQuery?: string;
}

export const ModelDiscovery: React.FC<ModelDiscoveryProps> = ({
  models,
  onSelectModel,
  onOpenChatWithModel,
  onBookModelWithEscrow,
  onOpenVerification,
  initialCategory = 'All',
  initialQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [onlyVerified, setOnlyVerified] = useState(true);
  const [maxRate, setMaxRate] = useState<number>(200);

  const categories: CampaignCategory[] = [
    'All',
    'Brand Photoshoot',
    'Social UGC & Reels',
    'E-Commerce Lookbook',
    'Video Commercial',
    'Fashion & Editorial',
  ];

  const filteredModels = models.filter((model) => {
    // Category check
    if (selectedCategory !== 'All' && model.category !== selectedCategory) {
      return false;
    }
    // Search query check
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = model.name.toLowerCase().includes(q);
      const matchLoc = model.location.toLowerCase().includes(q);
      const matchBio = model.bio.toLowerCase().includes(q);
      const matchTag = model.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchLoc && !matchBio && !matchTag) return false;
    }
    // Rate check
    if (model.hourlyRate > maxRate) {
      return false;
    }
    // Verified check
    if (onlyVerified && model.verifiedBadges.length === 0) {
      return false;
    }
    return true;
  });

  return (
    <section id="browse-directory" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Directory</span>
          </div>
          <h2 className="text-3xl font-extrabold text-stone-950 font-display tracking-tight">
            Discover Verified Models for Your Next Campaign
          </h2>
          <p className="text-stone-700 text-sm mt-1 max-w-2xl font-normal">
            Every talent profile is pre-verified with commercial usage licenses, transparent rates, and biometric verification.
          </p>
        </div>

        {/* Quick Badge Info Link */}
        <button
          onClick={onOpenVerification}
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 px-4 py-2 rounded-full transition-colors self-start md:self-auto"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>How Verification Works</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/90 shadow-sm mb-10 space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Input & Secondary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-stone-100 items-center">
          {/* Search Bar */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by specialty, aesthetic, city, or lookbook tag..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-stone-400 outline-hidden font-medium text-stone-900"
            />
          </div>

          {/* Hourly Rate Slider */}
          <div className="sm:col-span-3 flex items-center gap-3 px-3 py-1.5 bg-stone-50 rounded-full border border-stone-200">
            <span className="text-[11px] font-semibold text-stone-700 whitespace-nowrap">
              Max: ${maxRate}/hr
            </span>
            <input
              type="range"
              min={70}
              max={250}
              step={10}
              value={maxRate}
              onChange={(e) => setMaxRate(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer h-1.5"
            />
          </div>

          {/* Verified Toggle */}
          <div className="sm:col-span-3 flex items-center justify-end">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700 select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-stone-300"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Badges Only</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredModels.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">No matching models found</h3>
          <p className="text-xs text-stone-500 mt-1">Try relaxing the price filter or selecting "All" categories.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setMaxRate(250);
            }}
            className="mt-4 px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              id={`model-card-${model.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview & Badges */}
              <div className="relative aspect-4/3 overflow-hidden cursor-pointer bg-stone-100" onClick={() => onSelectModel(model)}>
                <img
                  src={model.heroImage}
                  alt={model.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Verified Badge Pill */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-stone-900 flex items-center gap-1 shadow-sm border border-stone-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{model.verifiedBadges[0]?.verificationLevel || 'Verified'}</span>
                </div>

                {/* Rates Badge */}
                <div className="absolute top-3 right-3 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-sm">
                  ${model.hourlyRate}<span className="text-stone-300 font-normal">/hr</span>
                </div>

                {/* Quick Availability Chip */}
                <div className="absolute bottom-3 left-3 bg-emerald-500/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1 shadow-xs">
                  <Clock className="w-3 h-3" />
                  <span>{model.availability}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 
                        onClick={() => onSelectModel(model)}
                        className="font-bold text-lg text-stone-950 group-hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        {model.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span>{model.handle}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-stone-600">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate max-w-[140px]">{model.location.split('(')[0]}</span>
                        </span>
                      </div>
                    </div>

                    {/* Rating Pill */}
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-1 rounded-full text-xs font-bold text-amber-800 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{model.rating}</span>
                      <span className="text-[10px] text-amber-600/80 font-normal">({model.reviewCount})</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {model.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {model.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => onOpenChatWithModel(model)}
                    className="flex-1 py-2 px-3 rounded-full border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    title="Send Encrypted Message"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
                    <span>Chat</span>
                  </button>

                  <button
                    onClick={() => onBookModelWithEscrow(model)}
                    className="flex-1 py-2 px-3 rounded-full bg-stone-900 hover:bg-rose-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    title="Book via Escrow Gateway"
                  >
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>Book Escrow</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
