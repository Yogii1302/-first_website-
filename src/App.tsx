import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesThreeCol } from './components/FeaturesThreeCol';
import { ModelDiscovery } from './components/ModelDiscovery';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { PricingSection } from './components/PricingSection';
import { SecureChatModal } from './components/SecureChatModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { VerificationModal } from './components/VerificationModal';
import { ModelDetailModal } from './components/ModelDetailModal';
import { StickyCTA } from './components/StickyCTA';
import { Footer } from './components/Footer';

import { 
  INITIAL_MODELS, 
  INITIAL_CONVERSATIONS, 
  TESTIMONIALS, 
  PLATFORM_STATS 
} from './data/mockData';
import { ModelProfile, ConversationThread, CampaignCategory, ChatMessage } from './types';

export default function App() {
  const [models] = useState<ModelProfile[]>(INITIAL_MODELS);
  const [conversations, setConversations] = useState<ConversationThread[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');

  // Modals state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [detailModel, setDetailModel] = useState<ModelProfile | null>(null);

  // Active payment context
  const [paymentModel, setPaymentModel] = useState<ModelProfile>(INITIAL_MODELS[0]);
  const [paymentAmount, setPaymentAmount] = useState<number>(840);

  // Search filter passed from Hero
  const [searchCategory, setSearchCategory] = useState<CampaignCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Unread badge count
  const unreadCount = conversations.reduce((acc, thread) => acc + thread.unreadCount, 0);

  // Trigger search from Hero
  const handleHeroSearch = (category: CampaignCategory, query: string) => {
    setSearchCategory(category);
    setSearchQuery(query);
  };

  // Scroll smoothly to directory
  const handleScrollToDirectory = () => {
    const el = document.getElementById('browse-directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open chat with specific model
  const handleOpenChatWithModel = (model: ModelProfile) => {
    // Look for existing thread
    const existingThread = conversations.find((c) => c.participantModel.id === model.id);
    if (existingThread) {
      setActiveConversationId(existingThread.id);
    } else {
      // Create new thread
      const newThread: ConversationThread = {
        id: `conv-${Date.now()}`,
        participantModel: model,
        businessName: 'Your Brand / Small Business',
        businessAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        lastMessage: `Connected with ${model.name}. Start a conversation!`,
        lastTimestamp: 'Just now',
        unreadCount: 0,
        campaignTitle: `${model.category} Collaboration`,
        escrowStatus: 'none',
        escrowAmount: model.hourlyRate * 6,
        messages: [
          {
            id: `msg-init-${Date.now()}`,
            senderId: 'model',
            senderName: model.name,
            senderRole: 'model',
            avatar: model.avatar,
            text: `Hi! Thanks for checking out my portfolio. I’m currently ${model.availability.toLowerCase()}. Feel free to share your shoot concept or send an escrow offer!`,
            timestamp: 'Just now',
          },
        ],
      };
      setConversations([newThread, ...conversations]);
      setActiveConversationId(newThread.id);
    }
    setIsChatOpen(true);
  };

  // Send message in chat + simulated instant reply
  const handleSendMessage = (conversationId: string, text: string, attachment?: ChatMessage['attachment']) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'business',
      senderName: 'You (Brand Founder)',
      senderRole: 'business',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
      text,
      timestamp: 'Just now',
      attachment,
    };

    setConversations((prev) =>
      prev.map((thread) => {
        if (thread.id === conversationId) {
          return {
            ...thread,
            lastMessage: text,
            lastTimestamp: 'Just now',
            messages: [...thread.messages, newMsg],
          };
        }
        return thread;
      })
    );

    // Realistic automated model response simulation after 1.2s
    setTimeout(() => {
      const targetThread = conversations.find((t) => t.id === conversationId);
      if (!targetThread) return;

      const replyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        senderId: 'model',
        senderName: targetThread.participantModel.name,
        senderRole: 'model',
        avatar: targetThread.participantModel.avatar,
        text: attachment?.type === 'contract_offer'
          ? `Thank you for the escrow offer! I accept the milestones. Once the deposit is locked in the vault, I will block the shoot date on my calendar.`
          : `Got it! That looks great. Let’s make sure we have hair & makeup scheduled 45 mins before camera roll. Looking forward to creating magic! ✨`,
        timestamp: 'Just now',
      };

      setConversations((prev) =>
        prev.map((thread) => {
          if (thread.id === conversationId) {
            return {
              ...thread,
              lastMessage: replyMsg.text,
              lastTimestamp: 'Just now',
              messages: [...thread.messages, replyMsg],
            };
          }
          return thread;
        })
      );
    }, 1300);
  };

  // Open payment gateway for a specific model
  const handleBookModelWithEscrow = (model: ModelProfile, customAmount?: number) => {
    setPaymentModel(model);
    setPaymentAmount(customAmount || model.hourlyRate * 6);
    setIsPaymentOpen(true);
  };

  // Payment successful callback
  const handlePaymentSuccess = (amount: number) => {
    setConversations((prev) =>
      prev.map((thread) => {
        if (thread.participantModel.id === paymentModel.id) {
          return {
            ...thread,
            escrowStatus: 'in_escrow',
            escrowAmount: amount,
            lastMessage: `Escrow funded! $${amount} secured in vault.`,
            messages: [
              ...thread.messages,
              {
                id: `msg-escrow-${Date.now()}`,
                senderId: 'system',
                senderName: 'CollabShield Vault',
                senderRole: 'business',
                avatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=120&q=80',
                text: `🔒 Milestone 1 Escrow Deposit ($${(amount * 0.5).toFixed(2)}) has been authorized and secured in the CollabShield Vault. Both parties are fully protected under standard commercial terms.`,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return thread;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col font-sans">
      
      {/* Top Floating Pill Navigation */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenPayment={() => handleBookModelWithEscrow(models[0], 840)}
        onOpenVerification={() => setIsVerificationOpen(true)}
        onExploreClick={handleScrollToDirectory}
        unreadCount={unreadCount}
      />

      {/* Main Page Flow: Hero + Features + Social Proof + CTA */}
      <main className="flex-1">
        
        {/* Full-Width Hero Section (Matching Uploaded Design Reference) */}
        <Hero
          onSearch={handleHeroSearch}
          onSelectModel={(model) => setDetailModel(model)}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenPayment={() => handleBookModelWithEscrow(models[0], 840)}
          featuredModel={models[0]}
        />

        {/* Platform Stat Banner */}
        <section className="border-y border-stone-200/80 bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {PLATFORM_STATS.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs text-stone-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3-Column Features Section (Focus on Value Proposition First) */}
        <FeaturesThreeCol
          onOpenVerification={() => setIsVerificationOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenPayment={() => handleBookModelWithEscrow(models[0], 840)}
        />

        {/* Talent Directory / Model Discovery */}
        <ModelDiscovery
          models={models}
          onSelectModel={(model) => setDetailModel(model)}
          onOpenChatWithModel={handleOpenChatWithModel}
          onBookModelWithEscrow={handleBookModelWithEscrow}
          onOpenVerification={() => setIsVerificationOpen(true)}
          initialCategory={searchCategory}
          initialQuery={searchQuery}
        />

        {/* Social Proof: Testimonial Carousel */}
        <TestimonialCarousel testimonials={TESTIMONIALS} />

        {/* Transparent Pricing & Escrow Breakdown */}
        <PricingSection
          onOpenPayment={() => handleBookModelWithEscrow(models[0], 840)}
          onExploreClick={handleScrollToDirectory}
          onOpenVerification={() => setIsVerificationOpen(true)}
        />

      </main>

      {/* Sticky CTA Bar */}
      <StickyCTA
        onExploreClick={handleScrollToDirectory}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenPayment={() => handleBookModelWithEscrow(models[0], 840)}
      />

      {/* Footer */}
      <Footer
        onOpenVerification={() => setIsVerificationOpen(true)}
        onOpenPayment={() => handleBookModelWithEscrow(models[0], 840)}
        onExploreClick={handleScrollToDirectory}
      />

      {/* Modals */}
      <SecureChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={(id) => setActiveConversationId(id)}
        onSendMessage={handleSendMessage}
        onOpenPaymentForModel={(model, amount) => {
          setIsChatOpen(false);
          handleBookModelWithEscrow(model, amount);
        }}
      />

      <PaymentGatewayModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        selectedModel={paymentModel}
        initialAmount={paymentAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
      />

      <ModelDetailModal
        model={detailModel}
        onClose={() => setDetailModel(null)}
        onOpenChat={handleOpenChatWithModel}
        onBookEscrow={handleBookModelWithEscrow}
        onOpenVerification={() => setIsVerificationOpen(true)}
      />

    </div>
  );
}
