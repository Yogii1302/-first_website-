import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative ambient lighting in dark theme */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700 text-xs font-bold text-rose-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Social Proof & Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Trusted by 14,000+ brands and professional models
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Real founders, real models, and measurable growth powered by protected collaborations.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="max-w-4xl mx-auto">
          <div 
            id="testimonial-carousel-card"
            className="bg-stone-800/90 border border-stone-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-8 text-stone-700">
              <Quote className="w-12 h-12 rotate-180 opacity-40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Avatar & Author Info */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-stone-700/80 pb-6 md:pb-0 md:pr-6">
                <div className="relative mb-3">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-full object-cover border-2 border-stone-600 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 text-white shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="font-bold text-lg text-white font-display leading-tight">{current.author}</h3>
                <p className="text-xs text-rose-400 font-semibold">{current.role}</p>
                <p className="text-xs text-stone-400 mt-0.5">{current.company}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Campaign Tag */}
                <span className="mt-4 inline-block px-3 py-1 rounded-full bg-stone-700/70 text-[11px] font-medium text-stone-300">
                  {current.campaignType}
                </span>
              </div>

              {/* Quote & Metric Outcome */}
              <div className="md:col-span-8 flex flex-col justify-between space-y-6">
                <blockquote className="text-lg sm:text-xl text-stone-100 font-normal leading-relaxed italic">
                  "{current.quote}"
                </blockquote>

                {/* Result Metric Banner */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-stone-900/80 border border-stone-700 self-start">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Verified Campaign Outcome</div>
                    <div className="text-sm font-bold text-emerald-400">{current.resultMetric}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Navigation Controls */}
            <div className="mt-8 pt-6 border-t border-stone-700/80 flex items-center justify-between">
              
              {/* Indicator Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === index ? 'w-8 bg-rose-500' : 'w-2 bg-stone-600 hover:bg-stone-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  id="testimonial-prev-btn"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-stone-700 hover:border-stone-500 bg-stone-800/80 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  id="testimonial-next-btn"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-stone-700 hover:border-stone-500 bg-stone-800/80 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
