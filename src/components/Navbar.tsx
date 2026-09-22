import React, { useState } from 'react';
import { ShieldCheck, MessageSquare, Lock, Sparkles, Menu, X, ArrowRight, UserCheck } from 'lucide-react';

interface NavbarProps {
  onOpenChat: () => void;
  onOpenPayment: () => void;
  onOpenVerification: () => void;
  onExploreClick: () => void;
  unreadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChat,
  onOpenPayment,
  onOpenVerification,
  onExploreClick,
  unreadCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 max-w-7xl mx-auto transition-all">
      <nav 
        id="main-navbar"
        className="bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-4 sm:px-7 py-3 flex items-center justify-between"
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-stone-900 leading-none">
              collab<span className="text-rose-600 font-bold">.mode</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-600 mt-0.5">
              Verified Model Connect
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#about" className="hover:text-stone-950 transition-colors">About</a>
          <a href="#features" className="hover:text-stone-950 transition-colors">Features</a>
          <button 
            onClick={onExploreClick}
            className="hover:text-stone-950 transition-colors flex items-center gap-1.5"
          >
            <span>Browse Models</span>
            <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-1.5 py-0.5 rounded-full border border-rose-200">
              3,800+
            </span>
          </button>
          <button 
            onClick={onOpenVerification}
            className="hover:text-stone-950 transition-colors flex items-center gap-1 text-stone-600"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Trust & Badges</span>
          </button>
          <a href="#pricing" className="hover:text-stone-950 transition-colors">Pricing & Escrow</a>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Secure Chat Trigger */}
          <button
            id="nav-chat-btn"
            onClick={onOpenChat}
            className="relative px-3.5 py-2 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-2 text-xs font-semibold"
            title="Open Secure Chat"
          >
            <MessageSquare className="w-4 h-4 text-stone-600" />
            <span>Secure Chat</span>
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Escrow Payment Trigger */}
          <button
            id="nav-escrow-btn"
            onClick={onOpenPayment}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/70 transition-colors text-xs font-semibold"
            title="Escrow Payment Gateway"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Escrow Vault</span>
          </button>

          {/* Primary CTA */}
          <button
            id="nav-start-campaign-btn"
            onClick={onExploreClick}
            className="px-5 py-2 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-sm hover:shadow flex items-center gap-1.5"
          >
            <span>Post Campaign</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenChat}
            className="relative p-2 text-stone-700 hover:bg-stone-100 rounded-full"
            aria-label="Messages"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-600 rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:bg-stone-100 rounded-full"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 bg-white/98 backdrop-blur-md rounded-2xl border border-stone-200 p-5 shadow-xl space-y-4">
          <div className="flex flex-col gap-3 font-medium text-stone-700 text-sm">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              About Platform
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              3-Pillar Features
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreClick();
              }}
              className="text-left py-1 hover:text-stone-950"
            >
              Browse 3,800+ Verified Models
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVerification();
              }}
              className="text-left py-1 text-emerald-700 font-semibold flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Badges & Trust Shield</span>
            </button>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              Pricing & Escrow Protection
            </a>
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPayment();
              }}
              className="w-full py-2.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Escrow Gateway Vault</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreClick();
              }}
              className="w-full py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span>Explore Talent & Post Shoot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
