import React, { useState } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  Lock, 
  Paperclip, 
  FileText, 
  CheckCheck, 
  Sparkles, 
  DollarSign, 
  Camera,
  ChevronRight,
  Info
} from 'lucide-react';
import { ConversationThread, ChatMessage, ModelProfile } from '../types';

interface SecureChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: ConversationThread[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string, attachment?: ChatMessage['attachment']) => void;
  onOpenPaymentForModel: (model: ModelProfile, amount: number) => void;
}

export const SecureChatModal: React.FC<SecureChatModalProps> = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  onOpenPaymentForModel,
}) => {
  const [inputText, setInputText] = useState('');
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offerTitle, setOfferTitle] = useState('Autumn Commercial Campaign');
  const [offerAmount, setOfferAmount] = useState<number>(750);

  if (!isOpen) return null;

  const currentThread = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(currentThread.id, inputText);
    setInputText('');
  };

  const handleSendOffer = () => {
    onSendMessage(currentThread.id, `I've sent an official Escrow Contract Offer: "${offerTitle}" for $${offerAmount}.`, {
      type: 'contract_offer',
      title: offerTitle,
      details: '2-Milestone Escrow • Commercial Digital Rights (1 Year)',
      amount: offerAmount,
    });
    setOfferModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
      <div 
        id="secure-chat-window"
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-5xl h-[88vh] max-h-[760px] flex flex-col md:flex-row overflow-hidden"
      >
        
        {/* Left Sidebar: Threads List */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-stone-200 bg-stone-50/70 flex flex-col flex-shrink-0">
          
          {/* Header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center">
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 leading-none">Encrypted CollabRooms</h3>
                <span className="text-[10px] text-emerald-600 font-semibold">256-bit Protected</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-full hover:bg-stone-200 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.map((thread) => {
              const isSelected = thread.id === currentThread.id;
              return (
                <button
                  key={thread.id}
                  onClick={() => onSelectConversation(thread.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 ${
                    isSelected 
                      ? 'bg-white shadow-sm border border-stone-200' 
                      : 'hover:bg-stone-100/70 text-stone-700'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={thread.participantModel.avatar}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full w-3.5 h-3.5 border-2 border-white flex items-center justify-center">
                      <ShieldCheck className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {thread.participantModel.name}
                      </h4>
                      <span className="text-[10px] text-stone-400">{thread.lastTimestamp}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate mt-0.5">
                      {thread.businessName.split('(')[0]}
                    </p>
                    <p className="text-[11px] text-stone-600 truncate mt-1">
                      {thread.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Escrow Trust Guarantee Footer */}
          <div className="p-3 bg-stone-100/80 border-t border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>CollabShield: Anti-harassment & escrow dispute guarantee enabled.</span>
          </div>

        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          
          {/* Active Header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-white/90">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={currentThread.participantModel.avatar}
                alt=""
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-stone-200"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-stone-900 truncate">
                    {currentThread.participantModel.name}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>ID Verified</span>
                  </span>
                </div>
                <p className="text-xs text-stone-500 truncate">
                  Campaign: <span className="font-semibold text-stone-700">{currentThread.campaignTitle}</span>
                </p>
              </div>
            </div>

            {/* Escrow Trigger from Chat Header */}
            <div className="flex items-center gap-2">
              <button
                id="chat-book-escrow-btn"
                onClick={() => onOpenPaymentForModel(currentThread.participantModel, currentThread.escrowAmount || 840)}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Deposit Escrow (${currentThread.escrowAmount || 840})</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Encryption Notice */}
          <div className="bg-stone-50 px-4 py-1.5 border-b border-stone-100 flex items-center justify-center gap-2 text-[11px] text-stone-500">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>Messages and contract terms are end-to-end encrypted and legally binding under CollabMode Standard Terms.</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAF9F6]/40">
            {currentThread.messages.map((msg) => {
              const isBusiness = msg.senderRole === 'business';
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${isBusiness ? 'justify-end' : 'justify-start'}`}
                >
                  {!isBusiness && (
                    <img
                      src={msg.avatar}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />
                  )}

                  <div className={`max-w-md ${isBusiness ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[10px] font-bold text-stone-500">{msg.senderName}</span>
                      <span className="text-[10px] text-stone-400">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isBusiness
                          ? 'bg-stone-900 text-white rounded-br-xs'
                          : 'bg-white text-stone-900 border border-stone-200/90 shadow-xs rounded-bl-xs'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Attachment Rendering */}
                      {msg.attachment && (
                        <div
                          className={`mt-3 p-3 rounded-xl border ${
                            isBusiness 
                              ? 'bg-stone-800 border-stone-700 text-white' 
                              : 'bg-rose-50/70 border-rose-200 text-stone-900'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              {msg.attachment.type === 'contract_offer' ? (
                                <FileText className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Camera className="w-4 h-4 text-rose-500" />
                              )}
                              <span className="font-bold text-xs">{msg.attachment.title}</span>
                            </div>
                            {msg.attachment.amount && (
                              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">
                                ${msg.attachment.amount} Escrow
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] ${isBusiness ? 'text-stone-300' : 'text-stone-600'}`}>
                            {msg.attachment.details}
                          </p>
                          
                          {msg.attachment.type === 'contract_offer' && (
                            <button
                              onClick={() => onOpenPaymentForModel(currentThread.participantModel, msg.attachment?.amount || 750)}
                              className="mt-2.5 w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              <span>Fund Escrow Vault Now</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {isBusiness && (
                    <img
                      src={msg.avatar}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Actions & Input Form */}
          <div className="p-3 sm:p-4 border-t border-stone-200 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => setOfferModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Create Escrow Offer</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSendMessage(currentThread.id, 'Sharing updated location: Pier 59 Studios, Stage B, Thursday 9:00 AM.');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs font-medium transition-colors"
              >
                <span>📍 Send Studio Location</span>
              </button>
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message, shoot requirements, or question..."
                className="flex-1 px-4 py-2.5 rounded-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-stone-400 outline-hidden text-xs sm:text-sm text-stone-900"
              />

              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs flex-shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Contract Offer Sub-Modal */}
      {offerModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-stone-900">Create Escrow Booking Offer</h3>
              </div>
              <button 
                onClick={() => setOfferModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Formally attach a campaign offer to this chat. The model can review and accept before funds are deposited to escrow.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Total Budget (Held in Escrow)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-bold">$</span>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 font-bold"
                  />
                </div>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 space-y-1 text-[11px] text-stone-600">
                <div className="flex justify-between">
                  <span>Milestone 1 (Deposit on shoot day):</span>
                  <span className="font-semibold">${(offerAmount * 0.5).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Milestone 2 (High-Res Photos Approved):</span>
                  <span className="font-semibold">${(offerAmount * 0.5).toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOfferModalOpen(false)}
                className="flex-1 py-2 rounded-full border border-stone-200 text-stone-700 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendOffer}
                className="flex-1 py-2 rounded-full bg-stone-900 text-white font-semibold text-xs flex items-center justify-center gap-1"
              >
                <span>Attach Offer to Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
