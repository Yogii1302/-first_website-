export type CampaignCategory = 
  | 'All'
  | 'Brand Photoshoot'
  | 'Social UGC & Reels'
  | 'E-Commerce Lookbook'
  | 'Video Commercial'
  | 'Fashion & Editorial';

export interface VerifiedBadgeInfo {
  type: 'identity' | 'agency' | 'business' | 'top_rated';
  title: string;
  description: string;
  verifiedDate: string;
  verificationLevel: 'Tier 1' | 'Tier 2' | 'Premier';
}

export interface ModelProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  heroImage: string;
  galleryImages: string[];
  location: string;
  category: CampaignCategory;
  rating: number;
  reviewCount: number;
  completedShoots: number;
  hourlyRate: number;
  dayRate: number;
  verifiedBadges: VerifiedBadgeInfo[];
  bio: string;
  tags: string[];
  height: string;
  portfolioStats: {
    instagramFollowers?: string;
    avgEngagement?: string;
    brandsWorkedWith: number;
  };
  availability: 'Available this week' | 'Booking next month' | 'Available today';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'business' | 'model';
  avatar: string;
  text: string;
  timestamp: string;
  attachment?: {
    type: 'moodboard' | 'contract_offer' | 'lookbook';
    title: string;
    details: string;
    amount?: number;
  };
}

export interface ConversationThread {
  id: string;
  participantModel: ModelProfile;
  businessName: string;
  businessAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  campaignTitle: string;
  escrowStatus?: 'pending_deposit' | 'in_escrow' | 'released' | 'none';
  escrowAmount?: number;
  messages: ChatMessage[];
}

export interface EscrowMilestone {
  id: string;
  title: string;
  amount: number;
  status: 'pending' | 'in_escrow' | 'completed';
  dueDate: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  campaignType: string;
  resultMetric: string;
  rating: number;
}
